function renderTest(d, i) {
  console.log("rendering")
  console.log(this)
  //draw title
  d3.select(this).append('h2').text(function(d) {
    return d.label;
  });

  //render chart
  var chartWrap = d3.select(this).append('div').attr('class', 'chart');

  //show settings
  var settingsWrap = d3
    .select(this)
    .append('div')
    .attr("class",'code test' + i)
  settingsWrap.append("h4").text("Settings")

  var code = settingsWrap
    .append("pre")
    .append("code")
    .attr('class', "hljs")
    .html(JSON.stringify(d.settings, null, "  ").trim());

    hljs.highlightBlock(code.node());

    var thisChart = webCharts.createChart('div.test' + i + ' .chart', d.settings);
    thisChart.init(d.raw);
}

var chartDivs = d3
  .select('body')
  .selectAll('div.testWrap')
  .data(testConfig)
  .enter()
  .append('div')
  .attr('class', function(d, i) {
    return 'testWrap test' + i;
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
