An implementation of a reusable responsive distribution chart. Based on the concept outlined in Mike Bostocks blog post [Towards Reusable Charts.](http://bost.ocks.org/mike/chart/)

See this live on bl.ocks.org [here.](http://bl.ocks.org/asielen/92929960988a8935d907e39e60ea8417)

Features:

* Responsive design, chart size adjusts with screen <[Open in new window](http://bl.ocks.org/asielen/raw/http://bl.ocks.org/asielen/raw/92929960988a8935d907e39e60ea8417/) to see example.>
* Easily styled in CSS
* Modular design supporting 3 types of charts
  * Box Plot
  * Notched Box Plot
  * Violin Plot
  * Beeswarm Plot
  * Bean Plot
  * Trendlines
* Each chart type supports multiple options and styles such as
  * Box width
  * Show/Hide any component (median line, mean line, whiskers outliers, etc...)
  * Scatter Outliers
  * Notch style (traditional angled vs 90 degree cutouts)
  * Violin resolution and interpolation
  * Scatter style (random vs organized beeswarm)

Updated in V3:

* Support for clamping the ViolinPlot or forcing it to extend beyond the normal range to create a closed Violin
* New option to adjust the number of y axis ticks
* Now uses [Kernel Density Estimation](https://bl.ocks.org/mbostock/4341954) intstead of histogram interpolation for more accurate violin plots. 

Previous version: [Reusable Violin + Box Plot V2](http://bl.ocks.org/asielen/1a5e8d77ae8feb464167)
