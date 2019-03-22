import makeList from "./makeList.js";

export default function makeControl() {
  var page = this;
  var wrap = d3.select(".controls");

  wrap.append("small").text("Sort by ");
  var by_example = wrap
    .append("div")
    .text("Organization")
    .attr("class", "by-org selected")
    .on("click", function() {
      d3
        .select(".controls")
        .selectAll("div")
        .classed("selected", false);
      d3.select(this).classed("selected", true);
      makeList.call(page, "orgs");
    });
  wrap.append("span").text("|");
  var by_repo = wrap
    .append("div")
    .text("Repository")
    .attr("class", "by-repo")
    .on("click", function() {
      d3
        .select(".controls")
        .selectAll("div")
        .classed("selected", false);
      d3.select(this).classed("selected", true);
      makeList.call(page, "repos");
    });
}
