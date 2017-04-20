var spikeHistogram = (function(webcharts) {
  "use strict";
  if (typeof Object.assign != "function") {
    (function() {
      Object.assign = function(target) {
        "use strict";
        if (target === undefined || target === null)
          throw new TypeError("Cannot convert undefined or null to object");

        var output = Object(target);

        for (var index = 1; index < arguments.length; index++) {
          var source = arguments[index];

          if (source !== undefined && source !== null) {
            for (var nextKey in source) {
              if (source.hasOwnProperty(nextKey))
                output[nextKey] = source[nextKey];
            }
          }
        }

        return output;
      };
    })();
  }

  var _typeof = typeof Symbol === "function" &&
    typeof Symbol.iterator === "symbol"
    ? function(obj) {
        return typeof obj;
      }
    : function(obj) {
        return obj &&
          typeof Symbol === "function" &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? "symbol"
          : typeof obj;
      };

  var asyncGenerator = (function() {
    function AwaitValue(value) {
      this.value = value;
    }

    function AsyncGenerator(gen) {
      var front, back;

      function send(key, arg) {
        return new Promise(function(resolve, reject) {
          var request = {
            key: key,
            arg: arg,
            resolve: resolve,
            reject: reject,
            next: null
          };

          if (back) {
            back = back.next = request;
          } else {
            front = back = request;
            resume(key, arg);
          }
        });
      }

      function resume(key, arg) {
        try {
          var result = gen[key](arg);
          var value = result.value;

          if (value instanceof AwaitValue) {
            Promise.resolve(value.value).then(
              function(arg) {
                resume("next", arg);
              },
              function(arg) {
                resume("throw", arg);
              }
            );
          } else {
            settle(result.done ? "return" : "normal", result.value);
          }
        } catch (err) {
          settle("throw", err);
        }
      }

      function settle(type, value) {
        switch (type) {
          case "return":
            front.resolve({
              value: value,
              done: true
            });
            break;

          case "throw":
            front.reject(value);
            break;

          default:
            front.resolve({
              value: value,
              done: false
            });
            break;
        }

        front = front.next;

        if (front) {
          resume(front.key, front.arg);
        } else {
          back = null;
        }
      }

      this._invoke = send;

      if (typeof gen.return !== "function") {
        this.return = undefined;
      }
    }

    if (typeof Symbol === "function" && Symbol.asyncIterator) {
      AsyncGenerator.prototype[Symbol.asyncIterator] = function() {
        return this;
      };
    }

    AsyncGenerator.prototype.next = function(arg) {
      return this._invoke("next", arg);
    };

    AsyncGenerator.prototype.throw = function(arg) {
      return this._invoke("throw", arg);
    };

    AsyncGenerator.prototype.return = function(arg) {
      return this._invoke("return", arg);
    };

    return {
      wrap: function(fn) {
        return function() {
          return new AsyncGenerator(fn.apply(this, arguments));
        };
      },
      await: function(value) {
        return new AwaitValue(value);
      }
    };
  })();

  function clone(obj) {
    var copy = void 0;

    //boolean, number, string, null, undefined
    if (
      "object" != (typeof obj === "undefined" ? "undefined" : _typeof(obj)) ||
      null == obj
    )
      return obj;

    //date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    //array
    if (obj instanceof Array) {
      copy = [];
      for (var i = 0, len = obj.length; i < len; i++) {
        copy[i] = clone(obj[i]);
      }
      return copy;
    }

    //object
    if (obj instanceof Object) {
      copy = {};
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
      }
      return copy;
    }

    throw new Error("Unable to copy [obj]! Its type is not supported.");
  }

  var defaultSettings = {
    measure: null,
    panel: null,
    measureFormat: ",.2f",
    boxPlot: true,
    mean: true,
    nBins: 100,
    overall: false,

    //Webcharts settings
    x: {
      column: null, // set in syncSettings()
      type: "linear",
      label: "",
      bin: null
    }, // set in syncSettings()
    y: {
      column: null, // set in syncSettings()
      type: "linear",
      label: "",
      domain: [0, null]
    },
    marks: [
      {
        type: "bar",
        per: null, // set in syncSettings()
        summarizeX: "mean",
        summarizeY: "count"
      }
    ],
    gridlines: "y",
    resizable: true,
    aspect: 12,
    margin: {
      right: 25,
      left: 100
    } // space for panel value
  };

  //Replicate settings in multiple places in the settings object.
  function syncSettings(settings) {
    var syncedSettings = clone(settings);

    if (syncedSettings.panel === null) syncedSettings.overall = true;
    syncedSettings.x.column = settings.measure;
    syncedSettings.x.bin = settings.nBins;
    syncedSettings.y.column = settings.measure;
    syncedSettings.y.label = settings.measure;
    syncedSettings.marks[0].per = [settings.measure];

    return syncedSettings;
  }

  function onResize() {
    var context = this;
    var format = d3.format(this.config.measureFormat);

    //Hide overall plot if [settings.overall] is set to false.
    if (!this.config.overall && !this.group) this.wrap.style("display", "none");
    else {
      //Clear custom marks.
      this.svg.selectAll("rect.wc-data-mark").style("display", "none");
      this.svg.selectAll("line.spike").remove();
      this.svg.selectAll("g.tooltip").remove();
      this.svg.selectAll(".statistic").remove();

      //Replace rects with lines.
      this.svg.selectAll("g.bar-group").each(function(d, i) {
        //Define spikes.
        d.midpoint = (d.rangeHigh + d.rangeLow) / 2;
        d.range = format(d.rangeLow) + "-" + format(d.rangeHigh);
        d.selector = "range" + d.range.replace(/\./g, "d").replace(",", "_");
        var spike = d3
          .select(this)
          .append("line")
          .datum(d)
          .attr({
            class: "spike",
            x1: context.x(d.midpoint),
            y1: context.plot_height,
            x2: context.x(d.midpoint),
            y2: context.y(d.total)
          })
          .style({
            stroke: "black",
            "stroke-width": "3px"
          });

        //Define tooltips.
        var tooltip = context.svg
          .append("g")
          .classed("tooltip", true)
          .attr("id", d.selector);
        var text = tooltip.append("text").attr({
          id: "text",
          x: context.x(d.midpoint),
          y: context.plot_height,
          dy: "-.75em",
          "font-size": "75%",
          "font-weight": "bold",
          fill: "white"
        });
        text
          .append("tspan")
          .attr({
            x: context.x(d.midpoint),
            dx: context.x(d.midpoint) < context.plot_width / 2 ? "1em" : "-1em",
            "text-anchor": context.x(d.midpoint) < context.plot_width / 2
              ? "start"
              : "end"
          })
          .text("Range: " + d.range);
        text
          .append("tspan")
          .attr({
            x: context.x(d.midpoint),
            dx: context.x(d.midpoint) < context.plot_width / 2 ? "1em" : "-1em",
            dy: "-1.5em",
            "text-anchor": context.x(d.midpoint) < context.plot_width / 2
              ? "start"
              : "end"
          })
          .text("n: " + d.total);
        var dimensions = text[0][0].getBBox();
        var background = tooltip
          .append("rect")
          .attr({
            id: "background",
            x: dimensions.x - 5,
            y: dimensions.y - 2,
            width: dimensions.width + 10,
            height: dimensions.height + 4
          })
          .style({
            fill: "black",
            stroke: "white"
          });
        tooltip[0][0].insertBefore(background[0][0], text[0][0]);
      });

      //Annotate quantiles
      if (this.config.boxPlot) {
        var quantiles = [
          { probability: 0.05, label: "5th percentile" },
          { probability: 0.25, label: "1st quartile" },
          { probability: 0.50, label: "Median" },
          { probability: 0.75, label: "3rd quartile" },
          { probability: 0.95, label: "95th percentile" }
        ];

        for (var item in quantiles) {
          var quantile = quantiles[item];
          quantile.quantile = d3.quantile(this.values, quantile.probability);

          //Horizontal lines
          if ([0.05, 0.75].indexOf(quantile.probability) > -1) {
            var rProbability = quantiles[+item + 1].probability;
            var rQuantile = d3.quantile(this.values.sort(), rProbability);
            var whisker = this.svg
              .append("line")
              .attr({
                class: "statistic",
                x1: this.x(quantile.quantile),
                y1: this.plot_height + 4,
                x2: this.x(rQuantile),
                y2: this.plot_height + 4
              })
              .style({
                stroke: "red",
                "stroke-width": "2px",
                opacity: 0.25
              });
            whisker
              .append("title")
              .text(
                "Q" +
                  quantile.probability +
                  "-Q" +
                  rProbability +
                  ": " +
                  format(quantile.quantile) +
                  "-" +
                  format(rQuantile)
              );
          }

          //Box
          if (quantile.probability === 0.25) {
            var q3 = d3.quantile(this.values, 0.75);
            var interQ = this.svg
              .append("rect")
              .attr({
                class: "statistic",
                x: this.x(quantile.quantile),
                y: this.plot_height,
                width: this.x(q3) - this.x(quantile.quantile),
                height: 8
              })
              .style({
                fill: "blue",
                opacity: 0.25
              });
            interQ
              .append("title")
              .text(
                "Interquartile range: " +
                  format(quantile.quantile) +
                  "-" +
                  format(q3)
              );
          }

          //Vertical lines
          quantile.mark = this.svg
            .append("line")
            .attr({
              class: "statistic",
              x1: this.x(quantile.quantile),
              y1: this.plot_height,
              x2: this.x(quantile.quantile),
              y2: this.plot_height + 8
            })
            .style({
              stroke: [0.05, 0.95].indexOf(quantile.probability) > -1
                ? "red"
                : [0.25, 0.75].indexOf(quantile.probability) > -1
                    ? "blue"
                    : "black",
              "stroke-width": "3px"
            });
          quantile.mark
            .append("title")
            .text(quantile.label + ": " + format(quantile.quantile));
        }
      }

      //Annotate mean.
      if (this.config.mean) {
        var mean = d3.mean(this.values);
        var sd = d3.deviation(this.values);
        var meanMark = this.svg
          .append("circle")
          .attr({
            class: "statistic",
            cx: this.x(mean),
            cy: this.plot_height + 4,
            r: 3
          })
          .style({
            fill: "#ccc",
            stroke: "black",
            "stroke-width": "1px"
          });
        meanMark
          .append("title")
          .text(
            "n: " +
              this.values.length +
              "\nMean: " +
              format(mean) +
              "\nSD: " +
              format(sd)
          );
      }

      //Rotate y-axis labels.
      this.svg.select("g.y.axis text.axis-title").remove();
      this.svg
        .select("g.y.axis")
        .insert("text", ":first-child")
        .attr({
          class: "axis-title",
          x: 0,
          y: this.plot_height / 2,
          dx: "-2.5em"
        })
        .style("text-anchor", "end")
        .text(this.config.y.label);

      //Hide legends.
      this.wrap.select("ul.legend").remove();

      //Shift x-axis tick labels downward.
      this.svg.select(".x.axis").selectAll("g.tick text").attr("dy", "1em");

      //Add modal to nearest mark.
      var spikes = this.svg.selectAll(".spike");
      var tooltips = this.svg.selectAll(".tooltip");
      var statistics = this.svg.selectAll(".statistic");
      this.svg
        .on("mousemove", function() {
          //Highlight closest spike.
          var mouse = d3.mouse(this);
          var x = context.x.invert(mouse[0]);
          var y = context.y.invert(mouse[1]);
          var minimum = void 0;
          var spike = {};
          spikes.style("stroke", "black").each(function(d, i) {
            d.distance = Math.abs(d.midpoint - x);
            if (i === 0 || d.distance < minimum) {
              minimum = d.distance;
              spike = d;
            }
          });
          var closest = spikes
            .filter(function(d) {
              return d.distance === minimum;
            })
            .filter(function(d, i) {
              return i === 0;
            })
            .style("stroke", "red");

          //Activate tooltip.
          var d = closest.datum();
          tooltips.classed("active", false);
          context.svg.select("#" + d.selector).classed("active", true);
        })
        .on("mouseout", function() {
          spikes.style("stroke", "black");
          tooltips.classed("active", false);
        });
    }
  }

  function onInit() {
    var context = this;
    var config = this.initialSettings;
    var measure = config.measure;
    var panel = config.panel;

    //Remove non-numeric and missing values.
    if (!this.group) {
      this.initialSettings.unfilteredData = this.raw_data;
      this.raw_data = this.initialSettings.unfilteredData.filter(function(d) {
        return !isNaN(+d[measure]) && !/^\s*$/.test(d[measure]);
      });
    }

    //Create array of values.
    this.values = this.raw_data
      .map(function(d) {
        return +d[measure];
      })
      .sort();

    //Define x-axis domain as the range of the measure, regardless of subgrouping.
    if (!this.initialSettings.xDomain) {
      this.initialSettings.xDomain = d3.extent(this.values);
      config.xDomain = this.initialSettings.xDomain;
    }
    this.config.x.domain = this.initialSettings.xDomain;

    /**-------------------------------------------------------------------------------------------\
          Paneling
        \-------------------------------------------------------------------------------------------**/

    if (panel && !this.group) {
      //Nest data by paneling variable to efine y-axis domain as the maximum number of observations
      //in a single bin within a subgrouping.
      var max = 0;
      if (!config.y.domain[1]) {
        var nestedData = d3
          .nest()
          .key(function(d) {
            return d[panel];
          })
          .entries(context.raw_data);
        nestedData.forEach(function(group) {
          var domain = d3.extent(group.values, function(d) {
            return +d[measure];
          });
          var binWidth = (domain[1] - domain[0]) / config.nBins;
          group.values.forEach(function(d) {
            d.bin =
              Math.floor((+d[measure] - domain[0]) / binWidth) -
              (+d[measure] === domain[1]) * 1;
          });
          var bins = d3
            .nest()
            .key(function(d) {
              return d.bin;
            })
            .rollup(function(d) {
              return d.length;
            })
            .entries(group.values);
          max = Math.max(
            max,
            d3.max(bins, function(d) {
              return d.values;
            })
          );
        });
      }

      //Plot the chart for each group.
      var groups = d3
        .set(
          context.raw_data.map(function(d) {
            return d[panel];
          })
        )
        .values()
        .map(function(d) {
          return { group: d };
        })
        .sort(function(a, b) {
          return a.group < b.group ? -1 : 1;
        });
      groups.forEach(function(group, i) {
        group.settings = clone(config);
        group.settings.y.label = group.group;
        group.settings.y.domain = [0, max];
        group.data = context.raw_data.filter(function(d) {
          return d[panel] === group.group;
        });
        group.webChart = new webCharts.createChart(
          config.container,
          group.settings
        );
        group.webChart.initialSettings = group.settings;
        group.webChart.group = group.group;
        group.webChart.on("init", onInit);
        group.webChart.on("resize", onResize);
        group.webChart.init(group.data);
      });
    }
  }

  function onLayout() {}

  function onPreprocess() {}

  function onDataTransform() {}

  function onDraw() {}

  function spikeHistogram(element, settings) {
    //Merge specified settings with default settings.
    var mergedSettings = Object.assign({}, defaultSettings, settings);

    //Sync properties within merged settings.
    var syncedSettings = syncSettings(mergedSettings);

    //Sync control inputs with merged settings.
    //let syncedControlInputs = syncControlInputs(controlInputs, mergedSettings);
    //let controls = createControls(element, {location: 'top', inputs: syncedControlInputs});

    //Define chart.
    var chart = webcharts.createChart(element, syncedSettings); // Add third argument to define controls as needed.
    chart.initialSettings = clone(syncedSettings);
    chart.initialSettings.container = element;
    chart.on("init", onInit);
    chart.on("layout", onLayout);
    chart.on("preprocess", onPreprocess);
    chart.on("datatransform", onDataTransform);
    chart.on("draw", onDraw);
    chart.on("resize", onResize);

    return chart;
  }

  return spikeHistogram;
})(webCharts);
