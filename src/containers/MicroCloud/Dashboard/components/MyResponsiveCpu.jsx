import React, {useEffect, useState} from "react";
import {ResponsivePie} from '@nivo/pie';
import {Card, CardBody} from "reactstrap";
import {
    PieChart, Pie, Sector, ResponsiveContainer,
} from 'recharts';
import {getMcNetworksCpu} from "../../../../lib/api/microCloudCpu";

const defaultColor = {
    pieColor: '#d4d7dd',
    textColor: '#414141',
};

const warringColor = {
    value: '#ec0101',
};

const cpuColor = {
    use: '#5e62e6',
    free: '#4ea1d3',
};

const GraphPie = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value,
    } = props;

    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 5) * sin;
    const mx = cx + (outerRadius + 15) * cos;
    const my = cy + (outerRadius + 15) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 11;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle"
                  fill={payload.fillColor}
                  style={{
                      fontSize: "large",
                  }}>
                {`${(percent * 100).toFixed(2)}%`}
            </text>
            <text x={cx} y={cy + 20} dy={8} textAnchor="middle"
                  className="graph_label">
                {payload.label}
            </text>
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
            <text x={ex + (cos >= 0 ? 1 : -1) * 10} y={ey} textAnchor={textAnchor} className="graph_label">
                {`${payload.label}`}
            </text>
            {/*<text x={ex + (cos >= 0 ? 1 : -1) * 10} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`${value}`}
            </text>*/}
            {/*<text x={ex + (cos >= 0 ? 1 : -1) * 10} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`Rate ${(percent * 100).toFixed(2)}%`}
            </text>*/}
        </g>
    );
};

const MyResponsivePie = (props) => {
    const {
        height, title, color, mac,
    } = props;
    const [activeIndex, setActiveIndex] = useState(0);
    const [fill, setFill] = useState(defaultColor.pieColor);

    const tempData = "x"; /*임시 데이터*/

    const [data, setData] = useState([]);
    const [mem, setMem] = useState();
    const [disk, setDisk] = useState();

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
            let subContent;

            const marker = 1024; // Change to 1000 if required
            const decimal = 2; // Change as required
            const megaBytes = marker * marker; // One MB is 1024 KB
            const response = await getMcNetworksCpu({tempData});
            const value = response.data[0].usage_idle;

            const valueCompare = 100 - Number(value);
            const use = Number(valueCompare.toFixed(2));
            const free = Number(value.toFixed(2));

            let useColor = cpuColor.use;
            let freeColor = cpuColor.free;

            if (use >= 80) {
                useColor = warringColor.value;
                freeColor = warringColor.value;
            }

            cpData = [
                {
                    id: "use",
                    label: "use",
                    value: use,
                    fillColor: useColor,
                },
                {
                    id: "free",
                    label: "free",
                    value: free,
                    fillColor: freeColor,
                },
            ];
            setData(data.concat(cpData));
        } catch {
            console.log("😁😁 MyResponsivePie response error");
        }
    };

    useEffect(() => {
        //getData();
        const timer = setInterval(getData, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Card className="cb-card">
            <CardBody className="cb-card-body">
                <p>{title}</p>
                <ResponsiveContainer height={height + 100} width="100%">
                    <PieChart height={height}>
                        <Pie
                            activeIndex={activeIndex}
                            fill={fill}
                            dataKey="value"
                            activeShape={GraphPie}
                            data={data}
                            paddingAngle={0}
                            /*cx={200}*/
                            cy={200}
                            innerRadius="50%"
                            outerRadius="60%"
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
