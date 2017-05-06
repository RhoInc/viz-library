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

var controls = webCharts.createControls('body', 
	{	
		location: 'top', 
		inputs:[
			{type: "dropdown", option: "y.column", label: "Y Values", values: ["Mass", "Boiling point", "Melting point", "Density", "Radius"], require: true},
      {type: "subsetter", value_col: "Period", label: "Filter by Period"},
      {type: "subsetter", value_col: "Group", label: "Filter by Group"}
		]
	}
);

var coolChart = webCharts.createChart('body', settings, controls);

d3.csv('elements2.csv', function(e,d){
  coolChart.init(d);
});