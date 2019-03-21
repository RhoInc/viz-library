(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.vizLibrary = factory());
}(this, (function () { 'use strict';

function buildExampleIndex(location, data) {
  var wrap = d3.select(location);
  wrap.append("h3").text("Examples");
  var list = wrap.append("ul");
  var items = list.selectAll("li").data(data).enter().append("li").html(function (d) {
    return "<strong>" + d.name + "</strong>: " + d.description + " (" + d.examples.length + " examples)";
  }).style("display", function (d) {
    return d.examples.length == 0 ? "None" : null;
  });
  var example_lists = items.append("ul").attr("class", "example-list");
  var examples = example_lists.selectAll("li").data(function (d) {
    return d.examples;
  }).enter().append("li").append("a").text(function (d) {
    return d;
  }).attr("href", function (d) {
    return d;
  });
}

var index = {
  buildExampleList: buildExampleIndex
};

return index;

})));
