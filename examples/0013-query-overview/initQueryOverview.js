var settings = {};
var chart = queryOverview(".chart", settings);
d3.csv("../../data/queries/queries.csv", function(error, data) {
	chart.init(data);
});
