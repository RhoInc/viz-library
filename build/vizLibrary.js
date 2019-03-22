(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.vizLibrary = factory());
}(this, (function () { 'use strict';

function buildExampleIndex(location, data) {
  var wrap = d3.select(location);
  var list = wrap.append("ul").attr("class", "repo-list");
  var items = list.selectAll("li").data(data).enter().append("li").style("display", function (d) {
    return d.examples.length == 0 ? "None" : null;
  });
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

  examples.append("a").attr("class", "src-link").html('<i class="fas fa-cog"></i>').attr("href", function (d) {
    return d.src_url;
  });
}

var index = {
  buildExampleList: buildExampleIndex
};

return index;

})));
