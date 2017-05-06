var settings = {
  x: {column: "Group", type: "ordinal", label: "Group" },
  y: {column: "Boiling point", type: "linear", label: function(){return this.config.y.column; } },
  marks: [
    {type: "bar", per: ["Group"], split: "Period", arrange: "grouped"},
    {type: "circle", per: ["Group"], summarizeY: "mean", tooltip: "[Name]", attributes: {"fill-opacity": 1, fill: "black", "stroke": "black"}, size: 4}
  ],
  color_by: "Period",
  max_width: 800,
  gridlines: 'xy'
};

var controls = webCharts.createControls('div.chart', 
	{	
		location: 'top', 
		inputs:[
			{type: "dropdown", option: "y.column", label: "Y Values", values: ["Mass", "Boiling point", "Melting point", "Density", "Radius"], require: true},
      {type: "subsetter", value_col: "Period", label: "Filter by Period"},
      {type: "subsetter", value_col: "Group", label: "Filter by Group"}
		]
	}
);

var coolChart = webCharts.createChart('div.chart', settings, controls);

d3.csv('elements2.csv', function(e,d){
  coolChart.init(d);
  console.log(coolChart)
  var counter=5;
  interval = setInterval(function() {
    counter--;
    if(counter < 0) {
      coolChart.destroy();
      coolChart=null;
      controls=null;
      d3.select('body').select(".message").html("💥The chart and controls have been destroyed💥. <br><button onClick='window.location.reload()'>Reload</button>")
      clearInterval(interval)
    } else {
      d3.select('body').select(".message").text("This chart will self-destruct in in " + counter.toString() + " seconds.")
    }
  }, 1000);
})



