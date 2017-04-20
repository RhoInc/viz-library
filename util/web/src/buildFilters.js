/* -----------------------------------------------------
 Takes a meta data and an array of properties for which 
 standard filters (<select> elements) are created. Measures 
 can take the form [attr1, attr2] or 
 [{colName:"attr1",label:"Attribute #1"},{colName:"attr2",label:"Attribute #2"}]
 ----------------------------------------------------- */

export default function buildFilters(meta, measures, parentElement) {
  measures = measures.map(function(m) {
    console.log(m.length);
    return m.length ? { colName: m, label: m } : m;
  });

  var wraps = d3
    .select(parentElement)
    .selectAll("div.controlWrap")
    .data(measures)
    .enter()
    .append("div")
    .attr("class", "controlWrap");

  //create the select for the filter
  wraps.append("div").attr("class", "controlLabel").text(d => d.label);

  var selects = wraps.append("select");
  selects
    .selectAll("option")
    .data(function(d) {
      // gets a list of values for the measure
      var measureName = d.colName;
      var values = d3.set(meta.map(metaRow => metaRow[measureName])).values();
      var allvalues = d3.merge([["All"], values]);
      return allvalues;
    })
    .enter()
    .append("option")
    .text(d => d);

  //add event listener for the filters
  selects.on("change", function(d) {
    var elements = d3.selectAll("div.media-tile");
    elements.classed("hidden", false);
    selects.each(function(e) {
      var value = this.value;
      var measure = e.colName;
      console.log(value + "=" + measure);
      if (value != "All")
        elements.filter(d => d[measure] != value).classed("hidden", true);
    });
  });
}
