/* eslint-disable no-underscore-dangle,react/no-did-mount-set-state */
import React, { PureComponent, Fragment } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const initialState = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: '#FF6384',
            borderColor: '#FF6384',
            borderWidth: 1,
            hoverBackgroundColor: '#FF6384',
            hoverBorderColor: '#FF6384',
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

const TopManagerBar = () => {
    console.log("TopManagerBar test");
    return (
        <Fragment>
            <Card className="cb-card">
                <CardBody className="cb-card-body">
                    <Bar data={initialState} options={options} />
                </CardBody>
            </Card>
        </Fragment>
    );
};

export default TopManagerBar;
