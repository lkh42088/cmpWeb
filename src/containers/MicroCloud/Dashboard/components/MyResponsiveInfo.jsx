import React, {useEffect, useState} from "react";
import {
    Card, CardBody, Container, Table,
} from "reactstrap";
import {
    PieChart, Pie, Sector, ResponsiveContainer,
} from 'recharts';
import TargetIcon from "mdi-react/TargetIcon";
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import InfoIcon from '@material-ui/icons/Info';

import {getMcNetworksCpu} from "../../../../lib/api/microCloudCpu";

const MyResponsiveInfo = (props) => {
    const {
        height, title, pieColor, mac, warringUsed,
    } = props;
    const [activeIndex, setActiveIndex] = useState(0);

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
        console.log("Info getData start");
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        /*const timer = setInterval(getData, 5000);
        return () => clearInterval(timer);*/
    }, []);

    return (
        <Card className="cb-card">
            <CardBody className="cb-card-body">
                <p style={{
                    textDecoration: "solid overline #ffc93c",
                    /*textDecoration: "overline #ffc93c",*/
                }}>{title}</p>

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
                            <td colSpan={2}>win10</td>
                        </tr>
                        <tr>
                            <td><p className="bold-text dashboard__btc">CPU Model</p></td>
                            <td colSpan={2}>cpu model</td>
                        </tr>
                        <tr>
                            <td><p className="bold-text dashboard__btc">CPU Core</p></td>
                            <td colSpan={2}>2 cpres</td>
                        </tr>
                        <tr>
                            <td><p className="bold-text dashboard__ste">Platform</p></td>
                            <td colSpan={2}>platform</td>
                        </tr>
                        <tr>
                            <td><p className="bold-text dashboard__ste">Kernel</p></td>
                            <td colSpan={2}>kernel</td>
                        </tr>
                        <tr>
                            <td><p className="bold-text dashboard__eth">If Name</p></td>
                            <td colSpan={2}>name</td>
                        </tr>
                        <tr>
                            <td><p className="bold-text dashboard__eth">IP</p></td>
                            <td colSpan={2}>255.255.255.255</td>
                        </tr>
                        </tbody>
                    </Table>
                </Container>
            </CardBody>

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
                        }}>15.31GB</span></p>
                        <p style={{
                            fontSize: "x-small",
                            fontWeight: "800",
                        }}>Disk Total : <span style={{
                            fontSize: "x-small",
                            fontWeight: "100",
                        }}>195.31GB</span></p>
                    </div>
                </div>
            </Container>
        </Card>
    );
};

export default MyResponsiveInfo;
