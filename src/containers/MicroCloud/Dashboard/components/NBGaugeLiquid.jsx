import React, {Fragment, useEffect, useState} from "react";
import {Card, CardBody} from "reactstrap";
import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';
import LiquidFillGauge from 'react-liquid-gauge';
import {getMcNetworksMem} from "../../../../lib/api/microCloudMem";

const NBGaugeLiquid = (props) => {
    const {
        height, title, pieColor, mac, warringUsed,
    } = props;

    const [activeIndex, setActiveIndex] = useState(0);

    const [data, setData] = useState([]);
    const [state, setState] = useState();

    /**************************************************************
     * Handle Function
     **************************************************************/
    const startColor = '#6495ed'; // cornflowerblue
    const endColor = '#dc143c'; // crimson
    const radius = 100;
    const interpolate = interpolateRgb(startColor, endColor);
    const fillColor = interpolate(data / 100);
    const gradientStops = [
        {
            key: '0%',
            stopColor: color(fillColor).darker(0.5).toString(),
            stopOpacity: 1,
            offset: '0%',
        },
        {
            key: '50%',
            stopColor: fillColor,
            stopOpacity: 0.75,
            offset: '50%',
        },
        {
            key: '100%',
            stopColor: color(fillColor).brighter(0.5).toString(),
            stopOpacity: 0.5,
            offset: '100%',
        },
    ];

    /**************************************************************
     * Axios Function
     **************************************************************/
    const getData = async () => {
        try {
            const response = await getMcNetworksMem(mac);
            setData(100 - response.data[0].available_percent);
        } catch {
            console.log("memory MyResponsivePie response error");
        }
    };

    /**************************************************************
     * useEffect
     **************************************************************/
    useEffect(() => {
        setActiveIndex(activeIndex);
    }, [activeIndex]);

    useEffect(() => {
        getData();
        const timer = setInterval(getData, 10000);
        return () => clearInterval(timer);
    }, [mac]);

    return (
        <Card className="cb-card">
            <CardBody className="cb-card-body">
                <p>{title}</p>
                {state === "nodata" ? (
                    <Fragment>
                        <p style={{
                            textAlign: "center",
                            margin: "110px auto",
                        }}>
                            <span style={{
                                fontSize: "1.3rem",
                                color: "red",
                            }}>
                                NO DATA
                            </span>
                            <br/>
                            <span textAnchor="middle"
                                  style={{
                                      fontSize: "0.8rem",
                                  }}>
                                데이터가 없습니다.
                            </span>
                        </p>
                    </Fragment>
                ) : (
                    <LiquidFillGauge
                        style={{ margin: '0 auto' }}
                        width={radius * 2}
                        height={radius * 2}
                        value={data}
                        percent="%"
                        textSize={1}
                        textOffsetX={0}
                        textOffsetY={0}
                        textRenderer={(val) => {
                            const value = Math.round(val.value);
                            const radiusL = Math.min(val.height / 2, val.width / 2);
                            const textPixels = (val.textSize * radiusL / 2);
                            const valueStyle = {
                                fontSize: textPixels,
                            };
                            const percentStyle = {
                                fontSize: textPixels * 0.6,
                            };

                            return (
                                <tspan>
                                    <tspan className="value" style={valueStyle}>{value}</tspan>
                                    <tspan style={percentStyle}>{val.percent}</tspan>
                                </tspan>
                            );
                        }}
                        riseAnimation
                        waveAnimation
                        waveFrequency={2}
                        waveAmplitude={1}
                        gradient
                        gradientStops={gradientStops}
                        circleStyle={{
                            fill: fillColor,
                        }}
                        waveStyle={{
                            fill: fillColor,
                        }}
                        textStyle={{
                            fill: color('#444').toString(),
                            fontFamily: 'Arial',
                        }}
                        waveTextStyle={{
                            fill: color('#fff').toString(),
                            fontFamily: 'Arial',
                        }}
                        // onClick={() => {
                        //     setTemp({ value: Math.random() * 100 });
                        // }}
                    />
                )}
            </CardBody>
        </Card>
    );
};

export default NBGaugeLiquid;
