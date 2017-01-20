###########################################################################
#
# title:  "R Example 003: pirateplot using yarrr package"
# author: "Agustin Calatroni"
# date:   "October 11, 2016"
#
###########################################################################

# load packages
pacman::p_load(dplyr, tidyr, yarrr)

# load data from online
dd <- read.csv('https://vincentarelbundock.github.io/Rdatasets/csv/datasets/chickwts.csv') 

# plot function & output as PNG
png(file='./R-examples/003-pirateplot-yarrr/003-pirateplot-yarrr.png',height = 8, width = 10, units = 'in', res = 300)

pirateplot(formula = weight ~ feed,
           data = dd,
           pal =  "basel")

dev.off()
