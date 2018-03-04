/*
This function create an index.html file for a given example
Input: an Example Object created by parseExamples.js
Output: an index.html file saved in the example folder
*/

exports.makeExampleIndex = function(ex, examples) {
  var fs = require("fs"),
    d3 = require("d3");

  /****************************************
   *** Load placeholder files
   *****************************************/
  var stub = fs
    .readFileSync("./scripts/buildExample/indexStub.html")
    .toString();

  var exampleHeaderStub = fs
    .readFileSync("./scripts/buildExample/exampleHeaderStub.html")
    .toString();

  /****************************************
   *** Combine the header and the vizualization
   *****************************************/
  var exampleExt = ex.package.homepage.split(".").pop();
  if (["jpeg", "jpg", "png"].indexOf(exampleExt.slice(0)) > -1) {
    //If the visualization is an image, use the stub html as the base for the index page
    ex.index = stub;
  } else if (["html", "htm"].indexOf(exampleExt.slice(0)) > -1) {
    //If the visualization is a webpage, use it as the base for the index page
    ex.index = fs.readFileSync(ex.paths.root + ex.package.homepage).toString();
  }
  //console.log(ex.index)

  // add the headerstub immediately after the <body> tag
  var insertionPoint = ex.index.search("<body>") + 6;
  ex.index =
    ex.index.slice(0, insertionPoint) +
    exampleHeaderStub +
    ex.index.slice(insertionPoint);
  /****************************************
   *** Add example meta data to the header using JSDOM
   *****************************************/
  // pass the html stub to jsDom
  // via https://mango-is.com/blog/engineering/pre-render-d3-js-charts-at-server-side/
  // and https://bl.ocks.org/tomgp/c99a699587b5c5465228

  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  const dom = new JSDOM(ex.index, { runScripts: "dangerously" });
  dom.window.d3 = d3.select(dom.window.document);

  //Add meta data about the chart to the header
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  var cleanName = ex.package.label || ex.package.name;
  var header = dom.window.d3.select(".vl-ex-header");
  header.select("li.title").html(cleanName);

  //update the next/back arrows
  var chartIndex = examples.indexOf(ex)
  console.log(chartIndex)
  if(chartIndex < examples.length){
    header.select("li.next-arrow a")
    .property("href","../"+examples[chartIndex+1].dir)
  }else{
    header.select("li.next-arrow")
    .classed("disabled",true)
  }

  if(chartIndex>0){
    header.select("li.back-arrow a")
    .property("href","../"+examples[chartIndex-1].dir)
  }else{
    header.select("li.back-arrow")
    .classed("disabled",true)
  }


  //Add details about the chart
  var details = dom.window.d3.select("div#vl-ex-details");

  var lowerFiles = ex.files.map(m=>m.toLowerCase())
  var readmeIndex = lowerFiles.indexOf("readme.md")
  if(readmeIndex>=0){
    details
      .select("ul.vl-ex-tags")
      .append("li")
      .attr("class","vl-ex-md")
      .append("a")
      .property("href",ex.files[readmeIndex])
  }

  if (ex.package.dataDependecies.length > 0) {
    details
      .select("ul.vl-ex-tags")
      .append("li")
      .attr("class","vl-ex-data")
      .append("a")
      .property("href", ex.package.dataDependecies[0]);
      //add support for multiple data files
  }

  if (ex.package.repository) {
    details
      .select("ul.vl-ex-tags")
      .append("li")
      .attr("class","vl-ex-repo")
      .append("a")
      .property("href", ex.package.repository.replace("github:","https://www.github.com/"));
  }

  if (ex.package.main) {
    details
      .select("ul.vl-ex-tags")
      .append("li")
      .attr("class","vl-ex-code")
      .append("a")
      .property("href", ex.package.main);
  }
  //details.select("li.vl-ex-code a").property("href", ex.package.main);
  details
    .select("p.vl-ex-description")
    .html("<b>" + cleanName + "</b> - " + ex.package.description);

  if(ex.package.dependencies){
    var dependencies = Object.keys(ex.package.dependencies).map(function(m){
      return{
        library:m,
        version:ex.package.dependencies[m]
      }
    })

    details
      .select("ul.vl-ex-tags")
      .selectAll("li.dep")
      .data(dependencies)
      .enter()
      .append("li")
      .attr("class", "dep")
      .append("a")
      .text(d => d.library+" "+d.version)
      .property("href",d=>"https://www.npmjs.com/package/"+d.library)

  }

  if(ex.package.rDependencies){
    console.log(ex.package.rDependencies)
    var rDependencies = Object.keys(ex.package.rDependencies).map(function(m){
      return{
        library:m,
        version:ex.package.rDependencies[m]
      }
    })

    details
      .select("ul.vl-ex-tags")
      .selectAll("li.rdep")
      .data(rDependencies)
      .enter()
      .append("li")
      .attr("class", "rdep")
      .append("a")
      .text(d => d.library+" "+d.version)
      .property("href",d=>"https://cran.r-project.org/web/packages/"+d.library)
  }

  details
    .select("ul.vl-ex-tags")
    .selectAll("li.tag")
    .data(ex.package.keywords)
    .enter()
    .append("li")
    .attr("class", "tag")
    .text(d => d);

  console.log(dom.window.document.querySelector("body").outerHTML); // "Hello world"
  /*****************************************
   *** Output index.html
   *****************************************/
  console.log("Created example for : " + ex.dir);
  fs.writeFileSync(
    ex.paths.root + "/" + ex.paths.index,
    dom.window.document.documentElement.outerHTML
  );
};
