function renderTest(d) {
  console.log("rendering test"+d.index+" - "+d.label)
  console.log(this)

  //draw title
  d3.select(this).append('h2').text(function(d) {
    return d.label;
  });

  //render chart
  var chartWrap = d3.select(this).append('div').attr('class', 'chart');

  //show notes (if any)
  var notes = d3.select(this)
    .append('div')
    .attr("class","notes")
    notes.append("div").html("<strong>Data: </strong> ")
    .append("a")
    .attr("href",function(d){return d.dataPath})
    .text(function(d){return d.dataPath})

    notes.append("div").html(function(d){return d.notes ? "<strong>Notes: </strong>"+d.notes : "" })

    d.tests = d.tests ? d.tests : ["No Tests Specified"]
    var tests =  notes.append("div").html("<strong>Tests: </strong> ")
    tests.append("ul")
    .selectAll("li")
    .data(d.tests)
    .enter()
    .append("li")
    .text(function(d){return d})



  //show settings
  var settingsWrap = d3
    .select(this)
    .append('div')
    .attr("class",'code test' + d.index)

  var settingsHead = settingsWrap.append("a")
  .style({"color":"blue","text-decoration":"underline"})
  .text("+ Settings")
  .on("click",function(){
    var wrap = this.parentNode
    var code = d3.select(wrap).select("pre")
    var status = code.classed("hidden")
    code.classed("hidden",!status)
    d3.select(this).text(status?"- Settings":"+ Settings")
  })

  var code = settingsWrap
    .append("pre")
    .attr("class","hidden")
    .append("code")
    .attr('class', "hljs")
    .html(JSON.stringify(d.settings, null, "  ").trim());

    hljs.highlightBlock(code.node());

    var thisChart = webCharts.createChart('div.test' + d.index + ' .chart', d.settings);
    console.log(thisChart)
    thisChart.init(d.raw);
}

testConfig.forEach(function(d,i){d.index = i})
var chartDivs = d3
  .select('body')
  .selectAll('div.testWrap')
  .data(testConfig)
  .enter()
  .append('div')
  .attr('class', function(d) {
    return 'testWrap test' + d.index;
  })



//get all test data sets (once each)
var dataPaths = d3
  .set(
    testConfig.map(function(d) {
      return d.dataPath;
    })
  )
  .values()
  .map(function(d){return {"path":d}});

console.log(dataPaths)
//load the data and render the chart
dataPaths.forEach(function(file) {
  d3.csv(file.path, function(error, data) {
    file.raw = data;

    chartDivs
    .filter(function(chart){
      if(chart.dataPath == file.path){
        chart.raw = file.raw
      }
      return chart.dataPath == file.path
    })
    .each(renderTest)
  });
});
