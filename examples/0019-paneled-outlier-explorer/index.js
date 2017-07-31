    d3.selection.prototype.moveToFront = function() {  
      return this.each(function(){
        this.parentNode.appendChild(this);
      });
    };

    function clone(obj) {
        let copy;

      //boolean, number, string, null, undefined
        if ('object' != typeof obj || null == obj)
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
                if (obj.hasOwnProperty(attr))
                    copy[attr] = clone(obj[attr]);
            }
            return copy;
        }

        throw new Error('Unable to copy [obj]! Its type is not supported.');
    }

    function slope(line) {
        line.slope = (line.y1 - line.y0)/(line.x1 - line.x0);
    }

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
		if (equalPoints(p, q) || equalPoints(p, q2) || equalPoints(p2, q) || equalPoints(p2, q2)) {
			return true
		}
		// Do they overlap? (Are all the point differences in either direction the same sign)
		return !allEqual(
				(q.x - p.x < 0),
				(q.x - p2.x < 0),
				(q2.x - p.x < 0),
				(q2.x - p2.x < 0)) ||
			!allEqual(
				(q.y - p.y < 0),
				(q.y - p2.y < 0),
				(q2.y - p.y < 0),
				(q2.y - p2.y < 0));
	}

	if (denominator == 0) {
		// lines are paralell
		return false;
	}

	var u = uNumerator / denominator;
	var t = crossProduct(subtractPoints(q, p), s) / denominator;

	return (t >= 0) && (t <= 1) && (u >= 0) && (u <= 1);
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
	return (point1.x == point2.x) && (point1.y == point2.y)
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

/*------------------------------------------------------------------------------------------------\
  Chart
\------------------------------------------------------------------------------------------------*/

    const
        settings =
            {element: '#container .chart'
            ,x: {type: 'linear'
                ,column: 'DY'
                ,label: 'Study day'}
            ,y: {type: 'linear'
                ,column: 'STRESN'
                ,label: 'Result'}
            ,marks:
                [
                    {type: 'line'
                    ,per: ['USUBJID', 'TEST']
                    ,attributes:
                        {'stroke-width': .5
                        ,'stroke-opacity': .5
                        ,'stroke': '#999'}
                    }
                ,
                    {type: 'circle'
                    ,per: ['USUBJID', 'TEST', 'DY', 'STRESN']
                    ,radius: 2
                    ,attributes:
                        {'stroke-width': .5
                        ,'stroke-opacity': .5
                        ,'fill-opacity': 1}
                    }
                ]
            ,resizable: false
            ,aspect: 1.5
            ,panel: 'TEST'
            ,keys: ['USUBJID', 'DY']
            },
        paneledOutlierExplorer = new webCharts.createChart
            (settings.element + ' .content'
            ,settings);
        paneledOutlierExplorer.measures = {};

    d3.csv('../../data/safetyData/ADBDS.csv', function(data) {
      //Sort data by key variables.
        const
            vitals = data
                .filter(d => d.CAT === 'Vital Signs')
                .sort((a,b) => {
                    let sort =
                        a[settings.panel] < b[settings.panel] ? -1 :
                        a[settings.panel] > b[settings.panel] ?  1 : 0;
                    if (sort === 0) {
                        settings.keys.forEach(key => {
                            if (sort === 0)
                                sort = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
                        });
                    }

                    return sort;
                });

      //Define unique identifier.
        let key;
        vitals.forEach((d,i) => {
            const previousMeasure = i > 0
                ? vitals[i-1][settings.panel]
                : null;
            if (d[settings.panel] !== previousMeasure)
                key = 0;
                key ++;
            d.key = key;
        });

      //Call small multiples.
        webCharts.multiply(
            paneledOutlierExplorer,
            vitals,
            'TEST');
    });

    /**-------------------------------------------------------------------------------------------\
      Callbacks
    \-------------------------------------------------------------------------------------------**/

        paneledOutlierExplorer.on('init', function() {
            const chart = this;
        });

        paneledOutlierExplorer.on('layout', function() {
            const chart = this;
        });

        paneledOutlierExplorer.on('preprocess', function() {
            const chart = this;

          //Set the y-domain individually for each measure.
            this.currentMeasure = this.filters[0].val;
            this.config.y.domain = d3.extent(
                this.raw_data
                    .filter(d => d.TEST === this.currentMeasure),
                d => +d.STRESN);
        });

        paneledOutlierExplorer.on('datatransform', function() {
            const chart = this;
        });

        paneledOutlierExplorer.on('draw', function() {
            const chart = this;
        });

        paneledOutlierExplorer.on('resize', function() {
            const chart = this;

          //Capture each multiple's scale.
            var bbox = this.svg.node().getBBox();
            this.package = {
                overlay: this.svg//.wrap.select('svg')
                    .append('g')
                    .classed('brush', true),
                value: this.currentMeasure,
                domain: clone(this.config.y.domain),
                xScale: clone(this.x),
                yScale: clone(this.y),
                brush: d3.svg.brush()
                    .x(this.x)
                    .y(this.y)
            };
            this.package.overlay
                .append('rect')
                .attr(
                    {'x': 0
                    ,'y': 0
                    ,'width': this.plot_width
                    ,'height': this.plot_height
                    ,'fill-opacity': 0});
            paneledOutlierExplorer.measures[this.currentMeasure] = this.package;

          //Attach additional data to SVG and marks.
            this.package.overlay
                .style('cursor', 'crosshair')
                .datum({measure: this.currentMeasure});

              //points
                const
                    points = this.svg
                        .selectAll('.point-supergroup g.point circle');
                    points
                        .each(d => {
                            d.key1 = d.values.raw[0].key;
                            d.id = d.values.raw[0].USUBJID;
                        });

              //lines
                const
                    lines = this.svg
                        .selectAll('.line-supergroup g.line path');
                    lines
                        .each(function(d,i) {
                            d.id = d.values[0].values.raw[0].USUBJID;
                            d.lines = d.values.map((di,i) => {
                                var line;
                                if (i) {
                                    line = {
                                        x0: d.values[i - 1].values.x,
                                        y0: d.values[i - 1].values.y,
                                        x1: di.values.x,
                                        y1: di.values.y
                                    };
                                    line.slope = slope(line);
                                }
                                return line;
                            });
                            d.lines.shift();
                        });

          //Apply brush.
            paneledOutlierExplorer.measures[this.currentMeasure].brush
                .on('brushstart', function() {
                })
                .on('brush', function() {
                    const
                        measure = d3.select(this).datum().measure;
                    for (const prop in paneledOutlierExplorer.measures) {
                        if (prop !== measure)
                            paneledOutlierExplorer.measures[prop].overlay
                                .call(paneledOutlierExplorer.measures[prop].brush.clear());
                    }

                  //brush
                    const
                        extent = paneledOutlierExplorer.measures[measure].brush.extent(),
                        x0 = extent[0][0], // top left x-coordinate
                        y0 = extent[1][1], // top left y-coordinate
                        x1 = extent[1][0], // bottom right x-coordinate
                        y1 = extent[0][1], // bottom right y-coordinate
                        top = {x0: x1, y0: y0, x1: x0, y1: y0},
                        right = {x0: x1, y0: y1, x1: x1, y1: y0},
                        bottom = {x0: x0, y0: y1, x1: x1, y1: y1},
                        left = {x0: x0, y0: y0, x1: x0, y1: y1},
                        sides = [top, right, bottom, left];
                        left.slope = slope(left);
                        bottom.slope = slope(bottom);
                        right.slope = slope(right);
                        top.slope = slope(top);

                  //brushed points
                    const
                        brushedPoints = points
                            .filter(d => {
                                return (
                                    x0 <= d.values.x &&
                                    y0 >= d.values.y &&
                                    x1 >= d.values.x &&
                                    y1 <= d.values.y);
                            })
                            .data()
                            .map(d => d.key1),
                        allPoints = d3.select(chart.config.element)
                            .selectAll('.point-supergroup g.point circle')
                            .classed('brushed selected', false);
                        allPoints
                            .filter(d => brushedPoints.indexOf(d.key1) > -1)
                            .classed('brushed', true)
                            .each(function() {
                                d3.select(this.parentNode).moveToFront();
                            });

                  //brushed lines
                    const
                        brushedLines = lines
                            .filter((d,i) => {
                                let intersection = false;
                                d.lines.forEach((line,j) => {
                                    sides.forEach((side,k) => {
                                        if (!intersection) {
                                            intersection = doLineSegmentsIntersect(
                                                {x: line.x0, y: line.y0},
                                                {x: line.x1, y: line.y1},
                                                {x: side.x0, y: side.y0},
                                                {x: side.x1, y: side.y1}
                                            );
                                        }
                                    });
                                });
                                return intersection;
                            })
                            .data()
                            .map(d => d.id),
                        allLines = d3.select(chart.config.element)
                            .selectAll('.line-supergroup g.line path')
                            .classed('brushed', false);
                        allLines
                            .filter(d => brushedLines.indexOf(d.id) > -1)
                            .classed('brushed', true)
                            .each(function() {
                                d3.select(this.parentNode).moveToFront();
                            });
                        allPoints
                            .filter(d => brushedLines.indexOf(d.id) > -1)
                            .classed('selected', true)
                            .each(function() {
                                d3.select(this.parentNode).moveToFront();
                            });
                })
                .on('brushend', function() {
                });
            this.package.overlay
                .call(this.package.brush);
        });
