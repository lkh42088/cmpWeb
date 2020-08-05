import React, {useEffect, useState} from 'react';
import {
    Card, CardBody, Col, Button,
} from 'reactstrap';
import {useSelector} from "react-redux";
import Avatar from "react-avatar";

import * as common from "../../../../lib/common";

import {API_ROUTE, API_ROUTE_SERVER_IMAGE} from "../../../../lib/api/client";

const ProfileMain = () => {
    const {
        user,
        userPage,
    } = useSelector(({usersRd}) => ({
        user: usersRd.user,
        userPage: usersRd.userPage,
    }));

    return (
        <Col md={12} lg={12} xl={12}>
            <Card>
                <CardBody className="profile__card">
                    <div className="profile__information">
                        <div className="profile__avatar"
                             style={{
                                 /*borderRadius: "0",*/
                                 borderRadius: "0",
                             }}
                        >
                            {/*<img src={Ava} alt="avatar"/>*/}
                            {/*<Avatar
                                className="topbar__avatar-img-list"
                                name={user.userId}
                                size="120"
                            />*/}
                            {user.avata == null || user.avata === "" ? (
                                <Avatar
                                    className="topbar__avatar-img-list"
                                    name={user.userId}
                                    size="120"
                                />
                            ) : (
                                <Avatar
                                    className="topbar__avatar-img-list"
                                    name={user.userId}
                                    size="120"
                                    src={`${API_ROUTE_SERVER_IMAGE}/${user.avata}`}
                                />
                            )}
                        </div>
                        <div className="profile__data">
                            <p className="profile__name">{user.name} [{user.userId}]</p>
                            <p className="profile__contact">level: {common.textValueCut(user.authLevelTag, '', '-')}</p>
                            <p className="profile__contact">email: {common.textValueCut(user.email, '', '-')}</p>
                            <p className="profile__contact" dir="ltr">hp: {common.textValueCut(user.hp, '', '-')}</p>
                            <p className="profile__contact">
                                email 인증 :
                                {/* eslint-disable-next-line no-nested-ternary */}
                                {user.emailAuth === true ? "개인 이메일 인증" : (user.groupEmailAuth === true ? "그룹 이메일 인증" : "사용 안함")}
                            </p>
                            {/*<Button color="primary" className="icon profile__btn">
                                <p><MessageTextOutlineIcon/> 정보 수정</p>
                            </Button>*/}
                            {/*<MatButton
                                variant="contained"
                                color="primary"
                                endIcon={<SendIcon/>}>
                                수정
                            </MatButton>*/}
                        </div>
                    </div>
                    <div className="profile__stats">
                        <div className="profile__stat">
                            <p className="profile__stat-number">
                                {user.cpName}
                            </p>
                        </div>
                    </div>
                    {/*<div className="profile__stats">
                        <div className="profile__stat">
                            <p className="profile__stat-number">01</p>
                            <p className="profile__stat-title">-</p>
                        </div>
                        <div className="profile__stat">
                            <p className="profile__stat-number">02</p>
                            <p className="profile__stat-title">-</p>
                        </div>
                        <div className="profile__stat">
                            <p className="profile__stat-number">03</p>
                            <p className="profile__stat-title">-</p>
                        </div>
                    </div>*/}
                </CardBody>
            </Card>
        </Col>
    );
};

export default ProfileMain;
