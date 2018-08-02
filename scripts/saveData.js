var fs = require('fs');

module.exports = {
    saveData: function(path, array) {
        var type = path.split('/').pop();

        //save to .json
        var outJSON = `${path}.json`;
        var json_data = JSON.stringify(array, null, 4);
        fs.writeFile(outJSON, json_data, err => {
            if (err) console.log(err);
            console.log(`Saved ${type} summary to ${outJSON}`);
        });

        //save to .js
        var outJS = `${path}.js`;
        var js_data = `var ${type} = ` + json_data;
        fs.writeFile(outJS, js_data, err => {
            if (err) console.log(err);
            console.log(`Saved ${type} summary to ${outJS}`);
        });
    }
};
