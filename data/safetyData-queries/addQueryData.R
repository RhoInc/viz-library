library(tidyverse)
set.seed(2357)

#ADAE
ADAE<-read.csv('../safetyData/ADAE.csv')%>%
mutate(QUERYFL=ifelse(runif(n())<0.1,'Y','N'))%>%
mutate(QUERYDETAILS=ifelse(QUERYFL=='Y','This is some sample query text.',''))

write.csv(
    ADAE,
    'ADAE.csv',
    na = ' ',
    row.names = F)

#ADBDS
ADBDS<-read.csv('../safetyData/ADBDS.csv')%>%
  mutate(QUERYFL=ifelse(runif(n())<0.1,'Y','N'))%>%
  mutate(QUERYDETAILS=ifelse(QUERYFL=='Y','This is some sample query text.',''))

write.csv(
    ADBDS,
    'ADBDS.csv',
    na = ' ',
    row.names = F)
