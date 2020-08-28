import React, {useEffect, useState} from "react";
import {ResponsivePie} from '@nivo/pie';
import {Card, CardBody} from "reactstrap";
import {
    PieChart, Pie, Sector, ResponsiveContainer,
} from 'recharts';
import {getMcNetworksCpu} from "../../../../lib/api/microCloudCpu";

const dataTemp = [
    {
        name: 'Group A',
        value: 400,
        fillColor: '#f3c623',
    }, {
        name: 'Group B',
        value: 300,
        fillColor: '#1eb2a6',
    },
    {
        name: 'Group C',
        value: 300,
        fillColor: '#cfd186',
    }, {
        name: 'Group D',
        value: 200,
        fillColor: '#f4f6ff',
    },
];

const MyResponsivePie = (props) => {
    const {
        height, title, color, mac,
    } = props;

    const tempData = "x";

    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            const response = await getMcNetworksCpu({tempData});
            console.log("👿👿 TEST response: ", response);
            console.log("👽👽 TEST response: ", response.data);
            console.log("💎💎 TEST response: ", response.data[0]);
            const idle = response.data[0].usage_idle;
            const idleVaule = 100 - Number(idle);

            console.log("한번 테스트 해봅시다~~~~ : ", 100 - Number(idle));
            console.log("소수점 자르기 ~~~~ : ", idleVaule.toFixed(2));

            const cpdata = [
                {
                    id: "use",
                    label: "use",
                    value: Number(idleVaule.toFixed(2)),
                    color: "hsl(92, 70%, 50%)",
                },
                {
                    id: "free",
                    label: "free",
                    value: Number(idle.toFixed(2)),
                    color: "hsl(92, 70%, 50%)",
                },
            ];
            setData(data.concat(cpdata));

            /*setData({
                ...data,
                value: Number(idleVaule.toFixed(2)),
            });*/

            console.log("💂💂 idle : ", idle);
        } catch {
            console.log("👿👿 TEST error ~ ");
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Card className="cb-card">
            <CardBody className="cb-card-body">
                <p>{title}</p>
                <ResponsivePie
                    data={data}
                    height={height}
                    margin={{
                        top: 40, right: 80, bottom: 80, left: 80,
                    }}
                    innerRadius={0.3}
                    padAngle={0.7}
                    cornerRadius={1}
                    colors={{scheme: color}}
                    borderWidth={1}
                    borderColor={{from: 'color', modifiers: [['darker', 1.2]]}}
                    radialLabelsSkipAngle={10}
                    radialLabelsTextXOffset={6}
                    radialLabelsTextColor="#333333"
                    radialLabelsLinkOffset={0}
                    radialLabelsLinkDiagonalLength={16}
                    radialLabelsLinkHorizontalLength={24}
                    radialLabelsLinkStrokeWidth={1}
                    radialLabelsLinkColor={{from: 'color'}}
                    slicesLabelsSkipAngle={10}
                    slicesLabelsTextColor="#333333"
                    animate="true"
                    motionStiffness={90}
                    motionDamping={15}
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            size: 4,
                            padding: 1,
                            stagger: true,
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10,
                        },
                    ]}
                    fill={[
                        {
                            match: {
                                id: 'ruby',
                            },
                            id: 'dots',
                        },
                        {
                            match: {
                                id: 'c',
                            },
                            id: 'dots',
                        },
                        {
                            match: {
                                id: 'go',
                            },
                            id: 'dots',
                        },
                        {
                            match: {
                                id: 'python',
                            },
                            id: 'dots',
                        },
                        {
                            match: {
                                id: 'scala',
                            },
                            id: 'lines',
                        },
                        {
                            match: {
                                id: 'lisp',
                            },
                            id: 'lines',
                        },
                        {
                            match: {
                                id: 'elixir',
                            },
                            id: 'lines',
                        },
                        {
                            match: {
                                id: 'javascript',
                            },
                            id: 'lines',
                        },
                    ]}
                    legends={[
                        {
                            anchor: 'bottom',
                            direction: 'row',
                            translateY: 56,
                            itemWidth: 70,
                            itemHeight: 18,
                            itemTextColor: '#999',
                            symbolSize: 18,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000',
                                    },
                                },
                            ],
                        },
                    ]}
                />
            </CardBody>
        </Card>
    );
};

export default MyResponsivePie;
