import React, {useEffect, useState, Fragment} from 'react';
import {ResponsivePie} from '@nivo/pie';
import {Card, CardBody} from "reactstrap";
import {ResponsiveContainer} from "recharts";

const MyResponsivePie = (props) => {
    const {data, height} = props;
    return (
        <Card className="cb-card">
            <CardBody className="cb-card-body">
                <p>Micro Cloud</p>
                <div style={{
                    padding: "10px",
                    position: "absolute",
                }}>
                    <ul>
                        <h5>총 대수 : 500</h5>
                        <h6>On : 400</h6>
                        <h6>Off : 100</h6>
                    </ul>
                </div>
                <ResponsiveContainer height={height + 100} width="100%">
                    <ResponsivePie
                        data={data}
                        height={height}
                        margin={{
                            top: 40,
                            right: 80,
                            bottom: 80,
                            left: 80,
                        }}
                        startAngle={-180}
                        innerRadius={0.65}
                        padAngle={2}
                        colors={{scheme: 'blues'}}
                        borderWidth={1}
                        borderColor={{
                            from: 'color',
                            modifiers: [['darker', 0.2]],
                        }}
                        radialLabelsSkipAngle={10}
                        radialLabelsTextXOffset={6}
                        radialLabelsTextColor="#333333"
                        radialLabelsLinkOffset={0}
                        radialLabelsLinkDiagonalLength={16}
                        radialLabelsLinkHorizontalLength={24}
                        radialLabelsLinkStrokeWidth={1}
                        radialLabelsLinkColor={{from: 'color'}}
                        slicesLabelsSkipAngle={10}
                        slicesLabelsTextColor="#333333"
                        animate="true"
                        motionStiffness={90}
                        motionDamping={15}
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                size: 4,
                                padding: 1,
                                stagger: true,
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10,
                            },
                        ]}
                        fill={[
                            {
                                match: {
                                    id: 'ruby',
                                },
                                id: 'dots',
                            },
                            {
                                match: {
                                    id: 'c',
                                },
                                id: 'dots',
                            },
                            {
                                match: {
                                    id: 'go',
                                },
                                id: 'dots',
                            },
                            {
                                match: {
                                    id: 'python',
                                },
                                id: 'dots',
                            },
                            {
                                match: {
                                    id: 'scala',
                                },
                                id: 'lines',
                            },
                            {
                                match: {
                                    id: 'lisp',
                                },
                                id: 'lines',
                            },
                            {
                                match: {
                                    id: 'elixir',
                                },
                                id: 'lines',
                            },
                            {
                                match: {
                                    id: 'javascript',
                                },
                                id: 'lines',
                            },
                        ]}
                        legends={[
                            {
                                anchor: 'bottom',
                                direction: 'row',
                                translateY: 56,
                                itemWidth: 100,
                                itemHeight: 18,
                                itemTextColor: '#999',
                                symbolSize: 18,
                                symbolShape: 'circle',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#000',
                                        },
                                    },
                                ],
                            },
                        ]}
                    />
                </ResponsiveContainer>
            </CardBody>
        </Card>
    );
};

export default MyResponsivePie;
