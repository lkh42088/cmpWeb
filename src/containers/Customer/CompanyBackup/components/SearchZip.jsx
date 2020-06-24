import React, {useEffect, useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DaumPostcode from "react-daum-postcode";
import DialogActions from "@material-ui/core/DialogActions";
import {Button} from "@material-ui/core";

const SearchZip = (props) => {
    const { open, handleClose, handleComplete } = props;
    const [zip, setZip] = useState("");
    const [address, setAddress] = useState("");
    const autoResizeVal = true;

    const onComplete = (data) => {
        console.log("onComplete: zip ", data.zonecode);
        console.log("onComplete: address ", data.address);
        setAddress(data.address);
        setZip(data.zonecode);
        handleComplete({zip: data.zonecode, address: data.address});
    };

    useEffect(() => {
        setZip("");
    }, []);

    console.log("SearchZip...");
    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={open}
        >
            <DialogTitle id="simple-dialog-title">우편번호 검색</DialogTitle>
            <DialogContent>
                <div>
                    <DaumPostcode
                        onComplete={onComplete}
                        autoResize={autoResizeVal}
                    />
                </div>
            </DialogContent>
            <DialogContent>
                {zip !== "" ? (
                    <div>
                        <h4> 우편번호 : {zip} </h4>
                        <h4> 주소: {address} </h4>
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

export default SearchZip;
