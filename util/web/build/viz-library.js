(function () {
	'use strict';

	var examples = [{ "dir": "0000-sample-data", "files": ["ChickWeight.csv", "README.md", "discrete_scores.csv", "maxresdefault.jpg", "safetyData", "thumb.png"], "paths": { "root": "./examples/0000-sample-data/", "readme": "README.md", "index": "index.html", "thumb": "thumb.png", "data": null, "code": null, "example": null }, "readme": {}, "title": "Sample Data Sets", "languages": "NA", "libraries": "NA", "description": "Library of sample data sets that can be used in examples.", "data": null, "code": null, "results": null, "tags": "data", "makeIndex": false }, { "dir": "0001-density-lattice", "files": ["0001-density-lattice.R", "0001-density-lattice.png", "0001-density-lattice_thumb.png", "README.md", "index.html", "thumb.png"], "paths": { "root": "./examples/0001-density-lattice/", "readme": "README.md", "index": "index.html", "thumb": "thumb.png", "data": "../examples/0000-sample-data/ChickWeight.csv", "code": "0001-density-lattice.R", "example": "0001-density-lattice.png" }, "readme": {}, "title": "Density Plot", "languages": "R", "libraries": "lattice", "description": "Customized density plot created using lattice combining paneling, grouping, custom annotations and some simple data manipulation.", "data": "../examples/0000-sample-data/ChickWeight.csv", "code": "0001-density-lattice.R", "results": "0001-density-lattice.png", "tags": "density plot, lattice, r, groups, means, annotated, faceted", "makeIndex": true }, { "dir": "0002-dotplot-ggplot", "files": ["0002-dotplot-ggplot.R", "0002-dotplot-ggplot.png", "README.md", "index.html", "thumb.png"], "paths": { "root": "./examples/0002-dotplot-ggplot/", "readme": "README.md", "index": "index.html", "thumb": "thumb.png", "data": "../examples/0000-sample-data/discrete_scores.csv", "code": "0002-dotplot-ggplot.R", "example": "0002-dotplot-ggplot.png" }, "readme": {}, "title": "Stacked Dot Plot #1", "languages": "R", "libraries": "ggplot2", "description": "Stacked dot plot created using ggplot2 combining paneling, custom annotations and some simple data manipulation.", "data": "../examples/0000-sample-data/discrete_scores.csv", "code": "0002-dotplot-ggplot.R", "results": "0002-dotplot-ggplot.png", "tags": "dotplot, r, ggplot2, facet, median, highlight, stack points, discrete", "makeIndex": true }, { "dir": "0003-dotplot-lattice", "files": ["0003-dotplot-lattice.R", "0003-dotplot-lattice.png", "0003-dotplot-lattice_tags.txt", "README.md", "index.html", "thumb.png"], "paths": { "root": "./examples/0003-dotplot-lattice/", "readme": "README.md", "index": "index.html", "thumb": "thumb.png", "data": "../examples/0000-sample-data/discrete_scores.csv", "code": "0003-dotplot-lattice.R", "example": "0003-dotplot-lattice.png" }, "readme": {}, "title": "Stacked Dot Plot #2", "languages": "R", "libraries": "lattice", "description": "Stacked dot plot created using ggplot2 combining paneling, custom annotations and simple data manipulation. Similar to <a href=\"../0002-dotplot-lattice\">this example</a> made with lattice.", "data": "../examples/0000-sample-data/discrete_scores.csv", "code": "0003-dotplot-lattice.R", "results": "0003-dotplot-lattice.png", "tags": "dotplot, r, lattice, facet, median, highlight, stack points, discrete", "makeIndex": true }, { "dir": "0004-pirateplot-yarrr", "files": ["0004-pirateplot-yarrr.R", "0004-pirateplot-yarrr.png", "0004-pirateplot-yarrr_tags.txt", "README.md", "index.html", "thumb.png"], "paths": { "root": "./examples/0004-pirateplot-yarrr/", "readme": "README.md", "index": "index.html", "thumb": "thumb.png", "data": "https://vincentarelbundock.github.io/Rdatasets/csv/datasets/chickwts.csv", "code": "0004-pirateplot-yarrr.R", "example": "0004-pirateplot-yarrr.png" }, "readme": {}, "title": "Pirate plot using Yarrr", "languages": "R", "libraries": "yarrr", "description": "Combines a box-and-whisker plot with overlaid density plots to show clear comparisons of distributions across groups; a good choice for  displaying the relationship between 1 or two categorical independent variables, and one continuous dependent variable.", "data": "https://vincentarelbundock.github.io/Rdatasets/csv/datasets/chickwts.csv", "code": "0004-pirateplot-yarrr.R", "results": "0004-pirateplot-yarrr.png", "tags": "pirateplot, boxplot, density plot, violin plot", "makeIndex": true }, { "dir": "0005-unemploy-mvtsplot", "files": ["0005-unemploy-mvtsplot.R", "0005-unemploy-mvtsplot.png", "README.md", "blsunemployment.csv", "index.html", "thumb.png"], "paths": { "root": "./examples/0005-unemploy-mvtsplot/", "readme": "README.md", "index": "index.html", "thumb": "thumb.png", "data": "Precipitations.csv", "code": "0005-unemploy-mvtsplot.R", "example": "0005-unemploy-mvtsplot.png" }, "readme": {}, "title": "Unemployment Trends with a Multivariate Time Series", "languages": "R", "libraries": "mvtsplot", "description": "Mutivariate time series plot using MVTSPLOT package and Unemployment data", "data": "Precipitations.csv", "code": "0005-unemploy-mvtsplot.R", "results": "0005-unemploy-mvtsplot.png", "tags": "multivariate, time series, heatmap, monthly", "makeIndex": true }, { "dir": "0006-precip-levelplot-lattice", "files": ["0006-precip-levelplot-lattice.R", "0006-precip-levelplot-lattice.png", "Precipitations.csv", "README.md", "index.html", "thumb.png"], "paths": { "root": "./examples/0006-precip-levelplot-lattice/", "readme": "README.md", "index": "index.html", "thumb": "thumb.png", "data": "blsunemployment.csv", "code": "0006-precip-levelplot-lattice.R", "example": "0006-precip-levelplot-lattice.png" }, "readme": {}, "title": "Orderered Precipitation Heatmap", "languages": "R", "libraries": "lattice", "description": "Heatmap with ordered columns and rows using monthly precipitation data", "data": "blsunemployment.csv", "code": "0006-precip-levelplot-lattice.R", "results": "0006-precip-levelplot-lattice.png", "tags": "Ordered, heatmap, annotation", "makeIndex": true }, { "dir": "0007-simple-barchart-webcharts", "files": ["OlympicMedals2012.csv", "README.md", "example.html", "index.html", "simpleBarChart.js", "thumb.png"], "paths": { "root": "./examples/0007-simple-barchart-webcharts/", "readme": "README.md", "index": "index.html", "thumb": "thumb.png", "data": "OlympicMedals2012.csv", "code": "simpleBarChart.js", "example": "example.html" }, "readme": {}, "title": "Simple Interactive Bar Chart", "languages": "javascript", "libraries": "webcharts", "description": "This is a simple bar chart showing counts of medals won by country at the 2012 summer Olympics. Made with Webcharts.", "data": "OlympicMedals2012.csv", "code": "simpleBarChart.js", "results": null, "tags": "interactive, bar chart", "makeIndex": true }, { "dir": "0008-safetyExplorer-default", "files": ["README.md", "ae-table", "ae-timelines", "chart.html", "index.html", "safety-histogram", "safety-outlier-explorer", "safety-results-over-time", "safety-shift-plot", "safetyExplorer.css", "thumb.png", "timeline.png"], "paths": { "root": "./examples/0008-safetyExplorer-default/", "readme": "README.md", "index": "index.html", "thumb": "thumb.png", "data": "../0000-sample-data/safetyData/", "code": "ae-table/index.html", "example": "ae-table/index.html" }, "readme": {}, "title": "Safety Explorer - Default Configuration", "languages": "javascript", "libraries": "webcharts, safety-histogram, safety-results-over-time, safety-shift-plot, safety-outlier-explorer, ae-timeline, ae-explorer", "description": "The safety explorer is a collection of interactive graphics visualizing adverse event, lab, and vital sign data captured in clinical trials.  This instance demonstrates each graphic with default settings.", "data": "../0000-sample-data/safetyData/", "code": "ae-table/index.html", "results": "ae-table/index.html", "tags": "interactive, webcharts, adverse events, safety explorer", "makeIndex": true }, { "dir": "0009-web-codebook-demo", "files": ["README.md", "example.html", "index.html", "screen.png", "thumb.png", "webCodebookDemo.js"], "paths": { "root": "./examples/0009-web-codebook-demo/", "readme": "README.md", "index": "index.html", "thumb": "thumb.png", "data": "../0000-sample-data/safetyData/", "code": "webCodebookDemo.js", "example": "example.html" }, "readme": {}, "title": "Web Codebook Demo", "languages": "javascript", "libraries": "web-codebook", "description": "Demonstration of the web-based data summaries using web-codebook.", "data": "../0000-sample-data/safetyData/", "code": "webCodebookDemo.js", "results": "example.html", "tags": "interactive, codebook", "makeIndex": true }];

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

