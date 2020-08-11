import React from 'react';
import {TextField} from "@material-ui/core";
import VncDisplay from "react-vnc-display";

const VncDisplayPanel = (props) => {
    const {target, port} = props;

    return (
        <>
            <VncDisplay url="ws://127.0.0.1:5000" />
        </>
    );
};

export default VncDisplayPanel;
