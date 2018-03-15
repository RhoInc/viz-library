var paths = [
   {path:'../../data/safetyData-queries/ADAE.csv', type:"AEs"},
   {path:'../../data/safetyData-queries/ADBDS.csv', type:"Labs"}
]
var settings = {
  custom_settings:[
    {
      "renderer_name":"aeexplorer",
      "defaults":{
        "placeholderFlag":{'value_col':"AEBODSYS", 'values':[" ",""]}
      }
    },
    {
      "renderer_name":"safety-results-over-time",
      "groups":[
        {value_col: 'NONE', label: 'None'},
        {value_col: 'ARM' , label: 'Arm'}
      ]
    },
    {
      "renderer_name":"safety-shift-plot",
      "resizable":true,
      "max_width":600
    }
  ]
}
var ses = safetyExplorerSuite.createExplorer('body', settings);
ses.init(paths, loadcsv=true)
