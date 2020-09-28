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
            //console.log("mac : ", mac);
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

                console.log("responseSys.data : ", responseSys.data);

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
                        <p>{title} [{data.hostname}]</p>
                        <Container
                            className="dashboard"
                            style={{
                                padding: "10px",
                            }}
                        >
                            <Table responsive striped>
                                <tbody>
                                <tr>
                                    <td><p className="bold-text dashboard__btc">OS</p></td>
                                    <td colSpan={2}>{data.platform}&nbsp;{data.platformVersion}</td>
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
                                    <td><p className="bold-text dashboard__ste">Architecture</p></td>
                                    <td colSpan={2}>{data.kernelArch}</td>
                                </tr>
                                <tr>
                                    <td><p className="bold-text dashboard__ste">Kernel</p></td>
                                    <td colSpan={2}>{data.kernelVersion}</td>
                                </tr>
                                <tr>
                                    <td><p className="bold-text dashboard__eth">Interface</p></td>
                                    <td colSpan={2}>{data.ifName}&nbsp;{data.ifMac}</td>
                                </tr>
                                <tr>
                                    <td><p className="bold-text dashboard__eth">IP</p></td>
                                    <td colSpan={2}>{data.ip}</td>
                                </tr>
                                {/*<tr>
                                    <td><p className="bold-text dashboard__lit">Total Memory</p></td>
                                    <td colSpan={2}>{mem}GB</td>
                                </tr>
                                <tr>
                                    <td><p className="bold-text dashboard__lit">Total Disk</p></td>
                                    <td colSpan={2}>{disk}GB</td>
                                </tr>*/}
                                <tr>
                                    <td rowSpan={3}><p className="bold-text dashboard__lit">Total</p></td>
                                    <td colSpan={2}>{mem}GB (Memory)</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>{disk}GB (Disk)</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Container>
                        {/*<Container
                            className="dashboard"
                            style={{
                                padding: "0",
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
                                    <p style={{
                                        fontSize: "x-small",
                                        fontWeight: "800",
                                    }}>Total Memory : <span style={{
                                        fontSize: "x-small",
                                        fontWeight: "100",
                                    }}>{mem}GB</span></p>
                                    <p style={{
                                        fontSize: "x-small",
                                        fontWeight: "800",
                                    }}>Total Disk : <span style={{
                                        fontSize: "x-small",
                                        fontWeight: "100",
                                    }}>{disk}GB</span></p>
                                </div>
                            </div>
                        </Container>*/}
                    </CardBody>
                </Fragment>
            ) : (
                <Fragment>
                    <CardBody className="cb-card-body">
                        <p>{title}</p>

                        <Fragment>
                            <p style={{
                                textAlign: "center",
                                margin: "110px auto",
                            }}>
                                <span style={{
                                    fontSize: "1.3rem",
                                    color: "red",
                                }}>
                                    NO DATA
                                </span>
                                <br/>
                                <span textAnchor="middle"
                                      style={{
                                          fontSize: "0.8rem",
                                      }}>
                                    데이터가 없습니다.
                                </span>
                            </p>
                        </Fragment>
                    </CardBody>
                </Fragment>
            )}
        </Card>
    );
};

export default MyResponsiveInfo;
