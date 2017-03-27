library(tidyverse)
library(XML)

## Labs
    labsURL <- 'http://www.merckmanuals.com/professional/appendixes/normal-laboratory-values/blood-tests-normal-values'
    labs <- lapply(readHTMLTable(doc = labsURL)[[1]], as.character)
    names(labs) <- c('tempTest', 'specimen', 'Conventional', 'SI')
    labs1 <- labs %>%
        tbl_df %>%
        mutate(
            tempTest = sub(':', '', tempTest),
            LLN_cv = substring(Conventional, 1, regexpr('\u2013', Conventional) - 1),
            tempULN_cv = substring(Conventional, regexpr('\u2013', Conventional) + 1),
            ULN_cv = substring(tempULN_cv, 1, regexpr(' ', tempULN_cv) - 1),
            units_cv = substring(tempULN_cv, regexpr(' ', tempULN_cv) + 1),
            
            LLN_si = substring(SI, 1, regexpr('\u2013', SI) - 1),
            tempULN_si = substring(SI, regexpr('\u2013', SI) + 1),
            ULN_si = substring(tempULN_si, 1, regexpr(' ', tempULN_si) - 1),
            units_si = substring(tempULN_si, regexpr(' ', tempULN_si) + 1)
        ) %>%
        select(tempTest, specimen, LLN_cv, ULN_cv, units_cv, LLN_si, ULN_si, units_si)
    
    ## Retain spanning tests.
        for (i in 1:nrow(labs1)) {
            test <- labs1[i,] %>% .$tempTest %>% as.character()
            
            if (labs1[i,'specimen'] == '')
                spanningTest <- labs1[i,] %>% .$tempTest %>% as.character()
            
            if (!test %in% c('Females', 'Males', 'Direct', 'Total') & !grepl('male', test, T))
                labs1[i,'test'] <- test
            else if (test %in% c('Females', 'Males')) {
                labs1[i,'test'] <- spanningTest
                labs1[i,'SEX'] <- substring(test, 1, 1)
            } else if (grepl('male', test, T)) {
                labs1[i,'test'] <- substring(test, 1, regexpr(',', test) - 1)
                labs1[i,'SEX'] <- toupper(substring(test, regexpr('male', test), regexpr('male', test)))
            } else
                labs1[i,'test'] <- paste(test, spanningTest, sep = ' ')
        }
    
    ## Keep only those tests with a normal range and units.
        labs2 <- labs1 %>%
            filter(LLN_si != '' & ULN_si != '' & test %in% c(
                'Albumin',
                'Alkaline phosphatase (ALP)',
                'Aminotransferase, alanine (ALT)',
                'Aminotransferase, aspartate (AST)',
                'Direct Bilirubin',
                'Total Bilirubin',
                'Calcium',
                'Chloride',
                'Creatinine',
                'IgE',
                'Magnesium',
                'Platelet count',
                'Potassium',
                'RBC count',
                'Sodium',
                'WBC count')) %>%
            select(specimen, test, SEX, LLN_si, ULN_si, units_si) %>%
            rename(
                LBCAT = specimen,
                LBTEST = test,
                LBSTNRLO = LLN_si,
                LBSTNRHI = ULN_si,
                LBSTRESU = units_si)
        write.csv(
            labs2,
            'labs.csv',
            row.names = FALSE,
            na = '')
