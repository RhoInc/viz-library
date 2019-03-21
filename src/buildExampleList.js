export default function buildExampleIndex(location, data) {
  var wrap = d3.select(location);
  wrap.append("h3").text("Examples");
  var list = wrap.append("ul");
  var items = list
    .selectAll("li")
    .data(data)
    .enter()
    .append("li")
    .html(
      d =>
        "<strong>" +
        d.name +
        "</strong>: " +
        d.description +
        " (" +
        d.examples.length +
        " examples)"
    )
    .style("display", d => (d.examples.length == 0 ? "None" : null));
  var example_lists = items.append("ul").attr("class", "example-list");
  var examples = example_lists
    .selectAll("li")
    .data(d => d.examples)
    .enter()
    .append("li")
    .append("a")
    .text(d => d)
    .attr("href", d => d);
}
