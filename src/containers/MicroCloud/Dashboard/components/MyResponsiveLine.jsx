import React, {useState, useEffect} from "react";
import { ResponsiveLine } from '@nivo/line';
import {Card, CardBody} from "reactstrap";
import {fade, makeStyles} from "@material-ui/core/styles";
import {getVmInterfaceTraffic} from "../../../../lib/api/microCloud";

const lineTheme = ({
    axis: {
        ticks: {
            text: {
                fontSize: 10,
                fill: "#8f8f9f",
            },
        },
        legend: {
            text: {
                fill: "#8f8f9f",
            },
        },
    },
});

const MyResponsiveLine = (props) => {
    const {
        title, height, mac,
    } = props;

    const [data, setData] = useState({
        stats: [{
                id: "RX",
                data: [],
            }, {
                id: "TX",
                data: [],
            },
        ],
    });
    const [hostname, setHostname] = useState("");

    /**************************************************************
     * Axios Function
     **************************************************************/
    const getData = async () => {
        // console.log("★★★★★★★★", "get Interface Traffic! mac:", mac);
        if (!mac) {
            return;
        }

        try {
            const response = await getVmInterfaceTraffic({mac});
            // console.log("TEST RESPONSE1: ", response.data.stats[0].data);
            setData({
                stats: (
                    response.data.stats.map(val => ({
                        id: val.id,
                        data: val.data.map(s => ({
                            // ...s,
                            x: new Date(s.x),
                            y: s.y,
                        })),
                    }))),
            });
            setHostname(response.data.hostname);
        } catch {
            setData({
                ...data,
                data: [],
            });
        }
    };

    // useEffect(() => {
    //     if (data.stats[0].data.length > 1) {
    //         console.log(data.stats[0].data[0].x);
    //     }
    // }, [data.stats]);

    useEffect(() => {
        getData();
        const timer = setInterval(getData, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Card className="cb-card">
            <CardBody className="cb-card-body">
                <p>{title} <b>({hostname})</b></p>
                <ResponsiveLine
                    data={data.stats}
                    height={height}
                    margin={{
                        top: 40, right: 90, bottom: 60, left: 70,
                    }}
                    xScale={{
                        type: 'time',
                        format: "native",
                    }}
                    yScale={{
                        type: 'linear',
                        min: '0',
                        max: 'auto',
                        stacked: false,
                        reverse: false,
                    }}
                    curve="monotoneX"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 10,
                        tickRotation: 0,
                        format: "%H:%M:%S",
                        tickValues: "every 10 minutes",
                        legend: 'Time',
                        legendOffset: 50,
                        legendPosition: 'middle',
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'KBytes',
                        legendOffset: -65,
                        legendPosition: 'middle',
                        format: v => `${Number(v) / 1000}`,
                    }}
                    colors={{ scheme: 'category10' }}
                    lineWidth={1}
                    enablePoints={false}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabel="y"
                    pointLabelYOffset={-14}
                    enableArea
                    areaOpacity={0.15}
                    useMesh
                    enableSlices="x" //todo
                    interactive="false"
                    legends={[
                        {
                            anchor: 'bottom-right',
                            fill: '#8f8f9f',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                    motionStiffness={300}
                    motionDamping={40}
                    theme={lineTheme}
                />
            </CardBody>
        </Card>
    );
};

export default MyResponsiveLine;
