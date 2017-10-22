library(tidyverse)

### Input data
    DM <- read.csv('../SDTM/DM.csv', colClasses = 'character')
    AE <- read.csv('../SDTM/AE.csv', colClasses = 'character')
    CM <- read.csv('../SDTM/CM.csv', colClasses = 'character')
    SV <- read.csv('../SDTM/SV.csv', colClasses = 'character')
    LB <- read.csv('../SDTM/LB.csv', colClasses = 'character')
    VS <- read.csv('../SDTM/VS.csv', colClasses = 'character')

### Output data
    ### ADAE
        ADAE <- full_join(DM, AE) %>%
            arrange(USUBJID, AESEQ) %>%
            rename(
                ASTDY = AESTDY,
                AENDY = AEENDY
            )
            write.csv(
                ADAE,
                '../ADAE.csv',
                row.names = FALSE,
                na = ''
            )

    ### ADCM
        ADCM <- full_join(DM, CM) %>%
            arrange(USUBJID, CMSEQ) %>%
            rename(
                ASTDY = CMSTDY,
                CMNDY = CMENDY
            )
            write.csv(
                ADCM,
                '../ADCM.csv',
                row.names = FALSE,
                na = ''
            )
            
    ### ADTIMELINES
        ADTIMELINES = rbind(
            select(DM, USUBJID) %>%
                mutate(
                    DOMAIN = 'Enrollment',
                    SEQ = 1,
                    STDY = 1,
                    ENDY = 1
                ) %>%
                select(USUBJID, DOMAIN, SEQ, STDY, ENDY),
            select(AE, USUBJID, AESTDY, AEENDY, AESEQ) %>%
                mutate(
                    DOMAIN = 'Adverse Events'
                ) %>%
                rename(
                    SEQ = AESEQ,
                    STDY = AESTDY,
                    ENDY = AEENDY
                ) %>%
                select(USUBJID, DOMAIN, SEQ, STDY, ENDY),
            select(CM, USUBJID, CMSTDY, CMENDY, CMSEQ) %>%
                mutate(
                    DOMAIN = 'Concomitant Medications'
                ) %>%
                rename(
                    SEQ = CMSEQ,
                    STDY = CMSTDY,
                    ENDY = CMENDY
                ) %>%
                select(USUBJID, DOMAIN, SEQ, STDY, ENDY),
            filter(SV, VISIT == 'Visit 1') %>%
                mutate(
                    DOMAIN = 'Randomization',
                    SEQ = 1,
                    STDY = SVDY,
                    ENDY = SVDY
                ) %>%
                select(USUBJID, DOMAIN, SEQ, STDY, ENDY),
            filter(SV, VISIT == 'End of Study') %>%
                mutate(
                    DOMAIN = 'Study Completion',
                    SEQ = 1,
                    STDY = SVDY,
                    ENDY = SVDY
                ) %>%
                select(USUBJID, DOMAIN, SEQ, STDY, ENDY)
        ) %>%
        arrange(USUBJID, DOMAIN, SEQ)
        write.csv(
            ADTIMELINES,
            '../ADTIMELINES.csv',
            row.names = FALSE,
            na = ''
        )

    ### ADBDS
        names(LB) <- sapply(names(LB), function(name) {
            if (grepl('LB', name))
                return(substring(name, 3))
            else
                return(name)
        })
        names(VS) <- sapply(names(VS), function(name) {
            if (grepl('VS', name))
                return(substring(name, 3))
            else
                return(name)
        })
        LBVS <- plyr::rbind.fill(LB,VS) %>%
            rename(VISITN = VISITNUM)
        ADBDS <- full_join(DM, LBVS) %>%
            arrange(USUBJID, VISITN, CAT, TEST
        )
        write.csv(
            ADBDS,
            '../ADBDS.csv',
            row.names = FALSE,
            na = ''
        )
