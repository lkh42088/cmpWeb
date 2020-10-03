import React, {Fragment, useEffect, useState} from "react";
import {Card, CardBody} from "reactstrap";
import Gauge from 'react-svg-gauge';
import {getMcNetworksDisk} from "../../../../lib/api/microCloudDisk";

const NBGaugeSvg = (props) => {
    const {
        height, title, pieColor, mac, warringUsed,
    } = props;
    const [activeIndex, setActiveIndex] = useState(0);

    const [data, setData] = useState([]);
    const [state, setState] = useState();

    /**************************************************************
     * Handle Function
     **************************************************************/
    // eslint-disable-next-line no-shadow
    const onPieEnter = (data, index) => {
        setActiveIndex(index);
    };

    /**************************************************************
     * Axios Function
     **************************************************************/
    const getData = async () => {
        try {
            const response = await getMcNetworksDisk(mac);
            setData(response.data[0].used_percent.toFixed(0));
        } catch {
            console.log("disk MyResponsivePie response error");
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
                <br/><br/>
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
                    <Gauge
                        value={data}
                        width={300}
                        height={200}
                        label="DISK(%)"
                    />
                )}
            </CardBody>
        </Card>
    );
};

export default NBGaugeSvg;
