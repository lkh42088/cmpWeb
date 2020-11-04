import React, {useEffect, useState, Fragment} from "react";
import {
    Card, CardBody, Col, CardHeader,
} from "reactstrap";
import WriteEnvVariable from "./WriteEnvVariable";

const EnvConfiguration = () => {
    const test = "";

    return (
        <Col md={6} lg={6}>
            <Card className="cb-card">
                <CardHeader>
                    <h4>환경 변수 수정</h4>
                </CardHeader>
                <CardBody className="cb-card-body" style={{padding: "20px"}}>
                    <WriteEnvVariable />
                </CardBody>
            </Card>
        </Col>
    );
};

export default EnvConfiguration;
