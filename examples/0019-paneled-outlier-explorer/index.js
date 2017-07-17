/*------------------------------------------------------------------------------------------------\
  Chart
\------------------------------------------------------------------------------------------------*/

    const
        paneledOutlierExplorerContainer = '#container .chart',
        paneledOutlierExplorerSettings =
            {x: {type: 'linear'
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
            },
        paneledOutlierExplorer = new webCharts.createChart
            (paneledOutlierExplorerContainer + ' .content'
            ,paneledOutlierExplorerSettings);

    d3.csv('../../data/safetyData/ADBDS.csv', function(data) {
        webCharts.multiply(
            paneledOutlierExplorer,
            data.filter(d => d.CAT === 'Vital Signs'),
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
            this.config.y.domain = d3.extent(
                this.raw_data
                    .filter(d => d.TEST === this.filters[0].val),
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

            const points = this.svg
                .selectAll('.point-supergroup g.point circle')
                .each(d => {
                    d.x = this.x.invert(d.values.x);
                    d.y = this.y.invert(d.values.y);
                    console.log(d);
                });
            console.log(d3.extent(points.data(), d => d.x));
            console.log(d3.extent(points.data(), d => d.y));

            const
                //points = d3.select(paneledOutlierExplorerContainer)
                //    .selectAll('.point-supergroup g.point circle'),
                brush = d3.svg.brush()
                    .x(this.x)
                    .y(this.y);
            brush
                .on('brushstart', function() {
                })
                .on('brush', function() {
                    points
                        .classed('brushed', false);
                    var extent = brush.extent(),
                        x0 = chart.x.invert(extent[0][0]), // top left x-coordinate
                        y0 = chart.y.invert(extent[1][1]), // top left y-coordinate
                        x1 = chart.x.invert(extent[1][0]), // bottom right x-coordinate
                        y1 = chart.y.invert(extent[0][1]), // bottom right y-coordinate
                        selectedPoints = points
                            .filter(d => {
                                return (
                                    x0 <= d.x &&
                                    y0 <= d.y &&
                                    x1 >= d.x &&
                                    y1 >= d.y);
                            })
                            .classed('brushed', true);
                    console.log('brush coordinates:');
                    console.log('x0,y0');
                    console.log(x0,y0);
                    console.log('x1,y1');
                    console.log(x1,y1);
                })
                .on('brushend', function() {
                });
            this.svg
                .call(brush);
        });
