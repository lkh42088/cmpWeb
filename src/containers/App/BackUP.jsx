import React from 'react';
import {
    Card, CardBody, Col, Progress, Row,
} from 'reactstrap';
import {
    Area, AreaChart, Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis,
} from "recharts";

const todoSidebarImg = `${process.env.PUBLIC_URL}/img/OS_Windows.ico`;

const data = [
    { name: 'Page A', pv: 25 },
    { name: 'Page B', pv: 30 },
    { name: 'Page C', pv: 55 },
    { name: 'Page D', pv: 42 },
    { name: 'Page E', pv: 85 },
    { name: 'Page F', pv: 45 },
    { name: 'Page G', pv: 21 },
    { name: 'Page H', pv: 56 },
    { name: 'Page I', pv: 68 },
    { name: 'Page J', pv: 32 },
];

const CustomTooltip = ({active, payload}) => {
    if (active) {
        return (
            <div className="dashboard__total-tooltip">
                <p className="label">{`$${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

const VmMain = () => (
    <Col md={12} lg={12} xl={12}>
        <Card>
            <CardBody className="vm__card">
                <div className="vm__stats">
                    <div className="vm__stat">
                        <p className="vm__stat-mainTitle">
                            <img className="vm__os-img" src={todoSidebarImg} alt="os" />
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
                        height: "103px",
                    }}>
                        <p className="vm__stat-title">
                            Traffic
                        </p>
                        <p className="vm__stat-title">
                            <ResponsiveContainer height={70}>
                                <AreaChart data={data} margin={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                }}>
                                    <Tooltip content={<CustomTooltip/>}/>
                                    <XAxis
                                        hide
                                    />
                                    <Area
                                        name="BCH"
                                        type="monotone"
                                        dataKey="bch"
                                        fill="#6faae1"
                                        stroke="#6faae1"
                                        fillOpacity={0.2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>

                            <ResponsiveContainer height={50}>
                                <BarChart data={data}>
                                    <Bar dataKey="pv" onClick={this.handleClick}>
                                        {
                                            data.map((entry, index) => (
                                                <Cell
                                                    cursor="pointer"
                                                    fill={index === activeIndex ? '#4ce1b6' : '#f6da6e'}
                                                    key={`cell-${index}`}
                                                />
                                            ))
                                        }
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </p>
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
