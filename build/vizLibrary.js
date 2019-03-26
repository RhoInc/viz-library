(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
    ? define(factory)
    : (global.vizLibrary = factory());
})(this, function() {
  "use strict";

  function makeList(type) {
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
        .attr("href", function(d) {
          return d.html_url;
        })
        .html("<i class='fab fa-github'></i>")
        .style("padding-right", ".5em");
      items.append("span").html(function(d) {
        return (
          "<strong>" + d.name + "</strong> <small>" + d.description + "</small>"
        );
      });

      var example_lists = items.append("ul").attr("class", "example-list");
      var exampleContainers = example_lists
        .selectAll("li")
        .data(function(d) {
          return d.examples;
        })
        .enter()
        .append("li")
        .attr("class", "repo");

      var images = exampleContainers
        .append("a")
        .attr("target", "_blank")
        .attr("href", function(d) {
          return d.example_url;
        })
        .append("img")
        .attr("src", function(d) {
          return d.img_url;
        })
        .attr("width", 1920 / 10)
        .attr("height", 1080 / 10);

      var urls = exampleContainers
        .append("a")
        .attr("class", "src-link offset")
        .html('<i class="fa fa-external-link"></i>')
        .attr("target", "_blank")
        .attr("title", "Open example in new tab.")
        .attr("href", function(d) {
          return d.example_url;
        });

      var code = exampleContainers
        .append("a")
        .attr("class", "src-link")
        .html('<i class="fa fa-cog"></i>')
        .attr("target", "_blank")
        .attr("title", "Open example code in new tab.")
        .attr("href", function(d) {
          return d.src_url;
        });

      var spanDivs = exampleContainers
        .append("div")
        .classed("example-description", true)
        .text(function(d) {
          return d.repo + (d.folder !== "test-page" ? ": " + d.folder : "");
        });
    }
  }

  function makeControl() {
    var page = this;
    var wrap = d3.select(".controls");

    wrap.append("small").text("Sort by ");
    var by_example = wrap
      .append("div")
      .text("Organization")
      .attr("class", "by-org selected")
      .on("click", function() {
        d3.select(".controls")
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
        d3.select(".controls")
          .selectAll("div")
          .classed("selected", false);
        d3.select(this).classed("selected", true);
        makeList.call(page, "repos");
      });
  }

  function buildExampleList(location, data) {
    var page = {};

    //prep data
    page.location = location;
    page.repo_data = data;
    var all_examples = d3.merge(
      data.map(function(m) {
        return m.examples;
      })
    );
    page.org_data = [
      {
        name: "Rho Inc",
        description: "Interactive graphics from Rho",
        html_url: "https://www.github.com/rhoinc",
        examples: all_examples
      }
    ];

    //initialize page
    makeControl.call(page);
    makeList.call(page, "orgs");
  }

  var index = {
    buildExampleList: buildExampleList
  };

  return index;
});
