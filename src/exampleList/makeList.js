export default function makeList(type) {
  //type should be "orgs" or "repos"
  var page = this;
  var data = type == "orgs" ? page.org_data : page.repo_data;
  var wrap = d3.select(page.location);

  var overwrite = wrap.select("ul.repo-list")[0][0]
    ? !wrap.select("ul.repo-list").classed(type)
    : true;
  if (overwrite) {
    // clear list
    wrap.select("ul.repo-list").remove();

    //make new list
    console.log(data);
    var list = wrap.append("ul").attr("class", "repo-list " + type);
    var items = list
      .selectAll("li")
      .data(data)
      .enter()
      .append("li");

    items
      .append("a")
      .attr("target", "_blank")
      .attr("href", d => d.html_url)
      .html("<i class='fa fa-github'></i>")
      .style("padding-right", ".5em");
    items
      .append("span")
      .html(
        d =>
          "<strong>" +
          d.name +
          "</strong> <small>" +
          (d.description == null ? "" : d.description) +
          "</small>"
      );

    var example_lists = items.append("ul").attr("class", "example-list");
    var exampleContainers = example_lists
      .selectAll("li")
      .data(d => d.examples)
      .enter()
      .append("li")
      .attr("class", "repo");

    var images = exampleContainers
      .append("a")
      .attr("target", "_blank")
      .attr("href", d => d.example_url)
      .append("img")
      .attr("src", d => d.img_url)
      .attr("width", 1920 / 10)
      .attr("height", 1080 / 10);

    var urls = exampleContainers
      .append("a")
      .attr("class", "src-link offset")
      .html('<i class="fa fa-external-link"></i>')
      .attr("target", "_blank")
      .attr("title", "Open example in new tab.")
      .attr("href", d => d.example_url);

    var code = exampleContainers
      .append("a")
      .attr("class", "src-link")
      .html('<i class="fa fa-cog"></i>')
      .attr("target", "_blank")
      .attr("title", "Open example code in new tab.")
      .attr("href", d => d.src_url);

    var spanDivs = exampleContainers
      .append("div")
      .classed("example-description", true)
      .append("a")
      .attr("href", d => d.example_url)
      .text(d => d.repo + (d.folder !== "test-page" ? ": " + d.folder : ""));
  }
}
