import React, {useEffect, useState, Fragment} from "react";
import Dialog from "@material-ui/core/Dialog";
import {Card, CardBody} from "reactstrap";
import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import {makeStyles} from "@material-ui/core/styles";
import RestoreIcon from '@material-ui/icons/Restore';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    chip: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    paper: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

const BackupRecoveryModal = (props) => {
    const classes = useStyles();
    const {
        open,
        snap,
        handleClose,
        handleSubmit,
    } = props;

    const [vmName, setVmName] = useState("");
    const [snapName, setSnapName] = useState("");

    const handleCancel = () => {
        handleClose();
    };

    const handleSubmitInternal = () => {
        handleSubmit(snap);
    };

    useEffect(() => {
        if ((snap !== null) && (snap.vmName !== null)) {
            setVmName(snap.vmName);
        }
        if ((snap !== null) && (snap.name !== null)) {
            setSnapName(snap.name);
        }
    }, []);

    const variant = "filled";
    const fieldSize = "small";
    const buttonSize = "large";
    const formClassName = "cb-material-form";
    const labelClassName = "cb-material-form__label";
    const fieldClassName = "cb-material-form__field";

    // console.log(snap);

    return (
        <Dialog open={open}>
            <Card>
                <CardBody>
                    <div className="card__title">
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item>
                                <RestoreIcon/>
                            </Grid>
                            <Grid item>
                                <h3 className="bold-text">VM Snapshot Recovery</h3>
                            </Grid>
                        </Grid>
                    </div>
                    <React.Fragment>
                        <form className={formClassName}>
                            {/*<Grid container alignItems="center" spacing={1}>*/}
                                <Grid container>
                                <Grid item xs={12}>
                                    <div style={{
                                        margin: "0px 0px 20px 30px",
                                    }}>
                                        <h4>- VM 이름: {vmName}</h4>
                                        <h4>- snapshot 날짜: {snapName}</h4>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div>
                                        <Button
                                            variant="contained"
                                            size={buttonSize}
                                            onClick={handleCancel}
                                        >
                                            취소
                                        </Button>
                                        <Button
                                            className={classes.margin}
                                            variant="contained"
                                            color="primary"
                                            size={buttonSize}
                                            onClick={handleSubmitInternal}
                                            endIcon={<SendIcon/>}
                                        >
                                            전송
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </form>
                    </React.Fragment>
                </CardBody>
            </Card>
        </Dialog>
    );
};

export default BackupRecoveryModal;
