/* eslint-disable no-underscore-dangle,react/no-did-mount-set-state */
import React, { PureComponent, Fragment } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const options = {
    legend: {
        position: 'bottom',
    },
    scales: {
        xAxes: [
            {
                gridLines: {
                    color: 'rgb(204, 204, 204)',
                    borderDash: [3, 3],
                },
                ticks: {
                    fontColor: 'rgb(204, 204, 204)',
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    color: 'rgb(204, 204, 204)',
                    borderDash: [1, 1],
                },
                ticks: {
                    fontColor: 'rgb(204, 204, 204)',
                },
            },
        ],
    },
};

const GraphBar = (prop) => {
    const {height, data} = prop;
    // console.log("TopManagerBar : ", data);
    return (
        <Fragment>
            <Card className="cb-card">
                <CardBody className="cb-card-body">
                    {/*<div className="card__title">*/}
                    {/*    <h5 className="bold-text">[___] Usage Top 5</h5>*/}
                    {/*</div>*/}
                    <Bar data={data} options={options} height={height}/>
                </CardBody>
            </Card>
        </Fragment>
    );
};

export default GraphBar;
