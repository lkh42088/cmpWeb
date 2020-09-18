import React, {useEffect, useState} from "react";
import {
    Card,
    CardBody,
    Col,
} from 'reactstrap';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import {useDispatch, useSelector} from "react-redux";
import TableBody from "@material-ui/core/TableBody";
import {TableRow} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import {makeStyles} from "@material-ui/core/styles";
import {useSnackbar} from "notistack";
import {
    pagingChangeCurrentPage,
    pagingChangeCurrentPageNext,
    pagingChangeCurrentPagePrev,
    pagingChangeOrder,
    pagingChangeOrderBy,
    pagingChangeRowsPerPage,
    pagingChangeSelected,
    pagingChangeTotalCount, pagingDump,
} from "../../../../redux/actions/pagingActions";
import VmTableToolbar from "./VmTableToolbar";
import CommonTableHead from "../../../Common/CommonTableHead";
import RegisterVm from "./RegisterVm";
import {
    getMcVms, registerMcVm, unregisterMcVm,
} from "../../../../lib/api/microCloud";
import {changeVmPage} from "../../../../redux/actions/vmsActions";
import {OPERATOR} from "../../../../lib/var/globalVariable";

const headRows = [
    {id: 'idx', disablePadding: false, label: 'Index'},
    {id: 'cpName', disablePadding: false, label: '회사명'},
    {id: 'serialNumber', disablePadding: false, label: '서버 SN'},
    {id: 'name', disablePadding: false, label: 'VM 이름'},
    {id: 'cpu', disablePadding: false, label: 'CPU'},
    {id: 'ram', disablePadding: false, label: 'RAM'},
    {id: 'hdd', disablePadding: false, label: 'HDD'},
    {id: 'status', disablePadding: false, label: 'Status'},
    {id: 'network', disablePadding: false, label: 'Network'},
    {id: 'ipAddr', disablePadding: false, label: 'IP Address'},
    {id: 'remoteAddr', disablePadding: false, label: 'Remote RDP'},
];

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    rowCss: {
        '& > *': {
            borderBottom: 'unset',
        },
        "&:hover":
            theme.palette.type === 'light'
                ? {
                    boxShadow: "4px 2px 3px #999999",
                    // border: "1px solid #e0e0e0",
                    // borderRight: "1px solid #e0e0e0",
                }
                : {
                    boxShadow: "4px 2px 3px #000000",
                    // border: "1px solid #000000",
                    // borderRight: "1px solid #e0e0e0",
                },
    },
    spanSubject: {
        display: 'inline-block',
        width: '100px',
    },
    spanContents: {
        display: 'inline-block',
        // width: '200px',
    },
    grid: {
        flexGrow: 1,
    },
}));

const VmTable = () => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("user"));

    const [data, setData] = useState([]);
    const [paging, setPaging] = useState(null);
    const [openAddVm, setOpenAddVm] = useState(false);
    const [searchParam, setSearchParam] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    const dispatch = useDispatch();

    /**
     * Pagination
     */
    const {
        selected,
        pageBeginRow,
        rowsPerPage,
        currentPage,
        totalCount,
        displayRowsList,
        dense,
        orderBy,
        order,
    } = useSelector(({pagingRd}) => ({
        selected: pagingRd.selected,
        pageBeginRow: pagingRd.pageBeginRow,
        rowsPerPage: pagingRd.rowsPerPage,
        currentPage: pagingRd.currentPage,
        totalPage: pagingRd.totalPage,
        totalCount: pagingRd.totalCount,
        displayRowsList: pagingRd.displayRowsList,
        dense: pagingRd.dense,
        orderBy: pagingRd.orderBy,
        order: pagingRd.order,
    }));

    /** Dense Padding */
    const {densePadding} = useSelector(({customizer}) => ({
        densePadding: customizer.densePadding,
    }));

    /*******************
     * Pagination
     *******************/
    const updatePagingTotalCount = ({count}) => {
        if (count !== totalCount) {
            dispatch(pagingChangeTotalCount({totalCount: count}));
        }
    };

    /** Pagination */
    const handleChangePagePrev = () => {
        if (currentPage > 0) {
            dispatch(pagingChangeCurrentPagePrev());
        }
    };

    /** Pagination */
    const handleChangePageNext = () => {
        if (currentPage < totalCount) {
            dispatch(pagingChangeCurrentPageNext());
        }
    };

    /** Pagination */
    const handleChangePage = (event, newPage) => {
        console.log("change page: ", newPage);
        dispatch(pagingChangeCurrentPage({currentPage: newPage}));
    };

    /** Pagination */
    const handleChangeRowsPerPage = (e) => {
        const changeRows = Number(e.target.value);
        dispatch(pagingChangeRowsPerPage({rowsPerPage: changeRows}));
    };

    /** Pagination */
    const handleClick = (event, id) => {
        const newSelected = new Map(selected);
        const value = newSelected.get(id);
        let isActive = true;
        if (value) {
            isActive = false;
        }
        newSelected.set(id, isActive);
        dispatch(pagingChangeSelected({selected: newSelected}));
    };

    /** Pagination */
    const handleSelectAllClick = (event, checked) => {
        const newSelected = new Map();
        if (checked) {
            data.map(n => newSelected.set(n.idx, true));
        } else {
            data.map(n => newSelected.set(n.idx, false));
        }
        dispatch(pagingChangeSelected({selected: newSelected}));
    };

    /** Pagination */
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        const changeOrder = isAsc ? "desc" : "asc";
        if (property !== "collapse") {
            dispatch(pagingChangeOrder({order: changeOrder}));
            dispatch(pagingChangeOrderBy({orderBy: property}));
        }
    };

    /** Pagination */
    const getSelected = id => !!selected.get(id);

    const getPageData = async () => {
        let offset = 0;
        if (currentPage > 0) {
            offset = rowsPerPage * currentPage;
        }
        let companyName;
        if (user.level <= OPERATOR) { //관리자
            companyName = "all";
        } else {
            companyName = user.cpName;
        }
        try {
            console.log("companyName : ", companyName);
            const response = await getMcVms({
                rows: rowsPerPage, offset, orderBy, order, cpName: companyName,
            });
            console.log("response: data ", response.data.data);
            console.log("response: page ", response.data.page);
            setData(response.data.data);
            setPaging(response.data.page);
        } catch (e) {
            console.log("getPageData error!");
        }
    };

    const handleOpenAddVm = () => {
        setOpenAddVm(true);
    };

    const handleCloseAddVm = () => {
        setOpenAddVm(false);
    };

    const handleSnackbarFailure = (snackMsg) => {
        enqueueSnackbar(snackMsg);
    };

    const handleSnackbarSuccess = (snackMsg) => {
        enqueueSnackbar(snackMsg, { variant: "success" });
    };

    const asyncAddVm = async (vm) => {
        const {
            name, cpIdx, serialNumber, serverIdx, cpu, ram, hdd, image, imageName, os, networkName,
        } = vm;
        try {
            const response = await registerMcVm({
                name,
                cpIdx,
                serialNumber,
                serverIdx,
                // eslint-disable-next-line radix
                cpu: parseInt(cpu),
                // eslint-disable-next-line radix
                ram: parseInt(ram),
                // eslint-disable-next-line radix
                hdd: parseInt(hdd),
                image: imageName,
                os,
                network: networkName,
            });
            handleSnackbarSuccess("VM 등록에 성공하였습니다.");
            getPageData();
        } catch (e) {
            handleSnackbarFailure("VM 등록에 실패하였습니다.");
        }
    };

    const handleSubmitAddVm = (vm) => {
        console.log("handleSubmit() : vm", vm);
        asyncAddVm(vm);
        handleCloseAddVm();
    };

    const handleSubmitSearch = (params) => {
        console.log("handleSubmitSearch() params ", params);
        setSearchParam(params);
    };

    /** Pagination */
    const handleRefresh = () => {
        getPageData();
    };

    const deleteData = async (items) => {
        try {
            const response = await unregisterMcVm({idx: items});
            getPageData();
            handleSnackbarSuccess("VM 삭제에 성공하였습니다.");
        } catch (error) {
            getPageData();
            handleSnackbarFailure("VM 삭제에 실패하였습니다.");
        }
    };

    const handleDeleteSelected = () => {
        let copyData = [...data];
        console.log("deleted Selected:");
        console.log("copyData:", copyData);
        console.log("SELECTED:", selected);
        const delList = [];
        if (selected !== null) {
            selected.forEach((value, key, mapObject) => {
                console.log("selected: key ", key, ", value ", value);
                if (value) {
                    delList.push(key);
                }
            });
        }
        console.log("delList: ", delList);
        deleteData(delList);

        for (let i = 0; i < [...selected].filter(el => el[1]).length; i += 1) {
            copyData = copyData.filter(obj => obj.id !== selected[i]);
        }
        console.log("after copyData:", copyData);
    };

    const handleVmPage = (idx) => {
        const res = data.filter(item => item.idx === idx);
        console.log(`idx:${idx}, res:${res}`);
        dispatch(changeVmPage({ pageType: 'page', data: res[0]}));
    };

    useEffect(() => {
        /** Pagination */
        getPageData();
        dispatch(pagingDump());
    }, [rowsPerPage, pageBeginRow, orderBy, order]);

    useEffect(() => {
        if (paging) {
            const {count} = paging;
            updatePagingTotalCount({count});
        }
    }, [paging]);

    const ContentsRow = (props) => {
        const {row} = props;
        const isSelected = getSelected(row.idx);
        const cellClassName = "cb-material-table__cell";
        const cellIcon = isSelected ? "cb-material-table__cell-right" : cellClassName;
        const [openCollapse, setOpenCollapse] = useState(false);
        const [checkboxColor, setCheckboxColor] = useState('');
        return (
            <React.Fragment>
                <TableRow
                    hover
                    // className="cb-material-table__row"
                    className={classes.rowCss}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={row.idx}
                    selected={isSelected}
                    onClick={() => setOpenCollapse(!openCollapse)}
                    onMouseOver={() => {
                        if (isSelected === false) {
                            setCheckboxColor('#737883');
                        }
                    }}
                    onFocus={() => {
                        if (isSelected === false) {
                            setCheckboxColor('#737883');
                        }
                    }}
                    onMouseLeave={() => {
                        if (isSelected === false) {
                            setCheckboxColor('#dddddd');
                        }
                    }}
                >
                    <TableCell
                        className={cellClassName}
                        padding="checkbox"
                        onClick={event => handleClick(event, row.idx)}
                    >
                        <Checkbox checked={isSelected}
                                  className="cb-material-table__checkbox"
                                  style={{
                                      color: `${checkboxColor}`,
                                  }}
                        />
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "10%"}}
                    >
                        {row.idx}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "15%"}}
                    >
                        {row.cpName}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "15%"}}
                    >
                        {row.serialNumber}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "10%"}}
                    >
                        <b className="text_cor_green mouse_over_list">
                            <div className="assets_add_modal_div"
                                 onClick={event => handleVmPage(row.idx)}
                                 onKeyDown={event => handleVmPage(row.idx)}
                                 role="button" tabIndex="0"><span className="circle__ste"/>
                                {row.name} </div>
                        </b>
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "10%"}}
                    >
                        {row.cpu}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "10%"}}
                    >
                        {row.ram}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "10%"}}
                    >
                        {row.hdd}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "10%"}}
                    >
                        {row.currentStatus}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "20%"}}
                    >
                        {row.network}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "20%"}}
                    >
                        {row.ipAddr}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "20%"}}
                    >
                        {row.remoteAddr}
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    };

    return (
        <Col md={12} lg={12}>
            <Card className="cb-card">
                <CardBody className="cb-card-body">
                    <VmTableToolbar
                        numSelected={[...selected].filter(el => el[1]).length}
                        handleDeleteSelected={handleDeleteSelected}
                        handleRefresh={handleRefresh}
                        onRequestSort={handleRequestSort}
                        rows={headRows}
                        handleOpen={handleOpenAddVm}
                        handleSubmitSearch={handleSubmitSearch}
                        contents="VM"
                        count={totalCount}
                        rowsPerPage={rowsPerPage}
                        page={currentPage}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        rowsPerPageOptions={displayRowsList}
                    />
                    <div className="cb-material-table__wrap">
                        <TableContainer>
                            <Table
                                className="cb-material-table"
                                size={densePadding ? 'small' : 'medium'}
                            >
                                <CommonTableHead
                                    classes={classes}
                                    numSelected={[...selected].filter(el => el[1]).length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={data && data.length ? data.length : 0}
                                    rows={headRows}
                                />
                                <TableBody>
                                    { data && data.map((row, index) => {
                                        const keyId = index;
                                        return (
                                            <ContentsRow key={keyId} row={row} />
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <RegisterVm
                        open={openAddVm}
                        handleClose={handleCloseAddVm}
                        handleSubmit={handleSubmitAddVm}
                    />
                </CardBody>
            </Card>
        </Col>
    );
};

export default VmTable;
