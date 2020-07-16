import React, {PureComponent, Fragment, useEffect} from 'react';
import {
    Card, CardBody, Col, Row, Container, ButtonToolbar, Button, Modal,
} from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";

import {Dialog} from "material-ui";
import MagnifyIcon from "mdi-react/MagnifyIcon";
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import InputIcon from "@material-ui/icons/Input";
import LaunchIcon from "@material-ui/icons/Launch";
import CreateIcon from "@material-ui/icons/Create";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

import {Field, reduxForm} from 'redux-form';
import classNames from "classnames";
import moment from "moment";

import {withTranslation} from 'react-i18next';
import {
    fetchPostsCheckCount, fetchPosts,
    fetchPostSearchDevice, postDevice, postDeviceOutFlag, setDeviceSelected, setState,
} from "../../../../redux/actions/assetsAction";
import AssetsWrite from "./AssetsWrite";

const AssetsSearch = ({assetState, user, theme}) => {
    const dispatch = useDispatch();

    const [device, setDevice] = React.useState({
        outFlag: assetState.deviceOutFlag,
        deviceCode: '',
        operatingFlag: true,
        carryingFlag: false,
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

    const modalClass = classNames({
        'assets_write__modal-dialog': true,
        'assets_write__modal-dialog--colored': false,
        'assets_write__modal-dialog--header': false,
    });

    //console.log("assetState .... : ", assetState.searchRd);

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

    const warringToggle = (e) => {
        const stateVal = ({
            page: 'list',
            type: 'device',
            division: 'outFlag',
            state: 'confirm',
        });

        dispatch(setState(stateVal));
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

            /*const stateVal = ({
                type: 'device',
                division: 'outFlag',
                state: 'empty',
            });

            dispatch(setState(stateVal));*/
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

                //console.log("submitData : ", submitData);
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
        <span role="button" tabIndex="0"
              onClick={event => toggleOutFlag("1")}
              onKeyDown={event => toggleOutFlag("1")}>
                    <InputIcon fontSize="small"/>&nbsp;
            반출
            </span>
    );

    const componentCarrying = (
        <span role="button" tabIndex="0"
              onClick={event => toggleOutFlag("0")}
              onKeyDown={event => toggleOutFlag("0")}>
                <LaunchIcon fontSize="small"/>&nbsp;
            반입
            </span>
    );

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
            /*viewComponentOutFlag = (
                <Fragment>
                    {componentOperatinng}
                </Fragment>
            );*/
        } else if (assetState.searchRd.operatingFlag === false && assetState.searchRd.carryingFlag === true) {
            /*viewComponentOutFlag = (
                <Fragment>
                    {componentCarrying}
                </Fragment>
            );*/
            if (finCheck) {
                viewComponentOutFlag = (
                    <Fragment>
                        {componentCarrying}
                    </Fragment>
                );
            }
            /*if (assetState.deviceSelected.size !== undefined || assetState.deviceSelected.size > 0) {
                viewComponentOutFlag = (
                    <Fragment>
                        {componentCarrying}
                    </Fragment>
                );
            }*/
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

    const onChangeCode = (e) => {
        let postArray = {};
        postArray[e.target.name] = e.target.value;
        postArray = ({
            ...device,
            [e.target.name]: e.target.value,
        });

        setDevice({
            ...device,
            [e.target.name]: e.target.value,
        });

        dispatch(setDeviceSelected(''));
        dispatch(fetchPostSearchDevice(assetState, postArray));
    };

    const onChangeSelect = (e) => {
        if (e.target.value !== "0") {
            setDevice({
                ...device,
                [e.target.value]: document.getElementsByName("schText")[0].value,
            });
        }
    };

    const onSearch = (e) => {
        const schSelect = document.getElementsByName("schSelect")[0].value;
        const schText = document.getElementsByName("schText")[0].value;
        let postArray = {};
        let postDivision;

        /*        console.log("onSearch : ", e);

                e.preventDefault();*/

        if (schSelect === 'customer') {
            postDivision = 'deviceCode';
        } else if (schSelect === 'deviceCode') {
            postDivision = 'customer';
        }

        if (schSelect === "0") {
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
            });

            dispatch(setDeviceSelected(''));
            dispatch(fetchPostSearchDevice(assetState, postArray));
        }
    };

    const setToggleOutFlag = (e) => {
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

    const setToggleOutFlagText = (val) => {
        let postArray = {};
        if (val === "1") { // 운영장비 클릭
            postArray.operatingFlag = !device.operatingFlag;

            setDevice({
                ...device,
                operatingFlag: !device.operatingFlag,
            });

            postArray = ({
                ...device,
                operatingFlag: !device.operatingFlag,
            });
        } else { // 반출장비 클릭
            postArray.carryingFlag = !device.carryingFlag;

            setDevice({
                ...device,
                carryingFlag: !device.carryingFlag,
            });

            postArray = ({
                ...device,
                carryingFlag: !device.carryingFlag,
            });
        }

        dispatch(setDeviceSelected(''));
        dispatch(fetchPostSearchDevice(assetState, postArray));
    };

    useEffect(() => {
        document.getElementsByName("schSelect")[0].value = '0';
        document.getElementsByName("schText")[0].value = '';
    }, [assetState.deviceType]);

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
                <Row style={{padding: 10}}>
                    <Col sm={8} md={8} xs={8} xl={8} lg={8}>
                        {/*<Col mb={8}>*/}
                        <div className="search_card_body" style={{maxWidth: "100%"}}>
                            <div>
                                <select name="schSelect" className="search_select"
                                        onChange={onChangeSelect}>
                                    <option value="0">:: SELECT ::</option>
                                    <option value="deviceCode">장비코드</option>
                                    <option value="customer">고객사</option>
                                </select>
                                &nbsp;&nbsp;
                                <input placeholder="Search..." name="schText"
                                       className="search_input"
                                       onKeyDown={(event) => {
                                           if (event.keyCode === 13) {
                                               onSearch();
                                           }
                                       }}
                                />
                                <MagnifyIcon className="search_icon" role="button" tabIndex="0"
                                             onClick={onSearch}
                                             onKeyDown={onSearch}/>
                                &nbsp;&nbsp;
                                {
                                    assetState.codes.codeDeviceType !== undefined ? (
                                        <Fragment>
                                            <select name="ownership" className="search_select"
                                                    onChange={onChangeCode}
                                                    value={assetState.searchRd.ownership}>
                                                <option value="0">:: 소유권 ::</option>
                                                {
                                                    assetState.codes.codeOwnership.map((d, index) => (
                                                        <option key={d.codeId.toString()}
                                                                value={d.codeId}>{d.name}</option>
                                                    ))}
                                            </select>
                                            &nbsp;&nbsp;
                                            <select name="ownershipDiv" className="search_select"
                                                    onChange={onChangeCode}
                                                    value={assetState.searchRd.ownershipDiv}>
                                                <option value="0">:: 소유권구분 ::</option>
                                                {
                                                    assetState.codes.codeOwnershipDiv.map((d, index) => (
                                                        <option key={d.codeId.toString()}
                                                                value={d.codeId}>{d.name}</option>
                                                    ))}
                                            </select>
                                            &nbsp;&nbsp;
                                            <select name="idc" className="search_select"
                                                    onChange={onChangeCode}
                                                    value={assetState.searchRd.idc}>
                                                <option value="0">:: IDC ::</option>
                                                {
                                                    assetState.codes.codeIdc.map((d, index) => (
                                                        <option key={d.codeId.toString()}
                                                                value={d.codeId}>{d.name}</option>
                                                    ))}
                                            </select>
                                            &nbsp;&nbsp;
                                            <select name="manufacture" className="search_select"
                                                    onChange={onChangeCode}
                                                    value={assetState.searchRd.manufacture}>
                                                <option value="0">:: 제조사 ::</option>
                                                {
                                                    assetState.codes.codeManufacture.map((d, index) => (
                                                        <option key={d.codeId.toString()}
                                                                value={d.codeId}>{d.name}</option>
                                                    ))}
                                            </select>
                                            &nbsp;&nbsp;
                                            <select name="deviceType" className="search_select"
                                                    onChange={onChangeCode}
                                                    value={assetState.searchRd.deviceType}>
                                                <option value="0">:: 장비구분 ::</option>
                                                {
                                                    assetState.codes.codeDeviceType.map((d, index) => (
                                                        <option key={d.codeId.toString()}
                                                                value={d.codeId}>{d.name}</option>
                                                    ))}
                                            </select>
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
                    {/*<Col sm={12} md={12} xs={12} xl={12} lg={12}>*/}
                    <Col sm={4} md={4} xs={4} xl={4} lg={4}>
                        {/*1 : true , 0 : false */}
                        {/*0 : 반입, 1 : 반출*/}
                        <div className="search_card_body"
                             style={{float: "right"}}>
                            <input type="checkbox" name="operatingFlag"
                                   className="search_checkbox"
                                /*checked={device.operatingFlag}*/
                                   checked={assetState.searchRd.operatingFlag}
                                   value={device.operatingFlag}
                                   onChange={setToggleOutFlag}/>&nbsp;
                            <label htmlFor="operatingFlag" className="search_checkboxText">
                                <span
                                    role="button" tabIndex="0"
                                    onClick={event => setToggleOutFlagText('1')}
                                    onKeyDown={event => setToggleOutFlagText('1')}>
                                    운영장비&nbsp;</span>
                            </label>
                            &nbsp;&nbsp;&nbsp;
                            <input type="checkbox" name="carryingFlag" className="search_checkbox"
                                /*checked={device.carryingFlag}*/
                                   checked={assetState.searchRd.carryingFlag}
                                   value={device.carryingFlag}
                                   onChange={setToggleOutFlag}/>&nbsp;
                            <label htmlFor="carryingFlag" className="search_checkboxText">
                                <span
                                    role="button" tabIndex="0"
                                    onClick={event => setToggleOutFlagText('0')}
                                    onKeyDown={event => setToggleOutFlagText('0')}>
                                    반출장비&nbsp;</span>
                            </label>
                            <ButtonToolbar>
                                <div className="search_btn-text">
                                    <span role="button" tabIndex="0"
                                          onClick={toggle} onKeyDown={toggle}>
                                        <CreateIcon fontSize="small"/>&nbsp;장비 등록&nbsp;&nbsp;</span>
                                    {renderSwitch()}
                                </div>
                            </ButtonToolbar>
                            <ButtonToolbar>
                                <div className="search_btn-text">
                                    <span
                                        role="button" tabIndex="0"
                                        onClick={event => setToggleOutFlagText('1')}
                                        onKeyDown={event => setToggleOutFlagText('1')}>
                                                        &nbsp;<InsertInvitationIcon/>&nbsp;한달 기간 검색[개발중]</span>
                                </div>
                            </ButtonToolbar>
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
                        </div>
                    </Col>
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
