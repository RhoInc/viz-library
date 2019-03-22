(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.vizLibrary = factory());
}(this, (function () { 'use strict';

function makeList(type) {
  //type should be "orgs" or "repos"
  var page = this;
  var data = type == "orgs" ? page.org_data : page.repo_data;
  var wrap = d3.select(page.location);

  console.log(wrap.select("ul.repo-list"));
  var overwrite = wrap.select("ul.repo-list")[0][0] ? !wrap.select("ul.repo-list").classed(type) : true;
  if (overwrite) {
    // clear list
    wrap.select("ul.repo-list").remove();

    //make new list
    var list = wrap.append("ul").attr("class", "repo-list " + type);
    var items = list.selectAll("li").data(data).enter().append("li");

    items.append("a").attr("href", function (d) {
      return d.html_url;
    }).html("<i class='fab fa-github'></i>").style("padding-right", ".5em");
    items.append("span").html(function (d) {
      return "<strong>" + d.name + "</strong> <small>" + d.description + "</small>";
    });

    var example_lists = items.append("ul").attr("class", "example-list");
    var examples = example_lists.selectAll("li").data(function (d) {
      return d.examples;
    }).enter().append("li").attr("class", "repo");

    examples.append("a").attr("href", function (d) {
      return d.example_url;
    }).append("img").attr("src", function (d) {
      return d.img_url;
    }).attr("height", 90).attr("width", 120);

    examples.append("a").attr("class", "src-link offset").html('<i class="fas fa-external-link-alt"></i>').attr("href", function (d) {
      return d.example_url;
    });

    examples.append("a").attr("class", "src-link").html('<i class="fas fa-cog"></i>').attr("href", function (d) {
      return d.src_url;
    });
  }
}

function makeControl() {
  var page = this;
  var wrap = d3.select(".controls");

  wrap.append("small").text("Sort by ");
  var by_example = wrap.append("div").text("Organization").attr("class", "by-org selected").on("click", function () {
    d3.select(".controls").selectAll("div").classed("selected", false);
    d3.select(this).classed("selected", true);
    makeList.call(page, "orgs");
  });
  wrap.append("span").text("|");
  var by_repo = wrap.append("div").text("Repository").attr("class", "by-repo").on("click", function () {
    d3.select(".controls").selectAll("div").classed("selected", false);
    d3.select(this).classed("selected", true);
    makeList.call(page, "repos");
  });
}

function buildExampleList(location, data) {
  var page = {};

  //prep data
  page.location = location;
  page.repo_data = data;
  var all_examples = d3.merge(data.map(function (m) {
    return m.examples;
  }));
  page.org_data = [{
    name: "Rho Inc",
    description: "Interactive graphics from Rho",
    html_url: "https://www.github.com/rhoinc",
    examples: all_examples
  }];

  //initialize page
  makeControl.call(page);
  makeList.call(page, "orgs");
}

var index = {
  buildExampleList: buildExampleList
};

return index;

})));
