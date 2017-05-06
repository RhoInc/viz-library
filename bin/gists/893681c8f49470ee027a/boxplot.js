//modified from: http://bl.ocks.org/z-m-k/5014368

function addBoxPlot(svg, results, height, width, domain, boxPlotWidth, boxColor, boxInsideColor){
        var y = d3.scale.linear()
                    .range([height, 0])
                    .domain(domain);

        var x = d3.scale.linear()
                    .range([0, width])

        var left=0.5-boxPlotWidth/2;
        var right=0.5+boxPlotWidth/2;

        var probs=[0.05,0.25,0.5,0.75,0.95];
        for(var i=0; i<probs.length; i++){
            probs[i]=y(d3.quantile(results, probs[i]))
        }

        svg.append("rect")
            .attr("class", "boxplot fill")
            .attr("x", x(left))
            .attr("width", x(right)-x(left))
            .attr("y", probs[3])
            .attr("height", -probs[3]+probs[1])
            .style("fill", boxColor);

        var iS=[0,2,4];
        var iSclass=["","median",""];
        var iSColor=[boxColor, boxInsideColor, boxColor]
        for(var i=0; i<iS.length; i++){
            svg.append("line")
                .attr("class", "boxplot "+iSclass[i])
                .attr("x1", x(left))
                .attr("x2", x(right))
                .attr("y1", probs[iS[i]])
                .attr("y2", probs[iS[i]])
                .style("fill", iSColor[i])
                .style("stroke", iSColor[i]);
        }

        var iS=[[0,1],[3,4]];
        for(var i=0; i<iS.length; i++){
            svg.append("line")
                .attr("class", "boxplot")
                .attr("x1", x(0.5))
                .attr("x2", x(0.5))
                .attr("y1", probs[iS[i][0]])
                .attr("y2", probs[iS[i][1]])
                .style("stroke", boxColor);
        }

        svg.append("rect")
            .attr("class", "boxplot")
            .attr("x", x(left))
            .attr("width", x(right)-x(left))
            .attr("y", probs[3])
            .attr("height", -probs[3]+probs[1])
            .style("stroke", boxColor)
            .style("fill", boxColor);

        svg.append("circle")
            .attr("class", "boxplot mean")
            .attr("cx", x(0.5))
            .attr("cy", y(d3.mean(results)))
            .attr("r", x(boxPlotWidth/5))
            .style("fill", boxInsideColor)
            .style("stroke", 'None');

        svg.append("circle")
            .attr("class", "boxplot mean")
            .attr("cx", x(0.5))
            .attr("cy", y(d3.mean(results)))
            .attr("r", x(boxPlotWidth/10))
            .style("fill", boxColor)
            .style("stroke", 'None');
};

