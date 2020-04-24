import React, {PureComponent} from 'react';

import {
    Card,
    CardBody,
    Col,
} from 'reactstrap';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import PropTypes from 'prop-types';

import MonitoringHead from './MonitoringHead';

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

export default class MatTable extends PureComponent {
    state = {
        order: 'asc',
        orderBy: 'idx',
        selected: new Map([]),
        data: [
            createData('dc', 'rack', 'device_code', 'device_type',
                'manufacture', 'model', 'ip', 'monitoring_type'),
            createData('dc2', 'rack', 'device2_code', 'device_type',
                'manufacture', 'model', 'ip', 'monitoring_type'),
        ],
        page: 0,
        rowsPerPage: 10,
    };

    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
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

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage: event.target.value});
    };

    handleDeleteSelected = () => {
        const {data} = this.state;
        let copyData = [...data];
        const {selected} = this.state;

        for (let i = 0; i < [...selected].filter(el => el[1]).length; i += 1) {
            copyData = copyData.filter(obj => obj.idx !== selected[i]);
        }

        this.setState({data: copyData, selected: new Map([])});
    };

    isSelected = (id) => {
        const {selected} = this.state;
        return !!selected.get(id);
    };

    render() {
        const {
            data, order, orderBy, selected, rowsPerPage, page,
        } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - (page * rowsPerPage));
        const {handleSubmit} = this.props;

        return (
            <Col md={12} lg={12}>
                <Card>
                    <CardBody>
                        <div className="material-table__wrap">
                            <Table className="material-table">
                                <MonitoringHead
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
                                                                  className="material-table__checkbox"/>
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
                        <TablePagination
                            component="div"
                            className="material-table__pagination"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            backIconButtonProps={{'aria-label': 'Previous Page'}}
                            nextIconButtonProps={{'aria-label': 'Next Page'}}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            rowsPerPageOptions={[10, 15]}
                            dir="ltr"
                            SelectProps={{
                                inputProps: {'aria-label': 'rows per page'},
                                native: true,
                            }}
                        />
                    </CardBody>
                </Card>
            </Col>
        );
    }
}
