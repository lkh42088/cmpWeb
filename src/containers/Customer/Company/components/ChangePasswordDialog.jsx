import React, {useEffect, useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import {Card, CardBody} from "reactstrap";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TextField from '@material-ui/core/TextField';
import {Button} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import {makeStyles} from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {checkPassword} from "../../../../lib/api/login";
import {checkPasswordPattern} from "../../../../lib/utils/utils";

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const ChangePasswordDialog = (props) => {
    const classes = useStyles();
    const {
        open, handleClose, handleComplete, userId,
    } = props;
    const [fields, setFields] = useState({
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
    });
    const [errors, setErrors] = useState({
        oldPassword: false,
        newPassword: false,
        newPasswordConfirm: false,
    });
    const [helpers, setHelpers] = useState({
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
    });


    const reset = () => {
        setFields({
            oldPassword: "",
            newPassword: "",
            newPasswordConfirm: "",
        });
        setErrors({
            oldPassword: false,
            newPassword: false,
            newPasswordConfirm: false,
        });
        setHelpers({
            oldPassword: "",
            newPassword: "",
            newPasswordConfirm: "",
        });
    };

    const handleCancel = () => {
        reset();
        handleClose();
    };

    const doCheckPassword = async () => {
        try {
            //console.log("check password: ", userId, ", ", fields.oldPassword);
            const response = await checkPassword({
                id: userId,
                password: fields.oldPassword,
            });
            //console.log("docheck password... success", response);
            //console.log("docheck password... success data ", response.data);
            handleComplete(fields.newPassword);
            reset();
        } catch (e) {
            console.log("docheck password... fail");
            setErrors({
                ...errors,
                oldPassword: true,
            });
            setHelpers({
                ...helpers,
                oldPassword: "* 패스워드가 일치하지 않습니다!",
            });
        }
    };

    const handleSubmit = () => {
        if (fields.newPassword !== fields.newPasswordConfirm) {
            setErrors({
                ...errors,
                newPassword: true,
                newPasswordConfirm: true,
            });
            setHelpers({
                ...helpers,
                newPassword: "* 패스워드가 일치하지 않습니다!",
                newPasswordConfirm: "* 패스워드가 일치하지 않습니다!",
            });
            return;
        }

        const result = checkPasswordPattern(fields.newPassword);
        if (result !== "") {
            setErrors({
                ...errors,
                newPassword: true,
                newPasswordConfirm: true,
            });
            setHelpers({
                ...helpers,
                newPassword: result,
                newPasswordConfirm: result,
            });
            return;
        }
        doCheckPassword();
    };

    const handleChangeField = (e) => {
        const {name, value} = e.target;
        setFields({
            ...fields,
            [name]: value,
        });
        if (name.indexOf("Password") !== -1) {
            setErrors({
                ...errors,
                [name]: false,
            });
            setHelpers({
                ...helpers,
                [name]: "",
            });
        } else {
            setErrors({
                ...errors,
                newPassword: false,
                newPasswordConfirm: false,
            });
            setHelpers({
                ...helpers,
                newPassword: "",
                newPasswordConfirm: "",
            });
        }
    };

    return (
        <Dialog
            open={open}
        >
            <Card>
                <CardBody className="card-body">
                    <div className="card__title">
                        <Grid container justify="space-between" spacing={1}>
                            <Grid item>
                                <h3 className="bold-text">Password 변경</h3>
                            </Grid>
                            <Grid item>
                                <IconButton
                                    onClick={handleCancel}
                                    edge="end"
                                    style={{
                                        margin: "0px",
                                        padding: "0px",
                                    }}
                                >
                                    <CloseIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            spacing={1}
                        >
                            <Grid item>
                                <TextField
                                    label="기존 Password"
                                    variant="outlined"
                                    name="oldPassword"
                                    type="password"
                                    value={fields.oldPassword}
                                    error={errors.oldPassword}
                                    helperText={helpers.oldPassword}
                                    onChange={(e) => { handleChangeField(e); }}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="신규 Password"
                                    variant="outlined"
                                    type="password"
                                    name="newPassword"
                                    value={fields.newPassword}
                                    error={errors.newPassword}
                                    helperText={helpers.newPassword}
                                    onChange={(e) => { handleChangeField(e); }}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="신규 Password 확인"
                                    variant="outlined"
                                    type="password"
                                    name="newPasswordConfirm"
                                    value={fields.newPasswordConfirm}
                                    error={errors.newPasswordConfirm}
                                    helperText={helpers.newPasswordConfirm}
                                    onChange={(e) => { handleChangeField(e); }}
                                />
                            </Grid>
                            <Grid item>
                                <div>
                                    <Button
                                        className={classes.margin}
                                        variant="contained"
                                        onClick={handleCancel}
                                        style={{
                                            width: "89px",
                                            margin: "0 0 0 7px",
                                        }}
                                    >
                                        취소
                                    </Button>
                                    <Button
                                        className={classes.margin}
                                        variant="contained"
                                        color="primary"
                                        style={{
                                            width: "89px",
                                            // width: "full",
                                        }}
                                        onClick={handleSubmit}
                                        endIcon={<SendIcon/>}
                                    >
                                        적용
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </CardBody>
            </Card>
        </Dialog>
    );
};

export default ChangePasswordDialog;
