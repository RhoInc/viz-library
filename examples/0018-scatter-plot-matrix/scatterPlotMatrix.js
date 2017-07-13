/*------------------------------------------------------------------------------------------------\
  Functions
\------------------------------------------------------------------------------------------------*/

  //generate data array representing matrix of one item per measure combination
    function cross(a, b) {
        var c = [],
            n = a.length,
            m = b.length,
            i,
            j;

        for (i = -1; ++i < n;)
            for (j = -1; ++j < m;)
                c.push(
                    {x: a[i]
                    ,i: i
                    ,y: b[j]
                    ,j: j});

        return c;
    }

    function scatterPlotMatrix(element, data, settings) {
      //main object
        var scatterPlotMatrix = {};
            scatterPlotMatrix.element = element;
            scatterPlotMatrix.selection = d3.select(element);

      //settings
        if (!settings.measures)
            settings.measures = d3.set(
                    data.map(d => d[settings.measure_col]))
                .values();
        settings.nMeasures = settings.measures.length;
        scatterPlotMatrix.settings = Object.assign({}, settings);

      //data
        scatterPlotMatrix.data = {raw: data};
        scatterPlotMatrix.data.raw
            .forEach(d => {
                d[settings.result_col] = +d[settings.result_col];
            });
        scatterPlotMatrix.data.measures = settings.measures
            .map(measure => {
                var summary = {};
                    summary.measure = measure;
                    summary.data = data.filter(d => d[settings.measure_col] === measure);
                    summary.values = summary.data.map(d => +d[settings.result_col]).sort();
                    summary.domain = d3.extent(summary.values);

                return summary;
            });
        scatterPlotMatrix.data.crossed = cross(scatterPlotMatrix.data.measures,scatterPlotMatrix.data.measures);

      //x
        scatterPlotMatrix.xScale = d3.scale.linear()
            .range([settings.padding / 2, settings.size - settings.padding / 2]);
        scatterPlotMatrix.xAxis = d3.svg.axis()
            .scale(scatterPlotMatrix.xScale)
            .orient('bottom')
            .ticks(6);
        scatterPlotMatrix.xAxis.tickSize(settings.size * settings.nMeasures);

      //y
        scatterPlotMatrix.yScale = d3.scale.linear()
            .range([settings.size - settings.padding / 2, settings.padding / 2]);
        scatterPlotMatrix.yAxis = d3.svg.axis()
            .scale(scatterPlotMatrix.yScale)
            .orient('left')
            .ticks(6);
        scatterPlotMatrix.yAxis.tickSize(-settings.size * settings.nMeasures);

      //color
        scatterPlotMatrix.colorScale = d3.scale.category10();

        var svg = scatterPlotMatrix.selection
            .append('svg')
            .attr('width', settings.size * settings.nMeasures + settings.padding)
            .attr('height', settings.size * settings.nMeasures + settings.padding)
            .append('g')
            .attr('transform', 'translate(' + settings.padding + ',' + settings.padding / 2 + ')');

        svg.selectAll('g.x.axis')
                .data(scatterPlotMatrix.data.measures)
                .enter()
            .append('g')
            .classed('x axis', true)
            .attr('transform', function(d, i) {
                return 'translate(' + (settings.nMeasures - i - 1) * settings.size + ',0)'; })
            .each(function(d) {
                scatterPlotMatrix.xScale
                    .domain(d.domain);
                d3.select(this)
                    .call(scatterPlotMatrix.xAxis);
            });

        svg.selectAll('g.y.axis')
                .data(scatterPlotMatrix.data.measures)
                .enter()
            .append('g')
            .classed('y axis', true)
            .attr('transform', function(d, i) {
                return 'translate(0,' + i * settings.size + ')'; })
            .each(function(d) {
                scatterPlotMatrix.yScale
                    .domain(d.domain);
                d3.select(this)
                    .call(scatterPlotMatrix.yAxis);
            });

        function plot(p) {
            var cell = d3.select(this);

            scatterPlotMatrix.xScale.domain(p.x.domain);
            scatterPlotMatrix.yScale.domain(p.y.domain);

            var rect = cell.append('rect')
                .attr('class', 'frame')
                .attr('x', settings.padding / 2)
                .attr('y', settings.padding / 2)
                .attr('width', settings.size - settings.padding)
                .attr('height', settings.size - settings.padding);

            var bivariateData = data
                .filter(d =>
                    d[settings.measure_col] === p.x.measure ||
                    d[settings.measure_col] === p.y.measure);
            var nested = d3.nest()
                .key(d => settings.keys.map(key => d[key]).concat(d[settings.group_col]).join('||'))
                .rollup(d => {
                    var results = {};
                    d.forEach(di => {
                        var measure = di[settings.measure_col];
                        results[measure] = di[settings.result_col];
                    });
                    return results;
                })
                .entries(bivariateData);
            var transposed = [];
            nested.forEach((d,i) => {
                settings.keys
                    .forEach((key,j) => {
                        d.values[key] = d.key.split('||')[j];
                    });
                d.values[settings.group_col] = d.key.split('||')[settings.keys.length];
                transposed.push(d.values);
            });
            var points = cell.selectAll('circle')
                    .data(transposed)
                    .enter()
                .append('circle')
                .attr('cx', function(d) { return scatterPlotMatrix.xScale(d[p.x.measure]); })
                .attr('cy', function(d) { return scatterPlotMatrix.yScale(d[p.y.measure]); })
                .attr('r', 4)
                .style('fill', function(d) { return scatterPlotMatrix.colorScale(d[settings.group_col]); });
        }

        var cells = svg.selectAll('g.cell')
                .data(scatterPlotMatrix.data.crossed)
                .enter()
            .append('g')
            .classed('cell', true)
            .attr('transform', function(d) {
                var x = (settings.nMeasures - d.i - 1) * settings.size;
                var y = d.j * settings.size;
                return 'translate(' + x + ',' + y + ')'; })
            .each(plot);

      //Titles for the diagonal.
        cells.filter(function(d) { return d.i === d.j; })
            .append('text')
            .attr('x', settings.padding)
            .attr('y', settings.padding)
            .attr('dy', '.71em')
            .text(function(d) {
                return d.x.measure; });

      //Brushing.
        var brush = d3.svg.brush()
            .x(scatterPlotMatrix.xScale)
            .y(scatterPlotMatrix.yScale)
            .on('brushstart', brushstart)
            .on('brush', brushmove)
            .on('brushend', brushend);
        var brushCell;

      //Clear the previously-active brush, if any.
        function brushstart(p) {
            if (brushCell !== this) {
                d3.select(brushCell).call(brush.clear());
                scatterPlotMatrix.xScale.domain(p.x.domain);
                scatterPlotMatrix.yScale.domain(p.y.domain);
                brushCell = this;
            }
        }

      //Highlight the selected circles.
        function brushmove(p) {
            var e = brush.extent();
            svg.selectAll('circle')
                .classed('hidden', function(d) {
                    return e[0][0] > d[p.x.measure] || d[p.x.measure] > e[1][0]
                        || e[0][1] > d[p.y.measure] || d[p.y.measure] > e[1][1];
                });
        }

      //If the brush is empty, select all circles.
        function brushend() {
            if (brush.empty())
                svg.selectAll('.hidden')
                    .classed('hidden', false);
        }

        cells.call(brush);

        return scatterPlotMatrix;
    }
