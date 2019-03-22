export default function buildExampleIndex(location, data) {
  var wrap = d3.select(location);
  var list = wrap.append("ul").attr("class", "repo-list");
  var items = list
    .selectAll("li")
    .data(data)
    .enter()
    .append("li")
    .style("display", d => (d.examples.length == 0 ? "None" : null));
  items
    .append("a")
    .attr("href", d => d.html_url)
    .html("<i class='fab fa-github'></i>")
    .style("padding-right", ".5em");
  items
    .append("span")
    .html(
      d =>
        "<strong>" + d.name + "</strong> <small>" + d.description + "</small>"
    );

  var example_lists = items.append("ul").attr("class", "example-list");
  var examples = example_lists
    .selectAll("li")
    .data(d => d.examples)
    .enter()
    .append("li")
    .attr("class", "repo");

  examples
    .append("a")
    .attr("href", d => d.example_url)
    .append("img")
    .attr("src", d => d.img_url)
    .attr("height", 90)
    .attr("width", 120);

  examples
    .append("a")
    .attr("class", "src-link")
    .html('<i class="fas fa-cog"></i>')
    .attr("href", d => d.src_url);
}
