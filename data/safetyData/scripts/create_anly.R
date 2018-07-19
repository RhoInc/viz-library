library(dplyr)

### Input data
    DM <- read.csv('../SDTM/DM.csv', colClasses = 'character')
    AE <- read.csv('../SDTM/AE.csv', colClasses = 'character')
    CM <- read.csv('../SDTM/CM.csv', colClasses = 'character')
    SV <- read.csv('../SDTM/SV.csv', colClasses = 'character')
    LB <- read.csv('../SDTM/LB.csv', colClasses = 'character')
    VS <- read.csv('../SDTM/VS.csv', colClasses = 'character')

### Output data
    ### ADSL
        ADSL <- DM %>%
            left_join(
                SV %>%
                    filter(VISIT == 'Visit 1') %>%
                    select(USUBJID, SVDT, SVDY) %>%
                    rename(
                        RANDDT = SVDT,
                        RANDDY = SVDY
                    )
            ) %>%
            left_join(
                SV %>%
                    filter(VISIT == 'End of Study') %>%
                    select(USUBJID, SVDT, SVDY) %>%
                    rename(
                        COMPLDT = SVDT,
                        COMPLDY = SVDY
                    )
            ) %>%
            left_join(
                AE %>%
                    select(USUBJID) %>%
                    distinct() %>%
                    mutate(ANYAEFL = 'Y')
            ) %>%
            left_join(
                CM %>%
                    select(USUBJID) %>%
                    distinct() %>%
                    mutate(ANYCMFL = 'Y')
            ) %>%
            mutate(
                ANYAEFL = ifelse(is.na(ANYAEFL), 'N', 'Y'),
                ANYCMFL = ifelse(is.na(ANYCMFL), 'N', 'Y')
            ) %>%
            arrange(USUBJID)
        write.csv(
            ADSL,
            '../ADSL.csv',
            row.names = FALSE,
            na = ''
        )

    ### ADAE
        ADAE <- full_join(DM, AE) %>%
            arrange(USUBJID, AESEQ) %>%
            rename(
                ASEQ = AESEQ,
                ASTDT = AESTDT,
                ASTDY = AESTDY,
                AENDT = AEENDT,
                AENDY = AEENDY
            ) %>%
            mutate(
                AESEQ = ASEQ
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
                ASEQ = CMSEQ,
                ASTDT = CMSTDT,
                ASTDY = CMSTDY,
                AENDT = CMENDT,
                AENDY = CMENDY
            ) %>%
            mutate(
                CMSEQ = ASEQ
            )
            write.csv(
                ADCM,
                '../ADCM.csv',
                row.names = FALSE,
                na = ''
            )

    ### ADTIMELINES
        ADTIMELINES <- DM %>%
            full_join(
                rbind(
                    select(DM, USUBJID, RFSTDTC) %>%
                        mutate(
                            DOMAIN = 'Enrollment',
                            SEQ = 1,
                            STDY = 1,
                            ENDY = 1,
                            ENDT = RFSTDTC,
                            ONGO = NA,
                            OFFSET = 0
                        ) %>%
                        rename(
                            STDT = RFSTDTC
                        ) %>%
                        select(USUBJID, DOMAIN, STDT, STDY, ENDT, ENDY, SEQ, ONGO, OFFSET),
                    select(AE, USUBJID, AESTDT, AESTDY, AEENDT, AEENDY, AESEQ, AEONGO) %>%
                        mutate(
                            DOMAIN = 'Adverse Events',
                            OFFSET = 1
                        ) %>%
                        rename(
                            STDT = AESTDT,
                            STDY = AESTDY,
                            ENDT = AEENDT,
                            ENDY = AEENDY,
                            SEQ = AESEQ,
                            ONGO = AEONGO
                        ) %>%
                        select(USUBJID, DOMAIN, STDT, STDY, ENDT, ENDY, SEQ, ONGO, OFFSET),
                    select(CM, USUBJID, CMSTDT, CMSTDY, CMENDT, CMENDY, CMSEQ, CMONGO) %>%
                        mutate(
                            DOMAIN = 'Concomitant Medications',
                            OFFSET = 2
                        ) %>%
                        rename(
                            STDT = CMSTDT,
                            STDY = CMSTDY,
                            ENDT = CMENDT,
                            ENDY = CMENDY,
                            SEQ = CMSEQ,
                            ONGO = CMONGO
                        ) %>%
                        select(USUBJID, DOMAIN, STDT, STDY, ENDT, ENDY, SEQ, ONGO, OFFSET),
                    filter(SV, VISIT == 'Visit 1') %>%
                        mutate(
                            DOMAIN = 'Randomization',
                            SEQ = 1,
                            STDY = SVDY,
                            ENDY = SVDY,
                            ENDT = SVDT,
                            ONGO = NA,
                            OFFSET = 0
                        ) %>%
                        rename(
                            STDT = SVDT
                        ) %>%
                        select(USUBJID, DOMAIN, STDT, STDY, ENDT, ENDY, SEQ, ONGO, OFFSET),
                    filter(SV, VISIT == 'End of Study') %>%
                        mutate(
                            DOMAIN = 'Study Completion',
                            SEQ = 1,
                            STDY = SVDY,
                            ENDY = SVDY,
                            ENDT = SVDT,
                            ONGO = NA,
                            OFFSET = 0
                        ) %>%
                        rename(
                            STDT = SVDT
                        ) %>%
                        select(USUBJID, DOMAIN, STDT, STDY, ENDT, ENDY, SEQ, ONGO, OFFSET)
                )
            ) %>%
        mutate(
            TOOLTIP = paste('This mark definitely represents the', DOMAIN, 'domain', sep = ' ')
        ) %>%
        arrange(USUBJID, DOMAIN, SEQ)
        write.csv(
            ADTIMELINES,
            '../ADTIMELINES.csv',
            row.names = FALSE,
            na = ''
        )

    ### ADLB
        ADLB <- LB %>%
            left_join(ADSL) %>%
            rename(
                PARAMCAT = LBCAT,
                AVISIT = VISIT,
                AVISITN = VISITNUM,
                AVAL = LBSTRESN,
                ANRLO = LBSTNRLO,
                ANRHI = LBSTNRHI,
                ADT = LBDT,
                ADY = LBDY
            ) %>%
            mutate(
                PARAM = ifelse(
                    LBSTRESU != '',
                        paste0(LBTEST, ' (', LBSTRESU, ')'),
                        LBTEST
                )
            ) %>%
            select(names(ADSL), AVISIT, AVISITN, ADT, ADY, PARAMCAT, PARAM, AVAL, ANRLO, ANRHI) %>%
            arrange(USUBJID, AVISITN, PARAMCAT, PARAM)
        write.csv(
            ADLB,
            '../ADLB.csv',
            row.names = FALSE,
            na = ''
        )

    ### ADVS
        ADVS <- VS %>%
            left_join(ADSL) %>%
            rename(
                PARAMCAT = VSCAT,
                AVISIT = VISIT,
                AVISITN = VISITNUM,
                AVAL = VSSTRESN,
                ANRLO = VSSTNRLO,
                ANRHI = VSSTNRHI,
                ADT = VSDT,
                ADY = VSDY
            ) %>%
            mutate(
                PARAM = ifelse(
                    VSSTRESU != '',
                        paste0(VSTEST, ' (', VSSTRESU, ')'),
                        VSTEST
                )
            ) %>%
            select(names(ADSL), AVISIT, AVISITN, ADT, ADY, PARAMCAT, PARAM, AVAL, ANRLO, ANRHI) %>%
            arrange(USUBJID, AVISITN, PARAMCAT, PARAM)
        write.csv(
            ADVS,
            '../ADVS.csv',
            row.names = FALSE,
            na = ''
        )

    ### ADBDS
        lb <- LB
        names(lb) <- sapply(names(lb), function(name) {
            if (grepl('LB', name))
                return(substring(name, 3))
            else
                return(name)
        })
        vs <- VS
        names(vs) <- sapply(names(vs), function(name) {
            if (grepl('VS', name))
                return(substring(name, 3))
            else
                return(name)
        })
        LBVS <- plyr::rbind.fill(lb,vs) %>%
            mutate(VISITN = VISITNUM)
        ADBDS <- full_join(DM, LBVS) %>%
            arrange(USUBJID, VISITN, CAT, TEST
        )
        write.csv(
            ADBDS,
            '../ADBDS.csv',
            row.names = FALSE,
            na = ''
        )
