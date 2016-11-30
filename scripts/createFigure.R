###################################
#  Load packages
###################################
pacman::p_load(tidyverse, stringr)

###################################
#  Function
###################################

createFigure <- function(name, example_type='R-examples') {
  
  # get existing figure folder names
  folders <- dir(file.path(getwd(),example_type))
  
  # determine next number in sequence
  if(length(folders)>0) {
    new_fig <- str_split(folders, "-", n=2)  %>%  
      map_chr(1) %>% 
      as.numeric %>% 
      max+1  
    new_fig <- sprintf(fmt = '%04d', new_fig)
  } else {
    new_fig <- "0001"
  }
  
  # create a folder for new figure
  new_fig_name <- paste0(new_fig, "-", name)
  new_fig_dir <- file.path(getwd(), example_type, new_fig_name)
  dir.create(new_fig_dir)
  
  if (example_type=='R-examples'){
    
    # create new R file from template		
    readLines(file.path("templates", "template_R.R")) %>% 
      str_replace('new_fig_dir <- "path"', 
           paste0('new_fig_dir <- "', new_fig_dir, '"')) %>% 
      str_replace('new_fig_name <- "0001-new-fig"', 
           paste0('new_fig_name <- "', new_fig_name, '"')) %>% 
      str_replace('title: "My New Figure"', 
           paste0('title: ', toupper(gsub("-", " ", name)))) %>% 
      writeLines(., file.path(new_fig_dir, c(paste0(new_fig_name, ".R"))))
  }
  else if (example_type=='SAS-examples'){ 
    
    # create new SAS file from template		
    readLines(file.path("templates", "template_SAS.sas")) %>% 
      str_replace('ods listing gpath = "new-fig-dir";',  
                  paste0('ods listing gpath = "', new_fig_dir,'";')) %>% 
      str_replace('imagename = "new_fig_name"', 
                  paste0('imagename = "',new_fig_name,'"')) %>% 
      str_replace('title: "My New Figure"', 
                  paste0('title: ', toupper(gsub("-", " ", name)))) %>% 
      writeLines(., file.path(new_fig_dir, c(paste0(new_fig_name, ".sas"))))
    
  }
  else{ # In case someone is not using SAS or R}
  }
}

