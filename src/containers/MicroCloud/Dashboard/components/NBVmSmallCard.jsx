import React, {useEffect, useState, Fragment} from "react";
import {Card, CardBody} from "reactstrap";
import NumberFormat from "react-number-format";

const NBVmSmallCard = (props) => {
    const {vm} = props;
    const color = () => {
        console.log(vm.currentStatus);
        if (vm.currentStatus === 'running') {
            return "#63a4ff";
        }
        return "#999999";
    };

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
        <Card className="nb-card-carousel">
            <CardBody className="nb-carousel-card" style={{
                background: color(),
            }}>
                <p style={{
                    color: "white",
                }}>{vm.name}</p>
                <p style={{
                    textAlign: "center",
                    margin: "5px auto",
                    color: "white",
                }}>
                    <p style={{fontSize: "0.6rem", color: "white"}}>{vm.ipAddr}</p>
                    <p style={{fontSize: "0.6rem", color: "white"}}>{vm.remoteAddr}</p>
                </p>
            </CardBody>
        </Card>
    );
};

export default NBVmSmallCard;
