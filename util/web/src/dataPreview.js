export default function dataPreview(dataFiles) {
  var myFiles = d3.select(".file-list");

  var tbody = myFiles.append("tbody");
  var rows = tbody.selectAll("tr").data(dataFiles).enter().append("tr");

  rows
    .append("td")
    .text(function(d) {
      return d.filename;
    })
    .attr("title", function(d) {
      return d.rel_path;
    })
    .style("cursor", "help");

  rows.append("td").append("small").text(function(d) {
    return " " + d.rows + " Rows x " + d.cols + " Cols";
  });

  rows
    .append("td")
    .html("&#128269;")
    .attr("title", "Preview the data")
    .style("cursor", "pointer")
    .on("click", function(d) {
      rows.classed("selected", false);
      rows
        .filter(function(e) {
          return e == d;
        })
        .classed("selected", true);
      var label = d3
        .select(".data-preview")
        .select("strong")
        .text("First 10 rows of " + d.rel_path);

      label.append("button").text("Clear Preview").on("click", function() {
        rows.classed("selected", false);
        d3
          .select(".data-preview")
          .select("strong")
          .html("Click &#128269; to preview a data set");
        d3
          .select(".data-preview")
          .select(".data-table")
          .selectAll("*")
          .remove();
      });

      d3.csv("./data" + d.rel_path.substring(1), function(error, data) {
        var sub = data.filter(function(d, i) {
          return i < 10;
        });
        d3
          .select(".data-preview")
          .select(".data-table")
          .selectAll("*")
          .remove();
        var preview = webCharts.createTable(".data-preview .data-table", {});
        preview.init(sub);
      });
    });

  rows
    .append("td")
    .append("a")
    .attr("href", function(d) {
      return d.rel_path;
    })
    .html("&#8595;")
    .attr("title", "Download the data")
    .style("cursor", "pointer");
}
