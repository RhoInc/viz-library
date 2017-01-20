#' ---
#' title: PIRATEPLOT YARRR
#' description:  Pirate plot using yarrr package
#' author: A. Calatroni 
#' language: R
#' package: yarrr
#' plot type: pirate plot
#' features: Ordered, heatmap, annotation, boxplot, violinplot, facet, median, colors, jitter, discrete 
#' ---

new_fig_dir <- "H:/GitHub/viz-library/examples/0004-pirateplot-yarrr"
new_fig_name <- "0004-pirateplot-yarrr"

# Figure code 

# load packages
pacman::p_load(dplyr, tidyr, yarrr)

# load data from online
dd <- read.csv('https://vincentarelbundock.github.io/Rdatasets/csv/datasets/chickwts.csv') 

# plot function  
p <- pirateplot(formula = weight ~ feed,
                data = dd,
                pal =  "basel")



# Save image of figure:
png(file='examples/0004-pirateplot-yarrr/0004-pirateplot-yarrr.png',height = 8, width = 10, units = 'in', res = 300)

p <- pirateplot(formula = weight ~ feed,
                data = dd,
                pal =  "basel")

dev.off()
