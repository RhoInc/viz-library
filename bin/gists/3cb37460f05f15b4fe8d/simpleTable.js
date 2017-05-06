var myTable = webCharts.createTable('body');

d3.csv('elements.csv', function(e,d){
  myTable.init(d);
});