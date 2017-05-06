var settings = {
  "max_width":"700",
  "x":{
    "label":"Medal Count",
    "type":"linear",
    "column":"count",
    domain: [0]
  },
  "y":{
    "type":"ordinal",
    "column":"Country",
    "sort":"total-descending"
  },
  "marks":[
    {
      "arrange":"stacked",
      "split":"type",
      "type":"bar",
      "per":["Country"],
      "attributes": {"fill-opacity": 0.8},
      "summarizeX": 'mean'
    }
  ],
  "gridlines":"x",
  "color_by":"type",
  legend: {
    label: 'Medal Type',
    order: ['Bronze', 'Silver', 'Gold']
  }
};

function chartInit(chart){
  d3.select("span.init").remove()

  d3.select("body")
  .insert("span",":first-child")
  .attr("class","destroy")
  .html("<a>Click here</a> to destroy this chart.")
  
  d3.select("span.destroy a")
  .style("color","blue")
  .style("text-decoration","underline")
  .on("click",function(){ 
    console.log("destroying")
    stackedMedalChart.destroy() //removes event listeners and unmounts DOM elements
    stackedMedalChart = null; //completely removes original objects. Could add additional lines to remove data and config objects. 
  })
} 

function chartDestroy(chart){
  d3.select("span.destroy").remove()
  d3.select("body")
  .insert("span",":first-child")
  .attr("class","init")
  .html("The chart has been destroyed. <a>Click here</a> to re-initialize this chart.")
  
  d3.select("span.init a")
  .style("color","blue")
  .style("text-decoration","underline")
  .on("click",function(){ 
    stackedMedalChart = webCharts.createChart('body', settings); //intentional global for the demo
    stackedMedalChart.on("init",chartInit)
    stackedMedalChart.on("destroy",chartDestroy)
    d3.csv('OlympicMedals2012_long.csv', function(error, data){
      stackedMedalChart.init(data);
    });  
  })
}

var stackedMedalChart = webCharts.createChart('body', settings);
stackedMedalChart.on("init",chartInit)
stackedMedalChart.on("destroy",chartDestroy)

d3.csv('OlympicMedals2012_long.csv', function(error, data){
  stackedMedalChart.init(data);
});

