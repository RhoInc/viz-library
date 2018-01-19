library(tidyverse)
set.seed(2357)

### Input data
    SV <- read.csv('../SDTM/SV.csv', colClasses = 'character') %>% rename(VSDT = SVDT, VSDY = SVDY)
    visits <- read.csv('../raw/scheduleOfEvents.csv', colClasses = 'character')
    vitals <- read.csv('../raw/vitalSigns.csv', colClasses = 'character') %>%
        select(-VSAGELO, -VSAGEHI) %>%
        mutate(one = 1) %>%
        group_by(VSTEST) %>%
        mutate(seq = cumsum(one)) %>%
        filter(row_number() == n()) %>%
        select(-one, -seq) %>%
        ungroup()

### Output data
    VS <- NULL

    for (i in 1:nrow(SV)) {
        visit <- SV[i,]
        vs_vis <- merge(vitals, visit, all = TRUE)

        for (j in 1:nrow(vs_vis)) {
            VSSTNRLO <- as.numeric(vs_vis[j,'VSSTNRLO'])
            VSSTNRHI <- as.numeric(vs_vis[j,'VSSTNRHI'])
            mean <- (VSSTNRHI + VSSTNRLO)/2
            std <- (VSSTNRHI - VSSTNRLO)/2
            vs_vis[j,'VSSTRESN'] <- max(rnorm(1, mean, std), 0)
        }

        VS <- plyr::rbind.fill(VS, vs_vis)
    }

    visits_vitals <- merge(visits, vitals, all = TRUE) %>%
        sample_n(nrow(visits)*nrow(vitals)/10) %>%
        mutate(VISIT_VSTEST = paste(VISIT, VSTEST, sep = '_'))

    VS <- VS %>%
        mutate(
            VSSTRESN = ifelse(
                !paste(VISIT, VSTEST, sep = '_') %in% visits_vitals$VISIT_VSTEST,
                    VSSTRESN,
                    NA
            )
        ) %>%
        arrange(USUBJID, VISITNUM, VSTEST) %>%
        select(USUBJID, VISIT, VISITNUM, VSDT, VSDY, VSCAT, VSTEST, VSSTRESU, VSSTRESN, VSSTNRLO, VSSTNRHI)

    write.csv(
        VS,
        '../SDTM/VS.csv',
        row.names = FALSE,
        na = ''
    )