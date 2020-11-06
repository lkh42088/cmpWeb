// BarChart.js
import * as d3 from 'd3';
import ReactGuage from 'react-d3-guage';
import ReactSpeedometer from "react-d3-speedometer";
import React, {
    useRef, useEffect, Fragment, useState,
} from 'react';
import {Card, CardBody, Row} from "reactstrap";
import {makeStyles} from "@material-ui/core/styles";
import LiquidFillGauge from "react-liquid-gauge";

const useStyles = makeStyles(theme => ({
    valueColor: {
        textColor:
            theme.palette.type === 'light'
                ? {
                    color: "black",
                }
                : {
                    color: "#AAA",
                },
    },
}));

function GraphSpeedometer(props) {
    const ref = useRef();
    const classes = useStyles();
    const {
        title, data, refresh, err,
    } = props;
    const [radius, setRadius] = useState(300);
    const [inData, setInData] = useState(data);
    const [segmentColors, setSegmentColors] = useState();
    const [textColor, setTextColor] = useState(classes.valueColor.textColor);

    const cpuColors = ['#FFD54F', '#FFCA28', '#FFC107', '#FFB300'];
    const memColors = ['#80CBC4', '#4DB6AC', '#26A69A', '#009688'];
    const diskColors = ['#9FA8DA', '#7986CB', '#5C6BC0', '#3F51BD'];

    const warringSegmentColors = ['#E57373', '#EF5350', '#F44336', '#E53935'];
    const warringColor = "#E53935";

    const updateSize = () => {
        setRadius(ref.current.clientWidth - 50);
    };

    useEffect(() => {
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    });


    const widthSize = window.outerWidth;

    /*useEffect(() => {
        setTimeout(() => {
            setInData(Math.round(Math.random() * 44) + 1);
        }, 5000);
    }, [inData]);*/

    useEffect(() => {
        updateSize();
    }, []);

    useEffect(() => {
        updateSize();
    }, [widthSize]);

    useEffect(() => {
        //console.log(title, " data : ", data);
        setInData(data);

        switch (title) {
            case "CPU":
                setSegmentColors(cpuColors);
                break;
            case "MEMORY":
                setSegmentColors(memColors);
                break;
            case "DISK":
                setSegmentColors(diskColors);
                break;
            default:
                setSegmentColors(cpuColors);
                break;
        }

        if (Number(data) >= 80) {
            setSegmentColors(warringSegmentColors);
            setTextColor(warringColor);
        }
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
                            height: radius - 70,
                            display: "block",
                            margin: "auto",
                            marginLeft: "10px",
                            paddingTop: "20px",
                        }}>
                            <ReactSpeedometer
                                forceRender
                                fluidWidth
                                maxValue={100}
                                needleHeightRatio={0.7}
                                maxSegmentLabels={3}
                                segments={5}
                                needleTransitionDuration={3000}
                                /*customSegmentStops={[0, 25, 50, 75, 100]}*/
                                segmentColors={segmentColors}
                                value={inData}
                                textColor={textColor}
                                width={radius}
                                height={radius - 70}
                                paddingVertical={10}
                                paddingHorizontal={10}
                                currentValueText={`${inData}%`}
                                needleTransition="easeElastic"
                                needleColor="#ff1e56"
                                valueTextFontSize="20px"
                            />
                        </div>
                    </div>
                )}
            </CardBody>
        </Card>
    );
}

export default GraphSpeedometer;
