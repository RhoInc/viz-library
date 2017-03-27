library(tidyverse)
set.seed(2357)

## All possibilities to sample from
df <- crossing(age = seq(18,55,1),
               sex = c('M','F'),
               race = c('Black','Hispanic','White','Other/Mixed'),
               arm = c('Treatment A','Treatment B','Placebo'),
               rfstdtc = seq(as.Date('2015/1/1'),as.Date('2015/12/31'), 1))%>% 
  group_by(arm) %>% 
  sample_n(size=50) 

dd <- crossing(siteid = sprintf('%02d', seq(1,5,1)),
                  subjid = sprintf('%03d', seq(1,30,1))) %>% 
  mutate(usubjid = paste0(siteid, '-', subjid)) %>% 
  sample_n(size = 150) %>% 
  bind_cols(df) %>% 
  mutate(
      SAFFN = rep(c(rep(0,5), rep(1, 45)), 3),
      SAFFL = ifelse(SAFFN, 'Y', 'N')) %>%
  select(-subjid) %>% 
  select(usubjid, siteid, age, sex, race, arm, rfstdtc, SAFFL) %>%
  arrange(usubjid)

names(dd) <- toupper(names(dd))

write.csv(dd, 'DM.csv', row.names=F)
