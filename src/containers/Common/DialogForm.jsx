import React from "react";
import {Card, CardBody} from "reactstrap";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const DialogForm = (props) => {
    const {
        open, handleClose, handleSubmit, data,
        childComponent, title, icon,
    } = props;

    return (
        <Dialog
            open={open}
        >
            <Card>
                <CardBody>
                    <div className="card__title">
                        <Grid container spacing={1} alignItems="center">
                            <Grid item>
                                {icon}
                            </Grid>
                            <Grid item>
                                <h4 className="bold-text">{title}</h4>
                            </Grid>
                        </Grid>
                    </div>
                    {childComponent}
                </CardBody>
            </Card>
        </Dialog>
    );
};

export default DialogForm;
