var settings = {
      "max_width":"500",
      "x":{
        "label":"Protein (g)",
        "type":"linear",
        "column":"Protein (g)"
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
          "tooltip":"[Food]\n[Measure]\n$x grams protein\n$y grams carbs"
        }
      ],
      "aspect":"1",
      "gridlines":"xy"
    };
    
var calChart = webCharts.createChart('body', settings);

d3.csv('calories.csv', function(error, data){
      calChart.init(data);
});