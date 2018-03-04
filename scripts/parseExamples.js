var fs = require("fs");
var Jimp = require("jimp");
var makeindex = require("./buildExample/makeExampleIndex.js");

//get example directories
var exampleRoot = "./examples";
var exampleRoot_index = "./examples";
var examples = fs
  .readdirSync(exampleRoot)
  .filter(function(f) {
    return f.charAt(0) != ".";
  })
  .map(function(f) {
    return { dir: f };
  });

/* parse each example */
examples.forEach(function(ex) {
  /****************************
   *** File/path management
   *****************************/
  ex.files = fs.readdirSync(exampleRoot + "/" + ex.dir).filter(function(f) {
    return f.charAt(0) != ".";
  });

  ////get paths of required files////
  ex.paths = {};
  ex.paths.root = exampleRoot + "/" + ex.dir + "/"; //root path
  ex.paths.index = "index.html";
  ex.paths.thumb = "thumb.png";

  /****************************
   *** Pull package.json into an object, do some error checking and create index.html
   *****************************/

  var packageN = ex.files
    .map(function(f) {
      return f.toLowerCase();
    })
    .indexOf("package.json");

  ex.paths.package = packageN > -1 ? ex.files[packageN] : null;
  if (ex.paths.package) {
    var lines = fs
      .readFileSync(ex.paths.root + ex.paths.package, "utf8")
      .toString();
    ex.package = JSON.parse(lines);

    //make sure that required fields are found
    var requiredProperties = ["homepage", "main", "name", "version"];
    requiredProperties.forEach(function(p) {
      if (!ex.package[p]) {
        console.error(
          "ERROR: Can't create index.html " +
            ex.paths.root +
            " since `" +
            p +
            "` is missing in package.json."
        );
        return;
      }
    });

    //make sure that main isn't set to index.html
    if (ex.package["main"].toLowerCase() == "index.html") {
      console.error(
        "ERROR: Can't create index.html " +
          ex.paths.root +
          " since `main` is set to index.html."
      );
      return;
    }

    //create index.html for the example
    makeindex.makeExampleIndex(ex);
  } else {
    console.error(
      "ERROR: Can't create index.html " +
        ex.paths.root +
        " since no package.json was found."
    );
  }

  /****************************
   *** Make thumbnails
   *****************************/
  var imgs = ex.files
    .map(function(f) {
      return f.toLowerCase();
    })
    .filter(function(file) {
      var ext = file.match(/\.[0-9a-z]+$/);
      if (ext) {
        return [".png", ".jpeg", ".jpg"].indexOf(ext[0]) > -1;
      } else {
        return false;
      }
    });

  if ((imgs.indexOf("thumb.png") == -1) & (imgs.length > 0)) {
    var imgFile = ex.paths.root + imgs[0];
    var thumbFile = ex.paths.root + ex.paths.thumb;
    console.log(thumbFile);
    Jimp.read(imgFile, function(err, lenna) {
      if (err) throw err;
      lenna
        .resize(300, 200) // resize
        .quality(60) // set JPEG quality
        .write(thumbFile); // save
    });
  }
});

//write examples to disk
var json_data = JSON.stringify(examples);
var js_data = "var examples =" + json_data;
fs.writeFile("./util/web/data/examples.js", js_data);
