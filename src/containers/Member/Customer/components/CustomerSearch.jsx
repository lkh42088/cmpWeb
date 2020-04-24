/* eslint-disable react/prop-types */
import React, {PureComponent} from 'react';
import {
    Badge, Button, Card, CardBody, Col, Collapse, Modal, Table,
} from 'reactstrap';
import PropTypes from 'prop-types';

import CustomerModal from "./CustomerModal";

export default class AlertComponent extends PureComponent {
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

    onRefresh = () => {
        // your async logic here
        this.setState(prevState => ({refresh: !prevState.refresh}));
        setTimeout(() => this.setState({refresh: false}), 5000);
    };

    render() {
        const {
            md, lg, xl, sm, xs, color, divider, icon, title, label, subhead, before,
            panelClass, children,
        } = this.props;

        const {collapse, refresh, visible} = this.state;

        const style = {
            border: '1px solid red',
            backgroundColor: 'black',
            display: 'none',
        };

        if (visible) {
            return (
                <Col md="12" lg="12">
                    <Card
                        className={`search_panel${color ? ` search_panel--${color}` : ''}
            ${divider ? ' search_panel--divider' : ''}${collapse ? '' : ' search_panel--collapse'} ${panelClass}`}
                    >
                        <CardBody className="search_panel__body">
                            <div className="search_panel_topbtn circle-legend">
                                <div className="float-right">
                                    {/*<span className="circle__lit"/>서비스&nbsp;&nbsp;
                                    <span className="circle__lit"/>관리자&nbsp;&nbsp;
                                    <span className="circle__lit"/>담당자&nbsp;&nbsp;*/}
                                </div>
                                <div className="float-left">&nbsp;&nbsp;
                                    <span className="circle__btc"/>차단&nbsp;&nbsp;
                                    <div className="float-left" role="button" tabIndex="0">
                                        <CustomerModal
                                            title="고객사 등록"
                                            message="고객사 정보 등록 페이지 입니다."
                                            modalType="write"
                                            toggleTitle="고객사 등록"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                        {/*<CardBody className="search_panel__body">*/}
                            <div className="search_panel__title">
                                <form className="search_form">
                                    <select name="">
                                        <option value="아이디">ID</option>
                                        <option value="서비스명">서비스명</option>
                                    </select>
                                    <input placeholder="검색어 입력" name="search"/>
                                    <Badge className="search_btn">검색</Badge>
                                </form>
                                <h5 className="subhead">{subhead}</h5>
                            </div>
                        {/*</CardBody>*/}
                    </Card>
                    {before}
                </Col>
            );
        }
        return '';
    }
}
