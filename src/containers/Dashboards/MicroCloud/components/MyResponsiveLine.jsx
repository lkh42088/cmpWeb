import React, {useState, useEffect} from "react";
import { ResponsiveLine } from '@nivo/line';
import {Card, CardBody} from "reactstrap";
import {getVmInterfaceTraffic} from "../../../../lib/api/microCloud";

const data1 = [
    {
        id: "RX",
        data: [
            {
                x: "20:00:00",
                y: 596685,
            },
            {
                x: "21:00:00",
                y: 592929,
            },
            {
                x: "22:00:00",
                y: 394994,
            },
            {
                x: "23:00:00",
                y: 494944,
            },
            {
                x: "24:00:00",
                y: 4938494,
            },
        ],
    },
    {
        id: "TX",
        data: [
            {
                x: "20:00:00",
                y: 1829839,
            },
            {
                x: "21:00:00",
                y: 629348,
            },
            {
                x: "22:00:00",
                y: 3298843,
            },
            {
                x: "23:00:00",
                y: 939494,
            },
            {
                x: "24:00:00",
                y: 3294393,
            },
        ],
    },
];

const MyResponsiveLine = (props) => {
    const {
        title, height, mac,
    } = props;

    const [data, setData] = useState({
        stats: [{
                id: "RX",
                data: [{ x: new Date("00:00:00").getDate(), y: 0 }],
            }, {
                id: "TX",
                data: [{ x: new Date("00:00:00").getDate(), y: 0 }],
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
            console.log("TEST RESPONSE1: ", response.data.stats[0].data);
            setData({
                stats: (
                    response.data.stats.map(val => ({
                        id: val.id,
                        data: val.data.map(s => ({
                            ...s,
                        })),
                    }))),
            });
            setHostname(response.data.hostname);
            console.log("TEST RESPONSE2: ", hostname);
            console.log("TEST RESPONSE3: ", data.stats);
        } catch {
            setData({
                ...data,
                data: [],
            });
        }
    };

    const test = () => {
        console.log(data.stats);
    };

    useEffect(() => {
        test();
    }, [data.stats]);

    useEffect(() => {
        const timer = setInterval(getData, 5000);
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
                    xScale={{ type: 'point' }}
                    yScale={{
                        type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false,
                    }}
                    curve="monotoneX"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        tickValues: "every 10 minutes",
                        legend: 'Time Line (1Hour)',
                        legendOffset: 36,
                        legendPosition: 'middle',
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: '',
                        legendOffset: -40,
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
                    onClick={test}
                />
            </CardBody>
        </Card>
    );
};

export default MyResponsiveLine;
