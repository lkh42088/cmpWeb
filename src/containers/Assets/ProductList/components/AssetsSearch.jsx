import React, {PureComponent, Fragment, useEffect} from 'react';
import {
    Card, CardBody, Col, Row, Container, ButtonToolbar, Button, Modal,
} from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from '@material-ui/core/styles';

import {Dialog} from "material-ui";
import MagnifyIcon from "mdi-react/MagnifyIcon";
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from '@material-ui/core/InputAdornment';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import InputIcon from "@material-ui/icons/Input";
import LaunchIcon from "@material-ui/icons/Launch";
import CreateIcon from "@material-ui/icons/Create";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import {deepOrange, green, pink} from '@material-ui/core/colors';
import AssignmentIcon from '@material-ui/icons/Assignment';

import {Field, reduxForm} from 'redux-form';
import classNames from "classnames";
import moment from "moment";

import {withTranslation} from 'react-i18next';
import {
    fetchPostsCheckCount, fetchPosts, setState,
    fetchPostSearchDevice, postDevice, postDeviceOutFlag, setDeviceSelected,
} from "../../../../redux/actions/assetsAction";
import AssetsWrite from "./AssetsWrite";

const useStyles = makeStyles(theme => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
        '& .MuiInputBase-root ': {
            fontSize: 12,
        },
        '& .MuiFormLabel-root ': {
            fontSize: 12,
        },
        '& .MuiInputBase-input ': {
            fontSize: 12,
        },
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
        '& .MuiInputBase-root ': {
            fontSize: 12,
        },
        '& .MuiFormLabel-root ': {
            fontSize: 12,
        },
    },
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    square: {
        backgroundColor: '#f3f3f4',
        color: 'black',
        width: 80,
        height: 30,
        fontSize: 12,
        fontWeight: 900,
    },
    rounded: {
        backgroundColor: '#f3f3f4',
        color: 'black',
        width: 80,
        height: 30,
        fontSize: 12,
        fontWeight: 900,
    },
}));

const AssetsSearch = ({assetState, user, theme}) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [device, setDevice] = React.useState({
        outFlag: assetState.deviceOutFlag,
        deviceCode: '',
        operatingFlag: assetState.searchRd.operatingFlag,
        carryingFlag: assetState.searchRd.carryingFlag,
        rentPeriod: assetState.searchRd.rentPeriod,
    });

    const [modal, setModal] = React.useState({
        modalOpenFlag: false,
        modalWarring: false,
        warringTitle: '',
        warringContents: '',
        warringClass: 'modal-dialog--danger',
        warringType: '',
        warringStyle: {
            backgroundColor: "",
        },
        warringIcon: '',
    });

    const [open, setOpen] = React.useState({
        schSelectOpen: false,
        typeOpen: false,
        ownershipOpen: false,
        ownershipDivOpen: false,
        idcOpen: false,
        manufactureOpen: false,
    });

    const [schValue, setSchValue] = React.useState({
        schSelect: assetState.searchRd.schSelect,
        schText: assetState.searchRd.schText,
        deviceType: assetState.searchRd.deviceType,
        ownership: assetState.searchRd.ownership,
        ownershipDiv: assetState.searchRd.ownershipDiv,
        idc: assetState.searchRd.idc,
        manufacture: assetState.searchRd.manufacture,
    });

    const modalClass = classNames({
        'assets_write__modal-dialog': true,
        'assets_write__modal-dialog--colored': false,
        'assets_write__modal-dialog--header': false,
    });

    const modalClose = (division) => {
        setModal({
            ...modal,
            modalWarring: !modal.modalWarring,
        });
    };

    const toggle = (e) => {
        //this.setState(prevState => ({modalOpenFlag: !prevState.modalOpenFlag}));
        setModal({
            ...modal,
            modalOpenFlag: !modal.modalOpenFlag,
        });
    };

    const toggleOutFlag = (val) => {
        let division = ',';
        let divisionCount = 0;
        let deviceCodeData = '';

        if (assetState.deviceSelected.size === undefined || assetState.deviceSelected.size === 0) {
            setModal({
                ...modal,
                modalWarring: !modal.modalWarring,
                warringTitle: '경고',
                warringContents: '선택된 장비가 없습니다.',
                warringType: 'danger',
                warringStyle: {
                    backgroundColor: "",
                },
                warringIcon: '',
            });
        } else {
            let finCheck = false;

            // eslint-disable-next-line no-shadow
            assetState.deviceSelected.forEach((value, key, map) => {
                console.log("key : ", key, ", value : ", value);
                if (value) {
                    finCheck = true;
                }
            });

            if (finCheck) {
                // eslint-disable-next-line no-shadow
                assetState.deviceSelected.forEach((value, key, map) => {
                    if (value === true) {
                        if (divisionCount <= 0) {
                            division = '';
                        } else {
                            division = ',';
                        }
                        divisionCount += 1;
                        deviceCodeData = `${deviceCodeData}${division}${key}`;
                    }
                });

                //todo user setting
                const submitData = ({
                    userId: user.id,
                    outFlag: val,
                    deviceCode: deviceCodeData,
                });

                dispatch(postDeviceOutFlag(assetState, submitData, 'list'));
            } else {
                setModal({
                    ...modal,
                    modalWarring: !modal.modalWarring,
                    warringTitle: '경고',
                    warringContents: '선택된 장비가 없습니다.',
                    warringType: 'danger',
                    warringStyle: {
                        backgroundColor: "",
                    },
                    warringIcon: '',
                });
            }
        }
    };

    const componentOperatinng = (
        <Avatar variant="rounded" className={classes.square} role="button" tabIndex="0"
                onClick={event => toggleOutFlag("1")}
                onKeyDown={event => toggleOutFlag("1")}>
            <LaunchIcon fontSize="small"
                        style={{
                            color: "#596e79",
                        }}/>&nbsp;반출
        </Avatar>
    );

    const componentCarrying = (
        <Avatar variant="rounded" className={classes.square} role="button" tabIndex="0"
                onClick={event => toggleOutFlag("0")}
                onKeyDown={event => toggleOutFlag("0")}>
            <LaunchIcon fontSize="small"
                        style={{
                            color: "#596e79",
                        }}/>&nbsp;반입
        </Avatar>
    );
/*

        <span role="button" tabIndex="0"
              onClick={event => toggleOutFlag("1")}
              onKeyDown={event => toggleOutFlag("1")}>
                    <InputIcon fontSize="small"/>&nbsp;
            반출
            </span>
    <span role="button" tabIndex="0"
          onClick={event => toggleOutFlag("0")}
          onKeyDown={event => toggleOutFlag("0")}>
                <LaunchIcon fontSize="small"/>&nbsp;
        반입
            </span>*/

    const renderSwitch = () => {
        let viewComponentOutFlag;
        let finCheck = false;

        if (assetState.deviceSelected.size !== undefined || assetState.deviceSelected.size > 0) {
            // eslint-disable-next-line no-shadow
            assetState.deviceSelected.forEach((value, key, map) => {
                if (value) {
                    finCheck = true;
                }
            });
        }

        if (assetState.searchRd.operatingFlag === true && assetState.searchRd.carryingFlag === true) {
            viewComponentOutFlag = (
                <Fragment>
                    &nbsp;
                </Fragment>
            );
        } else if (assetState.searchRd.operatingFlag === true && assetState.searchRd.carryingFlag === false) {
            if (finCheck) {
                viewComponentOutFlag = (
                    <Fragment>
                        {componentOperatinng}
                    </Fragment>
                );
            }
        } else if (assetState.searchRd.operatingFlag === false && assetState.searchRd.carryingFlag === true) {
            if (finCheck) {
                viewComponentOutFlag = (
                    <Fragment>
                        {componentCarrying}
                    </Fragment>
                );
            }
        } else if (assetState.searchRd.operatingFlag === false && assetState.searchRd.carryingFlag === false) {
            viewComponentOutFlag = "";
        }

        return viewComponentOutFlag;
    };

    const handleSubmit = (values) => {
        let division = '|';
        let divisionCount = 0;
        let IpArray = '';
        let SplaArray = '';
        let rentDataStart;
        let rentDataEnd;
        let rentData = '|';
        let warehousingDate = '';

        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const arrData in assetState.deviceIp) {
            if (assetState.deviceIp[arrData] !== '') {
                if (divisionCount <= 0) {
                    division = '';
                } else {
                    division = '|';
                }

                divisionCount += 1;
                IpArray = `${IpArray}${division}${assetState.deviceIp[arrData]}`;
            }
        }

        divisionCount = 0;
        IpArray = `${IpArray}|`;

        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const arrData in assetState.deviceSpla) {
            if (assetState.deviceSpla[arrData] !== '') {
                if (divisionCount <= 0) {
                    division = '';
                } else {
                    division = '|';
                }

                divisionCount += 1;
                SplaArray = `${SplaArray}${division}${assetState.deviceSpla[arrData]}`;
            }
        }

        SplaArray = `${SplaArray}|`;

        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const arrData in values) {
            if (arrData.indexOf("rentDate") !== -1) {
                if (values[arrData].start !== null && values[arrData].start !== undefined) {
                    rentDataStart = moment(values[arrData].start)
                        .format("YYYYMMDD");
                } else {
                    rentDataStart = null;
                }

                if (rentDataStart !== null) {
                    if (values[arrData].end !== null) {
                        rentDataEnd = `|${moment(values[arrData].end)
                            .format("YYYYMMDD")}`;
                    } else {
                        rentDataEnd = "|";
                    }
                    rentData = `${rentDataStart}${rentDataEnd}`;
                } else {
                    rentData = "|";
                }
            } else if (arrData.indexOf("warehousingDate") !== -1) {
                warehousingDate = moment(values[arrData])
                    .format("YYYYMMDD");
            }
        }

        let rackLoc;

        if (values.rackLoc !== undefined) {
            rackLoc = values.rackLoc.toString();
        } else {
            rackLoc = "0";
        }

        const submitData = ({
            outFlag: '',
            commentCnt: '',
            commentLastDate: '',
            registerId: user.id,
            registerDate: '',
            model: values.model,
            manufacture: values.manufacture,
            contents: values.contents,
            customer: values.customer,
            deviceType: values.deviceType,
            ownership: values.ownership,
            ownershipDiv: values.ownershipDiv,
            ownerCompany: values.ownerCompany,
            hwSn: values.hwSn,
            idc: values.idc,
            rack: values.rack,
            cost: values.cost,
            purpose: values.purpose,
            size: values.size,
            cpu: values.cpu,
            memory: values.memory,
            hdd: values.hdd,
            rackTag: values.rackTag,
            rackLoc,
            ip: IpArray,
            spla: SplaArray,
            rentDate: rentData,
            warehousingDate,
            monitoringFlag: '',
            monitoringMethod: '',
            rackCode: values.rackCode,
            firmwareVersion: values.firmwareVersion,
            warranty: values.warranty,
        });

        console.log("TOP 🙊🙊🙊 가공 전 : ", values);
        console.log("TOP 🙊🙊🙊 가공 후: ", submitData);
        dispatch(postDevice('create', assetState, submitData, 'list'));
        toggle(); // modal close
    };

    const onChangeSchText = (e) => {
        console.log("e.... : ", e);
        setSchValue({
            ...schValue,
            [e.target.name]: e.target.value,
        });
    };

    const onChangeCode = (e) => {
        let postArray = {};
        postArray[e.target.name] = e.target.value;
        postArray = ({
            ...device,
            ...schValue,
            [e.target.name]: e.target.value,
        });

        if (schValue.schText !== undefined || schValue.schText !== '') {
            postArray[schValue.schSelect] = schValue.schText;
        }

        setDevice({
            ...device,
            [e.target.name]: e.target.value,
        });

        setSchValue({
            ...schValue,
            [e.target.name]: e.target.value,
        });

        console.log("🙉🙉🙉 postArray : ", postArray);

        dispatch(setDeviceSelected(''));
        dispatch(fetchPostSearchDevice(assetState, postArray));
    };

    const onChangeSelect = (e) => {
        if (e.target.value !== "0") {
            setDevice({
                ...device,
                [e.target.value]: document.getElementsByName("schText")[0].value,
            });

            setSchValue({
                ...schValue,
                schSelect: e.target.value,
            });
        }
    };

    const onSearch = (e) => {
        const schSelect = document.getElementsByName("schSelect")[0].value;
        const schText = document.getElementsByName("schText")[0].value;
        let postArray = {};
        let postDivision;

        if (schSelect === 'customer') {
            postDivision = 'deviceCode';
        } else if (schSelect === 'deviceCode') {
            postDivision = 'customer';
        }

        if (schSelect === "0" || schSelect === "") {
            setModal({
                ...modal,
                modalWarring: !modal.modalWarring,
                warringTitle: '경고',
                warringContents: '검색하실 콤보 박스를 선택해 주세요.',
                warringType: 'danger',
                warringStyle: {
                    backgroundColor: "",
                },
                warringIcon: '',
            });
        } else {
            postArray[schSelect] = schText;

            setDevice({
                ...device,
                [schSelect]: schText,
                [postDivision]: '',
                schText,
            });

            postArray = ({
                ...device,
                [schSelect]: schText,
                [postDivision]: '',
                schText,
                schSelect: schValue.schSelect,
            });

            dispatch(setDeviceSelected(''));
            dispatch(fetchPostSearchDevice(assetState, postArray));
        }
    };

    const setToggleFlag = (e) => {
        let postArray = {};

        postArray[e.target.name] = e.target.checked;

        setDevice({
            ...device,
            [e.target.name]: e.target.checked,
        });

        postArray = ({
            ...device,
            [e.target.name]: e.target.checked,
        });

        dispatch(setDeviceSelected(''));
        dispatch(fetchPostSearchDevice(assetState, postArray));
    };

    const setToggleFlagText = (val) => {
        let postArray = {};

        switch (val) {
            case "1": // 운영장비 선택
                postArray.operatingFlag = !device.operatingFlag;

                setDevice({
                    ...device,
                    operatingFlag: !device.operatingFlag,
                });

                postArray = ({
                    ...device,
                    operatingFlag: !device.operatingFlag,
                });
                break;
            case "0": // 반출장비 선택
                postArray.carryingFlag = !device.carryingFlag;

                setDevice({
                    ...device,
                    carryingFlag: !device.carryingFlag,
                });

                postArray = ({
                    ...device,
                    carryingFlag: !device.carryingFlag,
                });
                break;
            case "2": // 한달이내 임대기간 종료하는 장비 검색
                /*const today = new Date();
                const period = moment(today).add(1, 'M').format("YYYYMMDD");*/
                postArray.rentPeriod = !device.rentPeriod;

                setDevice({
                    ...device,
                    rentPeriod: !device.rentPeriod,
                });

                postArray = ({
                    ...device,
                    rentPeriod: !device.rentPeriod,
                });
                break;
            default:
                break;
        }

        dispatch(setDeviceSelected(''));
        dispatch(fetchPostSearchDevice(assetState, postArray));
    };

    const schHandleClose = (txt) => {
        setOpen({
            ...open,
            [txt]: false,
        });
    };

    const schHandleOpen = (txt) => {
        setOpen({
            ...open,
            [txt]: true,
        });
    };

    /*useEffect(() => {
        console.log("😗😗😗😗😗😗😗 test useEffect... : ", assetState.searchRd);
        setSchValue({
            ...schValue,
            schSelect: assetState.searchRd.schSelect,
            schText: assetState.searchRd.schText,
            deviceType: assetState.searchRd.deviceType,
            ownership: assetState.searchRd.ownership,
            ownershipDiv: assetState.searchRd.ownershipDiv,
            idc: assetState.searchRd.idc,
            manufacture: assetState.searchRd.manufacture,
        });
    }, []);*/

    /*useEffect(() => {
        document.getElementsByName("schSelect")[0].value = '0';
        document.getElementsByName("schText")[0].value = '';
    }, [assetState.deviceType]);*/

    useEffect(() => {
        renderSwitch();
    }, [assetState.deviceSelected]);

    useEffect(() => {
        if (assetState.stateVal.division === 'outFlag') {
            if (assetState.stateVal.state === "error") {
                setModal({
                    ...modal,
                    modalWarring: !modal.modalWarring,
                    warringTitle: '경고',
                    warringContents: '요청하신 작업에 실패하였습니다.',
                    warringType: 'danger',
                    warringStyle: {
                        backgroundColor: "",
                    },
                    warringIcon: '',
                });
            } else if (assetState.stateVal.state === "success") {
                setModal({
                    ...modal,
                    modalWarring: !modal.modalWarring,
                    warringTitle: '경고',
                    warringContents: '요청하신 작업에 성공하였습니다.',
                    warringType: 'modal-dialog--primary',
                    warringStyle: {
                        backgroundColor: "#43a047",
                    },
                    warringIcon: <CheckCircleIcon/>,
                });

                dispatch(setDeviceSelected(''));
                dispatch(fetchPostSearchDevice(assetState, device));
            } else {
                setModal({
                    ...modal,
                    modalWarring: false,
                    warringTitle: '경고',
                    warringContents: '',
                    warringType: 'danger',
                    warringStyle: {
                        backgroundColor: "",
                    },
                    warringIcon: '',
                });
            }
        }
    }, [assetState.stateVal]);

    return (
        <Card className="cb-card">
            <CardBody className="cb-card-body">
                <Row>
                    <Col sm={12} md={12} xs={12} xl={12} lg={12}>
                        {/*<Col mb={8}>*/}
                        <div className="search_card_body" style={{maxWidth: "100%"}}>
                            <div>

                                {/*<MagnifyIcon className="search_icon" role="button" tabIndex="0"
                                             onClick={onSearch}
                                             onKeyDown={onSearch}/>
                                &nbsp;&nbsp;*/}
                                {
                                    assetState.codes.codeDeviceType !== undefined ? (
                                        <Fragment>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel id="type-select-label">장비구분</InputLabel>
                                                <Select
                                                    labelId="type-select-label"
                                                    open={open.typeOpen}
                                                    onClose={event => schHandleClose('typeOpen')}
                                                    onOpen={event => schHandleOpen('typeOpen')}
                                                    value={schValue.deviceType || ''}
                                                    onChange={onChangeCode}
                                                    name="deviceType">
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {
                                                        assetState.codes.codeDeviceType.map((d, index) => (
                                                            <MenuItem key={d.codeId.toString()}
                                                                      value={d.codeId.toString()}>{d.name}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel id="ownership-select-label">소유권</InputLabel>
                                                <Select
                                                    labelId="ownership-select-label"
                                                    open={open.ownershipOpen}
                                                    onClose={event => schHandleClose('ownershipOpen')}
                                                    onOpen={event => schHandleOpen('ownershipOpen')}
                                                    value={schValue.ownership || ''}
                                                    onChange={onChangeCode}
                                                    name="ownership">
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {
                                                        assetState.codes.codeOwnership.map((d, index) => (
                                                            <MenuItem key={d.codeId.toString()}
                                                                      value={d.codeId.toString()}>{d.name}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel id="ownershipDiv-select-label">소유권구분</InputLabel>
                                                <Select
                                                    labelId="ownershipDiv-select-label"
                                                    open={open.ownershipDivOpen}
                                                    onClose={event => schHandleClose('ownershipDivOpen')}
                                                    onOpen={event => schHandleOpen('ownershipDivOpen')}
                                                    value={schValue.ownershipDiv || ''}
                                                    onChange={onChangeCode}
                                                    name="ownershipDiv">
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {
                                                        assetState.codes.codeOwnershipDiv.map((d, index) => (
                                                            <MenuItem key={d.codeId.toString()}
                                                                      value={d.codeId.toString()}>{d.name}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel id="idc-select-label">IDC</InputLabel>
                                                <Select
                                                    labelId="idc-select-label"
                                                    open={open.idcOpen}
                                                    onClose={event => schHandleClose('idcOpen')}
                                                    onOpen={event => schHandleOpen('idcOpen')}
                                                    value={schValue.idc || ''}
                                                    onChange={onChangeCode}
                                                    name="idc">
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {
                                                        assetState.codes.codeIdc.map((d, index) => (
                                                            <MenuItem key={d.codeId.toString()}
                                                                      value={d.codeId.toString()}>{d.name}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel id="manufacture-select-label">제조사</InputLabel>
                                                <Select
                                                    labelId="manufacture-select-label"
                                                    open={open.manufactureOpen}
                                                    onClose={event => schHandleClose('manufactureOpen')}
                                                    onOpen={event => schHandleOpen('manufactureOpen')}
                                                    value={schValue.manufacture || ''}
                                                    onChange={onChangeCode}
                                                    name="manufacture">
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {
                                                        assetState.codes.codeManufacture.map((d, index) => (
                                                            <MenuItem key={d.codeId.toString()}
                                                                      value={d.codeId.toString()}>{d.name}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                            {/*<TextField
                                                label="text"
                                                id="margin-dense"
                                                style={{ margin: 11 }}
                                                className={classes.textField}
                                                helperText=""
                                                margin="dense"
                                                name="schText"
                                                onKeyDown={(event) => {
                                                    if (event.keyCode === 13) {
                                                        onSearch();
                                                    }
                                                }}
                                                value={schValue.schText || ''}
                                                onChange={e => onChangeSchText(e)}
                                            />*/}
                                            {/*<MagnifyIcon className="search_icon" role="button" tabIndex="0"
                                                         onClick={onSearch}
                                                         onKeyDown={onSearch}/>
                                            &nbsp;&nbsp;*/}

                                            <FormControl className={classes.formControl}>
                                                <InputLabel id="text-select-label">select</InputLabel>
                                                <Select
                                                    labelId="text-select-label"
                                                    open={open.schSelectOpen}
                                                    onClose={event => schHandleClose('schSelectOpen')}
                                                    onOpen={event => schHandleOpen('schSelectOpen')}
                                                    onChange={onChangeSelect}
                                                    name="schSelect"
                                                    value={schValue.schSelect || ''}>
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem value="deviceCode">장비코드</MenuItem>
                                                    <MenuItem value="customer">고객사</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <TextField
                                                id="input-with-icon-textfield"
                                                label="TextField"
                                                name="schText"
                                                style={{margin: 8}}
                                                className={classes.textField}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="start">
                                                            <MagnifyIcon className="search_icon"
                                                                         role="button"
                                                                         tabIndex="0"
                                                                         fontSize="small"
                                                                         onClick={onSearch}
                                                                         onKeyDown={onSearch}/>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            <div className="search_card_body_checkbox">
                                                <input type="checkbox" name="operatingFlag"
                                                       className="search_checkbox"
                                                       checked={assetState.searchRd.operatingFlag}
                                                       value={device.operatingFlag}
                                                       onChange={setToggleFlag}/>&nbsp;
                                                <label htmlFor="operatingFlag" className="search_checkboxText">
                                                    <span
                                                        role="button" tabIndex="0"
                                                        onClick={event => setToggleFlagText('1')}
                                                        onKeyDown={event => setToggleFlagText('1')}>
                                                        운영장비&nbsp;</span>
                                                </label>
                                                &nbsp;&nbsp;&nbsp;<br/>
                                                <input type="checkbox" name="carryingFlag" className="search_checkbox"
                                                       checked={assetState.searchRd.carryingFlag}
                                                       value={device.carryingFlag}
                                                       onChange={setToggleFlag}/>&nbsp;
                                                <label htmlFor="carryingFlag" className="search_checkboxText">
                                                    <span
                                                        role="button" tabIndex="0"
                                                        onClick={event => setToggleFlagText('0')}
                                                        onKeyDown={event => setToggleFlagText('0')}>
                                                        반출장비&nbsp;</span>
                                                </label>
                                                &nbsp;&nbsp;&nbsp;<br/>
                                                <input type="checkbox" name="rentPeriod" className="search_checkbox"
                                                       checked={assetState.searchRd.rentPeriod}
                                                       value={device.rentPeriod}
                                                       onChange={setToggleFlag}/>&nbsp;
                                                <label htmlFor="rentPeriod" className="search_checkboxText">
                                                    <span
                                                        role="button" tabIndex="0"
                                                        onClick={event => setToggleFlagText('2')}
                                                        onKeyDown={event => setToggleFlagText('2')}>
                                                        임대 만료예정 (한달기준)&nbsp;</span>
                                                </label>
                                            </div>
                                            {/*<Grid container alignItems="flex-end">
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="text-select-label">select</InputLabel>
                                                    <Select
                                                        labelId="text-select-label"
                                                        open={open.schSelectOpen}
                                                        onClose={event => schHandleClose('schSelectOpen')}
                                                        onOpen={event => schHandleOpen('schSelectOpen')}
                                                        onChange={onChangeSelect}
                                                        name="schSelect"
                                                        value={schValue.schSelect || ''}>
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value="deviceCode">장비코드</MenuItem>
                                                        <MenuItem value="customer">고객사</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <Grid item>
                                                    <TextField
                                                        className={classes.textField}
                                                        style={{ margin: 8 }}
                                                        id="input-with-icon-grid"
                                                        label="text"
                                                        name="schText"
                                                        onKeyDown={(event) => {
                                                            if (event.keyCode === 13) {
                                                                onSearch();
                                                            }
                                                        }}
                                                        value={schValue.schText || ''}
                                                        onChange={e => onChangeSchText(e)}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <MagnifyIcon className="search_icon"
                                                                 style={{marginBottom: "10px"}}
                                                                 role="button"
                                                                 tabIndex="0"
                                                                 onClick={onSearch}
                                                                 onKeyDown={onSearch}/>
                                                </Grid>
                                            </Grid>*/}
                                            <div className="search_card_body_sub">
                                                {/*<input type="checkbox" name="operatingFlag"
                                                       className="search_checkbox"
                                                       checked={assetState.searchRd.operatingFlag}
                                                       value={device.operatingFlag}
                                                       onChange={setToggleFlag}/>&nbsp;
                                                <label htmlFor="operatingFlag" className="search_checkboxText">
                                                <span
                                                    role="button" tabIndex="0"
                                                    onClick={event => setToggleFlagText('1')}
                                                    onKeyDown={event => setToggleFlagText('1')}>
                                                    운영장비&nbsp;</span>
                                                </label>
                                                &nbsp;&nbsp;&nbsp;
                                                <input type="checkbox" name="carryingFlag" className="search_checkbox"
                                                       checked={assetState.searchRd.carryingFlag}
                                                       value={device.carryingFlag}
                                                       onChange={setToggleFlag}/>&nbsp;
                                                <label htmlFor="carryingFlag" className="search_checkboxText">
                                                <span
                                                    role="button" tabIndex="0"
                                                    onClick={event => setToggleFlagText('0')}
                                                    onKeyDown={event => setToggleFlagText('0')}>
                                                    반출장비&nbsp;</span>
                                                </label>
                                                &nbsp;&nbsp;&nbsp;
                                                <input type="checkbox" name="rentPeriod" className="search_checkbox"
                                                       checked={assetState.searchRd.rentPeriod}
                                                       value={device.rentPeriod}
                                                       onChange={setToggleFlag}/>&nbsp;
                                                <label htmlFor="rentPeriod" className="search_checkboxText">
                                                <span
                                                    role="button" tabIndex="0"
                                                    onClick={event => setToggleFlagText('2')}
                                                    onKeyDown={event => setToggleFlagText('2')}>
                                                    임대 만료예정 (한달기준)&nbsp;</span>
                                                </label>*/}
                                                <div className={classes.root}>
                                                    <Avatar variant="rounded" className={classes.rounded}
                                                            role="button" tabIndex="0"
                                                            onClick={toggle} onKeyDown={toggle}>
                                                        <CreateIcon fontSize="small"
                                                                    style={{
                                                                        color: "#3f51b5",
                                                                    }}
                                                        />&nbsp;장비 등록
                                                    </Avatar>
                                                    {renderSwitch()}
                                                </div>
                                                {/*<span role="button" tabIndex="0"
                                                      onClick={toggle} onKeyDown={toggle}>
                                                        <CreateIcon/>&nbsp;장비 등록&nbsp;&nbsp;</span>*/}
                                                {/*<ButtonToolbar>
                                                    <div className="search_btn-text">
                                                        <span role="button" tabIndex="0"
                                                          onClick={toggle} onKeyDown={toggle}>
                                                        <CreateIcon fontSize="small"/>&nbsp;장비 등록&nbsp;&nbsp;</span>
                                                        {renderSwitch()}
                                                    </div>
                                                </ButtonToolbar>*/}
                                            </div>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            -
                                        </Fragment>
                                    )
                                }
                            </div>
                        </div>
                    </Col>
                    <Modal
                        isOpen={modal.modalOpenFlag}
                        modalClassName={theme.className === 'theme-dark' ? (
                            "ltr-support modal-class_dark"
                        ) : (
                            "ltr-support modal-class_light"
                        )}
                        className={`${modalClass}`}>
                        <AssetsWrite closeToggle={toggle} assetState={assetState} dispatch={dispatch}
                                     onSubmit={handleSubmit}
                                     theme={theme}/>
                    </Modal>
                    {/*<Modal
                        isOpen={modal.modalWarring}
                        toggle={modalClose}
                        modalClassName="ltr-support"
                        className={`modal-dialog-dialog ${modal.warringClass}`}
                    >
                        <div className="modal__header">
                            <button className="lnr lnr-cross modal__close-btn" type="button"
                                    onClick={modalClose}/>
                            <span className="lnr lnr-cross-circle modal__title-icon"/>
                            <h4 className="text-modal  modal__title">{modal.warringTitle}</h4>
                        </div>
                        <div className="modal__body">
                            {modal.warringContents}
                            <br/>
                        </div>
                        <ButtonToolbar className="modal__footer">
                            <Button className="modal_ok" outline={modal.warringType}
                                    color={modal.warringType}
                                    onClick={modalClose}>Close</Button>
                        </ButtonToolbar>
                    </Modal>*/}
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={modal.modalWarring}
                        autoHideDuration={3000}
                        onClose={modalClose}
                    >
                        <SnackbarContent
                            /*message={`${warringIcon} ${warringContents}`}*/
                            style={modal.warringStyle}
                            message={(
                                <span id="client-snackbar" style={{lineHeight: "2"}}>
                                    {modal.warringIcon}&nbsp;{modal.warringContents}
                                 </span>
                            )}
                        />
                    </Snackbar>
                </Row>
            </CardBody>
        </Card>
    );
};

export default reduxForm({
    form: 'vertical_form_layout_half', // a unique identifier for this form
})(withTranslation('common')(AssetsSearch));
