###########################################################################
#
# title: "R Example 001: Density plot using Lattice"
# author: "Becca Krouse"
# date: "August 31, 2016"
# tags: [R, lattice, density-plot]
# output: github_document
#
###########################################################################

# load packages
pacman::p_load(dplyr, tidyr, lattice, latticeExtra, ggplot2, datasets)

# data - subset to measurements on Days 0 and Day 8
dd <- read.csv('data/ChickWeight.csv') %>% 
  filter(Time %in% c(0,8)) %>% 
  mutate(Diet = as.factor(Diet))
levels(dd$Diet) <- paste0('Diet #', levels(dd$Diet))

# define colors
pal<-brewer.pal(3,"Set1")
cols<-  c(pal[1],pal[2])
cols2<- c("#E41A1C11","#377EB811")

# plot function
png(file='002-density-lattice.png',height = 8, width = 10, units = 'in', res = 300)


densityplot(~weight|Diet, group=Time, data=dd,
            alpha=0.7, 
            plot.points=F, 
            as.table=T,
            bw=10,
            col=cols,
            lwd=2,
            allow.multiple=T,
            ylab='',
            xlab='Chick Weight (gm)',
            between=list(x=1, y=0),
            xlim=c(0, 160),
            ylim=c(0,0.045),
            scales=list(alternating=F, tck=c(1,0), axs='i',
                        x=list(relation='free', at=seq(0,160,40)),
                        y=list(tck=c(0,0), labels=NULL)),
            par.settings=list(strip.background=list(col='gray80')),
            panel.groups = function(x, group.number, subscripts, ...) {
              
              panel.densityplot(x,...)
              
              # Fill the Area under the Curve for Mean +/- 1 SD
              mean  <- mean(x,na.rm=T)
              sd    <- sd(x,na.rm=T)
              f    <- 0.5
              d    <- density(x,cut=0.5, bw=10)
              
              ytop  <- d$y[d$x<mean+f*sd & d$x>mean-f*sd]
              xtop  <- d$x[d$x<mean+f*sd & d$x>mean-f*sd]
              xx  <- c(mean-f*sd,xtop,mean+f*sd)
              yy  <- c(0,ytop,0)
              
              # Create a line at the mean
              diffs  <-abs(d$x-mean)
              lx  <- d$x[diffs==min(diffs)]
              ly  <- d$y[diffs==min(diffs)]
              
              panel.polygon(x=xx,y=yy,col=cols2[group.number],border=F)
              panel.lines(x=c(lx,lx),y=c(0,ly),col=cols[group.number],lty=2)
              panel.text(lx,ly,
                         labels=paste("Day ",dd[subscripts,]$Time[1]," - ",round(mean(x),1)," (",round(sd(x),1),")",sep=""),
                         adj=c(-0.1,-0.1),
                         col=cols[group.number],
                         cex=0.7)
              
            },
            panel = function (x, groups,...){
              panel.superpose(x, groups=groups, ...)
            })

dev.off()
