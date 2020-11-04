import React from "react";
import Dialog from "@material-ui/core/Dialog";
import {Card, CardBody} from "reactstrap";
import Grid from "@material-ui/core/Grid";
import DnsRoundedIcon from "@material-ui/icons/DnsRounded";
import WriteAccessSecurity from "./WriteAccessSecurity";
import WriteVm from "../../Vms/components/WriteVm";

const ModifyAccessSecurity = (props) => {
    const {
        open, handleClose, handleSubmit, data, user,
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
                                <h3 className="bold-text">IP 접근제어 설정 수정 (사용 안함)</h3>
                            </Grid>
                        </Grid>
                    </div>
                    <WriteAccessSecurity
                        open={open}
                        user={user}
                        handleClose={handleClose}
                        handleSubmit={handleSubmit}
                        isRegister={false}
                        data={data}
                    />
                </CardBody>
            </Card>
        </Dialog>
    );
};

export default ModifyAccessSecurity;
