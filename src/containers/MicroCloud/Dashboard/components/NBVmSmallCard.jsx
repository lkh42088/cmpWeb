import React, {useEffect, useState, Fragment} from "react";
import {
    Card, CardBody, CardHeader, Progress,
} from "reactstrap";
import NumberFormat from "react-number-format";
import {NavLink} from "react-router-dom";
import {Tooltip as TooltipMat} from "@material-ui/core";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";

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

            {/*<div className={vm.currentStatus.toString() === "running"
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
                </div>*/}
            <CardHeader
                className={vm.currentStatus.toString() === 'running'
                    ? "vm__card_header-running" : "vm__card_header"}
            >
                {vm.name}
            </CardHeader>
            {/*#00bcd4*/}
            <CardBody className="vm__card-carousel"
                      style={vm.currentStatus.toString() === 'running'
                          ? {background: "#00bcd4"} : {}}>
                <div className="vm__stats_border-none">
                    <div className="vm__stat_border-none">
                        <div className={vm.currentStatus.toString() === 'running'
                            ? "vm__stat-carousel-on" : "vm__stat-title"}>
                            <p>{vm.ipAddr}</p>
                        </div>
                        <div className={vm.currentStatus.toString() === 'running'
                            ? "vm__stat-carousel-on" : "vm__stat-title"}>
                            <p>{vm.remoteAddr}</p>
                        </div>
                    </div>
                </div>
            </CardBody>
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
