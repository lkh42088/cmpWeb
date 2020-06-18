import React, {PureComponent, Fragment, useEffect} from 'react';
import {
    Card, CardBody, Col, Row, Container,
} from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import MagnifyIcon from "mdi-react/MagnifyIcon";
import {Field, reduxForm} from 'redux-form';
import {withTranslation} from 'react-i18next';
import {
    fetchPostsCheckCount,
    setDeviceOutFlag,
    fetchPostSearchDevice,
} from "../../../../redux/actions/assetsAction";
import renderRadioButtonField from '../../../../shared/components/form/RadioButton';
import renderCheckBoxField from './CheckBox';

const AssetsSearch = ({assetState}) => {
    const dispatch = useDispatch();

    const [device, setDevice] = React.useState({
        outFlag: assetState.deviceOutFlag,
        deviceCode: '',
        operatingFlag: true,
        carryingFlag: true,
    });

    //console.log("assetState .... : ", assetState.searchRd);

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
            alert("경고창 생성");
        } else {
            postArray[schSelect] = schText;

            setDevice({
                ...device,
                [schSelect]: schText,
                [postDivision]: '',
            });

            postArray = ({
                ...device,
                [schSelect]: schText,
                [postDivision]: '',
            });

            //console.log("onSearch 🙇🙇🙇 postArray : ", postArray);
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

        dispatch(fetchPostSearchDevice(assetState, postArray));
    };

    /* useEffect(() => {
         dispatch(fetchPostSearchDevice(assetState, assetState.searchRd));
         // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [assetState.searchRd]);*/

    return (
        <Col md="12">
            <Card>
                <CardBody>
                    <Row>
                        <Col md={10} sm={12}>
                            <form>
                                <div className="search_card_body" style={{maxWidth: "100%"}}>
                                    <div className="inbox__emails-controls-left">
                                        <select name="schSelect" className="search_select"
                                                onChange={onChangeSelect}>
                                            <option value="0">:: SELECT ::</option>
                                            <option value="deviceCode">장비코드</option>
                                            <option value="customer">고객사</option>
                                        </select>
                                        <input placeholder="Search..." name="schText"
                                               className="search_input"/>
                                        <MagnifyIcon role="button" tabIndex="0" onClick={onSearch}
                                                     onKeyDown={onSearch}/>
                                        <br/><br/>
                                        {
                                            assetState.codes.codeDeviceType !== undefined ? (
                                                <Fragment>
                                                    <select name="ownership" className="search_select"
                                                            onChange={onChangeCode}>
                                                        <option value="0">:: 소유권 ::</option>
                                                        {
                                                            assetState.codes.codeOwnership.map((d, index) => (
                                                                <option key={d.codeId.toString()}
                                                                        value={d.codeId}>{d.name}</option>
                                                            ))}
                                                    </select>
                                                    &nbsp;&nbsp;
                                                    <select name="ownershipDiv" className="search_select"
                                                            onChange={onChangeCode}>
                                                        <option value="0">:: 소유권구분 ::</option>
                                                        {
                                                            assetState.codes.codeOwnershipDiv.map((d, index) => (
                                                                <option key={d.codeId.toString()}
                                                                        value={d.codeId}>{d.name}</option>
                                                            ))}
                                                    </select>
                                                    &nbsp;&nbsp;
                                                    <select name="idc" className="search_select"
                                                            onChange={onChangeCode}>
                                                        <option value="0">:: IDC ::</option>
                                                        {
                                                            assetState.codes.codeIdc.map((d, index) => (
                                                                <option key={d.codeId.toString()}
                                                                        value={d.codeId}>{d.name}</option>
                                                            ))}
                                                    </select>
                                                    &nbsp;&nbsp;
                                                    <select name="manufacture" className="search_select"
                                                            onChange={onChangeCode}>
                                                        <option value="0">:: 제조사 ::</option>
                                                        {
                                                            assetState.codes.codeManufacture.map((d, index) => (
                                                                <option key={d.codeId.toString()}
                                                                        value={d.codeId}>{d.name}</option>
                                                            ))}
                                                    </select>
                                                    &nbsp;&nbsp;
                                                    <select name="deviceType" className="search_select"
                                                            onChange={onChangeCode}>
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
                                                    test
                                                </Fragment>
                                            )
                                        }
                                    </div>
                                </div>
                            </form>
                        </Col>
                        <Col md={2} sm={12}>
                            {/*&nbsp;&nbsp;
                            <div className="float-left circle-legend">
                                &nbsp;&nbsp;
                                <span className="circle__lit"/>장비반출&nbsp;&nbsp;
                                <div className="float-left" role="button" tabIndex="0"
                                     onClick={event => setToggleOutFlag('0')}
                                     onKeyDown={event => setToggleOutFlag('0')}>
                                    <span className="circle__ste"
                                          role="button" tabIndex="0"/>운영장비&nbsp;&nbsp;
                                </div>
                                <div className="float-left" role="button" tabIndex="0"
                                     onClick={event => setToggleOutFlag("1")}
                                     onKeyDown={event => setToggleOutFlag("1")}>
                                    <span className="circle__eth"
                                          role="button" tabIndex="0"/>반출장비&nbsp;&nbsp;
                                </div>
                            </div>*/}
                            {/*1 : true , 0 : false */}
                            {/*0 : 반입, 1 : 반출*/}
                            <div className="search_card_body" style={{maxWidth: "100%"}}>
                                <div className="float-left">
                                    <span>
                                        <input type="checkbox" name="operatingFlag" className="search_checkbox"
                                               checked={device.operatingFlag}
                                               value={device.operatingFlag}
                                               onChange={setToggleOutFlag}/>&nbsp;
                                        <span className="search_checkboxText">
                                            운영장비
                                        </span>
                                    </span>
                                    &nbsp;&nbsp;
                                    <span>
                                        <input type="checkbox" name="carryingFlag" className="search_checkbox"
                                               checked={device.carryingFlag}
                                               value={device.carryingFlag}
                                               onChange={setToggleOutFlag}/>&nbsp;
                                        <span className="search_checkboxText">
                                            반출장비
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Col>
    );
};

export default reduxForm({
    form: 'vertical_form_layout_half', // a unique identifier for this form
})(withTranslation('common')(AssetsSearch));
