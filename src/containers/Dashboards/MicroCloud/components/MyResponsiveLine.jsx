import React, {useState, useEffect} from "react";
import { ResponsiveLine } from '@nivo/line';
import {Card, CardBody} from "reactstrap";
import AxisTicks from "react-vis/es/plot/axis/axis-ticks";
import {getVmInterfaceTraffic} from "../../../../lib/api/microCloud";

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
                            x: s.x,
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

    useEffect(() => {
        // console.log(data.stats);
    }, [data.stats]);

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
                        top: 50, right: 110, bottom: 50, left: 60,
                    }}
                    // xScale={{
                    //     type: 'time',
                    //     format: "%Y-%m-%d %I:%M:%S",
                    //     // format: "UTC",
                    //     // precision: "hour",
                    // }}
                    xScale={{ type: 'point' }}
                    yScale={{
                        type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false,
                    }}
                    curve="monotoneX"
                    axisTop={null}
                    axisRight={null}
                    // axisBottom={{
                    //     useUTC: true,
                    //     legend: 'Time',
                    //     legendOffset: 36,
                    //     legendPosition: 'middle',
                    //     format: "%I:%M:%S",
                    //     tickValues: "every 10 minutes",
                    // }}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        // format: "%I:%M:%S",
                        tickValues: "every 10 minutes",
                        legend: 'Time',
                        legendOffset: 36,
                        legendPosition: 'middle',
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Bytes',
                        legendOffset: -55,
                        legendPosition: 'middle',
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
                    motionStiffness={100}
                />
            </CardBody>
        </Card>
    );
};

export default MyResponsiveLine;
