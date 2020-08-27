import React from 'react';
import { ResponsiveBump } from '@nivo/bump';
import {Card, CardBody} from "reactstrap";

const data = [
    {
        id: "Serie 1",
        data: [
            {
                x: 20,
                y: 596685,
            },
            {
                x: 21,
                y: 592929,
            },
            {
                x: 22,
                y: 394994,
            },
            {
                x: 23,
                y: 494944,
            },
            {
                x: 24,
                y: 4938494,
            },
        ],
    },
    {
        id: "Serie 2",
        data: [
            {
                x: 20,
                y: 1829839,
            },
            {
                x: 21,
                y: 629348,
            },
            {
                x: 22,
                y: 3298843,
            },
            {
                x: 23,
                y: 939494,
            },
            {
                x: 24,
                y: 3294393,
            },
        ],
    },
];

const MyResponsiveBump = (props) => {
    const {
        title, height,
    } = props;
    return (
        <Card className="cb-card">
            <CardBody className="cb-card-body">
                <p>{title}</p>
                <ResponsiveBump
                    data={data}
                    height={height}
                    margin={{
                        top: 40, right: 100, bottom: 40, left: 60,
                    }}
                    colors={{scheme: 'spectral'}}
                    lineWidth={3}
                    activeLineWidth={6}
                    inactiveLineWidth={3}
                    inactiveOpacity={0.15}
                    pointSize={0}
                    activePointSize={16}
                    inactivePointSize={0}
                    pointColor={{theme: 'background'}}
                    pointBorderWidth={3}
                    activePointBorderWidth={3}
                    pointBorderColor={{from: 'serie.color'}}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: '',
                        legendPosition: 'middle',
                        legendOffset: 32,
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'ranking',
                        legendPosition: 'middle',
                        legendOffset: -40,
                    }}
                />
            </CardBody>
        </Card>
    );
};

export default MyResponsiveBump;
