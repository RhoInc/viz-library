library(tidyverse)
set.seed(2357)

### Input data
    DM <- read.csv('DM.csv', colClasses = 'character') %>% select(USUBJID, SAFFL, RFSTDTC)
    labs <- read.csv('labs.csv', colClasses = 'character') %>% select(-SEX)
    visits <- read.csv('scheduleOfEvents.csv', colClasses = 'character')

### Output data
    LB <- NULL
    
    for (i in 1:nrow(DM)) {
        id <- DM[i,]
        
        if (id$SAFFL == 'Y') {
            sampledLabs <- labs
            sampledDays <- visits
            
            for (j in 1:nrow(visits)) {
                LBSTDY <- visits[j,'STDY']
                LBENDY <- visits[j,'ENDY']
                sampledDays[j,'LBDY'] <- sample(LBSTDY:LBENDY, 1)
            }
            
            lb_vis <- merge(sampledLabs, sampledDays, all = TRUE)
            
            for (j in 1:nrow(lb_vis)) {
                LBSTNRLO <- as.numeric(lb_vis[j,'LBSTNRLO'])
                LBSTNRHI <- as.numeric(lb_vis[j,'LBSTNRHI'])
                mean <- (LBSTNRHI + LBSTNRLO)/2
                std <- (LBSTNRHI - LBSTNRLO)/2
                lb_vis[j,'LBSTRESN'] <- max(rnorm(1, mean, std), 0)
            }
            
            LB <- plyr::rbind.fill(LB, merge(id, lb_vis, all = TRUE))
        }
    }
    
    LB <- LB %>%
        arrange(USUBJID, VISITNUM, LBTEST) %>%
        mutate(
            LBDT = as.Date(RFSTDTC) + LBDY - 1
        ) %>%
        select(-SAFFL, -RFSTDTC, -STDY, -ENDY)
        write.csv(
            LB,
            'LB.csv',
            row.names = FALSE,
            na = ''
        )
        write.csv(
            LB,
            '../../233/data/LB.csv',
            row.names = FALSE,
            na = ''
        )
