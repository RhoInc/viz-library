/* -----------------------------------------------------
 Takes a meta data and an array of properties for which 
 standard filters (<select> elements) are created
 ----------------------------------------------------- */

function createFilters(meta, measures, parentElement){

measures.forEach(function(measureName){
	//get list of values for the measure
	var values = d3.set(meta.map(d=>d[measureName])).values()

	//create the select for the filter
	var wrap = d3.select(parentElement).append("div").attr("class","controlWrap")
	
	//add event listener for the filter	
})

}