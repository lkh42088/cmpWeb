import React, {useEffect, useState} from 'react';
import {
    Card, CardBody, Col,
} from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import Avatar from "react-avatar";
import EditIcon from "@material-ui/icons/Edit";
import ListIcon from "@material-ui/icons/List";
import {Tooltip} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import {useSnackbar} from "notistack";

import * as common from "../../../../lib/common";

import {setCompany, setCompanyIdx, setCompanyPage} from "../../../../redux/actions/companiesActions";
import {modifyCompany} from "../../../../lib/api/company";
import ModifyCompanyPage from "./ModifyCompanyPage";

const ProfileMain = () => {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();

    const {
        companyIdx,
        company,
        companyPage,
    } = useSelector(({companiesRd}) => ({
        companyIdx: companiesRd.companyIdx,
        company: companiesRd.company,
        companyPage: companiesRd.companyPage,
    }));

    const [modifyData, setModifyData] = React.useState(null);
    const [openModifyCompany, setOpenModifyCompany] = React.useState(false);

    /*******************
     *
     * Function
     *******************/

    const handleOpenModifyCompany = () => {
        setOpenModifyCompany(true);
    };

    const handleCompanyPage = () => {
        dispatch(setCompanyPage('list'));
        dispatch(setCompanyIdx({companyIdx: ''}));
        dispatch(setCompany({}));
    };

    const handleModifySelectedCompany = (idx) => {
        // console.log("modify company: ", idx);
        setModifyData(company);
        handleOpenModifyCompany();
    };

    const handleCloseModifyCompany = () => {
        setOpenModifyCompany(false);
    };

    const handleTriggerSuccess = (snackMsg) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(snackMsg, {variant: "success"});
    };

    const handleTriggerFailure = (snackMsg) => {
        enqueueSnackbar(snackMsg);
    };

    /*******************
     * Axios
     *******************/
    const doModifyCompany = async (props) => {
        const {
            cpName, cpZip, cpAddr, cpAddrDetail, cpHomepage,
            cpTel, cpHp, cpEmail, cpIsCompany, cpMemo, cpTerminationDate,
            userId, userPassword,
        } = props;
        try {
            const response = await modifyCompany({
                cpName,
                cpTel,
                cpHp,
                cpZip,
                cpEmail,
                cpHomepage,
                cpAddr,
                cpAddrDetail,
                userId,
                userPassword,
                cpIsCompany,
                cpMemo,
                cpTerminationDate,
            });

            const submitData = ({
                name: cpName,
                tel: cpTel,
                hp: cpHp,
                zipcode: cpZip,
                email: cpEmail,
                homepage: cpHomepage,
                address: cpAddr,
                addressDetail: cpAddrDetail,
                cpUserId: userId,
                userPassword,
                isCompany: cpIsCompany,
                memo: cpMemo,
                termDate: cpTerminationDate,
            });

            dispatch(setCompany(submitData));
            handleTriggerSuccess("고객사 수정이 성공하였습니다.");
        } catch (error) {
            handleTriggerFailure("고객사 수정이 실패하였습니다.");
            console.log("doModifyCompany error!");
        }
    };

    /*******************
     * Event
     *******************/

    const handleSubmitModifyCompany = (val) => {
        // console.log("handleSubmitModifyCompany: ", company);
        //asyncModifyCompany(val);
        //setModifyData(val);
        doModifyCompany(val);
        handleCloseModifyCompany();
    };

    return (
        <Col md={12} lg={12} xl={12}>
            <Card>
                <CardBody className="profile__card">
                    <div className="profile__stats-bottom">
                        <div className="profile__stat">
                            <p className="profile__stat-number">
                                {company.name}
                            </p>
                        </div>
                    </div>
                    <div className="profile__information">
                        <div className="profile__avatar" style={{
                            borderRadius: "0",
                        }}>
                            {/*<img src={Ava} alt="avatar"/>*/}
                            <Avatar
                                className="topbar__avatar-img-list square"
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
                        <div className="profile__stat" style={{
                            width: "100%",
                            padding: "5px",
                        }}>
                            <div style={{
                                float: "right",
                            }}>
                                <ul className="social-icons">
                                    <li>
                                        {/*<Tooltip title="목록">
                                            <a href="#"><i><ListIcon style={{
                                                fontSize: "1.3rem",
                                            }} onClick={handleCompanyPage}/></i>
                                            </a>
                                        </Tooltip>*/}
                                        <Button
                                            variant="contained"
                                            color="default"
                                            startIcon={<ListIcon />}
                                            onClick={handleCompanyPage}
                                        >
                                            목록
                                        </Button>
                                        &nbsp;&nbsp;&nbsp;
                                    </li>
                                    <li>
                                        {/*<Tooltip title="수정">
                                            <a href="#"><i><EditIcon style={{
                                                fontSize: "1.3rem",
                                            }} onClick={event => handleModifySelectedCompany(companyIdx)}/></i>
                                            </a>
                                        </Tooltip>*/}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={event => handleModifySelectedCompany(companyIdx)}
                                            endIcon={<EditIcon>send</EditIcon>}
                                        >
                                            수정
                                        </Button>
                                    </li>
                                </ul>

                                <ModifyCompanyPage
                                    open={openModifyCompany}
                                    handleClose={handleCloseModifyCompany}
                                    handleSubmit={handleSubmitModifyCompany}
                                    /*refreshPage={getPageData}*/
                                    data={modifyData}
                                />
                            </div>
                        </div>
                    </div>
                    {/*<div className="profile__stats">
                        <div className="profile__stat">
                            <p className="profile__stat-number">
                                {company.name}
                            </p>
                        </div>
                    </div>*/}
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
