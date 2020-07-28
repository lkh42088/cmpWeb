import React from "react";
import {Card, CardBody, CardHeader} from "reactstrap";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const DialogForm = (props) => {
    const {
        open, handleClose, handleSubmit, data,
        childComponent, title, icon, width,
    } = props;

    return (
        <Dialog
            open={open}
        >
            <Card>
                <CardHeader style={{textAlign: "center"}}>
                    <div>
                        <Grid container spacing={1} alignItems="center">
                            <Grid item>
                                {icon}
                            </Grid>
                            <Grid item>
                                <h4 className="bold-text">{title}</h4>
                            </Grid>
                        </Grid>
                    </div>
                </CardHeader>
                <CardBody style={{width, fontSize: "12px"}}>
                    {childComponent}
                </CardBody>
            </Card>
        </Dialog>
    );
};

export default DialogForm;
