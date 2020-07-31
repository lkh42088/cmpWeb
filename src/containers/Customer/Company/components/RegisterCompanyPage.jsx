import React from "react";
import {
    Card, CardBody, Col,
} from "reactstrap";
import Dialog from "@material-ui/core/Dialog";
import Grid from '@material-ui/core/Grid';
import BusinessIcon from '@material-ui/icons/Business';
import WriteCompanyFrom from "./WriteCompanyForm";

const RegisterCompanyPage = (props) => {
    const {open, handleClose, handleSubmit } = props;

    // console.log("Register Company Page..");
    return (
        <Dialog
            open={open}
        >
            <Col xs={8} md={12} lg={12}>
                <Card>
                    <CardBody>
                        <div className="card__title">
                            <Grid container spacing={1}>
                                <Grid item>
                                    <BusinessIcon/>
                                </Grid>
                                <Grid item>
                                    <h3 className="bold-text">고객사 등록</h3>
                                </Grid>
                        </Grid>
                    </div>
                        <WriteCompanyFrom
                            open={open}
                            handleClose={handleClose}
                            handleSubmit={handleSubmit}
                            isRegister
                        />
                    </CardBody>
                </Card>
            </Col>
        </Dialog>
    );
};

export default RegisterCompanyPage;
