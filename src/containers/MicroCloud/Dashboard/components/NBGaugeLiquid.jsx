import React, {
    Fragment, useEffect, useRef, useState,
} from "react";
import {Card, CardBody} from "reactstrap";
import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';
import LiquidFillGauge from 'react-liquid-gauge';
import {getMcNetworksMem} from "../../../../lib/api/microCloudMem";
import {themes} from "../../../../shared/helpers";

const NBGaugeLiquid = (props) => {
    const ref = useRef();
    const {
        height, title, pieColor, mac, warringUsed, data,
    } = props;
    const [state, setState] = useState();
    const [radius, setRadius] = useState();

    /**************************************************************
     * Handle Function
     **************************************************************/
    const startColor = '#6495ed'; // cornflowerblue
    const endColor = '#dc143c'; // crimson
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
    /**************************************************************
     * useEffect
     **************************************************************/
    const updateSize = () => {
        setRadius(ref.current.clientWidth / 2 - 50);
    };

    useEffect(() => {
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    });

    useEffect(() => {
        setRadius(ref.current.clientWidth / 2 - 50);
    }, []);

    return (
        <Card className="cb-card" innerRef={ref}>
            <CardBody className="nb-card-body-graph">
                <div className="nb-card-body-graph-title">{title}</div>
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
                        style={{ margin: '0 auto', marginBottom: 20 }}
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
