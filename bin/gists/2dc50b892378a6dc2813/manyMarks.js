var settings = {
  "max_width":"500",
  "x":{
    "label":"",
    "type":"time",
    "column":"DATE",
    "format": "%b'%y"
  },
  "y":{
    "label": function(){return this.config.y.column+" (F)"; },
    "type":"linear",
    "column":"Monthly Mean"
  },
  date_format: "%Y%m",
  "marks":[
    {
      "type":"circle",
      "per":["STATION_NAME", "DATE"],
      "tooltip":"[STATION_NAME]\n$x\n$y",
      summarizeY: "mean"
    },
    {
      "type":"line",
      "per":[],
      summarizeY: "mean",
      attributes: {stroke: "#555"}
    }
  ],
  color_by: "STATION_NAME",
  "gridlines":"xy",
  "legend": {
    "label": "Station"
  }
};

var controls = webCharts.createControls("body", {location: "top", 
  inputs:[
    {type: "dropdown", option: "y.column", label: "Y Values", values: ["Monthly Mean Max","Monthly Mean Min","Monthly Mean"], require: true},
    {type: "subsetter", value_col: "STATION_NAME", label: "Filter by Station", multiple: true}
  ]
});

d3.csv("593576.csv", function(error, data){
  webCharts.createChart("body", settings, controls).init(data);
});