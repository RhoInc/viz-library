const glob = require('glob');
const fs = require('fs');

//Create a variable containing the web-codebook data explorer code.
let text = 'var settings = {files:\n    [';

//Find all .csv files in the ./data folder and subfolders.
glob('./data/**/*.csv', function(err, files) {
  //Concatenate an object representing each data file to the text variable.
    files.forEach(function(file,i) {
        const fileName = file.split('/')[file.split('/').length - 1];
        text = text + '{label: "' + fileName.split('.')[0] + '", ';
        text = text + 'path: "../.' + file + '", ';
        text = text + 'settings: {}}';
        if (i < (files.length - 1))
            text = text + '\n    ,';
    });

    text = text + ']};\n';
    text = text + 'var explorer = webcodebook.createExplorer(".explorer", settings).init();';

  //Write the text file to example 0012.
    fs.writeFile('./examples/0012-web-codebook-explorer/webCodebookExplorer.js', text, function(err) {
        if (err) {
            return console.log(err);
        }

        console.log('The code to produce example 0012-web-codebook-explorer was written!');
    });
});
