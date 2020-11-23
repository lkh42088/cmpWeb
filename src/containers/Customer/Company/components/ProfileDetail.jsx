import React, {useEffect, useState} from 'react';
import {Modal} from "reactstrap";
import Avatar from "react-avatar";
import {useSelector} from "react-redux";
import moment from "moment";

import * as common from "../../../../lib/common";

const ProfileDetail = () => {
    const classNameMap = {
        rowFormItem: "row form-infor__item",
        itemContainer: "item-container-half",
        formInforLabel: "form-infor__label",
        formControlValue: "form-control-value",
        textareaPreCont: "textarea-prefix form-control",
    };

    const {
        company,
    } = useSelector(({companiesRd}) => ({
        company: companiesRd.company,
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

    const address = getAddress(company);

    return (
        <div>
            <div className="form-infor">
                <div className="row">
                    <div className="col-md-6">
                        <div className={classNameMap.rowFormItem}>
                            <div className={classNameMap.itemContainer}>
                                <div className={classNameMap.formInforLabel}>회사명</div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                {common.textValueCut(company.name, undefined)}
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
                                <div className={classNameMap.formInforLabel}>대표 계정
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-12">
                            <textarea
                                className={classNameMap.textareaPreCont}
                                rows="1"
                                value={common.textValueCut(company.cpUserId, undefined)}
                                disabled/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className={classNameMap.rowFormItem}>
                            <div className={classNameMap.itemContainer}>
                                <div className={classNameMap.formInforLabel}>홈페이지</div>
                            </div>
                            <div className="col-lg-8 col-md-12">
                            <textarea
                                className={classNameMap.textareaPreCont}
                                rows="1"
                                value={common.textValueCut(company.homepage, undefined)}
                                disabled/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className={classNameMap.rowFormItem}>
                            <div className={classNameMap.itemContainer}>
                                <div className={classNameMap.formInforLabel}>이메일
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-12">
                            <textarea
                                className={classNameMap.textareaPreCont}
                                rows="1"
                                value={common.textValueCut(company.email, undefined)}
                                disabled/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className={classNameMap.rowFormItem}>
                            <div className={classNameMap.itemContainer}>
                                <div className={classNameMap.formInforLabel}>전화번호</div>
                            </div>
                            <div className="col-lg-8 col-md-12">
                            <textarea
                                className={classNameMap.textareaPreCont}
                                rows="1"
                                value={common.textValueCut(company.tel, undefined)}
                                disabled/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className={classNameMap.rowFormItem}>
                            <div className={classNameMap.itemContainer}>
                                <div className={classNameMap.formInforLabel}>해지일자
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-12">
                            <textarea
                                className={classNameMap.textareaPreCont}
                                rows="1"
                                value={company.termDate !== "0001-01-01T00:00:00Z" ? moment(company.termDate)
                                    .format('YYYY년 MM월 DD일 ') : ""}
                                disabled/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className={classNameMap.rowFormItem}>
                            <div className={classNameMap.itemContainer}>
                                <div className={classNameMap.formInforLabel}>휴대폰번호</div>
                            </div>
                            <div className="col-lg-8 col-md-12">
                            <textarea
                                className={classNameMap.textareaPreCont}
                                rows="1"
                                value={common.textValueCut(company.hp, undefined)}
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
                            value={company.memo} rows="4"
                            disabled/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetail;
