

var single_width = 420;
var single_height = 300;
var margins = {top: 8, right: 8, bottom: 20, left: 35};

var meta1 = [
	{col: "STUDYID", label: ""}, 
	{col: "RAND", label: "Randomized"}, 
	{col: "SCREEN", label: "Screened"}, 
	{col: "CAT", label: ""}, 
	{col: "TARGET", label: "Target"}
]
var site_order = ["02","08","09","10","55","60","68","70","80","81","82","83","90", "95"];
var visit_order = ["D0","W2","W4","W8","W12","W16","W20","W24","W28","W32","W36","W40","W44","W48"];

/////////////////////
// Top Right Panel //
/////////////////////

var dataElementTL = ".gg-dash-item.top.left";
var dataPathTL= "sample_SCRandRAND.csv"
var settingsTL = {
	"resizable":false,
	"width":single_width, 
	"height":single_height,
	"margin":margins, 
	"y":{
		"column":"SITEID",
		"type": "ordinal", 
		"label":" ",
		"behavior": "firstfilter",
	}, 
	"x":{
		"column":"VALUE",
		"label":" ",
		"type": "linear",
	},
	"marks":[
		{
			"type":"circle",
      			"per":["SITEID","TYPE"],
      			"values": {
            			"TYPE": ["Target"]
            		},
            		"attributes":{"fill":"black","stroke":"black"}
        	},
		{
			"type":"bar",
			"split":"TYPE",
			"arrange":"nested",
      			"per":["SITEID","TYPE"],
      			"values": {
            			"TYPE": ["Randomized","Screened"]
            		}
        	}
	],
	"color_by":"TYPE",
	"colors":["#2b8cbe","#a6bddb","black"],
	"legend":{
		"label":""
	}
}

var instanceTL = webCharts.createChart(dataElementTL+" .gg-dash-item-content", settingsTL)
instanceTL.on("layout",function(){
	console.log(this)
})
instanceTL.on("resize",function(){
	//modify legend to include totals
	var total_rand = d3.sum(this.filtered_data.filter(function(d){return d.TYPE=="Randomized"}),function(d){return d.VALUE});
	var total_scr = d3.sum(this.filtered_data.filter(function(d){return d.TYPE=="Screened"}),function(d){return d.VALUE});

	this.legend.selectAll(".legend-label").filter(function(f){return f.label === "Randomized"})
		.text("Randomized ("+total_rand+")")
	this.legend.selectAll(".legend-label").filter(function(f){return f.label === "Screened"})
		.text("Screened ("+total_scr+")");

	//add tooltips to y axis labels
	var chart=this
	var ticks = this.svg.select(".y.axis").selectAll(".tick").append("title")
	.text(function(d){
		var match = chart.filtered_data.filter(function(f){return f["LABEL"] === d})[0];
		return match["MOUSEOVER"];
	});
});

d3.csv(dataPathTL, function(e,d){
	instanceTL.init(d);	
})


//////////////////////
// Top Middle Panel //
//////////////////////

var dataElementTM = ".gg-dash-item.top.middle";
var dataPathTM = "sample_VIS.csv"
var settingsTM = {
	"resizable":false,
	"width":single_width, 
	"height":single_height,
	"margin":margins, 
	"y":{
		"type": "linear", 
		"behavior": "firstfilter"
	}, 
	"x":{
		"column":"AVISITAS",
		"type": "ordinal",
		"label":"",
		"order":visit_order
	},
	"marks":[
		{
		"arrange":"stacked",
      		"split":"CAT",
      		"type":"bar",
      		"per":["AVISITAS"],
      		"summarizeY":"percent",
      		"tooltip":"$y"
		}
	],
	"color_by":"CAT",
	"colors":["#e34a33",'#fc8d59','rgb(102,194,165)',"#fecc5c",'rgb(43,131,186)'], 
	"legend":{
		"label":"",
		"order": ["Missed", "Out of Window", "In Window", "Overdue", "Expected"]
	}
}

var controlsTM = webCharts.createControls(dataElementTM+" .gg-dash-item-title", 
	{
		location: "top", 
		inputs: [
			{type: "subsetter", value_col: "SITENAME", label: "Site"}, 
			{label: "", type:"radio", option: "marks[0].summarizeY", values: ["percent", "count"], relabels: ["%", "N"]}
		]
	}
);

var instanceTM = webCharts.createChart(dataElementTM+" .gg-dash-item-content", settingsTM, controlsTM)

d3.csv(dataPathTM, function(e,d){
	instanceTM.init(d);	
})


/////////////////////
// Top Right Panel //
/////////////////////

var dataElementTR = ".gg-dash-item.top.right";
var dataPathTR = "sample_QUERY.csv"
var settingsTR = {
	"resizable":false,
	"width":single_width, 
	"height":single_height,
	"margin":margins, 
	"y":{
		"type": "linear", 
		"behavior": "firstfilter"
	}, 
	"x":{
		"column":"SITEID",
		"type": "ordinal",
		"label":"",
		"order":site_order
	},
	"marks":[
		{
		"arrange":"stacked",
      		"split":"CAT",
      		"type":"bar",
      		"per":["SITEID"],
      		"summarizeY":"percent",
      		"tooltip":"$y"
		}
	],
	"color_by":"CAT",
	"colors":['rgb(102,194,165)', "#fecc5c", "#e34a33"], 
	"legend":{
		"label":"",
		"order": ["Resolved", "Outstanding <= 90 days", "Outstanding > 90 days"]
	}
}

var controlsTR = webCharts.createControls(dataElementTR+" .gg-dash-item-title", 
	{
		location: "top", 
		inputs: [
			{label: "", type:"radio", option: "marks[0].summarizeY", values: ["percent", "count"], relabels: ["%", "N"]}
		]
	}
);

var instanceTR = webCharts.createChart(dataElementTR+" .gg-dash-item-content", settingsTR, controlsTR)

d3.csv(dataPathTR, function(e,d){
	instanceTR.init(d);	
})

///////////////////////
// Bottom Left Panel //
///////////////////////

var dataElementBL = ".gg-dash-item.bottom.left";
var dataPathBL = "sample_ENROLL.csv"
var settingsBL = {
	"resizable":false,
	"width":single_width, 
	"height":single_height,
	"margin":margins, 
	"y":{
		"column":"VALUE",
		"type": "linear", 
		"behavior": "firstfilter",
		"label":""
	}, 
	"x":{
		"column":"DATE",
		"type": "time",
		"label":"",
		"format":"%b-%y"
	},
	"marks":[
		{
		"arrange":"stacked",
      		"type":"line",
      		"per":["TYPE"],
      		"summarizeY":"sum",
      		"tooltip":"$y"
		}
	],
	"date_format":"%d-%b-%y",
	"color_by":"TYPE",
	"colors":["#2b8cbe","#a6bddb" ], 
	"legend":{
		"label":"",
	}
}

var controlsBL = webCharts.createControls(dataElementBL+" .gg-dash-item-title", 
	{
		location: "top", 
		inputs: [
			{type: "subsetter", value_col: "SITENAME", label: "Site"} 
		]
	}
);

var instanceBL = webCharts.createChart(dataElementBL+" .gg-dash-item-content", settingsBL, controlsBL)
d3.csv(dataPathBL, function(e,d){
	instanceBL.init(d);	
})


/////////////////////////
// Bottom Middle Panel //
/////////////////////////
var dataElementBM = ".gg-dash-item.bottom.middle";
var dataPathBM = "sample_DEVS.csv"
var settingsBM = {
	"resizable":false,
	"width":single_width, 
	"height":single_height,
	"margin":margins, 
	"y":{
		"type": "linear", 
		"behavior": "firstfilter"
	}, 
	"x":{
		"column":"SITEID",
		"type": "ordinal",
		"label":"",
		"order":site_order,
   		"domain":site_order
	},
	"marks":[
		{
			"arrange":"stacked",
      		"split":"CAT",
      		"type":"bar",
      		"per":["SITEID"],
      		"summarizeY":"count",
      		"tooltip":"$y"
		}
	],
	"color_by":"CAT",
	"colors":['rgb(254,229,217)','rgb(252,174,145)','rgb(251,106,74)','rgb(222,45,38)','rgb(165,15,21)'], 
	"legend":{
		"label":"",
		"order": ["1-3 mon.", "4-6 mon.", "7-9 mon.", "10-12 mon.", "> 1 yr."].reverse()
	}
}


var instanceBM = webCharts.createChart(dataElementBM+" .gg-dash-item-content", settingsBM)
d3.csv(dataPathBM, function(e,d){
	instanceBM.init(d);	
})

////////////////////////
// Bottom Right Panel //
////////////////////////
var dataElementBR = ".gg-dash-item.bottom.right";
var dataPathBR = "sample_FORMS.csv"
var settingsBR = {
	"resizable":false,
	"width":single_width, 
	"height":single_height,
	"margin":margins, 
	"y":{
		"type": "linear", 
		"behavior": "firstfilter"
	}, 
	"x":{
		"column":"SITEID",
		"type": "ordinal",
		"label":"",
		"order":site_order,
   		"domain":site_order
	},
	"marks":[
		{
		"arrange":"stacked",
      		"split":"CAT",
      		"type":"bar",
      		"per":["SITEID"],
      		"summarizeY":"count",
      		"tooltip":"$y"
		}
	],
	"color_by":"CAT",
	"colors":['rgb(102,194,165)', "#fecc5c", "#e34a33"], 
	"legend":{
		"label":"",
		"order": ["Received", "Outstanding <= 90 days", "Outstanding > 90 days"]
	}
}

var controlsBR = webCharts.createControls(dataElementBR+" .gg-dash-item-title", 
	{
		location: "top", 
		inputs: [
			{label: "", type:"radio", option: "marks[0].summarizeY", values: ["percent", "count"], relabels: ["%", "N"]}
		]
	}
);

var instanceBR = webCharts.createChart(dataElementBR+" .gg-dash-item-content", settingsBR, controlsBR)
d3.csv(dataPathBR, function(e,d){
	instanceBR.init(d);	
})



