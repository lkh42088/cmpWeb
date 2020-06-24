import React, {PureComponent, Fragment, useEffect} from 'react';
import {
    Card, CardBody, Col, Row, Container, ButtonToolbar, Button, Modal,
} from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import MagnifyIcon from "mdi-react/MagnifyIcon";
import {Field, reduxForm} from 'redux-form';
import {withTranslation} from 'react-i18next';
import {
    fetchPostsCheckCount,
    fetchPostSearchDevice, setDeviceSelected, setState,
} from "../../../../redux/actions/assetsAction";

const AssetsSearch = ({assetState}) => {
    const dispatch = useDispatch();

    const [device, setDevice] = React.useState({
        outFlag: assetState.deviceOutFlag,
        deviceCode: '',
        operatingFlag: true,
        carryingFlag: true,
    });

    const [modal, setModal] = React.useState({
        modalWarring: false,
        warringTitle: '',
        warringContents: '',
        warringClass: 'modal-dialog--danger',
        warringType: '',
    });

    //console.log("assetState .... : ", assetState.searchRd);

    const modalClose = (division) => {
        setModal({
            ...modal,
            modalWarring: !modal.modalWarring,
        });
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

    const onSearch = () => {
        const schSelect = document.getElementsByName("schSelect")[0].value;
        const schText = document.getElementsByName("schText")[0].value;
        let postArray = {};
        let postDivision;

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

    useEffect(() => {
        document.getElementsByName("schSelect")[0].value = '0';
        document.getElementsByName("schText")[0].value = '';
    }, [assetState.deviceType]);

    return (
        <Col md="12">
            <Card>
                <CardBody>
                    <Row>
                        <Col md={10} sm={12}>
                            <form>
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
                                               className="search_input"/>
                                        <MagnifyIcon className="search_icon" role="button" tabIndex="0"
                                                     onClick={onSearch}
                                                     onKeyDown={onSearch}/>
                                    </div>
                                    <div style={{paddingTop: "5px"}}>
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
                            </form>
                        </Col>
                        <Col md={2} sm={12}>
                            {/*1 : true , 0 : false */}
                            {/*0 : 반입, 1 : 반출*/}
                            <div className="search_card_body" style={{maxWidth: "100%"}}>
                                <div className="float-left">
                                    <span>
                                        <input type="checkbox" name="operatingFlag"
                                               className="search_checkbox"
                                            /*checked={device.operatingFlag}*/
                                               checked={assetState.searchRd.operatingFlag}
                                               value={device.operatingFlag}
                                               onChange={setToggleOutFlag}/>&nbsp;
                                        <span className="search_checkboxText">
                                            &nbsp;운영장비&nbsp;
                                        </span>
                                    </span>
                                    &nbsp;&nbsp;
                                    <span>
                                        <input type="checkbox" name="carryingFlag" className="search_checkbox"
                                            /*checked={device.carryingFlag}*/
                                               checked={assetState.searchRd.carryingFlag}
                                               value={device.carryingFlag}
                                               onChange={setToggleOutFlag}/>&nbsp;
                                        <span className="search_checkboxText">
                                            &nbsp;반출장비&nbsp;
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </Col>
                        <Modal
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
                                {/*<span className="modal_form__form-group-description">
                                  작성한 사용자만 수정/삭제 할 수 있습니다.
                                </span>*/}
                            </div>
                            <ButtonToolbar className="modal__footer">
                                <Button className="modal_ok" outline={modal.warringType}
                                        color={modal.warringType}
                                        onClick={modalClose}>Close</Button>
                            </ButtonToolbar>
                        </Modal>
                    </Row>
                </CardBody>
            </Card>
        </Col>
    );
};

export default reduxForm({
    form: 'vertical_form_layout_half', // a unique identifier for this form
})(withTranslation('common')(AssetsSearch));
