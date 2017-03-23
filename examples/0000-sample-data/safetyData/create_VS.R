library(tidyverse)
set.seed(2357)

### Input data
    DM <- read.csv('DM.csv', colClasses = 'character') %>% select(USUBJID, SAFFL, RFSTDTC)
    vitals <- read.csv('vitalSigns.csv', colClasses = 'character') %>%
        select(-VSAGELO, -VSAGEHI) %>%
        mutate(one = 1) %>%
        group_by(VSTEST) %>%
        mutate(seq = cumsum(one)) %>%
        filter(row_number() == n()) %>%
        select(-one, -seq) %>%
        ungroup()
    visits <- read.csv('scheduleOfEvents.csv', colClasses = 'character')

### Output data
    VS <- NULL
    
    for (i in 1:nrow(DM)) {
        id <- DM[i,]
        
        if (id$SAFFL == 'Y') {
            sampledVitals <- vitals
            sampledDays <- visits
            
            for (j in 1:nrow(visits)) {
                VSSTDY <- visits[j,'STDY']
                VSENDY <- visits[j,'ENDY']
                sampledDays[j,'VSDY'] <- sample(VSSTDY:VSENDY, 1)
            }
            
            vs_vis <- merge(sampledVitals, sampledDays, all = TRUE)
            
            for (j in 1:nrow(vs_vis)) {
                VSSTNRLO <- as.numeric(vs_vis[j,'VSSTNRLO'])
                VSSTNRHI <- as.numeric(vs_vis[j,'VSSTNRHI'])
                mean <- (VSSTNRHI + VSSTNRLO)/2
                std <- (VSSTNRHI - VSSTNRLO)/2
                vs_vis[j,'VSSTRESN'] <- max(rnorm(1, mean, std), 0)
            }
            
            VS <- plyr::rbind.fill(VS, merge(id, vs_vis, all = TRUE))
        }
    }
    
    VS <- VS %>%
        arrange(USUBJID, VISITNUM, VSTEST) %>%
        mutate(
            VSDT = as.Date(RFSTDTC) + VSDY - 1
        ) %>%
        select(-SAFFL, -RFSTDTC, -STDY, -ENDY)
        write.csv(
            VS,
            'VS.csv',
            row.names = FALSE,
            na = ''
        )
        write.csv(
            VS,
            '../../233/data/VS.csv',
            row.names = FALSE,
            na = ''
        )
    