library(tidyverse)
set.seed(2357)

### Input data
    SV <- read.csv('../SDTM/SV.csv', colClasses = 'character') %>% rename(LBDT = SVDT, LBDY = SVDY)
    labs <- read.csv('../raw/labs.csv', colClasses = 'character') %>% select(-SEX)

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
            lb_vis[j,'LBSTRESN'] <- max(rnorm(1, mean, std), 0)
        }
        
        LB <- plyr::rbind.fill(LB, lb_vis)
    }

    LB <- LB %>%
        arrange(USUBJID, VISITNUM, LBTEST)

    write.csv(
        LB,
        '../SDTM/LB.csv',
        row.names = FALSE,
        na = ''
    )