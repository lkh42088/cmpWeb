import React, {useEffect, useState, Fragment} from 'react';
import {
    Col, Row,
} from 'reactstrap';

import MyResponsiveLine from "./MyResponsiveLine";
import MyResponsiveCpu from "./MyResponsiveCpu";
import MyResponsiveMem from "./MyResponsiveMem";
import MyResponsiveDisk from "./MyResponsiveDisk";
import MyResponsiveInfo from "./MyResponsiveInfo";

const pieColor = {
    defaultColor: '#d4d7dd',
    textColor: '#414141',
    warringColor: '#ec0101',
    cpuColor: {
        use: '#3f51b5',
        free: '#63686e',
    },
    memColor: {
        use: '#2fc4b2',
        free: '#63686e',
    },
    diskColor: {
        use: '#ff8364',
        free: '#63686e',
    },
};

const BaremetalMain = (props) => {
    const {
        mac,
    } = props;

    /**************************************************************
     * Axios Function
     **************************************************************/

    /**************************************************************
     * Handle Function
     **************************************************************/

    /**************************************************************
     * useEffect
     **************************************************************/

    return (
        <Fragment>
            <Row className="classes.row">
                <Col md={6} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                    <MyResponsiveInfo
                        height={150}
                        mac={mac}
                        title="HOSTNAME"
                    />
                </Col>
                <Col md={6} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                    <MyResponsiveCpu
                        height={150}
                        mac={mac}
                        title="CPU" pieColor={pieColor} warringUsed={80}/>
                </Col>
                <Col md={6} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                    <MyResponsiveMem
                        height={150}
                        mac={mac}
                        title="MEMORY" pieColor={pieColor} warringUsed={80}/>
                </Col>
                <Col md={6} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                    <MyResponsiveDisk
                        height={150}
                        mac={mac}
                        title="DISK" pieColor={pieColor} warringUsed={80}/>
                </Col>
            </Row>
            <Row>
                <Col md={12} style={{padding: 10}}>
                    <MyResponsiveLine height={400}
                                      title="BareMetal Out Interface"
                                      mac={mac}
                    />
                </Col>
            </Row>
        </Fragment>
    );
};

export default BaremetalMain;
