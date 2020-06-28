import React, {useEffect, useState} from 'react';
import {
    PieChart, Pie, ResponsiveContainer, BarChart, Bar, Cell,
} from 'recharts';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {Card, CardBody} from "reactstrap";
import Panel from '../../../../shared/components/Panel';

const CustomerBilling = ({ t, numData, barData }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [select, setSelect] = useState(0);

    const handleClick = (e, index) => {
        // const index = data.indexOf(item.payload);
        setActiveIndex({
            activeIndex: index,
        });
    };

    useEffect(() => {
        if (barData) {
            setSelect({
                select: barData[activeIndex].amt,
            });
        }
    }, [activeIndex]);

    return (
        <Card className="cb-card" >
            <CardBody className="cb-card-body dashboard" style={{display: "flex"}}>
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
                <div style={{width: "30%"}} className="dashboard__card-widget">
                    <div className="dashboard__total dashboard__chart-container" >
                        <ResponsiveContainer height={350}>
                            <BarChart data={barData} >
                                <Bar dataKey="amt">
                                    {
                                        barData.map((entry, index) => (
                                            <Cell
                                                cursor="pointer"
                                                fill={index === activeIndex ? '#4ce1b6' : '#70bbfd'}
                                                // key={`cell-${index}`}
                                            />
                                        ))
                                    }
                                </Bar>
                            </BarChart>
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
