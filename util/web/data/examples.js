var examples = [
    {
        dir: '0001-density-lattice',
        files: [
            '0001-density-lattice.png',
            '0001-density-lattice.R',
            '0001-density-lattice_thumb.png',
            'index.html',
            'package.json',
            'thumb.png'
        ],
        paths: {
            root: './examples/0001-density-lattice/',
            index: 'index.html',
            thumb: 'thumb.png',
            package: 'package.json'
        },
        package: {
            homepage: '0001-density-lattice.png',
            main: '0001-density-lattice.R',
            name: 'density-plot',
            label: 'Density Plot with Lattice',
            version: '1.0.0',
            description:
                'Customized density plot created using lattice combining paneling, grouping, custom annotations and some simple data manipulation.',
            author: 'Rho, Inc.',
            license: 'MIT',
            keywords: ['density plot', 'lattice', 'r', 'groups', 'means', 'annotated', 'faceted'],
            rDependencies: {
                dplyr: null,
                tidyr: null,
                lattice: null,
                latticeExtra: null,
                ggplot2: null,
                datasets: null
            },
            dataDependecies: ['../../data/ChickWeight.csv']
        },
        index:
            '<html lang="en">\r\n<head>\r\n  <title></title>\r\n  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">\r\n</head>\r\n<body><div class="head">\r\n  <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">\r\n  <link rel="stylesheet" href="../../util/web/css/examples.css">\r\n  <ul class = \'vl-ex-header\'>\r\n      <li class = "icon"><a href="../../"><img src="../../util/web/img/rho.png"></a></li>\r\n      <li class = "site crumb"><a href="../../"><span>Graphics</span></a></li>\r\n      <li class = \'crumb\'>Example</li>\r\n      <li class = \'title\'></li>\r\n      <li class = \'info\' title="Click to toggle chart details" onclick="toggleDetails()">&#9432;</li>\r\n      <li class = \'arrow next-arrow right\'><a href=""></a></li>\r\n      <li class = \'arrow back-arrow right\'><a href=""></a></li>\r\n  </ul>\r\n  <div id=\'vl-ex-details\' style="display:none;">\r\n    <p class="vl-ex-description"></p>\r\n\r\n    <ul class="vl-ex-tags"></ul>\r\n  </div>\r\n  <script>\r\n    function toggleDetails(){\r\n      var details = document.getElementById("vl-ex-details");\r\n      if (details.style.display === "none") {\r\n          details.style.display = "block";\r\n      } else {\r\n          details.style.display = "none";\r\n        }\r\n    }\r\n  </script>\r\n</div>\r\n\r\n  <div class="example">\r\n    <img width="960" src="">\r\n  </div>\r\n</body>\r\n</html>\r\n'
    },
    {
        dir: '0002-dotplot-ggplot',
        files: [
            '0002-dotplot-ggplot.png',
            '0002-dotplot-ggplot.R',
            'index.html',
            'package.json',
            'thumb.png'
        ],
        paths: {
            root: './examples/0002-dotplot-ggplot/',
            index: 'index.html',
            thumb: 'thumb.png',
            package: 'package.json'
        },
        package: {
            homepage: '0002-dotplot-ggplot.png',
            main: '0002-dotplot-ggplot.R',
            name: 'dotplot-ggplot',
            label: 'Stacked Dot Plot (ggplot)',
            version: '1.0.0',
            description:
                'Stacked dot plot created using ggplot2 combining paneling, custom annotations and some simple data manipulation.',
            author: 'Rho, Inc.',
            license: 'MIT',
            keywords: [
                'dotplot',
                'R',
                'ggplot2',
                'facet',
                'median',
                'highlight',
                'stacked points',
                'discrete'
            ],
            rDependencies: {
                dplyr: null,
                tidyr: null,
                ggplot2: null
            },
            dataDependecies: ['../../data/discrete_scores.csv']
        },
        index:
            '<html lang="en">\r\n<head>\r\n  <title></title>\r\n  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">\r\n</head>\r\n<body><div class="head">\r\n  <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">\r\n  <link rel="stylesheet" href="../../util/web/css/examples.css">\r\n  <ul class = \'vl-ex-header\'>\r\n      <li class = "icon"><a href="../../"><img src="../../util/web/img/rho.png"></a></li>\r\n      <li class = "site crumb"><a href="../../"><span>Graphics</span></a></li>\r\n      <li class = \'crumb\'>Example</li>\r\n      <li class = \'title\'></li>\r\n      <li class = \'info\' title="Click to toggle chart details" onclick="toggleDetails()">&#9432;</li>\r\n      <li class = \'arrow next-arrow right\'><a href=""></a></li>\r\n      <li class = \'arrow back-arrow right\'><a href=""></a></li>\r\n  </ul>\r\n  <div id=\'vl-ex-details\' style="display:none;">\r\n    <p class="vl-ex-description"></p>\r\n\r\n    <ul class="vl-ex-tags"></ul>\r\n  </div>\r\n  <script>\r\n    function toggleDetails(){\r\n      var details = document.getElementById("vl-ex-details");\r\n      if (details.style.display === "none") {\r\n          details.style.display = "block";\r\n      } else {\r\n          details.style.display = "none";\r\n        }\r\n    }\r\n  </script>\r\n</div>\r\n\r\n  <div class="example">\r\n    <img width="960" src="">\r\n  </div>\r\n</body>\r\n</html>\r\n'
    },
    {
        dir: '0003-dotplot-lattice',
        files: [
            '0003-dotplot-lattice.png',
            '0003-dotplot-lattice.R',
            '0003-dotplot-lattice_tags.txt',
            'index.html',
            'package.json',
            'thumb.png'
        ],
        paths: {
            root: './examples/0003-dotplot-lattice/',
            index: 'index.html',
            thumb: 'thumb.png',
            package: 'package.json'
        },
        package: {
            homepage: '0003-dotplot-lattice.png',
            main: '0003-dotplot-lattice.R',
            name: 'dotplot-lattice',
            label: 'Stacked Dot Plot (lattice)',
            version: '1.0.0',
            description:
                'Stacked dot plot created using lattice combining paneling, custom annotations and some simple data manipulation.',
            author: 'Rho, Inc.',
            license: 'MIT',
            keywords: [
                'dotplot',
                'R',
                'lattice',
                'facet',
                'median',
                'highlight',
                'stacked points',
                'discrete'
            ],
            rDependencies: {
                dplyr: null,
                tidyr: null,
                ggplot2: null
            },
            dataDependecies: ['../../data/discrete_scores.csv']
        },
        index:
            '<html lang="en">\r\n<head>\r\n  <title></title>\r\n  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">\r\n</head>\r\n<body><div class="head">\r\n  <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">\r\n  <link rel="stylesheet" href="../../util/web/css/examples.css">\r\n  <ul class = \'vl-ex-header\'>\r\n      <li class = "icon"><a href="../../"><img src="../../util/web/img/rho.png"></a></li>\r\n      <li class = "site crumb"><a href="../../"><span>Graphics</span></a></li>\r\n      <li class = \'crumb\'>Example</li>\r\n      <li class = \'title\'></li>\r\n      <li class = \'info\' title="Click to toggle chart details" onclick="toggleDetails()">&#9432;</li>\r\n      <li class = \'arrow next-arrow right\'><a href=""></a></li>\r\n      <li class = \'arrow back-arrow right\'><a href=""></a></li>\r\n  </ul>\r\n  <div id=\'vl-ex-details\' style="display:none;">\r\n    <p class="vl-ex-description"></p>\r\n\r\n    <ul class="vl-ex-tags"></ul>\r\n  </div>\r\n  <script>\r\n    function toggleDetails(){\r\n      var details = document.getElementById("vl-ex-details");\r\n      if (details.style.display === "none") {\r\n          details.style.display = "block";\r\n      } else {\r\n          details.style.display = "none";\r\n        }\r\n    }\r\n  </script>\r\n</div>\r\n\r\n  <div class="example">\r\n    <img width="960" src="">\r\n  </div>\r\n</body>\r\n</html>\r\n'
    },
    {
        dir: '0004-pirateplot-yarrr',
        files: [
            '0004-pirateplot-yarrr.png',
            '0004-pirateplot-yarrr.R',
            'index.html',
            'package.json',
            'README.md',
            'thumb.png'
        ],
        paths: {
            root: './examples/0004-pirateplot-yarrr/',
            index: 'index.html',
            thumb: 'thumb.png',
            package: 'package.json'
        },
        package: {
            homepage: '0004-pirateplot-yarrr.png',
            main: '0004-pirateplot-yarrr.R',
            name: 'pirate-plot',
            label: 'Pirate plot using Yarrr',
            version: '1.0.0',
            description:
                'Combines a box-and-whisker plot with overlaid density plots to show clear comparisons of distributions across groups; a good choice for  displaying the relationship between 1 or two categorical independent variables, and one continuous dependent variable.',
            author: 'Rho, Inc.',
            license: 'MIT',
            keywords: [
                'boxplot',
                'violinplot',
                'r',
                'lattice',
                'facet',
                'median',
                'colors',
                'jitter',
                'discrete'
            ],
            rDependencies: {
                dplyr: null,
                tidyr: null,
                yarrr: null
            },
            dataDependecies: [
                'https://vincentarelbundock.github.io/Rdatasets/csv/datasets/chickwts.csv'
            ]
        },
        index:
            '<html lang="en">\r\n<head>\r\n  <title></title>\r\n  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">\r\n</head>\r\n<body><div class="head">\r\n  <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">\r\n  <link rel="stylesheet" href="../../util/web/css/examples.css">\r\n  <ul class = \'vl-ex-header\'>\r\n      <li class = "icon"><a href="../../"><img src="../../util/web/img/rho.png"></a></li>\r\n      <li class = "site crumb"><a href="../../"><span>Graphics</span></a></li>\r\n      <li class = \'crumb\'>Example</li>\r\n      <li class = \'title\'></li>\r\n      <li class = \'info\' title="Click to toggle chart details" onclick="toggleDetails()">&#9432;</li>\r\n      <li class = \'arrow next-arrow right\'><a href=""></a></li>\r\n      <li class = \'arrow back-arrow right\'><a href=""></a></li>\r\n  </ul>\r\n  <div id=\'vl-ex-details\' style="display:none;">\r\n    <p class="vl-ex-description"></p>\r\n\r\n    <ul class="vl-ex-tags"></ul>\r\n  </div>\r\n  <script>\r\n    function toggleDetails(){\r\n      var details = document.getElementById("vl-ex-details");\r\n      if (details.style.display === "none") {\r\n          details.style.display = "block";\r\n      } else {\r\n          details.style.display = "none";\r\n        }\r\n    }\r\n  </script>\r\n</div>\r\n\r\n  <div class="example">\r\n    <img width="960" src="">\r\n  </div>\r\n</body>\r\n</html>\r\n'
    },
    {
        dir: '0005-unemploy-mvtsplot',
        files: [
            '0005-unemploy-mvtsplot.png',
            '0005-unemploy-mvtsplot.R',
            'blsunemployment.csv',
            'index.html',
            'package.json',
            'thumb.png'
        ],
        paths: {
            root: './examples/0005-unemploy-mvtsplot/',
            index: 'index.html',
            thumb: 'thumb.png',
            package: 'package.json'
        },
        package: {
            homepage: '0005-unemploy-mvtsplot.png',
            main: '0005-unemploy-mvtsplot.R',
            name: 'unemploy-mvtsplot',
            label: 'Unemployment Trends with a Multivariate Time Series',
            version: '1.0.0',
            description:
                'Mutivariate time series plot using MVTSPLOT package and Unemployment data.',
            author: 'Rho, Inc.',
            license: 'MIT',
            keywords: ['R', 'multivariate', 'time series', 'heatmap', 'monthly'],
            rDependencies: {
                mvtsplot: null
            },
            dataDependecies: ['blsunemployment.csv']
        },
        index:
            '<html lang="en">\r\n<head>\r\n  <title></title>\r\n  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">\r\n</head>\r\n<body><div class="head">\r\n  <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">\r\n  <link rel="stylesheet" href="../../util/web/css/examples.css">\r\n  <ul class = \'vl-ex-header\'>\r\n      <li class = "icon"><a href="../../"><img src="../../util/web/img/rho.png"></a></li>\r\n      <li class = "site crumb"><a href="../../"><span>Graphics</span></a></li>\r\n      <li class = \'crumb\'>Example</li>\r\n      <li class = \'title\'></li>\r\n      <li class = \'info\' title="Click to toggle chart details" onclick="toggleDetails()">&#9432;</li>\r\n      <li class = \'arrow next-arrow right\'><a href=""></a></li>\r\n      <li class = \'arrow back-arrow right\'><a href=""></a></li>\r\n  </ul>\r\n  <div id=\'vl-ex-details\' style="display:none;">\r\n    <p class="vl-ex-description"></p>\r\n\r\n    <ul class="vl-ex-tags"></ul>\r\n  </div>\r\n  <script>\r\n    function toggleDetails(){\r\n      var details = document.getElementById("vl-ex-details");\r\n      if (details.style.display === "none") {\r\n          details.style.display = "block";\r\n      } else {\r\n          details.style.display = "none";\r\n        }\r\n    }\r\n  </script>\r\n</div>\r\n\r\n  <div class="example">\r\n    <img width="960" src="">\r\n  </div>\r\n</body>\r\n</html>\r\n'
    },
    {
        dir: '0006-precip-levelplot-lattice',
        files: [
            '0006-precip-levelplot-lattice.png',
            '0006-precip-levelplot-lattice.R',
            'index.html',
            'package.json',
            'Precipitations.csv',
            'thumb.png'
        ],
        paths: {
            root: './examples/0006-precip-levelplot-lattice/',
            index: 'index.html',
            thumb: 'thumb.png',
            package: 'package.json'
        },
        package: {
            homepage: '0006-precip-levelplot-lattice.png',
            main: '0006-precip-levelplot-lattice.R',
            name: 'precip-levelplot-lattice',
            label: 'Orderered Precipitation Heatmap',
            version: '1.0.0',
            description: 'Heatmap with ordered columns and rows using monthly precipitation data.',
            author: 'Rho, Inc.',
            license: 'MIT',
            keywords: ['R', 'Ordered', 'heatmap', 'annotation'],
            rDependencies: {
                lattice: null,
                RColorBrewer: null,
                seriation: null
            },
            dataDependecies: ['Precipitations.csv']
        },
        index:
            '<html lang="en">\r\n<head>\r\n  <title></title>\r\n  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">\r\n</head>\r\n<body><div class="head">\r\n  <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">\r\n  <link rel="stylesheet" href="../../util/web/css/examples.css">\r\n  <ul class = \'vl-ex-header\'>\r\n      <li class = "icon"><a href="../../"><img src="../../util/web/img/rho.png"></a></li>\r\n      <li class = "site crumb"><a href="../../"><span>Graphics</span></a></li>\r\n      <li class = \'crumb\'>Example</li>\r\n      <li class = \'title\'></li>\r\n      <li class = \'info\' title="Click to toggle chart details" onclick="toggleDetails()">&#9432;</li>\r\n      <li class = \'arrow next-arrow right\'><a href=""></a></li>\r\n      <li class = \'arrow back-arrow right\'><a href=""></a></li>\r\n  </ul>\r\n  <div id=\'vl-ex-details\' style="display:none;">\r\n    <p class="vl-ex-description"></p>\r\n\r\n    <ul class="vl-ex-tags"></ul>\r\n  </div>\r\n  <script>\r\n    function toggleDetails(){\r\n      var details = document.getElementById("vl-ex-details");\r\n      if (details.style.display === "none") {\r\n          details.style.display = "block";\r\n      } else {\r\n          details.style.display = "none";\r\n        }\r\n    }\r\n  </script>\r\n</div>\r\n\r\n  <div class="example">\r\n    <img width="960" src="">\r\n  </div>\r\n</body>\r\n</html>\r\n'
    },
    {
        dir: '0007-simple-barchart-webcharts',
        files: [
            'example.html',
            'index.html',
            'OlympicMedals2012.csv',
            'package.json',
            'simpleBarChart.js',
            'thumb.png'
        ],
        paths: {
            root: './examples/0007-simple-barchart-webcharts/',
            index: 'index.html',
            thumb: 'thumb.png',
            package: 'package.json'
        },
        package: {
            homepage: 'example.html',
            main: 'simpleBarChart.js',
            name: 'simple-barchart-webcharts',
            label: 'Simple Barchart (Webcharts)',
            repository: 'github:Rhoinc/webcharts',
            version: '1.0.0',
            description:
                'This is a simple bar chart showing counts of medals won by country at the 2012 summer Olympics. Made with Webcharts.',
            author: 'Rho, Inc.',
            license: 'MIT',
            keywords: ['javascript', 'interactive', 'bar chart'],
            dependencies: {
                d3: '~3',
                webcharts: '~1'
            },
            dataDependecies: ['OlympicMedals2012.csv']
        },
        index:
            '<html lang="en">\r\n<title>Webcharts - Simple Bar Chart</title>\r\n<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\r\n\r\n<link rel="stylesheet" href="https://cdn.rawgit.com/RhoInc/Webcharts/master/css/webcharts.css">\r\n\r\n<script src="https://d3js.org/d3.v3.min.js"></script>\r\n<script src="https://rawgit.com/RhoInc/Webcharts/master/build/webcharts.js"></script>\r\n</head>\r\n\r\n<body><div class="head">\r\n  <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">\r\n  <link rel="stylesheet" href="../../util/web/css/examples.css">\r\n  <ul class = \'vl-ex-header\'>\r\n      <li class = "icon"><a href="../../"><img src="../../util/web/img/rho.png"></a></li>\r\n      <li class = "site crumb"><a href="../../"><span>Graphics</span></a></li>\r\n      <li class = \'crumb\'>Example</li>\r\n      <li class = \'title\'></li>\r\n      <li class = \'info\' title="Click to toggle chart details" onclick="toggleDetails()">&#9432;</li>\r\n      <li class = \'arrow next-arrow right\'><a href=""></a></li>\r\n      <li class = \'arrow back-arrow right\'><a href=""></a></li>\r\n  </ul>\r\n  <div id=\'vl-ex-details\' style="display:none;">\r\n    <p class="vl-ex-description"></p>\r\n\r\n    <ul class="vl-ex-tags"></ul>\r\n  </div>\r\n  <script>\r\n    function toggleDetails(){\r\n      var details = document.getElementById("vl-ex-details");\r\n      if (details.style.display === "none") {\r\n          details.style.display = "block";\r\n      } else {\r\n          details.style.display = "none";\r\n        }\r\n    }\r\n  </script>\r\n</div>\r\n\r\n  <div class="chart"></div>\r\n</body>\r\n<script src="simpleBarChart.js" defer></script>\r\n</html>\r\n'
    },
    {
        dir: '0008-safetyExplorer-default',
        files: [
            'aetable.html',
            'aetable.js',
            'aetimelines.html',
            'aetimelines.js',
            'index.html',
            'package.json',
            'safetyExplorer.css',
            'safetyhistogram.html',
            'safetyhistogram.js',
            'safetyoutlierexplorer.html',
            'safetyoutlierexplorer.js',
            'safetyresultsovertime.html',
            'safetyresultsovertime.js',
            'safetyshiftplot.html',
            'safetyshiftplot.js',
            'thumb.png',
            'timeline.png'
        ],
        paths: {
            root: './examples/0008-safetyExplorer-default/',
            index: 'index.html',
            thumb: 'thumb.png',
            package: 'package.json'
        },
        package: {
            homepage: 'aetimelines.html',
            main: 'aetimelines.js',
            name: 'safetyExplorer-default',
            label: 'Safety Explorer - Default Configuration',
            repository: 'github:Rhoinc/safety-explorer-suite',
            version: '1.0.2',
            description:
                'The safety explorer is a collection of interactive graphics visualizing adverse event, lab, and vital sign data captured in clinical trials.  This instance demonstrates each graphic with default settings.',
            author: 'Rho, Inc.',
            license: 'MIT',
            keywords: [
                'javascript',
                'interactive',
                'webcharts',
                'adverse events',
                'safety explorer'
            ],
            dependencies: {
                d3: '~3',
                webcharts: '~1.9',
                aetable: '3.2.6',
                aetimelines: '2.1.0',
                safetyhistogram: '2.2.0',
                safetyOutlierExplorer: '2.3.0',
                safetyResultsOverTime: '2.2.2',
                safetyShiftPlot: '2.1.0'
            },
            dataDependecies: [
                '../../../data/safetyData/ADAE.csv',
                '../../../data/safetyData/ADBDS.csv'
            ]
        },
        index:
            "<!DOCTYPE html>\r\n<html>\r\n    <head>\r\n        <meta\r\n            http-equiv = 'Content-Type'\r\n            content = 'text/html; charset = utf-8'>\r\n\r\n        <title>Safety Explorer - Default</title>\r\n\r\n        <script type = 'text/javascript'\r\n            src = 'https://d3js.org/d3.v3.min.js'></script>\r\n        <script type = 'text/javascript'\r\n            src = 'https://rawgit.com/RhoInc/Webcharts/master/build/webcharts.js'></script>\r\n        <script type = 'text/javascript'\r\n            src = 'https://rawgit.com/RhoInc/ae-timelines/master/build/aeTimelines.js'></script>\r\n            <script type = 'text/javascript' src = 'aetimelines.js'></script>\r\n\r\n        <link type = 'text/css'\r\n            rel = 'stylesheet'\r\n            href = 'https://rawgit.com/RhoInc/Webcharts/master/css/webcharts.css'>\r\n        <link type = 'text/css'\r\n            href = 'safetyExplorer.css'\r\n            rel = 'stylesheet'>\r\n\r\n\r\n    </head>\r\n\r\n    <body><div class=\"head\">\r\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css\">\r\n  <link rel=\"stylesheet\" href=\"../../util/web/css/examples.css\">\r\n  <ul class = 'vl-ex-header'>\r\n      <li class = \"icon\"><a href=\"../../\"><img src=\"../../util/web/img/rho.png\"></a></li>\r\n      <li class = \"site crumb\"><a href=\"../../\"><span>Graphics</span></a></li>\r\n      <li class = 'crumb'>Example</li>\r\n      <li class = 'title'></li>\r\n      <li class = 'info' title=\"Click to toggle chart details\" onclick=\"toggleDetails()\">&#9432;</li>\r\n      <li class = 'arrow next-arrow right'><a href=\"\"></a></li>\r\n      <li class = 'arrow back-arrow right'><a href=\"\"></a></li>\r\n  </ul>\r\n  <div id='vl-ex-details' style=\"display:none;\">\r\n    <p class=\"vl-ex-description\"></p>\r\n\r\n    <ul class=\"vl-ex-tags\"></ul>\r\n  </div>\r\n  <script>\r\n    function toggleDetails(){\r\n      var details = document.getElementById(\"vl-ex-details\");\r\n      if (details.style.display === \"none\") {\r\n          details.style.display = \"block\";\r\n      } else {\r\n          details.style.display = \"none\";\r\n        }\r\n    }\r\n  </script>\r\n</div>\r\n\r\n      <ul class = 'nav nav-tabs'>\r\n          <li role = 'presentation'><a href = 'aetable.html'>AE Table</a></li>\r\n          <li role = 'presentation'  class = 'active'><a href = 'aetimelines.html'>AE Timelines</a></li>\r\n          <li role = 'presentation'><a href = 'safetyresultsovertime.html'>Results over Time</a></li>\r\n          <li role = 'presentation'><a href = 'safetyhistogram.html'>Histogram</a></li>\r\n          <li role = 'presentation'><a href = 'safetyoutlierexplorer.html'>Outlier Explorer</a></li>\r\n          <li role = 'presentation'><a href = 'safetyshiftplot.html'>Shift Plot</a></li>\r\n      </ul>\r\n        <div class = 'safetyExplorerChart'\r\n            id = 'ae-timelines'>\r\n            <div class = 'header'></div>\r\n            <div class = 'content'></div>\r\n        </div>\r\n    </body>\r\n</html>\r\n"
    },
    {
        dir: '0009-web-codebook-demo',
        files: [
            'example.html',
            'GitHub-Mark-32px.png',
            'index.html',
            'package.json',
            'screen.png',
            'thumb.png',
            'webCodebookDemo.js'
        ],
        paths: {
            root: './examples/0009-web-codebook-demo/',
            index: 'index.html',
            thumb: 'thumb.png',
            package: 'package.json'
        },
        package: {
            homepage: 'example.html',
            main: 'webCodebookDemo.js',
            name: 'web-codebook-demo',
            label: 'Web Codebook Demo',
            repository: 'github:Rhoinc/web-codebook',
            version: '1.0.0',
            description:
                'This page provides a simple demonstration of the web-codebook data summary tool.',
            author: 'Rho, Inc.',
            license: 'MIT',
            keywords: ['javascript', 'interactive', 'codebook', 'data summary'],
            dependencies: {
                d3: '~3',
                webcharts: '~1',
                webcodebook: '~1'
            },
            dataDependecies: ['../../data/safetyData/ADAE.csv']
        },
        index:
            '<html lang="en">\r\n<title>Web Codebook - demo</title>\r\n<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\r\n\r\n<script src="https://d3js.org/d3.v3.min.js"></script>\r\n<script src="https://rawgit.com/RhoInc/Webcharts/master/build/webcharts.js"></script>\r\n<script src="https://rawgit.com/RhoInc/web-codebook/master/build/webcodebook.js"></script>\r\n\r\n<link rel="stylesheet" href="https://rawgit.com/RhoInc/Webcharts/master/css/webcharts.css">\r\n<link rel="stylesheet" href="https://rawgit.com/RhoInc/web-codebook/master/css/webcodebook.css">\r\n\r\n</head>\r\n\r\n<body><div class="head">\r\n  <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">\r\n  <link rel="stylesheet" href="../../util/web/css/examples.css">\r\n  <ul class = \'vl-ex-header\'>\r\n      <li class = "icon"><a href="../../"><img src="../../util/web/img/rho.png"></a></li>\r\n      <li class = "site crumb"><a href="../../"><span>Graphics</span></a></li>\r\n      <li class = \'crumb\'>Example</li>\r\n      <li class = \'title\'></li>\r\n      <li class = \'info\' title="Click to toggle chart details" onclick="toggleDetails()">&#9432;</li>\r\n      <li class = \'arrow next-arrow right\'><a href=""></a></li>\r\n      <li class = \'arrow back-arrow right\'><a href=""></a></li>\r\n  </ul>\r\n  <div id=\'vl-ex-details\' style="display:none;">\r\n    <p class="vl-ex-description"></p>\r\n\r\n    <ul class="vl-ex-tags"></ul>\r\n  </div>\r\n  <script>\r\n    function toggleDetails(){\r\n      var details = document.getElementById("vl-ex-details");\r\n      if (details.style.display === "none") {\r\n          details.style.display = "block";\r\n      } else {\r\n          details.style.display = "none";\r\n        }\r\n    }\r\n  </script>\r\n</div>\r\n\r\n\t<div class="controls"></div>\r\n\t<div class="chart"></div>\r\n</body>\r\n\r\n<script src="webCodebookDemo.js" defer></script>\r\n</html>\r\n'
    },
    {
        dir: '0010-spike-histogram',
        files: [
            'example.html',
            'index.html',
            'package.json',
            'paneledSpikeHistogram.js',
            'spikeHistogram.js',
            'thumb.png'
        ],
        paths: {
            root: './examples/0010-spike-histogram/',
            index: 'index.html',
            thumb: 'thumb.png',
            package: 'package.json'
        },
        package: {
            homepage: 'example.html',
            main: 'paneledSpikeHistogram.js',
            name: 'spike-histogram',
            label: 'Spike Histogram Demo',
            repository: 'github:Rhoinc/spike-histogram',
            version: '1.0.0',
            description:
                'Demonstration of a web-based spike histogram with paneling capability and modals.',
            author: 'Rho, Inc.',
            license: 'MIT',
            keywords: ['javascript', 'interactive', 'interactive', 'histogram', 'spike'],
            dependencies: {
                d3: '~3',
                webcharts: '~1',
                spikeHistogram: 'git://github.com/RhoInc/spikeHistogram.git#v0.1.0'
            },
            dataDependecies: ['../../data/safetyData/ADBDS.csv']
        },
        index:
            "<!DOCTYPE html>\r\n<html>\r\n    <head>\r\n        <meta\r\n            http-equiv = 'Content-Type'\r\n            content = 'text/html; charset = utf-8'>\r\n        <title>Paneled Spike Histogram</title>\r\n\r\n        <script type = 'text/javascript'\r\n            src = 'https://d3js.org/d3.v3.min.js'></script>\r\n        <script type = 'text/javascript'\r\n            src = 'https://graphics.rhoworld.com/src/webcharts/webcharts.v1.6.1.js'></script>\r\n        <script type = 'text/javascript'\r\n            src = 'https://cdn.rawgit.com/RhoInc/spike-histogram/v0.1.0/build/spikeHistogram.js'></script>\r\n\r\n        <link type = 'text/css'\r\n            rel = 'stylesheet'\r\n            href = 'https://graphics.rhoworld.com/src/webcharts/webcharts.v1.6.1.css'>\r\n\r\n        <style>\r\n            @import url(https://fonts.googleapis.com/css?family=Open+Sans:400,300);\r\n\r\n            * {\r\n                font-family: 'Open Sans', Helvetica, Arial, sans-serif;\r\n            }\r\n\r\n            #container {\r\n                width: 96%;\r\n                margin: 0 2% 0 2%;\r\n            }\r\n            #container .chart {\r\n                width: 100%;\r\n                display: inline-block;\r\n            }\r\n            #container .chart .tooltip {\r\n                display: none;\r\n            }\r\n            #container .chart .tooltip.active {\r\n                display: block;\r\n            }\r\n        </style>\r\n    </head>\r\n\r\n    <body><div class=\"head\">\r\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css\">\r\n  <link rel=\"stylesheet\" href=\"../../util/web/css/examples.css\">\r\n  <ul class = 'vl-ex-header'>\r\n      <li class = \"icon\"><a href=\"../../\"><img src=\"../../util/web/img/rho.png\"></a></li>\r\n      <li class = \"site crumb\"><a href=\"../../\"><span>Graphics</span></a></li>\r\n      <li class = 'crumb'>Example</li>\r\n      <li class = 'title'></li>\r\n      <li class = 'info' title=\"Click to toggle chart details\" onclick=\"toggleDetails()\">&#9432;</li>\r\n      <li class = 'arrow next-arrow right'><a href=\"\"></a></li>\r\n      <li class = 'arrow back-arrow right'><a href=\"\"></a></li>\r\n  </ul>\r\n  <div id='vl-ex-details' style=\"display:none;\">\r\n    <p class=\"vl-ex-description\"></p>\r\n\r\n    <ul class=\"vl-ex-tags\"></ul>\r\n  </div>\r\n  <script>\r\n    function toggleDetails(){\r\n      var details = document.getElementById(\"vl-ex-details\");\r\n      if (details.style.display === \"none\") {\r\n          details.style.display = \"block\";\r\n      } else {\r\n          details.style.display = \"none\";\r\n        }\r\n    }\r\n  </script>\r\n</div>\r\n\r\n        <div id = 'container'>\r\n            <div class = 'chart' id = ''>\r\n                <div class = 'header'></div>\r\n                <div class = 'content'></div>\r\n            </div>\r\n        </div>\r\n    </body>\r\n\r\n    <script type = 'text/javascript'\r\n        src = 'paneledSpikeHistogram.js'></script>\r\n    </script>\r\n</html>\r\n"
    },
    {
        dir: '0011-safetyExplorer-queries',
        files: [
            'aetable.html',
            'aetable.js',
            'aetimelines.html',
            'aetimelines.js',
            'index.html',
            'package.json',
            'safetyExplorer.css',
            'safetyhistogram.html',
            'safetyhistogram.js',
            'safetyoutlierexplorer.html',
            'safetyoutlierexplorer.js',
            'safetyresultsovertime.html',
            'safetyresultsovertime.js',
            'safetyshiftplot.html',
            'safetyshiftplot.js',
            'thumb.png',
            'timeline.png'
        ],
        paths: {
            root: './examples/0011-safetyExplorer-queries/',
            index: 'index.html',
            thumb: 'thumb.png',
            package: 'package.json'
        },
        package: {
            homepage: 'aetimelines.html',
            main: 'aetimelines.js',
            name: 'safetyExplorer-queries',
            label: 'Safety Explorer with Query Data',
            repository: 'github:Rhoinc/safety-explorer-suite',
            version: '1.0.2',
            description:
                'The safety explorer is a collection of interactive graphics visualizing adverse event, lab, and vital sign data captured in clinical trials. This instance demonstrates customized versions of each graphic including added filters and/or highlights for query data.',
            author: 'Rho, Inc.',
            license: 'MIT',
            keywords: [
                'javascript',
                'interactive',
                'webcharts',
                'adverse events',
                'safety explorer',
                'queries'
            ],
            dependencies: {
                d3: '~3',
                webcharts: '~1',
                aetable: '3.2.6',
                aetimelines: '2.1.0',
                safetyhistogram: '2.2.0',
                safetyOutlierExplorer: '2.3.0',
                safetyResultsOverTime: '2.2.2',
                safetyShiftPlot: '2.1.0'
            },
            dataDependecies: [
                '../../../data/safetyData-queries/ADAE.csv',
                '../../../data/safetyData-queries/ADBDS.csv'
            ]
        },
        index:
            "<!DOCTYPE html>\r\n<html>\r\n    <head>\r\n        <meta\r\n            http-equiv = 'Content-Type'\r\n            content = 'text/html; charset = utf-8'>\r\n\r\n        <title>Safety Explorer - Default</title>\r\n\r\n        <script type = 'text/javascript'\r\n            src = 'https://d3js.org/d3.v3.min.js'></script>\r\n        <script type = 'text/javascript'\r\n            src = 'https://rawgit.com/RhoInc/Webcharts/master/build/webcharts.js'></script>\r\n        <script type = 'text/javascript'\r\n            src = 'https://rawgit.com/RhoInc/ae-timelines/master/build/aeTimelines.js'></script>\r\n            <script type = 'text/javascript' src = 'aetimelines.js'></script>\r\n\r\n        <link type = 'text/css'\r\n            rel = 'stylesheet'\r\n            href = 'https://rawgit.com/RhoInc/Webcharts/master/css/webcharts.css'>\r\n        <link type = 'text/css'\r\n            href = 'safetyExplorer.css'\r\n            rel = 'stylesheet'>\r\n\r\n\r\n    </head>\r\n\r\n    <body><div class=\"head\">\r\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css\">\r\n  <link rel=\"stylesheet\" href=\"../../util/web/css/examples.css\">\r\n  <ul class = 'vl-ex-header'>\r\n      <li class = \"icon\"><a href=\"../../\"><img src=\"../../util/web/img/rho.png\"></a></li>\r\n      <li class = \"site crumb\"><a href=\"../../\"><span>Graphics</span></a></li>\r\n      <li class = 'crumb'>Example</li>\r\n      <li class = 'title'></li>\r\n      <li class = 'info' title=\"Click to toggle chart details\" onclick=\"toggleDetails()\">&#9432;</li>\r\n      <li class = 'arrow next-arrow right'><a href=\"\"></a></li>\r\n      <li class = 'arrow back-arrow right'><a href=\"\"></a></li>\r\n  </ul>\r\n  <div id='vl-ex-details' style=\"display:none;\">\r\n    <p class=\"vl-ex-description\"></p>\r\n\r\n    <ul class=\"vl-ex-tags\"></ul>\r\n  </div>\r\n  <script>\r\n    function toggleDetails(){\r\n      var details = document.getElementById(\"vl-ex-details\");\r\n      if (details.style.display === \"none\") {\r\n          details.style.display = \"block\";\r\n      } else {\r\n          details.style.display = \"none\";\r\n        }\r\n    }\r\n  </script>\r\n</div>\r\n\r\n      <ul class = 'nav nav-tabs'>\r\n          <li role = 'presentation'><a href = 'aetable.html'>AE Table</a></li>\r\n          <li role = 'presentation'  class = 'active'><a href = 'aetimelines.html'>AE Timelines</a></li>\r\n          <li role = 'presentation'><a href = 'safetyresultsovertime.html'>Results over Time</a></li>\r\n          <li role = 'presentation'><a href = 'safetyhistogram.html'>Histogram</a></li>\r\n          <li role = 'presentation'><a href = 'safetyoutlierexplorer.html'>Outlier Explorer</a></li>\r\n          <li role = 'presentation'><a href = 'safetyshiftplot.html'>Shift Plot</a></li>\r\n      </ul>\r\n        <div class = 'safetyExplorerChart'\r\n            id = 'ae-timelines'>\r\n            <div class = 'header'></div>\r\n            <div class = 'content'></div>\r\n        </div>\r\n    </body>\r\n</html>\r\n"
    },
    {
        dir: '0012-web-codebook-explorer',
        files: [
            'codebookExplorer.js',
            'example.html',
            'index.html',
            'package.json',
            'screen.png',
            'thumb.png'
        ],
        paths: {
            root: './examples/0012-web-codebook-explorer/',
            index: 'index.html',
            thumb: 'thumb.png',
            package: 'package.json'
        },
        package: {
            homepage: 'example.html',
            main: 'paneledSpikeHistogram.js',
            name: 'spike-histogram',
            label: 'Web Codebook Explorer',
            repository: 'github:Rhoinc/spike-histogram',
            version: '1.0.1',
            description:
                'Demonstration of the web-based data summaries for multiple files using web-codebook.',
            author: 'Rho, Inc.',
            license: 'MIT',
            keywords: ['javascript', 'interactive', 'codebook', 'data summary', 'file explorer'],
            dependencies: {
                d3: '~3',
                webcharts: '~1',
                webcodebook: '~1'
            },
            dataDependecies: []
        },
        index:
            '<html lang="en">\r\n<title>Web Codebook - Explorer</title>\r\n<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\r\n\r\n<script src="https://d3js.org/d3.v3.min.js"></script>\r\n<script src="https://rawgit.com/RhoInc/Webcharts/master/build/webcharts.js"></script>\r\n<script src="https://rawgit.com/RhoInc/web-codebook/master/build/webcodebook.js"></script>\r\n<script src="../../util/web/data/dataFiles.js"></script>\r\n\r\n<link rel="stylesheet" href="https://rawgit.com/RhoInc/Webcharts/master/css/webcharts.css">\r\n<link rel="stylesheet" href="https://rawgit.com/RhoInc/web-codebook/master/css/webcodebook.css">\r\n</head>\r\n\r\n<body><div class="head">\r\n  <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">\r\n  <link rel="stylesheet" href="../../util/web/css/examples.css">\r\n  <ul class = \'vl-ex-header\'>\r\n      <li class = "icon"><a href="../../"><img src="../../util/web/img/rho.png"></a></li>\r\n      <li class = "site crumb"><a href="../../"><span>Graphics</span></a></li>\r\n      <li class = \'crumb\'>Example</li>\r\n      <li class = \'title\'></li>\r\n      <li class = \'info\' title="Click to toggle chart details" onclick="toggleDetails()">&#9432;</li>\r\n      <li class = \'arrow next-arrow right\'><a href=""></a></li>\r\n      <li class = \'arrow back-arrow right\'><a href=""></a></li>\r\n  </ul>\r\n  <div id=\'vl-ex-details\' style="display:none;">\r\n    <p class="vl-ex-description"></p>\r\n\r\n    <ul class="vl-ex-tags"></ul>\r\n  </div>\r\n  <script>\r\n    function toggleDetails(){\r\n      var details = document.getElementById("vl-ex-details");\r\n      if (details.style.display === "none") {\r\n          details.style.display = "block";\r\n      } else {\r\n          details.style.display = "none";\r\n        }\r\n    }\r\n  </script>\r\n</div>\r\n\r\n\t<div class="controls"></div>\r\n\t<div class="explorer"></div>\r\n</body>\r\n<script defer src="codebookExplorer.js"></script>\r\n\r\n</html>\r\n'
    },
    {
        dir: '0013-query-overview',
        files: [
            'example.html',
            'index.html',
            'initQueryOverview.js',
            'package.json',
            'screen.png',
            'thumb.png'
        ],
        paths: {
            root: './examples/0013-query-overview/',
            index: 'index.html',
            thumb: 'thumb.png',
            package: 'package.json'
        },
        package: {
            homepage: 'example.html',
            main: 'initQueryOverview.js',
            name: 'query-overview',
            label: 'Query Overview',
            repository: 'github:Rhoinc/query-overview',
            version: '1.0.1',
            description: 'Explore clinical trial query data using the query-overview library.',
            author: 'Rho, Inc.',
            license: 'MIT',
            keywords: ['javascript', 'interactive, queries'],
            dependencies: {
                d3: '~3',
                webcharts: '~1',
                queryoverview: '~1'
            },
            dataDependecies: ['../../data/queries/queries.csv']
        },
        index:
            '<html lang="en">\r\n<title>Web Codebook - Explorer</title>\r\n<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\r\n\r\n<script src="https://d3js.org/d3.v3.min.js"></script>\r\n<script src="https://rawgit.com/RhoInc/Webcharts/master/build/webcharts.js"></script>\r\n<script src="https://cdn.rawgit.com/RhoInc/query-overview/master/build/queryOverview.js"></script>\r\n\r\n<link rel="stylesheet" href="https://cdn.rawgit.com/RhoInc/Webcharts/master/css/webcharts.css">\r\n\r\n</head>\r\n\r\n<body><div class="head">\r\n  <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">\r\n  <link rel="stylesheet" href="../../util/web/css/examples.css">\r\n  <ul class = \'vl-ex-header\'>\r\n      <li class = "icon"><a href="../../"><img src="../../util/web/img/rho.png"></a></li>\r\n      <li class = "site crumb"><a href="../../"><span>Graphics</span></a></li>\r\n      <li class = \'crumb\'>Example</li>\r\n      <li class = \'title\'></li>\r\n      <li class = \'info\' title="Click to toggle chart details" onclick="toggleDetails()">&#9432;</li>\r\n      <li class = \'arrow next-arrow right\'><a href=""></a></li>\r\n      <li class = \'arrow back-arrow right\'><a href=""></a></li>\r\n  </ul>\r\n  <div id=\'vl-ex-details\' style="display:none;">\r\n    <p class="vl-ex-description"></p>\r\n\r\n    <ul class="vl-ex-tags"></ul>\r\n  </div>\r\n  <script>\r\n    function toggleDetails(){\r\n      var details = document.getElementById("vl-ex-details");\r\n      if (details.style.display === "none") {\r\n          details.style.display = "block";\r\n      } else {\r\n          details.style.display = "none";\r\n        }\r\n    }\r\n  </script>\r\n</div>\r\n\r\n\t<div class="chart"></div>\r\n</body>\r\n<script src="initQueryOverview.js"></script>\r\n</html>\r\n'
    },
    {
        dir: '0015-safety-explorer-single-page',
        files: [
            'example.html',
            'index.html',
            'package.json',
            'safetyExplorer.js',
            'Screenshot.png',
            'thumb.png'
        ],
        paths: {
            root: './examples/0015-safety-explorer-single-page/',
            index: 'index.html',
            thumb: 'thumb.png',
            package: 'package.json'
        },
        package: {
            homepage: 'example.html',
            main: 'safetyExplorer.js',
            name: 'safetyExplorer-single-page',
            label: 'Safety Explorer - Single Page Configuration',
            repository: 'github:Rhoinc/safety-explorer-suite',
            version: '1.0.0',
            description:
                'Example of the safety explorer suite, a simple framework combining 6 interactive safety charts in to a single page. The primary advantage to loading all 6 charts on a single page, is that the data only needs to be loaded once, and can then be re-used in all relevant charts. This example loads the data from csv (by specifying loadcsv:true in the .init() method), but the data can also be passed as json.',
            author: 'Rho, Inc.',
            license: 'MIT',
            keywords: [
                'javascript',
                'interactive',
                'webcharts',
                'adverse events',
                'safety explorer'
            ],
            dependencies: {
                d3: '~3',
                webcharts: '~1',
                aetable: '~3',
                aetimelines: '~2',
                safetyhistogram: '~2',
                safetyOutlierExplorer: '~2',
                safetyResultsOverTime: '~2',
                safetyShiftPlot: '~2'
            },
            dataDependecies: [
                '../../../data/safetyData-queries/ADAE.csv',
                '../../../data/safetyData-queries/ADBDS.csv'
            ]
        },
        index:
            '<!DOCTYPE html>\r\n<html>\r\n\r\n    <head>\r\n        <meta\r\n            http-equiv = \'Content-Type\'\r\n            content = \'text/html; charset = utf-8\'>\r\n\r\n        <title>Safety Explorer Suite</title>\r\n\r\n        <script type = \'text/javascript\' src = \'https://d3js.org/d3.v3.min.js\'></script>\r\n        <script src="https://rawgit.com/RhoInc/Webcharts/master/build/webcharts.js"></script>\r\n        <script src="https://rawgit.com/RhoInc/aeexplorer/master/build/aeTable.js"></script>\r\n        <script src="https://rawgit.com/RhoInc/ae-timelines/master/build/aeTimelines.js"></script>\r\n        <script src="https://rawgit.com/RhoInc/safety-histogram/master/build/safetyHistogram.js"></script>\r\n        <script src="https://rawgit.com/RhoInc/safety-outlier-explorer/master/build/safetyOutlierExplorer.js"></script>\r\n        <script src="https://rawgit.com/RhoInc/paneled-outlier-explorer/master/build/paneledOutlierExplorer.js"></script>\r\n        <script src="https://rawgit.com/RhoInc/safety-results-over-time/master/build/safetyResultsOverTime.js"></script>\r\n        <script src="https://rawgit.com/RhoInc/safety-shift-plot/master/build/safetyShiftPlot.js"></script>\r\n\r\n        <script type = \'text/javascript\' src = \'https://rawgit.com/RhoInc/safety-explorer-suite/master/build/safetyExplorerSuite.js\'></script>\r\n\r\n        <link type = \'text/css\' rel = \'stylesheet\' href = \'https://rawgit.com/RhoInc/safety-explorer-suite/master/css/safetyExplorerSuite.css\'>\r\n        <link type = \'text/css\' rel = \'stylesheet\' href = \'https://rawgit.com/RhoInc/webcharts/master/css/webcharts.css\'>\r\n        <link type = \'text/css\' rel = \'stylesheet\' href = \'https://rawgit.com/RhoInc/aeexplorer/master/css/aeTable.css\'>\r\n        <!-- hotfix for ae table formatting weirdness -->\r\n        <style>\r\n          div.aeTable .controls .rate-filter > * {\r\n            height : auto;\r\n          }\r\n          div.aeTable .controls .summary-control > * {\r\n            height : auto;\r\n          }\r\n          div.aeTable .controls .summary-control div {\r\n            height : auto;\r\n           }\r\n        </style>\r\n    </head>\r\n\r\n    <body><div class="head">\r\n  <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">\r\n  <link rel="stylesheet" href="../../util/web/css/examples.css">\r\n  <ul class = \'vl-ex-header\'>\r\n      <li class = "icon"><a href="../../"><img src="../../util/web/img/rho.png"></a></li>\r\n      <li class = "site crumb"><a href="../../"><span>Graphics</span></a></li>\r\n      <li class = \'crumb\'>Example</li>\r\n      <li class = \'title\'></li>\r\n      <li class = \'info\' title="Click to toggle chart details" onclick="toggleDetails()">&#9432;</li>\r\n      <li class = \'arrow next-arrow right\'><a href=""></a></li>\r\n      <li class = \'arrow back-arrow right\'><a href=""></a></li>\r\n  </ul>\r\n  <div id=\'vl-ex-details\' style="display:none;">\r\n    <p class="vl-ex-description"></p>\r\n\r\n    <ul class="vl-ex-tags"></ul>\r\n  </div>\r\n  <script>\r\n    function toggleDetails(){\r\n      var details = document.getElementById("vl-ex-details");\r\n      if (details.style.display === "none") {\r\n          details.style.display = "block";\r\n      } else {\r\n          details.style.display = "none";\r\n        }\r\n    }\r\n  </script>\r\n</div>\r\n</body>\r\n    <script type = \'text/javascript\' src = \'safetyExplorer.js\'></script>\r\n</html>\r\n'
    },
    {
        dir: '0016-safety-outlier-explorer-hys-law',
        files: [
            'example.html',
            'hy.csv',
            'hysLaw.js',
            'index.html',
            'package.json',
            'screen.png',
            'thumb.png'
        ],
        paths: {
            root: './examples/0016-safety-outlier-explorer-hys-law/',
            index: 'index.html',
            thumb: 'thumb.png',
            package: 'package.json'
        },
        package: {
            homepage: 'example.html',
            main: 'hysLaw.js',
            name: 'safety-outlier-explorer-hys-law',
            label: "Safety Outlier Explorer - Hy's Law",
            repository: 'github:Rhoinc/safety-outlier-explorer',
            version: '1.0.0',
            description:
                "Example of the safety outlier explorer chart for a small mock study where a single participant meets the criteria for Hy's law.",
            author: 'Rho, Inc.',
            license: 'MIT',
            keywords: ['javascript', 'interactive', 'webcharts', 'safety explorer', "Hy's Law"],
            dependencies: {
                d3: '~3',
                webcharts: '~1',
                safetyOutlierExplorer: '2.0.1'
            },
            dataDependecies: ['hy.csv']
        },
        index:
            "<!DOCTYPE html>\r\n<html>\r\n    <head>\r\n        <meta\r\n            http-equiv = 'Content-Type'\r\n            content = 'text/html; charset = utf-8'>\r\n\r\n        <title>Safety Outlier Explorer - Hy's Law</title>\r\n\r\n        <script type = 'text/javascript'\r\n            src = 'https://d3js.org/d3.v3.min.js'></script>\r\n        <script type = 'text/javascript'\r\n            src = 'https://cdn.rawgit.com/RhoInc/Webcharts/master/build/webcharts.js'></script>\r\n        <script type = 'text/javascript'\r\n            src = 'https://cdn.rawgit.com/RhoInc/safety-outlier-explorer/v2.0.1/build/safetyOutlierExplorer.js'></script>\r\n\r\n        <link type = 'text/css'\r\n            rel = 'stylesheet'\r\n            href = 'https://cdn.rawgit.com/RhoInc/Webcharts/master/css/webcharts.css'>\r\n\r\n\r\n    </head>\r\n\r\n    <body><div class=\"head\">\r\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css\">\r\n  <link rel=\"stylesheet\" href=\"../../util/web/css/examples.css\">\r\n  <ul class = 'vl-ex-header'>\r\n      <li class = \"icon\"><a href=\"../../\"><img src=\"../../util/web/img/rho.png\"></a></li>\r\n      <li class = \"site crumb\"><a href=\"../../\"><span>Graphics</span></a></li>\r\n      <li class = 'crumb'>Example</li>\r\n      <li class = 'title'></li>\r\n      <li class = 'info' title=\"Click to toggle chart details\" onclick=\"toggleDetails()\">&#9432;</li>\r\n      <li class = 'arrow next-arrow right'><a href=\"\"></a></li>\r\n      <li class = 'arrow back-arrow right'><a href=\"\"></a></li>\r\n  </ul>\r\n  <div id='vl-ex-details' style=\"display:none;\">\r\n    <p class=\"vl-ex-description\"></p>\r\n\r\n    <ul class=\"vl-ex-tags\"></ul>\r\n  </div>\r\n  <script>\r\n    function toggleDetails(){\r\n      var details = document.getElementById(\"vl-ex-details\");\r\n      if (details.style.display === \"none\") {\r\n          details.style.display = \"block\";\r\n      } else {\r\n          details.style.display = \"none\";\r\n        }\r\n    }\r\n  </script>\r\n</div>\r\n\r\n        <div class = 'safetyExplorerChart'\r\n            id = 'safety-outlier-explorer'>\r\n            <div class = 'header'></div>\r\n            <div class = 'content'></div>\r\n        </div>\r\n    </body>\r\n\r\n    <script type = 'text/javascript' src = 'hysLaw.js'></script>\r\n\r\n</html>\r\n"
    },
    {
        dir: '0017-population-explorer',
        files: [
            'example.html',
            'index.html',
            'package-lock.json',
            'package.json',
            'populationExplorer.js',
            'primary_outcome_determination_24NOV.csv',
            'screen.png',
            'thumb.png'
        ],
        paths: {
            root: './examples/0017-population-explorer/',
            index: 'index.html',
            thumb: 'thumb.png',
            package: 'package.json'
        },
        package: {
            homepage: 'example.html',
            main: 'populationExplorer.js',
            name: 'population-explorer',
            label: 'Population Explorer',
            repository: 'github:Rhoinc/populationExplorer',
            version: '1.0.0',
            description:
                'Example of the population explorer graphic using public data from the LEAP and LEAP-on Clinical Trials.',
            author: 'Rho, Inc.',
            license: 'MIT',
            keywords: ['javascript', 'interactive', 'data explorer'],
            dependencies: {
                bootstrap: '^4.1.3',
                d3: '~3',
                jquery: '^3.3.1',
                'jquery-ui': '^1.12.1',
                'population-explorer': '~1'
            },
            dataDependecies: ['primary_outcome_determination_24NOV.csv']
        },
        index:
            '<!DOCTYPE html>\r\n<html>\r\n<head>\r\n\r\n   <title>LEAP and LEAP-on participant explorer</title>\r\n\r\n   <meta http-equiv="Content-Type" content="text/html; charset=utf-8">\r\n   <script src="https://d3js.org/d3.v3.min.js"></script>\r\n   <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.3/jquery.min.js"></script>\r\n   <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>\r\n   <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.2/js/bootstrap.min.js"></script>\r\n   <script src="https://cdn.rawgit.com/RhoInc/PopulationExplorer/master/populationExplorer.js"></script>\r\n   <script src="https://cdn.rawgit.com/RhoInc/PopulationExplorer/master/basicTable.js"></script>\r\n\r\n   <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.2/css/bootstrap.min.css"></link>\r\n   <link rel="stylesheet" type="text/css" href="https://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css">\r\n   <link rel="stylesheet" href="https://cdn.rawgit.com/RhoInc/PopulationExplorer/master/populationExplorer.css">\r\n   <style>\r\n   body{\r\n     padding:1em;\r\n   }\r\n   </style>\r\n</head>\r\n\r\n\r\n<body><div class="head">\r\n  <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">\r\n  <link rel="stylesheet" href="../../util/web/css/examples.css">\r\n  <ul class = \'vl-ex-header\'>\r\n      <li class = "icon"><a href="../../"><img src="../../util/web/img/rho.png"></a></li>\r\n      <li class = "site crumb"><a href="../../"><span>Graphics</span></a></li>\r\n      <li class = \'crumb\'>Example</li>\r\n      <li class = \'title\'></li>\r\n      <li class = \'info\' title="Click to toggle chart details" onclick="toggleDetails()">&#9432;</li>\r\n      <li class = \'arrow next-arrow right\'><a href=""></a></li>\r\n      <li class = \'arrow back-arrow right\'><a href=""></a></li>\r\n  </ul>\r\n  <div id=\'vl-ex-details\' style="display:none;">\r\n    <p class="vl-ex-description"></p>\r\n\r\n    <ul class="vl-ex-tags"></ul>\r\n  </div>\r\n  <script>\r\n    function toggleDetails(){\r\n      var details = document.getElementById("vl-ex-details");\r\n      if (details.style.display === "none") {\r\n          details.style.display = "block";\r\n      } else {\r\n          details.style.display = "none";\r\n        }\r\n    }\r\n  </script>\r\n</div>\r\n\r\n   <p>Use the buttons below to explore data collected from 640 LEAP and LEAP-on participants at 1836 study visits.</p>\r\n   <p>This page was created for the <a href="http://www.immunetolerance.org/">Immune Tolerance Network</a> by the <a href="http://graphics.rhoworld.com">Rho Center for Applied Data Visualization</a> using thier <a href="https://github.com/RhoInc/PopulationExplorer">population explorer</a>. For more information about the LEAP study and access to the full set of figures with underlying data and analysis code please log into <a href="https://www.itntrialshare.org/project/Studies/ITN032ADPUBLIC/Study Data/begin.view?pageId=study.DATA_ANALYSIS">ITN TrialShare</a>. If you are new to TrialShare creating an account is free and simple. Click <a href="https://www.itntrialshare.org/selfregister">here</a> to get started.</p>\r\n   <div class="example-viz"></div>\r\n</body>\r\n<script src="populationExplorer.js"></script>\r\n\r\n\r\n</html>\r\n'
    },
    {
        dir: '0018-scatter-plot-matrix',
        files: [
            'example.html',
            'index.html',
            'index.js',
            'package.json',
            'README.md',
            'scatterPlotMatrix.js',
            'screen.png',
            'thumb.png'
        ],
        paths: {
            root: './examples/0018-scatter-plot-matrix/',
            index: 'index.html',
            thumb: 'thumb.png',
            package: 'package.json'
        },
        package: {
            homepage: 'example.html',
            main: 'index.js',
            name: 'scatter-plot-matrix',
            label: 'Interactive Scatter Plot Lattice with Vital Signs Data',
            version: '1.0.1',
            description:
                'A paneled series of scatter plots plotting every measure against every other measure',
            author: 'Rho, Inc.',
            license: 'MIT',
            keywords: [
                'javascript',
                'interactive',
                'scatter plot',
                'lattice',
                'matrix',
                'bivariate'
            ],
            dependencies: {
                d3: '~3'
            },
            dataDependecies: [
                '../../data/iris.csv',
                '../../data/safetyData/SDTM/VS.csv',
                '../0016-safety-outlier-explorer-hys-law/hy.csv'
            ]
        },
        index:
            '<!DOCTYPE html>\r\n<html>\r\n    <head>\r\n        <title>Interactive Scatter Plot Matrix</title>\r\n\r\n        <meta http-equiv = \'Content-Type\' content = \'text/html; charset = utf-8\'>\r\n\r\n        <script type = \'text/javascript\' src = \'https://d3js.org/d3.v3.min.js\'></script>\r\n        <script type = \'text/javascript\' src = \'scatterPlotMatrix.js\'></script>\r\n\r\n\r\n        <style>\r\n          /*everything*/\r\n            @import url(https://fonts.googleapis.com/css?family = Open+Sans:400,300);\r\n\r\n            * {\r\n                padding: 0;\r\n                margin: 0;\r\n                font-family: \'Open Sans\', Helvetica, Arial, sans-serif;\r\n            }\r\n\r\n            #title {\r\n                width: 96%;\r\n                margin: 2%;\r\n                border-bottom: 1px solid lightgray;\r\n                font-weight: lighter;\r\n                font-size: 250%;\r\n            }\r\n\r\n          /*tabs*/\r\n            div.tab {\r\n                width: 96%;\r\n                margin: 2%;\r\n                font-weight: lighter;\r\n                font-size: 150%;\r\n                overflow: hidden;\r\n                border: 1px solid #ccc;\r\n                background-color: #f1f1f1;\r\n            }\r\n            div.tab button {\r\n                background-color: inherit;\r\n                float: left;\r\n                border: none;\r\n                outline: none;\r\n                cursor: pointer;\r\n                padding: 14px 16px;\r\n                transition: 0.3s;\r\n            }\r\n            div.tab button:hover {\r\n                background-color: #ddd;\r\n            }\r\n            div.tab button.active {\r\n                background-color: #ccc;\r\n            }\r\n            .tabcontent {\r\n                display: none;\r\n                padding: 6px 12px;\r\n                border: 1px solid #ccc;\r\n                border-top: none;\r\n            }\r\n\r\n          /*scatter plots*/\r\n            svg {\r\n                font: 10px sans-serif;\r\n                padding: 10px;\r\n            }\r\n\r\n            .axis,\r\n            .frame {\r\n                shape-rendering: crispEdges;\r\n            }\r\n\r\n            .axis line {\r\n                stroke: #ddd;\r\n            }\r\n\r\n            .axis path {\r\n                display: none;\r\n            }\r\n\r\n            .cell text {\r\n                font-weight: bold;\r\n                text-transform: capitalize;\r\n            }\r\n\r\n            .frame {\r\n                fill: none;\r\n                stroke: #aaa;\r\n            }\r\n\r\n            circle {\r\n                fill-opacity: .7;\r\n            }\r\n\r\n            circle.hidden {\r\n                fill: #ccc !important;\r\n            }\r\n\r\n            .extent {\r\n                fill: #000;\r\n                fill-opacity: .125;\r\n                stroke: #fff;\r\n            }\r\n        </style>\r\n    </head>\r\n\r\n    <body><div class="head">\r\n  <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">\r\n  <link rel="stylesheet" href="../../util/web/css/examples.css">\r\n  <ul class = \'vl-ex-header\'>\r\n      <li class = "icon"><a href="../../"><img src="../../util/web/img/rho.png"></a></li>\r\n      <li class = "site crumb"><a href="../../"><span>Graphics</span></a></li>\r\n      <li class = \'crumb\'>Example</li>\r\n      <li class = \'title\'></li>\r\n      <li class = \'info\' title="Click to toggle chart details" onclick="toggleDetails()">&#9432;</li>\r\n      <li class = \'arrow next-arrow right\'><a href=""></a></li>\r\n      <li class = \'arrow back-arrow right\'><a href=""></a></li>\r\n  </ul>\r\n  <div id=\'vl-ex-details\' style="display:none;">\r\n    <p class="vl-ex-description"></p>\r\n\r\n    <ul class="vl-ex-tags"></ul>\r\n  </div>\r\n  <script>\r\n    function toggleDetails(){\r\n      var details = document.getElementById("vl-ex-details");\r\n      if (details.style.display === "none") {\r\n          details.style.display = "block";\r\n      } else {\r\n          details.style.display = "none";\r\n        }\r\n    }\r\n  </script>\r\n</div>\r\n\r\n        <div class="tab">\r\n            <button class="tablinks active" onclick="openTab(event, \'iris\')">Iris Measurements</button>\r\n            <button class="tablinks" onclick="openTab(event, \'VS\')">Vital Signs</button>\r\n            <button class="tablinks" onclick="openTab(event, \'hy\')">Liver Function Tests</button>\r\n        </div>\r\n\r\n        <div id="iris" class="tabcontent" style = "display:block"></div>\r\n        <div id="VS" class="tabcontent"></div>\r\n        <div id="hy" class="tabcontent"></div>\r\n    </body>\r\n\r\n    <script defer type = \'text/javascript\' src = \'index.js\'></script>\r\n</html>\r\n'
    },
    {
        dir: '0019-paneled-outlier-explorer',
        files: [
            'example.html',
            'index.html',
            'package.json',
            'paneledOutlierExplorer.js',
            'screen.png',
            'thumb.png'
        ],
        paths: {
            root: './examples/0019-paneled-outlier-explorer/',
            index: 'index.html',
            thumb: 'thumb.png',
            package: 'package.json'
        },
        package: {
            homepage: 'example.html',
            main: 'paneledOutlierExplorer.js',
            name: 'paneled-outlier-explorer',
            label: ' Brushable paneled outlier explorer',
            repository: 'github:Rhoinc/paneled-outlier-explorer',
            version: '1.0.0',
            description:
                'Example of the a brushable paneled outlier explorer that allows brushing of lines and points.',
            author: 'Rho, Inc.',
            license: 'MIT',
            keywords: [
                'javascript',
                'interactive',
                'webcharts',
                'outliers',
                'brushable',
                'paneled'
            ],
            dependencies: {
                d3: '~3',
                webcharts: '~1',
                paneledOutlierExplorer: '~1'
            },
            dataDependecies: ['../../data/hys_law.csv']
        },
        index:
            '<!DOCTYPE html>\r\n    <html>\r\n    <head>\r\n        <title>Paneled Outlier Explorer</title>\r\n        <meta http-equiv = \'Content-Type\' content = \'text/html; charset = utf-8\'>\r\n\r\n        <script type = \'text/javascript\' src = \'https://d3js.org/d3.v3.min.js\'></script>\r\n        <script type = \'text/javascript\' src = \'https://rawgit.com/RhoInc/Webcharts/master/build/webcharts.js\'></script>\r\n        <script type = \'text/javascript\' src = \'https://rawgit.com/RhoInc/paneled-outlier-explorer/master/build/paneledOutlierExplorer.js\'></script>\r\n\r\n        <link type = \'text/css\' rel = \'stylesheet\' href = \'https://rawgit.com/RhoInc/Webcharts/master/css/webcharts.min.css\'>\r\n    </head>\r\n\r\n    <body><div class="head">\r\n  <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">\r\n  <link rel="stylesheet" href="../../util/web/css/examples.css">\r\n  <ul class = \'vl-ex-header\'>\r\n      <li class = "icon"><a href="../../"><img src="../../util/web/img/rho.png"></a></li>\r\n      <li class = "site crumb"><a href="../../"><span>Graphics</span></a></li>\r\n      <li class = \'crumb\'>Example</li>\r\n      <li class = \'title\'></li>\r\n      <li class = \'info\' title="Click to toggle chart details" onclick="toggleDetails()">&#9432;</li>\r\n      <li class = \'arrow next-arrow right\'><a href=""></a></li>\r\n      <li class = \'arrow back-arrow right\'><a href=""></a></li>\r\n  </ul>\r\n  <div id=\'vl-ex-details\' style="display:none;">\r\n    <p class="vl-ex-description"></p>\r\n\r\n    <ul class="vl-ex-tags"></ul>\r\n  </div>\r\n  <script>\r\n    function toggleDetails(){\r\n      var details = document.getElementById("vl-ex-details");\r\n      if (details.style.display === "none") {\r\n          details.style.display = "block";\r\n      } else {\r\n          details.style.display = "none";\r\n        }\r\n    }\r\n  </script>\r\n</div>\r\n\r\n        <div id = \'container\'>\r\n        </div>\r\n    </body>\r\n\r\n    <script type = \'text/javascript\' src = \'paneledOutlierExplorer.js\'></script>\r\n\r\n</html>\r\n'
    },
    {
        dir: '0020-webcharts-table',
        files: [
            'example.html',
            'index.html',
            'package.json',
            'Screen Shot 2017-09-19 at 8.12.29 AM.png',
            'simpleTable.js',
            'thumb.png',
            'xlsx.full.min.js'
        ],
        paths: {
            root: './examples/0020-webcharts-table/',
            index: 'index.html',
            thumb: 'thumb.png',
            package: 'package.json'
        },
        package: {
            homepage: 'example.html',
            main: 'simpleTable.js',
            name: 'webcharts-table',
            label: 'Webcharts Table',
            repository: 'github:Rhoinc/webcharts',
            version: '1.0.0',
            description:
                'This is a simple listing of elemental data. Created using the improved table functionality in webcharts v1.9.0',
            author: 'Rho, Inc.',
            license: 'MIT',
            keywords: ['javascript', 'interactive', 'webcharts', 'table'],
            dependencies: {
                d3: '~3',
                webcharts: '^1.9'
            },
            dataDependecies: ['../../data/elements.csv']
        },
        index:
            '<html lang="en">\r\n<title>Webcharts - Table</title>\r\n<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\r\n\r\n<link rel="stylesheet" href="https://cdn.rawgit.com/RhoInc/Webcharts/7d83615038d5270d180684ecf6c87bde03ac0d33/css/webcharts.css">\r\n<script src="https://d3js.org/d3.v3.min.js"></script>\r\n<script type = \'text/javascript\' src = \'https://cdn.rawgit.com/SheetJS/js-xlsx/1a8f9726/dist/xlsx.full.min.js\'></script>\r\n<script src="https://rawgit.com/RhoInc/Webcharts/7d83615038d5270d180684ecf6c87bde03ac0d33/build/webcharts.js"></script>\r\n\r\n<style>\r\n.controls{\r\n  background:#ccc;\r\n  border:1px solid black;\r\n  border-radius:.2em;\r\n  padding:.5em;\r\n  width:inherit;\r\n  display:inline-block;\r\n  padding-bottom:1em;\r\n}\r\n\r\n.controls > div > input{\r\n  display:block\r\n}\r\n\r\n.controls > div{\r\n  display:inline-block;\r\n  vertical-align: top;\r\n  padding-left:1em;\r\n  padding-right:1em;\r\n}\r\n</style>\r\n\r\n</head>\r\n\r\n<body><div class="head">\r\n  <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">\r\n  <link rel="stylesheet" href="../../util/web/css/examples.css">\r\n  <ul class = \'vl-ex-header\'>\r\n      <li class = "icon"><a href="../../"><img src="../../util/web/img/rho.png"></a></li>\r\n      <li class = "site crumb"><a href="../../"><span>Graphics</span></a></li>\r\n      <li class = \'crumb\'>Example</li>\r\n      <li class = \'title\'></li>\r\n      <li class = \'info\' title="Click to toggle chart details" onclick="toggleDetails()">&#9432;</li>\r\n      <li class = \'arrow next-arrow right\'><a href=""></a></li>\r\n      <li class = \'arrow back-arrow right\'><a href=""></a></li>\r\n  </ul>\r\n  <div id=\'vl-ex-details\' style="display:none;">\r\n    <p class="vl-ex-description"></p>\r\n\r\n    <ul class="vl-ex-tags"></ul>\r\n  </div>\r\n  <script>\r\n    function toggleDetails(){\r\n      var details = document.getElementById("vl-ex-details");\r\n      if (details.style.display === "none") {\r\n          details.style.display = "block";\r\n      } else {\r\n          details.style.display = "none";\r\n        }\r\n    }\r\n  </script>\r\n</div>\r\n\r\n  <div class="controls">\r\n    <div>Pagination? <input class="pagination" type="checkbox" checked></input> </div>\r\n    <div># of items per page: <input class="items" value=10></input></div>\r\n    <div># of page links: <input class="pages" value=5></input></div>\r\n    <div>Apply CSS?: <input class="applyCSS" type="checkbox" checked></input></div>\r\n    <div>Searchable: <input class="searchable" type="checkbox" checked></input></div>\r\n    <div>Sortable: <input class="sortable" type="checkbox" checked></input></div>\r\n    <div>Exportable: <input class="exportable" type="checkbox" checked></input></div>\r\n    <div><button class="randomize-columns">Randomize columns</button></div>\r\n    <div><button class="randomize-headers">Randomize headers</button></div>\r\n\r\n  </div>\r\n  <div class="chart"></div>\r\n</body>\r\n<script src="simpleTable.js" defer></script>\r\n</html>\r\n'
    },
    {
        dir: '0021-webcharts-destroy-table',
        files: [
            'destroyTable.js',
            'example.html',
            'index.html',
            'package.json',
            'Screen Shot 2017-09-21 at 8.25.55 AM.png',
            'thumb.png'
        ],
        paths: {
            root: './examples/0021-webcharts-destroy-table/',
            index: 'index.html',
            thumb: 'thumb.png',
            package: 'package.json'
        },
        package: {
            homepage: 'example.html',
            main: 'destroyTable.js',
            name: 'webcharts-destroy-table',
            label: 'Destroy a Webcharts Table',
            repository: 'github:Rhoinc/webcharts',
            version: '1.0.0',
            description:
                'This example shows how to destroy a table using the `table.destroy` method.',
            author: 'Rho, Inc.',
            license: 'MIT',
            keywords: ['javascript', 'interactive', 'webcharts', 'table', 'destroy'],
            dependencies: {
                d3: '~3',
                webcharts: '^1.9'
            },
            dataDependecies: ['../../data/elements.csv']
        },
        index:
            '<html lang="en">\r\n<title>Webcharts - Countdown to destroy a table</title>\r\n<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\r\n\r\n<script src="https://d3js.org/d3.v3.min.js"></script>\r\n\r\n<link rel="stylesheet" href="https://rawgit.com/RhoInc/Webcharts/master/css/webcharts.css">\r\n<script src=\'https://rawgit.com/RhoInc/Webcharts/master/build/webcharts.js\'></script>\r\n\r\n</head>\r\n<body><div class="head">\r\n  <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">\r\n  <link rel="stylesheet" href="../../util/web/css/examples.css">\r\n  <ul class = \'vl-ex-header\'>\r\n      <li class = "icon"><a href="../../"><img src="../../util/web/img/rho.png"></a></li>\r\n      <li class = "site crumb"><a href="../../"><span>Graphics</span></a></li>\r\n      <li class = \'crumb\'>Example</li>\r\n      <li class = \'title\'></li>\r\n      <li class = \'info\' title="Click to toggle chart details" onclick="toggleDetails()">&#9432;</li>\r\n      <li class = \'arrow next-arrow right\'><a href=""></a></li>\r\n      <li class = \'arrow back-arrow right\'><a href=""></a></li>\r\n  </ul>\r\n  <div id=\'vl-ex-details\' style="display:none;">\r\n    <p class="vl-ex-description"></p>\r\n\r\n    <ul class="vl-ex-tags"></ul>\r\n  </div>\r\n  <script>\r\n    function toggleDetails(){\r\n      var details = document.getElementById("vl-ex-details");\r\n      if (details.style.display === "none") {\r\n          details.style.display = "block";\r\n      } else {\r\n          details.style.display = "none";\r\n        }\r\n    }\r\n  </script>\r\n</div>\r\n\r\n\t<h3 class="message"></h3>\r\n\t<div class="chart"></div>\r\n</body>\r\n<script src=\'destroyTable.js\'></script>\r\n\r\n</html>\r\n'
    },
    {
        dir: '0022-clinical-timelines',
        files: [
            'example.html',
            'index.html',
            'index.js',
            'package.json',
            'screen.png',
            'thumb.png'
        ],
        paths: {
            root: './examples/0022-clinical-timelines/',
            index: 'index.html',
            thumb: 'thumb.png',
            package: 'package.json'
        },
        package: {
            homepage: 'example.html',
            main: 'clinicalTimelines.js',
            name: 'clinical-timelines',
            label: 'Clinical Timelines',
            repository: 'github:Rhoinc/clinical-timelines',
            version: '1.0.0',
            description: 'Explorer clinical timelines by participant.',
            author: 'Rho, Inc.',
            license: 'MIT',
            keywords: ['javascript', 'interactive', 'webcharts', 'timelines', 'clinical trials'],
            dependencies: {
                d3: '~3',
                webcharts: '~1',
                clinicalTimelines: '~1'
            },
            dataDependecies: ['../../data/safetyData/ADTIMELINES.csv']
        },
        index:
            '<html lang = \'en\'>\r\n    <head>\r\n        <title>Clinical Timelines v0.1</title>\r\n        <meta http-equiv = \'Content-Type\' content = \'text/html; charset = utf-8\'>\r\n\r\n        <script type = \'text/javascript\' src = \'https://d3js.org/d3.v3.min.js\'></script>\r\n        <script type = \'text/javascript\' src = \'https://rawgit.com/RhoInc/Webcharts/master/build/webcharts.js\'></script>\r\n        <script type = \'text/javascript\' src = \'https://cdn.rawgit.com/RhoInc/clinical-timelines/17d1d03a96d19dcd2f2765969c3c4677256881dc/build/clinicalTimelines.js\'></script>\r\n\r\n        <link type = \'text/css\' rel = \'stylesheet\' href = \'https://cdn.rawgit.com/RhoInc/Webcharts/master/css/webcharts.css\'>\r\n    </head>\r\n\r\n    <body><div class="head">\r\n  <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">\r\n  <link rel="stylesheet" href="../../util/web/css/examples.css">\r\n  <ul class = \'vl-ex-header\'>\r\n      <li class = "icon"><a href="../../"><img src="../../util/web/img/rho.png"></a></li>\r\n      <li class = "site crumb"><a href="../../"><span>Graphics</span></a></li>\r\n      <li class = \'crumb\'>Example</li>\r\n      <li class = \'title\'></li>\r\n      <li class = \'info\' title="Click to toggle chart details" onclick="toggleDetails()">&#9432;</li>\r\n      <li class = \'arrow next-arrow right\'><a href=""></a></li>\r\n      <li class = \'arrow back-arrow right\'><a href=""></a></li>\r\n  </ul>\r\n  <div id=\'vl-ex-details\' style="display:none;">\r\n    <p class="vl-ex-description"></p>\r\n\r\n    <ul class="vl-ex-tags"></ul>\r\n  </div>\r\n  <script>\r\n    function toggleDetails(){\r\n      var details = document.getElementById("vl-ex-details");\r\n      if (details.style.display === "none") {\r\n          details.style.display = "block";\r\n      } else {\r\n          details.style.display = "none";\r\n        }\r\n    }\r\n  </script>\r\n</div>\r\n\r\n        <div class = \'chart\'></div>\r\n    </body>\r\n    <script type = \'text/javascript\' src = \'clinicalTimelines.js\'></script>\r\n\r\n</html>\r\n'
    }
];
