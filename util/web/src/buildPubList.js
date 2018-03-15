export default function buildPubList(meta, parentElement) {
  var parentDiv = d3.select(parentElement);
  var list = parentDiv.append("ul").attr("class", "pubs");
  var items = list
    .selectAll("li")
    .data(meta)
    .enter()
    .append("li")
    .attr("class", "pub");

  //thumb
  items.append("img").attr("src", d => "./pubs/img/" + d.thumbnail);
  //    .text(d => (d.description ? d.description : "<no description available>"));

  var wraps = items.append("div").attr("class", "pub-wrap");

  //title
  wraps
    .append("p")
    .attr("class", "title")
    .text(d => d.title);

  //description
  wraps
    .append("p")
    .attr("class", "description")
    .text(d => d.text);

  //author
  wraps
    .append("p")
    .attr("class", "author")
    .text(d => d.keyValues[0].value);

  //tags
  function cap1(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  var taglist = wraps.append("ul").attr("class", "tags");
  taglist
    .selectAll("li")
    .data(d => d.links)
    .enter()
    .append("li")
    .append("a")
    .attr(
      "href",
      d => (d.href.indexOf("http") > -1 ? d.href : "./pubs/" + d.href)
    )
    .attr("class", d => d.type)
    .html(function(d) {
      return d.type == "github" ? d.type : cap1(d.type);
    });
}
