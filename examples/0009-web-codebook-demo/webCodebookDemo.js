function makeCodebook(filename){
	d3.select('.chart').selectAll("*").remove()
	var settings = {}
	var codebook = webcodebook.createChart('.chart', settings);
	d3.csv('../0000-sample-data/safetyData/'+filename+'.csv', function(error, data){
  		codebook.init(data);
	});	
}

//make a first codebook
makeCodebook("ADAE")

//choose a different data set
var datasets = ["ADAE","ADBDS","DM","labs","LB","VS"]
d3.select(".controls")
//.style("background","#999")
.style("padding",".5em")
.style("border-bottom","2px solid black")
d3.select(".controls").append("span").text("Pick a file: ")
var select = d3.select(".controls").append("select")

select.selectAll("option")
.data(datasets)
.enter()
.append("option")
.text(function(d){return d})

select.on("change",function(d){
	makeCodebook(this.value)
})