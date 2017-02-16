var fs = require('fs'), 
	d3 = require('d3'),
    jsdom = require('jsdom'),
    showdown = require('showdown')
/* 

Create an index.html file for a given example 
Input: an Example Object created by parseExamples.js
Output: an index.html file saved in the example folder 

*/
var exampleRoot = "./examples"
var sampleExample = {
	"dir":"0007-simple-barchart-webcharts",
	"files":[
		"OlympicMedals2012.csv",
		"README.md",
		"example.html",
		"simpleBarChart.js",
		"thumb.png",
		"thumbnail.png"
	],
	"readme":{"index":1,"path":"./examples/0007-simple-barchart-webcharts/README.md"},
	"code":{"path":"./examples/0007-simple-barchart-webcharts/simpleBarChart.js"},
	"title":"Simple Interactive Bar Chart",
	"languages":"javascript",
	"libraries":"webcharts",
	"description":"This is a simple bar chart showing counts of medals won by country at the 2012 summer Olympics. Made with Webcharts.",
	"tags":"interactive, bar chart"
}

function makeExampleIndex(ex){
	ex.index = {} //track infor the index file for the example
	ex.output = {} //track info about the output for the example
	ex.output.type = ex.files.indexOf("example.html")>-1 ? "interactive" : 
		ex.files.indexOf("example.png")>-1 ? "static" : 
		"error"

	//pick a stub depending on whether there the example is in .html or not. 	
	if(ex.output.type == "interactive") {
		ex.index.lines = fs.readFileSync("./scripts/buildExample/interactiveIndexStub.html").toString()	
	} else if(ex.output.type == "static"){
		ex.index.lines = fs.readFileSync("./scripts/buildExample/staticIndexStub.html").toString()
	} else {
		console.error("No output found for "+ex.dir)
	}
	  
	// pass the html stub to jsDom 
	// via https://mango-is.com/blog/engineering/pre-render-d3-js-charts-at-server-side/
	// and https://bl.ocks.org/tomgp/c99a699587b5c5465228

	var readme = fs.readFileSync(ex.readme.path).toString()
	var code = fs.readFileSync(ex.code.path).toString()
	jsdom.env({
	  html: ex.index.lines,
   	  features:{ QuerySelector:true }, //you need query selector for D3 to work
	  done: function (err, window) {
			window.d3 = d3.select(window.document); //get d3 into the dom

			// Add the header - parse the README.md header
			var headerRegex = /^.[\s\S]*(?=(\[comment\]: <> \(---END OF HEADER---\)))/
			var headerContent_markdown = readme.match(headerRegex)[0]
			var converter = new showdown.Converter()
    		var headerContent_html = converter.makeHtml(headerContent_markdown);
			window.d3.select(".header").html(headerContent_html)

			// Add the details - parse the README.md body
			var detailRegex = /(\[comment\]: <> \(---END OF HEADER---\))[\s\S]*$/
			var detailContent_markdown = readme.match(detailRegex)[0]
			var converter = new showdown.Converter()
    		var detailContent_html = converter.makeHtml(detailContent_markdown);			
    		window.d3.select(".details").html(detailContent_html)

			// Show the code - parse the code file.  
			window.d3.select(".code").text(code)

			// Render data preview - grab the data show the first few rows. link to the file. 
			var dataContent = "Data here.";
			window.d3.select(".data").html(dataContent)
			console.log(window.innerHTML)
			//write the file    		
			fs.writeFileSync(
    			'./scripts/buildExample/testindex.html', 
    			window.document.documentElement.outerHTML
    			//window.d3.select('body').html()
    		) 
		}
	});




}

makeExampleIndex(sampleExample)