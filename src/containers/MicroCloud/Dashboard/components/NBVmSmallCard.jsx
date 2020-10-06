import React, {useEffect, useState, Fragment} from "react";
import {Card, CardBody} from "reactstrap";
import NumberFormat from "react-number-format";

const NBVmSmallCard = (props) => {
    const {vm} = props;
    // const color = () => {
    //     console.log(vm.currentStatus);
    //     if (vm.currentStatus === 'running') {
    //         return "#63a4ff";
    //     }
    //     return "#999999";
    // };

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
        <Card className="nb-card-carousel" style={{
            borderRadius: "10px",
        }}>
            {/*<CardBody className="nb-carousel-card" style={{*/}
            {/*    background: color(),*/}
            {/*}}>*/}

                <div className={vm.currentStatus.toString() === "running"
                    ? "nb-card nb-carousel-card-back-on"
                    : "nb-card nb-carousel-card-back-off"
                }>
                    <p className="title">
                        &nbsp;&nbsp;&nbsp;{vm.name}
                    </p>
                    <p className="content">
                        <li>{vm.ipAddr}</li>
                        <li>{vm.remoteAddr}</li>
                    </p>
                </div>
            {/*<div className={vm.currentStatus.toString() === "running"
                ? "nb-card nb-carousel-card-back-on"
                : "nb-card nb-carousel-card-back-off"
            }>
                <p style={{
                    color: "white",
                    fontWeight: "bold",
                    border: "4px solid transparent",
                    borderLeftColor: "#4ce1b6",
                }}>
                    &nbsp;&nbsp;&nbsp;{vm.name}
                </p>
                <div style={{
                    textAlign: "center",
                    margin: "5px auto",
                    color: "white",
                }}>
                    <p style={{fontSize: "0.8rem", color: "white"}}>{vm.ipAddr}</p>
                    <p style={{fontSize: "0.8rem", color: "white"}}>{vm.remoteAddr}</p>
                </div>
            </div>*/}
        </Card>
    );
};

export default NBVmSmallCard;
