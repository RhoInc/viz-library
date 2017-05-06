var settings = {
  "max_width":"500",
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
    
var stackedMedalChart = webCharts.createChart('body', settings);

d3.csv('OlympicMedals2012_long.csv', function(error, data){
  stackedMedalChart.init(data);
});