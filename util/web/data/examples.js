var examples = [
  {
    dir: "0001-density-lattice",
    files: [
      "0001-density-lattice.R",
      "0001-density-lattice.png",
      "0001-density-lattice_thumb.png",
      "README.md",
      "index.html",
      "thumb.png"
    ],
    paths: {
      root: "./examples/0001-density-lattice/",
      readme: "README.md",
      index: "index.html",
      thumb: "thumb.png",
      data: "../../data/ChickWeight.csv",
      code: "0001-density-lattice.R",
      example: "0001-density-lattice.png"
    },
    readme: {},
    title: "Density Plot",
    languages: "R",
    libraries: "lattice",
    description: "Customized density plot created using lattice combining paneling, grouping, custom annotations and some simple data manipulation.",
    data: "../../data/ChickWeight.csv",
    code: "0001-density-lattice.R",
    results: "0001-density-lattice.png",
    tags: "density plot, lattice, r, groups, means, annotated, faceted",
    makeIndex: true
  },
  {
    dir: "0002-dotplot-ggplot",
    files: [
      "0002-dotplot-ggplot.R",
      "0002-dotplot-ggplot.png",
      "README.md",
      "index.html",
      "thumb.png"
    ],
    paths: {
      root: "./examples/0002-dotplot-ggplot/",
      readme: "README.md",
      index: "index.html",
      thumb: "thumb.png",
      data: "../../data/discrete_scores.csv",
      code: "0002-dotplot-ggplot.R",
      example: "0002-dotplot-ggplot.png"
    },
    readme: {},
    title: "Stacked Dot Plot #1",
    languages: "R",
    libraries: "ggplot2",
    description: "Stacked dot plot created using ggplot2 combining paneling, custom annotations and some simple data manipulation.",
    data: "../../data/discrete_scores.csv",
    code: "0002-dotplot-ggplot.R",
    results: "0002-dotplot-ggplot.png",
    tags: "dotplot, r, ggplot2, facet, median, highlight, stack points, discrete",
    makeIndex: true
  },
  {
    dir: "0003-dotplot-lattice",
    files: [
      "0003-dotplot-lattice.R",
      "0003-dotplot-lattice.png",
      "0003-dotplot-lattice_tags.txt",
      "README.md",
      "index.html",
      "thumb.png"
    ],
    paths: {
      root: "./examples/0003-dotplot-lattice/",
      readme: "README.md",
      index: "index.html",
      thumb: "thumb.png",
      data: "../../data/discrete_scores.csv",
      code: "0003-dotplot-lattice.R",
      example: "0003-dotplot-lattice.png"
    },
    readme: {},
    title: "Stacked Dot Plot #2",
    languages: "R",
    libraries: "lattice",
    description: 'Stacked dot plot created using ggplot2 combining paneling, custom annotations and simple data manipulation. Similar to <a href="../0002-dotplot-lattice">this example</a> made with lattice.',
    data: "../../data/discrete_scores.csv",
    code: "0003-dotplot-lattice.R",
    results: "0003-dotplot-lattice.png",
    tags: "dotplot, r, lattice, facet, median, highlight, stack points, discrete",
    makeIndex: true
  },
  {
    dir: "0004-pirateplot-yarrr",
    files: [
      "0004-pirateplot-yarrr.R",
      "0004-pirateplot-yarrr.png",
      "0004-pirateplot-yarrr_tags.txt",
      "README.md",
      "index.html",
      "thumb.png"
    ],
    paths: {
      root: "./examples/0004-pirateplot-yarrr/",
      readme: "README.md",
      index: "index.html",
      thumb: "thumb.png",
      data: "https://vincentarelbundock.github.io/Rdatasets/csv/datasets/chickwts.csv",
      code: "0004-pirateplot-yarrr.R",
      example: "0004-pirateplot-yarrr.png"
    },
    readme: {},
    title: "Pirate plot using Yarrr",
    languages: "R",
    libraries: "yarrr",
    description: "Combines a box-and-whisker plot with overlaid density plots to show clear comparisons of distributions across groups; a good choice for  displaying the relationship between 1 or two categorical independent variables, and one continuous dependent variable.",
    data: "https://vincentarelbundock.github.io/Rdatasets/csv/datasets/chickwts.csv",
    code: "0004-pirateplot-yarrr.R",
    results: "0004-pirateplot-yarrr.png",
    tags: "pirateplot, boxplot, density plot, violin plot",
    makeIndex: true
  },
  {
    dir: "0005-unemploy-mvtsplot",
    files: [
      "0005-unemploy-mvtsplot.R",
      "0005-unemploy-mvtsplot.png",
      "README.md",
      "blsunemployment.csv",
      "index.html",
      "thumb.png"
    ],
    paths: {
      root: "./examples/0005-unemploy-mvtsplot/",
      readme: "README.md",
      index: "index.html",
      thumb: "thumb.png",
      data: "Precipitations.csv",
      code: "0005-unemploy-mvtsplot.R",
      example: "0005-unemploy-mvtsplot.png"
    },
    readme: {},
    title: "Unemployment Trends with a Multivariate Time Series",
    languages: "R",
    libraries: "mvtsplot",
    description: "Mutivariate time series plot using MVTSPLOT package and Unemployment data",
    data: "Precipitations.csv",
    code: "0005-unemploy-mvtsplot.R",
    results: "0005-unemploy-mvtsplot.png",
    tags: "multivariate, time series, heatmap, monthly",
    makeIndex: true
  },
  {
    dir: "0006-precip-levelplot-lattice",
    files: [
      "0006-precip-levelplot-lattice.R",
      "0006-precip-levelplot-lattice.png",
      "Precipitations.csv",
      "README.md",
      "index.html",
      "thumb.png"
    ],
    paths: {
      root: "./examples/0006-precip-levelplot-lattice/",
      readme: "README.md",
      index: "index.html",
      thumb: "thumb.png",
      data: "blsunemployment.csv",
      code: "0006-precip-levelplot-lattice.R",
      example: "0006-precip-levelplot-lattice.png"
    },
    readme: {},
    title: "Orderered Precipitation Heatmap",
    languages: "R",
    libraries: "lattice",
    description: "Heatmap with ordered columns and rows using monthly precipitation data",
    data: "blsunemployment.csv",
    code: "0006-precip-levelplot-lattice.R",
    results: "0006-precip-levelplot-lattice.png",
    tags: "Ordered, heatmap, annotation",
    makeIndex: true
  },
  {
    dir: "0007-simple-barchart-webcharts",
    files: [
      "OlympicMedals2012.csv",
      "README.md",
      "example.html",
      "index.html",
      "simpleBarChart.js",
      "thumb.png"
    ],
    paths: {
      root: "./examples/0007-simple-barchart-webcharts/",
      readme: "README.md",
      index: "index.html",
      thumb: "thumb.png",
      data: "OlympicMedals2012.csv",
      code: "simpleBarChart.js",
      example: "example.html"
    },
    readme: {},
    title: "Simple Interactive Bar Chart",
    languages: "javascript",
    libraries: "webcharts",
    description: "This is a simple bar chart showing counts of medals won by country at the 2012 summer Olympics. Made with Webcharts.",
    data: "OlympicMedals2012.csv",
    code: "simpleBarChart.js",
    results: null,
    tags: "interactive, bar chart",
    makeIndex: true
  },
  {
    dir: "0008-safetyExplorer-default",
    files: [
      "README.md",
      "ae-table",
      "ae-timelines",
      "chart.html",
      "index.html",
      "safety-histogram",
      "safety-outlier-explorer",
      "safety-results-over-time",
      "safety-shift-plot",
      "safetyExplorer.css",
      "thumb.png",
      "timeline.png"
    ],
    paths: {
      root: "./examples/0008-safetyExplorer-default/",
      readme: "README.md",
      index: "index.html",
      thumb: "thumb.png",
      data: "../../data/safetyData/",
      code: "ae-table/index.html",
      example: "ae-table/index.html"
    },
    readme: {},
    title: "Safety Explorer - Default Configuration",
    languages: "javascript",
    libraries: "webcharts, safety-histogram, safety-results-over-time, safety-shift-plot, safety-outlier-explorer, ae-timeline, ae-explorer",
    description: "The safety explorer is a collection of interactive graphics visualizing adverse event, lab, and vital sign data captured in clinical trials.  This instance demonstrates each graphic with default settings.",
    data: "../../data/safetyData/",
    code: "ae-table/index.html",
    results: "ae-table/index.html",
    tags: "interactive, webcharts, adverse events, safety explorer",
    makeIndex: true
  },
  {
    dir: "0009-web-codebook-demo",
    files: [
      "GitHub-Mark-32px.png",
      "README.md",
      "example.html",
      "index.html",
      "screen.png",
      "thumb.png",
      "webCodebookDemo.js"
    ],
    paths: {
      root: "./examples/0009-web-codebook-demo/",
      readme: "README.md",
      index: "index.html",
      thumb: "thumb.png",
      data: "../../data/safetyData/",
      code: "webCodebookDemo.js",
      example: "example.html"
    },
    readme: {},
    title: "Web Codebook Demo",
    languages: "javascript",
    libraries: "web-codebook",
    description: "Demonstration of the web-based data summaries using web-codebook.",
    data: "../../data/safetyData/",
    code: "webCodebookDemo.js",
    results: "example.html",
    tags: "interactive, codebook",
    makeIndex: true
  },
  {
    dir: "0010-spike-histogram",
    files: [
      "README.md",
      "example.html",
      "index.html",
      "paneledSpikeHistogram.js",
      "spikeHistogram.js",
      "thumb.png"
    ],
    paths: {
      root: "./examples/0010-spike-histogram/",
      readme: "README.md",
      index: "index.html",
      thumb: "thumb.png",
      data: "../../data/safetyData/",
      code: "paneledSpikeHistogram.js",
      example: "example.html"
    },
    readme: {},
    title: "Spike Histogram Demo",
    languages: "javascript",
    libraries: "spike-histogram",
    description: "Demonstration of a web-based spike histogram with paneling capability and modals.",
    data: "../../data/safetyData/",
    code: "paneledSpikeHistogram.js",
    results: "example.html",
    tags: "interactive, histogram, spike",
    makeIndex: true
  },
  {
    dir: "0011-safetyExplorer-queries",
    files: [
      "README.md",
      "ae-table",
      "ae-timelines",
      "chart.html",
      "index.html",
      "safety-histogram",
      "safety-outlier-explorer",
      "safety-results-over-time",
      "safety-shift-plot",
      "safetyExplorer.css",
      "screenshot.png",
      "thumb.png"
    ],
    paths: {
      root: "./examples/0011-safetyExplorer-queries/",
      readme: "README.md",
      index: "index.html",
      thumb: "thumb.png",
      data: "../../data/safetyData-queries/",
      code: "ae-table/index.html",
      example: "ae-table/index.html"
    },
    readme: {},
    title: "Safety Explorer with Query Data",
    languages: "javascript",
    libraries: "webcharts, safety-histogram, safety-results-over-time, safety-shift-plot, safety-outlier-explorer, ae-timeline, ae-explorer",
    description: "The safety explorer is a collection of interactive graphics visualizing adverse event, lab, and vital sign data captured in clinical trials.  This instance demonstrates customized versions of each graphic including added filters and/or highlights for query data.",
    data: "../../data/safetyData-queries/",
    code: "ae-table/index.html",
    results: "ae-table/index.html",
    tags: "interactive, webcharts, adverse events, safety explorer, queries",
    makeIndex: true
  },
  {
    dir: "0012-web-codebook-explorer",
    files: [
      "GitHub-Mark-32px.png",
      "README.md",
      "example.html",
      "index.html",
      "screen.png",
      "thumb.png",
      "webCodebookExplorer.js"
    ],
    paths: {
      root: "./examples/0012-web-codebook-explorer/",
      readme: "README.md",
      index: "index.html",
      thumb: "thumb.png",
      data: "../../data/safetyData/",
      code: "webCodebookExplorer.js",
      example: "example.html"
    },
    readme: {},
    title: "Web Codebook Explorer",
    languages: "javascript",
    libraries: "web-codebook",
    description: "Demonstration of the web-based data summaries using web-codebook.",
    data: "../../data/safetyData/",
    code: "webCodebookExplorer.js",
    results: "example.html",
    tags: "interactive, codebook",
    makeIndex: true
  },
  {
    dir: "0013-query-overview",
    files: [
      "GitHub-Mark-32px.png",
      "README.md",
      "example.html",
      "index.html",
      "screen.png",
      "thumb.png",
      "webCodebookExplorer.js"
    ],
    paths: {
      root: "./examples/0013-query-overview/",
      readme: "README.md",
      index: "index.html",
      thumb: "thumb.png",
      data: "../../data/queries/queries.csv",
      code: "example.html",
      example: "example.html"
    },
    readme: {},
    title: "Query Overview",
    languages: "javascript",
    libraries: "query-overview",
    description: "Explorer clinical trial query data using the query-overview library.",
    data: "../../data/queries/queries.csv",
    code: "example.html",
    results: "example.html",
    tags: "interactive, queries",
    makeIndex: true
  }
];
