import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Table, Badge, Button, ButtonToolbar, Modal, Col, Card, CardBody,
} from 'reactstrap';
import classNames from 'classnames';
import {Field, reduxForm} from "redux-form";
import {withTranslation} from "react-i18next";

import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";

import MonitoringModalHead from "./MonitoringModalHead";
import MonitoringModalSearch from "./MonitoringModalSearch";

import {RTLProps} from '../../../../shared/prop-types/ReducerProps';

let counter = 0;

function createData(dc,
                    rack,
                    deviceCode,
                    deviceType,
                    manufacture,
                    model,
                    ip,
                    monitoringType) {
    counter += 1;
    return {
        idx: counter,
        dc,
        rack,
        deviceCode,
        deviceType,
        manufacture,
        model,
        ip,
        monitoringType,
    };
}


function getSorting(order, orderBy) {
    if (order === 'desc') {
        return (a, b) => {
            if (a[orderBy] < b[orderBy]) {
                return -1;
            }
            if (a[orderBy] > b[orderBy]) {
                return 1;
            }
            return 0;
        };
    }
    return (a, b) => {
        if (a[orderBy] > b[orderBy]) {
            return -1;
        }
        if (a[orderBy] < b[orderBy]) {
            return 1;
        }
        return 0;
    };
}

class MonitoringModalList extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        message: PropTypes.string,
        modalType: PropTypes.string,
        closeToggle: PropTypes.func,
        color: PropTypes.string.isRequired,
        colored: PropTypes.bool,
        header: PropTypes.bool,
        btn: PropTypes.string.isRequired,
        rtl: RTLProps.isRequired,
    };

    static defaultProps = {
        title: '',
        message: '',
        modalType: 'write',
        colored: false,
        header: false,
        closeToggle: '',
    };

    constructor() {
        super();
        this.state = {
            modal: false,
            showPassword: false,
            order: 'asc',
            orderBy: 'idx',
            selected: new Map([]),
            data: [
                createData('dc', 'rack', 'device_code', 'device_type',
                    'manufacture', 'model', 'ip', 'monitoring_type'),
                createData('dc2', 'rack2', 'device_code2', 'device_type2',
                    'manufacture2', 'model2', 'ip2', 'monitoring_type2'),
            ],
            page: 0,
            rowsPerPage: 10,
        };
    }

    commentToggle = () => {
        this.setState(prevState => ({modal: !prevState.modal}));
    };

    onClose = () => {
        const {closeToggle} = this.props;
        closeToggle(); //
    };

    showPassword = (e) => {
        e.preventDefault();
        this.setState(prevState => ({showPassword: !prevState.showPassword}));
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
        const {orderBy: stateOrderBy, order: stateOrder} = this.state;

        if (stateOrderBy === property && stateOrder === 'desc') {
            order = 'asc';
        }

        this.setState({order, orderBy});
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            const {data} = this.state;
            const newSelected = new Map();
            data.map(n => newSelected.set(n.idx, true));
            this.setState({selected: newSelected});
            return;
        }
        this.setState({selected: new Map([])});
    };

    handleClick = (event, id) => {
        const {selected} = this.state;
        const newSelected = new Map(selected);
        const value = newSelected.get(id);
        let isActive = true;
        if (value) {
            isActive = false;
        }
        newSelected.set(id, isActive);
        this.setState({selected: newSelected});
    };

    isSelected = (id) => {
        const {selected} = this.state;
        return !!selected.get(id);
    };

    render() {
        const {
            color, btn, title, message, colored, header, rtl, modalType,
        } = this.props;
        const {modal} = this.state;
        let Icon;

        const {showPassword} = this.state;

        const deviceStyle = {
            textDecoration: '#ffdd67 underline',
            fontWeight: 'bold',
        };
        const {
            data, order, orderBy, selected, rowsPerPage, page,
        } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - (page * rowsPerPage));

        const modalClass = classNames({
            'assets_write__modal-dialog': true,
            'assets_write__modal-dialog--colored': colored,
            'assets_write__modal-dialog--header': header,
        });

        switch (color) {
            case 'primary':
                Icon = <span className="lnr lnr-pushpin assets_write__modal__title-icon"/>;
                break;
            case 'success':
                Icon = <span className="lnr lnr-thumbs-up assets_write__modal__title-icon"/>;
                break;
            case 'warning':
                Icon = <span className="lnr lnr-flag assets_write__modal__title-icon"/>;
                break;
            case 'danger':
                Icon = <span className="lnr lnr-cross-circle assets_write__modal__title-icon"/>;
                break;
            default:
                break;
        }

        return (
            <div>
                <div className="assets_write__modal__header">
                    <p className="text-modal assets_write__modal__title">{title}
                        &nbsp;&nbsp;
                        <span className="assets_write__modal__title_sub">{message}</span></p>
                    <button className="lnr lnr-cross assets_write__modal__close-btn" type="button"
                            onClick={this.onClose}/>
                    {header ? '' : Icon}
                </div>
                <div className="assets_write__modal__body assets_write__modal__tableLine">
                    <MonitoringModalSearch/>
                    <Col md={12} lg={12}>
                        <Card>
                            <CardBody>
                                <div className="material-table__wrap">
                                    <Table className="material-table">
                                        <MonitoringModalHead
                                            numSelected={[...selected].filter(el => el[1]).length}
                                            order={order}
                                            orderBy={orderBy}
                                            onSelectAllClick={this.handleSelectAllClick}
                                            onRequestSort={this.handleRequestSort}
                                            rowCount={data.length}
                                        />
                                        <TableBody>
                                            {data
                                                .sort(getSorting(order, orderBy))
                                                .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                                                .map((d) => {
                                                    const isSelected = this.isSelected(d.idx);
                                                    return (
                                                        <TableRow
                                                            className="material-table__row"
                                                            role="checkbox"
                                                            aria-checked={isSelected}
                                                            tabIndex={-1}
                                                            key={d.idx}
                                                            selected={isSelected}
                                                        >
                                                            <TableCell className="material-table__cell"
                                                                       padding="checkbox"
                                                                       onClick={event => this.handleClick(event, d.idx)}>
                                                                <Checkbox checked={isSelected}
                                                                          className="material-table__checkbox"
                                                                          style={{padding: "0"}}/>
                                                            </TableCell>
                                                            <TableCell
                                                                className="material-table__cell material-table__cell-right"
                                                            >
                                                                {d.dc}
                                                            </TableCell>
                                                            <TableCell
                                                                className="material-table__cell material-table__cell-right"
                                                            >
                                                                {d.rack}
                                                            </TableCell>
                                                            <TableCell
                                                                className="material-table__cell material-table__cell-right"
                                                            >{d.deviceCode}
                                                            </TableCell>
                                                            <TableCell
                                                                className="material-table__cell material-table__cell-right"
                                                            >{d.deviceType}
                                                            </TableCell>
                                                            <TableCell
                                                                className="material-table__cell material-table__cell-right"
                                                            >{d.manufacture}
                                                            </TableCell>
                                                            <TableCell
                                                                className="material-table__cell material-table__cell-right"
                                                            >{d.model}
                                                            </TableCell>
                                                            <TableCell
                                                                className="material-table__cell material-table__cell-right"
                                                            >{d.ip}
                                                            </TableCell>
                                                            <TableCell
                                                                className="material-table__cell material-table__cell-right"
                                                            >{d.monitoringType}
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>

                </div>

                {/*<div className="float-right">
                    <Badge className="badge_btn badge-light" type="button"
                           onClick={this.commentToggle} onKeyDown={this.commentToggle}
                           role="button" tabIndex="0">담당자 추가</Badge>
                    <Badge className="badge_btn badge-light">[회사명] 담당자 추가</Badge>
                    <Badge className="badge_btn badge-light">서비스 추가</Badge>
                </div>*/}

                <ButtonToolbar className="assets_write__modal__footer">
                    <Button className="assets_write__modal_ok" outline={colored} color="primary"
                            onClick={this.onClose}>적용</Button>
                    <Button className="assets_write__modal_cancel"
                            onClick={this.onClose}>취소</Button>
                </ButtonToolbar>

            </div>
        );
    }
}

/*export default AssetsView;*/
/*
export default function toggleClick() {
    this.toggle();
}*/
export default reduxForm({
    form: 'vertical_form', // a unique identifier for this form
})(withTranslation('common')(MonitoringModalList));
