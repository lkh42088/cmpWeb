import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, ButtonToolbar, Modal} from 'reactstrap';
import classNames from 'classnames';
import {Field, reduxForm} from "redux-form";
import {findDOMNode} from "react-dom";
import CalendarBlankIcon from "mdi-react/CalendarBlankIcon";
import AccountSearchIcon from "mdi-react/AccountSearchIcon";
import PlusIcon from "mdi-react/PlusIcon";
import MinusIcon from "mdi-react/MinusIcon";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {withTranslation} from "react-i18next";
import TablePagination from "@material-ui/core/TablePagination";
import {getCompanyByName} from "../../../../redux/actions/assetsAction";

import {RTLProps} from '../../../../shared/prop-types/ReducerProps';

import TextEditor from "../../../../shared/components/text-editor/TextEditor";
import renderIntervalDatePickerField from "../../../../shared/components/form/IntervalDatePicker";
import renderDatePickerField from "../../../../shared/components/form/DatePicker";
import renderSelectField from "../../../../shared/components/form/Select";
import AssetsEdit from "./AssetsEdit";

//const required = value => (value ? undefined : 'Required');


const warringStyle = {
    color: "#0f4c81",
    fontWeight: "bold",
};

function validate(values) {
    const errors = {};

    console.log("values : ", values);
    console.log("values.customer : ", values.customer);

    if (!values.customer) {
        errors.customer = "고객사를 선택해주세요.";
    }

    if (values.deviceType === '0' || values.deviceType === undefined) {
        errors.deviceType = "장비구분을 선택해주세요.";
    }

    if (values.ownership === '0' || values.ownership === undefined) {
        errors.ownership = "소유권을 선택해주세요.";
    }

    if (values.ownershipDiv === '0' || values.ownershipDiv === undefined) {
        errors.ownershipDiv = "소유권구분을 선택해주세요.";
    }

    if (!values.ownerCompany) {
        errors.ownerCompany = "소유업체명을 선택해주세요.";
    }

    console.log("errors : ", errors);

    return errors;
}

const renderCustomerField = field => (
    <Fragment>
        <div className="modal_form__form-group-field">
            <input {...field.input} type={field.type} placeholder={field.placeholder}
                   value={field.initialValues} onClick={field.searchToggle} onKeyDown={field.searchToggle}
                   role="button" tabIndex="0"
            />
            <span className="search_btn_span"
                  onClick={field.searchToggle} onKeyDown={field.searchToggle}
                  role="button" tabIndex="0"
            ><AccountSearchIcon/></span>
        </div>
        {field.meta.touched && field.meta.error
        && <span className="modal_form__form-group-description">※ {field.meta.error}</span>}
    </Fragment>
);

const renderSelectCustomField = ({
                                     input, placeholder, codeDivision,
                                     meta: {touched, error},
                                 }) => (
    <Fragment>
        <div className="modal_form__form-group-field">
            <select
                {...input}
                placeholder={placeholder}
            >
                <option value="0">선택하세요.</option>
                {
                    codeDivision.code.map((d, index) => (
                        <option key={d.codeId.toString()}
                                value={d.codeId}>{d.name}</option>
                    ))}
            </select>
        </div>
        {touched && error && <span className="modal_form__form-group-description">※ {error}</span>}
    </Fragment>
);

class AssetsWrite extends PureComponent {
    static propTypes = {
        // eslint-disable-next-line react/forbid-prop-types
        assetState: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        title: PropTypes.string,
        message: PropTypes.string,
        closeToggle: PropTypes.func,
    };

    static defaultProps = {
        title: '',
        message: '',
        closeToggle: '',
    };

    constructor() {
        super();
        this.state = {
            modal: false,
            showPassword: false,
            RackComponent: <span style={warringStyle}>※ IDC를 선택하세요.</span>,
            ModelComponent: <span style={warringStyle}>※ Model을 선택하세요.</span>,
            AddIpComponent: [],
            AddIpComponentMax: 0,
            AddSplaComponent: [],
            AddSplaComponentMax: 0,
            RegisterId: '',
            IpArray: [],
            warehousingDateError: 'test',
            searchToggleDivision: '',
            searchCompanyName: '',
            searchCustomerId: '',
            searchOwnerCompanyId: '',
        };
    }

    searchToggle = (division) => {
        this.setState({
            searchToggleDivision: division,
        });

        if (division === 'customer') {
            this.customerField.focus();
            this.ownerCompanyField.blur();
        } else {
            this.ownerCompanyField.focus();
            this.customerField.blur();
        }

        this.setState(prevState => ({modal: !prevState.modal}));
    };

    searchCompany = () => {
        const {
            assetState, dispatch,
        } = this.props;
        const {
            searchCompanyName,
        } = this.state;

        /*address: "서울시 강남구 언주로 517, 14층"
        addressDetail: "(역삼동, 강남 KT-IDC)"
        email: "idc@conbridge.co.kr"
        homepage: "http://www.conbridge.co.kr"
        hp: ""
        idx: 6
        isCompany: true
        memo: ""
        name: "(주)콘텐츠브릿지"
        tel: "1899-2669"
        termDate: "0001-01-01T00:00:00Z"
        userId: "conbridge"
        zipcode: "135-915"*/

        dispatch(getCompanyByName(searchCompanyName));
    };

    setSearchCompany = (val) => {
        const {
            assetState, dispatch, handleSubmit,
        } = this.props;
        const {searchToggleDivision} = this.state;
        console.log("searchToggleDivision : ", searchToggleDivision);

        if (searchToggleDivision === 'customer') {
            this.setState({
                searchCustomerId: val,
            });
            this.customerField.blur();
        } else if (searchToggleDivision === 'ownerCompany') {
            this.setState({
                searchOwnerCompanyId: val,
            });
            this.ownerCompanyField.blur();
        }

        this.setState(prevState => ({modal: !prevState.modal}));
    };

    handleChange = (e) => {
        const {
            assetState, dispatch, handleSubmit,
        } = this.props;
        let tempContent;

        this.setState({
            [e.target.name]: e.target.value,
        });

        // TODO 축약 가능~ 리팩토링 필수!
        if (e.target.name === 'idc') { // IDC
            // RACK
            if (Number(e.target.value) > 0) {
                const hasSubCode = assetState.subCodes.data.some(d => (Number(d.codeId) === Number(e.target.value)));

                if (hasSubCode === true) {
                    tempContent = (
                        <Field
                            name="rack"
                            component="select">
                            <option value="none">렉없음</option>
                            {assetState.subCodes.data
                                .map(d => (Number(d.codeId) === Number(e.target.value)
                                    && <option key={d.id} value={d.id}>{d.name}</option>))
                            }
                        </Field>
                    );
                } else {
                    tempContent = <span style={warringStyle}>※ 연결된 Rack이 없습니다.</span>;
                }
            } else {
                tempContent = <span style={warringStyle}>※ IDC를 선택하세요.</span>;
            }
            this.setState({
                RackComponent: tempContent,
            });
        } else if (e.target.name === 'manufacture') { // 제조사
            // MODEL
            if (Number(e.target.value) > 0) {
                const hasSubCode = assetState.subCodes.data.some(d => (Number(d.codeId) === Number(e.target.value)));

                if (hasSubCode === true) {
                    tempContent = (
                        <Field
                            name="model"
                            component="select">
                            {assetState.subCodes.data
                                .map(d => (Number(d.codeId) === Number(e.target.value)
                                    && <option key={d.id} value={d.id}>{d.name}</option>))
                            }
                        </Field>
                    );
                } else {
                    tempContent = <span style={warringStyle}>※ 연결된 Model이 없습니다.</span>;
                }
            } else {
                tempContent = <span style={warringStyle}>※ 제조사를 선택하세요.</span>;
            }
            this.setState({
                ModelComponent: tempContent,
            });
        }
    };

    onClose = () => {
        const {closeToggle} = this.props;
        closeToggle(); //
    };

    showPassword = (e) => {
        e.preventDefault();
        this.setState(prevState => ({showPassword: !prevState.showPassword}));
    };

    setHtmlPlus = (val) => {
        console.log("Plus val : ", val);
        const {assetState, dispatch} = this.props;
        const {
            AddIpComponent, AddIpComponentMax, AddSplaComponent, AddSplaComponentMax,
        } = this.state;
        let tempContent;
        if (val === 'ip') {
            const reName = `ip${AddIpComponentMax}`;

            if (AddIpComponent.length < 10) {
                tempContent = (
                    <div className="modal_form__form-group-field" key={reName}>
                        <Field
                            name={reName}
                            onChange={this.handleChange}
                            component="input"
                            type="text"
                            className="input_col_5"
                            placeholder="ip"
                        />
                        <svg className="mdi-icon " width="24" height="24" fill="currentColor"
                             viewBox="0 0 24 24"
                             onClick={event => this.setHtmlMinus(reName, val)}
                             onKeyDown={event => this.setHtmlMinus(reName, val)}
                             role="button" tabIndex="0">
                            <MinusIcon/>
                        </svg>
                    </div>
                );
                //console.log("😃 length : ", AddIpComponent.length);
                this.setState({
                    AddIpComponentMax: AddIpComponentMax + 1,
                    AddIpComponent: AddIpComponent.concat(tempContent),
                });
            }
        } else if (val === 'spla') {
            const reName = `spla${AddSplaComponentMax}`;

            if (AddSplaComponent.length < 10) {
                tempContent = (
                    <div className="modal_form__form-group-field" key={reName}>
                        <Field
                            name={reName}
                            component="select"
                        >
                            <option value="0">선택하세요.</option>
                            {assetState.codes.codeSpla
                                .map((d, index) => (
                                    <option key={d.codeId.toString()} value={d.codeId}>{d.name}</option>
                                ))}
                        </Field>
                        <svg className="mdi-icon " width="24" height="24" fill="currentColor"
                             viewBox="0 0 24 24"
                             onClick={event => this.setHtmlMinus(reName, val)}
                             onKeyDown={event => this.setHtmlMinus(reName, val)}
                             role="button" tabIndex="0">
                            <MinusIcon/>
                        </svg>
                    </div>
                );
                this.setState({
                    AddSplaComponentMax: AddSplaComponentMax + 1,
                    AddSplaComponent: AddSplaComponent.concat(tempContent),
                });
            }
        }
    };

    setHtmlMinus = (reName, val) => {
        const {
            AddIpComponent, AddSplaComponent,
        } = this.state;

        if (val === 'ip') {
            const AddIpComponentTemp = AddIpComponent.slice(AddIpComponent.length)
                .concat(AddIpComponent.filter(d => d.key !== reName));

            this.setState({
                AddIpComponent: AddIpComponentTemp,
            });
        } else if (val === 'spla') {
            const AddSplaComponentTemp = AddSplaComponent.slice(AddSplaComponent.length)
                .concat(AddSplaComponent.filter(d => d.key !== reName));

            this.setState({
                AddSplaComponent: AddSplaComponentTemp,
            });
        }
    };

    render() {
        const {
            title, message,
            assetState, dispatch, handleSubmit,
        } = this.props;
        const {
            modal, RackComponent, ModelComponent, AddIpComponent, AddSplaComponent,
            RegisterId, IpArray, warehousingDateError,
            searchCompanyName, searchCustomerId, searchOwnerCompanyId, searchToggleDivision,
        } = this.state;
        const {showPassword} = this.state;

        const deviceStyle = {
            textDecoration: '#ffdd67 underline',
            fontWeight: 'bold',
        };

        const modalClass = classNames({
            'assets_write__modal-dialog': true,
            'assets_write__modal-dialog--colored': false,
            'assets_write__modal-dialog--header': false,
        });

        let viewContent;

        //console.log("render searchCustomerId : ", searchCustomerId);

        switch (assetState.deviceType) {
            case 'server':
                viewContent = (
                    <Fragment>
                        <div className="modal_form__form-group">
                                <span
                                    className="modal_form__form-group-label modal_form_label_blue">CPU</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="cpu"
                                    component="input"
                                    type="text"
                                    className="input_col_10"
                                    placeholder="CPU"
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                                <span
                                    className="modal_form__form-group-label modal_form_label_blue">MEMORY</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="memory"
                                    component="input"
                                    type="text"
                                    className="input_col_10"
                                    placeholder="MEMORY"
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                                <span
                                    className="modal_form__form-group-label modal_form_label_blue">HDD</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="hdd"
                                    component="input"
                                    type="text"
                                    className="input_col_10"
                                    placeholder="HDD"
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">IP</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="ip"
                                    component="input"
                                    type="text"
                                    className="input_col_5"
                                    placeholder="ip"
                                />
                                <svg className="mdi-icon " width="24" height="24" fill="currentColor"
                                     viewBox="0 0 24 24"
                                     onClick={event => this.setHtmlPlus('ip')}
                                     onKeyDown={event => this.setHtmlPlus('ip')}
                                     role="button" tabIndex="0">
                                    <PlusIcon/>
                                </svg>
                                {/*TODO 디자인 통합 필요*/}
                                <span>※ 최대 등록 개수는 10개 입니다.</span>
                            </div>
                            {AddIpComponent}
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">Size</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="size"
                                    component="select"
                                >
                                    <option value="0">선택하세요.</option>
                                    {assetState.codes.codeSize
                                        .map((d, index) => (
                                            <option key={d.codeId.toString()}
                                                    value={d.codeId}>{d.name}</option>
                                        ))}
                                </Field>
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">SPLA</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="spla"
                                    component="select"
                                >
                                    <option value="0">선택하세요.</option>
                                    {assetState.codes.codeSpla
                                        .map((d, index) => (
                                            <option key={d.codeId.toString()}
                                                    value={d.codeId}>{d.name}</option>
                                        ))}
                                </Field>
                                <svg className="mdi-icon " width="24" height="24" fill="currentColor"
                                     viewBox="0 0 24 24"
                                     onClick={event => this.setHtmlPlus('spla')}
                                     onKeyDown={event => this.setHtmlPlus('spla')}
                                     role="button" tabIndex="0">
                                    <PlusIcon/>
                                </svg>
                                {/*TODO 디자인 통합 필요*/}
                                <span>※ 최대 등록 개수는 10개 입니다.</span>
                            </div>
                            {AddSplaComponent}
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">Rack Tag</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="rackTag"
                                    component="input"
                                    className="input_col_5"
                                    type="text"
                                    placeholder="Rack Tag"
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">Rack Location</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="rackLoc"
                                    component="input"
                                    className="input_col_5"
                                    type="number"
                                    placeholder="Rack Location"
                                />
                            </div>
                        </div>
                    </Fragment>
                );
                break;
            case 'network':
                viewContent = (
                    <Fragment>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">IP</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="ip"
                                    component="input"
                                    type="text"
                                    className="input_col_5"
                                    placeholder="ip"
                                />
                                <svg className="mdi-icon " width="24" height="24" fill="currentColor"
                                     viewBox="0 0 24 24"
                                     onClick={event => this.setHtmlPlus('ip')}
                                     onKeyDown={event => this.setHtmlPlus('ip')}
                                     role="button" tabIndex="0">
                                    <PlusIcon/>
                                </svg>
                                {/*TODO 디자인 통합 필요*/}
                                <span>※ 최대 등록 개수는 10개 입니다.</span>
                            </div>
                            {AddIpComponent}
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">FIRMWARE VERSION</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="firmwareVersion"
                                    component="input"
                                    className="input_col_5"
                                    type="text"
                                    placeholder="FIRMWARE VERSION"
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">Rack Tag</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="rackTag"
                                    component="input"
                                    className="input_col_5"
                                    type="text"
                                    placeholder="Rack Tag"
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">Rack Location</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="rackLoc"
                                    component="input"
                                    className="input_col_5"
                                    type="number"
                                    placeholder="Rack Location"
                                />
                            </div>
                        </div>
                    </Fragment>
                );
                break;
            case 'part':
                viewContent = (
                    <Fragment>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">WARRANTY</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="warranty"
                                    component="input"
                                    className="input_col_5"
                                    type="text"
                                    placeholder="WARRANTY"
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">Rack Size</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="rackCode"
                                    component="select"
                                >
                                    <option value="0">선택하세요.</option>
                                    {assetState.codes.codeRackCode
                                        .map((d, index) => (
                                            <option key={d.codeId.toString()}
                                                    value={d.codeId}>{d.name}</option>
                                        ))}
                                </Field>
                            </div>
                        </div>
                    </Fragment>
                );
                break;
            default:
                break;
        }

        // TODO 디자인은 나중에
        const viewSearchCompany = (
            <TableBody>
                {assetState.company.length !== undefined
                    ? (
                        assetState.company.map(d => (
                            <TableRow key={d.userId.toString()}>
                                <TableCell className="material-table__cell material-table__cell-right"
                                >{/*회사명*/}
                                    <b className="text_cor_green mouse_over_list">
                                        <div className="assets_add_modal_div"
                                             onClick={event => this.setSearchCompany(d.userId)}
                                             onKeyDown={event => this.setSearchCompany(d.userId)}
                                             role="button" tabIndex="0"><span
                                            className="circle__ste"/>{d.name}</div>
                                    </b>
                                </TableCell>
                                <TableCell className="material-table__cell material-table__cell-right"
                                >{/*회사 대표 ID*/}{d.userId}
                                </TableCell>
                                <TableCell className="material-table__cell material-table__cell-right"
                                >{/*회사 email*/}{d.email}
                                </TableCell>
                            </TableRow>
                        ))
                    )
                    : (
                        <TableRow>
                            <TableCell>검색 하세요.</TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        );

        return (
            <div>
                <div className="assets_write__modal__header">
                    <p className="text-modal assets_write__modal__title">{title}
                        &nbsp;&nbsp;
                        <span className="assets_write__modal__title_sub">{message}</span></p>
                    <button className="lnr lnr-cross assets_write__modal__close-btn" type="button"
                            onClick={this.onClose}/>
                </div>
                <div className="assets_write__modal__body assets_write__modal__tableLine">
                    <form className="modal_form modal_form--horizontal"
                          onSubmit={handleSubmit}>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label text_cor_green">장비코드</span>
                            <div className="modal_form__form-group-field">
                                <b><h6 style={deviceStyle}>장비 등록 시 자동 생성</h6></b>
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">IDC / 랙번호</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="idc"
                                    component="select"
                                    onChange={this.handleChange}>
                                    <option value="0">선택하세요.</option>
                                    {assetState.codes.codeIdc
                                        .map((d, index) => (
                                            <option key={d.codeId.toString()}
                                                    value={d.codeId}>{d.name}</option>
                                        ))}
                                </Field>
                                &nbsp;&nbsp;
                                {RackComponent}
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">제조사 / 모델명</span>
                            <div className="modal_form__form-group-field">
                                <select name="manufacture"
                                        onChange={this.handleChange}>
                                    <option value="0">선택하세요.</option>
                                    {assetState.codes.codeManufacture
                                        .map((d, index) => (
                                            <option key={d.codeId.toString()}
                                                    value={d.codeId}>{d.name}</option>
                                        ))}
                                </select>
                                &nbsp;&nbsp;
                                {ModelComponent}
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">장비구분</span>
                            <Field
                                name="deviceType"
                                component={renderSelectCustomField}
                                codeDivision={{
                                    code: assetState.codes.codeDeviceType,
                                }}
                            />
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label text_cor_orange">고객사</span>
                            <Field
                                name="customer"
                                type="text"
                                className="input_col_7"
                                placeholder="고객사"
                                initialValues={searchCustomerId}
                                component={renderCustomerField}
                                /*ref={(ref) => { this.input = ref; }}*/
                                searchToggle={event => this.searchToggle('customer')}
                                ref={(ref) => {
                                    // eslint-disable-next-line react/no-find-dom-node
                                    const node = findDOMNode(ref);
                                    if (node) {
                                        // Material UI wraps input element,
                                        // use querySelector() to obtain reference to it
                                        // if not using MUI, querySelector() likely not needed
                                        this.customerField = node.querySelector("input");
                                    }
                                }}
                                withRef
                            />
                            {/* eslint-disable-next-line no-return-assign */}
                            {/*<input ref={(ref => this.input = ref)}/>*/}
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">소유권/소유권구분</span>
                            <Field
                                name="ownership"
                                component={renderSelectCustomField}
                                codeDivision={{
                                    code: assetState.codes.codeOwnership,
                                }}
                            />
                            <Field
                                name="ownershipDiv"
                                component={renderSelectCustomField}
                                codeDivision={{
                                    code: assetState.codes.codeOwnershipDiv,
                                }}
                            />

                            {/*<Field
                                name="ownership"
                                component="select"
                            >
                                <option value="0">선택하세요.</option>
                                {assetState.codes.codeOwnership
                                    .map((d, index) => (
                                        <option key={d.codeId.toString()}
                                                value={d.codeId}>{d.name}</option>
                                    ))}
                            </Field>
                            &nbsp;&nbsp;
                            <Field
                                name="ownershipDiv"
                                component="select"
                            >
                                <option value="0">선택하세요.</option>
                                {assetState.codes.codeOwnershipDiv
                                    .map((d, index) => (
                                        <option key={d.codeId.toString()}
                                                value={d.codeId}>{d.name}</option>
                                    ))}
                            </Field>*/}
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">소유업체명</span>
                            <Field
                                name="ownerCompany"
                                type="text"
                                className="input_col_7"
                                placeholder="소유업체명"
                                initialValues={searchOwnerCompanyId}
                                component={renderCustomerField}
                                searchToggle={event => this.searchToggle('ownerCompany')}
                                ref={(ref) => {
                                    // eslint-disable-next-line react/no-find-dom-node
                                    const node = findDOMNode(ref);
                                    if (node) {
                                        // Material UI wraps input element,
                                        // use querySelector() to obtain reference to it
                                        // if not using MUI, querySelector() likely not needed
                                        this.ownerCompanyField = node.querySelector("input");
                                    }
                                }}
                                withRef
                            />
                        </div>
                        <div className="modal_form__form-group">
                                <span
                                    className="modal_form__form-group-label modal_form_label_blue">HW S/N</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="hwSn"
                                    component="input"
                                    type="text"
                                    className="input_col_10"
                                    placeholder="HW S/N"
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">임대기간</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="rentDate"
                                    className="input_col_5"
                                    component={renderIntervalDatePickerField}
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">입고일</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="warehousingDate"
                                    className="input_col_5"
                                    component={renderDatePickerField}
                                />
                                <div className="modal_form__form-group-icon">
                                    <CalendarBlankIcon/>
                                </div>
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">원가</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="cost"
                                    component="input"
                                    className="input_col_5"
                                    type="number"
                                    label="5000"
                                    placeholder="원가"
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">용도</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="purpose"
                                    component="input"
                                    className="input_col_10"
                                    type="text"
                                    placeholder="용도"
                                />
                            </div>
                        </div>
                        {/*---------------------------------------------------------------------------------*/}
                        {viewContent}
                        {/*---------------------------------------------------------------------------------*/}
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">기타사항</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="contents"
                                    component="textarea"
                                />
                            </div>
                        </div>
                        <div className="modal_btn">
                            <ButtonToolbar className="assets_write__modal__footer">
                                <Button className="assets_write__modal_ok" color="primary"
                                        onClick={this.onClose}>Submit</Button>
                                <Button className="assets_write__modal_cancel"
                                        onClick={this.onClose}>Cancel</Button>{' '}
                                <button type="submit">Submit[test]</button>
                            </ButtonToolbar>
                        </div>
                    </form>
                    <Modal
                        isOpen={modal}
                        toggle={this.searchToggle}
                        className={`assets_write__modal-dialog assets_write__modal-dialog--success ${modalClass}`}
                    >
                        <div className="assets_write__modal__body assets_write__modal__tableLine">
                            <div className="modal_form__form-group">
                                <span
                                    className="modal_form__form-group-label text_cor_green">
                                    고객사명 : <input name="searchCompanyName" value={searchCompanyName}
                                                  onChange={this.handleChange}/>
                                </span>
                                <button type="submit" onClick={event => this.searchCompany()}>Search</button>
                                <br/>
                                <span className="modal_form__form-group-label text_cor_blue">
                                    ※ 업체명으로 검색하세요.
                                </span>
                                <div className="modal_form__form-group-field">
                                    <Table className="material-table" size="small">
                                        {viewSearchCompany}
                                    </Table>
                                </div>
                            </div>
                        </div>
                        <ButtonToolbar className="assets_write__modal__footer_comment">
                            {/*<Button className="assets_write__modal_ok"
                                    color="success"
                                    onClick={this.searchToggle}>Submit</Button>&nbsp;&nbsp;*/}
                            <Button className="assets_write__modal_cancel"
                                    onClick={this.searchToggle}>Cancel</Button>
                        </ButtonToolbar>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'AssetsWriteForm', // a unique identifier for this form
    validate,
})(withTranslation('common')(AssetsWrite));
