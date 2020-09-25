/* eslint-disable no-underscore-dangle,react/no-did-mount-set-state */
import React, { PureComponent, Fragment } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const initialState = {
    labels: ['A', 'B', 'C', 'D', 'E'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: '#a2d5f2',
            borderColor: '#a2d5f2',
            borderWidth: 1,
            hoverBackgroundColor: '#07689f',
            hoverBorderColor: '#07689f',
            data: [65, 59, 80, 81, 56, 55, 45],
        },
    ],
};

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
                    borderDash: [3, 3],
                },
                ticks: {
                    fontColor: 'rgb(204, 204, 204)',
                },
            },
        ],
    },
};

const GraphBar = (prop) => {
    const {height} = prop;
    console.log("TopManagerBar test");
    return (
        <Fragment>
            <Card className="cb-card">
                <CardBody className="cb-card-body">
                    <div className="card__title">
                        <h5 className="bold-text">[___] Usage Top 5</h5>
                    </div>
                    <Bar data={initialState} options={options} height={height}/>
                </CardBody>
            </Card>
        </Fragment>
    );
};

export default GraphBar;
