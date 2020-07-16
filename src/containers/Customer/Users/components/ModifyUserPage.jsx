import React from "react";
import {Card, CardBody} from "reactstrap";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import WriteUserForm from "./WriteUserForm";


const ModifyUserPage = (props) => {
    /************************************************************************************
     * Props
     ************************************************************************************/
    const {
        open, handleClose, handleSubmit, data,
    } = props;

    return (
        <Dialog
            open={open}
        >
            <Card>
                <CardBody>
                    <div className="card__title">
                        <Grid container spacing={1}>
                            <Grid item>
                                <AccountCircleIcon/>
                            </Grid>
                            <Grid item>
                                <h3 className="bold-text">계정 수정</h3>
                            </Grid>
                        </Grid>
                    </div>
                    <WriteUserForm
                        open={open}
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

export default ModifyUserPage;
