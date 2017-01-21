var fs = require('fs');

//get example directories
var exampleRoot = "../examples"
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
	{value:"tags", regex:/^\*\*Tags:\*\*/},

]

examples.forEach(function(ex){
	//get example files
	ex.files = fs.readdirSync(exampleRoot+"/"+ex.dir)

	//get readme.md text
	ex.readme = {}
	ex.readme.index = ex.files.map(function(f) {
		return f.toLowerCase();
	}).indexOf("readme.md")

	//Pull in the raw readme data and look for attributes
	if(ex.readme.index>-1){
		ex.readme.path= exampleRoot + "/" + ex.dir + "/" + ex.files[ex.readme.index]
		var lines = fs.readFileSync(ex.readme.path,'utf8').toString().split("\n")	

		//look for chart attributes in the readme
		chartAttributes.forEach(function(c){
			var attrMatch = lines.filter(function(line){return c.regex.test(line)})
			ex[c.value] = attrMatch.length ==1 ? attrMatch[0].match(/([^(**)]+$)/)[0].trim(): null
		})
	}

	//Make thumbnails
})

//write examples to disk
var json_data = JSON.stringify(examples);
var js_data = "export default"+json_data
fs.writeFile('../util/web/data/examples.js', js_data);
//console.log(examples)
