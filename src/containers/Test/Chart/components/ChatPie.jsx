import React, {useEffect, useState} from 'react';
import {Card, Col, CardBody} from 'reactstrap';
import {
    PieChart, Pie, Sector, ResponsiveContainer, RadialBarChart, Tooltip, RadialBar, Legend,
} from 'recharts';

const data = [
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

/*const data = [
    {
        name: 'Group A',
        value: 400,
        fillColor: '#2d4059',
    }, {
        name: 'Group B',
        value: 300,
        fillColor: '#ea5455',
    },
    {
        name: 'Group C',
        value: 300,
        fillColor: '#decdc3',
    }, {
        name: 'Group D',
        value: 200,
        fillColor: '#e5e5e5',
    },
];*/

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


const ChatPie = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [fill, setFill] = useState("#383e56");

    // eslint-disable-next-line no-shadow
    const onPieEnter = (data, index) => {
        setActiveIndex(index);
    };

    const onPieLeave = () => {
        console.log("out");
    };

    useEffect(() => {
        setActiveIndex(activeIndex);
    }, [activeIndex]);

    return (
        /*<PieChart width={400} height={400}>
            <Pie
                activeIndex={activeIndex}
                fill={fill}
                dataKey="value"
                activeShape={GraphPie}
                data={data}
                paddingAngle={0}
                cx={200}
                cy={200}
                innerRadius={60}
                outerRadius={80}
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
            />
        </PieChart>
        */
        <Col xs={12} md={12} lg={6} xl={4}>
            <Card>
                <CardBody>
                    <div className="card__title">
                        <h5 className="bold-text">CustomActiveShapePieChart</h5>
                    </div>
                    <div >
                        <ResponsiveContainer height={400}>
                            <PieChart width={400} height={400}>
                                <Pie
                                    activeIndex={activeIndex}
                                    fill={fill}
                                    dataKey="value"
                                    activeShape={GraphPie}
                                    data={data}
                                    paddingAngle={0}
                                    /*cx={200}*/
                                    cy={200}
                                    innerRadius={60}
                                    outerRadius={80}
                                    onMouseEnter={onPieEnter}
                                    onMouseLeave={onPieLeave}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default ChatPie;
