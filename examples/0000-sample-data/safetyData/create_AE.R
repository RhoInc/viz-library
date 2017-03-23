library(tidyverse)
set.seed(2357)

### Input data
    DM <- read.csv('DM.csv', colClasses = 'character') %>% select(USUBJID, SAFFL, RFSTDTC)
    AEs <- read.csv('adverseEvents.csv', colClasses = 'character')

### Output data
    AE <- NULL
    AEsample <- 0:5
    
    AESTDY <- 1:365
    
    AESER <- c('N', 'Y')
    AESERprobs <- c(.9, .1)
    
    AESEV <- c('MILD', 'MODERATE', 'SEVERE')
    AESEVprobs <- c(.6, .3, .1)
    
    AEREL <- c('NOT RELATED', 'UNLIKELY RELATED', 'POSSIBLY RELATED', 'PROBABLY RELATED', 'DEFINITELY RELEATED')
    AERELprobs <- c(.3, .25, .2, .15, .1)
    
    AEOUT <- c('RECOVERED', 'RESOLVED, RECOVERED', 'RESOLVED WITHOUT SEQUELAE', 'RESOLVED WITH SEQUELAE')
    AEOUTprobs <- c(.4, .3, .2, .1)
    
    for (i in 1:nrow(DM)) {
        id <- DM[i,]
        id$nAEs <- sample(AEsample, 1)
        
        if (id$nAEs & id$SAFFL == 'Y') {
            sampledAEs <- AEs[sample(nrow(AEs), id$nAEs),]
            
            for (j in 1:nrow(sampledAEs)) {
                sampledAEs[j,'AESTDY'] = sample(AESTDY, 1)
                sampledAEs[j,'AEENDY'] = ifelse(sampledAEs[j,'AESTDY'] < 365,
                    sample(sampledAEs[j,'AESTDY']:365, 1),
                    365)
                sampledAEs[j,'AESER'] = sample(AESER, 1, prob = AESERprobs)
                sampledAEs[j,'AESEV'] = sample(AESEV, 1, prob = AESEVprobs)
                sampledAEs[j,'AEREL'] = sample(AEREL, 1, prob = AERELprobs)
                sampledAEs[j,'AEOUT'] = sample(AEOUT, 1, prob = AEOUTprobs)
            }
            
            AE <- plyr::rbind.fill(AE, merge(id, sampledAEs, all = TRUE))
        }
    }

    AE <- AE %>%
        arrange(USUBJID, AESTDY, AEENDY, AETERM) %>%
        mutate(
            AESTDT = as.Date(RFSTDTC) + AESTDY - 1,
            AEENDT = as.Date(RFSTDTC) + AEENDY - 1,
            one = 1
        ) %>%
        select(-SAFFL, -RFSTDTC, -nAEs) %>%
        group_by(USUBJID) %>%
        mutate(AESEQ = cumsum(one)) %>%
        ungroup() %>%
        select(-one)
    write.csv(
        AE,
        'AE.csv',
        row.names = FALSE,
        na = ''
    )
    write.csv(
        AE,
        '../../233/data/AE.csv',
        row.names = FALSE,
        na = ''
    )
