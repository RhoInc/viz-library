library(tidyverse)
set.seed(2357)

### Input data
    DM <- read.csv('../SDTM/DM.csv', colClasses = 'character') %>% select(USUBJID, SAFFL, RFSTDTC)
    visits <- read.csv('../raw/scheduleOfEvents.csv', colClasses = 'character')

### Output data
    SV <- NULL

    for (i in 1:nrow(DM)) {
        id <- DM[i,]

        if (id$SAFFL == 'Y') {
            sampledDays <- visits

            for (j in 1:nrow(visits)) {
                STDY <- visits[j,'STDY']
                ENDY <- visits[j,'ENDY']
                sampledDays[j,'SVDY'] <- sample(STDY:ENDY, 1)
            }

            SV <- plyr::rbind.fill(
                SV,
                merge(
                    id,
                    select(sampledDays, VISITNUM, VISIT, SVDY),
                    all = TRUE))
        }
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
    earlyTerminationSample <- filter(SV, VISITNUM == '7')
    earlyTerminators <- sample_n(earlyTerminationSample, nrow(earlyTerminationSample)/10) %>%
        mutate(
            VISITNUM = '6.9',
            VISIT = 'Early Termination'
        )

    SV <- filter(SV, !(VISIT == 'End of Study' & USUBJID %in% earlyTerminators$USUBJID)) %>%
        rbind(unscheduledVisits) %>%
        rbind(earlyTerminators) %>%
        arrange(USUBJID, VISITNUM) %>%
        mutate(
            SVDT = as.Date(RFSTDTC) + SVDY - 1
        ) %>%
        select(USUBJID, VISIT, VISITNUM, SVDT, SVDY)
    
    write.csv(
        SV,
        '../SDTM/SV.csv',
        row.names = FALSE,
        na = ''
    )