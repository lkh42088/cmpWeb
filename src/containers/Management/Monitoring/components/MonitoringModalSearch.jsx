/* eslint-disable react/prop-types */
import React, {PureComponent} from 'react';
import {
    Badge, Button, Card, CardBody, Col, Collapse, Modal, Table,
} from 'reactstrap';
import PropTypes from 'prop-types';

export default class MonitoringModalSearch extends PureComponent {
    static propTypes = {
        divider: PropTypes.bool,
        color: PropTypes.string,
        title: PropTypes.string,
        subhead: PropTypes.string,
        label: PropTypes.string,
        icon: PropTypes.string,
        md: PropTypes.number,
        lg: PropTypes.number,
        xl: PropTypes.number,
        sm: PropTypes.number,
        xs: PropTypes.number,
        before: PropTypes.element,
        panelClass: PropTypes.string,
    };

    static defaultProps = {
        divider: false,
        color: '',
        title: '',
        subhead: '',
        label: '',
        icon: '',
        md: 0,
        lg: 0,
        xl: 0,
        sm: 0,
        xs: 0,
        before: null,
        panelClass: '',
    };

    constructor() {
        super();
        this.state = {
            visible: true,
            collapse: false,
            refresh: false,
        };
    }

    render() {
        const {
            md, lg, xl, sm, xs, color, divider, icon, title, label, subhead, before,
            panelClass, children,
        } = this.props;

        const {collapse, refresh, visible} = this.state;

        if (visible) {
            return (
                <Col md="12" lg="12">
                    <div className="search_panel__title_modal">
                        <form className="search_form">
                            <select name="">
                                <option value="">제조사</option>
                                <option value="">IBM(Lenovo)</option>
                                <option value="">HP</option>
                                <option value="">DELL</option>
                                <option value="">eSilm</option>
                                <option value="">SuperMicro</option>
                                <option value="">FUJITSU</option>
                                <option value="">UNIWIDE</option>
                                <option value="">조립서버</option>
                                <option value="">데스크탑</option>
                                <option value="">CISCO</option>
                                <option value="">SUN</option>
                                <option value="">COMPAQ</option>
                                <option value="">3GEN</option>
                                <option value="">HITACHI</option>
                                <option value="">삼성</option>
                                <option value="">NETGEAR</option>
                                <option value="">SYNOLOGY</option>
                                <option value="">ASUS</option>
                                <option value="">Buffalo</option>
                                <option value="">QNAP</option>
                                <option value="">EMC</option>
                                <option value="">Infortrend</option>
                                <option value="">블레이드서버</option>
                                <option value="">Symantec</option>
                                <option value="">NetApp</option>
                                <option value="">지란지교시큐리티</option>
                                <option value="">Quantum</option>
                                <option value="">Inspur</option>
                                <option value="">VERITAS</option>
                                <option value="">Quantum</option>
                                <option value="">Intel</option>
                                <option value="">Promise Technology</option>
                                <option value="">NUTANIX</option>
                                <option value="">(주)소만사</option>
                                <option value="">TERATEC</option>
                                <option value="">Fortinet</option>
                                <option value="">WAREVALLEY</option>
                            </select>
                            &nbsp;&nbsp;
                            <select name="">
                                <option value="">모델명</option>
                            </select>
                            &nbsp;&nbsp;
                            <select name="">
                                <option value="">장비구분</option>
                                <option value="7">서버</option>
                                <option value="8">스토리지</option>
                                <option value="9">기타</option>
                            </select>
                            &nbsp;&nbsp;
                            <input placeholder="검색어 입력" name="search"/>
                            &nbsp;&nbsp;
                            <Badge className="search_btn">검색</Badge>
                        </form>
                        <h5 className="subhead">{subhead}</h5>
                    </div>
                </Col>
            );
        }
        return '';
    }
}
