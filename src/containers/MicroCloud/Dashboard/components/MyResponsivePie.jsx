import React, {useEffect, useState, Fragment} from 'react';
import {ResponsivePie} from '@nivo/pie';
import {
    Card, CardBody, Col, Row,
} from "reactstrap";
import {ResponsiveContainer} from "recharts";

const MyResponsivePie = (props) => {
    const {data, height} = props;
    return (
        <Card className="cb-card">
            <CardBody className="cb-card-body">
                <p>Micro Cloud</p>

                <Row>
                    <Col md={3} lg={3} xs={12} sm={12} xl={3}
                         style={{
                             /*padding: 10,*/
                         }}>
                        <div style={{
                            position: "relative",
                            top: "35%",
                            width: "100%",
                            margin: "auto 0",
                            /*left: "15%",*/
                        }} className="sideInfo">
                            <ul className="sideInfo">
                                <li className="text-center"><b>총 대수 : 500</b></li>
                                <li className="text-center">On : 400</li>
                                <li className="text-center">Off : 100</li>
                            </ul>
                        </div>
                    </Col>
                    <Col md={9} lg={9} xs={12} sm={12} xl={9}
                         style={{
                             /*padding: 10,*/
                             /*border: "1px solid red",*/
                         }}>
                        <ResponsiveContainer height={height + 100} width="100%" style={{
                            padding: "15px",
                        }}>
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
                                        itemWidth: 70,
                                        itemHeight: 15,
                                        itemTextColor: '#999',
                                        symbolSize: 10,
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
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default MyResponsivePie;
