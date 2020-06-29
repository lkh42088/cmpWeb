/* eslint-disable react/no-array-index-key */
import React, {PureComponent, useEffect, useState} from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import {
    BarChart, Bar, Cell, ResponsiveContainer,
} from 'recharts';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Data structure
// const data = [
//     { name: 'Page A', amt: 2400 },
//     { name: 'Page B', amt: 2210 },
// ];

const TotalViews = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [select, setSelect] = useState(0);
    const {cardTitle, color, data} = props;

    const handleClick = (e, index) => {
        // const index = data.indexOf(item.payload);
        setActiveIndex({
            activeIndex: index,
        });
    };

    // Bar color
    let tmpColor = '#70bbfd';
    if (color) {
        tmpColor = color;
    }

    useEffect(() => {
        if (data) {
            setSelect({
                select: data[activeIndex].amt,
            });
        }
    }, [activeIndex]);

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
                            {/*{select}*/}
                            {data[0].amt}
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
    // eslint-disable-next-line react/no-unused-prop-types
    t: PropTypes.func.isRequired,
};

export default withTranslation('common')(TotalViews);
