var settings = {
      "max_width":"5000",
      "x":{
        "label":"Date",
        "type":"ordinal",
        "column":"Date",
      },
      "y":{
        "label": "USD",
        "type":"linear",
        "column": "Open"
      },
      "marks":[
        {
          "type":"circle",
          "per":["Date"],
        },
		{
			"type":"line",
			"per":[],
		}
      ],
      "aspect":"1",
      "gridlines":"xy"
    };
    

var controls = webCharts.createControls("body", {location: "top", 
  inputs:[
    {type: "dropdown", option: "y.column", label: "Y-Values", values: ["High","Low","Close","Open"], require: true},
  ]
});

d3.csv('dow_jones_industrial_average.csv', function(error, data){
	if (error) {
		console.log(error); }
	else {
		webCharts.createChart("body", settings, controls).init(data);}
});