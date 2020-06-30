/* eslint-disable react/no-array-index-key */
import React, {PureComponent, useEffect, useState} from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import {
    BarChart, Bar, Cell, ResponsiveContainer,
} from 'recharts';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const TotalViews = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [select, setSelect] = useState(0);
    const {
        t, cardTitle, color, data,
    } = props;

    const handleClick = (e) => {
        const index = data.indexOf(e.payload);
        setActiveIndex(index);
    };

    // Bar color
    let tmpColor = '#70bbfd';
    if (color) {
        tmpColor = color;
    }

    useEffect(() => {
        if (data) {
            setSelect(data[0].amt);
        }
    }, []);

    const activeItem = data[activeIndex];

    return (
        <Card className="cb-card">
            <CardBody className="cb-card-body" >
                <div className="cb-card__title">
                    <div style={{float: "left"}}>
                        <p>{cardTitle}</p>
                    </div>
                    <div className="dashboard__total" style={{float: "right"}}>
                        <TrendingUpIcon className="dashboard__trend-icon" />
                        <p className="dashboard__total-stat">
                            {activeItem.amt}
                        </p>
                    </div>
                    <div>
                        <div className="dashboard__chart-container">
                            <ResponsiveContainer height={90}>
                                <BarChart data={data}>
                                    <Bar dataKey="amt" onClick={handleClick}>
                                        {
                                            data.map((entry, index) => (
                                                <Cell
                                                    cursor="pointer"
                                                    fill={index === activeIndex ? '#4ce1b6' : tmpColor}
                                                    key={`cell-${index}`}
                                                />
                                            ))
                                        }
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

TotalViews.propTypes = {
    t: PropTypes.func.isRequired,
};

export default withTranslation('common')(TotalViews);
