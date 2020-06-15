import React from 'react';
import {
    Card, CardBody, Col, Row, Container,
} from 'reactstrap';
import MagnifyIcon from "mdi-react/MagnifyIcon";
import {Field, reduxForm} from 'redux-form';
import {withTranslation} from 'react-i18next';

const AssetsSearch = ({assetState}) => {
    /*console.log("😈😈assetState : ", assetState);
    console.log("😈😈codeOwnership : ", assetState.codes.codeOwnership);*/
    console.log("AssetsSearch start");
    return (
        <Col md="12">
            <Card>
                <CardBody>
                    <Row>
                        <Col md={10} sm={12}>
                            <form>
                                <div className="search_card_body" style={{maxWidth: "100%"}}>
                                    <div className="inbox__emails-controls-left">
                                        <select name="schSelect" className="search_select">
                                            <option value="deviceCode">장비코드</option>
                                            <option value="customer">고객사</option>
                                        </select>
                                        <input placeholder="Search..." name="schText"
                                               className="search_input"/>
                                        <MagnifyIcon/>
                                        &nbsp;&nbsp;
                                        <select name="ownership" className="search_select">
                                            <option value="0">:: 소유권 ::</option>
                                            {
                                                assetState.codes.codeOwnership.map((d, index) => (
                                                    <option key={d.codeId.toString()}
                                                            value={d.codeId}>{d.name}</option>
                                                ))}
                                        </select>
                                        &nbsp;&nbsp;
                                        <select name="ownershipDiv" className="search_select">
                                            <option value="0">:: 소유권구분 ::</option>
                                            {
                                                assetState.codes.codeOwnershipDiv.map((d, index) => (
                                                    <option key={d.codeId.toString()}
                                                            value={d.codeId}>{d.name}</option>
                                                ))}
                                        </select>
                                        &nbsp;&nbsp;
                                        <select name="idc" className="search_select">
                                            <option value="0">:: IDC ::</option>
                                            {
                                                assetState.codes.codeIdc.map((d, index) => (
                                                    <option key={d.codeId.toString()}
                                                            value={d.codeId}>{d.name}</option>
                                                ))}
                                        </select>
                                        &nbsp;&nbsp;
                                        <select name="manufacture" className="search_select">
                                            <option value="0">:: 제조사 ::</option>
                                            {
                                                assetState.codes.codeManufacture.map((d, index) => (
                                                    <option key={d.codeId.toString()}
                                                            value={d.codeId}>{d.name}</option>
                                                ))}
                                        </select>
                                        &nbsp;&nbsp;
                                        <select name="deviceType" className="search_select">
                                            <option value="0">:: 장비구분 ::</option>
                                            {
                                                assetState.codes.codeDeviceType.map((d, index) => (
                                                    <option key={d.codeId.toString()}
                                                            value={d.codeId}>{d.name}</option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </Col>
                        <Col md={2} sm={12}>
                            &nbsp;&nbsp;
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
