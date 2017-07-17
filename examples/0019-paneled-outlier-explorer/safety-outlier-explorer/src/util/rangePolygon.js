import { svg } from 'd3';

export default function rangePolygon(chart) {

    var area = svg.area()
        .x(function(d){ 
            return chart.x(d["TIME"])
        }) 
        .y0(function(d){ 
            var lbornlo = d['STNRLO'];
            return lbornlo !== 'NA' ? chart.y(+lbornlo) : 0
        })
        .y1(function(d) { 
            var lbornrhi = d['STNRHI'];
            return lbornrhi !== 'NA' ? chart.y(+lbornrhi) : 0
        });

    var dRow = chart.filtered_data[0];

    var myRows = chart.x_dom.slice().map(m => {
        return {
            STNRLO: dRow[chart.config.normal_col_low],
            STNRHI: dRow[chart.config.normal_col_high],
            TIME: m
        };
    });
    //remove what is there now
    chart.svg.select('.norms').remove();
    //add new
    chart.svg.append("path")
        .datum(myRows)
        .attr("class","norms")
        .attr("fill","blue")
        .attr("fill-opacity",0.1)
        .attr("d",area);
}
