import React, {useEffect, useState, Fragment} from "react";
import {
    Card, CardBody, Container, Table,
} from "reactstrap";
import {
    PieChart, Pie, Sector, ResponsiveContainer,
} from 'recharts';
import TargetIcon from "mdi-react/TargetIcon";
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import InfoIcon from '@material-ui/icons/Info';

import {getSystemInfoByMac} from "../../../../lib/api/microCloud";
import {getMcNetworksDisk} from "../../../../lib/api/microCloudDisk";
import {getMcNetworksMem} from "../../../../lib/api/microCloudMem";

const MyResponsiveInfo = (props) => {
    const {
        height, title, pieColor, mac, warringUsed,
    } = props;
    const [activeIndex, setActiveIndex] = useState(0);

    const [data, setData] = useState([]);
    const [disk, setDisk] = useState("");
    const [mem, setMem] = useState("");

    useEffect(() => {
        setActiveIndex(activeIndex);
    }, [activeIndex]);

    const getData = async () => {
        try {
            console.log("mac : ", mac);
            const marker = 1024; // Change to 1000 if required
            const decimal = 2; // Change as required
            const gigaBytes = marker * marker * marker; // One GB is 1024 MB

            if (mac === "nodata") {
                setData("");
            } else {
                const responseSys = await getSystemInfoByMac(mac);
                const responseDisk = await getMcNetworksDisk(mac);
                const responseMem = await getMcNetworksMem(mac);

                const subContentDisk = `${(Number(responseDisk.data[0].total) / gigaBytes).toFixed(decimal)}`;
                const subContentMem = `${(Number(responseMem.data[0].total) / gigaBytes).toFixed(decimal)}`;

                setData(responseSys.data);
                setDisk(subContentDisk);
                setMem(subContentMem);
            }
        } catch {
            console.log("cpu MyResponsivePie response error");
        }
    };

    useEffect(() => {
        getData();
    }, [mac]);

    return (
        <Card className="cb-card"
              style={data ? {} : {height: "calc(100%)"}}>
            {data ? (
                <Fragment>
                    <CardBody className="cb-card-body">
                        <p style={{
                            textDecoration: "solid overline #ffc93c",
                            /*textDecoration: "overline #ffc93c",*/
                        }}>{title} [{data.hostname}]</p>
                        <Container
                            className="dashboard"
                            style={{
                                padding: "10px",
                                /*height: "100%",*/
                            }}
                        >
                            <Table responsive striped>
                                <tbody>
                                <tr>
                                    <td><p className="bold-text dashboard__btc">OS</p></td>
                                    <td colSpan={2}>{data.os}</td>
                                </tr>
                                <tr>
                                    <td><p className="bold-text dashboard__btc">CPU Model</p></td>
                                    <td colSpan={2}>{data.cpuModel}</td>
                                </tr>
                                <tr>
                                    <td><p className="bold-text dashboard__btc">CPU Core</p></td>
                                    <td colSpan={2}>{data.cpuCore} cores</td>
                                </tr>
                                <tr>
                                    <td><p className="bold-text dashboard__ste">Platform</p></td>
                                    <td colSpan={2}>{data.platform}&nbsp;{data.platformVersion}</td>
                                </tr>
                                <tr>
                                    <td><p className="bold-text dashboard__ste">Kernel</p></td>
                                    <td colSpan={2}>{data.kernelArch}</td>
                                </tr>
                                <tr>
                                    <td><p className="bold-text dashboard__eth">If Name</p></td>
                                    <td colSpan={2}>{data.ifName}</td>
                                </tr>
                                <tr>
                                    <td><p className="bold-text dashboard__eth">IP</p></td>
                                    <td colSpan={2}>{data.ip}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Container>
                        <Container
                            className="dashboard"
                            style={{
                                padding: "0",
                                /*height: "100%",*/
                            }}
                        >
                            <div>
                                <div className="dashboard__booking-our-mission"
                                     style={{
                                         height: "60px",
                                         borderTopRightRadius: 0,
                                         borderTopLeftRadius: 0,
                                         borderBottomRightRadius: "5px",
                                         borderBottomLeftRadius: "5px",
                                     }}>
                                    <InfoIcon/>
                                    {/*<p className="dashboard__booking-our-mission-title">Our mission</p>*/}
                                    <p style={{
                                        fontSize: "x-small",
                                        fontWeight: "800",
                                    }}>Memory Total : <span style={{
                                        fontSize: "x-small",
                                        fontWeight: "100",
                                    }}>{mem}GB</span></p>
                                    <p style={{
                                        fontSize: "x-small",
                                        fontWeight: "800",
                                    }}>Disk Total : <span style={{
                                        fontSize: "x-small",
                                        fontWeight: "100",
                                    }}>{disk}GB</span></p>
                                </div>
                            </div>
                        </Container>
                    </CardBody>
                </Fragment>
            ) : (
                <Fragment>
                    <CardBody className="cb-card-body">
                        <p style={{
                            textDecoration: "solid overline #ffc93c",
                            /*textDecoration: "overline #ffc93c",*/
                        }}>{title}</p>
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
                    </CardBody>
                </Fragment>
            )}
        </Card>
    );
};

export default MyResponsiveInfo;
