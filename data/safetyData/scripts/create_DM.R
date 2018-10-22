library(tidyverse)
set.seed(2357)

### Input data
    SV <- read.csv('../raw/scheduleOfEvents.csv', colClasses = 'character')
    endOfStudy <- SV[SV$VISIT == 'End of Study',]
    EOSbounds <- c(
        as.numeric(endOfStudy[1,'STDY']),
        as.numeric(endOfStudy[1,'ENDY'])
    )
    n <- 150
    arms <- c('Treatment A', 'Treatment B', 'Placebo')

    ### Define set of all possible possibilities to sample from
        possibilities <- crossing(
                age = seq(18,55,1),
                sex = c('M','F'),
                race = c('Black','Hispanic','White','Other/Mixed'),
                arm = c('Treatment A','Treatment B','Placebo'),
                rfstdtc = seq(as.Date('2015/1/1'),as.Date('2015/12/31'), 1)
            ) %>%
            group_by(arm) %>% 
            sample_n(size = n/length(arms)) %>%
            ungroup()

### Data manipulation
    DM <- possibilities %>%
        bind_cols(
            crossing(
                siteid = sprintf('%02d', seq(1,5,1)),
                subjid = sprintf('%03d', seq(1,30,1))
            ) %>%
            mutate(
                usubjid = paste0(siteid, '-', subjid),
                site = paste('Site', siteid, sep = ' ')
            ) %>% 
            sample_n(size = n)
        ) %>%
        mutate(
            saffn = rep(c(rep(0,5), rep(1, 45)), 3),
            saffl = ifelse(saffn, 'Y', 'N'),
            arm = ifelse(saffn, arm, 'Screen Failure'),
            armcd = case_when(
                arm == 'Treatment A' ~ 'TRTA',
                arm == 'Treatment B' ~ 'TRTB',
                arm == 'Placebo' ~ 'PLACEBO',
                arm == 'Screen Failure' ~ 'SCRNFAIL',
                TRUE ~ 'NOTASSGN'
            ),
            deviate = runif(150),
            sbjtstat = case_when(
                !saffn ~ 'Screen Failure',
                deviate < .05 ~ 'Early Termination',
                deviate > .7 ~ 'Completed',
                TRUE ~ 'Ongoing'
            )
        )

    for (i in 1:n) {
        row <- DM[i,]
        rfstdtc <- row$rfstdtc
        rfendy <- sample(seq(EOSbounds[1],EOSbounds[2]), 1)
        sbjtstat <- row$sbjtstat

        if (sbjtstat == 'Screen Failure') {
            rfendtc <- rfstdtc
        } else if (sbjtstat == 'Early Termination') {
            rfendtc <- sample(seq(rfstdtc, rfstdtc + rfendy, 1), 1)
        } else if (sbjtstat == 'Completed') {
            rfendtc <- rfstdtc + (rfendy - 1)
        } else if (sbjtstat == 'Ongoing') {
            rfendtc <- sample(seq(rfstdtc, rfstdtc + (rfendy - 1), 1), 1)
        }

        DM[i,'rfendtc'] <- rfendtc
    }

    DM1 <- DM %>%
        mutate(
            rfendtc = as.Date(rfendtc, '1970-01-01'),
            rfendy = rfendtc - rfstdtc + 1
        ) %>%
        select(usubjid, site, siteid, age, sex, race, arm, armcd, sbjtstat, rfstdtc, rfendtc, rfendy, saffl, saffn) %>%
        arrange(usubjid)
    names(DM1) <- toupper(names(DM1))

### Output data
    write.csv(
        DM1,
        '../SDTM/DM.csv',
        row.names = F
    )