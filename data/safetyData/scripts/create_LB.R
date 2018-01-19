library(tidyverse)
set.seed(2357)

### Input data
    SV <- read.csv('../SDTM/SV.csv', colClasses = 'character') %>% rename(LBDT = SVDT, LBDY = SVDY)
    labs <- read.csv('../raw/labs.csv', colClasses = 'character') %>% select(-SEX)
    visits <- read.csv('../raw/scheduleOfEvents.csv', colClasses = 'character')

### Output data
    LB <- NULL
    
    for (i in 1:nrow(SV)) {
        visit <- SV[i,]
        lb_vis <- merge(labs, visit, all = TRUE)
        
        for (j in 1:nrow(lb_vis)) {
            LBSTNRLO <- as.numeric(lb_vis[j,'LBSTNRLO'])
            LBSTNRHI <- as.numeric(lb_vis[j,'LBSTNRHI'])
            mean <- (LBSTNRHI + LBSTNRLO)/2
            std <- (LBSTNRHI - LBSTNRLO)/2
            lb_vis[j,'LBSTRESN'] <- ifelse(runif(1) > .02, max(rnorm(1, mean, std), 0), NA)
        }

        LB <- plyr::rbind.fill(LB, lb_vis)
    }

    visits_labs <- merge(visits, labs, all = TRUE) %>%
        sample_n(nrow(visits)*nrow(labs)/10) %>%
        mutate(VISIT_LBTEST = paste(VISIT, LBTEST, sep = '_'))

    LB <- LB %>%
        mutate(
            LBSTRESN = ifelse(
                !paste(VISIT, LBTEST, sep = '_') %in% visits_labs$VISIT_LBTEST,
                    LBSTRESN,
                    NA
            )
        ) %>%
        arrange(USUBJID, VISITNUM, LBTEST) %>%
        select(USUBJID, VISIT, VISITNUM, LBDT, LBDY, LBCAT, LBTEST, LBSTRESU, LBSTRESN, LBSTNRLO, LBSTNRHI)

    write.csv(
        LB,
        '../SDTM/LB.csv',
        row.names = FALSE,
        na = ''
    )