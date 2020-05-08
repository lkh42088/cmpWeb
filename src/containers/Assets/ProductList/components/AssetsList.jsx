import React, {PureComponent, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {
    Card,
    CardBody,
    Col, Row,
} from 'reactstrap';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import PropTypes, {string} from 'prop-types';

import {changeMenuTitle} from '../../../../redux/actions/titleActions';
import {setDeviceIdx, getDeviceByIdx} from '../../../../redux/actions/assetsAction';

import AssetsHead from './AssetsHead';
import AssetsModal from "./AssetsModal";
import VerticalFormHalf from "../../Server/components/VerticalFormHalf";
import AssetsWrite from "../../Server/components/AssetsWrite";

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

export default class AssetsList extends PureComponent {
    state = {
        order: 'asc',
        orderBy: 'DeviceCode',
        selected: new Map([]),
        page: 0,
        rowsPerPage: 5,
    };

    //handleSubmit: PropTypes.func.isRequired,
    //assetState: PropTypes.arrayOf(PropTypes.string).isRequired,
    static propTypes = {
        assetState: PropTypes.arrayOf(PropTypes.string).isRequired,
        dispatch: PropTypes.func.isRequired,
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
        console.log("CLICK : handleSelectAllClick");
        if (checked) {
            const {assetState} = this.props;
            const newSelected = new Map();
            assetState.devices.map(n => newSelected.set(n.Idx, true));
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

    isSelected = (id) => {
        const {selected} = this.state;
        return !!selected.get(id);
    };

    setDeviceIdx = (event, idx) => {
        const {dispatch} = this.props;
        const {assetState} = this.props;
        dispatch(setDeviceIdx(idx));
        dispatch(getDeviceByIdx(idx, assetState.deviceType));
    };

    render() {
        const {
            order, orderBy, selected, rowsPerPage, page,
        } = this.state;
        /*const {handleSubmit} = this.props;*/
        const {assetState, dispatch} = this.props;
        /*const emptyRows = rowsPerPage - Math.min(rowsPerPage, assetState.devices.length - (page * rowsPerPage));*/

        const tableCellClassName = 'material-table__cell material-table__cell-right';
        // const {dispatch} = this.props;

        const deviceServer = (
            <Fragment>
                <TableBody>
                    {assetState.devices
                        .sort(getSorting(order, orderBy))
                        .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                        .map((d) => {
                            const isSelected = this.isSelected(d.Idx);

                            return (
                                <TableRow
                                    className="material-table__row"
                                    role="checkbox"
                                    aria-checked={isSelected}
                                    tabIndex={-1}
                                    key={d.Idx}
                                    selected={isSelected}
                                >
                                    <TableCell className="material-table__cell"
                                               padding="checkbox"
                                               onClick={event => this.handleClick(event, d.Idx)}>
                                        <Checkbox checked={isSelected}
                                                  className="material-table__checkbox"/>
                                    </TableCell>
                                    <TableCell
                                        className={tableCellClassName}
                                    >{/*No*/}
                                        {d.Idx}
                                    </TableCell>
                                    <TableCell
                                        className={tableCellClassName}
                                        onClick={event => this.setDeviceIdx(event, d.Idx)}
                                    >{/*장비코드*/}
                                        <b className="text_cor_green mouse_over_list">
                                            <AssetsModal
                                                title="장비 확인"
                                                message="자산관리 > 장비 확인 페이지 입니다."
                                                modalType="view"
                                                toggleTitle={d.DeviceCode}
                                                assetState={assetState}
                                                dispatch={dispatch}
                                            />
                                        </b>
                                    </TableCell>
                                    <TableCell
                                        className={tableCellClassName}
                                    >{/*구분*/}{d.DeviceType}
                                    </TableCell>
                                    <TableCell
                                        className={tableCellClassName}
                                    >{/*제조사*/}{d.Manufacture}
                                    </TableCell>
                                    <TableCell
                                        className={tableCellClassName}
                                    >{/*모델명*/}{d.Model}
                                    </TableCell>
                                    <TableCell
                                        className={tableCellClassName}
                                    >{/*소유권*/}{d.Ownership}
                                    </TableCell>
                                    <TableCell
                                        className={tableCellClassName}
                                    >{/*소유권구분*/}{d.OwnerCompany}
                                    </TableCell>
                                    <TableCell
                                        className={tableCellClassName}
                                    >{/*고객사*/}<b className="text_cor_orange">{d.Customer}</b>
                                    </TableCell>
                                    <TableCell
                                        className={tableCellClassName}
                                    >{/*IDC/위치*/}{d.IDC} {d.Rack}
                                    </TableCell>
                                    <TableCell
                                        className={tableCellClassName}
                                    >{/*용도*/}{d.Purpos}
                                    </TableCell>

                                    {assetState.deviceType === 'server'
                                    && (
                                        <Fragment>
                                            <TableCell
                                                className={tableCellClassName}
                                            >{/*IP*/}{d.Ip}
                                            </TableCell>
                                            <TableCell
                                                className={tableCellClassName}
                                            >{/*크기*/}{d.Size}
                                            </TableCell>
                                        </Fragment>
                                    )}
                                    {assetState.deviceType === 'network'
                                    && (
                                        <Fragment>
                                            <TableCell
                                                className={tableCellClassName}
                                            >{/*IP*/}{d.Ip}
                                            </TableCell>
                                            <TableCell
                                                className={tableCellClassName}
                                            >{/*HW S/N*/}{d.HwSn}
                                            </TableCell>
                                            <TableCell
                                                className={tableCellClassName}
                                            >{/*펌웨어*/}{d.FirmwareVersion}
                                            </TableCell>
                                            <TableCell
                                                className={tableCellClassName}
                                            >{/*입고일*/}{d.WarehousingDate}
                                            </TableCell>
                                        </Fragment>
                                    )}
                                    {assetState.deviceType === 'part'
                                    && (
                                        <Fragment>
                                            <TableCell
                                                className={tableCellClassName}
                                            >{/*HW S/N*/}{d.HwSn}
                                            </TableCell>
                                            <TableCell
                                                className={tableCellClassName}
                                            >{/*워런티*/}{d.Warranty}
                                            </TableCell>
                                            <TableCell
                                                className={tableCellClassName}
                                            >{/*입고일*/}{d.WarehousingDate}
                                            </TableCell>
                                        </Fragment>
                                    )}
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Fragment>
        );

        return (
            <Col md={12} lg={12}>
                <Card>
                    <CardBody>
                        <div className="material-table__wrap">
                            <Table className="material-table">
                                <AssetsHead
                                    numSelected={[...selected].filter(el => el[1]).length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={this.handleSelectAllClick}
                                    onRequestSort={this.handleRequestSort}
                                    rowCount={assetState.devices.length}
                                    assetState={assetState}
                                />
                                {deviceServer}
                            </Table>
                        </div>
                        <TablePagination
                            component="div"
                            className="material-table__pagination"
                            count={assetState.devices.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            backIconButtonProps={{'aria-label': 'Previous Page'}}
                            nextIconButtonProps={{'aria-label': 'Next Page'}}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            rowsPerPageOptions={[5, 15]}
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
