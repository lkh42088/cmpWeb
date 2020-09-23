import React, {Fragment, useEffect, useState} from "react";
import {Card, CardBody} from "reactstrap";
import {
    PieChart, Pie, Sector, ResponsiveContainer,
} from 'recharts';
import {getMcNetworksMem} from "../../../../lib/api/microCloudMem";
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

    const onPieLeave = () => {
        //console.log("out");
    };

    useEffect(() => {
        setActiveIndex(activeIndex);
    }, [activeIndex]);

    const getData = async () => {
        try {
            let cpData = "";

            const marker = 1024; // Change to 1000 if required
            const decimal = 2; // Change as required
            const megaBytes = marker * marker; // One MB is 1024 KB
            const gigaBytes = marker * marker * marker; // One GB is 1024 MB

            // FREE 값 가져옴
            const response = await getMcNetworksMem(mac);
            const value = response.data[0].available_percent;

            const valueCompare = 100 - Number(value);
            const use = Number(valueCompare.toFixed(2));
            const free = Number(value.toFixed(2));

            let useColor = pieColor.memColor.use;
            let freeColor = pieColor.memColor.free;

            if (use >= Number(warringUsed)) {
                useColor = pieColor.warringColor;
                freeColor = pieColor.warringColor;
            }

            const subContent = `(Total : ${(Number(response.data[0].total) / gigaBytes).toFixed(decimal)} GB)`;
            const labelVal = `${(Number(response.data[0].available) / gigaBytes).toFixed(decimal)} GB`;

            /*console.log("response : ", response);
            console.log("available_percent : ", value);
            console.log("valueCompare : ", valueCompare);
            console.log("use : ", use);
            console.log("free : ", free);*/

            cpData = [
                {
                    id: "used",
                    label: "used",
                    labelVal: "",
                    value: use,
                    fillColor: useColor,
                    err: response.data[0].err,
                },
                {
                    id: "free",
                    label: "free",
                    labelVal,
                    value: free,
                    fillColor: freeColor,
                    err: response.data[0].err,
                },
            ];

            setData(cpData);
            setState(response.data[0].err);
        } catch {
            console.log("memory MyResponsivePie response error");
        }
    };

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
                        <ResponsiveContainer height={height + 150} width="100%">
                            <PieChart height={height}>
                                <g>
                                    <text x={133} y={130} dy={8} textAnchor="middle"
                                          fill="red"
                                          style={{
                                              fontSize: "1.3rem",
                                          }}>
                                        NO DATA
                                    </text>
                                    <text x={133} y={130 + 20} dy={8} textAnchor="middle"
                                          className="graph_label"
                                          style={{
                                              fontSize: "0.8rem",
                                          }}>
                                        데이터가 없습니다.
                                    </text>
                                </g>
                            </PieChart>
                        </ResponsiveContainer>
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
                                onMouseLeave={onPieLeave}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </CardBody>
        </Card>
    );
};

export default MyResponsivePie;
