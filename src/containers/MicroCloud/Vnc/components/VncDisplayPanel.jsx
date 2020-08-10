import React, {useState} from 'react';
import {TextField} from "@material-ui/core";
import VncDisplay from "react-vnc-display";

const VncDisplayPanel = () => {
    const [url, setUrl] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        console.log("■■■ ", e.target.value);
        if (e.target.value) {
            setUrl(e.target.value);
        }
    };

    return (
        <>
            <form>
                <TextField
                    id="outlined-multiline-flexible"
                    label="VNC URL"
                    rowsMax={4}
                    value={url}
                    onChange={handleChange}
                    variant="outlined"
                />
            </form>
            {/*<VncDisplay />*/}
            <VncDisplay url="wss://192.168.0.73:5900" />
        </>
    );
};

export default VncDisplayPanel;
