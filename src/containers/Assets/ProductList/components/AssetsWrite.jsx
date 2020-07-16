import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Button, ButtonToolbar, Card, CardBody, Modal,
} from 'reactstrap';
import classNames from 'classnames';
import {Field, reduxForm} from "redux-form";
import {findDOMNode} from "react-dom";
import {Map} from "immutable";

import Dialog from "@material-ui/core/Dialog";
import AccountSearchIcon from "mdi-react/AccountSearchIcon";
import PlusIcon from "mdi-react/PlusIcon";
import MinusIcon from "mdi-react/MinusIcon";
import CurrencyUsdIcon from 'mdi-react/CurrencyUsdIcon';

import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {FixedSizeList} from "react-window";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import MatButton from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import {withTranslation} from "react-i18next";
import {getCompanyByName, setAddEleData} from "../../../../redux/actions/assetsAction";

import renderIntervalDatePickerField from "../../../../shared/components/form/IntervalDatePicker";
import renderDatePickerField from "../../../../shared/components/form/DatePicker";

function validate(values) {
    const errors = {};

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

    return errors;
}

const renderCustomerField = field => (
    <Fragment>
        <div className="modal_form__form-group-field">
            <input {...field.input} type={field.type} placeholder={field.placeholder}
                   value={field.initialValues} onClick={field.searchToggle} onKeyDown={field.searchToggle}
                   role="button" tabIndex="0" className={field.className}
            />
            {/*<span className="search_btn_span"
                  onClick={field.searchToggle} onKeyDown={field.searchToggle}
                  role="button" tabIndex="0"
            ><AccountSearchIcon/></span>*/}
            <div className="modal_form__form-group-icon"
                 onClick={field.searchToggle} onKeyDown={field.searchToggle}
                 role="button" tabIndex="0">
                <AccountSearchIcon/>
            </div>

            {
                field.label.name === "" ? (
                    field.meta.touched && field.meta.error
                    && <span className="warringStyle">&nbsp;※ {field.meta.error}</span>
                ) : (
                    <b className="text_cor_orange"
                       style={{lineHeight: "32px"}}>&nbsp;
                        {field.label.name} / {field.label.id}</b>
                )
            }
        </div>
    </Fragment>
);

const renderSelectCustomField = ({
                                     input, placeholder, codeDivision, className,
                                     meta: {touched, error},
                                 }) => (
    <Fragment>
        <div className="modal_form__form-group-field">
            <select
                {...input}
                placeholder={placeholder}
                className={className}
            >
                <option value="0">:: SELECT ::.</option>
                {
                    codeDivision.code.map((d, index) => (
                        <option key={d.codeId.toString()}
                                value={d.codeId}>{d.name}</option>
                    ))}
            </select>
            {touched && error && <span className="warringStyle">&nbsp;※ {error}</span>}
        </div>
    </Fragment>
);

class AssetsWrite extends PureComponent {
    static propTypes = {
        // eslint-disable-next-line react/forbid-prop-types
        assetState: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        closeToggle: PropTypes.func,
        // eslint-disable-next-line react/forbid-prop-types
        theme: PropTypes.object.isRequired,
    };

    static defaultProps = {
        closeToggle: '',
    };

    constructor() {
        super();
        this.state = {
            modal: false,
            showPassword: false,
            RackComponent: <span className="cautionStyle">※ IDC를 선택하세요.</span>,
            ModelComponent: <span className="cautionStyle">※ Model을 선택하세요.</span>,
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
            searchCustomerName: '',
            searchOwnerCompanyId: '',
            searchOwnerCompanyName: '',
            ipArrayMap: {},
            splaArrayMap: {},
        };
    }

    componentDidMount() {
        const {
            initialize,
        } = this.props;
        initialize({warehousingDate: new Date()});
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
        const {dispatch} = this.props;
        const {searchCompanyName} = this.state;

        dispatch(getCompanyByName(searchCompanyName));
    };

    setSearchCompany = (cpUserId, name) => {
        const {searchToggleDivision} = this.state;

        if (searchToggleDivision === 'customer') {
            this.setState({
                searchCustomerId: cpUserId,
                searchCustomerName: name,
            });

            setTimeout(() => {
                this.customerField.blur();
            }, 500);
        } else if (searchToggleDivision === 'ownerCompany') {
            this.setState({
                searchOwnerCompanyId: cpUserId,
                searchOwnerCompanyName: name,
            });

            setTimeout(() => {
                this.ownerCompanyField.blur();
            }, 500);
        }

        this.setState(prevState => ({modal: !prevState.modal}));
    };

    handleChange = (e) => {
        const {assetState} = this.props;
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
                            component="select"
                            className="select_col_4">
                            <option value="0">:: SELECT ::</option>
                            {assetState.subCodes.data
                                .map(d => (Number(d.codeId) === Number(e.target.value)
                                    && <option key={d.id} value={d.id}>{d.name}</option>))
                            }
                        </Field>
                    );
                } else {
                    tempContent = <span className="cautionStyle">※ 연결된 Rack이 없습니다.</span>;
                }
            } else {
                tempContent = <span className="cautionStyle">※ IDC를 선택하세요.</span>;
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
                            component="select"
                            className="select_col_4">
                            <option value="0">:: SELECT ::</option>
                            {assetState.subCodes.data
                                .map(d => (Number(d.codeId) === Number(e.target.value)
                                    && <option key={d.id} value={d.id}>{d.name}</option>))
                            }
                        </Field>
                    );
                } else {
                    tempContent = <span className="cautionStyle">※ 연결된 Model이 없습니다.</span>;
                }
            } else {
                tempContent = <span className="cautionStyle">※ 제조사를 선택하세요.</span>;
            }
            this.setState({
                ModelComponent: tempContent,
            });
        }
    };

    handleChangeIp = (e) => {
        const {dispatch} = this.props;
        const {ipArrayMap} = this.state;

        const reName = e.target.name;
        let setIpArrayTemp = new Map();

        // todo... 나중에 map 으로 변경하는게 for 안돌리고 처리 괜찮을듯 (map 2개)
        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const arrData in ipArrayMap) {
            //console.log("arrData : ", arrData, ", value : ", ipArrayMap[arrData]);
            setIpArrayTemp = setIpArrayTemp.set(arrData, ipArrayMap[arrData]);
            if (reName.toString() === arrData.toString()) {
                setIpArrayTemp = setIpArrayTemp.set(arrData, e.target.value);
            }
        }

        setIpArrayTemp = JSON.parse(JSON.stringify(setIpArrayTemp));

        this.setState({
            ipArrayMap: setIpArrayTemp,
        });

        dispatch(setAddEleData('ip', setIpArrayTemp));
    };

    handleChangeSpla = (e) => {
        const {dispatch} = this.props;
        const {splaArrayMap} = this.state;
        const reName = e.target.name;

        let setSplaArrayTemp = new Map();
        console.log("splaArrayMap : ", splaArrayMap);

        // todo... 나중에 map 으로 변경하는게 for 안돌리고 처리 괜찮을듯 (map 2개)
        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const arrData in splaArrayMap) {
            //console.log("arrData : ", arrData, ", value : ", ipArrayMap[arrData]);
            setSplaArrayTemp = setSplaArrayTemp.set(arrData, splaArrayMap[arrData]);
            if (reName.toString() === arrData.toString()) {
                setSplaArrayTemp = setSplaArrayTemp.set(arrData, e.target.value);
            }
        }

        setSplaArrayTemp = JSON.parse(JSON.stringify(setSplaArrayTemp));
        //console.log("setSplaArrayTemp: ", setSplaArrayTemp);

        console.log("setSplaArrayTemp : ", setSplaArrayTemp);

        this.setState({
            splaArrayMap: setSplaArrayTemp,
        });

        dispatch(setAddEleData('spla', setSplaArrayTemp));
    };

    handleChangeOwnerShip = (e) => {
        if (e.target.value === "1") {
            this.setState({
                searchOwnerCompanyId: "conbridge",
                searchOwnerCompanyName: "(주)콘텐츠브릿지",
            });
            this.ownerCompanyField.focus();

            setTimeout(() => {
                this.ownerCompanyField.blur();
            }, 500);
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
        const {assetState, dispatch} = this.props;
        const {
            ipArrayMap, splaArrayMap,
            AddIpComponent, AddIpComponentMax, AddSplaComponent, AddSplaComponentMax,
        } = this.state;
        let tempContent;
        if (val === 'ip') {
            let setIpArrayTemp = new Map();
            const reName = `ip${AddIpComponentMax}`;

            if (AddIpComponent.length < 10) {
                // eslint-disable-next-line guard-for-in,no-restricted-syntax
                for (const arrData in ipArrayMap) {
                    setIpArrayTemp = setIpArrayTemp.set(arrData, ipArrayMap[arrData]);
                }
                setIpArrayTemp = setIpArrayTemp.set(reName, "");
                tempContent = (
                    <div className="modal_form__form-group-field" key={reName}
                         style={{paddingBottom: "5px"}}>
                        <input
                            name={`${reName}`}
                            type="text"
                            onBlur={this.handleChangeIp}
                            className="input_col_5"
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

                setIpArrayTemp = JSON.parse(JSON.stringify(setIpArrayTemp));

                this.setState({
                    AddIpComponentMax: AddIpComponentMax + 1,
                    AddIpComponent: AddIpComponent.concat(tempContent),
                    ipArrayMap: setIpArrayTemp,
                });
                dispatch(setAddEleData('ip', setIpArrayTemp));
            }
        } else if (val === 'spla') {
            let setSplaArrayTemp = new Map();
            const reName = `spla${AddSplaComponentMax}`;

            if (AddSplaComponent.length < 10) {
                // eslint-disable-next-line guard-for-in,no-restricted-syntax
                for (const arrData in splaArrayMap) {
                    setSplaArrayTemp = setSplaArrayTemp.set(arrData, splaArrayMap[arrData]);
                }
                tempContent = (
                    <div className="modal_form__form-group-field" key={reName}
                         style={{paddingBottom: "5px"}}>
                        <select
                            name={`${reName}`}
                            onChange={this.handleChangeSpla}
                        >
                            <option value="0">:: SELECT ::</option>
                            {assetState.codes.codeSpla
                                .map(c => (
                                    <option key={c.codeId.toString()}
                                            value={c.codeId}
                                    >{c.name}</option>
                                ))}
                        </select>
                        <svg className="mdi-icon " width="24" height="24" fill="currentColor"
                             viewBox="0 0 24 24"
                             onClick={event => this.setHtmlMinus(reName, val)}
                             onKeyDown={event => this.setHtmlMinus(reName, val)}
                             role="button" tabIndex="0">
                            <MinusIcon/>
                        </svg>
                    </div>
                );

                setSplaArrayTemp = setSplaArrayTemp.set(reName, "");
                setSplaArrayTemp = JSON.parse(JSON.stringify(setSplaArrayTemp));

                this.setState({
                    AddSplaComponentMax: AddSplaComponentMax + 1,
                    AddSplaComponent: AddSplaComponent.concat(tempContent),
                    splaArrayMap: setSplaArrayTemp,
                });
                dispatch(setAddEleData('spla', setSplaArrayTemp));
            }
        }
    };

    setHtmlMinus = (reName, val) => {
        const {
            AddIpComponent, AddSplaComponent, ipArrayMap, splaArrayMap,
        } = this.state;
        const {dispatch} = this.props;
        let setIpArrayTemp = new Map();
        let setSplaArrayTemp = new Map();

        if (val === 'ip') {
            const AddIpComponentTemp = AddIpComponent.slice(AddIpComponent.length)
                .concat(AddIpComponent.filter(d => d.key !== reName));

            // eslint-disable-next-line guard-for-in,no-restricted-syntax
            for (const arrData in ipArrayMap) {
                if (reName.toString() !== arrData.toString()) {
                    setIpArrayTemp = setIpArrayTemp.set(arrData, ipArrayMap[arrData]);
                }
            }

            setIpArrayTemp = JSON.parse(JSON.stringify(setIpArrayTemp));

            this.setState({
                AddIpComponent: AddIpComponentTemp,
                ipArrayMap: setIpArrayTemp,
            });
            dispatch(setAddEleData('ip', setIpArrayTemp));
        } else if (val === 'spla') {
            const AddSplaComponentTemp = AddSplaComponent.slice(AddSplaComponent.length)
                .concat(AddSplaComponent.filter(d => d.key !== reName));

            // eslint-disable-next-line guard-for-in,no-restricted-syntax
            for (const arrData in splaArrayMap) {
                if (reName.toString() !== arrData.toString()) {
                    setSplaArrayTemp = setSplaArrayTemp.set(arrData, splaArrayMap[arrData]);
                }
            }

            setSplaArrayTemp = JSON.parse(JSON.stringify(setSplaArrayTemp));
            this.setState({
                AddSplaComponent: AddSplaComponentTemp,
                splaArrayMap: setSplaArrayTemp,
            });
            dispatch(setAddEleData('spla', setSplaArrayTemp));
        }
    };

    render() {
        const {
            assetState, dispatch, handleSubmit, theme,
        } = this.props;
        const {
            modal, RackComponent, ModelComponent, AddIpComponent, AddSplaComponent,
            RegisterId, IpArray, warehousingDateError,
            searchCompanyName, searchCustomerId, searchOwnerCompanyId, searchToggleDivision,
            searchCustomerName, searchOwnerCompanyName,
        } = this.state;
        const {showPassword} = this.state;
        let emptyRows;

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

        if (assetState.company.length > 0) {
            emptyRows = assetState.company.length;
        } else {
            emptyRows = 0;
        }

        switch (assetState.deviceType) {
            case 'server':
                viewContent = (
                    <Fragment>
                        <div className="modal_form__form-group">
                                <span
                                    className="modal_form__form-group-label">CPU</span>
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
                                    className="modal_form__form-group-label">MEMORY</span>
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
                                    className="modal_form__form-group-label">HDD</span>
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
                            <span className="modal_form__form-group-label">Size</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="size"
                                    component="select"
                                    className="select_col_4"
                                >
                                    <option value="0">:: SELECT ::</option>
                                    {assetState.codes.codeSize
                                        .map((d, index) => (
                                            <option key={d.codeId.toString()}
                                                    value={d.codeId}>{d.name}</option>
                                        ))}
                                </Field>
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">IP</span>
                            <div className="modal_form__form-group-field">
                                <svg className="mdi-icon " width="24" height="24" fill="currentColor"
                                     viewBox="0 0 24 24"
                                     onClick={event => this.setHtmlPlus('ip')}
                                     onKeyDown={event => this.setHtmlPlus('ip')}
                                     role="button" tabIndex="0">
                                    <PlusIcon/>
                                </svg>
                                {/*TODO 디자인 통합 필요*/}
                                <span className="cautionStyle-add">※ 최대 등록 개수는 10개 입니다.</span>
                            </div>
                            {AddIpComponent}
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">SPLA</span>
                            <div className="modal_form__form-group-field">
                                <svg className="mdi-icon " width="24" height="24" fill="currentColor"
                                     viewBox="0 0 24 24"
                                     onClick={event => this.setHtmlPlus('spla')}
                                     onKeyDown={event => this.setHtmlPlus('spla')}
                                     role="button" tabIndex="0">
                                    <PlusIcon/>
                                </svg>
                                {/*TODO 디자인 통합 필요*/}
                                <span className="cautionStyle-add">※ 최대 등록 개수는 10개 입니다.</span>
                            </div>
                            {AddSplaComponent}
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">Rack Tag</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="rackTag"
                                    component="input"
                                    className="input_col_10"
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
                                    className="input_col_10"
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
                                <svg className="mdi-icon " width="24" height="24" fill="currentColor"
                                     viewBox="0 0 24 24"
                                     onClick={event => this.setHtmlPlus('ip')}
                                     onKeyDown={event => this.setHtmlPlus('ip')}
                                     role="button" tabIndex="0">
                                    <PlusIcon/>
                                </svg>
                                {/*TODO 디자인 통합 필요*/}
                                <span className="cautionStyle-add">※ 최대 등록 개수는 10개 입니다.</span>
                            </div>
                            {AddIpComponent}
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">FIRMWARE VERSION</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="firmwareVersion"
                                    component="input"
                                    className="input_col_10"
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
                                    className="input_col_10"
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
                                    className="input_col_10"
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
                                    className="input_col_10"
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
                                    className="select_col_4"
                                >
                                    <option value="0">:: SELECT ::</option>
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

        const viewSearchCompanyTemp = (
            <Fragment>
                {assetState.company.length !== undefined
                    ? (
                        <Fragment>
                            {assetState.company.map(d => (
                                <ListItem key={d.idx} button onClick={() => {
                                    this.setSearchCompany(d.cpUserId, d.name);
                                }}>
                                    <div className="list-title">{d.name}</div>
                                    {/*<div className="list-title">{d.name}</div>*/}
                                    <div className="list-title-sub">&nbsp;({d.cpUserId} / {d.email})</div>
                                </ListItem>
                            ))}
                            {emptyRows <= 0 && (
                                <ListItem>
                                    <div>검색된 내용이 없습니다.</div>
                                </ListItem>
                            )}
                        </Fragment>
                    )
                    : (
                        <ListItem>
                            <div>검색된 내용이 없습니다.</div>
                        </ListItem>
                    )
                }
            </Fragment>
        );

        // TODO 디자인은 나중에
        const viewSearchCompany = (
            <Fragment>
                {assetState.company.length !== undefined
                    ? (
                        <Fragment>
                            {assetState.company.map(d => (
                                <TableRow key={d.idx}>
                                    <TableCell className="material-table__cell material-table__cell-right"
                                    >{/*회사명*/}
                                        <b className="text_cor_green mouse_over_list">
                                            <div className="assets_add_modal_div"
                                                 onClick={event => this.setSearchCompany(d.cpUserId, d.name)}
                                                 onKeyDown={event => this.setSearchCompany(d.cpUserId, d.name)}
                                                 role="button" tabIndex="0"><span
                                                className="circle__ste"/>{d.name}</div>
                                        </b>
                                    </TableCell>
                                    <TableCell className="material-table__cell material-table__cell-right"
                                    >{/*회사 대표 ID*/}{d.cpUserId}
                                    </TableCell>
                                    <TableCell className="material-table__cell material-table__cell-right"
                                    >{/*회사 email*/}{d.email}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {emptyRows <= 0 && (
                                <TableRow style={{height: 49 * emptyRows}}>
                                    <TableCell colSpan={3} style={{textAlign: "center"}}>
                                        검색된 내용이 없습니다.
                                    </TableCell>
                                </TableRow>
                            )}
                        </Fragment>
                    )
                    : (
                        <TableRow>
                            <TableCell colSpan={3} style={{textAlign: "center"}}>
                                검색된 내용이 없습니다.
                            </TableCell>
                        </TableRow>
                    )
                }
            </Fragment>
        );

        return (
            /*<Dialog open="true">*/
            <div>
                <div className="assets_write__modal__header">
                    <p className="text-modal assets_write__modal__title">장비 등록
                        &nbsp;&nbsp;
                        <span className="assets_write__modal__title_sub">자산관리 장비 등록</span></p>
                    <button className="lnr lnr-cross assets_write__modal__close-btn" type="button"
                            onClick={this.onClose}/>
                </div>
                <div className="assets_write__modal__body assets_write__modal__tableLine">
                    <form className="modal_form modal_form--horizontal"
                          onSubmit={handleSubmit}>
                        <div className="modal_form__form-group">
                                        <span
                                            className="modal_form__form-group-label text_cor_green">장비코드</span>
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
                                    className="select_col_4"
                                    onChange={this.handleChange}>
                                    <option value="0">:: SELECT ::</option>
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
                                <Field
                                    name="manufacture"
                                    component="select"
                                    className="select_col_4"
                                    onChange={this.handleChange}>
                                    <option value="0">:: SELECT ::</option>
                                    {assetState.codes.codeManufacture
                                        .map((d, index) => (
                                            <option key={d.codeId.toString()}
                                                    value={d.codeId}>{d.name}</option>
                                        ))}
                                </Field>
                                &nbsp;&nbsp;
                                {ModelComponent}
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">*&nbsp;장비구분</span>
                            <Field
                                name="deviceType"
                                className="select_col_4"
                                component={renderSelectCustomField}
                                codeDivision={{
                                    code: assetState.codes.codeDeviceType,
                                }}
                            />
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">*&nbsp;소유권</span>
                            <Field
                                name="ownership"
                                className="select_col_4"
                                component={renderSelectCustomField}
                                codeDivision={{
                                    code: assetState.codes.codeOwnership,
                                }}
                                onChange={this.handleChangeOwnerShip}
                            />
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">*&nbsp;소유권구분</span>
                            <Field
                                name="ownershipDiv"
                                className="select_col_4"
                                component={renderSelectCustomField}
                                codeDivision={{
                                    code: assetState.codes.codeOwnershipDiv,
                                }}
                            />
                        </div>
                        <div className="modal_form__form-group">
                                <span
                                    className="modal_form__form-group-label text_cor_orange">*&nbsp;고객사</span>
                            <Field
                                name="customer"
                                type="text"
                                className="input_col_4"
                                placeholder="고객사"
                                initialValues={searchCustomerId}
                                label={{name: searchCustomerName, id: searchCustomerId}}
                                component={renderCustomerField}
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
                        </div>
                        <div className="modal_form__form-group">
                                <span
                                    className="modal_form__form-group-label text_cor_orange">*&nbsp;소유업체명</span>
                            <Field
                                name="ownerCompany"
                                type="text"
                                className="input_col_4"
                                placeholder="소유업체명"
                                initialValues={searchOwnerCompanyId}
                                label={{name: searchOwnerCompanyName, id: searchOwnerCompanyId}}
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
                            <span className="modal_form__form-group-label">입고일</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="warehousingDate"
                                    className="input_col_5"
                                    component={renderDatePickerField}
                                />
                                {/*<div className="modal_form__form-group-icon">
                                    <CalendarBlankIcon/>
                                </div>*/}
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">임대기간</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="rentDate"
                                    className="input_col_7"
                                    component={renderIntervalDatePickerField}
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">원가</span>
                            <div className="modal_form__form-group-field">
                                <div className="modal_form__form-group-icon">
                                    <CurrencyUsdIcon/>
                                </div>
                                <Field
                                    name="cost"
                                    component="input"
                                    className="input_col_10"
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
                        <div className="modal_form__form-group">
                                <span
                                    className="modal_form__form-group-label">HW S/N</span>
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
                        {/*<div className="modal_btn">
                            <ButtonToolbar className="assets_write__modal__footer">
                                <Button className="assets_write__modal_ok" color="primary"
                                        type="submit">등록</Button>
                                <Button className="assets_write__modal_cancel"
                                        onClick={this.onClose}>닫기</Button>
                            </ButtonToolbar>
                        </div>*/}
                        <div className="modal_btn">
                            <div className="float-right button-handle-form">
                                <MatButton
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    endIcon={<EditIcon/>}
                                >
                                    등록
                                </MatButton>
                                <MatButton
                                    variant="contained"
                                    color="default"
                                    onClick={this.onClose}
                                >
                                    닫기
                                </MatButton>
                            </div>
                        </div>
                    </form>
                </div>
                {/*todo 검색 모달 공통으로 빼기 - 현재 사용 assetswrite, assetsedit*/}
                <Modal
                    isOpen={modal}
                    toggle={this.searchToggle}
                    modalClassName={theme.className === 'theme-dark' ? (
                        "ltr-support modal-class_dark"
                    ) : (
                        "ltr-support modal-class_light"
                    )}
                    className={`assets_search__modal-dialog 
                    assets_write__modal-dialog--success ${modalClass}`}>
                    <div className="search_card_body">
                        <div className="assets_write__modal__header">
                            &nbsp;&nbsp;
                            <button
                                className="lnr lnr-cross assets_write__modal__close__notitle-btn"
                                type="button"
                                onClick={this.searchToggle}/>
                        </div>
                        <div className="assets_write__modal__body assets_write__modal__tableLine">
                            <div className="modal_form__form-group">
                                <span
                                    className="modal_form__form-group-label text_cor_green">
                                    <input name="searchCompanyName" className="search_input-customer"
                                           value={searchCompanyName}
                                           placeholder="고객사명..."
                                           onChange={this.handleChange}
                                           onKeyDown={(event) => {
                                               if (event.keyCode === 13) {
                                                   this.searchCompany();
                                               }
                                           }}
                                    />
                                </span>
                                {/*<button type="submit" onClick={event => this.searchCompany()}>검색</button>*/}
                                <Button className="search_btn" type="submit" color="primary"
                                        onClick={event => this.searchCompany()}>검색</Button>
                                <span className="modal_form__form-group-label text_cor_blue">
                                    ※ 업체명으로 검색하세요.
                                </span>
                                <div className="modal_form__form-group-field modal-list">

                                    <Grid container>
                                        <Grid item xs={12}
                                              className="modal-content-list">
                                            {viewSearchCompanyTemp}
                                        </Grid>
                                    </Grid>

                                    {/*<Table className="material-table" size="small">
                                        <TableHead>
                                            <TableRow>
                                                <th>회사명</th>
                                                <th>회사 대표 ID</th>
                                                <th>E-MAIL</th>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {viewSearchCompany}
                                        </TableBody>
                                    </Table>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
            /*</Dialog>*/
        );
    }
}

export default reduxForm({
    form: 'AssetsWriteForm', // a unique identifier for this form
    validate,
})(withTranslation('common')(AssetsWrite));
