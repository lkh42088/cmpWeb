import React, {useEffect, useState} from 'react';
import {
    PieChart, Pie, ResponsiveContainer, BarChart, Bar, Cell, XAxis, CartesianGrid, Tooltip, Legend, YAxis, LabelList,
} from 'recharts';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
    Card, CardBody, Col, Row,
} from "reactstrap";

const tmpData = [
    {
        name: '지난달', server: 0, kt: 0, aws: 0,
    },
    {
        name: '이번달', server: 0, kt: 0, aws: 0,
    }];
            // {/*<ResponsiveContainer height={400}>*/}
            // {/*    <BarChart data={Object.entries(data)}>*/}
            // {/*        <XAxis dataKey="name"/>*/}
            // {/*        <YAxis unit="원"/>*/}
            // {/*        /!*<CartesianGrid strokeDasharray="3 3"/>*!/*/}
            // {/*        <Tooltip/>*/}
            // {/*        <Legend/>*/}
            // {/*        <Bar dataKey="server" stackId="x">*/}
            // {/*            <Cell*/}
            // {/*                cursor="pointer"*/}
            // {/*                fill="#4ce1b6"*/}
            // {/*            />*/}
            // {/*        </Bar>*/}
            // {/*        <Bar dataKey="kt" stackId="x">*/}
            // {/*            <Cell*/}
            // {/*                cursor="pointer"*/}
            // {/*            />*/}
            // {/*        </Bar>*/}
            // {/*        <Bar dataKey="aws" stackId="x">*/}
            // {/*            <Cell*/}
            // {/*                cursor="pointer"*/}
            // {/*            />*/}
            // {/*        </Bar>*/}
            // {/*    </BarChart>*/}
            // {/*</ResponsiveContainer>*/}

const CustomerBilling = ({ t, numData, barData }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [select, setSelect] = useState(0);
    let prev;
    let current;
    // data.map((entry, idx) => {
    //     if (idx === 0) {
    //         prev = entry.server + entry.kt + entry.aws;
    //         return prev;
    //     }
    //     current = entry.server + entry.kt + entry.aws;
    //     return current;
    // });

    // const prev = data.server[0] + data.kt[0] + data.aws[0];
    // const current = data[1].server + data[1].kt + data[1].aws;

    const handleClick = (e, index) => {
        // const index = data.indexOf(item.payload);
        setActiveIndex({
            activeIndex: index,
        });
    };

    const colorBar = {
        server: "navy",
        kt: "red",
        aws: "aqua",
    };

    const tempComponent = (
            // barData && barData.map(entry => (
                <BarChart >
                    <XAxis dataKey="name" />
                    <YAxis unit="원"/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Legend/>
                    <Bar dataKey="server" stackId="x" fill="#4ce1b6">
                        <LabelList dataKey="server" styles={{fill: "#FFFFFF"}}/>
                    </Bar>
                    <Bar dataKey="kt" stackId="x" fill="red">
                        <LabelList dataKey="kt" styles={{fill: "#FFFFFF"}}/>
                    </Bar>
                    <Bar dataKey="aws" stackId="x" fill="blue">
                        <LabelList dataKey="aws" styles={{fill: "#FFFFFF"}}/>
                    </Bar>
                </BarChart>
            );
// );

    useEffect(() => {
        if (barData) {
            setSelect({
                // select: barData[activeIndex].amt,
            });
        }
    }, [activeIndex]);
    
    return (
        <Card className="cb-card" >
            <CardBody className="cb-card-body" style={{display: "flex"}}>
                <div className="dashboard">
                    <div className="dashboard__stat dashboard__stat--budget">
                        <div className="dashboard__stat-main">
                            <p className="dashboard__stat-main-title">전체 요금</p>
                            <p className="dashboard__stat-main-number">￦816,000</p>
                            {/*<p className="dashboard__stat-main-number">￦{prev + current}</p>*/}
                            <hr/>
                        </div>
                        <div className="dashboard__stat-chart">
                            <PieChart height={200} width={180}>
                                <Pie data={numData} dataKey="value" cx={85} cy={90} innerRadius={50} outerRadius={60}/>
                            </PieChart>
                            <p className="dashboard__stat-label">￦</p>
                        </div>
                        <div className="dashboard__stat-data">
                            <div>
                                <p className="dashboard__stat-data-number">￦461,000</p>
                                {/*<p className="dashboard__stat-data-number">￦{prev}</p>*/}
                                <p style={{color: '#64677b'}}>지난달</p>
                            </div>
                            <div>
                                <p className="dashboard__stat-data-number">￦355,000</p>
                                {/*<p className="dashboard__stat-data-number">￦{current}</p>*/}
                                <p style={{color: '#4ce1b6'}}>이번달</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{width: "50%"}} >
                    <div className="dashboard__chart-container">
                        <ResponsiveContainer height={400} >
                            {tempComponent}
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

CustomerBilling.propTypes = {
    t: PropTypes.func.isRequired,
};

export default withTranslation('common')(CustomerBilling);
