## R Example 0004: Pirate Plot using yarrr 
### *Agustin Calatroni, October 11, 2016* 
  
![](003-pirateplot-yarrr.png)

### What is a pirateplot()?

A pirateplot, from the `yarrr` package (`devtools::install_github('ndphillips/yarrr', build_vignette = T`) is the RDI (**Raw** data, **Descriptive** statistics, and **Inferential** statistics) plotting choice of R pirates who are displaying the relationship between 1 or two categorical independent variables, and one continuous dependent variable.

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

### Code:
```r
pirateplot(formula = weight ~ feed,
           data = dd,
           pal =  "basel")
```