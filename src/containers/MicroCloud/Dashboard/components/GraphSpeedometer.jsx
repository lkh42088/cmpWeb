// BarChart.js
import * as d3 from 'd3';
import ReactGuage from 'react-d3-guage';
import ReactSpeedometer from "react-d3-speedometer";
import React, {
    useRef, useEffect, Fragment, useState,
} from 'react';
import {Card, CardBody, Row} from "reactstrap";
import LiquidFillGauge from "react-liquid-gauge";

function GraphSpeedometer(props) {
    const ref = useRef();
    const {
        title, data, refresh, err,
    } = props;
    const [radius, setRadius] = useState(300);
    const [inData, setInData] = useState(data);

    let segmentColors = [];

    switch (title) {
        case "CPU":
            segmentColors = ['#FFD54F', '#FFCA28', '#FFC107', '#FFB300'];
            break;
        case "MEMORY":
            segmentColors = ['#80CBC4', '#4DB6AC', '#26A69A', '#009688'];
            break;
        case "DISK":
            segmentColors = ['#9FA8DA', '#7986CB', '#5C6BC0', '#3F51BD'];
            break;
        default:
            segmentColors = ['#D1C4E9', '#B39DDB', '#9575CD', '#7E57C2'];
            break;
    }

    const updateSize = () => {
        setRadius(ref.current.clientWidth - 50);
    };

    useEffect(() => {
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    });

    /*useEffect(() => {
        setTimeout(() => {
            setInData(Math.round(Math.random() * 44) + 1);
        }, 5000);
    }, [inData]);*/

    useEffect(() => {
        updateSize();
    }, []);
    
    useEffect(() => {
        setInData(data);
    }, [data]);

    /*useEffect(() => {
        setRadius(radius);
    }, [radius]);*/

    return (
        <Card className="cb-card" innerRef={ref}>
            <CardBody className="nb-card-body-graph">
                <div className="nb-card-body-graph-title">{title}</div>
                {err === "nodata" ? (
                    <Fragment>
                        <p style={{
                            textAlign: "center",
                            margin: "80px auto",
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
                    <div>
                        <div style={{
                            width: radius,
                            height: 300,
                            display: "block",
                            margin: "auto",
                        }}>
                            <ReactSpeedometer
                                /*fluidWidth*/
                                forceRender
                                maxValue={100}
                                needleHeightRatio={0.7}
                                maxSegmentLabels={3}
                                segments={5}
                                needleTransitionDuration={3000}
                                /*customSegmentStops={[0, 25, 50, 75, 100]}*/
                                segmentColors={segmentColors}
                                value={inData}
                                textColor="#AAA"
                                width={radius}
                                height={210}
                                paddingVertical={10}
                                paddingHorizontal={5}
                                currentValueText={`Current Value: ${inData}%`}
                            />
                        </div>
                    </div>
                )}
            </CardBody>
        </Card>
    );
}

export default GraphSpeedometer;
