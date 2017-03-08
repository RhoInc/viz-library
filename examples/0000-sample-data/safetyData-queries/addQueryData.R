library(tidyverse)

inPath<-"/Users/jwildfire/Sites/misc/viz-library/examples/0000-sample-data/safetyData/"
outPath<-"/Users/jwildfire/Sites/misc/viz-library/examples/0000-sample-data/safetyData-queries/"


#AES
aes<-read.csv(paste0(inPath,"ADAE.csv"))%>%
mutate(QUERYFL=ifelse(runif(n())<0.1,"Y","N"))%>%
mutate(QUERYDETAILS=ifelse(QUERYFL=="Y","This is some sample query text.",""))

write.csv(aes,paste0(outPath,"ADAE.csv"))

#Labs
aes<-read.csv(paste0(inPath,"ADBDS.csv"))%>%
  mutate(QUERYFL=ifelse(runif(n())<0.1,"Y","N"))%>%
  mutate(QUERYDETAILS=ifelse(QUERYFL=="Y","This is some sample query text.",""))

write.csv(aes,paste0(outPath,"ADBDS.csv"))