import React, {PureComponent, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {
    ButtonToolbar,
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
    getDeviceByIdx, postDeviceComment, fetchPosts, fetchPostsCheckCount,
} from '../../../../redux/actions/assetsAction';

import AssetsHead from './AssetsHead';
import VerticalFormHalf from "../../Server/components/VerticalFormHalf";
import AssetsWrite from "./AssetsWrite";
import AssetsView from "./AssetsView";
import AssetsEdit from "./AssetsEdit";
import {RTLProps} from "../../../../shared/prop-types/ReducerProps";

/*order by 사용 함수*/
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

/*api 요청 시 한번에 가지고 오는 device 개수
* 변경 시 index.jsx도 변경해 줘야 함.
* */
const overNum = 1000;

export default class AssetsList extends PureComponent {
    state = {
        order: 'asc',
        orderBy: 'DeviceCode',
        selected: new Map([]),
        page: 0,
        rowsPerPage: 10,
        viewModalContent: '',
        showPage: 1,
        pageCount: 1,
        pageSize: 10,
        pageNoNum: 0,
        isOpenView: false,
        isOpenWrite: false,
    };

    //handleSubmit: PropTypes.func.isRequired,
    //assetState: PropTypes.arrayOf(PropTypes.string).isRequired,
    static propTypes = {
        // eslint-disable-next-line react/forbid-prop-types
        assetState: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    // form submit dispatch 관리
    setTotalManager = (data) => {
        const {assetState, dispatch} = this.props;

        const submitData = ({
            idx: data.commentIdx,
            /*registerId: data.registerId,*/ //TODO 로그인한 ID
            registerId: 'test_id',
            comment: data.comment,
            deviceCode: data.deviceCode,
        });

        //const jsonSubmitData = JSON.stringify(submitData);

        console.log("submitData : ", submitData);

        switch (data.postType) {
            case 'comment':
                dispatch(postDeviceComment(data.postDivision, assetState, submitData));
                break;
            case 'device':
                if (data.postDivision === 'create') {
                    console.log("device create");
                }
                break;
            default:
                break;
        }
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        const {assetState, dispatch} = this.props;
        let order = 'desc';
        const {orderBy: stateOrderBy, order: stateOrder} = this.state;
        const {
            rowsPerPage, page,
        } = this.state;

        if (stateOrderBy === property && stateOrder === 'desc') {
            order = 'asc';
        }

        this.setState({
            order,
            orderBy,
        });

        const dispatchVal = ({
            deviceType: assetState.deviceType,
            orderBy,
            order,
            rowsPerPage,
            overNum,
        });

        dispatch(fetchPosts(dispatchVal));
    };

    handleSelectAllClick = (event, checked) => {
        console.log("💎 handleSelectAllClick  checked: ", checked);
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
            orderBy, rowsPerPage, order, showPage, page,
            pageCount, pageSize, pageNoNum,
        } = this.state;
        const changePageCount = pageCount - 1;
        const changePageNoNum = pageNoNum - 1;
        const checkPageNumCount = (showPage - 1) * rowsPerPage;

        /*        console.log("👔 start------------------------------------> 이전");
                //this.setState({pageCount: pageCount - 1});
                console.log("showPage : ", showPage);

                console.log("changePageCount : ", changePageCount);
                console.log("changePageNoNum : ", changePageNoNum);
                console.log("pageCount : ", pageCount);
                console.log("pageNoNum : ", pageNoNum);
                console.log("pageSize : ", pageSize);*/

        if (showPage !== 1) {
            if (pageNoNum === 0) { // 초기화 된 상태
                this.setState({
                    pageCount: pageSize,
                    pageNoNum: pageSize - 1,
                    page: pageSize - 1,
                    showPage: showPage - 1,
                });

                const dispatchVal = ({
                    deviceType: assetState.deviceType,
                    checkPageNumCount: Number(checkPageNumCount),
                    orderBy,
                    order,
                    rowsPerPage,
                    showPage,
                    overNum,
                });

                dispatch(fetchPostsCheckCount(dispatchVal));
            } else {
                this.setState({
                    pageCount: pageCount - 1,
                    pageNoNum: pageNoNum - 1,
                    page: pageNoNum - 1,
                    showPage: showPage - 1,
                });
            }
        }

        /*        console.log("overPageCheck : ", overPageCheck);
                console.log("pageMaxCount : ", pageMaxCount);
                console.log("showPage : ", showPage);
                console.log("page : ", page);*/

        /*if (showPage !== 1) {
            const checkPageNumCount = (showPage - 1) * rowsPerPage;
            const backPage = checkPageNumCount / overNum;

/!*            console.log("backPage : ", backPage);
            console.log("checkPageNumCount : ", checkPageNumCount);
            console.log("checkPageNumCount % overNum : ", checkPageNumCount % overNum);
            console.log("0 이면 Number(pageMaxCount) - page : ", Number(pageMaxCount) - page);
            console.log("0 이 아니면 Number(page) - 1 : ", Number(page) - 1);
            //console.log("assetState.frontPage.oriPage : ", assetState.frontPage.oriPage);*!/


            if (checkPageNumCount % overNum === 0) { // overNum의 배수일때
                const dispatchVal = ({
                    deviceType: assetState.deviceType,
                    checkPageNumCount: Number(checkPageNumCount),
                    orderBy,
                    order,
                    rowsPerPage,
                    showPage,
                    overNum,
                });

                dispatch(fetchPostsCheckCount(dispatchVal));

                this.setState({
                    page: Number(pageMaxCount) - page,
                    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
                    showPage: this.state.showPage - 1,
                    checkCount: Number(checkPageNumCount),
                    overPageCheck: true,
                });

                if (overNum < checkPageNumCount) {
                    this.setState({
                        page: Number(backPage) - 1,
                    });
                }
                console.log(overNum, "(overNum) < ", checkPageNumCount, "(checkPageNumCount) : ", overNum < checkPageNumCount);
                console.log("0 이 아니면 Number(page) - 1 : ", Number(page) - 1);
            } else {
                let pageMin = Number(page) - 1;

                if (pageMin < 0) {
                    pageMin = 0;
                }

                this.setState({
                    overPageCheck: false,
                    page: pageMin,
                    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
                    showPage: this.state.showPage - 1,
                    checkCount: Number(checkPageNumCount),
                });
            }
        }*/
        // console.log("👔 end------------------------------------> 이전");
    };

    handleChangePage = (event, page) => {
        // console.log("👣 start------------------------------------> 다음");
        const {assetState, dispatch} = this.props;
        const {
            orderBy, rowsPerPage, order, showPage,
            pageCount, pageSize, pageNoNum,
        } = this.state;
        const checkPageNumCount = (showPage + 1) * rowsPerPage;

        this.setState({
            pageCount: pageCount + 1,
            pageNoNum: pageNoNum + 1,
            showPage: showPage + 1,
            page: pageNoNum + 1,
        });
        const changePageCount = pageCount + 1;
        /*        console.log("showPage : ", showPage);

                console.log("changePageCount : ", changePageCount);
                console.log("pageCount : ", pageCount);
                console.log("pageNoNum : ", pageNoNum);
                console.log("pageSize : ", pageSize);

                console.log("~~~", pageCount === pageSize, "~~~");
                console.log("true : 초기화");
                console.log("false : 유지");*/

        if (pageCount === pageSize) {
            this.setState({
                pageCount: 1,
                pageNoNum: 0,
                page: 0,
            });

            const dispatchVal = ({
                deviceType: assetState.deviceType,
                checkPageNumCount: Number(checkPageNumCount),
                orderBy,
                order,
                rowsPerPage,
                showPage,
                overNum,
            });

            dispatch(fetchPostsCheckCount(dispatchVal));
        }

        //console.log("pageCount count : ", this.setState({pageCount: pageCount + 1}));

        /*this.setState({
            page: Number(page),
            // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
            showPage: this.state.showPage + 1,
            checkCount: Number(checkPageNumCount),
        });

        if (checkPageNumCount % overNum === 0) { // overNum의 배수일때
            this.setState({
                pageMaxCount: Number(showPage),
                overPageCheck: true,
            });
        } else {
            this.setState({
                overPageCheck: false,
            });
        }

        /!*        console.log("start------------------------------------>handleChangePage");
                console.log("NEXT overPageCheck : ", overPageCheck);
                console.log("NEXT checkPageNumCount : ", checkPageNumCount);
                console.log("end------------------------------------>handleChangePage");*!/

        if (overPageCheck === true) {
            this.setState({
                page: 0,
                checkCount: Number(checkPageNumCount),
            });

            const dispatchVal = ({
                deviceType: assetState.deviceType,
                checkPageNumCount: Number(checkPageNumCount),
                orderBy,
                order,
                rowsPerPage,
                showPage,
                overNum,
            });

            dispatch(fetchPostsCheckCount(dispatchVal));
        } else {
            console.log("overPageCheck false");
        }*/
        // console.log("👣 end------------------------------------> 다음");
    };

    handleChangeRowsPerPage = (event) => {
        const {assetState, dispatch} = this.props;
        const {
            orderBy, rowsPerPage, order,
        } = this.state;

        this.setState({
            page: 0,
            showPage: 1,
            rowsPerPage: Number(event.target.value),
            pageCount: 1,
            pageSize: overNum / Number(event.target.value),
            pageNoNum: 0,
        });

        const dispatchVal = ({
            deviceType: assetState.deviceType,
            orderBy,
            order,
            rowsPerPage,
            overNum,
        });

        dispatch(fetchPosts(dispatchVal));
    };

    isSelected = (id) => {
        const {selected} = this.state;
        return !!selected.get(id);
    };

    toggle = (e) => {
        this.setState(prevState => ({isOpenView: !prevState.isOpenView}));
    };

    setDeviceIdx = (event, deviceCode) => {
        const {dispatch, assetState} = this.props;

        dispatch(getDeviceByIdx(deviceCode, assetState.deviceType));

        this.setComponents('read', deviceCode);
    };

    setComponents = (division, deviceCode) => {
        const {dispatch, assetState} = this.props;

        let tempViewModalContent;

        let checkDeviceCode = deviceCode;

        if (deviceCode === undefined) {
            checkDeviceCode = 'temp';
        }

        switch (division) {
            case 'read':
                tempViewModalContent = (
                    <AssetsView closeToggle={this.toggle}
                                title="장비 확인" message="자산관리 > 장비 확인 페이지 입니다." deviceCode={checkDeviceCode}
                                assetState={assetState} dispatch={dispatch} setTotalManager={this.setTotalManager}
                    />
                );
                break;
            case "update":
                tempViewModalContent = (
                    <AssetsEdit closeToggle={this.toggle}
                                title="장비 확인" message="자산관리 > 장비 확인 페이지 입니다." deviceCode={checkDeviceCode}
                                assetState={assetState} dispatch={dispatch} setTotalManager={this.setTotalManager}
                    />
                );
                break;
            default:
                tempViewModalContent = 'test';
                break;
        }

        this.setState({
            viewModalContent: tempViewModalContent,
        });
    };

    componentDidUpdate = (prevProps, prevState) => {
        const {assetState, dispatch} = this.props;
        if (assetState !== prevProps.assetState) {
            this.setComponents('read');
            console.log("♡ LIST componentDidUpdate");
        }
    };

    render() {
        const {
            order, orderBy, selected, rowsPerPage, page, viewModalContent, modal, showPage,
            pageCount, pageSize, pageNoNum, isOpenView, isOpenWrite,
        } = this.state;
        const {assetState, dispatch} = this.props;

        const tableCellClassName = 'material-table__cell material-table__cell-right';

        const modalClass = classNames({
            'assets_write__modal-dialog': true,
            'assets_write__modal-dialog--colored': false,
            'assets_write__modal-dialog--header': false,
        });

        //TODO length 값 0 일때도 처리해야함

        //console.log("😼render modal : ", modal);

        const deviceServer = (
            <Fragment>
                <TableBody>
                    {assetState.devices
                        .sort(getSorting(order, orderBy))
                        .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                        .map((d, index) => {
                            const isSelected = this.isSelected(d.DeviceCode);

                            return (
                                <TableRow
                                    key={d.DeviceCode}
                                    className="material-table__row"
                                    role="checkbox"
                                    aria-checked={isSelected}
                                    tabIndex={-1}
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
                        {/*장비 상세*/}
                        <Modal
                            isOpen={isOpenView}
                            modalClassName="ltr-support"
                            className={`assets_write__modal-dialog 
                            assets_write__modal-dialog ${modalClass}`}
                        >
                            {viewModalContent}
                        </Modal>
                        {/*장비 등록*/}
                        <Modal
                            isOpen={isOpenWrite}
                            modalClassName="ltr-support"
                            className={`assets_write__modal-dialog 
                            assets_write__modal-dialog ${modalClass}`}
                        >
                            <AssetsWrite closeToggle={this.toggle}
                                        title="장비 확인" message="자산관리 > 장비 확인 페이지 입니다." />
                        </Modal>
                        <TablePagination
                            component="div"
                            className="material-table__pagination"
                            count={Number(assetState.page.Count)}
                            rowsPerPage={rowsPerPage}
                            page={pageNoNum}
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
                                ({to, count}) => (
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
