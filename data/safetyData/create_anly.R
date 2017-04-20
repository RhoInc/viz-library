library(tidyverse)

### Input data
    DM <- read.csv('DM.csv', colClasses = 'character')
    AE <- read.csv('AE.csv', colClasses = 'character')
    LB <- read.csv('LB.csv', colClasses = 'character')
    VS <- read.csv('VS.csv', colClasses = 'character')

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
                'ADAE.csv',
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
            arrange(USUBJID, VISITN, CAT, TEST)

        write.csv(
            ADBDS,
            'ADBDS.csv',
            row.names = FALSE,
            na = ''
        )
