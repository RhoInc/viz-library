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
            this.measures = {};
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
            this.measures[this.currentMeasure] = {
                value: this.currentMeasure,
                domain: clone(this.config.y.domain),
                xScale: clone(this.x),
                yScale: clone(this.y),
                brush: d3.svg.brush()
                    .x(this.x)
                    .y(this.y)
            };

          //Attach additional data to SVG and marks.
            this.svg
                .style('cursor', 'crosshair')
                .datum({measure: this.currentMeasure});
            const
                points = this.svg
                    .selectAll('.point-supergroup g.point circle');
            points
                .each(d => {
                    d.key1 = d.values.raw[0].key;
                });
            this.measures[this.currentMeasure].brush
                .on('brushstart', function() {
                })
                .on('brush', function() {
                    const
                        measure = d3.select(this).datum().measure,
                        extent = chart.measures[measure].brush.extent(),
                        x0 = extent[0][0], // top left x-coordinate
                        y0 = extent[1][1], // top left y-coordinate
                        x1 = extent[1][0], // bottom right x-coordinate
                        y1 = extent[0][1], // bottom right y-coordinate
                        brushedPoints = points
                            .filter(d => {
                                return (
                                    x0 <= d.values.x &&
                                    y0 >= d.values.y &&
                                    x1 >= d.values.x &&
                                    y1 <= d.values.y);
                            })
                            .data()
                            .map(d => d.key1);
                    const
                        allPoints = d3.select(chart.config.element)
                            .selectAll('.point-supergroup g.point circle')
                            .classed('brushed', false);
                    allPoints
                        .filter(d => brushedPoints.indexOf(d.key1) > -1)
                        .classed('brushed', true);
                })
                .on('brushend', function() {
                });
            this.svg
                .call(this.measures[this.currentMeasure].brush);
        });
