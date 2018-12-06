library(tidyverse)
set.seed(2357)
nQueries <- 5000

#-------------------------------------------------------------------------------------------------#
# Input data
#-------------------------------------------------------------------------------------------------#

    forms <- read.csv('forms.csv', colClasses = 'character', check.names = FALSE)
    fields <- read.csv('fields.csv', colClasses = 'character', check.names = FALSE)
    statuses <- c('Closed', 'Cancelled') # Open and Answered defined by query answered/resolved dates or lack thereof
    statusProbs <- c(.75, .25)
    markingGroups <- c('Site from System', 'Site from DM', 'Site from CRA')
    markingGroupProbs <- c(.7, .2, .1)
    sites <- 1:5
    visits <- 1:10
    snapshotDate <- as.Date('2016-12-31')
    queryDates <- seq(as.Date('2015-01-01'), snapshotDate, 1)
    responses <- runif(nQueries)
    resolvers <- runif(nQueries)

#-------------------------------------------------------------------------------------------------#
# Sample fields
#-------------------------------------------------------------------------------------------------#

    queries <- data.frame(
            sitename = rep('', nQueries),
            subjectnameoridentifier  = rep('', nQueries),
            folderoid = rep('', nQueries),
            formoid = rep('', nQueries),
            fieldname = rep('', nQueries),
            markinggroup = rep('', nQueries),
            queryopendt = rep(Sys.Date(), nQueries),
            queryresponsedt = rep(Sys.Date(), nQueries),
            queryresolveddt = rep(Sys.Date(), nQueries),
            querystatus = rep('', nQueries),
            odays = rep(0, nQueries),
            queryrecency = rep(0, nQueries), # also derived in renderer
            qdays = rep(0, nQueries),
            queryage = rep('', nQueries), # also derived in renderer
        stringsAsFactors = FALSE,
        check.names = FALSE
    )

    for (i in 1:nQueries) {
        query <- fields[sample(nrow(fields), 1),] # no need for select() with -Field because data no longer contains a field var for explaining field
        queries[i,'sitename'] <- paste(
            'Site',
            formatC(sample(sites, 1), width = 2, format = 'd', flag = '0')
        )
        queries[i,'subjectnameoridentifier'] <- paste(
            strsplit(queries[i,'sitename'], ' ')[[1]][[2]],
            formatC(sample(1:25, 1), width = 3, format = 'd', flag = '0'),
            sep = '-'
        )
        queries[i,'folderoid'] <- paste(
            'Visit',
            ifelse(
                query[1,1] %in% c('SCRN', 'DM'),
                1,
                sample(visits, 1)
            )
        )
        queries[i,'formoid'] <- query[1,1]
        queries[i,'fieldname'] <- query[1,2]
        queries[i,'markinggroup'] <- sample(markingGroups, 1, prob = markingGroupProbs)
        queries[i,'queryopendt'] <- sample(queryDates, 1)
        queries[i,'queryresponsedt'] <- sample(seq(queries[i,'queryopendt'], snapshotDate, 1), 1) # sample a date between query open date and the snapshot date
        if (responses[i] < .75) {
            queries[i,'queryresponsedt'] <- NA # simulate queries that never received a response
            queries[i,'queryresolveddt'] <- sample(seq(queries[i,'queryopendt'], snapshotDate, 1), 1) # sample a date between query open date and the snapshot date
        } else
            queries[i,'queryresolveddt'] <- sample(seq(queries[i,'queryresponsedt'], snapshotDate, 1), 1) # sample a date between query response date and the snapshot date
        if (resolvers[i] < .25)
            queries[i,'queryresolveddt'] <- NA # simulate queries that were never resolved
        queries[i,'querystatus'] <- case_when(
            is.na(queries[i,'queryresponsedt']) & is.na(queries[i,'queryresolveddt']) ~ 'Open',
            !is.na(queries[i,'queryresponsedt']) & is.na(queries[i,'queryresolveddt']) ~ 'Answered',
            TRUE ~ sample(statuses, 1, prob = statusProbs)
        )
        queries[i,'odays'] <- as.numeric(snapshotDate - queries[i,'queryopendt'])
        queries[i,'queryrecency'] <- case_when(
            queries[i,'odays'] <= 7 ~ '7 days',
            queries[i,'odays'] <= 14 ~ '14 days',
            queries[i,'odays'] <= 30 ~ '30 days',
            TRUE ~ ''
        )
        queries[i,'qdays'] <- case_when(
            queries[i,'querystatus'] == 'Answered' ~ as.numeric(queries[i,'queryresponsedt'] - queries[i,'queryopendt']),
            queries[i,'querystatus'] %in% c('Closed', 'Cancelled') ~ as.numeric(queries[i,'queryresolveddt'] - queries[i,'queryopendt']),
            TRUE ~ queries[i,'odays']
        )
        queries[i,'queryage'] <- case_when(
            queries[i,'querystatus'] %in% c('Answered', 'Closed', 'Cancelled') ~ queries[i,'querystatus'],
            queries[i,'qdays'] <=  14 ~ '0-2 weeks',
            queries[i,'qdays'] <=  28 ~ '2-4 weeks',
            queries[i,'qdays'] <=  56 ~ '4-8 weeks',
            queries[i,'qdays'] <= 112 ~ '8-16 weeks',
            TRUE ~ '>16 weeks'
        )
    }

    print(table(queries$querystatus))
    print(table(queries$queryrecency))
    print(table(queries$queryage))

    queries$querytext <- 'query text'

    queries1 <- queries %>%
        left_join(forms) %>%
        left_join(fields) %>%
        mutate(
            open_time = queryrecency
        )

    write.csv(
        queries1,
        'queries.csv',
        row.names = FALSE
    )
    write.csv(
        queries1,
        'dmq_Queries.csv',
        row.names = FALSE
    )