import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Card, CardBody, Col, Button, ButtonToolbar, Modal,
} from 'reactstrap';
import classNames from 'classnames';
import {
    Field, reduxForm, FieldArray, Form,
} from "redux-form";
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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import {withTranslation} from "react-i18next";
import {
    getCompanyByName, setViewModalDivision, setAddEleData,
    setAssetsPage, setState, getDeviceByIdx,
} from "../../../../redux/actions/assetsAction";
import renderIntervalDatePickerField from "./IntervalDatePicker";
import renderDatePickerField from "./DatePicker";

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
            <input {...field.input}
                   className={field.className} type={field.type} placeholder={field.placeholder}
                   value={field.initialValues} onClick={field.searchToggle} onKeyDown={field.searchToggle}
                   role="button" tabIndex="0"
                   style={{width: "40%"}}
            />
            <span className="search_btn_span"
                  onClick={field.searchToggle} onKeyDown={field.searchToggle}
                  role="button" tabIndex="0"
            ><AccountSearchIcon/></span>
            {field.meta.touched && field.meta.error
            && <span className="warringStyle">&nbsp;※ {field.meta.error}</span>}
            &nbsp;&nbsp;
            <b className="text_cor_orange"
               style={{lineHeight: "30px"}}>{field
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
    };

    static defaultProps = {
        title: '',
        message: '',
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
            AddIpComponentMax: 1,
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

            modalWarring: false,
            warringTitle: '',
            warringContents: '',
            warringClass: 'modal-dialog--danger',
            warringType: '',
        };
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        if (nextProps.assetState.stateVal.type === 'device') {
            switch (nextProps.assetState.stateVal.state) {
                case 'confirm':
                    return {
                        modalWarring: false,
                        warringTitle: '',
                        warringContents: '',
                        warringClass: '',
                        warringType: '',
                    };
                case 'request':
                    return {
                        modalWarring: true,
                        warringTitle: '경고',
                        warringContents: '수정하시겠습니까?',
                        warringClass: 'modal-dialog--danger',
                        warringType: 'danger',
                    };
                case 'success':
                    return {
                        modalWarring: true,
                        warringTitle: '확인',
                        warringContents: '요청하신 작업에 성공하였습니다.',
                        warringClass: 'modal-dialog--primary',
                        warringType: 'primary',
                    };
                case 'error':
                    return {
                        modalWarring: true,
                        warringTitle: '경고',
                        warringContents: '요청하신 작업에 실패하였습니다.',
                        warringClass: 'modal-dialog--danger',
                        warringType: 'danger',
                    };
                default:
                    break;
            }
        }
        return null; // null 을 리턴하면 따로 업데이트 할 것은 없다라는 의미
    };

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
        //dispatch(setViewModalDivision('read'));
        const {assetState, dispatch} = this.props;
        dispatch(setAssetsPage('view'));
    };

    onModal = () => {
        const {dispatch} = this.props;
        const stateVal = ({
            type: 'device',
            division: 'update',
            state: 'request',
        });

        dispatch(setState(stateVal));
    };

    modalClose = () => {
        const {dispatch, assetState} = this.props;
        const stateVal = ({
            type: 'device',
            division: 'update',
            state: 'confirm',
        });

        dispatch(setState(stateVal));
        dispatch(getDeviceByIdx(assetState.deviceByDeviceCode, assetState.deviceType));
        dispatch(setAssetsPage('view'));
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

        //setIpArrayTemp = setIpArrayTemp.sort((a, b) => a - b);
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
            ipArrayMap, splaArrayMap,
            AddIpComponentMax, AddSplaComponent, AddSplaComponentMax,
            IpArray, SplaArray,
        } = this.state;
        let tempContent;

        if (val === 'ip') {
            let setIpArrayTemp = new Map();
            let IpMax = 0;
            let ipArrayMapArry;

            // eslint-disable-next-line guard-for-in,no-restricted-syntax
            for (const arrData in Object.keys(ipArrayMap)) {
                // eslint-disable-next-line prefer-destructuring
                ipArrayMapArry = Object.keys(ipArrayMap)[arrData].split("_")[1];
                if (Number(ipArrayMapArry) > IpMax) {
                    IpMax = Number(ipArrayMapArry);
                }
            }

            const reName = `ip_${IpMax + 1}`;

            if (Object.keys(ipArrayMap).length < 10) {
                // eslint-disable-next-line guard-for-in,no-restricted-syntax
                for (const arrData in ipArrayMap) {
                    //console.log("arrData : ", arrData, ", value : ", ipArrayMap[arrData]);
                    setIpArrayTemp = setIpArrayTemp.set(arrData, ipArrayMap[arrData]);
                }

                setIpArrayTemp = setIpArrayTemp.set(reName, "");
                //setIpArrayTemp = setIpArrayTemp.sort((a, b) => a - b);
                setIpArrayTemp = JSON.parse(JSON.stringify(setIpArrayTemp));

                this.setState({
                    AddIpComponentMax: IpMax + 1,
                    ipArrayMap: setIpArrayTemp,
                });

                dispatch(setAddEleData('ip', setIpArrayTemp));
            }
        } else if (val === 'spla') {
            let setSplaArrayTemp = new Map();
            let SplaMax = 0;
            let splaArrayMapArry;

            // eslint-disable-next-line guard-for-in,no-restricted-syntax
            for (const arrData in Object.keys(splaArrayMap)) {
                // eslint-disable-next-line prefer-destructuring
                splaArrayMapArry = Object.keys(splaArrayMap)[arrData].split("_")[1];
                if (Number(splaArrayMapArry) > SplaMax) {
                    SplaMax = Number(splaArrayMapArry);
                }
            }

            const reName = `spla_${SplaMax + 1}`;

            console.log("Object.keys(splaArrayMap) : ", Object.keys(splaArrayMap));
            console.log("Object.keys(splaArrayMap).length : ", Object.keys(splaArrayMap).length);
            console.log("reName : ", reName);

            if (Object.keys(splaArrayMap).length < 10) {
                // eslint-disable-next-line guard-for-in,no-restricted-syntax
                for (const arrData in splaArrayMap) {
                    setSplaArrayTemp = setSplaArrayTemp.set(arrData, splaArrayMap[arrData]);
                }

                setSplaArrayTemp = setSplaArrayTemp.set(reName, "");
                setSplaArrayTemp = JSON.parse(JSON.stringify(setSplaArrayTemp));

                console.log("setSplaArrayTemp : ", setSplaArrayTemp);

                this.setState({
                    AddSplaComponentMax: SplaMax + 1,
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
            modalWarring, warringTitle, warringContents, warringClass, warringType,
        } = this.state;
        const {showPassword} = this.state;
        let deviceRawValue = new Map([]);
        let viewModalContentLeft;
        let viewModalContentRight;

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

        const classNameMap = {
            formDivClass: "form__form-group",
            formSpanClass: "form__form-group-label",
            formDivSubClass: "form__form-group-field",
        };

        const deviceValue = assetState.device[0];
        deviceRawValue = assetState.deviceOri;
        const setIpArray = [];
        const setSplaArray = [];

        /*        for (int i = 0; i < sixsu.length; i++) {
                    for (int j = i + 1; j < sixsu.length; j++) {
                        if (sixsu[i] > sixsu[j]) {
                            int tmep = sixsu[i];
                            sixsu[i] = sixsu[j];
                            sixsu[j] = tmep;
                        }
                    }
                }*/

     /*   let tempArray;

        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const arrData in ipArrayMap) {
            console.log("00render arrData : ", arrData, ", value : ", ipArrayMap[arrData]);
            //const arrDataTemp = arrData + 1;
            // eslint-disable-next-line guard-for-in,no-restricted-syntax
            for (const arrDataTemp in ipArrayMap) {
                console.log("render arrData : ", arrDataTemp, ", value : ", ipArrayMap[arrDataTemp]);
                console.log("00 : ", ipArrayMap[arrData], ", 11 : ", ipArrayMap[arrDataTemp + 1]);
                if (ipArrayMap[arrData] > ipArrayMap[arrDataTemp + 1]) {
                    tempArray = ipArrayMap[arrData];
                    ipArrayMap[arrData] = ipArrayMap[arrDataTemp + 1];
                    ipArrayMap[arrDataTemp + 1] = tempArray;
                }
            }
        }*/

       /* console.log("render ipArrayMap : ", ipArrayMap);
        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const arrData in ipArrayMap) {
            console.log("render arrData : ", arrData, ", value : ", ipArrayMap[arrData]);
        }*/

        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const arrData in ipArrayMap) {
            //console.log("render arrData : ", arrData, ", value : ", ipArrayMap[arrData]);
            if (arrData.indexOf("ip", 0) === 0) {
                setIpArray.push(
                    <Fragment key={arrData}>
                        {
                            arrData !== undefined && arrData !== "" && arrData !== "ip"
                            && (
                                <div className={classNameMap.formDivClass}>
                                    <span className={classNameMap.formSpanClass}>&nbsp;</span>
                                    <div className={classNameMap.formDivSubClass}>
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
                                <div className={classNameMap.formDivClass}>
                                    <span className={classNameMap.formSpanClass}>&nbsp;</span>
                                    <div className={classNameMap.formDivSubClass}>
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
                                </div>
                            )
                        }
                    </Fragment>,
                );
            }
        }

        switch (assetState.deviceType) {
            case 'server':
                viewModalContentLeft = (
                    <Fragment>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>CPU</span>
                            <div className={classNameMap.formDivSubClass}>
                                <Field
                                    name="cpu"
                                    component="input"
                                    type="text"
                                    className="input_col_10"
                                    placeholder="CPU"
                                />
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                                <span
                                    className={classNameMap.formSpanClass}>MEMORY</span>
                            <div className={classNameMap.formDivSubClass}>
                                <Field
                                    name="memory"
                                    component="input"
                                    type="text"
                                    className="input_col_10"
                                    placeholder="MEMORY"
                                />
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                                <span
                                    className={classNameMap.formSpanClass}>HDD</span>
                            <div className={classNameMap.formDivSubClass}>
                                <Field
                                    name="hdd"
                                    component="input"
                                    type="text"
                                    className="input_col_10"
                                    placeholder="HDD"
                                />
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>Size</span>
                            <div className={classNameMap.formDivSubClass}>
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
                    </Fragment>
                );

                viewModalContentRight = (
                    <Fragment>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>IP</span>
                            <div className={classNameMap.formDivSubClass}>
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
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>SPLA</span>
                            <div className={classNameMap.formDivSubClass}>
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
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>Rack Tag</span>
                            <div className={classNameMap.formDivSubClass}>
                                <Field
                                    name="rackTag"
                                    component="input"
                                    className="input_col_5"
                                    type="text"
                                    placeholder="Rack Tag"
                                />
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>Rack Location</span>
                            <div className={classNameMap.formDivSubClass}>
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
                viewModalContentLeft = (
                    <Fragment>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>FIRMWARE VERSION</span>
                            <div className={classNameMap.formDivSubClass}>
                                <Field
                                    name="firmwareVersion"
                                    component="input"
                                    className="input_col_5"
                                    type="text"
                                    placeholder="FIRMWARE VERSION"
                                />
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>Rack Tag</span>
                            <div className={classNameMap.formDivSubClass}>
                                <Field
                                    name="rackTag"
                                    component="input"
                                    className="input_col_5"
                                    type="text"
                                    placeholder="Rack Tag"
                                />
                            </div>
                        </div>
                    </Fragment>
                );


                viewModalContentRight = (
                    <Fragment>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>IP</span>
                            <div className={classNameMap.formDivSubClass}>
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
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>Rack Location</span>
                            <div className={classNameMap.formDivSubClass}>
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
                viewModalContentLeft = (
                    <Fragment>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>WARRANTY</span>
                            <div className={classNameMap.formDivSubClass}>
                                <Field
                                    name="warranty"
                                    component="input"
                                    className="input_col_5"
                                    type="text"
                                    placeholder="WARRANTY"
                                />
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>Rack Size</span>
                            <div className={classNameMap.formDivSubClass}>
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
            <Col md={12} lg={12}>
                <Card>
                    <CardBody>
                        <div className="card__title">
                            <h5 className="bold-text">{title}</h5>
                            <h5 className="subhead">{message}</h5>
                        </div>
                        <Form className="form form--horizontal"
                               onSubmit={handleSubmit} name="assetsEdit_form">
                            <div className="form__half">
                                <div className={classNameMap.formDivClass}>
                                    <span className={classNameMap.formSpanClass}>장비코드</span>
                                    <div className={classNameMap.formDivSubClass}>
                                        {deviceValue.deviceCode}
                                    </div>
                                </div>
                                <div className={classNameMap.formDivClass}>
                                    <span className={classNameMap.formSpanClass}>장비구분</span>
                                    <div className={classNameMap.formDivSubClass}>
                                        <Field
                                            name="deviceType"
                                            component={renderSelectCustomField}
                                            codeDivision={{
                                                code: assetState.codes.codeDeviceType,
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className={classNameMap.formDivClass}>
                                    <span className={classNameMap.formSpanClass}>고객사</span>
                                    <div className={classNameMap.formDivSubClass}>
                                        <Field
                                            name="customer"
                                            type="text"
                                            className="input_col_5"
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
                                </div>
                                <div className={classNameMap.formDivClass}>
                                    <span className={classNameMap.formSpanClass}>소유업체명</span>
                                    <div className={classNameMap.formDivSubClass}>
                                        <Field
                                            name="ownerCompany"
                                            type="text"
                                            className="input_col_5"
                                            placeholder="소유업체명"
                                            initialValues={searchOwnerCompanyId}
                                            label={{
                                                name: deviceValue.ownerCompanyName,
                                                id: deviceValue.ownerCompany,
                                            }}
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
                                </div>
                                <div className={classNameMap.formDivClass}>
                                    <span className={classNameMap.formSpanClass}>HW S/N</span>
                                    <div className={classNameMap.formDivSubClass}>
                                        <Field
                                            name="hwSn"
                                            component="input"
                                            type="text"
                                            className="input_col_10"
                                        />
                                    </div>
                                </div>
                                <div className={classNameMap.formDivClass}>
                                    <span className={classNameMap.formSpanClass}>원가</span>
                                    <div className={classNameMap.formDivSubClass}>
                                        <Field
                                            name="cost"
                                            component="input"
                                            className="input_col_5"
                                            type="number"
                                            placeholder="원가"
                                        />
                                    </div>
                                </div>
                                <div className={classNameMap.formDivClass}>
                                    <span className={classNameMap.formSpanClass}>용도</span>
                                    <div className={classNameMap.formDivSubClass}>
                                        <Field
                                            name="purpose"
                                            component="input"
                                            className="input_col_10"
                                            type="text"
                                            placeholder="용도"
                                        />
                                    </div>
                                </div>
                                {viewModalContentLeft}
                            </div>
                            <div className="form__half">
                                <div className={classNameMap.formDivClass}>
                                    <span className={classNameMap.formSpanClass}>IDC / 랙번호</span>
                                    <div className={classNameMap.formDivSubClass}>
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
                                <div className={classNameMap.formDivClass}>
                                    <span className={classNameMap.formSpanClass}>제조사 / 모델명</span>
                                    <div className={classNameMap.formDivSubClass}>
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
                                <div className={classNameMap.formDivClass}>
                                    <span className={classNameMap.formSpanClass}>소유권/소유권구분</span>
                                    <div className={classNameMap.formDivSubClass}>
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
                                </div>
                                <div className={classNameMap.formDivClass}>
                                    <span className={classNameMap.formSpanClass}>임대기간</span>
                                    <div className={classNameMap.formDivSubClass}>
                                        <Field
                                            name="rentDate"
                                            className="input_col_5"
                                            value={deviceRawValue.rentDate}
                                            component={renderIntervalDatePickerField}
                                        />
                                    </div>
                                </div>
                                <div className={classNameMap.formDivClass}>
                                    <span className={classNameMap.formSpanClass}>입고일</span>
                                    <div className={classNameMap.formDivSubClass}>
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
                                {viewModalContentRight}
                            </div>
                            <div className={classNameMap.formDivClass}>
                                <span className={classNameMap.formSpanClass}>기타사항</span>
                                <div className={classNameMap.formDivSubClass}>
                                    <Field
                                        name="contents"
                                        component="textarea"
                                    />
                                </div>
                            </div>
                            <ButtonToolbar className="modal__footer">
                                <Button className="modal_ok" color="primary" type="submit">수정</Button>
                                <Button className="modal_cancel"
                                        onClick={this.onClose}>이전</Button>
                            </ButtonToolbar>

                            <Modal
                                isOpen={modalWarring}
                                toggle={this.warringToggle}
                                modalClassName="ltr-support"
                                className={`modal-dialog-dialog ${warringClass}`}
                            >
                                <div className="modal__header">
                                    <button className="lnr lnr-cross modal__close-btn" type="button"
                                            onClick={this.warringToggle}/>
                                    <span className="lnr lnr-cross-circle modal__title-icon"/>
                                    <h4 className="text-modal  modal__title">{warringTitle}</h4>
                                </div>
                                <div className="modal__body">
                                    {warringContents}
                                    <br/>
                                    <span className="modal_form__form-group-description">
                                  수정 후 상세페이지로 이동합니다.
                                </span>
                                </div>
                                <ButtonToolbar className="modal__footer">
                                    {
                                        assetState.stateVal.state === 'request' ? (
                                            <Button className="modal_ok"
                                                    outline={warringType} color={warringType}
                                                    type="submit">Ok</Button>/*submit 안되서 보류...*/
                                        ) : (
                                            <Fragment>
                                                &nbsp;
                                            </Fragment>
                                        )
                                    }
                                    <Button className="modal_ok" outline={warringType} color={warringType}
                                            onClick={this.modalClose}>Close</Button>
                                </ButtonToolbar>
                            </Modal>
                        </Form>
                    </CardBody>
                    <Modal
                        isOpen={modal}
                        toggle={this.searchToggle}
                        className={`assets_write__modal-dialog assets_write__modal-dialog--success ${modalClass}`}
                    >
                        <div className="search_card_body">
                            <div className="assets_write__modal__header">
                                &nbsp;&nbsp;
                                <button className="lnr lnr-cross assets_write__modal__close__notitle-btn"
                                        type="button"
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
                                    <Button className="search_btn" type="submit" color="primary"
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
                </Card>
            </Col>
        );
    }
}

export default reduxForm({
    form: 'assetsEdit_form', // a unique identifier for this form
})(withTranslation('common')(AssetsEdit));
