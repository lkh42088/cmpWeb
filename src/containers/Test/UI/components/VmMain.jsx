import React, {useState} from 'react';
import {
    Card, CardBody, Col, Progress, Row,
} from 'reactstrap';
import {
    Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import Panel from "../../../../shared/components/Panel";
import getTooltipStyles from "../../../../shared/helpers";

const OsImg = `${process.env.PUBLIC_URL}/img/OS_Windows.ico`;

const data = [
    {
        name: '12',
        uv: 4000,
    },
    {
        name: '13',
        uv: 3000,
    },
    {
        name: '14.03',
        uv: 2000,
    },
    {
        name: '15.03',
        uv: 2780,
    },
    {
        name: '16.03',
        uv: 1890,
    },
    {
        name: '17.03',
        uv: 2390,
    },
    {
        name: '18.03',
        uv: 3490,
    },
    {
        name: '19.03',
        uv: 3490,
    },
    {
        name: '20',
        uv: 3490,
    },
    {
        name: '21.5',
        uv: 3490,
    },
];

const BounceRateArea = ({themeName}) => (
    <ResponsiveContainer height={150}>
        <AreaChart
            data={data}
            margin={{
                top: 0,
                right: 0,
                left: -15,
                bottom: 0,
            }}
        >
            <XAxis dataKey="name" tickLine={false}/>
            <YAxis tickLine={false}/>
            <CartesianGrid vertical={false}/>
            <Tooltip {...getTooltipStyles(themeName, 'defaultItems')} />
            <Area type="monotone" dataKey="uv" stroke="#5ca0d3" fill="#5ca0d3" fillOpacity={0.2}/>
        </AreaChart>
    </ResponsiveContainer>
);

const VmMain = () => (
    <Col md={12} lg={12} xl={12}>
        <Card>
            <CardBody className="vm__card">
                <div className="vm__stats">
                    <div className="vm__stat">
                        <p className="vm__stat-mainTitle">
                            <img className="vm__os-img" src={OsImg} alt="os"/>
                            &nbsp;VM 이름
                        </p>
                    </div>
                </div>

                <div className="vm__stats_border-none">
                    <div className="vm__stat_border-none">
                        <p className="vm__stat-title">CPU</p>
                    </div>
                    <div className="vm__stat_border-none">
                        <p className="vm__stat-title">4 cores</p>
                    </div>
                    <div className="vm__stat_border-none">
                        <p className="vm__stat-graph">
                            <Progress animated value={15}>15%</Progress>
                        </p>
                    </div>
                </div>

                <div className="vm__stats_border-none">
                    <div className="vm__stat_border-none">
                        <p className="vm__stat-title">RAM</p>
                    </div>
                    <div className="vm__stat_border-none">
                        <p className="vm__stat-title">8,192 MB</p>
                    </div>
                    <div className="vm__stat_border-none">
                        <p className="vm__stat-graph">
                            <Progress animated value={35}>35%</Progress>
                        </p>
                    </div>
                </div>

                <div className="vm__stats_border-none last-border">
                    <div className="vm__stat_border-none">
                        <p className="vm__stat-title">HDD</p>
                    </div>
                    <div className="vm__stat_border-none">
                        <p className="vm__stat-title">100 GB</p>
                    </div>
                    <div className="vm__stat_border-none">
                        <p className="vm__stat-graph">
                            <Progress animated value={60}>60%</Progress>
                        </p>
                    </div>
                </div>

                <div className="vm__stats">
                    <div className="vm__stat" style={{
                        height: "180px",
                    }}>
                        <p className="vm__stat-title">
                            Traffic
                        </p>
                        <BounceRateArea/>
                    </div>
                </div>

                <div className="vm__stats">
                    <div className="vm__stat">
                        <p className="vm__stat-title">VM IP</p>
                    </div>
                    <div className="vm__stat">
                        <p className="vm__stat-title">192.168.0.77</p>
                    </div>
                </div>

                <div className="vm__stats">
                    <div className="vm__stat">
                        <p className="vm__stat-title">내부접속 IP</p>
                    </div>
                    <div className="vm__stat">
                        <p className="vm__stat-title">192.168.0.100:15001</p>
                    </div>
                </div>

                <div className="vm__stats">
                    <div className="vm__stat">
                        <p className="vm__stat-title">외부접속 IP</p>
                    </div>
                    <div className="vm__stat">
                        <p className="vm__stat-title">119.1.1.10:15001</p>
                    </div>
                </div>

                <div className="vm__stats">
                    <div className="vm__stat">
                        <p className="vm__stat-title">OS</p>
                    </div>
                    <div className="vm__stat">
                        <p className="vm__stat-title">Windows</p>
                    </div>
                </div>

                {/* <div className="vm__stats">
                    <div className="vm__stat">
                        <p className="vm__stat-title">내부접속 192.168.0.100:15001</p>
                    </div>
                </div>

                <div className="vm__stats">
                    <div className="vm__stat">
                        <p className="vm__stat-title"> 외부접속 119.1.1.10:15001</p>
                    </div>
                </div>*/}
            </CardBody>
        </Card>
    </Col>
);

export default VmMain;
