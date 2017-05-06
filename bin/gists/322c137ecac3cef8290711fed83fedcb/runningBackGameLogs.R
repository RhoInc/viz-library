setwd('F:/test')

### Attach required packages
    library(XML)
    library(reshape)
    library(plyr)
    library(dplyr)
    library(stringr)

### Input data
    url <- 'http://www.footballdb.com/players'
    allRBlines <- readLines(paste(url, '/current.html?pos=RB', sep = ''))
    RBurls <- allRBlines[grepl('<td><a href="\\/players\\/', allRBlines)]
    RBlines <- list()
    RBhasData <- NULL
    RBhasRushing <- NULL
    RBhasReceiving <- NULL

  # Read in each running back's web page, whose URL is of the form http://www.footballdb.com/players/<last name>-<first name>-<player ID>/gamelogs.
    for (i in seq_along(RBurls)) {
            RBurls[i] <- paste(
                url,
                strsplit(RBurls[i], '["\\/]')[[1]][6],
                'gamelogs',
                sep = '/')
            RBlines[[i]] <- readLines(RBurls[i])
            RBhasData[i] <- any(grepl('2016 season', RBlines[[i]]))
            RBhasRushing[i] <- any(grepl('Rushing Statistics', RBlines[[i]]))
            RBhasReceiving[i] <- any(grepl('Receiving Statistics', RBlines[[i]]))
    }

    RBrushing <- list()
    RBreceiving <- list()
    RBdata <- list()

  # Parse webpage for each running back.
    for (i in seq_along(RBlines)) {
        if (RBhasRushing[i] & RBhasReceiving[i]) {
          # Parse rushing table.
            RBrushing[[i]] <- readHTMLTable(RBlines[[i]])[[1]] %>%
                rename(
                    rushingYds = Yds,
                    rushingAvg = Avg,
                    rushingLg = Lg,
                    rushingTD = TD,
                    rushingFD = FD)

            for (j in 1:ncol(RBrushing[[i]])) {
                RBrushing[[i]][,j] <- as.character(RBrushing[[i]][,j])
            }

            RBrushing[[i]]$totalRushing <- sum(as.numeric(RBrushing[[i]]$Yds))
            RBrushing[[i]]$player <- strsplit(RBlines[[i]][7], '[>2]')[[1]][2]

          # Parse receiving table.
            RBreceiving[[i]] <- readHTMLTable(RBlines[[i]])[[2]] %>%
                rename(
                    receivingYds = Yds,
                    receivingAvg = Avg,
                    receivingLg = Lg,
                    receivingTD = TD,
                    receivingFD = FD)

            for (j in 1:ncol(RBreceiving[[i]])) {
                RBreceiving[[i]][,j] <- as.character(RBreceiving[[i]][,j])
            }

            RBreceiving[[i]]$player <- strsplit(RBlines[[i]][7], '[>2]')[[1]][2]
            RBreceiving[[i]]$totalReceiving <- sum(as.numeric(RBreceiving[[i]]$Yds))
            RBdata[[i]] <- full_join(RBrushing[[i]], RBreceiving[[i]])
        } else if (RBhasRushing[i]) {
          # Parse rushing table.
            RBrushing[[i]] <- readHTMLTable(RBlines[[i]])[[1]] %>%
                rename(
                    rushingYds = Yds,
                    rushingAvg = Avg,
                    rushingLg = Lg,
                    rushingTD = TD,
                    rushingFD = FD)

            for (j in 1:ncol(RBrushing[[i]])) {
                RBrushing[[i]][,j] <- as.character(RBrushing[[i]][,j])
            }

            RBrushing[[i]]$player <- strsplit(RBlines[[i]][7], '[>2]')[[1]][2]
            RBrushing[[i]]$totalRushing <- sum(as.numeric(RBrushing[[i]]$Yds))
            RBdata[[i]] <- RBrushing[[i]]
        } else if (RBhasReceiving[i]) {
          # Parse receiving table.
            RBreceiving[[i]] <- readHTMLTable(RBlines[[i]])[[2]] %>%
                rename(
                    receivingYds = Yds,
                    receivingAvg = Avg,
                    receivingLg = Lg,
                    receivingTD = TD,
                    receivingFD = FD)

            for (j in 1:ncol(RBreceiving[[i]])) {
                RBreceiving[[i]][,j] <- as.character(RBreceiving[[i]][,j])
            }

            RBreceiving[[i]]$player <- strsplit(RBlines[[i]][7], '[>2]')[[1]][2]
            RBreceiving[[i]]$totalReceiving <- sum(as.numeric(RBreceiving[[i]]$Yds))
            RBdata[[i]] <- RBreceiving[[i]]
        }
    }

    RB <- do.call('rbind.fill', RBdata) %>%
        mutate(
            Date = as.Date(Date, '%m/%d/%y'),
            FPs =
                ifelse(!is.na(rushingYds), as.numeric(rushingYds)/10, 0) +
                ifelse(!is.na(rushingTD), as.numeric(rushingTD)*6, 0) +
                ifelse(!is.na(receivingYds), as.numeric(receivingYds)/10, 0) +
                ifelse(!is.na(receivingTD), as.numeric(receivingTD)*6, 0)) %>%
        filter(Date > as.Date('2016-09-01'))
    totalFPs <- group_by(RB, player) %>%
        summarize(totalFPs = sum(FPs))
    RB1 <- left_join(RB, totalFPs) %>%
        arrange(desc(totalFPs), player, Date)

### Output data
    write.csv(
        RB1,
        file = 'runningBackGameLogs.csv',
        na = '',
        row.names = FALSE)