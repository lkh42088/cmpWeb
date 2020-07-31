import React, {useEffect, useState} from 'react';
import {
    Card, CardBody, Col, Button,
} from 'reactstrap';
import {useSelector} from "react-redux";
import Avatar from "react-avatar";

import * as common from "../../../../lib/common";

const ProfileMain = () => {
    const {
        company,
        companyPage,
    } = useSelector(({companiesRd}) => ({
        company: companiesRd.company,
        companyPage: companiesRd.companyPage,
    }));

    return (
        <Col md={12} lg={12} xl={12}>
            <Card>
                <CardBody className="profile__card">
                    <div className="profile__information">
                        <div className="profile__avatar" style={{
                            borderRadius: "0",
                        }}>
                            {/*<img src={Ava} alt="avatar"/>*/}
                            <Avatar
                                className="topbar__avatar-img-list"
                                name={company.cpUserId}
                                size="120"
                            />
                        </div>
                        <div className="profile__data">
                            <p className="profile__name">{company.name} [{company.cpUserId}]</p>
                            <p className="profile__work">&nbsp;</p>
                            <p className="profile__contact">email: {common.textValueCut(company.email, '', '-')}</p>
                            <p className="profile__contact" dir="ltr">hp: {common.textValueCut(company.hp, '', '-')}</p>
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
                                {company.name}
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
