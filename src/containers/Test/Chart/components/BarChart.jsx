// BarChart.js
import * as d3 from 'd3';
import ReactGuage from 'react-d3-guage';
//https://github.com/palerdot/react-d3-speedometer
import ReactSpeedometer from "react-d3-speedometer";
import React, { useRef, useEffect } from 'react';
import {Row} from "reactstrap";

const Circle = () => {
    const ref = useRef();

    useEffect(() => {
        const svgElement = d3.select(ref.current);
        svgElement.append("circle")
            .attr("cx", 150)
            .attr("cy", 70)
            .attr("r", 50);
    }, []);

    return (
        <svg
            ref={ref}
        />
    );
};

function BarChart({ width, height, data }) {
    const ref = useRef();

    const draw = () => {
        const svg = d3.select(ref.current);
        const selection = svg.selectAll("rect").data(data);
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, height - 100]);

        selection
            .transition().duration(300)
            .attr("height", d => yScale(d))
            .attr("y", d => height - yScale(d));

        selection
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 45)
            .attr("y", d => height)
            .attr("width", 40)
            .attr("height", 0)
            .attr("fill", "orange")
            .transition()
            .duration(300)
            .attr("height", d => yScale(d))
            .attr("y", d => height - yScale(d));

        selection
            .exit()
            .transition().duration(300)
            .attr("y", d => height)
            .attr("height", 0)
            .remove();
    };

    useEffect(() => {
        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)
            .style("border", "1px solid black");
    }, []);

    useEffect(() => {
        draw();
    }, [data]);

    return (
        <div className="chart">
            <svg ref={ref}/>
            <Circle/>
            <div>
                <ReactSpeedometer
                    maxValue={100}
                    needleHeightRatio={0.7}
                    maxSegmentLabels={5}
                    segments={3}
                    customSegmentStops={[0, 25, 50, 75, 100]}
                    segmentColors={['firebrick', 'tomato', 'gold', 'limegreen']}
                    value={50}
                    textColor="#AAA"
                />
                <ReactSpeedometer
                    forceRender
                    needleHeightRatio={0.7}
                    maxSegmentLabels={1}
                    customSegmentStops={[500, 777, 1000]}
                    needleTransitionDuration={3333}
                    segmentColors={['#5959ac', '#AAA']}
                    needleColor="#5959ac"
                    currentValueText="test"
                    minValue={500}
                    maxValue={1000}
                    value={777}
                    textColor="#AAA"
                />
                <ReactSpeedometer
                    forceRender
                    maxSegmentLabels={1}
                    // customSegmentStops={[500, 777, 1000]}
                    segmentColors={['tomato', 'gold']}
                    needleColor="#5959ac"
                    currentValueText="test"
                    minValue={-120}
                    maxValue={0}
                    value={-100}
                    customSegmentStops={[-120, -100, 0]}
                    textColor="#AAA"
                />
            </div>
        </div>
    );
}

export default BarChart;
