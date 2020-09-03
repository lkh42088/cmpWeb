import React, {useEffect, useRef, useState} from 'react';
import {
    Area, AreaChart, Tooltip, linearGradient, XAxis, YAxis,
} from "recharts";
import {Card, CardBody} from "reactstrap";

const NBSmallAreaChart = (props) => {
    const {
        data, hostname, gridCount,
    } = props;
    const [width, setWidth] = useState();

    const division = 12 / gridCount; // grid area
    const SIDEBAR_WIDTH = 420;
    const updateSize = () => {
        setWidth((window.innerWidth - SIDEBAR_WIDTH) / division);
    };

    useEffect(() => {
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    });

    useEffect(() => {
        setWidth((window.innerWidth - SIDEBAR_WIDTH) / division);
    }, []);

    return (
        <Card className="cb-card" >
            <CardBody className="cb-card-body" >
                <p><b>{hostname}</b></p>
                <AreaChart data={data} width={width} height={100}
                           margin={{
                               top: 0, right: 0, left: 0, bottom: 0,
                           }} >
                    <defs>
                        <linearGradient id="first" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#86daff" stopOpacity={1}/>
                            <stop offset="95%" stopColor="#86daff" stopOpacity={0.2}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="x" height={15} tickLine={false}/>
                    <YAxis tickLine={false} width={35}/>
                    <Tooltip />
                    <Area type="monotone" dataKey="y" stroke="#1999ff" fillOpacity={1} fill="url(#first)" />
                </AreaChart>
            </CardBody>
        </Card>
    );
};

export default NBSmallAreaChart;
