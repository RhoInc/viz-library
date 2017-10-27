library(tidyverse)
set.seed(2357)

### Input data
    DM <- read.csv('../SDTM/DM.csv', colClasses = 'character') %>% select(USUBJID, SAFFL, RFSTDTC)
    CMs <- read.csv('../raw/medications.csv', colClasses = 'character')

### Output data
    CM <- NULL
    CMsample <- 0:5
    
    CMSTDY <- 1:365
    
    CMDOSE <- c(1,2,3,4,5)
    CMDOSEprobs <- c(.2,.2,.2,.2,.2)
    
    CMROUTE <- c('orally', 'intravenously', 'subcutaneously', 'sublingually', 'topically')
    CMROUTEprobs <- c(.6, .1, .1, .1, .1)
    
    CMONGO <- c('N', 'Y')
    CMONGOprobs <- c(.5, .5)
    
    for (i in 1:nrow(DM)) {
        id <- DM[i,]
        id$nCMs <- sample(CMsample, 1)
        
        if (id$nCMs & id$SAFFL == 'Y') {
            sampledCMs <- CMs[sample(nrow(CMs), id$nCMs),]
            
            for (j in 1:nrow(sampledCMs)) {
                sampledCMs[j,'CMSTDY'] = sample(CMSTDY, 1)
                sampledCMs[j,'CMENDY'] = ifelse(sampledCMs[j,'CMSTDY'] < 365,
                    sample(sampledCMs[j,'CMSTDY']:365, 1),
                    365)
                sampledCMs[j,'CMINDC'] = "I'm not a doctor, I'm a data guru."
                sampledCMs[j,'CMDOSE'] = sample(CMDOSE, 1, prob = CMDOSEprobs)
                sampledCMs[j,'CMROUTE'] = sample(CMROUTE, 1, prob = CMROUTEprobs)
                sampledCMs[j,'CMONGO'] = sample(CMONGO, 1, prob = CMONGOprobs)
            }

            CM <- plyr::rbind.fill(CM, merge(id, sampledCMs, all = TRUE))
        }
    }

    CM <- CM %>%
        arrange(USUBJID, CMSTDY, CMENDY, CMTRT) %>%
        mutate(
            CMSTDT = as.Date(RFSTDTC) + CMSTDY - 1,
            CMENDT = as.Date(RFSTDTC) + CMENDY - 1,
            one = 1
        ) %>%
        select(-SAFFL, -RFSTDTC, -nCMs) %>%
        group_by(USUBJID) %>%
        mutate(CMSEQ = cumsum(one)) %>%
        ungroup() %>%
        select(-one)
    write.csv(
        CM,
        '../SDTM/CM.csv',
        row.names = FALSE,
        na = ''
    )
