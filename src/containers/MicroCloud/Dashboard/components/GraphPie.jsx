import React, {useEffect, useState, Fragment} from "react";
import {Card, CardBody} from "reactstrap";
import {
    PieChart, Pie, Sector, ResponsiveContainer,
} from 'recharts';
import InputIcon from "@material-ui/icons/Input";

import {getMcNetworksCpu} from "../../../../lib/api/microCloudCpu";

const GraphPie = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent,
    } = props;

    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 15) * cos;
    const my = cy + (outerRadius + 15) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 2;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <Fragment>
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle"
                      fill={payload.fillColor}
                      style={{
                          fontSize: "1.3rem",
                      }}>
                    {`${(percent * 100).toFixed(2)}%`}
                </text>
                <text x={cx} y={cy + 20} dy={8} textAnchor="middle"
                      className="graph_label">
                    {payload.label}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={payload.fillColor}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 5}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                {window.innerWidth < 1450 && window.innerWidth > 700 ? (
                    <Fragment>
                        &nbsp;
                    </Fragment>
                ) : (
                    <Fragment>
                        <text x={ex + (cos >= 0 ? 1 : -1) * 1} y={ey} textAnchor={textAnchor}
                              className="graph_label"
                              style={{
                                  fontSize: "x-small",
                              }}>
                            {`${payload.label}`}
                        </text>
                        {payload.labelVal ? (
                            <text x={ex + (cos >= 0 ? 1 : -1) * 1} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                                {`${payload.labelVal}`}
                            </text>
                        ) : false}
                    </Fragment>
                )}
            </g>
        </Fragment>
    );
};

export default GraphPie;
