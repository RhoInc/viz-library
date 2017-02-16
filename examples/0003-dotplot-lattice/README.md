**Title:** Stacked Dot Plot #2

**Languages:** R

**Libraries:** lattice

**Description:** Stacked dot plot created using ggplot2 combining paneling, custom annotations and simple data manipulation. Similar to <a href="../0002-dotplot-lattice">this example</a> made with lattice.

**Tags:** dotplot, r, lattice, facet, median, highlight, stack points, discrete  

[comment]: <> (---END OF HEADER---)
[comment]: <> (---NO AUTO INDEX---)

*B Krouse, 2017-01-20* 
  
![](0003-dotplot-lattice.png)

### Description: Discrete data dotplot using Lattice  

### Features: 

### Code:
```r


# load packages 
pacman::p_load(dplyr, tidyr, lattice, latticeExtra, HH)

# read in data
data <- read.csv('examples/0000-sample-data/discrete_scores.csv')

# define function to customize vertical lines & associated axis tick labels
# by coloring median values red, and the rest gray
panel.dotplot_highlightMedian <- function(x, l){  # l = vector of axis tick values
  
  panel.segments(l,0.6,l,1.5,col="gray70")          
  panel.text(l,0.55,l,col="gray70",cex=0.7)
  
  panel.segments(quantile(x,0.5,type=4),0.6,quantile(x,0.5,type=4),1.5,col="red")
  panel.text(quantile(x,0.5,type=4),0.55,quantile(x,0.5,type=4),col="red",cex=0.7)
}

# plot function
p <- dotplot(~score|category, 
        data=data, 
        col.symbol="gray50",
        asp=0.2, layout=c(1,4),as.table=T,
        ylab=" ", xlab="", 
        scales=list(x = list(draw=F), y=list(draw=F)),
        par.strip.text = list(cex=0.8),
        par.settings=list(strip.background=list(col="gray90"),
                          axis.line=list(col='transparent'),
                          strip.border=list(col='transparent')),
        main="Discrete Scores by Category",
        prepanel=function(...) list(xlim=c(0,100)),
        panel=function(x,y,...){
          
          # highlight median values red, while the rest of the lines/values are gray
          l <- seq(0,100,20)
          panel.dotplot_highlightMedian(x,l)
          
          # Plot dotplot - multiple hits on a specific x value are stacked
          HH::panel.dotplot.tb(x,y,factor=0.5,col.line="transparent",...)
        }                    
)


```



