import React from "react";
import Dialog from "@material-ui/core/Dialog";
import {Card, CardBody} from "reactstrap";
import Grid from "@material-ui/core/Grid";
import DnsRoundedIcon from "@material-ui/icons/DnsRounded";
import WriteVm from "./WriteVm";

const ModifyVm = (props) => {
    const {
        open, handleClose, handleSubmit,
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
                                <h3 className="bold-text">VM 수정</h3>
                            </Grid>
                        </Grid>
                    </div>
                    <WriteVm
                        open={open}
                        handleClose={handleClose}
                        handleSubmit={handleSubmit}
                        isRegister={false}
                    />
                </CardBody>
            </Card>
        </Dialog>
    );
};

export default ModifyVm;
