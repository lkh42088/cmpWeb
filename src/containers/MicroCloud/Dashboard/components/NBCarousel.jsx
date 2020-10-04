import React, {useEffect, useState} from 'react';
import ReactCardCarousel from "react-card-carousel";
import {useSelector} from "react-redux";
import CountInfo from "./CountInfo";
import {OPERATOR} from "../../../../lib/var/globalVariable";
import {getMcVms} from "../../../../lib/api/microCloud";

const NBCarousel = (props) => {
    const {vmCount, snapshotCount, backupCount} = props;

    return (
        <div className="nb-carousel-container">
            <ReactCardCarousel autoplay autoplay_speed={5000}>
                <div className="nb-carousel-card">
                    <CountInfo title="VM 개수" count={vmCount}
                               color="#00bcd4"/>
                </div>
                <div className="nb-carousel-card">
                    <CountInfo title="Snapshot 개수" count={snapshotCount}
                               color="#ffa931"/>
                </div>
                <div className="nb-carousel-card">
                    <CountInfo title="Backup 개수" count={backupCount}
                               color="#0f4c75"/>
                </div>
            </ReactCardCarousel>
        </div>
    );
};

export default NBCarousel;
