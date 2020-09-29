import React, {useEffect, useState, Fragment} from 'react';
import {ResponsivePie} from '@nivo/pie';
import {
    Card, CardBody, Col, Row,
} from "reactstrap";
import {ResponsiveContainer} from "recharts";
import { linearGradientDef } from '@nivo/core';

const MyResponsivePie = (props) => {
    const {count, data, height} = props;
    // console.log(count, data);

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
                                <li className="text-center"><b>총 대수 : {count ? count.total : 0}</b></li>
                                <li className="text-center">On : {count ? count.operate : 0}</li>
                                <li className="text-center">Off : {count ? (count.total - count.operate) : 0}</li>
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
                                innerRadius={0.35}
                                padAngle={2}
                                colors={{scheme: 'category10'}}
                                borderWidth={3}
                                borderColor={{
                                    from: 'color',
                                    modifiers: [['darker', 0.5]],
                                }}
                                enableRadialLabels={false}
                                radialLabelsSkipAngle={0}
                                radialLabelsTextXOffset={1}
                                radialLabelsTextColor="#333333"
                                radialLabelsLinkOffset={-5}
                                radialLabelsLinkDiagonalLength={16}
                                radialLabelsLinkHorizontalLength={24}
                                radialLabelsLinkStrokeWidth={1}
                                radialLabelsLinkColor={{from: 'color'}}
                                sliceLabel={e => (`${e.id} (${e.value})`)}
                                slicesLabelsSkipAngle={10}
                                slicesLabelsTextColor="#333333"
                                animate="true"
                                motionStiffness={90}
                                motionDamping={15}
                                defs={[
                                    linearGradientDef('gradientB', [
                                        { offset: 0, color: '#FFF' },
                                        { offset: 90, color: 'inherit', opacity: 0.8 },
                                    ]),
                                ]}
                                // fill={[
                                //     { match: '*', id: 'gradientB' },
                                // ]}
                                legends={[
                                    {
                                        anchor: 'bottom',
                                        direction: 'row',
                                        translateY: 56,
                                        itemWidth: 120,
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
