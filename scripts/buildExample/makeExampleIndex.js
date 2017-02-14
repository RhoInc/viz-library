var fs = require('fs');

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

	//Code to show the chart output
	
		if(ex.output.type == "interactive") {
			ex.index.lines = fs.readFileSync("interactiveIndexStub.html").toString().split("\n")	
		} else if(ex.output.type == "static"){
			ex.index.lines = fs.readFileSync("staticIndexStub.html").toString().split("\n")	
		} else {
			console.error("No output found for "+ex.dir)
		}
		  

	console.log(ex.index.lines)
	
	// otherwise, start with an image link for example.png (or .jpeg)

	// Add the header - parse the README.md header

	// Add code details - parse the README.md body

	// Show the code - parse the code file.  

	// Render data preview - grab the data show the first few rows. link to the file. 

	//write the file
}

makeExampleIndex(sampleExample)