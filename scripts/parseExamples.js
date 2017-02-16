var fs = require('fs');
var Jimp = require("jimp");
var makeindex = require("./buildExample/makeExampleIndex.js")
/*
var fs = require('fs'), 
	d3 = require('d3'),
    jsdom = require('jsdom'),
    showdown = require('showdown')
*/

//get example directories
var exampleRoot = "./examples"
var exampleRoot_index = "./examples"
var examples =fs.readdirSync(exampleRoot)
.filter(function(f){return f.charAt(0)!="."})
.map(function(f){return {"dir":f}})

//regex expressions to look for in readme
var chartAttributes = [
	{value:"title", regex:/^\*\*Title:\*\*/},
	{value:"languages", regex:/^\*\*Languages:\*\*/},
	{value:"libraries", regex:/^\*\*Libraries:\*\*/},
	{value:"description", regex:/^\*\*Description:\*\*/},
	{value:"data", regex:/^\*\*Data:\*\*/},
	{value:"code", regex:/^\*\*Code:\*\*/},
	{value:"tags", regex:/^\*\*Tags:\*\*/},
]

examples.forEach(function(ex){
	////get list of files////
	ex.files = fs.readdirSync(exampleRoot+"/"+ex.dir)
	.filter(function(f){return f.charAt(0)!="."})
	
	////get paths of required files////
	ex.paths = {}
	//readme.md
	var readmeN = ex.files.map(function(f) {
		return f.toLowerCase();
	}).indexOf("readme.md")
	ex.paths.readme = readmeN > -1 ? 
		exampleRoot + "/" + ex.dir + "/" + ex.files[readmeN]:
		null
	
	//index.html
	ex.paths.index = exampleRoot + "/" + ex.dir + "/index.html"

	//thumbnail.png
	var thumbN = ex.files.map(function(f) {
		return f.toLowerCase();
	}).indexOf("thumbnail.png")
	ex.paths.thumbnail = thumbN > -1 ?
	exampleRoot + "/" + ex.dir + "/" + ex.files[thumbN]:
	null	

	//example
	var webExampleN = ex.files.map(function(f) {
		return f.toLowerCase();
	}).indexOf("example.html")
	
	var imgExampleN = ex.files.map(function(f) {
		return f.toLowerCase();
	}).indexOf("example.html") 

	ex.paths.example = webExampleN > -1 ? 
	exampleRoot + "/" + ex.dir + "/" +ex.files[webExampleN] :
	imgExampleN > -1 ? 
	exampleRoot + "/" + ex.dir + "/" +ex.files[imgExampleN] :
	null
	console.log(ex)

	//get readme.md text
	ex.readme = {}

	//Pull in the raw readme data and look for attributes
	if(ex.paths.readme){
		var lines = fs.readFileSync(ex.paths.readme,'utf8').toString().split("\n")	

		//look for chart attributes in the readme
		chartAttributes.forEach(function(c){
			var attrMatch = lines.filter(function(line){return c.regex.test(line)})
			ex[c.value] = attrMatch.length ==1 ? attrMatch[0].match(/([^(**)]+$)/)[0].trim(): null
		})
	}

	////get paths of data and code////
	ex.paths.data = ex.data
	ex.paths.code = exampleRoot + "/" + ex.dir + "/" +ex.code

	//Make thumbnails
	var imgs = ex.files
	.map(function(f) {
		return f.toLowerCase();
	}).filter(function(file){
		var ext = file.match(/\.[0-9a-z]+$/)[0]
		return [".png",".jpeg",".jpg"].indexOf(ext)>-1
	})
	
	if(imgs.indexOf("thumb.png")==-1 & imgs.length>0){
		console.log("making a thumb for "+ex.dir)
		var imgFile = exampleRoot+"/"+ex.dir+"/"+imgs[0]
		var thumbFile = ex.paths.thumb
	
		Jimp.read(imgFile, function (err, lenna) {
	    	if (err) throw err;
		    lenna.resize(300, 200)            // resize 
		         .quality(60)                 // set JPEG quality 
		         .write(thumbFile); // save 
		});
	}

	//Make example pages (unless readme says not to)
	var makeIndexRegex = /(\[comment\]: <> \(---NO AUTO INDEX---\))/
	var makeIndexLines = lines.filter(function(line){return makeIndexRegex.test(line)})
	ex.makeIndex = makeIndexLines.length == 0 
	
	if(ex.makeIndex) makeindex.makeExampleIndex(ex)

})

//write examples to disk
var json_data = JSON.stringify(examples);
var js_data = "export default"+json_data
fs.writeFile('./util/web/data/examples.js', js_data);
