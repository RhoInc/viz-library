"use strict";

var webchartsHexbin = (function (webcharts) {
  'use strict';

  var settings = {
    //Addition settings for this template
    "x_var": null,
    "y_var": null,
    "data_tables": false,

    //Standard webcharts settings
    "resizable": false,
    "width": "500",
    "aspect": "1",

    "x": {
      "type": "log",
      "column": null, //set by user - required
      "format": "0.1s"
    },
    "y": {
      "type": "log",
      "column": null, //set by user - required
      "format": "0.1s"
    },
    "marks": [{
      "type": "circle",
      "per": ["ID"],
      "attributes": {
        'display': "none",
        "fill-opacity": 0,
        "stroke-opacity": 0
      },
      "tooltip": "ID=[ID], x= $x, y=$y"
    }],
    "gridlines": "xy"
  };

  // Replicate settings in multiple places in the settings object
  function syncSettings(settings) {
    settings.y.column = settings.y_var;
    settings.x.column = settings.x_var;
    return settings;
  }

  function onInit() {
    var chart = this;
    //add an id column
    this.raw_data.forEach(function (d, i) {
      d.ID = i;
    });

    //set up details table
    var detailDiv = d3.select(chart.div).append("div").classed("detailTable", true).classed("section", true).text("Click a hex to see details.");

    this.wrap.classed("section", true);

    d3.selectAll(".section").style("display", "inline-block").style("vertical-align", "top");
  };

  function onLayout() {}

  function onDataTransform() {}

  function onDraw() {}

  // from https://github.com/d3/d3-plugins/tree/master/hexbin

  d3.hexbin = function () {
    var width = 1,
        height = 1,
        r,
        x = d3_hexbinX,
        y = d3_hexbinY,
        dx,
        dy;

    function hexbin(points) {
      var binsById = {};

      points.forEach(function (point, i) {
        var py = y.call(hexbin, point, i) / dy,
            pj = Math.round(py),
            px = x.call(hexbin, point, i) / dx - (pj & 1 ? .5 : 0),
            pi = Math.round(px),
            py1 = py - pj;

        if (Math.abs(py1) * 3 > 1) {
          var px1 = px - pi,
              pi2 = pi + (px < pi ? -1 : 1) / 2,
              pj2 = pj + (py < pj ? -1 : 1),
              px2 = px - pi2,
              py2 = py - pj2;
          if (px1 * px1 + py1 * py1 > px2 * px2 + py2 * py2) pi = pi2 + (pj & 1 ? 1 : -1) / 2, pj = pj2;
        }

        var id = pi + "-" + pj,
            bin = binsById[id];
        if (bin) bin.push(point);else {
          bin = binsById[id] = [point];
          bin.i = pi;
          bin.j = pj;
          bin.x = (pi + (pj & 1 ? 1 / 2 : 0)) * dx;
          bin.y = pj * dy;
        }
      });

      return d3.values(binsById);
    }

    function hexagon(radius) {
      var x0 = 0,
          y0 = 0;
      return d3_hexbinAngles.map(function (angle) {
        var x1 = Math.sin(angle) * radius,
            y1 = -Math.cos(angle) * radius,
            dx = x1 - x0,
            dy = y1 - y0;
        x0 = x1, y0 = y1;
        return [dx, dy];
      });
    }

    hexbin.x = function (_) {
      if (!arguments.length) return x;
      x = _;
      return hexbin;
    };

    hexbin.y = function (_) {
      if (!arguments.length) return y;
      y = _;
      return hexbin;
    };

    hexbin.hexagon = function (radius) {
      if (arguments.length < 1) radius = r;
      return "m" + hexagon(radius).join("l") + "z";
    };

    hexbin.centers = function () {
      var centers = [];
      for (var y = 0, odd = false, j = 0; y < height + r; y += dy, odd = !odd, ++j) {
        for (var x = odd ? dx / 2 : 0, i = 0; x < width + dx / 2; x += dx, ++i) {
          var center = [x, y];
          center.i = i;
          center.j = j;
          centers.push(center);
        }
      }
      return centers;
    };

    hexbin.mesh = function () {
      var fragment = hexagon(r).slice(0, 4).join("l");
      return hexbin.centers().map(function (p) {
        return "M" + p + "m" + fragment;
      }).join("");
    };

    hexbin.size = function (_) {
      if (!arguments.length) return [width, height];
      width = +_[0], height = +_[1];
      return hexbin;
    };

    hexbin.radius = function (_) {
      if (!arguments.length) return r;
      r = +_;
      dx = r * 2 * Math.sin(Math.PI / 3);
      dy = r * 1.5;
      return hexbin;
    };

    return hexbin.radius(1);
  };

  var d3_hexbinAngles = d3.range(0, 2 * Math.PI, Math.PI / 3);
  var d3_hexbinX = function d3_hexbinX(d) {
    return d[0];
  };
  var d3_hexbinY = function d3_hexbinY(d) {
    return d[1];
  };

  function onResize() {
    var chart = this;
    console.log(chart);

    //process hex data
    var radius = { min: 3, max: 10 };
    var hexCountRange = { min: 3, max: 100 };
    var radiusScale = d3.scale.sqrt().range([radius.min, radius.max]).domain([hexCountRange.min, hexCountRange.max]);

    var hexbin = d3.hexbin().size([chart.config.plot_width, chart.config.plot_height]).radius(radius.max).x(function (d) {
      return chart.x(d[chart.config.x.column]);
    }).y(function (d) {
      return chart.y(d[chart.config.y.column]);
    });

    var hexData = hexbin(chart.filtered_data);

    hexData.forEach(function (e) {
      e.size = e.length > hexCountRange.max ? hexCountRange.max : e.length;
    });

    //clear existing hexes/table
    chart.svg.select("g.hex_g").remove();
    d3.select(".detailTable").selectAll("*").remove();

    //draw hexes
    var hex_g = chart.svg.append("g").attr("class", "hex_g");

    var hexes = hex_g.selectAll(".hexagon").data(hexData).enter().append("path").attr("class", "hexagon").attr("d", function (d) {
      return "M" + d.x + "," + d.y + hexbin.hexagon(radiusScale(d.size));
    });

    hexes.append("title").text(function (d) {
      return d.length + " points. Click for details.";
    });

    hexes.on("click", function (d) {
      d3.selectAll(".hexagon").classed("selected", false);
      d3.select(this).classed("selected", true);

      //draw data table
      d3.select(".detailTable").text("");
      d3.select(".detailTable").selectAll("*").remove();
      chart.detailTable = webcharts.createTable('.detailTable', {});
      chart.detailTable.init([]);
      chart.detailTable.draw(d);
      if (chart.config.data_table) {
        $(chart.detailTable.table.node()).addClass("compact").dataTable({ pagingType: "simple" });
      }
    });
  }

  if (typeof Object.assign != 'function') {
    (function () {
      Object.assign = function (target) {
        'use strict';
        if (target === undefined || target === null) {
          throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
          var source = arguments[index];
          if (source !== undefined && source !== null) {
            for (var nextKey in source) {
              if (source.hasOwnProperty(nextKey)) {
                output[nextKey] = source[nextKey];
              }
            }
          }
        }
        return output;
      };
    })();
  }

  function webchartsHexbin(element, settings$$) {

    //merge user's settings with defaults
    var mergedSettings = Object.assign({}, settings, settings$$);

    //keep settings in sync with the data mappings
    mergedSettings = syncSettings(mergedSettings);

    //keep control inputs in sync and create controls object (if needed)
    //let syncedControlInputs = syncControlInputs(controlInputs, mergedSettings);
    // let controls = createControls(element, {location: 'top', inputs: syncedControlInputs});

    //create chart
    var chart = webcharts.createChart(element, mergedSettings); //add 3rd controls object as needed
    chart.on('init', onInit);
    chart.on('layout', onLayout);
    chart.on('datatransform', onDataTransform);
    chart.on('draw', onDraw);
    chart.on('resize', onResize);

    return chart;
  }

  return webchartsHexbin;
})(webCharts);

