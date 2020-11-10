/* eslint-disable no-underscore-dangle,react/no-did-mount-set-state */
import React, { PureComponent, Fragment } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { Bar } from 'react-chartjs-2';

const options = {
    legend: {
        position: 'bottom',
        labels: {
            fontColor: 'rgb(204, 204, 204)',
        },
    },
    scales: {
        xAxes: [
            {
                gridLines: {
                    color: 'rgb(204, 204, 204, 0.1)',
                    // borderDash: [3, 3],
                },
                ticks: {
                    fontColor: 'rgb(204, 204, 204)',

                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    color: 'rgb(204, 204, 204, 0.1)',
                    // borderDash: [1, 1],
                },
                ticks: {
                    fontColor: 'rgb(204, 204, 204, 0.7)',
                },
            },
        ],
    },
};

const GraphBarTemp = (prop) => {
    const {height, data} = prop;
    /*console.log("GraphBarTemp data : ", data);
    console.log("GraphBarTemp height : ", height);*/
    return (
        <Fragment>
            <Card className="cb-card">
                <CardBody className="nb-card-body-graph">
                    <Bar data={data} options={options} height={height}/>
                </CardBody>
            </Card>
        </Fragment>
    );
};

export default GraphBarTemp;
