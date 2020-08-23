import React from 'react';
import {TextField} from "@material-ui/core";
import VncDisplay from "react-vnc-display";

const VncDisplayPanel = (props) => {
    const {target, port} = props;

    return (
        <>
            <VncDisplay url="ws://192.168.0.72:6080" />
        </>
    );
};

export default VncDisplayPanel;
