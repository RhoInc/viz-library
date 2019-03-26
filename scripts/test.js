const captureWebsite = require("capture-website");

(async () => {
  await captureWebsite.file(
    "http://rhoinc.github.io/Webcharts/test-page/createChart/",
    "webcharts.createChart.png"
  );
})();
