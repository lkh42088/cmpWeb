import React from "react";
import {ResponsivePie} from '@nivo/pie';
import {Card, CardBody} from "reactstrap";

const data = [
    {
        id: "elixir",
        label: "elixir",
        value: 512,
        color: "hsl(92, 70%, 50%)",
    },
    {
        id: "php",
        label: "php",
        value: 354,
        color: "hsl(225, 70%, 50%)",
    },
    {
        id: "c",
        label: "c",
        value: 172,
        color: "hsl(56, 70%, 50%)",
    },
    {
        id: "java",
        label: "java",
        value: 504,
        color: "hsl(46, 70%, 50%)",
    },
    {
        id: "erlang",
        label: "erlang",
        value: 42,
        color: "hsl(298, 70%, 50%)",
    },
];

const MyResponsivePie = (props) => {
    const {
        height, title, color, mac,
    } = props;

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
