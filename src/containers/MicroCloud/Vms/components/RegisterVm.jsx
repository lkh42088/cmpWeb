import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import {Card, CardBody} from "reactstrap";
import Grid from "@material-ui/core/Grid";
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import WriteVm from "./WriteVm";

const RegisterVm = (props) => {
    const {
        open, handleClose, handleSubmit, user,
    } = props;

    return (
        <Dialog
            open={open}
        >
            <Card>
                <CardBody>
                    <div className="card__title">
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item>
                                <DnsRoundedIcon/>
                            </Grid>
                            <Grid item>
                                <h3 className="bold-text">VM 등록</h3>
                            </Grid>
                        </Grid>
                    </div>
                    <WriteVm
                        open={open}
                        user={user}
                        handleClose={handleClose}
                        handleSubmit={handleSubmit}
                        isRegister
                    />
                </CardBody>
            </Card>
        </Dialog>
    );
};

export default RegisterVm;
