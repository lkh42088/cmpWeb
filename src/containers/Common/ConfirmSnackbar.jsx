import SnackbarContent from "@material-ui/core/SnackbarContent";
import React, {Fragment} from "react";
import MatButton from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

const ConfirmSnackbar = (props) => {
    const {
        open, warningStyle, warningIcon, warningContents,
        handleClick, handleClose,
    } = props;
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
        >
            <SnackbarContent
                style={warningStyle}
                message={(
                    <span id="client-snackbar" style={{lineHeight: "2"}}>
                        {warningIcon}&nbsp;{warningContents}
                    </span>
                )}
                action={(
                    <Fragment>
                        <MatButton className="modal_ok" color="secondary"
                                   size="small"
                                   onClick={handleClick}>Ok</MatButton>
                        <MatButton className="modal_ok" color="secondary"
                                   size="small"
                                   onClick={handleClose}>Close</MatButton>
                    </Fragment>
                )}
            />
        </Snackbar>
    );
};

export default ConfirmSnackbar;
