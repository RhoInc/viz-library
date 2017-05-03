var fs = require("fs");
var path = require("path");

//get example directories
var dataRoot = "./data";

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

const csvFilePath = "<path to csv file>";
const csv = require("csvtojson");

walk(dataRoot, function(err, allFiles) {
  if (err) throw err;
  var dataFiles = allFiles
    .map(function(local_path) {
      //Replace backslashes (Windows) with forward slashes (every other OS).
      local_path = local_path.replace(/\\/g, "/");

      //filename
      var filename = local_path.replace(/^.*[\\\/]/, "");

      //extension
      var ext_re = /(?:\.([^.]+))?$/;
      var ext = ext_re.exec(filename)[1];

      //root
      var rel_path_re = /\/data\/(?!.*\/data)(.*$)/;
      var rel_path = "./" + rel_path_re.exec(local_path)[1];

      return {
        local_path: local_path,
        filename: filename,
        ext: ext,
        rel_path: rel_path
      };
    })
    //just keep csvs
    .filter(function(file) {
      return file.ext == "csv";
    });

  //get dimensions
  console.log(
    "Found " + dataFiles.length + " files - counting rows and columns ..."
  );

  var processed = 0;
  dataFiles.forEach(function(file, i) {
    file.rows = 0;
    file.cols = 0;
    csv()
      .fromFile(file.local_path)
      .on("json", jsonObj => {
        file.rows += 1;
        if (!file.cols) {
          file.cols = Object.keys(jsonObj).length;
        }
      })
      .on("done", error => {
        processed += 1;
        console.log(
          processed +
            " of " +
            dataFiles.length +
            " complete: " +
            file.rel_path +
            " has " +
            file.rows +
            " rows and " +
            file.cols +
            " columns."
        );

        if (processed == dataFiles.length) {
          var outpath = "./util/web/data/dataFiles.js";
          console.log("Saving file summaries to " + outpath);
          var json_data = JSON.stringify(dataFiles);
          var js_data = "var dataFiles = " + json_data;
          fs.writeFile(outpath, js_data);
        }
      });
  });
});
