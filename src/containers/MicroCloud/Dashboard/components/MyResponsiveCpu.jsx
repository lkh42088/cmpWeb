import React, {useEffect, useState, Fragment} from "react";
import {Card, CardBody} from "reactstrap";
import {
    PieChart, Pie, Sector, ResponsiveContainer,
} from 'recharts';
import {getMcNetworksCpu} from "../../../../lib/api/microCloudCpu";
import GraphPie from "./GraphPie";

const MyResponsivePie = (props) => {
    const {
        height, title, pieColor, mac, warringUsed,
    } = props;
    const [activeIndex, setActiveIndex] = useState(0);
    const [fill, setFill] = useState(pieColor.defaultColor);

    const [data, setData] = useState([]);
    const [state, setState] = useState();

    // eslint-disable-next-line no-shadow
    const onPieEnter = (data, index) => {
        setActiveIndex(index);
    };

    const getData = async () => {
        try {
            let cpData = "";

            const marker = 1024; // Change to 1000 if required
            const decimal = 2; // Change as required
            const megaBytes = marker * marker; // One MB is 1024 KB
            const response = await getMcNetworksCpu(mac);
            const value = response.data[0].usage_idle;

            const valueCompare = 100 - Number(value);
            const use = Number(valueCompare.toFixed(2));
            const free = Number(value.toFixed(2));

            let useColor = pieColor.cpuColor.use;
            let freeColor = pieColor.cpuColor.free;

            if (use >= Number(warringUsed)) {
                useColor = pieColor.warringColor;
                freeColor = pieColor.warringColor;
            }

            /*console.log("response : ", response);
            console.log("usage_idle : ", value);
            console.log("valueCompare : ", valueCompare);
            console.log("use : ", use);
            console.log("free : ", free);*/

            cpData = [
                {
                    id: "used",
                    label: "used",
                    value: use,
                    fillColor: useColor,
                    err: response.data[0].err,
                },
                {
                    id: "available", /*free*/
                    label: "available",
                    value: free,
                    fillColor: freeColor,
                    err: response.data[0].err,
                },
            ];

            setData(cpData);
            //setData(data.concat(cpData));
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
        const timer = setInterval(getData, 5000);
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
                    <ResponsiveContainer height={height + 100} width="100%">
                        <PieChart height={height}>
                            <Pie
                                activeIndex={activeIndex}
                                fill={fill}
                                dataKey="value"
                                activeShape={GraphPie}
                                data={data}
                                paddingAngle={0}
                                 cy={130}
                                innerRadius="50%"
                                outerRadius="59%"
                                onMouseEnter={onPieEnter}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </CardBody>
        </Card>
    );
};

export default MyResponsivePie;
