(function () {
	'use strict';

	var examples = [{
		"id": "0001-density-lattice",
		"title": "Density plot",
		"repository": "lattice",
		"technology": "R",
		"url": "./examples/0001-density-lattice",
		"thumbnail": "./util/web/img/defaultchart.png",
		"description": "This is a sweet description",
		"tags": ["tag1", "tag2"]
	}, {
		"id": "0002-dotplot-ggplot",
		"title": "Dotplot",
		"repository": "ggplot",
		"technology": "SAS",
		"url": "./examples/0002-dotplot-ggplot",
		"thumbnail": "./util/web/img/defaultchart.png",
		"description": "This is a sweet description",
		"tags": ["tag1", "tag2"]
	}, {
		"id": "0003-dotplot-lattice",
		"title": "More Dotplot",
		"repository": "lattice",
		"technology": "SAS",
		"url": "./examples/0003-dotplot-lattice",
		"thumbnail": "./util/web/img/defaultchart.png",
		"description": "This is a sweet description",
		"tags": ["tag1", "tag2"]
	}, {
		"id": "0004-pirateplot-yarrr",
		"title": "Pirate plot",
		"repository": "lattice",
		"technology": "R",
		"url": "./examples/0004-pirateplot-yarrr",
		"thumbnail": "./util/web/img/defaultchart.png",
		"description": "This is a sweet description",
		"tags": ["tag1", "tag2"]
	}, {
		"id": "0005-unemploy-mvtsplot",
		"title": "MVTS Plot",
		"repository": "lattice",
		"technology": "R",
		"url": "./examples/0005-unemploy-mvtsplot",
		"thumbnail": "./util/web/img/defaultchart.png",
		"description": "This is a sweet description",
		"tags": ["tag1", "tag2"]
	}, {
		"id": "0006-precip-levelplot-lattice",
		"title": "Level Plot",
		"repository": "lattice",
		"technology": "R",
		"url": "./examples/0006-precip-levelplot-lattice",
		"thumbnail": "./util/web/img/defaultchart.png",
		"description": "This is a sweet description",
		"tags": ["tag1", "tag2"]
	}];

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
		items.append("a").attr("href", d => d.url).append("img").attr({
			width: 300,
			height: 200,
			alt: d => d.id,
			src: d => d.thumbnail
		});

		//append text title
		items.append("a").attr("class", "text-wrap").attr("href", d => d.url).append("p").append("span").attr("class", "media-title").text(d => d.title);
	}

	console.log(examples);
	buildFilters(examples, ["repository", "technology"], ".controls");
	buildExampleList(examples, ".examples");
})();

