import React, {useEffect, useState} from 'react';
import {Card, Col, CardBody} from 'reactstrap';
import {
    LineChart, Line, XAxis, YAxis, ReferenceLine, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
        fill: '#f3c623',
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
        fill: '#1eb2a6',
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
        fill: '#cfd186',
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
        fill: '#f4f6ff',
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
        fill: '#dd2c00',
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
        fill: '#6f4a8e',
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
        fill: '#6e6d6d',
    },
];

const LineChartWithReferenceLines = () => {
    console.log("test");
    return (
        <Col xs={12} md={12} lg={6} xl={6}>
            <Card>
                <CardBody>
                    <div className="card__title">
                        <h5 className="bold-text">LineChartWithReferenceLines</h5>
                    </div>
                    <div>
                        <ResponsiveContainer height={400}>
                            <LineChart width={600} height={300} data={data}
                                       margin={{
                                           top: 20,
                                           right: 50,
                                           left: 20,
                                           bottom: 5,
                                       }}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <ReferenceLine x="Page C" stroke="#fa163f" label="Max PV PAGE"/>
                                <ReferenceLine y={9800} label="Max" stroke="#fa163f"/>
                                <Line type="monotone" dataKey="pv" stroke="#333366"/>
                                <Line type="monotone" dataKey="uv" stroke="#00bcd4"/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};


export default LineChartWithReferenceLines;
