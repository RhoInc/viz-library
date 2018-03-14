/* -----------------------------------------------------
 Takes a meta data and an array of properties for which
 standard filters (<select> elements) are created. Measures
 can take the form [attr1, attr2] or
 [{colName:"attr1",label:"Attribute #1"},{colName:"attr2",label:"Attribute #2"}]
 ----------------------------------------------------- */

export default function buildFilters(meta, measures, parentElement) {
  meta.forEach(metum => {
      metum.dependencyKeys = Object.keys(metum.package)
          .filter(key => /dependencies/i.test(key));
      metum.languages = metum.dependencyKeys
          .map(key => key.replace(/dependencies/i, '').replace(/^$/, 'javascript'));
      metum.libraries = metum.dependencyKeys
          .map(key => metum.package[key])
          .map(key => Object.keys(key));
      console.log(metum.libraries);
      //console.log(dependencies);
      //metum.libraries = Object.keys(metum.package.dependencies)
  });

  measures = measures.map(function(m) {
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
  wraps
    .append("div")
    .attr("class", "controlLabel")
    .text(d => d.label.charAt(0).toUpperCase() + d.label.slice(1));

  var selects = wraps.append("select");
  selects
    .selectAll("option")
    .data(function(d) {
      // gets a list of values for the measure
      var measureName = d.colName;
      var valueArrays = meta.map(metaRow => metaRow[measureName]);
        console.log(valueArrays);
      var allValues = [].concat.apply([], valueArrays);
      var uniqueValues = d3.set(allValues).values();
      return d3.merge([["All"], uniqueValues]);
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
        elements
          .filter(function(d) {
            return d[measure].indexOf(value) == -1;
          })
          .classed("hidden", true);
    });
  });
}
