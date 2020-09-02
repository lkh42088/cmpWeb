import React, {useEffect, useState} from 'react';
import {
    Card, CardBody, Col, Container, Row,
} from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";

import MatButton from '@material-ui/core/Button';
import SendIcon from "@material-ui/icons/Send";
import TocIcon from '@material-ui/icons/Toc';
import TargetIcon from "mdi-react/TargetIcon";
import {useSnackbar} from "notistack";

import {
    setUserPage, setUserIdx, setUser,
} from "../../../../redux/actions/usersActions";

import ModifyUserPage from "./ModifyUserPage";
import {modifyUser, registerUser} from "../../../../lib/api/users";
import Panel from "../../../../shared/components/Panel";
import OurMission from "../../../Dashboards/Booking/components/OurMission";

const todoSidebarImg = `${process.env.PUBLIC_URL}/img/sidebar_img.svg`;

const ProfileBtn = () => {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();

    const {
        userIdx,
        user,
    } = useSelector(({usersRd}) => ({
        userIdx: usersRd.userIdx,
        user: usersRd.user,
    }));

    const [modifyData, setModifyData] = React.useState(null);
    const [openModifyUser, setOpenModifyUser] = React.useState(false);

    /*******************
     * Function
     *******************/

    const handleOpenModifyUser = () => {
        setOpenModifyUser(true);
    };

    const handleUserPage = () => {
        dispatch(setUserPage('list'));
        dispatch(setUserIdx({userIdx: ''}));
        dispatch(setUser({}));
    };

    const handleModifySelectedUser = (idx) => {
        // console.log("modify user: ", idx);
        setModifyData(user);
        handleOpenModifyUser();
    };

    const handleCloseModifyUser = () => {
        setOpenModifyUser(false);
    };

    const handleSnackbarSuccess = (snackMsg) => {
        enqueueSnackbar(snackMsg, {variant: "success"});
    };

    const handleSnackbarFailure = (snackMsg) => {
        enqueueSnackbar(snackMsg);
    };

    /*******************
     * Axios
     *******************/

    const asyncModifyUser = async (val) => {
        const {
            cpIdx, cpName, id, password, name, email,
            cellPhone, tel, level, userZip, userAddr, userAddrDetail,
            emailAuthValue, emailAuthGroupList, memo, avata,
        } = val;
        try {
            const response = await modifyUser({
                cpIdx,
                cpName,
                id,
                password,
                name,
                email,
                authLevel: Number(level),
                hp: cellPhone,
                tel,
                zipCode: userZip,
                address: userAddr,
                addressDetail: userAddrDetail,
                emailAuthFlag: emailAuthValue === "1",
                emailAuthGroupFlag: emailAuthValue === "2",
                emailAuthGroupList,
                memo,
                avata,
            });
            const submitData = ({
                companyIdx: cpIdx,
                cpName,
                userId: id,
                password,
                name,
                email,
                authLevel: Number(level),
                hp: cellPhone,
                tel,
                zipCode: userZip,
                address: userAddr,
                addressDetail: userAddrDetail,
                emailAuthFlag: emailAuthValue === "1",
                emailAuthGroupFlag: emailAuthValue === "2",
                emailAuthGroupList,
                memo,
                avata,
            });

            dispatch(setUser(submitData));
            handleSnackbarSuccess("계정 수정이 성공하였습니다.");

            //getPageData();
        } catch {
            handleSnackbarFailure("계정 수정이 실패하였습니다.");
        }
    };

    /*******************
     * Event
     *******************/

    const handleSubmitModifyUser = (val) => {
        asyncModifyUser(val);
        handleCloseModifyUser();
    };

    return (
        /*<Col md={12} lg={12} xl={12}>
            <Card>
                <CardBody className="profile__card">
                    <Container className="dashboard">
                        <Row>
                            <div style={{
                                width: "100%",
                            }}>
                                <div className="dashboard__booking-our-mission" style={{
                                    background: "#8d93ab",
                                }}>
                                    <TargetIcon/>
                                    <p className="dashboard__booking-our-mission-title">Profile Edit</p>
                                </div>
                            </div>
                        </Row>
                    </Container>
                </CardBody>
            </Card>
        </Col>*/
        <Col md={12} lg={12} xl={12}>
            <Card>
                <CardBody className="profile__card--calendar">
                    <img className="todo_sidebar-image" src={todoSidebarImg} alt="sidebar-img" />
                    <MatButton
                        variant="contained"
                        color="primary"
                        onClick={event => handleModifySelectedUser(userIdx)}
                        endIcon={<SendIcon/>}>
                        수정
                    </MatButton>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <MatButton
                        variant="contained"
                        color="default"
                        onClick={handleUserPage}
                        endIcon={<TocIcon/>}>
                        목록
                    </MatButton>

                    <ModifyUserPage
                        open={openModifyUser}
                        handleClose={handleCloseModifyUser}
                        handleSubmit={handleSubmitModifyUser}
                        data={modifyData}
                    />
                </CardBody>
            </Card>
        </Col>
    );
};

export default ProfileBtn;
