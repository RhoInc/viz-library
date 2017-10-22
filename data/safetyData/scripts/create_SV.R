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

    SV <- SV %>%
        arrange(USUBJID, VISITNUM) %>%
        mutate(
            SVDT = as.Date(RFSTDTC) + SVDY - 1
        ) %>%
        select(-SAFFL, -RFSTDTC)
    write.csv(
        SV,
        '../SDTM/SV.csv',
        row.names = FALSE,
        na = ''
    )