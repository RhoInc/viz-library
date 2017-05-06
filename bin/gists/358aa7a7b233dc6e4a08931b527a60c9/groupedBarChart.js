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
      "type":"bar",
      "per":["Country"],
      "attributes": {"fill-opacity": 0.8}
    }
  ],
  "gridlines":"x",
  "color_by":"type",
  colors: ["#8c7853", "#c0c0c0", "#e5c100"],
  legend: {
    label: 'Medal Type',
    order: ['Bronze', 'Silver', 'Gold']
  }
};
    
var stackedMedalChart = webCharts.createChart('body', settings);

d3.csv('OlympicMedals2012_long.csv', function(error, data){
  webCharts.multiply(stackedMedalChart, data, "type"); 
});