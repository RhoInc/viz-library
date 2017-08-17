/*

Create an index.html file for a given example
Input: an Example Object created by parseExamples.js
Output: an index.html file saved in the example folder

*/

/*
var exampleRoot = "./examples"
var sampleExample = {
	"dir":"0007-simple-barchart-webcharts",
	"files":[
		"OlympicMedals2012.csv",
		"README.md",
		"example.html",
		"simpleBarChart.js",
		"thumb.png",
		"thumbnail.png"
	],
	"readme":{"index":1,"path":"./examples/0007-simple-barchart-webcharts/README.md"},
	"code":{"path":"./examples/0007-simple-barchart-webcharts/simpleBarChart.js"},
	"index":{"path":"./examples/0007-simple-barchart-webcharts/index.html"},
	"title":"Simple Interactive Bar Chart",
	"languages":"javascript",
	"libraries":"webcharts",
	"description":"This is a simple bar chart showing counts of medals won by country at the 2012 summer Olympics. Made with Webcharts.",
	"tags":"interactive, bar chart",
	"data":"OlympicMedals2012.csv"
}*/

exports.makeExampleIndex = function(ex) {
  var fs = require("fs"),
    d3 = require("d3"),
    jsdom = require("jsdom"),
    showdown = require("showdown");

  var stub = fs
    .readFileSync("./scripts/buildExample/indexStub.html")
    .toString();
  var readme = fs
    .readFileSync(ex.paths.root + "/" + ex.paths.readme)
    .toString();
  var code = fs.readFileSync(ex.paths.root + "/" + ex.paths.code).toString();

  // pass the html stub to jsDom
  // via https://mango-is.com/blog/engineering/pre-render-d3-js-charts-at-server-side/
  // and https://bl.ocks.org/tomgp/c99a699587b5c5465228

  jsdom.env({
    html: stub,
    features: { QuerySelector: true }, //you need query selector for D3 to work
    done: function(err, window) {
      window.d3 = d3.select(window.document); //get d3 into the dom

      // page header
      window.document.title = ex.title;

      // Add the header - parse the README.md header
      var header = window.d3.select(".viz-example-header");
      header.select("h1").text(ex.title);
      header.select("div.description").text(ex.description);

      // Add the details
      //add sections
      var detailVars = [
        "languages",
        "libraries",
        "tags",
        "data",
        "results",
        "code"
      ];

      var detailInfo = header
        .select("ul.tags")
        .selectAll("li")
        .data(detailVars)
        .enter()
        .append("li");

      //via http://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

      detailInfo
        .append("span")
        .attr("class", "label")
        .html(d => capitalizeFirstLetter(d) + "&nbsp;")
        .style("font-size", "0.7em")
        .style("color", "#aaa")
        .attr("padding-right", "0.2em");

      detailInfo
        .append("span")
        .html(
          d =>
            (d == "data" || d == "results" || d == "code"
              ? "<a href='" + ex[d] + "'>" + ex[d] + "</a>"
              : ex[d])
        );

      // parse any extra readme content
      var detailRegex = /(\[comment\]: <> \(---END OF HEADER---\))[\s\S]*$/;
      var detailContent_markdown = readme.match(detailRegex)[0];
      var converter = new showdown.Converter();
      ex.details = converter.makeHtml(detailContent_markdown);
      var details = window.d3.select(".viz-example-details").html(ex.details);
      if (ex.details) {
        header
          .select("div.description")
          .append("a")
          .attr("class", "expandDetails")
          .text("Show full readme.md.");
      }

      // Show the example
      var webExampleContent =
        '<iframe sandbox="allow-popups allow-scripts allow-forms allow-same-origin allow-top-navigation" src=' +
        ex.paths.example +
        ' marginwidth="0" marginheight="0" style="height:100%; width:100%;"></iframe>';
      var staticExampleContent =
        '<div class="exampleImg"><img src="' +
        ex.paths.example +
        '" width=960></div>';
      var exampleExt = ex.paths.example.split(".").pop();
      var exampleContent_html = exampleExt == "html"
        ? webExampleContent
        : staticExampleContent;

      window.d3
        .select("body")
        .style("overflow-y", exampleExt == "html" ? "hidden" : null);

      window.d3.select(".viz-example-chart").html(exampleContent_html);

      /*
      // Show the code - parse the code file.
      window.d3.select("code").text(code);
      */
      //write the index file
      console.log("Created example for : " + ex.dir);
      fs.writeFileSync(
        ex.paths.root + "/" + ex.paths.index,
        window.document.documentElement.outerHTML
      );
    }
  });
};

//makeExampleIndex(sampleExample)
