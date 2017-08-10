(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory(require('webcharts'), require('d3')))
        : typeof define === 'function' && define.amd
          ? define(['webcharts', 'd3'], factory)
          : (global.paneledOutlierExplorer = factory(global.webCharts, global.d3));
})(this, function(webcharts, d3) {
    'use strict';

    function defineStyles() {
        var styles = [
                '.hidden {' + '    display: none !important;' + '}',
                '#measure-list-container {' + '    width: 19%;' + '    float: left;' + '}',
                '#measure-list-header {' +
                    '    font-size: 150%;' +
                    '    border-bottom: 1px solid lightgray;' +
                    '    font-weight: lighter;' +
                    '    padding-bottom: 1%;' +
                    '    margin-bottom: 1%;' +
                    '    text-align: right;' +
                    '}',
                '#measure-list-checkbox {' + '    margin-left: 5px;' + '}',
                '#measure-list {' +
                    '    list-style-type: none;' +
                    '    font-weight: lighter;' +
                    '}',
                '.measure-item {' + '}',
                '.measure-item-container {' + '    text-align: right;' + '}',
                '.measure-checkbox {' +
                    '    margin-left: 5px;' +
                    '    margin-top: 5px;' +
                    '    float: right;' +
                    '}',
                'div.wc-layout.wc-small-multiples {' +
                    '    width: 80%;' +
                    '    float: right;' +
                    '    border-left: 1px solid lightgray;' +
                    '}',
                'div.wc-layout.wc-small-multiples > div.wc-chart {' +
                    '    padding-right: 1em;' +
                    '}',
                'div.wc-layout.wc-small-multiples > div.wc-chart .delete-chart {' +
                    '    float: right;' +
                    '    cursor: pointer;' +
                    '    border: 1px solid black;' +
                    '    border-radius: 3px;' +
                    '    padding: 0px 4px 1px 3px;' +
                    '}',
                'div.wc-layout.wc-small-multiples > div.wc-chart .delete-chart:hover {' +
                    '    background: black;' +
                    '    color: white;' +
                    '}',
                'circle.brushed {' +
                    '    stroke: orange;' +
                    '    stroke-width: 2px;' +
                    '    fill: black;' +
                    '    r: 4px;' +
                    '}',
                'path.brushed {' +
                    '    stroke: orange;' +
                    '    stroke-width: 3px;' +
                    '    stroke-opacity: 1;' +
                    '}',
                'circle.selected {' + '    stroke: orange;' + '    fill: black;' + '}'
            ],
            style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = styles.join('\n');

        document.getElementsByTagName('head')[0].appendChild(style);
    }

    var _typeof =
        typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
            ? function(obj) {
                  return typeof obj;
              }
            : function(obj) {
                  return obj &&
                  typeof Symbol === 'function' &&
                  obj.constructor === Symbol &&
                  obj !== Symbol.prototype
                      ? 'symbol'
                      : typeof obj;
              };

    function clone(obj) {
        var copy = void 0;

        //boolean, number, string, null, undefined
        if ('object' != (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) || null == obj)
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

        throw new Error('Unable to copy [obj]! Its type is not supported.');
    }

    if (typeof Object.assign != 'function') {
        (function() {
            Object.assign = function(target) {
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

    var defaultSettings = {
        measure_col: 'TEST',
        time_col: 'DY',
        value_col: 'STRESN',
        id_col: 'USUBJID',
        unit_col: 'STRESU',
        normal_col_low: 'STNRLO',
        normal_col_high: 'STNRHI',
        measures: null,
        filters: null,

        x: {
            type: 'linear',
            column: null, // sync to [ time_col ]
            label: 'Study Day'
        },
        y: {
            type: 'linear',
            column: null, // sync to [ value_col ]
            label: ''
        },
        marks: [
            {
                type: 'line',
                per: null, // sync to [ id_col ] and [ measure_col ]
                attributes: {
                    'stroke-width': 0.5,
                    'stroke-opacity': 0.5,
                    stroke: '#999'
                }
            },
            {
                type: 'circle',
                per: null, // sync to [ id_col ], [ measure_col ], [ time_col ], and [ value_col ]
                radius: 2,
                attributes: {
                    'stroke-width': 0.5,
                    'stroke-opacity': 0.5,
                    'fill-opacity': 1
                }
            }
        ],
        resizable: false,
        width: 600,
        height: 300,
        margin: {
            left: 50
        }
    };

    function syncSettings(settings) {
        var syncedSettings = clone(settings);
        syncedSettings.x.column = settings.time_col;
        syncedSettings.y.column = settings.value_col;
        syncedSettings.marks[0].per = [settings.id_col, settings.measure_col];
        syncedSettings.marks[1].per = [
            settings.id_col,
            settings.measure_col,
            settings.time_col,
            settings.value_col
        ];

        return syncedSettings;
    }

    var controlInputs = [
        {
            type: 'subsetter',
            value_col: null,
            label: 'Measures',
            multiple: true
        }
    ];

    function syncControlInputs(controlInputs, settings) {
        var syncedControlInputs = clone(controlInputs);
        syncedControlInputs.filter(function(controlInput) {
            return controlInput.label === 'Measures';
        })[0].value_col =
            settings.measure_col;

        return syncedControlInputs;
    }

    function init(data) {
        var _this = this;

        var sortedData = data.sort(function(a, b) {
            var aValue = a[_this.config.measure_col],
                bValue = b[_this.config.measure_col],
                leftSort = aValue < bValue,
                rightSort = aValue > bValue;

            if (_this.config.measures && _this.config.measures.length) {
                var aPos = _this.config.measures.indexOf(aValue),
                    bPos = _this.config.measures.indexOf(bValue),
                    diff = aPos > -1 && bPos > -1 ? aPos - bPos : null;

                return diff
                    ? diff
                    : aPos > -1 ? -1 : bPos > -1 ? 1 : leftSort ? -1 : rightSort ? 1 : 0;
            } else return leftSort ? -1 : rightSort ? 1 : 0;
        });
        webcharts.multiply(this, sortedData, this.config.measure_col);
    }

    function onInit() {
        var _this = this;

        this.currentMeasure = this.filters[0].val;

        //Sort data by key variables.
        this.raw_data = this.raw_data.sort(function(a, b) {
            //sort first by panel
            var sort =
                a[_this.config.panel_col] < b[_this.config.panel_col]
                    ? -1
                    : a[_this.config.panel_col] > b[_this.config.panel_col] ? 1 : 0;

            //then sort by key variables
            if (sort === 0) {
                [_this.config.id_col, _this.config.time_col].forEach(function(key) {
                    if (sort === 0) sort = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
                });
            }

            return sort;
        });

        //Define unique identifier.
        var key = void 0;
        this.raw_data.forEach(function(d, i) {
            var previousMeasure = i > 0 ? _this.raw_data[i - 1][_this.config.panel_col] : null;

            if (d[_this.config.panel_col] !== previousMeasure) key = 0;
            key++;

            d.key = key;
        });

        //Capture unique measures.
        this.config.allMeasures = d3
            .set(
                this.raw_data.map(function(d) {
                    return d[_this.config.measure_col];
                })
            )
            .values()
            .sort(function(a, b) {
                var leftSort = a < b,
                    rightSort = a > b;

                if (_this.config.measures && _this.config.measures.length) {
                    var aPos = _this.config.measures.indexOf(a),
                        bPos = _this.config.measures.indexOf(b),
                        diff = aPos > -1 && bPos > -1 ? aPos - bPos : null;

                    return diff
                        ? diff
                        : aPos > -1 ? -1 : bPos > -1 ? 1 : leftSort ? -1 : rightSort ? 1 : 0;
                } else return leftSort ? -1 : rightSort ? 1 : 0;
            });
        this.config.measures =
            this.config.measures && this.config.measures.length
                ? this.config.measures
                : this.config.allMeasures;
    }

    function onLayout() {
        var _this = this;

        var chart = this;

        //Define chart display toggles.
        if (d3.select('#measure-list-container').size() === 0) {
            var measureListContainer = d3
                    .select(this.config.element)
                    .insert('div', ':first-child')
                    .attr('id', 'measure-list-container'),
                measureListHeader = measureListContainer
                    .append('div')
                    .attr('id', 'measure-list-header')
                    .text('Measures'),
                measureListCheckbox = measureListHeader
                    .append('input')
                    .attr({
                        id: 'measure-list-checkbox',
                        type: 'checkbox',
                        title:
                            this.config.measures.length === this.config.allMeasures.length
                                ? 'Remove all charts'
                                : 'Display all charts'
                    })
                    .property(
                        'checked',
                        this.config.measures.length === this.config.allMeasures.length
                    )
                    .on('click', function() {
                        var checkbox = d3.select(this),
                            checked = checkbox.property('checked');
                        checkbox.attr(
                            'title',
                            checked ? 'Remove all charts' : 'Display all charts'
                        );
                        d3
                            .select(chart.config.element)
                            .selectAll('.wc-chart')
                            .classed('hidden', !checked);
                        d3.selectAll('.measure-checkbox').property('checked', checked);
                    }),
                measureList = measureListContainer.append('ul').attr('id', 'measure-list'),
                measureItems = measureList
                    .selectAll('li.measure')
                    .data(this.config.allMeasures)
                    .enter()
                    .append('li')
                    .classed('measure-item', true)
                    .each(function(d) {
                        //Append div inside list item.
                        var measureItemContainer = d3
                                .select(this)
                                .append('div')
                                .classed('measure-item-container', true)
                                .text(d),
                            //Check whether measure should by displayed initially.
                            checked = chart.config.measures.indexOf(d) > -1,
                            //Append checkbox inside div.
                            measureItemCheckbox = measureItemContainer
                                .append('input')
                                .classed('measure-checkbox', true)
                                .attr({
                                    type: 'checkbox',
                                    title: checked ? 'Remove chart' : 'Display chart'
                                })
                                .property('checked', checked);
                    });
            measureItems.on('change', function(d) {
                //Determine state of checkbox.
                var checkbox = d3.select(this).select('input'),
                    checked = checkbox.property('checked');
                checkbox.attr('title', checked ? 'Remove chart' : 'Display chart');
                d3
                    .select(chart.config.element)
                    .selectAll('.wc-chart')
                    .filter(function(di) {
                        return di.measure === d;
                    })
                    .classed('hidden', !checked);
                //If any checkbox is unchecked, uncheck measureListCheckbox.
                if (
                    measureItems[0].some(function(measureItem) {
                        return measureItem.getElementsByClassName('measure-checkbox')[0].checked;
                    })
                )
                    measureListCheckbox
                        .attr('title', 'Display all charts')
                        .property('checked', false);
            });
        }

        //Add ability to remove charts in the chart title.
        this.wrap
            .select('.wc-chart-title')
            .append('span')
            .classed('delete-chart', true)
            .html('&#10006;')
            .attr('title', 'Remove chart')
            .on('click', function() {
                _this.wrap.classed('hidden', true);
                //Sync measureItems.
                var measureItems = d3.selectAll('.measure-item');
                measureItems
                    .filter(function(d) {
                        return d === _this.currentMeasure;
                    })
                    .select('input')
                    .property('checked', false);
                //If any checkbox is unchecked, uncheck measureListCheckbox.
                if (
                    measureItems[0].some(function(measureItem) {
                        return measureItem.getElementsByClassName('measure-checkbox')[0].checked;
                    })
                )
                    d3
                        .select('#measure-list-checkbox')
                        .attr('title', 'Display all charts')
                        .property('checked', false);
            });

        //Hide measures not listed in [ settings.measures ].
        this.wrap.classed('hidden', this.config.measures.indexOf(this.currentMeasure) === -1);
    }

    function onPreprocess() {
        var _this = this;

        //Set the y-domain individually for each measure.
        this.config.y.domain = d3.extent(
            this.raw_data.filter(function(d) {
                return d[_this.config.measure_col] === _this.currentMeasure;
            }),
            function(d) {
                return +d[_this.config.value_col];
            }
        );
        var range = this.config.y.domain[1] - this.config.y.domain[0];
        this.config.y.format = range < 0.1 ? '.3f' : range < 1 ? '.2f' : range < 10 ? '.1f' : '1d';
    }

    function onDatatransform() {}

    function onDraw() {}

    d3.selection.prototype.moveToFront = function() {
        return this.each(function() {
            this.parentNode.appendChild(this);
        });
    };

    /**
 * @author Peter Kelley
 * @author pgkelley4@gmail.com
 */

    /**
 * See if two line segments intersect. This uses the 
 * vector cross product approach described below:
 * http://stackoverflow.com/a/565282/786339
 * 
 * @param {Object} p point object with x and y coordinates
 *  representing the start of the 1st line.
 * @param {Object} p2 point object with x and y coordinates
 *  representing the end of the 1st line.
 * @param {Object} q point object with x and y coordinates
 *  representing the start of the 2nd line.
 * @param {Object} q2 point object with x and y coordinates
 *  representing the end of the 2nd line.
 */

    function doLineSegmentsIntersect(p, p2, q, q2) {
        var r = subtractPoints(p2, p);
        var s = subtractPoints(q2, q);

        var uNumerator = crossProduct(subtractPoints(q, p), r);
        var denominator = crossProduct(r, s);

        if (uNumerator == 0 && denominator == 0) {
            // They are coLlinear

            // Do they touch? (Are any of the points equal?)
            if (
                equalPoints(p, q) ||
                equalPoints(p, q2) ||
                equalPoints(p2, q) ||
                equalPoints(p2, q2)
            ) {
                return true;
            }
            // Do they overlap? (Are all the point differences in either direction the same sign)
            return (
                !allEqual(q.x - p.x < 0, q.x - p2.x < 0, q2.x - p.x < 0, q2.x - p2.x < 0) ||
                !allEqual(q.y - p.y < 0, q.y - p2.y < 0, q2.y - p.y < 0, q2.y - p2.y < 0)
            );
        }

        if (denominator == 0) {
            // lines are paralell
            return false;
        }

        var u = uNumerator / denominator;
        var t = crossProduct(subtractPoints(q, p), s) / denominator;

        return t >= 0 && t <= 1 && u >= 0 && u <= 1;
    }

    /**
 * Calculate the cross product of the two points.
 * 
 * @param {Object} point1 point object with x and y coordinates
 * @param {Object} point2 point object with x and y coordinates
 * 
 * @return the cross product result as a float
 */
    function crossProduct(point1, point2) {
        return point1.x * point2.y - point1.y * point2.x;
    }

    /**
 * Subtract the second point from the first.
 * 
 * @param {Object} point1 point object with x and y coordinates
 * @param {Object} point2 point object with x and y coordinates
 * 
 * @return the subtraction result as a point object
 */

    function subtractPoints(point1, point2) {
        var result = {};
        result.x = point1.x - point2.x;
        result.y = point1.y - point2.y;

        return result;
    }

    /**
 * See if the points are equal.
 *
 * @param {Object} point1 point object with x and y coordinates
 * @param {Object} point2 point object with x and y coordinates
 *
 * @return if the points are equal
 */
    function equalPoints(point1, point2) {
        return point1.x == point2.x && point1.y == point2.y;
    }

    /**
 * See if all arguments are equal.
 *
 * @param {...} args arguments that will be compared by '=='.
 *
 * @return if all arguments are equal
 */
    function allEqual(args) {
        var firstValue = arguments[0],
            i;
        for (i = 1; i < arguments.length; i += 1) {
            if (arguments[i] != firstValue) {
                return false;
            }
        }
        return true;
    }

    function brush() {
        var chart = this;

        //points
        var points = this.svg.selectAll('.point-supergroup g.point circle');
        points.each(function(d) {
            d.key1 = d.values.raw[0].key;
            d.id = d.values.raw[0][chart.config.id_col];
        });

        //lines
        var lines = this.svg.selectAll('.line-supergroup g.line path');
        lines.each(function(d, i) {
            d.id = d.values[0].values.raw[0][chart.config.id_col];
            d.lines = d.values.map(function(di, i) {
                var line;
                if (i) {
                    line = {
                        x0: d.values[i - 1].values.x,
                        y0: d.values[i - 1].values.y,
                        x1: di.values.x,
                        y1: di.values.y
                    };
                }
                return line;
            });
            d.lines.shift();
        });

        //Apply brush.
        this.package.brush
            .on('brushstart', function() {})
            .on('brush', function() {
                var measure = d3.select(this).datum().measure;
                d3.selectAll(chart.config.element).selectAll('.wc-chart').each(function(d) {
                    if (d.measure !== measure) d.overlay.call(d.brush.clear());
                });

                //brush
                var extent$$1 = chart.package.brush.extent(),
                    x0 = extent$$1[0][0],
                    // top left x-coordinate
                    y0 = extent$$1[1][1],
                    // top left y-coordinate
                    x1 = extent$$1[1][0],
                    // bottom right x-coordinate
                    y1 = extent$$1[0][1],
                    // bottom right y-coordinate
                    top = { x0: x1, y0: y0, x1: x0, y1: y0 },
                    right = { x0: x1, y0: y1, x1: x1, y1: y0 },
                    bottom = { x0: x0, y0: y1, x1: x1, y1: y1 },
                    left = { x0: x0, y0: y0, x1: x0, y1: y1 },
                    sides = [top, right, bottom, left];

                //brushed points
                var brushedPoints = points
                        .filter(function(d) {
                            return (
                                x0 <= d.values.x &&
                                y0 >= d.values.y &&
                                x1 >= d.values.x &&
                                y1 <= d.values.y
                            );
                        })
                        .data()
                        .map(function(d) {
                            return d.key1;
                        }),
                    allPoints = d3
                        .select(chart.config.element)
                        .selectAll('.point-supergroup g.point circle')
                        .classed('brushed selected', false);
                allPoints
                    .filter(function(d) {
                        return brushedPoints.indexOf(d.key1) > -1;
                    })
                    .classed('brushed', true)
                    .each(function() {
                        d3.select(this.parentNode).moveToFront();
                    });

                //brushed lines
                var brushedLines = lines
                        .filter(function(d, i) {
                            var intersection = false;
                            d.lines.forEach(function(line, j) {
                                sides.forEach(function(side, k) {
                                    if (!intersection) {
                                        intersection = doLineSegmentsIntersect(
                                            { x: line.x0, y: line.y0 },
                                            { x: line.x1, y: line.y1 },
                                            { x: side.x0, y: side.y0 },
                                            { x: side.x1, y: side.y1 }
                                        );
                                    }
                                });
                            });
                            return intersection;
                        })
                        .data()
                        .map(function(d) {
                            return d.id;
                        }),
                    allLines = d3
                        .select(chart.config.element)
                        .selectAll('.line-supergroup g.line path')
                        .classed('brushed', false);
                allLines
                    .filter(function(d) {
                        return brushedLines.indexOf(d.id) > -1;
                    })
                    .classed('brushed', true)
                    .each(function() {
                        d3.select(this.parentNode).moveToFront();
                    });
                allPoints
                    .filter(function(d) {
                        return brushedLines.indexOf(d.id) > -1;
                    })
                    .classed('selected', true)
                    .each(function() {
                        d3.select(this.parentNode).moveToFront();
                    });
            })
            .on('brushend', function() {});

        //Initialize brush on brush overlay.
        this.package.overlay.call(this.package.brush);
    }

    function onResize() {
        var chart = this;

        //Capture each multiple's scale.
        var bbox = this.svg.node().getBBox();
        this.package = {
            measure: this.currentMeasure,
            container: this.wrap,
            overlay: this.svg.append('g').classed('brush', true),
            value: this.currentMeasure,
            domain: clone(this.config.y.domain),
            xScale: clone(this.x),
            yScale: clone(this.y),
            brush: d3.svg.brush().x(this.x).y(this.y)
        };
        this.wrap.datum(this.package);

        //Define invisible brush overlay.
        this.package.overlay.append('rect').attr({
            x: 0,
            y: 0,
            width: this.plot_width,
            height: this.plot_height,
            'fill-opacity': 0
        });

        //Attach additional data to SVG and marks.
        this.package.overlay.style('cursor', 'crosshair').datum({ measure: this.currentMeasure });

        //Add brush functionality.
        brush.call(this);
    }

    function onDestroy() {}

    var callbacks = {
        onInit: onInit,
        onLayout: onLayout,
        onPreprocess: onPreprocess,
        onDatatransform: onDatatransform,
        onDraw: onDraw,
        onResize: onResize,
        onDestroy: onDestroy
    };

    function paneledOutlierExplorer(element, settings) {
        //Define .css styles to avoid requiring a separate .css file.
        defineStyles();

        //Clone, merge, and sync settings and define chart.
        var initialSettings = clone(settings),
            mergedSettings = Object.assign({}, defaultSettings, initialSettings),
            syncedSettings = syncSettings(mergedSettings),
            syncedControlInputs = syncControlInputs(controlInputs, syncedSettings),
            //controls = createControls(element, {location: 'top', inputs: syncedControlInputs}),
            chart = webcharts.createChart(element, syncedSettings); //, controls);

        //Define chart callbacks.
        for (var callback in callbacks) {
            chart.on(callback.substring(2).toLowerCase(), callbacks[callback]);
        } //Attach element to chart.
        chart.config.element = element;

        //Redefine chart.init() in order to call webCharts.multiply() on paneledOutlierExplorer.init().
        Object.defineProperty(chart, 'init', {
            enumerable: false,
            configurable: true,
            writable: true,
            value: init
        });

        return chart;
    }

    return paneledOutlierExplorer;
});
