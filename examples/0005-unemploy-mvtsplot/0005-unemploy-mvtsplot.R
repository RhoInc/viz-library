#' ---
#' title: UNEMPLOY MVTSPLOT
#' description: Mutivariate time series plot using MVTSPLOT package and Unemployment data
#' author: B Krouse / A Calatroni
#' language: R
#' package: MVTSPLOT
#' plot type: mutivariate time series
#' features: multivariate, time series, heatmap, monthly
#' ---



new_fig_dir <- "H:/GitHub/viz-library/examples/0005-unemploy-mvtsplot"
new_fig_name <- "0005-unemploy-mvtsplot"

# Figure code

pacman::p_load(mvtsplot)

dd <- read.csv(paste0(new_fig_dir,'/blsunemployment.csv'))
dd[,1] <- as.Date(strptime(paste(dd[,1],"01",sep="-"),"%Y-%m-%d"))

mvtsplot(dd[,-c(1,54)], xtime = dd[,1],
         sort="median",
         palette = "RdYlGn",
         #  rowstat= function(...) dd[,54],
         main="Monthly \n Unemployment \n(Jan 1976-\nApr 2009)",
         levels=11,
         bottom.ylim=c(0,12))

# Save image of figure:
png(filename = paste0(new_fig_dir,'/',new_fig_name, ".png"), width = 7, height = 6, units='in', res=300)
mvtsplot(dd[,-c(1,54)], xtime = dd[,1],
         sort="median",
         palette = "RdYlGn",
         #  rowstat= function(...) dd[,54],
         main="Monthly \n Unemployment \n(Jan 1976-\nApr 2009)",
         levels=11,
         bottom.ylim=c(0,12))

dev.off()

# Create tags and README.md
source('util/r_scripts/createSuppFiles.R')
createSuppFiles(new_fig_name, example_type='R-examples')
