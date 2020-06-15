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
import moment from "moment";
import classNames from "classnames";

import {changeMenuTitle} from '../../../../redux/actions/titleActions';
import {
    getDeviceByIdx,
    postDeviceComment,
    fetchPosts,
    fetchPostsCheckCount,
    getDeviceOriByIdx,
    setViewModalDivision, postDevice,
    setDeviceSelected,
} from '../../../../redux/actions/assetsAction';

import AssetsHead from './AssetsHead';
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
        orderBy: 'deviceCode',
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
            registerId: 'lkb',
            contents: data.comment,
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

    handleSubmit = (values) => {
        const {assetState, dispatch} = this.props;

        let division = '|';
        let divisionCount = 0;
        let IpArray = '';
        let SplaArray = '';
        let rentDataStart;
        let rentDataEnd;
        let rentData = '|';
        let warehousingDate = '';

        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const arrData in assetState.deviceIp) {
            if (assetState.deviceIp[arrData] !== '') {
                if (divisionCount <= 0) {
                    division = '';
                } else {
                    division = '|';
                }

                divisionCount += 1;
                IpArray = `${IpArray}${division}${assetState.deviceIp[arrData]}`;
            }
        }

        divisionCount = 0;
        IpArray = `${IpArray}|`;

        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const arrData in assetState.deviceSpla) {
            if (assetState.deviceSpla[arrData] !== '') {
                if (divisionCount <= 0) {
                    division = '';
                } else {
                    division = '|';
                }

                divisionCount += 1;
                SplaArray = `${SplaArray}${division}${assetState.deviceSpla[arrData]}`;
            }
        }

        SplaArray = `${SplaArray}|`;

        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const arrData in values) {
            //console.log("arrData : ", arrData, ", value : ", values[arrData]);
            if (arrData.indexOf("rentDate") !== -1) {
                //console.log("arrData : ", arrData, ", value : ", values[arrData]);
                //console.log("start : ", values[arrData].start, ", end : ", values[arrData].end);
                if (values[arrData].start !== undefined) {
                    rentDataStart = moment(values[arrData].start).format("YYYYMMDD");
                    rentDataEnd = `|${moment(values[arrData].end).format("YYYYMMDD")}`;
                    rentData = `${rentDataStart}${rentDataEnd}`;
                } else if (values[arrData] !== '' && values[arrData] !== undefined) {
                    rentData = values[arrData];
                } else {
                    rentData = "|";
                }
            } else if (arrData.indexOf("warehousingDate") !== -1) {
                warehousingDate = moment(values[arrData]).format("YYYYMMDD");
            }
        }

        warehousingDate = warehousingDate.toString();

        let rackLog;

        if (values.rackLoc !== undefined) {
            rackLog = values.rackLoc.toString();
        } else {
            rackLog = 0;
        }

        const submitData = ({
            deviceCode: values.deviceCode,
            idx: values.idx,
            outFlag: '',
            commentCnt: '',
            commentLastDate: '',
            registerId: 'lkb',
            registerDate: '',
            model: values.model,
            contents: values.contents,
            customer: values.customer,
            manufacture: values.manufacture,
            deviceType: values.deviceType,
            ownership: values.ownership,
            ownershipDiv: values.ownershipDiv,
            ownerCompany: values.ownerCompany,
            hwSn: values.hwSn,
            idc: values.idc,
            rack: values.rack,
            cost: values.cost,
            purpose: values.purpose,
            size: values.size,
            cpu: values.cpu,
            memory: values.memory,
            hdd: values.hdd,
            rackTag: values.rackTag,
            rackLog,
            ip: IpArray,
            spla: SplaArray,
            rentDate: rentData,
            warehousingDate,
            monitoringFlag: '',
            monitoringMethod: '',
            rackCode: values.rackCode,
            firmwareVersion: values.firmwareVersion,
            warranty: values.warranty,
        });

        console.log("UPDATE 🙊🙊🙊 가공 전 : ", values);
        console.log("UPDATE 🙊🙊🙊 가공 후 : ", submitData);
        dispatch(postDevice('update', assetState, submitData));
        this.toggle();
        //dispatch(fetchPosts(assetState));
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

        dispatch(fetchPosts(assetState));
    };

    handleSelectAllClick = (event, checked) => {
        console.log("💎 handleSelectAllClick  checked: ", checked);
        if (checked) {
            const {assetState} = this.props;
            const newSelected = new Map();
            assetState.devices.map(n => newSelected.set(n.deviceCode, true));
            this.setState({selected: newSelected});
            return;
        }
        this.setState({selected: new Map([])});
    };

    handleClick = (event, id) => {
        const {dispatch} = this.props;
        const {selected} = this.state;
        const newSelected = new Map(selected);
        const value = newSelected.get(id);
        let isActive = true;
        if (value) {
            isActive = false;
        }
        newSelected.set(id, isActive);
        this.setState({selected: newSelected});
        dispatch(setDeviceSelected(newSelected));
    };

    handleChangePageBackOld = () => {
        const {assetState, dispatch} = this.props;
        const {
            orderBy, rowsPerPage, order, showPage, page,
            pageCount, pageSize, pageNoNum,
        } = this.state;
        const checkPageNumCount = (showPage - 1) * rowsPerPage;

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
                    outFlag: assetState.deviceOutFlag,
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
    };

    handleChangePageBack = () => {
        const {assetState, dispatch} = this.props;
        const {
            orderBy, rowsPerPage, order, showPage, page,
            pageCount, pageSize, pageNoNum,
        } = this.state;
        const checkPageNumCount = (showPage - 1) * rowsPerPage;

        console.log("👔 start------------------------------------> 이전");
        console.log("showPage : ", showPage);
        // console.log("changePageCount : ", changePageCount);
        // console.log("changePageNoNum : ", changePageNoNum);
        console.log("pageCount : ", pageCount);
        console.log("pageNoNum : ", pageNoNum);
        console.log("pageSize : ", pageSize);

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
                    outFlag: assetState.deviceOutFlag,
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
        console.log("👔 End------------------------------------> 이전");
        console.log("showPage : ", showPage);
        // console.log("changePageCount : ", changePageCount);
        // console.log("changePageNoNum : ", changePageNoNum);
        console.log("pageCount : ", pageCount);
        console.log("pageNoNum : ", pageNoNum);
        console.log("pageSize : ", pageSize);
    };

    handleChangePage = (event, page) => {
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

        /*console.log("pageCount : ", pageCount);
        console.log("pageSize : ", pageSize);*/
        // TODO overNum 처리 필요~
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
                outFlag: assetState.deviceOutFlag,
            });

            dispatch(fetchPostsCheckCount(dispatchVal));
        }
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

        dispatch(fetchPosts(assetState));
    };

    isSelected = (id) => {
        const {selected} = this.state;
        return !!selected.get(id);
    };

    toggle = (e) => {
        this.setState(prevState => ({isOpenView: !prevState.isOpenView}));
    };

    updateToggle = (deviceCode) => {
        const {dispatch, assetState} = this.props;
        this.setState({
            viewModalContentDivision: 'update',
        });
        this.setComponents('update');
        dispatch(setViewModalDivision('update'));
    };

    setDeviceIdx = (event, deviceCode) => {
        const {dispatch, assetState} = this.props;

        dispatch(getDeviceByIdx(deviceCode, assetState.deviceType));
        dispatch(getDeviceOriByIdx(deviceCode, assetState.deviceType));

        this.setComponents('read', deviceCode);
    };

    setComponents = (division, deviceCode) => {
        //console.log("👑 setComponents : ", division);
        const {dispatch, assetState} = this.props;

        let tempViewModalContent;
        let checkDivision;

        let checkDeviceCode = deviceCode;

        if (deviceCode === undefined) {
            checkDeviceCode = 'temp';
        }

        // todo checkDeviceCode 사용 여부 확인 필요
        switch (division) {
            case 'read':
                tempViewModalContent = (
                    <AssetsView closeToggle={this.toggle}
                                updateToggle={this.updateToggle}
                                title="장비 확인" message="자산관리 > 장비 확인 페이지 입니다." deviceCode={checkDeviceCode}
                                assetState={assetState} dispatch={dispatch}
                                setTotalManager={this.setTotalManager}
                    />
                );
                break;
            case "update":
                tempViewModalContent = (
                    <AssetsEdit closeToggle={this.toggle}
                                title="장비 확인" message="자산관리 > 장비 수정 페이지 입니다."
                                assetState={assetState} dispatch={dispatch}
                                setTotalManager={this.setTotalManager}
                                onSubmit={this.handleSubmit}
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
            this.setComponents(assetState.viewModalDivison);
        }
    };

    render() {
        //console.log("👉👉👉👉👉👉👉👉 render start list");
        const {
            order, orderBy, selected, rowsPerPage, page, viewModalContent, modal, showPage,
            pageCount, pageSize, pageNoNum, isOpenView, isOpenWrite, viewModalContentDivision,
        } = this.state;
        const {assetState, dispatch} = this.props;

        const tableCellClassName = 'material-table__cell material-table__cell-right';

        const modalClass = classNames({
            'assets_write__modal-dialog': true,
            'assets_write__modal-dialog--colored': false,
            'assets_write__modal-dialog--header': false,
        });

        //TODO length 값 0 일때도 처리해야함

        const deviceServer = (
            <Fragment>
                <TableBody>
                    {assetState.devices
                        .sort(getSorting(order, orderBy))
                        .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                        .map((d, index) => {
                            const isSelected = this.isSelected(d.deviceCode);
                            let ipSliceStr;

                            if (d.ip !== undefined) {
                                ipSliceStr = d.ip.replace(/\|/gi, ", ").slice(0, -2);
                            } else {
                                ipSliceStr = "";
                            }

                            return (
                                <TableRow
                                    key={d.deviceCode}
                                    className="material-table__row"
                                    role="checkbox"
                                    aria-checked={isSelected}
                                    tabIndex={-1}
                                    selected={isSelected}
                                >
                                    <TableCell className="material-table__cell"
                                               padding="checkbox"
                                               onClick={event => this.handleClick(event, d.deviceCode)}>
                                        <Checkbox checked={isSelected}
                                                  className="material-table__checkbox"/>
                                    </TableCell>
                                    {/*<TableCell
                                        className={tableCellClassName}
                                    >No
                                        {d.Idx}
                                    </TableCell>*/}
                                    <TableCell
                                        className={tableCellClassName}
                                        onClick={event => this.setDeviceIdx(event, d.deviceCode)}
                                    >{/*장비코드*/}
                                        <b className="text_cor_green mouse_over_list">
                                            <div className="assets_add_modal_div" onClick={this.toggle}
                                                 onKeyDown={this.toggle}
                                                 role="button" tabIndex="0"><span
                                                className="circle__ste"/>{d.deviceCode}</div>
                                        </b>
                                    </TableCell>
                                    <TableCell
                                        className={tableCellClassName}
                                    >{/*구분*/}{d.deviceType}
                                    </TableCell>
                                    <TableCell
                                        className={tableCellClassName}
                                    >{/*제조사*/}{d.manufacture}
                                    </TableCell>
                                    <TableCell
                                        className={tableCellClassName}
                                    >{/*모델명*/}{d.model}
                                    </TableCell>
                                    <TableCell
                                        className={tableCellClassName}
                                    >{/*소유권*/}{d.ownership}
                                    </TableCell>
                                    <TableCell
                                        className={tableCellClassName}
                                    >{/*소유권구분*/}{d.ownerCompany}
                                    </TableCell>
                                    <TableCell
                                        className={tableCellClassName}
                                    >{/*고객사*/}
                                        {d.customerName}
                                        {/*<b className="text_cor_orange">{d.customerName}</b>*/}
                                        {/*<b className="text_cor_red">{d.customer}</b>*/}
                                    </TableCell>
                                    <TableCell
                                        className={tableCellClassName}
                                    >{/*IDC/위치*/}{d.idc}/{d.rack}
                                    </TableCell>
                                    <TableCell
                                        className={tableCellClassName}
                                    >{/*용도*/}{d.purpose}
                                    </TableCell>

                                    {assetState.deviceType === 'server'
                                    && (
                                        <Fragment>
                                            <TableCell
                                                className={tableCellClassName}
                                            >{/*IP*/}{ipSliceStr}
                                            </TableCell>
                                            <TableCell
                                                className={tableCellClassName}
                                            >{/*크기*/}{d.size}
                                            </TableCell>
                                        </Fragment>
                                    )}
                                    {assetState.deviceType === 'network'
                                    && (
                                        <Fragment>
                                            <TableCell
                                                className={tableCellClassName}
                                            >{/*IP*/}{ipSliceStr}
                                            </TableCell>
                                            <TableCell
                                                className={tableCellClassName}
                                            >{/*HW S/N*/}{d.hwSn}
                                            </TableCell>
                                            <TableCell
                                                className={tableCellClassName}
                                            >{/*펌웨어*/}{d.firmwareVersion}
                                            </TableCell>
                                            <TableCell
                                                className={tableCellClassName}
                                            >{/*입고일*/}{d.warehousingDate}
                                            </TableCell>
                                        </Fragment>
                                    )}
                                    {assetState.deviceType === 'part'
                                    && (
                                        <Fragment>
                                            <TableCell
                                                className={tableCellClassName}
                                            >{/*HW S/N*/}{d.hwSn}
                                            </TableCell>
                                            <TableCell
                                                className={tableCellClassName}
                                            >{/*워런티*/}{d.warranty}
                                            </TableCell>
                                            <TableCell
                                                className={tableCellClassName}
                                            >{/*입고일*/}{d.warehousingDate}
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
                                         title="장비 확인" message="자산관리 > 장비 확인 페이지 입니다."/>
                        </Modal>
                        <TablePagination
                            component="div"
                            className="material-table__pagination"
                            count={Number(assetState.page.count)}
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
                                    <span
                                        style={{fontSize: 14}}><span>page: {showPage}</span>&nbsp;&nbsp;&nbsp; total : {count}
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
