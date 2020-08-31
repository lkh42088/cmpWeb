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

const GraphPie = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value,
    } = props;

    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={payload.fillColor}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

const MyResponsivePie = (props) => {
    const {
        height, title, color, mac,
    } = props;
    const [activeIndex, setActiveIndex] = useState(0);
    const [fill, setFill] = useState("#383e56");

    const tempData = "x";

    const [data, setData] = useState([]);

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
            const response = await getMcNetworksCpu({tempData});

            const idle = response.data[0].usage_idle;
            const idleVaule = 100 - Number(idle);

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
        } catch {
            console.log("MyResponsivePie response error");
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Card className="cb-card">
            <CardBody className="cb-card-body">
                <p>{title}</p>
                <ResponsiveContainer height={400}>
                    <PieChart width={400} height={400}>
                        <Pie
                            activeIndex={activeIndex}
                            fill={fill}
                            dataKey="value"
                            activeShape={GraphPie}
                            data={dataTemp}
                            paddingAngle={0}
                            cx={200}
                            cy={200}
                            innerRadius={60}
                            outerRadius={80}
                            onMouseEnter={onPieEnter}
                            onMouseLeave={onPieLeave}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </CardBody>
        </Card>
    );
};

export default MyResponsivePie;
