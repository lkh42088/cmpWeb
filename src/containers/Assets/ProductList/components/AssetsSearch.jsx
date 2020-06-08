import React from 'react';
import {
    Card, CardBody, Col, Button, ButtonToolbar, Table, Badge, Row, Container,
} from 'reactstrap';
import MagnifyIcon from "mdi-react/MagnifyIcon";
import SettingsIcon from 'mdi-react/SettingsIcon';
import {TextField, NoSsr} from '@material-ui/core';

import ArrowDownwardIcon from "mdi-react/ArrowDownwardIcon";

import {Link} from "react-router-dom";
import {Field, reduxForm} from 'redux-form';
import {withTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import AccountSearchIcon from "mdi-react/AccountSearchIcon";

import renderSelectField from '../../../../shared/components/form/Select';
import renderSketchColorPickerField from '../../../../shared/components/form/SketchColorPicker';
/*import PanelSearchAssets from "../../../../shared/components/PanelSearch_Assets";*/
import PanelSearchAssets from "./_PanelSearch_Assets";

const AssetsSearch = ({handleSubmit, reset, t}) => (
    /*    <Container>
            <Row>
                <Col md={10} sm={12}>
                    <Card className="grid">
                        <CardBody>
                            <p>col-md-10</p>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={2} sm={12}>
                    <Card className="grid">
                        <CardBody>
                            <p className="grid__small">col-md-2</p>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>*/
    /* <div className="search_card_body" style={{maxWidth: "100%"}}>
         <form onSubmit={handleSubmit}>
             <div className="inbox__emails-controls-left"
                  style={{margin: "auto"}}>
                 <div className="inbox__emails-control-search">*/
    <Col md="12">
        <Card>
            <CardBody>
                <Row>
                    <Col md={10} sm={12}>
                        <form onSubmit={handleSubmit}>
                            <div className="search_card_body" style={{maxWidth: "100%"}}>
                                <div className="inbox__emails-controls-left">
                                    <input placeholder="Search..." name="search" className="search_input"/>
                                    <MagnifyIcon/>
                                    &nbsp;&nbsp;
                                    <select name="" className="search_select">
                                        <option value="">소유권</option>
                                        <option value="">자사장비</option>
                                        <option value="">고객장비</option>
                                    </select>
                                    &nbsp;&nbsp;
                                    <select name="" className="search_select">
                                        <option value="">소유권구분</option>
                                        <option value="">고객소유장비</option>
                                        <option value="">소유형임대</option>
                                        <option value="">비소유형임대</option>
                                        <option value="">재고장비</option>
                                    </select>
                                    &nbsp;&nbsp;
                                    <select name="" className="search_select">
                                        <option value="">IDC</option>
                                        <option value="">강남KT-IDC</option>
                                        <option value="">분당KT-IDC</option>
                                        <option value="">목동KT-IDC 1센터</option>
                                        <option value="">서초SK-IDC</option>
                                        <option value="">...</option>
                                    </select>
                                    &nbsp;&nbsp;
                                    <select name="" className="search_select">
                                        <option value="">제조사</option>
                                        <option value="">IBM(Lenovo)</option>
                                        <option value="">HP</option>
                                    </select>
                                    &nbsp;&nbsp;
                                    <select name="" className="search_select">
                                        <option value="">장비구분</option>
                                        <option value="7">서버</option>
                                        <option value="8">스토리지</option>
                                        <option value="9">기타</option>
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

AssetsSearch.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
};

export default reduxForm({
    form: 'vertical_form_layout_half', // a unique identifier for this form
})(withTranslation('common')(AssetsSearch));
