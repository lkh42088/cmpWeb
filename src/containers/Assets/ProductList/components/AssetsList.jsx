import React, {PureComponent, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {
    Card,
    CardBody,
    Col, Modal, Row,
} from 'reactstrap';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import PropTypes, {string} from 'prop-types';
import classNames from "classnames";

import {changeMenuTitle} from '../../../../redux/actions/titleActions';
import {
    setDeviceIdx, getDeviceByIdx, submitDeviceComment, fetchPosts, fetchPostsCheckCount,
} from '../../../../redux/actions/assetsAction';

import AssetsHead from './AssetsHead';
import VerticalFormHalf from "../../Server/components/VerticalFormHalf";
import AssetsWrite from "../../Server/components/AssetsWrite";
import AssetsView from "./AssetsView";
import AssetsEdit from "./AssetsEdit";
import {RTLProps} from "../../../../shared/prop-types/ReducerProps";

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

const overNum = 100;

export default class AssetsList extends PureComponent {
    state = {
        order: 'asc',
        orderBy: 'DeviceCode',
        selected: new Map([]),
        page: 0,
        rowsPerPage: 10,
        viewModalContent: '',
        checkCount: 0,
        // eslint-disable-next-line react/destructuring-assignment
        showPage: 1,
        pageMaxCount: 0,
        overPageCheck: false,
    };

    //handleSubmit: PropTypes.func.isRequired,
    //assetState: PropTypes.arrayOf(PropTypes.string).isRequired,
    static propTypes = {
        // eslint-disable-next-line react/forbid-prop-types
        assetState: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    handleCreate = (data) => {
        // form submit dispatch 관리
        const {assetState, dispatch} = this.props;

        if (data.submit.type === 'comment') {
            dispatch(submitDeviceComment(data.comment, assetState, data.submit.division, 'loginId'));
        } else if (data.submit.type === 'device') {
            if (data.submit.division === 'create') {
                console.log("device create");
            }
        }
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        const {assetState, dispatch} = this.props;
        let order = 'desc';
        const {orderBy: stateOrderBy, order: stateOrder} = this.state;
        const {
            rowsPerPage, checkCount, page,
        } = this.state;

        if (stateOrderBy === property && stateOrder === 'desc') {
            order = 'asc';
        }

        this.setState({
            order,
            orderBy,
        });

        dispatch(fetchPosts(assetState.deviceType, Number(page), rowsPerPage, orderBy, order));
    };

    handleSelectAllClick = (event, checked) => {
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

    handleChangePageBack = () => {
        const {assetState, dispatch} = this.props;
        const {
            orderBy, rowsPerPage, order, checkCount, showPage, page, pageMaxCount, overPageCheck,
        } = this.state;

        const checkNum = Number(page - assetState.frontPage.oriPage);
        console.log("start-----------------------------handleChangePageBack");

        console.log("★ page : ", page);
        console.log("★ showPage : ", showPage);
        console.log("★ assetState.frontPage.oriPage : ", assetState.frontPage.oriPage);
        console.log("★ checkNum : ", checkNum);

        if (showPage !== 1) {
            const checkPageNumCount = (showPage - 1) * rowsPerPage;

            console.log("page : ", page);
            console.log("showPage : ", showPage);
            console.log("checkPageNumCount : ", checkPageNumCount);

            if (checkPageNumCount % overNum === 0) { // 100의 배수일때
                this.setState({
                    page: Number(pageMaxCount),
                    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
                    showPage: this.state.showPage - 1,
                    checkCount: Number(checkPageNumCount),
                });

                dispatch(fetchPostsCheckCount(
                    assetState.deviceType, Number(page), Number(checkPageNumCount), orderBy, order, rowsPerPage, showPage,
                ));
            } else {
                this.setState({
                    overPageCheck: false,
                    page: Number(page) - 1,
                    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
                    showPage: this.state.showPage - 1,
                    checkCount: Number(checkPageNumCount),
                });
            }

/*            if (Number(checkPageNumCount) >= overNum) {
                this.setState({
                    page: 0,
                    checkCount: Number(checkPageNumCount),
                });

                dispatch(fetchPostsCheckCount(
                    assetState.deviceType, Number(page), Number(checkPageNumCount), orderBy, order, rowsPerPage, showPage,
                ));
            }*/
        }
        console.log("end-----------------------------handleChangePageBack");
    };

    handleChangePage = (event, page) => {
        console.log("start-----------------------------handleChangePage");
        const {assetState, dispatch} = this.props;
        const {
            orderBy, rowsPerPage, order, checkCount, showPage, pageMaxCount, overPageCheck,
        } = this.state;
        const checkPageNumCount = (showPage + 1) * rowsPerPage;

        this.setState({
            page: Number(page),
            // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
            showPage: this.state.showPage + 1,
            checkCount: Number(checkPageNumCount),
        });

        //console.log("handleChangePage ~ checkPageNumCount : ", checkPageNumCount);

        if (checkPageNumCount % overNum === 0) { // 100의 배수일때
            this.setState({
                pageMaxCount: Number(showPage),
                overPageCheck: true,
            });
        } else {
            this.setState({
                overPageCheck: false,
            });
        }

        console.log("👿 pageMaxCount : ", pageMaxCount);
        console.log("👿 checkPageNumCount : ", checkPageNumCount);

        /*if (Number(checkPageNumCount) > overNum) {*/
        /*if (checkPageNumCount % overNum === 0) { // 100의 배수일때*/
        if (overPageCheck === true) {
            this.setState({
                page: 0,
                checkCount: Number(checkPageNumCount),
            });

            dispatch(fetchPostsCheckCount(
                assetState.deviceType, Number(page), Number(checkPageNumCount), orderBy, order, rowsPerPage, showPage,
            ));
        }
        console.log("end-----------------------------handleChangePage");
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({
            page: 0,
            rowsPerPage: Number(event.target.value),
        });
    };

    isSelected = (id) => {
        const {selected} = this.state;

        return !!selected.get(id);
    };

    toggle = (e) => {
        this.setState(prevState => ({modal: !prevState.modal}));
    };

    setDeviceIdx = (event, deviceCode) => {
        const {dispatch, assetState} = this.props;

        dispatch(getDeviceByIdx(deviceCode, assetState.deviceType));

        this.setComponents();
    };

    setComponents = () => {
        const {dispatch, assetState} = this.props;

        let tempViewModalContent;

        tempViewModalContent = 'test';

        tempViewModalContent = (
            <AssetsView closeToggle={this.toggle}
                        title="장비 확인" message="자산관리 > 장비 확인 페이지 입니다."
                        assetState={assetState} dispatch={dispatch} onCreate={this.handleCreate}
            />
        );

/*        tempViewModalContent = (
            <AssetsEdit closeToggle={this.toggle}
                        title="장비 확인" message="자산관리 > 장비 확인 페이지 입니다."
                        assetState={assetState} dispatch={dispatch} onCreate={this.handleCreate}
            />
        );*/

        this.setState({
            viewModalContent: tempViewModalContent,
        });
    };

    componentDidUpdate = (prevProps, prevState) => {
        const {assetState, dispatch} = this.props;
        if (assetState !== prevProps.assetState) {
            this.setComponents();
        }
    };

    render() {
        const {
            order, orderBy, selected, rowsPerPage, page, viewModalContent, modal, showPage,
        } = this.state;
        const {assetState, dispatch} = this.props;

        const tableCellClassName = 'material-table__cell material-table__cell-right';

        const modalClass = classNames({
            'assets_write__modal-dialog': true,
            'assets_write__modal-dialog--colored': false,
            'assets_write__modal-dialog--header': false,
        });

        /*if (assetState.devices.length > 0) {
            console.log("list render devices : ", assetState.devices[0]);
        }*/

        //console.log("list render -> ", page);

        //TODO length 값 0 일때도 처리해야함

        const deviceServer = (
            <Fragment>
                <TableBody>
                    {assetState.devices
                        .sort(getSorting(order, orderBy))
                        .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                        .map((d) => {
                            const isSelected = this.isSelected(d.DeviceCode);

                            return (
                                <TableRow
                                    className="material-table__row"
                                    role="checkbox"
                                    aria-checked={isSelected}
                                    tabIndex={-1}
                                    key={d.DeviceCode}
                                    selected={isSelected}
                                >
                                    <TableCell className="material-table__cell"
                                               padding="checkbox"
                                               onClick={event => this.handleClick(event, d.DeviceCode)}>
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
                                        onClick={event => this.setDeviceIdx(event, d.DeviceCode)}
                                    >{/*장비코드*/}
                                        <b className="text_cor_green mouse_over_list">
                                            <div className="assets_add_modal_div" onClick={this.toggle}
                                                 onKeyDown={this.toggle}
                                                 role="button" tabIndex="0"><span
                                                className="circle__ste"/>{d.DeviceCode}</div>
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
                            <Table className="material-table" size="small">
                                <AssetsHead
                                    numSelected={[...selected].filter(el => el[1]).length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={this.handleSelectAllClick}
                                    onRequestSort={this.handleRequestSort}
                                    rowCount={Number(assetState.devices.length)}
                                    assetState={assetState}
                                />
                                {deviceServer}
                            </Table>
                        </div>
                        <Modal
                            isOpen={modal}
                            modalClassName="ltr-support"
                            className={`assets_write__modal-dialog 
                            assets_write__modal-dialog ${modalClass}`}
                        >
                            {viewModalContent}
                        </Modal>
                        {/*page={page - assetState.frontPage.oriPage}*/}
                        <TablePagination
                            component="div"
                            className="material-table__pagination"
                            count={Number(assetState.page.Count)}
                            rowsPerPage={rowsPerPage}
                            page={page - assetState.frontPage.oriPage}
                            backIconButtonProps={{
                                'aria-label': 'Previous Page',
                                disabled: false,
                                onClick: this.handleChangePageBack,
                            }}
                            nextIconButtonProps={{'aria-label': 'Next Page'}}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            rowsPerPageOptions={[10, 50, 100]}
                            dir="ltr"
                            labelDisplayedRows={
                                ({checkCount, to, count}) => (
                                    <span style={{fontSize: 14}}><span>page: {showPage}</span>&nbsp;&nbsp;&nbsp; total : {count}
                                    </span>
                                )
                            }
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
