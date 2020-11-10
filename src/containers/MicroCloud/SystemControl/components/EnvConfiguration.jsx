import React, {useEffect, useState, Fragment} from "react";
import {
    Card, CardBody, Col, CardHeader,
} from "reactstrap";
import {useSnackbar} from "notistack";
import WriteEnvVariable from "./WriteEnvVariable";
import {agentRestart, modifyConfigFile} from "../../../../lib/api/system";

const EnvConfiguration = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const {enqueueSnackbar} = useSnackbar();

    /** Snackbar */
    const handleSnackbarFailure = (snackMsg) => {
        enqueueSnackbar(snackMsg);
    };
    const handleSnackbarSuccess = (snackMsg) => {
        enqueueSnackbar(snackMsg, { variant: "success" });
    };

    /** Axios */
    const asyncConfUpdate = async (confData) => {
        const {
            agentType, ipAddr, fieldName, value,
        } = confData;
        try {
            await modifyConfigFile({
                agentType, ipAddr, fieldName, value,
            });
            handleSnackbarSuccess("환경 변수 변경 성공하였습니다.");
        } catch (e) {
            handleSnackbarFailure("환경 변수 변경 실패하였습니다.");
        }
    };

    const asyncAgentRestart = async (agentType, ipAddr) => {
        try {
            await agentRestart({agentType, ipAddr});
            handleSnackbarSuccess("에이전트를 리스타트 하였습니다.");
        } catch (e) {
            handleSnackbarSuccess("에이전트를 리스타트 하였습니다.");
        }
    };

    /** Event */
    const handleSubmit = (confData) => {
        asyncConfUpdate(confData);
    };

    const handleRestart = (agentType, ipAddr) => {
        asyncAgentRestart(agentType, ipAddr);
    };

    return (
        <Col md={6} lg={6}>
            <Card className="cb-card">
                <CardHeader>
                    <h4><b>환경 파일 변수 수정</b></h4>
                </CardHeader>
                <CardBody className="cb-card-body" style={{padding: "20px"}}>
                    <WriteEnvVariable
                        user={user}
                        handleSubmit={handleSubmit}
                        handleRestart={handleRestart}
                    />
                </CardBody>
            </Card>
        </Col>
    );
};

export default EnvConfiguration;
