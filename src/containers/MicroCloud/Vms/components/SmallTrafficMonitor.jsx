import React from 'react';
import {
    Area, AreaChart, linearGradient, Tooltip, XAxis, YAxis,
} from "recharts";

const SmallTrafficMonitor = (props) => {
    const {
        data, hostname,
    } = props;

    return (
        <div>
            <p><b>{hostname}</b></p>
            <AreaChart data={data} width={200} height={70}
                       margin={{
                           top: 0, right: 15, left: 15, bottom: 0,
                       }}>
                <defs>
                    <linearGradient id="first" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#86daff" stopOpacity={1}/>
                        <stop offset="95%" stopColor="#86daff" stopOpacity={0.2}/>
                    </linearGradient>
                </defs>
                {/*<XAxis dataKey="x" height={0} tickLine={false} tick={false}/>*/}
                {/*<YAxis tickLine={false} tick={false} width={0}/>*/}
                <XAxis dataKey="x" height={15} tickLine={false}/>
                <YAxis dataKey="y" tickLine={false} width={15}/>
                <Tooltip />
                <Area type="monotone" dataKey="y" stroke="#1999ff" fillOpacity={1} fill="url(#first)" />
            </AreaChart>
        </div>
    );
};

export default SmallTrafficMonitor;
