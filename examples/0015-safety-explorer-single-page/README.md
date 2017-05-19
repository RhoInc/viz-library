**Title:** Safety Explorer Suite - Single Page

**Languages:** javascript

**Libraries:** safety-explorer-suite, webcharts, safety-histogram, safety-results-over-time, safety-shift-plot, safety-outlier-explorer, ae-timeline, ae-explorer

**Description:** Example of the safety explorer suite, a simple framework combining 6 interactive safety charts in to a single page.

**Tags:** interactive, queries

**Data:** ../../data/safetyData-queries/

**Code:** example.html

**Results:** example.html

[comment]: <> (---END OF HEADER---)
The primary advantage to loading all 6 charts on a single page, is that the data only needs to be loaded once, and can then be re-used in all relevant charts. This example loads the data from csv (by specifying loadcsv:true in the .init() method), but the data can also be passed as json. 
