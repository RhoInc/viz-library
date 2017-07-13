function scatterPlotMatrix(element, data, settings) {
    var scatterPlotMatrix = {};
        scatterPlotMatrix.element = element;
        scatterPlotMatrix.selection = d3.select(element);
        scatterPlotMatrix.data = {raw: data};
        scatterPlotMatrix.settings = Object.assign({}, settings);
        scatterPlotMatrix.xScale = d3.scale.linear()
            .range([settings.padding / 2, settings.size - settings.padding / 2]);
        scatterPlotMatrix.yScale = d3.scale.linear()
            .range([settings.size - settings.padding / 2, settings.padding / 2]);
        scatterPlotMatrix.xAxis = d3.svg.axis()
            .scale(scatterPlotMatrix.xScale)
            .orient('bottom')
            .ticks(6);
        scatterPlotMatrix.yAxis = d3.svg.axis()
            .scale(scatterPlotMatrix.yScale)
            .orient('left')
            .ticks(6);
        scatterPlotMatrix.colorScale = d3.scale.category10();

    var domainByTrait = {},
        traits = Object.keys(data[0])
            .filter(function(d) {
                return settings.measures.indexOf(d) > -1; }),
        n = traits.length;

    traits.forEach(function(trait) {
        domainByTrait[trait] = d3.extent(data, function(d) { return +d[trait]; });
    });

    scatterPlotMatrix.xAxis.tickSize(settings.size * n);
    scatterPlotMatrix.yAxis.tickSize(-settings.size * n);

    var svg = d3.select(element).append('svg')
        .attr('width', settings.size * n + settings.padding)
        .attr('height', settings.size * n + settings.padding)
        .append('g')
        .attr('transform', 'translate(' + settings.padding + ',' + settings.padding / 2 + ')');

    svg.selectAll('g.x.axis')
            .data(traits)
            .enter()
        .append('g')
        .classed('x axis', true)
        .attr('transform', function(d, i) {
            return 'translate(' + (n - i - 1) * settings.size + ',0)'; })
        .each(function(d) {
            scatterPlotMatrix.xScale.domain(domainByTrait[d]);
            d3.select(this).call(scatterPlotMatrix.xAxis);
        });

    svg.selectAll('g.y.axis')
            .data(traits)
            .enter()
        .append('g')
        .classed('y axis', true)
        .attr('transform', function(d, i) {
            return 'translate(0,' + i * settings.size + ')'; })
        .each(function(d) {
            scatterPlotMatrix.yScale.domain(domainByTrait[d]);
            d3.select(this).call(scatterPlotMatrix.yAxis);
        });

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

    function plot(p) {
        var cell = d3.select(this);

        scatterPlotMatrix.xScale.domain(domainByTrait[p.x]);
        scatterPlotMatrix.yScale.domain(domainByTrait[p.y]);

        var rect = cell.append('rect')
            .attr('class', 'frame')
            .attr('x', settings.padding / 2)
            .attr('y', settings.padding / 2)
            .attr('width', settings.size - settings.padding)
            .attr('height', settings.size - settings.padding);

        var points = cell.selectAll('circle')
                .data(data)
                .enter()
            .append('circle')
            .attr('cx', function(d) { return scatterPlotMatrix.xScale(d[p.x]); })
            .attr('cy', function(d) { return scatterPlotMatrix.yScale(d[p.y]); })
            .attr('r', 4)
            .style('fill', function(d) { return scatterPlotMatrix.colorScale(d[settings.group_col]); });
    }

    var crossed = cross(traits,traits);
    var cells = svg.selectAll('g.cell')
            .data(crossed)
            .enter()
        .append('g')
        .classed('cell', true)
        .attr('transform', function(d) {
            var x = (n - d.i - 1) * settings.size;
            var y = d.j * settings.size;
            return 'translate(' + x + ',' + y + ')'; })
        .each(plot);

    // Titles for the diagonal.
    cells.filter(function(d) { return d.i === d.j; })
        .append('text')
        .attr('x', settings.padding)
        .attr('y', settings.padding)
        .attr('dy', '.71em')
        .text(function(d) {
            return d.x; });

    var brush = d3.svg.brush()
        .x(scatterPlotMatrix.xScale)
        .y(scatterPlotMatrix.yScale)
        .on('brushstart', brushstart)
        .on('brush', brushmove)
        .on('brushend', brushend);
    var brushCell;

    // Clear the previously-active brush, if any.
    function brushstart(p) {
        if (brushCell !== this) {
            d3.select(brushCell).call(brush.clear());
            scatterPlotMatrix.xScale.domain(domainByTrait[p.x]);
            scatterPlotMatrix.yScale.domain(domainByTrait[p.y]);
            brushCell = this;
        }
    }

    // Highlight the selected circles.
    function brushmove(p) {
        var e = brush.extent();
        svg.selectAll('circle')
            .classed('hidden', function(d) {
                return e[0][0] > d[p.x] || d[p.x] > e[1][0]
                    || e[0][1] > d[p.y] || d[p.y] > e[1][1];
            });
    }

    // If the brush is empty, select all circles.
    function brushend() {
        if (brush.empty()) svg.selectAll('.hidden').classed('hidden', false);
    }

    cells.call(brush);

    return scatterPlotMatrix;
}
