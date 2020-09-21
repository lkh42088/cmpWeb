import React, {useEffect, useState} from "react";
import {Card, CardBody} from "reactstrap";
import {
    PieChart, Pie, Sector, ResponsiveContainer,
} from 'recharts';
import {getMcNetworksDisk} from "../../../../lib/api/microCloudDisk";
import GraphPie from "./GraphPie";

const MyResponsivePie = (props) => {
    const {
        height, title, pieColor, mac, warringUsed,
    } = props;
    const [activeIndex, setActiveIndex] = useState(0);
    const [fill, setFill] = useState(pieColor.defaultColor);

    const [data, setData] = useState([]);
    const [mem, setMem] = useState();
    const [disk, setDisk] = useState({
        total: '',
        device: '',
        path: '',
        fstype: '',
    });

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

            //used -> FREE 값 가져옴
            const response = await getMcNetworksDisk(mac);
            const value = response.data[0].used_percent;

            const valueCompare = 100 - Number(value);
            const use = Number(value.toFixed(2));
            const free = Number(valueCompare.toFixed(2));

            let useColor = pieColor.diskColor.use;
            let freeColor = pieColor.diskColor.free;

            if (use >= Number(warringUsed)) {
                useColor = pieColor.warringColor;
                freeColor = pieColor.warringColor;
            }

            //console.log("Number(response.data[0].total) : ", Number(response.data[0].total));
            const subContent = `(Total : ${(Number(response.data[0].total) / gigaBytes).toFixed(decimal)} GB)`;
            const labelVal = `${(Number(response.data[0].used) / gigaBytes).toFixed(decimal)} GB`;

            setDisk({
                total: subContent,
                device: response.data[0].device,
                path: response.data[0].path,
                fstype: response.data[0].fstype,
            });

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
                    id: "available", /*free*/
                    label: "available",
                    labelVal,
                    value: free,
                    fillColor: freeColor,
                    err: response.data[0].err,
                },
            ];
            setData(data.concat(cpData));
        } catch {
            console.log("disk MyResponsivePie response error");
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        //getData();
        /*const timer = setInterval(getData, 5000);
        return () => clearInterval(timer);*/
    }, []);

    return (
        <Card className="cb-card">
            <CardBody className="cb-card-body">
                <p>{title} {disk.device}</p>
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
                            cy={130}
                            innerRadius="50%"
                            outerRadius="59%"
                            onMouseEnter={onPieEnter}
                            onMouseLeave={onPieLeave}
                            name="DISK"
                        />
                    </PieChart>
                </ResponsiveContainer>
                {/*<p>{disk.total}</p>*/}
            </CardBody>
        </Card>
    );
};

export default MyResponsivePie;
