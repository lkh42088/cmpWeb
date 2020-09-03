import React, {useEffect} from 'react';
import {
    Button, Col, Container, Row,
} from 'reactstrap';
import SettingsIcon from "mdi-react/SettingsIcon";
import CloseIcon from "mdi-react/CloseIcon";
import classNames from "classnames";

import VmMain from './components/VmMain';

const settings = `${process.env.PUBLIC_URL}/img/settings.svg`;

const Contents = () => {
    console.log("contents....NETWORK");
/*    const [open, setOpen] = useEffect();

    const customizerClass = classNames({
        customizer__wrap: true,
        'customizer__wrap--open': open,
    });

    const handleOpen = () => {
        console.log("handleOpen");
        setOpen(!open);
    };*/

    return (
        <div>
            <button className="cusNet__btn" type="button">
                <SettingsIcon/>
            </button>
            {/*<div className={customizerClass} hidden={!open}>
                <div className="customizer__title-wrap">
                    <h5>Customizer Network</h5>
                    <button className="customizer__close-btn" type="button" onClick={handleOpen}>
                        <CloseIcon />
                    </button>
                </div>
            </div>*/}
        </div>
    );
};

export default Contents;
