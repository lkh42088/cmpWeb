/* eslint-disable react/prop-types */
import React, {PureComponent} from 'react';
import {
    Badge, Button, Card, CardBody, Col, Collapse, Modal, Table,
} from 'reactstrap';
import PropTypes from 'prop-types';

import AssetsModal from "./AssetsModal";

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
            subheadVisible: true,
        };
    }

    onCollapse = () => {
        this.setState(prevState => ({collapse: !prevState.collapse}));
        this.setState(prevState => ({subheadVisible: !prevState.subheadVisible}));
    };

    render() {
        const {
            md, lg, xl, sm, xs, color, divider, icon, title, label, subhead, before,
            panelClass, children,
        } = this.props;

        const {
            collapse, refresh, visible, subheadVisible,
        } = this.state;

        if (visible) {
            return (
                <Col md={md} lg={lg} xl={xl} sm={sm} xs={xs}>
                    <Card
                        className={`search_panel${color ? ` search_panel--${color}` : ''}
            ${divider ? ' search_panel--divider' : ''}${collapse ? '' : ' search_panel--collapse'} ${panelClass}`}
                    >
                        <CardBody className="search_panel__body">
                            <div className="search_panel_topbtn circle-legend">
{/*                                <div className="float-right">
                                    <span className="circle__lit"/>재고장비&nbsp;&nbsp;
                                    <span className="circle__lit"/>SPLA&nbsp;&nbsp;
                                    <span className="circle__lit"/>가용장비&nbsp;&nbsp;
                                    <span className="circle__lit"/>반출장비&nbsp;&nbsp;
                                </div>*/}
                                <div className="float-left">
                                    &nbsp;&nbsp;
                                    <span className="circle__lit"/>장비반출&nbsp;&nbsp;
                                    <span className="circle__eos"/>장비등록&nbsp;&nbsp;
                                    {/*<div className="float-left" onClick={this.onConsole}
                                         onKeyDown={onToggleClick}
                                         role="button" tabIndex="0">*/}
                                    <div className="float-left" role="button" tabIndex="0">
                                        <AssetsModal
                                            title="장비 등록"
                                            message="자산관리 > 서버 장비 등록 페이지 입니다."
                                            modalType="write"
                                            toggleTitle="장비 등록"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardBody>

                        <div className="search_panel__btns">
                            <button className="search_panel__btn" type="button"
                                    onClick={this.onCollapse}>
                                <b><span className="lnr lnr-cog text-white font-weight-light"
                                         style={{padding: "5px"}}/></b>
                            </button>
                        </div>
                        <div className="search_panel__title">
                            <form className="search_form">
                                <input placeholder="장비코드" name="search"/>
                                &nbsp;&nbsp;
                                <Badge className="search_btn">검색</Badge>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <h5 className="search_panel__subhead">{/*{subhead}☆{subheadVisible}*/}
                                    {subheadVisible ? subhead : null}
                                </h5>
                            </form>
                        </div>

                        <Collapse isOpen={collapse}>
                            <div className="search_panel__content">
                                {children}
                            </div>
                        </Collapse>
                    </Card>
                    {before}
                </Col>
            );
        }
        return '';
    }
}
