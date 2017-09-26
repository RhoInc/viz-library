var settings = {
  "pagination":true,
  "nRowsPerPage":10,
  "nPageLinksDisplayed":5,
  "searchable":true
};

var controls = webCharts.createControls(".chart",	{
		location: 'top',
		inputs:[
      {type: "subsetter", value_col: "Period", label: "Filter by Period"},
      {type: "subsetter", value_col: "Group", label: "Filter by Group"}
		]
	})

d3.csv("../../data/elements.csv", function(error, data) {
  var table = webCharts.createTable(".chart", settings,controls);
  table.init(data);

  d3.selectAll(".controls input").on("change",function(){
    settings.pagination = d3.select("input.pagination").property("checked")
    settings.nRowsPerPage = +d3.select("input.items").node().value
    settings.nPageLinksDisplayed = +d3.select("input.pages").node().value
    settings.applyCSS = d3.select("input.applyCSS").property("checked")
    settings.searchable = d3.select("input.searchable").property("checked")
    settings.sort = d3.select("input.sort").property("checked")

    console.log(settings)
    d3.select(".chart").selectAll("*").remove()
    var controls = webCharts.createControls(".chart",	{
    		location: 'top',
    		inputs:[
          {type: "subsetter", value_col: "Period", label: "Filter by Period"},
          {type: "subsetter", value_col: "Group", label: "Filter by Group"}
    		]
    	})
    var table = webCharts.createTable(".chart", settings, controls);
    table.init(data);
  })
})
