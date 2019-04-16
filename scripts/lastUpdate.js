var fs = require("fs");
var d3 = require("d3");

var date = new Date();
fs.writeFile(
  "./data/lastUpdate.json",
  JSON.stringify({date:d3.time.format("%Y-%m-%d, %X")(date)}, null, 4),
  error => {
    if (error) {
      console.log(error);
    } else {
      console.log(
        "New update logged at "+date
      );
    }
  }
);
