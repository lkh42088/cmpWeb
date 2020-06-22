import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, ButtonToolbar, Modal} from 'reactstrap';
import classNames from 'classnames';
import {Field, reduxForm, FieldArray} from "redux-form";
import {findDOMNode} from "react-dom";
import {List, Map} from "immutable";
import CalendarBlankIcon from "mdi-react/CalendarBlankIcon";
import AccountSearchIcon from "mdi-react/AccountSearchIcon";
import PlusIcon from "mdi-react/PlusIcon";
import MinusIcon from "mdi-react/MinusIcon";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {withTranslation} from "react-i18next";
import {
    getCompanyByName, setViewModalDivision, setAddEleData,
} from "../../../../redux/actions/assetsAction";
/*import renderDatePickerField from "../../../../shared/components/form/DatePicker";*/
import renderIntervalDatePickerField from "./IntervalDatePicker";
import renderDatePickerField from "./DatePicker";
import {changeField} from "../../../../redux/actions/authActions";

function checkIP(strIP) {
    const expUrl = /^(1|2)?\d?\d([.](1|2)?\d?\d){3}$/;
    return expUrl.test(strIP);
}

function validate(values) {
    const errors = {};

    if (values.deviceType === '0' || values.deviceType === undefined) {
        errors.deviceType = "장비구분을 선택해주세요.";
    }

    if (values.ownership === '0' || values.ownership === undefined) {
        errors.ownership = "소유권을 선택해주세요.";
    }

    if (values.ownershipDiv === '0' || values.ownershipDiv === undefined) {
        errors.ownershipDiv = "소유권구분을 선택해주세요.";
    }

    /* // eslint-disable-next-line no-plusplus
     for (let i = 0; i < elIpName.length; i++) {
         elIpName[i].style.display = "none";
     }

     // eslint-disable-next-line guard-for-in,no-restricted-syntax
     for (const arrData in values) {
         console.log("arrData : ", arrData, " values : ", values[arrData]);
         if (arrData.indexOf("ip_") === 0) {
             IpArray = values[arrData];

             elIp = document.getElementById(`errorTextIp_${arrData}`);

             if (checkIP(IpArray) === false) {
                 elIp.style.display = "";
             }
         }
     }*/

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
            {field.meta.touched && field.meta.error
            && <span className="warringStyle">&nbsp;※ {field.meta.error}</span>}
            &nbsp;&nbsp;
            <b className="text_cor_orange"
               style={{lineHeight: "20px"}}>{field
                .label.name} / {field.label.id}</b>
        </div>
        {/*{field.meta.touched && field.meta.error
        && <span className="modal_form__form-group-description">※ {field.meta.error}</span>}*/}
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
            {touched && error && <span className="warringStyle">&nbsp;※ {error}</span>}
        </div>
    </Fragment>
);

class AssetsEdit extends PureComponent {
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
        //console.log("👉 constructor start");
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
            SplaArray: [],
            warehousingDateError: 'test',
            searchToggleDivision: '',
            searchCompanyName: '',
            searchCustomerId: '',
            searchOwnerCompanyId: '',
            deviceDataArray: {},
            initializeData: ({}),
            ipArrayMap: {},
            splaArrayMap: {},
        };
    }

    componentDidMount() {
        const {
            initialize, assetState,
        } = this.props;
        const {
            IpArray, SplaArray, initializeData, ipArrayMap, splaArrayMap,
        } = this.state;

        //console.log("👉 componentDidMount start");

        const setIpArray = [];
        const setSplaArray = [];
        let setIpArrayTemp = new Map();
        let setSplaArrayTemp = new Map();

        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const arrData in assetState.deviceOri) {
            if (arrData.indexOf("ip", 0) === 0) {
                setIpArray.push(arrData);
                if (arrData !== 'ip') {
                    setIpArrayTemp = setIpArrayTemp.set(arrData, assetState.deviceOri[arrData]);
                }
            } else if (arrData.indexOf("spla", 0) === 0) {
                setSplaArray.push(arrData);
                if (arrData !== 'spla') {
                    setSplaArrayTemp = setSplaArrayTemp.set(arrData, assetState.deviceOri[arrData]);
                }
            }
        }

        setIpArray.slice(1, setIpArray.length);
        setIpArray.splice(0, 1);

        //console.log("setIpArrayTemp : ", JSON.parse(JSON.stringify(setIpArrayTemp)));

        this.setState({
            IpArray: IpArray.concat(setIpArray),
            SplaArray: SplaArray.concat(setSplaArray),
            initializeData: assetState.deviceOri,
        });

        setIpArrayTemp = JSON.parse(JSON.stringify(setIpArrayTemp));
        setSplaArrayTemp = JSON.parse(JSON.stringify(setSplaArrayTemp));

        //console.log("setIpArrayTemp : ", setIpArrayTemp);
        //console.log("setSplaArrayTemp : ", setSplaArrayTemp);

        this.setState({
            initializeData: ({
                ...assetState.deviceOri,
                inIpArray: setIpArray,
            }),
            ipArrayMap: assetState.deviceIp,
            splaArrayMap: assetState.deviceSpla,
        });

        /*console.log("ipArrayMap : ", ipArrayMap);
        console.log("splaArrayMap : ", splaArrayMap);*/

        initialize(assetState.deviceOri);
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

        dispatch(getCompanyByName(searchCompanyName));
    };

    setSearchCompany = (val) => {
        const {
            assetState, dispatch, handleSubmit,
        } = this.props;
        const {searchToggleDivision} = this.state;
        //console.log("searchToggleDivision : ", searchToggleDivision);

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
        const {
            initializeData,
        } = this.state;
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
                            component="select">
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

    onClose = () => {
        const {
            assetState, dispatch, closeToggle,
        } = this.props;
        dispatch(setViewModalDivision('read'));
        closeToggle(); //
    };

    showPassword = (e) => {
        e.preventDefault();
        this.setState(prevState => ({showPassword: !prevState.showPassword}));
    };

    handleChangeIp = (e) => {
        //console.log("🤑🤑 handleChangeIp start : ", e.charCode);
        //console.log("🤑🤑 handleChangeIp start : ");
        const {assetState, dispatch} = this.props;
        const {
            ipArrayMap,
        } = this.state;

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

        this.setState({
            splaArrayMap: setSplaArrayTemp,
        });

        dispatch(setAddEleData('spla', setSplaArrayTemp));
    };

    setHtmlPlus = (val) => {
        const {assetState, dispatch} = this.props;
        const {initialize} = this.props;
        const {
            initializeData, ipArrayMap, splaArrayMap,
            AddIpComponent, AddIpComponentMax, AddSplaComponent, AddSplaComponentMax,
            IpArray, SplaArray,
        } = this.state;
        let tempContent;

        if (val === 'ip') {
            const reName = `ip_${AddIpComponentMax + 1}`;
            let setIpArrayTemp = new Map();

            if (Object.keys(ipArrayMap).length < 10) {
                // eslint-disable-next-line guard-for-in,no-restricted-syntax
                for (const arrData in ipArrayMap) {
                    setIpArrayTemp = setIpArrayTemp.set(arrData, ipArrayMap[arrData]);
                }

                setIpArrayTemp = setIpArrayTemp.set(reName, "");
                setIpArrayTemp = JSON.parse(JSON.stringify(setIpArrayTemp));

                this.setState({
                    /*IpArray: IpArray.concat([reName]),
                    initializeData: ({
                        ...initializeData,
                        [reName]: '',
                        inIpArray: IpArray.concat(reName),
                    }),*/
                    AddIpComponentMax: AddIpComponentMax + 1,
                    ipArrayMap: setIpArrayTemp,
                });

                dispatch(setAddEleData('ip', setIpArrayTemp));
            }
        } else if (val === 'spla') {
            const reName = `spla${AddSplaComponentMax + 1}`;
            let setSplaArrayTemp = new Map();

            if (Object.keys(splaArrayMap).length < 10) {
                // eslint-disable-next-line guard-for-in,no-restricted-syntax
                for (const arrData in splaArrayMap) {
                    setSplaArrayTemp = setSplaArrayTemp.set(arrData, splaArrayMap[arrData]);
                }

                setSplaArrayTemp = setSplaArrayTemp.set(reName, "");
                setSplaArrayTemp = JSON.parse(JSON.stringify(setSplaArrayTemp));

                this.setState({
                    /*SplaArray: SplaArray.concat([reName]),*/
                    AddSplaComponentMax: AddSplaComponentMax + 1,
                    splaArrayMap: setSplaArrayTemp,
                });

                dispatch(setAddEleData('spla', setSplaArrayTemp));
            }
        }
    };

    setHtmlMinus = (reName, val, e) => {
        const {
            IpArray, SplaArray, initializeData, ipArrayMap, splaArrayMap,
        } = this.state;
        const {initialize, dispatch} = this.props;
        let setIpArrayTemp = new Map();
        let setSplaArrayTemp = new Map();

        if (val === 'ip') {
            /*            const AddIpComponentTemp = IpArray.slice(IpArray.length)
                            .concat(IpArray.filter(d => d.toString() !== reName.toString()));*/

            // eslint-disable-next-line guard-for-in,no-restricted-syntax
            for (const arrData in ipArrayMap) {
                if (reName.toString() !== arrData.toString()) {
                    setIpArrayTemp = setIpArrayTemp.set(arrData, ipArrayMap[arrData]);
                }
            }

            setIpArrayTemp = JSON.parse(JSON.stringify(setIpArrayTemp));

            this.setState({
                /*IpArray: AddIpComponentTemp,
                initializeData: ({
                    ...initializeData,
                    inIpArray: AddIpComponentTemp,
                   [reName.toString()]: '',
                }),*/
                ipArrayMap: setIpArrayTemp,
            });
            dispatch(setAddEleData('ip', setIpArrayTemp));
            //initialize(initializeData);
        } else if (val === 'spla') {
            /*            const AddSplaComponentTemp = SplaArray.slice(SplaArray.length)
                            .concat(SplaArray.filter(d => d.toString() !== reName.toString()));*/

            // eslint-disable-next-line guard-for-in,no-restricted-syntax
            for (const arrData in splaArrayMap) {
                if (reName.toString() !== arrData.toString()) {
                    setSplaArrayTemp = setSplaArrayTemp.set(arrData, splaArrayMap[arrData]);
                }
            }

            setSplaArrayTemp = JSON.parse(JSON.stringify(setSplaArrayTemp));
            this.setState({
                /*SplaArray: AddSplaComponentTemp,*/
                splaArrayMap: setSplaArrayTemp,
            });
            dispatch(setAddEleData('spla', setSplaArrayTemp));
        }
    };

    render() {
        //console.log("👉👉👉👉👉👉👉👉 render start edit");
        const {
            title, message,
            assetState, dispatch, handleSubmit,
        } = this.props;
        const {
            deviceDataArray, initializeData, ipArrayMap, splaArrayMap,
            modal, RackComponent, ModelComponent, AddIpComponent, AddSplaComponent,
            RegisterId, IpArray, SplaArray, warehousingDateError,
            searchCompanyName, searchCustomerId, searchOwnerCompanyId, searchToggleDivision,
            manufacture, idc,
        } = this.state;
        const {showPassword} = this.state;
        let deviceRawValue = new Map([]);

        const deviceStyle = {
            textDecoration: '#ffdd67 underline',
            fontWeight: 'bold',
        };

        //console.log("★★★★ initializeData : ", initializeData);

        const modalClass = classNames({
            'assets_write__modal-dialog': true,
            'assets_write__modal-dialog--colored': false,
            'assets_write__modal-dialog--header': false,
        });

        let viewContent;

        const deviceValue = assetState.device[0];
        deviceRawValue = assetState.deviceOri;
        const setIpArray = [];
        const setSplaArray = [];

        //console.log("★★★★ ipArrayMap : ", ipArrayMap, "redux : ", assetState.deviceIp);
        //console.log("★★★★ splaArrayMap : ", splaArrayMap, "redux : ", assetState.deviceSpla);

        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const arrData in ipArrayMap) {
            //console.log("arrData : ", arrData, ", value : ", ipArrayMap[arrData]);
            if (arrData.indexOf("ip", 0) === 0) {
                setIpArray.push(
                    <Fragment key={arrData}>
                        {
                            arrData !== undefined && arrData !== "" && arrData !== "ip"
                            && (
                                <div className="modal_form__form-group-field">
                                    <input
                                        name={`${arrData}`}
                                        type="text"
                                        onBlur={this.handleChangeIp}
                                        className="input_col_5"
                                        defaultValue={ipArrayMap[arrData]}
                                    />
                                    <svg className="mdi-icon " width="24" height="24"
                                         fill="currentColor"
                                         viewBox="0 0 24 24"
                                         onClick={event => this.setHtmlMinus(`${arrData}`, 'ip', this)}
                                         onKeyDown={event => this.setHtmlMinus(`${arrData}`, 'ip', this)}
                                         role="button" tabIndex="0">
                                        <MinusIcon/>
                                    </svg>
                                    <span id={`errorTextIp_${arrData}`} name="errorTextIp"
                                          style={{display: "none"}}>
                                    ※ IP를 정확히 입력해 주세요.</span>
                                </div>
                            )
                        }
                    </Fragment>,
                );
            }
        }


        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const arrData in splaArrayMap) {
            //console.log("arrData : ", arrData, ", value : ", ipArrayMap[arrData]);
            if (arrData.indexOf("spla", 0) === 0) {
                setSplaArray.push(
                    <Fragment key={arrData}>
                        {
                            arrData !== undefined && arrData !== "" && arrData !== "spla"
                            && (
                                <div className="modal_form__form-group-field">
                                    <select
                                        name={`${arrData}`}
                                        defaultValue={splaArrayMap[arrData]}
                                        onChange={this.handleChangeSpla}
                                    >
                                        <option value="0">선택하세요.</option>
                                        {assetState.codes.codeSpla
                                            .map(c => (
                                                <option key={c.codeId.toString()}
                                                        value={c.codeId}
                                                >{c.name}</option>
                                            ))}
                                    </select>
                                    <svg className="mdi-icon " width="24" height="24"
                                         fill="currentColor"
                                         viewBox="0 0 24 24"
                                         onClick={event => this.setHtmlMinus(`${arrData}`, 'spla', this)}
                                         onKeyDown={event => this.setHtmlMinus(`${arrData}`, 'spla', this)}
                                         role="button" tabIndex="0">
                                        <MinusIcon/>
                                    </svg>
                                </div>
                            )
                        }
                    </Fragment>,
                );
            }
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
                            <span className="modal_form__form-group-label">IP</span>
                            <div className="modal_form__form-group-field">
                                <svg className="mdi-icon" width="24" height="24" fill="currentColor"
                                     viewBox="0 0 24 24"
                                     onClick={event => this.setHtmlPlus('ip')}
                                     onKeyDown={event => this.setHtmlPlus('ip')}
                                     role="button" tabIndex="0">
                                    <PlusIcon/>
                                </svg>
                                <span className="cautionStyle">※ 최대 등록 개수는 10개 입니다.</span>
                            </div>
                            {setIpArray}
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
                            {/*<div className="modal_form__form-group-field">
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
                                <span>※ 최대 등록 개수는 10개 입니다.</span>
                            </div>*/}
                            <div className="modal_form__form-group-field">
                                <svg className="mdi-icon" width="24" height="24" fill="currentColor"
                                     viewBox="0 0 24 24"
                                     onClick={event => this.setHtmlPlus('spla')}
                                     onKeyDown={event => this.setHtmlPlus('spla')}
                                     role="button" tabIndex="0">
                                    <PlusIcon/>
                                </svg>
                                <span className="cautionStyle">※ 최대 등록 개수는 10개 입니다.</span>
                            </div>
                            {setSplaArray}
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
                                <svg className="mdi-icon" width="24" height="24" fill="currentColor"
                                     viewBox="0 0 24 24"
                                     onClick={event => this.setHtmlPlus('ip')}
                                     onKeyDown={event => this.setHtmlPlus('ip')}
                                     role="button" tabIndex="0">
                                    <PlusIcon/>
                                </svg>
                                <span className="cautionStyle">※ 최대 등록 개수는 10개 입니다.</span>
                            </div>
                            {setIpArray}
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
                        {/*                        onSubmit={this.handleSubmit}>*/}
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label text_cor_green">장비코드</span>
                            <div className="modal_form__form-group-field">
                                <b><h6 style={deviceStyle}>{deviceValue.deviceCode}</h6></b>
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
                                {idc ? (
                                    RackComponent
                                ) : (
                                    <Field
                                        name="rack"
                                        component="select">
                                        <option value="0">선택하세요.</option>
                                        {assetState.subCodes.data
                                            .map(d => (Number(d.codeId) === Number(deviceRawValue.idc)
                                                && <option key={d.id} value={d.id}>{d.name}</option>))
                                        }
                                    </Field>
                                )}
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">제조사 / 모델명</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="manufacture"
                                    component="select"
                                    onChange={this.handleChange}>
                                    <option value="0">선택하세요.</option>
                                    {assetState.codes.codeManufacture
                                        .map((d, index) => (
                                            <option key={d.codeId.toString()}
                                                    value={d.codeId}>{d.name}</option>
                                        ))}
                                </Field>
                                {/*                                <select name="manufacture"
                                        onChange={this.handleChange}>
                                    <option value="0">선택하세요.</option>
                                    {assetState.codes.codeManufacture
                                        .map((d, index) => (
                                            <option key={d.codeId.toString()}
                                                    value={d.codeId.toString()}>{d.codeId}/{d.name}</option>
                                        ))}
                                </select>*/}
                                &nbsp;&nbsp;
                                {manufacture ? (
                                    ModelComponent
                                ) : (
                                    <Field
                                        name="model"
                                        component="select">
                                        <option value="0">선택하세요.</option>
                                        {assetState.subCodes.data
                                            .map(d => (Number(d.codeId) === Number(deviceRawValue.manufacture)
                                                && <option key={d.id} value={d.id}>{d.name}</option>))
                                        }
                                    </Field>
                                )}
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
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">고객사</span>
                            <Field
                                name="customer"
                                type="text"
                                className="input_col_7"
                                placeholder="고객사"
                                label={{name: deviceValue.customerName, id: deviceValue.customer}}
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
                            <span className="modal_form__form-group-label">소유업체명</span>
                            <Field
                                name="ownerCompany"
                                type="text"
                                className="input_col_7"
                                placeholder="소유업체명"
                                initialValues={searchOwnerCompanyId}
                                label={{name: deviceValue.ownerCompanyName, id: deviceValue.ownerCompany}}
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
                                    className="modal_form__form-group-label">HW S/N</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="hwSn"
                                    component="input"
                                    type="text"
                                    className="input_col_10"
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">임대기간</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="rentDate"
                                    className="input_col_5"
                                    value={deviceRawValue.rentDate}
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
                                    value={deviceRawValue.warehousingDate}
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
                                        type="submit">수정</Button>
                                <Button className="assets_write__modal_cancel"
                                        onClick={this.onClose}>닫기</Button>
                                {/*<Button type="submit">Submit[test]</Button>*/}
                            </ButtonToolbar>
                        </div>
                    </form>
                    {/*<Modal
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
                                <button type="submit"
                                        onClick={event => this.searchCompany()}>검색</button>
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
                            <Button className="assets_write__modal_cancel"
                                    onClick={this.searchToggle}>Cancel</Button>
                        </ButtonToolbar>
                    </Modal>*/}
                    <Modal
                        isOpen={modal}
                        toggle={this.searchToggle}
                        className={`assets_write__modal-dialog assets_write__modal-dialog--success ${modalClass}`}
                    >
                        <div className="search_card_body">
                            <div className="assets_write__modal__header">
                                &nbsp;&nbsp;
                                <button className="lnr lnr-cross assets_write__modal__close__notitle-btn" type="button"
                                        onClick={this.searchToggle}/>
                            </div>
                            <div className="assets_write__modal__body assets_write__modal__tableLine">
                                <div className="modal_form__form-group">
                                <span
                                    className="modal_form__form-group-label text_cor_green">
                                    <input name="searchCompanyName" className="search_input"
                                           value={searchCompanyName}
                                           placeholder="고객사명..."
                                           onChange={this.handleChange}/>
                                </span>
                                    {/*<button type="submit" onClick={event => this.searchCompany()}>검색</button>*/}
                                    <Button className="search_btn" type="submit"
                                            onClick={event => this.searchCompany()}>검색</Button>
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
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'AssetsEditForm', // a unique identifier for this form
    validate,
})(withTranslation('common')(AssetsEdit));
