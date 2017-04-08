var settings = {}
var codebook = webcodebook.createChart('.chart', settings);
d3.csv('../../data/safetyData/ADAE.csv', function(error, data){
	codebook.init(data);
});
