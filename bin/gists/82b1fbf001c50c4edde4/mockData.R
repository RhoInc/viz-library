# Quick simulated Clinical Trials DAta
library(dplyr)
n<-100

mockData<- data.frame(id=1:n)%>%
  mutate(
    gender=ifelse(runif(n)>0.5, "M","F"),
    age=ceiling(rnorm(n,50,10)),
    treatment=ifelse(runif(n)>0.5, "Treatment","Placebo"),
    outcome=ifelse(runif(n)>0.8,"Pass","Fail")
  )

write.csv(mockData, "/Users/jwildfire/Sites/PopulationExplorer_gist/mockData.csv")