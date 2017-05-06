var settingsDJ = {
  x: {column: "Melt", type: "linear", label: "Melting Point (K)"},
  y: {column: "Boil", type: "linear", label: "Boiling Point (K)"},
  marks: [
    {type: "line", per: [], summarizeY: "mean"}
  ],
  max_width: 500,
  gridlines: 'y'
};

var lineChart = webCharts.createChart('body', settingsDJ);

d3.csv('elements.csv', function(e,d){
  lineChart.init(d);
});