import React from 'react';
import {
    Area, AreaChart, linearGradient, Tooltip, XAxis, YAxis,
} from "recharts";

const SmallTrafficMonitor = (props) => {
    const {
        data, hostname, stroke,
    } = props;

    return (
        <div>
            <p><b>{hostname}</b></p>
            <AreaChart data={data} width={200} height={80}
                       margin={{
                           top: 0, right: 15, left: 0, bottom: 0,
                       }}>
                <defs>
                    <linearGradient id="first" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#86daff" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#86daff" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                {/*<XAxis dataKey="x" height={0} tickLine={false} tick={false}/>*/}
                {/*<YAxis tickLine={false} tick={false} width={0}/>*/}
                <XAxis dataKey="x" height={15} tickLine={false} tick={false}/>
                <YAxis dataKey="y" tickLine={false} width={0} tick={false}/>
                <Tooltip />
                {/*<Area type="monotone" dataKey="y" stroke={stroke} fillOpacity={0.5} fill="url(#first)" />*/}
                <Area type="monotone" dataKey="y" stroke={stroke} fillOpacity={0.1} fill={stroke} />
            </AreaChart>
        </div>
    );
};

export default SmallTrafficMonitor;
