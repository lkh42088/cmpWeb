import React, {useEffect, useState, Fragment} from "react";
import Dialog from "@material-ui/core/Dialog";
import {Card, CardBody, CardHeader} from "reactstrap";
import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import {makeStyles} from "@material-ui/core/styles";
import BackupRestoreIcon from "mdi-react/BackupRestoreIcon";
import TableCell from "@material-ui/core/TableCell";

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
        backup,
        handleClose,
        handleSubmit,
    } = props;

    const [vmName, setVmName] = useState("");
    const [fileName, setFileName] = useState("");
    const [registerDate, setRegisterDate] = useState("");

    const handleCancel = () => {
        handleClose();
    };

    const handleSubmitInternal = () => {
        handleSubmit(backup);
    };

    useEffect(() => {
        if ((backup !== null) && (backup.vmName !== null)) {
            setVmName(backup.vmName);
        }
        if ((backup !== null) && (backup.name !== null)) {
            setFileName(backup.filename);
        }
        if (backup !== null) {
            setRegisterDate(`${backup.year}년 ${backup.month}월 ${backup.day}일 ${backup.hour}:${backup.minute}:${backup.second}`);
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
                <CardHeader>
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item md={1}><BackupRestoreIcon/></Grid>
                            <Grid><h3 className="bold-text">VM Backup Restore</h3></Grid>
                        </Grid>
                </CardHeader>
                <CardBody>
                    <React.Fragment>
                        <form className={formClassName}>
                            {/*<Grid container alignItems="center" spacing={1}>*/}
                            <Grid>
                                <Grid item>
                                    <div style={{
                                        margin: "20px 50px 30px 50px",
                                    }}>
                                        <h4>- VM NAME : <b>{vmName}</b></h4>
                                        <h4>- 파일 이름 : <b>{fileName}</b></h4>
                                        <h4>- 최종 날짜 : <b>{registerDate}</b></h4>
                                    </div>
                                    <div style={{margin: "20px 50px 30px 50px", color: "red"}}>
                                        <h4><b>* 진행 시 PC가 백업 시점으로 Rollback 되며 되돌릴 수 없습니다.</b></h4>
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
                                        >
                                             확인
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
