import React, {useEffect, useState, Fragment} from "react";
import {Card, CardBody} from "reactstrap";
import {RadialGauge} from "react-canvas-gauges";
import {getMcNetworksCpu} from "../../../../lib/api/microCloudCpu";

const NBGaugeGraph = (props) => {
    const {
        height, title, pieColor, mac, warringUsed,
    } = props;
    const [activeIndex, setActiveIndex] = useState(0);

    const [data, setData] = useState(0);
    const [state, setState] = useState();

    /**************************************************************
     * Handle Function
     **************************************************************/

    /**************************************************************
     * Axios Function
     **************************************************************/
    const getData = async () => {
        try {
            const response = await getMcNetworksCpu(mac);
            const value = response.data[0].usage_idle;

            const valueCompare = 100 - Number(value);
            const use = Number(valueCompare.toFixed(0));

            setData(use);
            setState(response.data[0].err);
        } catch {
            console.log("cpu MyResponsivePie response error");
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
        const timer = setInterval(getData, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Card className="cb-card">
            <CardBody className="cb-card-body">
                {/*<p>{title}</p>*/}
                {state === "nodata" ? (
                    <Fragment>
                        <p style={{
                            textAlign: "center",
                            margin: "120px auto",
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
                    <RadialGauge
                        units="%"
                        title="CPU USAGE"
                        value={data}
                        minValue={0}
                        maxValue={100}
                        majorTicks={['0', '20', '40', '60', '80', '100']}
                        minorTicks={2}
                    />
                )}
            </CardBody>
        </Card>
    );
};

export default NBGaugeGraph;
