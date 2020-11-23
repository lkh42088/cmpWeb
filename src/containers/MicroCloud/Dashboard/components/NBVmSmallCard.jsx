import React from "react";
import {
    Card, CardBody, CardHeader,
} from "reactstrap";

const NBVmSmallCard = (props) => {
    const {vm} = props;

    return (
        <Card className="nb-card-carousel-slick">
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
                            <p>{vm.domainAddr}</p>
                        </div>
                        <div className={vm.currentStatus.toString() === 'running'
                            ? "vm__stat-carousel-on" : "vm__stat-title"}>
                            <p>{vm.remoteAddr}</p>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default NBVmSmallCard;
