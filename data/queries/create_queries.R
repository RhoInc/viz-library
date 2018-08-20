library(tidyverse)
set.seed(2357)
nQueries <- 5000
#-------------------------------------------------------------------------------------------------#
# Input data
#-------------------------------------------------------------------------------------------------#

    forms <- read.csv('forms.csv', colClasses = 'character', check.names = FALSE)
    fields <- read.csv('fields.csv', colClasses = 'character', check.names = FALSE)
    statuses <- c('Open', 'Closed', 'Answered', 'Cancelled')
    statusProbs <- c(.1, .7, .1, .1)
    markingGroups <- c('Site from System', 'Site from DM', 'Site from CRA')
    markingGroupProbs <- c(.7, .2, .1)
    sites <- 1:5
    visits <- 1:10
    queryDates <- seq(as.Date('2015-01-01'), as.Date('2016-12-31'), 1)

#-------------------------------------------------------------------------------------------------#
# Sample fields
#-------------------------------------------------------------------------------------------------#

    queries <- data.frame(
            `Datastr` = rep('', nQueries),
            `Field Name` = rep('', nQueries),
            `Query Status` = rep('', nQueries),
            `Query Open By: Marking Group` = rep('', nQueries),
            `Site Name` = rep('', nQueries),
            `ID` = rep('', nQueries),
            `Visit/Folder` = rep('', nQueries),
            `Query Open Date` = rep(Sys.Date(), nQueries),
            `Query Close Date` = rep(Sys.Date(), nQueries),
            `Query Age` = rep(0, nQueries),
            `Query Age Category` = rep('', nQueries),
            `Query Open Time` = rep(0, nQueries),
            `Query Open Category` = rep(0, nQueries),
        stringsAsFactors = FALSE,
        check.names = FALSE
    )

    for (i in 1:nQueries) {
        query <- select(fields[sample(nrow(fields), 1),], -Field)
        queries[i,1] <- query[1,1]
        queries[i,2] <- query[1,2]
        queries[i,3] <- sample(statuses, 1, prob = statusProbs)
        queries[i,4] <- sample(markingGroups, 1, prob = markingGroupProbs)
        queries[i,5] <- paste('Site', formatC(sample(sites, 1), width = 2, format = 'd', flag = '0'))
        queries[i,6] <- paste(strsplit(queries[i,5], ' ')[[1]][[2]], formatC(sample(1:25, 1), width = 3, format = 'd', flag = '0'), sep = '-')
        queries[i,7] <- paste('Visit', ifelse(queries[i,1] %in% c('SCRN', 'DM'), 1, sample(visits, 1)))
        queries[i,8] <- sample(queryDates, 1)
        queries[i,9] <- sample(seq(queries[i,8], as.Date('2016-12-31'), 1), 1)
        queries[i,10] <- ifelse(
            queries[i,3] %in% c('Closed', 'Cancelled'),
                as.numeric(queries[i,9] - queries[i,8]),
                as.numeric(as.Date('2016-12-31') - queries[i,8])
        )
        if (!queries[i,3] %in% c('Closed', 'Cancelled'))
            queries[i,9] = NA
        queries[i,11] <- case_when(
            queries[i,3] %in% c('Closed', 'Cancelled') ~ queries[i,3],
            queries[i,10] <=  28 ~ '0-4 weeks',
            queries[i,10] <=  56 ~ '4-8 weeks',
            queries[i,10] <= 112 ~ '8-16 weeks',
            TRUE                 ~ '>16 weeks'
        )
        queries[i,12] <- as.numeric(as.Date('2016-12-31') -  queries[i,8]) # pretend like it's Dec. 31 in 2016
        queries[i,13] <- case_when(
          queries[i,3] %in% c('Closed', 'Cancelled') ~ queries[i,3],
          queries[i,12] <=  7 ~ '7 days',
          queries[i,12] <=  14 ~ '14 days',
          queries[i,12] <= 30 ~ '30 days',
          TRUE                 ~ '> 30 days'
        )

    }

    queries$`Query Text` <- 'query text'

    queries1 <- queries %>%
        left_join(forms) %>%
        left_join(fields)

    write.csv(
        queries1,
        'queries.csv',
        row.names = FALSE
    )
