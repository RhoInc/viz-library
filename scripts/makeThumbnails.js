var Jimp = require("jimp");
var examples = require('../util/web/data/examples.json')

console.log(examples)

var files = [
	{
	"path":"../examples/0001-density-lattice/",
	"file":"0001-density-lattice",
	"extension":".png"
	}
]

files.forEach(function(f){
	f.input = f.path + f.file + f.extension 
	f.output = f.path + f.file + "_thumb" + f.extension
	Jimp.read(f.input, function (err, lenna) {
    	if (err) throw err;
	    lenna.resize(300, 200)            // resize 
	         .quality(60)                 // set JPEG quality 
	         .write(f.output); // save 
	});
})


