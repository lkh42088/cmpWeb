import React, {useEffect, useState, Fragment} from "react";
import {Card, CardBody} from "reactstrap";
import {
    PieChart, Pie, Sector, ResponsiveContainer,
} from 'recharts';
import {getMcNetworksCpu} from "../../../../lib/api/microCloudCpu";
import GraphPie from "./GraphPie";

const CountInfo = (props) => {
    const {
        count, title, color, mac, warringUsed,
    } = props;

    /**************************************************************
     * Handle Function
     **************************************************************/


    /**************************************************************
     * Axios Function
     **************************************************************/


    /**************************************************************
     * useEffect
     **************************************************************/

    return (
        <Card className="cb-card"
              style={title !== "Backup 개수" ? {marginBottom: "10px"} : {marginBottom: "0"}}
        >
            <CardBody className="cb-card-body" style={{
                background: color,
            }}>
                <p style={{
                    color: "white",
                }}>{title}</p>
                <Fragment>
                    <p style={{
                        textAlign: "center",
                        margin: "30px auto",
                        color: "white",
                    }}>
                            <span style={{
                                fontSize: "1.3rem",
                            }}>
                                {count}
                            </span>
                    </p>
                </Fragment>
            </CardBody>
        </Card>
    );
};

export default CountInfo;
