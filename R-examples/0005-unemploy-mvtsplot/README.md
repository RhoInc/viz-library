## R Example: 0005 UNEMPLOY MVTSPLOT
### *B Krouse / A Calatroni, 2016-12-09* 
  
![](H:/GitHub/viz-library/R-examples/0005-unemploy-mvtsplot/0005-unemploy-mvtsplot.png)

### Description: Mutivariate time series plot using MVTSPLOT package and Unemployment data  

### Features: multivariate, time series, heatmap, monthly  

### Code:
```r

pacman::p_load(mvtsplot)

dd <- read.csv(paste0(new_fig_dir,'/blsunemployment.csv'))
dd[,1] <- as.Date(strptime(paste(dd[,1],"01",sep="-"),"%Y-%m-%d"))

mvtsplot(dd[,-c(1,54)], xtime = dd[,1],
         sort="median",
         palette = "RdYlGn",
         #  rowstat= function(...) dd[,54],
         main="Monthly n Unemployment n(Jan 1976-nApr 2009)",
         levels=11,
         bottom.ylim=c(0,12))

# 
```



