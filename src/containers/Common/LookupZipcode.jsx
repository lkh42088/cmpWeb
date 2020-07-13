import React, {useEffect, useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {Button} from "@material-ui/core";
import DaumPostcode from "react-daum-postcode";


const LookupZipcode = (props) => {
    /************************************************************************************
     * Props
     ************************************************************************************/
    const { open, handleClose, handleComplete } = props;

    /************************************************************************************
     * Variable
     ************************************************************************************/
    const [zip, setZip] = useState("");
    const [address, setAddress] = useState("");
    const autoResizeVal = true;

    /************************************************************************************
     * Function
     ************************************************************************************/
    const onComplete = (data) => {
        console.log("onComplete: zip ", data.zonecode);
        console.log("onComplete: address ", data.address);
        setAddress(data.address);
        setZip(data.zonecode);
        handleComplete(data.zonecode, data.address);
    };

    /*******************
     * useEffect
     *******************/
    useEffect(() => {
        setZip("");
    }, []);

    /************************************************************************************
     * JSX Template
     ************************************************************************************/
    console.log("LookupZip...");
    return (
        <Dialog
            onClose={handleClose}
            open={open}
        >
            <DialogTitle id="simple-dialog-title">
                <div>
                    <h3 className="bold-text">우편번호 검색</h3>
                </div>
            </DialogTitle>
            <DialogContent>
                <div>
                    <DaumPostcode
                        onComplete={onComplete}
                        width="300px"
                        height="470px"
                    />
                </div>
            </DialogContent>
            <DialogContent>
                {zip !== "" ? (
                    <div>
                        <h6> 우편번호 : {zip} <br/>
                         주소: {address} </h6>
                    </div>
                ) : "" }
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    color="primary"
                    autoFocus
                >
                    닫기
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LookupZipcode;
