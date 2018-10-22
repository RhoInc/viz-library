library(tidyverse)
set.seed(2357)

### Input data
    DM <- read.csv('../SDTM/DM.csv', colClasses = 'character') %>% select(USUBJID, SAFFL, RFSTDTC)
    AEs <- read.csv('../raw/adverseEvents.csv', colClasses = 'character')

### Output data
    AE <- NULL
    AEsample <- 0:5

    AESTDY <- 1:365

    AESER <- c('N', 'Y')
    AESERprobs <- c(.9, .1)

    AESEV <- c('MILD', 'MODERATE', 'SEVERE')
    AESEVprobs <- c(.6, .3, .1)

    AEREL <- c('NOT RELATED', 'UNLIKELY RELATED', 'POSSIBLY RELATED', 'PROBABLY RELATED', 'DEFINITELY RELATED')
    AERELprobs <- c(.3, .25, .2, .15, .1)

    AEOUT <- c('RECOVERED', 'RESOLVED, RECOVERED', 'RESOLVED WITHOUT SEQUELAE', 'RESOLVED WITH SEQUELAE')
    AEOUTprobs <- c(.4, .3, .2, .1)

    AEONGO <- c('N', 'Y')
    AEONGOprobs <- c(.5, .5)

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
                sampledAEs[j,'AEONGO'] = sample(AEONGO, 1, prob = AEONGOprobs)
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
        select(USUBJID, AESEQ, AESTDT, AESTDY, AEENDT, AEENDY, AETERM, AEDECOD, AEBODSYS, AESER, AEONGO, AESEV, AEREL, AEOUT)
    write.csv(
        AE,
        '../SDTM/AE.csv',
        row.names = FALSE,
        na = ''
    )
