library(tidyverse)
set.seed(2357)

### Input data
    DM <- read.csv('../SDTM/DM.csv', colClasses = 'character') %>%
        select(USUBJID, SBJTSTAT, RFSTDTC, RFENDTC, RFENDY, SAFFL)
    visits <- read.csv('../raw/scheduleOfEvents.csv', colClasses = 'character')

### Output data
    SV <- NULL

    for (i in 1:nrow(DM)) {
        id <- DM[i,]
        sampledDays <- visits

        for (j in 1:nrow(visits)) {
            STDY <- visits[j,'STDY']
            ENDY <- visits[j,'ENDY']
            sampledDays[j,'SVDY'] <- sample(STDY:ENDY, 1)
        }

        SV <- SV %>%
            plyr::rbind.fill(
                merge(
                    id,
                    select(sampledDays, VISITNUM, VISIT, SVDY),
                    all = TRUE
                )
            ) %>%
            filter(
                !(SBJTSTAT == 'Screen Failure' & as.numeric(VISITNUM) > 0)
            )
    }

  # Sample data and change to unscheduled visits.
    unscheduledVisitSample <- filter(SV, VISITNUM != '7')
    unscheduledVisits = sample_n(unscheduledVisitSample, nrow(unscheduledVisitSample)/10, T) %>%
        arrange(USUBJID, VISITNUM) %>%
        group_by(USUBJID, VISITNUM) %>%
        mutate(n = row_number()) %>%
        ungroup() %>%
        mutate(
            VISITNUM = paste0(VISITNUM, '.', n),
            VISIT = paste('Unscheduled', VISITNUM, sep = ' '),
            SVDY = SVDY + n*7 + 1
        ) %>%
        select(-n)
    
  # Sample end of study visits and change to early termination visits.
    earlyTerminators <- SV %>%
        filter(SBJTSTAT == 'Early Termination' & VISITNUM == '7') %>%
        mutate(
            VISITNUM = '6.9',
            VISIT = 'Early Termination',
            SVDY = as.Date(RFENDTC) - as.Date(RFSTDTC) + 1
        )

    SV1 <- SV %>%
        rbind(unscheduledVisits) %>%
        rbind(earlyTerminators) %>%
        arrange(USUBJID, VISITNUM) %>%
        mutate(
            SVDT = as.Date(RFSTDTC) + SVDY - 1
        )
    SV2 <- SV1 %>%
        mutate(
            deviate = runif(nrow(SV1)),
            SVSTATUS = case_when(
                SBJTSTAT == 'Screen Failure' ~ 'Failed',
                SBJTSTAT == 'Early Termination' & as.numeric(SVDY) > as.numeric(RFENDY) ~ 'Terminated',
                SBJTSTAT == 'Ongoing' & as.numeric(SVDY) > as.numeric(RFENDY) ~ 'Expected',
                SBJTSTAT == 'Ongoing' & as.numeric(RFENDY) - as.numeric(SVDY) < 28 ~ 'Overdue',
                !grepl('screening|unscheduled', VISIT, T) & deviate < .05 ~ 'Missed',
                TRUE ~ 'Completed'
            )
        ) %>%
        select(USUBJID, VISIT, VISITNUM, SVDT, SVDY, SVSTATUS)

    write.csv(
        SV2,
        '../SDTM/SV.csv',
        row.names = FALSE,
        na = ''
    )