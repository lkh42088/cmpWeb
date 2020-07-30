import React, {useEffect, useState} from 'react';
import {Modal} from "reactstrap";
import Avatar from "react-avatar";
import {useSelector} from "react-redux";
import moment from "moment";

import MatButton from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import EditIcon from "@material-ui/icons/Edit";

import * as common from "../../../../lib/common";
import {initRegisterUser} from "../../../../redux/actions/usersActions";

const ProfileDetail = () => {
    const classNameMap = {
        rowFormItem: "row form-infor__item",
        itemContainer: "item-container-half",
        formInforLabel: "form-infor__label",
        formControlValue: "form-control-value",
        textareaPreCont: "textarea-prefix form-control",
    };

    const {
        user,
    } = useSelector(({usersRd}) => ({
        user: usersRd.user,
    }));


    const getAddress = (row) => {
        let address = "-";
        if (row.zipcode) {
            address = row.zipcode;
            address = address.concat(', ');
        }
        if (row.address) {
            address = address.concat(row.address);
        }
        if (row.addressDetail) {
            if (row.address) {
                address = address.concat(', ');
                address = address.concat(row.addressDetail);
            } else {
                address = address.concat(row.addressDetail);
            }
        }
        return address;
    };

    const address = getAddress(user);

    return (
        <div>
            <div className="form-infor">
                <div className="row">
                    <div className="col-md-6">
                        <div className={classNameMap.rowFormItem}>
                            <div className={classNameMap.itemContainer}>
                                <div className={classNameMap.formInforLabel}>소속회사</div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                {common.textValueCut(user.cpName, undefined)}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className={classNameMap.rowFormItem}>
                            <div className={classNameMap.itemContainer}>
                                <div className={classNameMap.formInforLabel}>&nbsp;</div>
                            </div>
                            <div className="col-lg-8 col-md-12">
                            <span className="float-right">
                                &nbsp;
                            </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className={classNameMap.rowFormItem}>
                            <div className={classNameMap.itemContainer}>
                                <div className={classNameMap.formInforLabel}>ID
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-12">
                            <textarea
                                className={classNameMap.textareaPreCont}
                                rows="1"
                                value={common.textValueCut(user.userId, undefined)}
                                disabled/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className={classNameMap.rowFormItem}>
                            <div className={classNameMap.itemContainer}>
                                <div className={classNameMap.formInforLabel}>이름</div>
                            </div>
                            <div className="col-lg-8 col-md-12">
                            <textarea
                                className={classNameMap.textareaPreCont}
                                rows="1"
                                value={common.textValueCut(user.name, undefined)}
                                disabled/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className={classNameMap.rowFormItem}>
                            <div className={classNameMap.itemContainer}>
                                <div className={classNameMap.formInforLabel}>이메일</div>
                            </div>
                            <div className="col-lg-8 col-md-12">
                            <textarea
                                className={classNameMap.textareaPreCont}
                                rows="1"
                                value={common.textValueCut(user.email, undefined)}
                                disabled/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className={classNameMap.rowFormItem}>
                            <div className={classNameMap.itemContainer}>
                                <div className={classNameMap.formInforLabel}>전화번호
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-12">
                            <textarea
                                className={classNameMap.textareaPreCont}
                                rows="1"
                                value={common.textValueCut(user.tel, undefined)}
                                disabled/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className={classNameMap.rowFormItem}>
                            <div className={classNameMap.itemContainer}>
                                <div className={classNameMap.formInforLabel}>인증</div>
                            </div>
                            <div className="col-lg-8 col-md-12">
                            <textarea
                                className={classNameMap.textareaPreCont}
                                rows="1"
                                value={
                                    /* eslint-disable-next-line no-nested-ternary */
                                    user.emailAuth === true ? "개인 이메일 인증" : (user.groupEmailAuth === true ? "그룹 이메일 인증" : "사용 안함")
                                }
                                disabled/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className={classNameMap.rowFormItem}>
                            <div className={classNameMap.itemContainer}>
                                <div className={classNameMap.formInforLabel}>휴대폰번호
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-12">
                            <textarea
                                className={classNameMap.textareaPreCont}
                                rows="1"
                                value={common.textValueCut(user.hp, undefined)}
                                disabled/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className={classNameMap.rowFormItem}>
                            <div className={classNameMap.itemContainer}>
                                <div className={classNameMap.formInforLabel}>등록일</div>
                            </div>
                            <div className="col-lg-10 col-md-12">
                                    <textarea
                                        className={classNameMap.textareaPreCont}
                                        rows="1"
                                        value={moment(user.registerDate)
                                            .format('YYYY-MM-DD')}
                                        disabled/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row form-infor__item_etc">
                    <div className={classNameMap.itemContainer}>
                        <div className={classNameMap.formInforLabel}>주소</div>
                    </div>
                    <div className="col-lg-10">
                        <textarea
                            className={classNameMap.textareaPreCont}
                            value={address} rows="4"
                            disabled/>
                    </div>
                </div>
                <div className="row form-infor__item_etc">
                    <div className={classNameMap.itemContainer}>
                        <div className={classNameMap.formInforLabel}>MEMO</div>
                    </div>
                    <div className="col-lg-10">
                        <textarea
                            className={classNameMap.textareaPreCont}
                            value={user.memo} rows="4"
                            disabled/>
                    </div>
                </div>
            </div>
            {/*<div className="form-group float-right button-handle-form">
                <MatButton
                    variant="contained"
                    color="primary"
                    endIcon={<SendIcon/>}>
                    수정
                </MatButton>
                <MatButton
                    variant="contained"
                    color="default"
                    startIcon={<EditIcon/>}>
                    댓글 작성
                </MatButton>
            </div>*/}
        </div>
    );
};

export default ProfileDetail;
