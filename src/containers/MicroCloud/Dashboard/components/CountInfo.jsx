import React, {useEffect, useState, Fragment} from "react";
import {Card, CardBody} from "reactstrap";
import NumberFormat from "react-number-format";

import {
    PieChart, Pie, Sector, ResponsiveContainer,
} from 'recharts';
import {getMcNetworksCpu} from "../../../../lib/api/microCloudCpu";
import GraphPie from "./GraphPie";

const CountInfo = (props) => {
    const {
        count, title, color, mac, warringUsed,
    } = props;

    return (
        <Card className="cb-card"
              style={title !== "Backup 개수" ? {marginBottom: "10px"} : {marginBottom: "0"}}
        >
            <CardBody className="nb-card-body-graph" style={{
                background: color,
            }}>
                <p style={{
                    color: "white",
                    fontSize: "0.7rem",
                }}>{title}</p>
                <Fragment>
                    <p style={{
                        textAlign: "center",
                        margin: "10px auto",
                        color: "white",
                    }}>
                            <span style={{
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                                textShadow: "2px 2px 4px black",
                            }}>
                                {/*{Number(count)}*/}
                                <NumberFormat value={count} displayType="text" thousandSeparator/>
                            </span>
                    </p>
                </Fragment>
            </CardBody>
        </Card>
    );
};

export default CountInfo;
