library(tidyverse)
set.seed(2357)
nQueries <- 5000

#-------------------------------------------------------------------------------------------------#
# Input data
#-------------------------------------------------------------------------------------------------#

    forms <- read.csv('forms.csv', colClasses = 'character')
    fields <- read.csv('fields.csv', colClasses = 'character')
    statuses <- c('Open', 'Closed', 'Answered', 'Cancelled')
    statusProbs <- c(.1, .7, .1, .1)
    markingGroups <- c('Site from System', 'Site from DM', 'Site from CRA')
    markingGroupProbs <- c(.7, .2, .1)
    sites <- 1:5
    visits <- 1:10
    queryDates <- seq(as.Date('2015/1/1'), as.Date('2016/12/31'), 1)

#-------------------------------------------------------------------------------------------------#
# Sample fields
#-------------------------------------------------------------------------------------------------#

    queries <- data.frame(
            form = rep('', nQueries),
            field = rep('', nQueries),
            status = rep('', nQueries),
            markingGroup = rep('', nQueries),
            site = rep('', nQueries),
            ID = rep('', nQueries),
            visit = rep('', nQueries),
            queryDate = rep(Sys.Date(), nQueries),
        stringsAsFactors = FALSE
    )

    for (i in 1:nQueries) {
        query <- select(fields[sample(nrow(fields), 1),], -description)
        queries[i,1] <- query[1,1]
        queries[i,2] <- query[1,2]
        queries[i,3] <- sample(statuses, 1, prob = statusProbs)
        queries[i,4] <- sample(markingGroups, 1, prob = markingGroupProbs)
        queries[i,5] <- paste('Site', formatC(sample(sites, 1), width = 2, format = 'd', flag = '0'))
        queries[i,6] <- paste(strsplit(queries[i,5], ' ')[[1]][[2]], formatC(sample(1:25, 1), width = 3, format = 'd', flag = '0'), sep = '-')
        queries[i,7] <- paste('Visit', ifelse(queries[i,1] %in% c('SCRN', 'DM'), 1, sample(visits, 1)))
        queries[i,8] <- sample(queryDates, 1)
    }

    queries$queryText <- 'query text'
    
    queries1 <- queries %>%
        left_join(rename(forms, formDescription = description)) %>%
        left_join(rename(fields, fieldDescription = description))

    write.csv(
        queries1,
        'queries.csv',
        row.names = FALSE
    )