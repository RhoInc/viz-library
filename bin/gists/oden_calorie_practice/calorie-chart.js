var settings = {
      "max_width":"500",
      "x":{
        "label":"Protein (g)",
        "type":"linear",
        "column":"Protein (g)",
      },
      "y":{
        "label":"Carbs (g)",
        "type":"linear",
        "column":"Carbo(g)"
      },
      "marks":[
        {
          "type":"circle",
          "per":["Food"],
        }
      ],
      "aspect":"1",
      "gridlines":"xy"
    };
    
var calChart = webCharts.createChart('body', settings);


// The following function loads the CSV data and initializes the chart
d3.csv('calories.csv', function(error, data){
	// optional error parameter included to indicate
	//   if a problem loding the file has occurred
	if(error){
		console.log(error);
	}
	else{
		calChart.init(data);
	}
});