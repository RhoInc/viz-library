###################################
#  Load packages
###################################
pacman::p_load(tidyverse, stringr)

###################################
#  Function
###################################

createSuppFiles <- function(new_fig_name, example_type='R-examples') {
  
  new_fig_dir <- file.path(getwd(), example_type, new_fig_name)
  
  if (example_type=='R-examples'){
    txt <- readLines(paste0(new_fig_dir,'/',new_fig_name,'.R'))
    description <- str_split(txt[3],':') %>%  map(2) %>%  str_trim
    name <- str_split(txt[4],':') %>%  map(2) %>%  str_trim
    features <- str_split(txt[8],':') %>% map(2) %>% str_trim
    
    readLines('templates/example_README.md') %>% 
      str_replace('R Example 001: My New Figure',
                  paste0('R Example: ',toupper(gsub("-", " ", new_fig_name)))) %>% 
      str_replace('Name, Date',paste0(name,', ',Sys.Date())) %>% 
      str_replace('description',description) %>% 
      str_replace('features',paste0('Features: ',features)) %>% 
      str_replace('path', paste(new_fig_dir)) %>% 
      str_replace('new_fig_name', paste(new_fig_name)) %>% 
      writeLines(., paste0(new_fig_dir, "/README.md"))    
  }
  else{ # TO-DO: SAS TEMPLATE}


  }
}