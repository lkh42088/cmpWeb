import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, ButtonToolbar, Modal} from 'reactstrap';
import classNames from 'classnames';
import {Field, reduxForm} from "redux-form";
import CalendarBlankIcon from "mdi-react/CalendarBlankIcon";
import AccountSearchIcon from "mdi-react/AccountSearchIcon";
import PlusIcon from "mdi-react/PlusIcon";
import MinusIcon from "mdi-react/MinusIcon";
import {withTranslation} from "react-i18next";

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
    console.log("validate start : ", values);

    const errors = {};

    if (!values.Customer) {
        errors.Customer = "고객사를 선택해주세요.";
    }

    /*    if (!values.DeviceType) {
            errors.DeviceType = "장비구분을 선택해주세요.";
        }

        if (values.RentDate) {
            if (!values.RentDate.start) {
                errors.RentDateStart = "임대기간 시작일을 입력해주세요.";
            } else if (!values.RentDate.end) {
                errors.RentDateEnd = "임대기간 종료일을 입력해주세요.";
            }
        }

        if (!values.WarehousingDate) {
            errors.WarehousingDate = "입고일을 입력하세요.";
        }

        if (!values.Ownership) {
            errors.Ownership = "소유권을 선택해주세요.";
        }

        if (!values.OwnershipDiv) {
            errors.OwnershipDiv = "소유권구분을 선택해주세요.";
        }

        if (!values.OwnerCompany) {
            errors.OwnerCompany = "소유업체명을 선택해주세요.";
        }*/

    console.log("😡 errors : ", errors);

    return errors;
}

const renderInputField = ({
                              input, type, placeholder, meta: {touched, error},
                          }) => (
    <div>
        <input {...input} type={type} placeholder={placeholder}/>
        {touched && error && <span className="error">{error}</span>}
    </div>
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
        };
    }

    searchToggle = () => {
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
        if (e.target.name === 'IDC') { // IDC
            // RACK
            if (Number(e.target.value) > 0) {
                const hasSubCode = assetState.subCodes.data.some(d => (Number(d.CodeID) === Number(e.target.value)));

                if (hasSubCode === true) {
                    tempContent = (
                        <Field
                            name="Rack"
                            component="select">
                            <option value="none">렉없음</option>
                            {assetState.subCodes.data
                                .map(d => (Number(d.CodeID) === Number(e.target.value)
                                    && <option key={d.ID} value={d.ID}>{d.Name}</option>))
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
        } else if (e.target.name === 'Manufacture') { // 제조사
            // MODEL
            if (Number(e.target.value) > 0) {
                const hasSubCode = assetState.subCodes.data.some(d => (Number(d.CodeID) === Number(e.target.value)));

                if (hasSubCode === true) {
                    tempContent = (
                        <Field
                            name="Model"
                            component="select">
                            {assetState.subCodes.data
                                .map(d => (Number(d.CodeID) === Number(e.target.value)
                                    && <option key={d.ID} value={d.ID}>{d.Name}</option>))
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
        if (val === 'Ip') {
            const reName = `Ip${AddIpComponentMax}`;

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
                        <svg className="mdi-icon " width="24" height="24" fill="currentColor" viewBox="0 0 24 24"
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
        } else if (val === 'Spla') {
            const reName = `Spla${AddSplaComponentMax}`;

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
                                    <option key={d.CodeID.toString()} value={d.CodeID}>{d.Name}</option>
                                ))}
                        </Field>
                        <svg className="mdi-icon " width="24" height="24" fill="currentColor" viewBox="0 0 24 24"
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

        if (val === 'Ip') {
            const AddIpComponentTemp = AddIpComponent.slice(AddIpComponent.length)
                .concat(AddIpComponent.filter(d => d.key !== reName));

            this.setState({
                AddIpComponent: AddIpComponentTemp,
            });
        } else if (val === 'Spla') {
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
            RegisterId, IpArray,
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

        const renderField = ({
                                 input,
                                 label,
                                 type,
                                 meta: {asyncValidating, touched, error},
                             }) => (
            <div>
                <div>
                    <input {...input} type={type} placeholder={label}/>
                    {touched && error && <span>{error}</span>}
                </div>
            </div>
        );

        let viewContent;

        switch (assetState.deviceType) {
            case 'server':
                viewContent = (
                    <Fragment>
                        <span>CPU, MEMORY, HDD, IP, SIZE, SPLA, RackTag, RackLoc</span>
                        <div className="modal_form__form-group">
                                <span
                                    className="modal_form__form-group-label modal_form_label_blue">CPU</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="Cpu"
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
                                    name="Memory"
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
                                    name="Hdd"
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
                                    name="Ip"
                                    component="input"
                                    type="text"
                                    className="input_col_5"
                                    placeholder="ip"
                                />
                                <svg className="mdi-icon " width="24" height="24" fill="currentColor" viewBox="0 0 24 24"
                                     onClick={event => this.setHtmlPlus('Ip')} onKeyDown={event => this.setHtmlPlus('Ip')}
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
                                    name="Size"
                                    component="select"
                                >
                                    <option value="0">선택하세요.</option>
                                    {assetState.codes.codeSize
                                        .map((d, index) => (
                                            <option key={d.CodeID.toString()} value={d.CodeID}>{d.Name}</option>
                                        ))}
                                </Field>
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">SPLA</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="Spla"
                                    component="select"
                                >
                                    <option value="0">선택하세요.</option>
                                    {assetState.codes.codeSpla
                                        .map((d, index) => (
                                            <option key={d.CodeID.toString()} value={d.CodeID}>{d.Name}</option>
                                        ))}
                                </Field>
                                <svg className="mdi-icon " width="24" height="24" fill="currentColor"
                                     viewBox="0 0 24 24"
                                     onClick={event => this.setHtmlPlus('Spla')}
                                     onKeyDown={event => this.setHtmlPlus('Spla')}
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
                                    name="RackTag"
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
                                    name="RackLoc"
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
                        <span>IP, FIRMWAREVERSION, RackTag, RackLoc</span>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">IP</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="Ip"
                                    component="input"
                                    type="text"
                                    className="input_col_5"
                                    placeholder="ip"
                                />
                                <svg className="mdi-icon " width="24" height="24" fill="currentColor" viewBox="0 0 24 24"
                                     onClick={event => this.setHtmlPlus('Ip')} onKeyDown={event => this.setHtmlPlus('Ip')}
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
                                    name="FirmwareVersion"
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
                                    name="RackTag"
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
                                    name="RackLoc"
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
                        <span>WARRANTY, RackCode</span>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">WARRANTY</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="Warranty"
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
                                    name="RackCode"
                                    component="select"
                                >
                                    <option value="0">선택하세요.</option>
                                    {assetState.codes.codeRackCode
                                        .map((d, index) => (
                                            <option key={d.CodeID.toString()} value={d.CodeID}>{d.Name}</option>
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
                                    name="IDC"
                                    component="select"
                                    onChange={this.handleChange}>
                                    <option value="0">선택하세요.</option>
                                    {assetState.codes.codeIdc
                                        .map((d, index) => (
                                            <option key={d.CodeID.toString()} value={d.CodeID}>{d.Name}</option>
                                        ))}
                                </Field>
                                &nbsp;&nbsp;
                                {RackComponent}
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">제조사 / 모델명</span>
                            <div className="modal_form__form-group-field">
                                <select name="Manufacture"
                                        onChange={this.handleChange}>
                                    <option value="0">선택하세요.</option>
                                    {assetState.codes.codeManufacture
                                        .map((d, index) => (
                                            <option key={d.CodeID.toString()} value={d.CodeID}>{d.Name}</option>
                                        ))}
                                </select>
                                &nbsp;&nbsp;
                                {ModelComponent}
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">장비구분</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="DeviceType"
                                    component="select"
                                >
                                    <option value="0">선택하세요.</option>
                                    {assetState.codes.codeDeviceType
                                        .map((d, index) => (
                                            <option key={d.CodeID.toString()} value={d.CodeID}>{d.Name}</option>
                                        ))}
                                </Field>
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label text_cor_orange">고객사</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="Customer"
                                    type="text"
                                    className="input_col_7"
                                    placeholder="Icon Right Input"
                                    component={renderInputField}
                                />
                                <span className="search_btn_span"><AccountSearchIcon/></span>
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">소유권/소유권구분</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="Ownership"
                                    component="select"
                                >
                                    <option value="0">선택하세요.</option>
                                    {assetState.codes.codeOwnership
                                        .map((d, index) => (
                                            <option key={d.CodeID.toString()} value={d.CodeID}>{d.Name}</option>
                                        ))}
                                </Field>
                                &nbsp;&nbsp;
                                <Field
                                    name="OwnershipDiv"
                                    component="select"
                                >
                                    <option value="0">선택하세요.</option>
                                    {assetState.codes.codeOwnershipDiv
                                        .map((d, index) => (
                                            <option key={d.CodeID.toString()} value={d.CodeID}>{d.Name}</option>
                                        ))}
                                </Field>

                            </div>
                            <span className="modal_form__form-group-description">
                                  Explanation.
                                </span>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">소유업체명</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="OwnerCompany"
                                    component="input"
                                    type="text"
                                    className="input_col_7"
                                    placeholder="Icon Right Input"
                                />
                                <span className="search_btn_span"
                                      type="button"
                                      onClick={this.searchToggle} onKeyDown={this.searchToggle}
                                      role="button" tabIndex="0"
                                ><AccountSearchIcon/></span>
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                                <span
                                    className="modal_form__form-group-label modal_form_label_blue">HW S/N</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="HwSn"
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
                                    name="RentDate"
                                    className="input_col_5"
                                    component={renderIntervalDatePickerField}
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">입고일</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="WarehousingDate"
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
                                    name="Cost"
                                    component="input"
                                    className="input_col_5"
                                    type="number"
                                    placeholder="원가"
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">용도</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="Purpos"
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
                                    name="Contents"
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
                                <button type="submit">Submit</button>
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
                                    고객사명 : <input name=""/>
                                </span>
                                <br/>
                                <span className="modal_form__form-group-label text_cor_blue">
                                    ※ 업체명으로 검색하세요.
                                </span>
                                <div className="modal_form__form-group-field">
                                    미정
                                </div>
                            </div>
                        </div>
                        <ButtonToolbar className="assets_write__modal__footer_comment">
                            <Button className="assets_write__modal_ok"
                                    color="success"
                                    onClick={this.searchToggle}>Submit</Button>&nbsp;&nbsp;
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
