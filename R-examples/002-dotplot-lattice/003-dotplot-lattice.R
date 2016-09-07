###########################################################################
#
# title: "R Example 003: Discrete data dotplot using Lattice"
# author: "Becca Krouse"
# date: "September 6, 2016"
# tags: [R, lattice, dotplot, discrete]
# output: github_document
#
###########################################################################

# load packages
install.packages('pacman')
pacman::p_load(dplyr, tidyr, lattice, latticeExtra)

# read in CASI data
raw_data <- read.csv('https://raw.githubusercontent.com/RhoInc/CASI_MID/master/simulation/casi_apic.csv')
raw_data$physician.severity.cat.scr <- factor(raw_data$physician.severity.cat.scr, levels =c('Low','Medium','High'))

# sample some data points
dd <- raw_data %>%  sample_n(300)

# plot function
png(file='./R-examples/003-dotplot-lattice/003-dotplot-lattice.png',height = 8, width = 6, units = 'in', res = 300)

dotplot(~casi.scr|physician.severity.cat.scr,data=dd,  
        asp=0.2,
      layout=c(1,3),
        ylab=" ", xlab="", 
        as.table=T,
        col.symbol="gray50",
        scales=list(x = list(draw=F), y=list(draw=F)),
        par.strip.text = list(cex=0.8),
        par.settings=list(strip.background=list(col="gray90"),
                          axis.line=list(col='transparent'),
                          strip.border=list(col='transparent')),
        prepanel=function(...) list(xlim=c(0,20)),
        panel=function(x,y,...){
          l <- seq(0,20,5)
          panel.segments(l,0.6,l,1.5,col="gray70")          
          panel.text(l,0.55,l,col="gray70",cex=0.7)
          
          HH::panel.dotplot.tb(x,y,factor=0.7,col.line="transparent",...)
          
          panel.segments(quantile(x,0.5,type=4),0.6,quantile(x,0.5,type=4),1.5,col="red")
          panel.text(quantile(x,0.5,type=4),0.55,quantile(x,0.5,type=4),col="red",cex=0.7)
        }                    
)

dev.off()
