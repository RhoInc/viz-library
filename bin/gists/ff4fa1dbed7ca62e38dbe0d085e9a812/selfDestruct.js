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

var coolTable = webCharts.createTable('div.chart');

d3.csv('elements2.csv', function(e,d){
  coolTable.init(d);
  var counter=5;
  interval = setInterval(function() {
    counter--;
    if(counter < 0) {
      coolTable.destroy();
      coolChart=null;
      d3.select('body').select(".message").html("💥The table has been destroyed💥. <br><button onClick='window.location.reload()'>Reload</button>")
      clearInterval(interval)
    } else {
      d3.select('body').select(".message").text("This table will self-destruct in in " + counter.toString() + " seconds.")
    }
  }, 1000);
})



