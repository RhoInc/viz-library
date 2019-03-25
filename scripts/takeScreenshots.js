var json = require("../data/examples.json");
const captureWebsite = require('capture-website');
//var webshot = require("webshot");

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

json.forEach(function(repo) {
    const start = async () => {
        await Promise.all(repo.examples.map(async (ex,i) => {
            (async () => {
                await captureWebsite.file(
                    ex.example_url,
                    '../img/' + repo.name + '-' + i + '.png'
                );
            })();
        }));
    };

    start();
});
    //webshot(
    //  ex.example_url,
    //  "../img/" + repo.name + "-" + i + ".png",
    //  {
    //    renderDelay: 5000,
    //    defaultWhiteBackground: true
    //  },
    //  function(err) {}
    //);
//    });
//});
