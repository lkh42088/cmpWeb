import React from 'react';
import {
    PieChart, Pie, ResponsiveContainer, BarChart, Bar, XAxis, CartesianGrid, Tooltip, Legend, YAxis, LabelList,
} from 'recharts';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
    Card, CardBody,
} from "reactstrap";

const CustomerBilling = ({ t, numData, barData }) => {
    function CustomTooltip({ payload, label, active }) {
        let total = 0;
        const cost = payload.forEach((value) => {
            total += value.value;
        });

        if (active) {
            return (
                <div className="custom-tooltip"
                    style={{
                        backgroundColor: '#2a2a31',
                        opacity: 0.9,
                        border: '1px solid #d5d5d5',
                        borderRadius: 3,
                        margin: 20,
                        padding: 10,
                    }}
                >
                    <p className="label" style={{color: "#FFFFFF"}}>{`${label} : ${total} 원`}</p>
                    {(label === "이번달") ? <br /> : ""}
                    <p className="desc" style={{color: "#f50057"}}>{(label === "이번달") ? "미정산 예상 금액으로 추후 변경될 수 있습니다." : "" }</p>
                </div>
            );
        }

        return null;
    }

    const BillingBarGraph = (
        <BarChart data={barData || null} >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{
                border: '1px solid #d5d5d5',
                borderRadius: 3,
                lineHeight: '40px',
            }}/>
            <Bar dataKey="server" stackId="x" fill="#4ce1b6" barSize={80} barCategoryGap="10">
                <LabelList dataKey="server" styles={{fill: "#FFFFFF"}}/>
            </Bar>
            <Bar dataKey="kt" stackId="x" fill="#ffb04c">
                <LabelList dataKey="kt" styles={{fill: "#FFFFFF"}}/>
            </Bar>
            <Bar dataKey="aws" stackId="x" fill="#80d6ff">
                <LabelList dataKey="aws" styles={{fill: "#FFFFFF"}}/>
            </Bar>
        </BarChart>
    );

    return (
        <Card className="cb-card" >
            <CardBody className="cb-card-body" style={{display: "flex"}}>
                <div className="dashboard" style={{width: "60%"}}>
                    <div className="dashboard__stat dashboard__stat--budget">
                        <div className="dashboard__stat-main">
                            <p className="dashboard__stat-main-title">전체 요금</p>
                            <p className="dashboard__stat-main-number">￦816,000</p>
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
                                <p style={{color: '#64677b'}}>지난달</p>
                            </div>
                            <div>
                                <p className="dashboard__stat-data-number">￦355,000</p>
                                <p style={{color: '#4ce1b6'}}>이번달</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{width: "40%"}} >
                    <div className="dashboard__chart-container">
                        <ResponsiveContainer height={430} >
                            {BillingBarGraph}
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
