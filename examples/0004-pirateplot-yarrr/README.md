**Title:** Pirate plot using Yarrr

**Languages:** R

**Libraries:** yarrr

**Description:** Combines a box-and-whisker plot with overlaid density plots to show clear comparisons of distributions across groups; a good choice for  displaying the relationship between 1 or two categorical independent variables, and one continuous dependent variable.

**Tags:** pirateplot, boxplot, density plot, violin plot

**Data:** https://vincentarelbundock.github.io/Rdatasets/csv/datasets/chickwts.csv

**Code:** 0004-pirateplot-yarrr.R

**Results:** 0004-pirateplot-yarrr.png

*Agustin Calatroni, October 11, 2016*

### What is a pirateplot()?

A pirateplot, from the yarrr package is the RDI (**Raw** data, **Descriptive** statistics, and **Inferential** statistics) plotting choice of R pirates who are displaying the relationship between 1 or two categorical independent variables, and one continuous dependent variable.

### Elements
A pirateplot() has 4 distinct elements

1. points, symbols representing the raw data (jittered horizontally)
2. bar, a vertical bar showing central tendencies
3. bean, a smoothed density (inspired by @kampstra2008beanplot) representing a smoothed density
4. inf, a rectangle representing an inference interval (either a Bayesian Highest Density Interval or a frequentist confidence interval)

![Elements of a priateplot](http://nathanieldphillips.com/wp-content/uploads/2016/10/pirateplot-elements.png)

### References
- A Companion to the e-Book YaRrr!: [The Pirate's Guide to R](http://nathanieldphillips.com/thepiratesguidetor/)
- [yarrr package](https://CRAN.R-project.org/package=yarrr)
- Github repo [ndphillips/yarrr](https://github.com/ndphillips/yarrr)
