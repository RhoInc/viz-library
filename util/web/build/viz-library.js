(function () {
	'use strict';

	var examples = [{ "dir": "0000-sample-data", "files": ["ChickWeight.csv", "README.md", "discrete_scores.csv", "maxresdefault.jpg", "thumb.png"], "readme": { "index": 1, "path": "./examples/0000-sample-data/README.md" }, "title": "Sample Data Sets", "languages": "NA", "libraries": "NA", "description": "Library of sample data sets that can be used in examples.", "tags": "data" }, { "dir": "0001-density-lattice", "files": ["0001-density-lattice.R", "0001-density-lattice.png", "0001-density-lattice_thumb.png", "README.md", "index.html", "thumb.png"], "readme": { "index": 3, "path": "./examples/0001-density-lattice/README.md" }, "title": "Density Plot", "languages": "R", "libraries": "lattice", "description": "Customized density plot created using lattice combining paneling, grouping, custom annotations and some simple data manipulation.", "tags": "density plot, lattice, r, groups, means, annotated, faceted" }, { "dir": "0002-dotplot-ggplot", "files": ["0002-dotplot-ggplot.R", "0002-dotplot-ggplot.png", "README.md", "index.html", "thumb.png"], "readme": { "index": 2, "path": "./examples/0002-dotplot-ggplot/README.md" }, "title": "Stacked Dot Plot #1", "languages": "R", "libraries": "ggplot2", "description": "Stacked dot plot created using ggplot2 combining paneling, custom annotations and some simple data manipulation.", "tags": "dotplot, r, ggplot2, facet, median, highlight, stack points, discrete" }, { "dir": "0003-dotplot-lattice", "files": ["0003-dotplot-lattice.R", "0003-dotplot-lattice.png", "0003-dotplot-lattice_tags.txt", "README.md", "index.html", "thumb.png"], "readme": { "index": 3, "path": "./examples/0003-dotplot-lattice/README.md" }, "title": "Stacked Dot Plot #2", "languages": "R", "libraries": "lattice", "description": "Stacked dot plot created using ggplot2 combining paneling, custom annotations and simple data manipulation. Similar to <a href=\"../0002-dotplot-lattice\">this example</a> made with lattice.", "tags": "dotplot, r, lattice, facet, median, highlight, stack points, discrete" }, { "dir": "0004-pirateplot-yarrr", "files": ["0004-pirateplot-yarrr.R", "0004-pirateplot-yarrr.png", "0004-pirateplot-yarrr_tags.txt", "README.md", "index.html", "thumb.png"], "readme": { "index": 3, "path": "./examples/0004-pirateplot-yarrr/README.md" }, "title": "Pirate plot using Yarrr", "languages": "R", "libraries": "yarrr", "description": "Combines a box-and-whisker plot with overlaid density plots to show clear comparisons of distributions across groups; a good choice for  displaying the relationship between 1 or two categorical independent variables, and one continuous dependent variable.", "tags": "pirateplot, boxplot, density plot, violin plot" }, { "dir": "0005-unemploy-mvtsplot", "files": ["0005-unemploy-mvtsplot.R", "0005-unemploy-mvtsplot.png", "README.md", "blsunemployment.csv", "index.html", "thumb.png"], "readme": { "index": 2, "path": "./examples/0005-unemploy-mvtsplot/README.md" }, "title": "Unemployment Trends with a Multivariate Time Series", "languages": "R", "libraries": "mvtsplot", "description": "Mutivariate time series plot using MVTSPLOT package and Unemployment data", "tags": "multivariate, time series, heatmap, monthly" }, { "dir": "0006-precip-levelplot-lattice", "files": ["0006-precip-levelplot-lattice.R", "0006-precip-levelplot-lattice.png", "Precipitations.csv", "README.md", "index.html", "thumb.png"], "readme": { "index": 3, "path": "./examples/0006-precip-levelplot-lattice/README.md" }, "title": "Orderered Precipitation Heatmap", "languages": "R", "libraries": "lattice", "description": "Heatmap with ordered columns and rows using monthly precipitation data", "tags": "Ordered, heatmap, annotation" }, { "dir": "0007-simple-barchart-webcharts", "files": ["OlympicMedals2012.csv", "README.md", "index.html", "simpleBarChart.js", "thumb.png", "thumbnail.png"], "readme": { "index": 1, "path": "./examples/0007-simple-barchart-webcharts/README.md" }, "title": "Simple Interactive Bar Chart", "languages": "javascript", "libraries": "webcharts", "description": "This is a simple bar chart showing counts of medals won by country at the 2012 summer Olympics. Made with Webcharts.", "tags": "interactive, bar chart" }];

	/* -----------------------------------------------------
  Takes a meta data and an array of properties for which 
  standard filters (<select> elements) are created. Measures 
  can take the form [attr1, attr2] or 
  [{colName:"attr1",label:"Attribute #1"},{colName:"attr2",label:"Attribute #2"}]
  ----------------------------------------------------- */

	function buildFilters(meta, measures, parentElement) {

		measures = measures.map(function (m) {
			console.log(m.length);
			return m.length ? { colName: m, label: m } : m;
		});

		var wraps = d3.select(parentElement).selectAll("div.controlWrap").data(measures).enter().append("div").attr("class", "controlWrap");

		//create the select for the filter
		wraps.append("div").attr("class", "controlLabel").text(d => d.label);

		var selects = wraps.append("select");
		selects.selectAll('option').data(function (d) {
			// gets a list of values for the measure
			var measureName = d.colName;
			var values = d3.set(meta.map(metaRow => metaRow[measureName])).values();
			var allvalues = d3.merge([["All"], values]);
			return allvalues;
		}).enter().append("option").text(d => d);

		//add event listener for the filters	
		selects.on("change", function (d) {
			var elements = d3.selectAll("div.media-tile");
			elements.classed("hidden", false);
			selects.each(function (e) {
				var value = this.value;
				var measure = e.colName;
				console.log(value + "=" + measure);
				if (value != "All") elements.filter(d => d[measure] != value).classed("hidden", true);
			});
		});
	}

	/* -----------------------------------------------------
  Takes an array of metadata object (see sample input) and 
  a valid css selector (`parentDiv`)  and renders divs
  styled for for the example gallery (see sample output)
 	Sample Input for `meta`: 
 	[
 		{
 			"id":"0001-density-lattice",
 			"title": "Custom Density Plot Example"
 			"repository":"lattice",
 			"technology":"R",
 			"url":"/0001-density-lattice",
 			"thumbnail":"default", //or "placeholder"
 			"description":"This is a sweet description" 
 		},
 		... //add more objects here as desired
 	]
 	Sample Output rendered to DOM (one per object in meta: 
 <div class="media-tile">
     <a href="./examples/0001-density-lattice">
         <img src="./examples/0001-density-lattice/thumbnail.png" width="300" height="200" alt="0001-density-lattice">
     </a>
     <a href="./examples/0001-density-lattice" class="text-wrap">
         <p>
             <span class="media-title">Custom Density Plot Example</span>
         </p>
     </a>
 </div>
    ---------------------------------------------------- */

	function buildExampleList(meta, parentElement) {
		var parentDiv = d3.select(parentElement);
		var wrap = parentDiv.append("div").attr("class", "media-list");
		var items = wrap.selectAll("div").data(meta).enter().append("div").attr("class", "media-tile");

		//append image
		items.append("a").attr("href", d => "./examples/" + d.dir).append("img").attr({
			width: 300,
			height: 200,
			alt: d => d.id,
			src: d => "./examples/" + d.dir + "/thumb.png"
		});

		//append text title
		items.append("a").attr("class", "text-wrap").attr("href", d => d.url).append("p").append("span").attr("class", "media-title").text(d => d.title);
	}

	console.log(examples);
	buildFilters(examples, ["languages", "libraries"], ".controls");
	buildExampleList(examples, ".examples");
})();

