import { set } from 'd3';
import { dataOps } from 'webcharts';
import addBoxplot from './util/addBoxplot';
import smallMult from './smallMultiples';
import adjustTicks from './util/adjustTicks';

export default function onResize(){
    let chart = this;
    const config = this.config;

  //Highlight lines and point corresponding to an ID.
    function highlight(id) {
        const myLine = chart.svg.selectAll('.line')
            .filter(d => d.values[0].values.raw[0][config.id_col] === id[config.id_col]);
        myLine.select('path')
            .attr('stroke-width',4)
        
        const myPoints = chart.svg.selectAll('.point')
            .filter(d => d.values.raw[0][config.id_col] === id[config.id_col]);
        myPoints.select('circle')
            .attr('r',4)
    }

  //Remove highlighting.
    function clearHighlight() {
        chart.svg.selectAll('.line:not(.selected)').select('path').attr('stroke-width',.5);
        chart.svg.selectAll('.point:not(.selected)').select('circle').attr('r',2);
    }

  //Set up event listeners on lines and points
    this.svg.selectAll('.line')
        .on('mouseover',function(d){ 
            const id = chart.raw_data
                .filter(di => di[config.id_col] === d.values[0].values.raw[0][config.id_col])[0];
            highlight(id);
        })
        .on('mouseout', clearHighlight)
        .on('click',function(d) {
            const id = chart.raw_data
                .filter(di => di[config.id_col] === d.values[0].values.raw[0][config.id_col])[0];

          //Un-select all lines and points.
            chart.svg.selectAll('.line').classed('selected', false);
            chart.svg.selectAll('.point').classed('selected', false);

          //Select line and all points corresponding to selected ID.
            d3.select(this).classed('selected', true);
            chart.svg.selectAll('.point')
                .filter(d => d.values.raw[0][config.id_col] === id[config.id_col])
                .classed('selected', true);

          //Generate small multiples and highlight marks.
            smallMult(id, chart);
            highlight(id);
        });

    this.svg.selectAll('.point')
        .on('mouseover',function(d){ 
            const id = chart.raw_data
                .filter(di => di[config.id_col] === d.values.raw[0][config.id_col])[0];
            highlight(id)
        })
        .on('mouseout',clearHighlight)
        .on('click',function(d){
            const id = chart.raw_data
                .filter(di => di[config.id_col] === d.values.raw[0][config.id_col])[0];

          //Un-select all lines and points.
            chart.svg.selectAll('.line').classed('selected', false);
            chart.svg.selectAll('.point').classed('selected', false);

          //Select line and all points corresponding to selected ID.
            chart.svg.selectAll('.line')
                .filter(function(d){return d.values[0].values.raw[0][config.id_col] === id[config.id_col]})
                .classed('selected', true);
            chart.svg.selectAll('.point')
                .filter(function(d){return d.values.raw[0][config.id_col] === id[config.id_col]})
                .classed('selected', true);

          //Generate small multiples and highlight marks.
            smallMult(id, chart);
            highlight(id);
        });


    //draw reference boxplot 
    this.svg.select('g.boxplot').remove()
    var myValues = this.current_data.map(function(d){return d.values.y}) 

    addBoxplot(
        this.svg,
        myValues, 
        this.plot_height, 
        1, 
        this.y_dom, 
        10, 
        '#bbb', 
        'white'
    )
    this.svg.select('g.boxplot').attr('transform', 'translate(' + (this.plot_width + this.config.margin.right/2) + ',0)');

    this.svg.select('.overlay').on('click', function(){
        //clear current multiples
        chart.wrap.select('.multiples').select('.wc-small-multiples').remove();
        chart.svg.selectAll('.line').classed('selected', false);
        chart.svg.selectAll('.point').classed('selected', false);
        clearHighlight();
    });

    // rotate ticks
    if (config.rotate_x_tick_labels) {
        adjustTicks.call(this, 'x', -10, 10, -45, 'end');
    } 
}
