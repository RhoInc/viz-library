var webshot = require("webshot");
var json = require("../data/examples.json");

json.forEach(function(repo) {
  repo.examples.forEach(function(ex, i) {
    webshot(
      ex,
      "../img/" + repo.name + "-" + i + ".png",
      {
        renderDelay: 5000,
        defaultWhiteBackground: true
      },
      function(err) {}
    );
  });
});
