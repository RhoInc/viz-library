var fs = require('fs');
var path = require('path');

//get example directories
var dataRoot = "./data"


//Fucntion to iteratively 'walk' through the ./data directory from:
// http://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

walk(dataRoot, function(err, allFiles) {
  if (err) throw err;
  console.log(allFiles);
	var dataFiles = allFiles
	.map(function(file_name){
		var re = /(?:\.([^.]+))?$/;
		var ext = re.exec(file_name)[1]
		return {path:file_name, ext:ext}
	})
	//get dimensions
	.filter(function(file){
		return file.ext =="csv"
	})

	var json_data = JSON.stringify(dataFiles);
	var js_data = "var dataFiles = "+json_data
	fs.writeFile('./util/web/data/dataFiles.js', js_data);
});


/*
examples.forEach(function(ex){
	////get list of files////
	ex.files = fs.readdirSync(exampleRoot+"/"+ex.dir)
	.filter(function(f){return f.charAt(0)!="."})

	////get paths of required files////
	ex.paths = {}

	//root path
	ex.paths.root = exampleRoot + "/" + ex.dir + "/"

	//readme.md
	var readmeN = ex.files.map(function(f) {
		return f.toLowerCase();
	}).indexOf("readme.md")
	ex.paths.readme = readmeN > -1 ?
		ex.files[readmeN]:
		null

	//index.html
	ex.paths.index = "index.html"

	//thumb.png
	ex.paths.thumb = "thumb.png"

	//get readme.md text
	ex.readme = {}

	//Pull in the raw readme data and look for attributes
	if(ex.paths.readme){
		var lines = fs.readFileSync(ex.paths.root+ex.paths.readme,'utf8').toString().split("\n")

		//look for chart attributes in the readme
		chartAttributes.forEach(function(c){
			var attrMatch = lines.filter(function(line){return c.regex.test(line)})
			ex[c.value] = attrMatch.length ==1 ? attrMatch[0].match(/([^(**)]+$)/)[0].trim(): null
		})
	}

	////get paths of data and code////
	ex.paths.data = ex.data
	ex.paths.code = ex.code

	//example
	var webExampleN = ex.files.map(function(f) {
		return f.toLowerCase();
	}).indexOf("example.html")

	var imgExampleN = ex.files.map(function(f) {
		return f.toLowerCase();
	}).indexOf("example.png")

	ex.paths.example =
	ex.results ?
	ex.results :
	webExampleN > -1 ?
	ex.files[webExampleN] :
	imgExampleN > -1 ?
	ex.files[imgExampleN] :
	null

	//Make thumbnails

	var imgs = ex.files
	.map(function(f) {
		return f.toLowerCase();
	}).filter(function(file){
		var ext = file.match(/\.[0-9a-z]+$/)
		if(ext){
			return [".png",".jpeg",".jpg"].indexOf(ext[0])>-1
		} else {
			return false
		}

	})

	if(imgs.indexOf("thumb.png")==-1 & imgs.length>0){
		var imgFile = ex.paths.root+imgs[0]
		var thumbFile = ex.paths.root+ex.paths.thumb
		console.log(thumbFile)
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
*/
