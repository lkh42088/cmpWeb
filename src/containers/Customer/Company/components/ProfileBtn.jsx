import React, {useEffect, useState} from 'react';
import {Card, CardBody, Col} from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";

import MatButton from '@material-ui/core/Button';
import SendIcon from "@material-ui/icons/Send";
import TocIcon from '@material-ui/icons/Toc';
import {useSnackbar} from "notistack";

import {
    setCompanyPage, setCompanyIdx, setCompany,
} from "../../../../redux/actions/companiesActions";

import ModifyCompanyPage from "./ModifyCompanyPage";
import {modifyCompany, registerCompany} from "../../../../lib/api/company";

const ProfileBtn = () => {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();

    const {
        companyIdx,
        company,
    } = useSelector(({companiesRd}) => ({
        companyIdx: companiesRd.companyIdx,
        company: companiesRd.company,
    }));

    const [modifyData, setModifyData] = React.useState(null);
    const [openModifyCompany, setOpenModifyCompany] = React.useState(false);

    /*******************
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
                <CardBody className="profile__card--calendar">
                    <MatButton
                        variant="contained"
                        color="primary"
                        onClick={event => handleModifySelectedCompany(companyIdx)}
                        endIcon={<SendIcon/>}>
                        수정
                    </MatButton>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <MatButton
                        variant="contained"
                        color="default"
                        onClick={handleCompanyPage}
                        endIcon={<TocIcon/>}>
                        목록
                    </MatButton>
                    <ModifyCompanyPage
                        open={openModifyCompany}
                        handleClose={handleCloseModifyCompany}
                        handleSubmit={handleSubmitModifyCompany}
                        /*refreshPage={getPageData}*/
                        data={modifyData}
                    />
                </CardBody>
            </Card>
        </Col>
    );
};

export default ProfileBtn;
