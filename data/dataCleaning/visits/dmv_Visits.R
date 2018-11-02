library(tidyverse)
set.seed(2357)

### Input data
    DM <- read.csv('../../safetyData/SDTM/DM.csv', colClasses = 'character')
    SV <- read.csv('../../safetyData/SDTM/SV.csv', colClasses = 'character')

### Encodings
    visit_metadata <- list(
        list(
            status = 'Completed',
            order = 1,
            status_color = '#33a02c',
            description = 'Visit entered into EDC system',
            text_color = 'black'
        ),
        list(
            status = 'Expected',
            order = 2,
            status_color = '#1f78b4',
            description = 'Visit expected in the future',
            text_color = '#1f78b4'
        ),
        list(
            status = 'Overdue',
            order = 3,
            status_color = '#cc4c02',
            description = 'Visit due but not entered into EDC system',
            text_color = '#cc4c02'
        ),
        list(
            status = 'Missed',
            order = 4,
            status_color = '#a50f15',
            description = 'Visit missed',
            text_color = '#a50f15'
        ),
        list(
            status = 'Terminated',
            order = 5,
            status_color = 'gray',
            description = 'Subject terminated prior to visit',
            text_color = 'gray'
        ),
        list(
            status = 'Failed',
            order = 6,
            status_color = 'gray',
            description = 'Subject failed screening',
            text_color = 'gray'
        )
    )

### Data manipulation
    dmv_Visits <- SV %>%
        left_join(
            select(DM, USUBJID, SITE, SBJTSTAT, SAFFL),
            by = 'USUBJID'
        ) %>%
        rename(
            subjectnameoridentifier = USUBJID,
            site_name = SITE,
            subject_status = SBJTSTAT,
            visit_name = VISIT,
            visit_number = VISITNUM,
            visit_date = SVDT,
            visit_day = SVDY,
            visit_status = SVSTATUS
        )

    # Attach visit metadata as columns in data frame.
    for (i in 1:nrow(dmv_Visits)) {
        visit_metadatum <- visit_metadata[
            which(sapply(visit_metadata, '[[', 1) == dmv_Visits[i,'visit_status'])
        ][[1]]

        dmv_Visits[i,'visit_status_order'] = visit_metadatum$order
        dmv_Visits[i,'visit_status_color'] = visit_metadatum$status_color
        dmv_Visits[i,'visit_status_description'] = visit_metadatum$description
        dmv_Visits[i,'visit_text_color'] = visit_metadatum$text_color
    }

    # Derive additional variables.
    overdueVisits <- dmv_Visits %>%
        filter(visit_status == 'Overdue') %>%
        group_by(subjectnameoridentifier) %>%
        mutate(
            nOverdue = n()
        ) %>%
        ungroup()
    overdue2 <- unique(pull(filter(overdueVisits, nOverdue > 1), subjectnameoridentifier))
    dmv_Visits1 <- dmv_Visits %>%
        mutate(
            visit_text = case_when(
                visit_status %in% c('Expected', 'Overdue') ~ visit_date,
                TRUE ~ visit_status
            ),
            subset1 = ifelse(subject_status == 'Ongoing', 'Active Participants', ''),
            subset2 = ifelse(grepl('^(Visit \\d)$', visit_name), 'On Treatment', ''),
            subset3 = ifelse(SAFFL == 'Y', 'Safety Population', ''),
            overdue2 = ifelse(subjectnameoridentifier %in% overdue2, 'Yes', ''),
            plot_exclude = ifelse(visit_status %in% c('Failed', 'Terminated'), 'Yes', '')
        ) %>%
        select(
            site_name,
            subjectnameoridentifier,
            subject_status,
            visit_name,
            visit_number,
            visit_date,
            visit_day,
            visit_status,
            visit_status_order,
            visit_status_color,
            visit_status_description,
            visit_text,
            visit_text_color,
            subset1,
            subset2,
            subset3,
            overdue2,
            plot_exclude
        )

### Output data
    dmv_Visits1 %>%
        write.csv(
            'dmv_Visits.csv',
            na = '',
            row.names = FALSE
        )