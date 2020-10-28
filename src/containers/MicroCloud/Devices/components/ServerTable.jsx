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
import CommonTableHead from "../../../Common/CommonTableHead";
import ServerTableToolbar from "./ServerTableToolbar";
import RegisterServer from "./RegisterServer";
import ModifyServer from "./ModifyServer";
import {
    getMcServers, registerMcServer, unregisterMcServer, modifyMcServer,
} from "../../../../lib/api/microCloud";
import {OPERATOR} from "../../../../lib/var/globalVariable";

const headRows = [
    {id: 'idx', disablePadding: false, label: 'Index'},
    {id: 'sn', disablePadding: false, label: '시리얼넘버'},
    {id: 'company', disablePadding: false, label: '회사명'},
    {id: 'status', disablePadding: false, label: '상태'},
    {id: 'vms', disablePadding: false, label: 'VM 개수'},
    {id: 'ipaAddr', disablePadding: false, label: 'Internal IP'},
    {id: 'publicIp', disablePadding: false, label: 'Public IP'},
    {id: 'domainPrefix', disablePadding: false, label: 'Domain Prefix'},
    {id: 'domainId', disablePadding: false, label: 'Domain Id'},
    {id: 'domainPassword', disablePadding: false, label: 'Domain Password'},
    {id: 'button', disablePadding: false, label: ''},
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
                }
                : {
                    boxShadow: "4px 2px 3px #000000",
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

const ServerTable = () => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("user"));

    const [data, setData] = useState([]);
    const [paging, setPaging] = useState(null);
    const [openAddServer, setOpenAddServer] = useState(false);
    const [openEditServer, setOpenEditServer] = useState(false);
    const [searchParam, setSearchParam] = useState(null);
    const {enqueueSnackbar} = useSnackbar();
    const [modifyData, setModifyData] = React.useState(null);

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
        try {
            let companyName;
            if (user.level <= OPERATOR) { //관리자 & 운영자
                companyName = "all";
            } else {
                companyName = user.cpName;
            }
            const response = await getMcServers({
                rows: rowsPerPage, offset, orderBy, order, cpName: companyName,
            });
            setData(response.data.data);
            setPaging(response.data.page);
        } catch (e) {
            console.log("getPageData error!");
        }
    };

    const handleOpenAddServer = () => {
        setOpenAddServer(true);
    };

    const handleCloseAddServer = () => {
        setOpenAddServer(false);
    };

    const handleOpenEditServer = () => {
        setOpenEditServer(true);
    };

    const handleCloseEditServer = () => {
        setOpenEditServer(false);
    };

    const handleSnackbarFailure = (snackMsg) => {
        enqueueSnackbar(snackMsg);
    };

    const handleSnackbarSuccess = (snackMsg) => {
        enqueueSnackbar(snackMsg, { variant: "success" });
    };

    const asyncAddServer = async (server) => {
        const {
            cpIdx, cpName, serialNumber, type, ipAddr,
            registerType, domainPrefix, domainId, domainPassword,
            accessKey, secretKey, projectId, ktDomainId, nasUrl, nasId, nasPassword,
        } = server;
        try {
            const response = await registerMcServer({
                cpIdx,
                cpName,
                serialNumber,
                type,
                ipAddr,
                registerType,
                domainPrefix,
                domainId,
                domainPassword,
                accessKey,
                secretKey,
                projectId,
                ktDomainId,
                nasUrl,
                nasId,
                nasPassword,
            });
            handleSnackbarSuccess("서버 등록에 성공하였습니다.");
            getPageData();
        } catch (e) {
            handleSnackbarFailure("서버 등록에 실패하였습니다.");
        }
    };

    const asyncEditServer = async (server) => {
        const {
            idx, type, ipAddr,
            registerType, domainPrefix, domainId, domainPassword,
            accessKey, secretKey, projectId, ktDomainId, nasUrl, nasId, nasPassword,
        } = server;
        console.log("★★★★ asyncEditServer : ", server);
        try {
            const response = await modifyMcServer({
                idx,
                type,
                ipAddr,
                registerType,
                domainPrefix,
                domainId,
                domainPassword,
                accessKey,
                secretKey,
                projectId,
                ktDomainId,
                nasUrl,
                nasId,
                nasPassword,
            });
            handleSnackbarSuccess("서버 수정에 성공하였습니다.");
            getPageData();
        } catch (e) {
            handleSnackbarFailure("서버 수정에 실패하였습니다.");
        }
    };

    const handleSubmitAddServer = (server) => {
        asyncAddServer(server);
        handleCloseAddServer();
    };

    const handleSubmitEditServer = (server) => {
        asyncEditServer(server);
        handleCloseEditServer();
    };

    const handleSubmitSearch = (params) => {
        setSearchParam(params);
    };

    const handleModifySelectedServer = (idx) => {
        const res = data.filter(item => item.idx === idx);
        setModifyData(res[0]);
        handleOpenEditServer();
    };

    /** Pagination */
    const handleRefresh = () => {
        getPageData();
    };

    const deleteData = async (items) => {
        try {
            const response = await unregisterMcServer({idx: items});
            getPageData();
            handleSnackbarSuccess("Server 삭제에 성공하였습니다.");
        } catch (error) {
            getPageData();
            handleSnackbarFailure("Server 삭제에 실패하였습니다.");
        }
    };

    const handleDeleteSelected = () => {
        let copyData = [...data];
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
                        className="cb-material-table__checkbox"
                        padding="checkbox"
                        onClick={event => handleClick(event, row.idx)}
                        style={{width: "5%"}}
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
                        style={{width: "5%"}}
                    >
                        {row.idx}
                       {/* <b className="text_cor_green mouse_over_list_blue">
                                    <div className="assets_add_modal_div"
                                         onClick={event => handleModifySelectedServer(row.idx)}
                                         onKeyDown={event => handleModifySelectedServer(row.idx)}
                                         role="button" tabIndex="0"><span className="circle__ste"/>
                                        Edit
                                    </div>
                                </b>*/}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "10%"}}
                    >
                        {row.serialNumber}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "10%"}}
                    >
                        {row.cpName}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "5%"}}
                    >
                        {row.status ? "Active" : "InActive"}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "5%"}}
                    >
                        {row.vmCount}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "10%"}}
                    >
                        {row.ipAddr}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "10%"}}
                    >
                        {row.publicIp}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "5%"}}
                    >
                        {row.domainPrefix}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "5%"}}
                    >
                        {row.domainId}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "10%"}}
                    >
                        {row.domainPassword}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "5%"}}>
                        <b className="text_cor_green mouse_over_list_blue">
                            <div className="assets_add_modal_div"
                                 onClick={event => handleModifySelectedServer(row.idx)}
                                 onKeyDown={event => handleModifySelectedServer(row.idx)}
                                 role="button" tabIndex="0"><span className="circle__ste"/>
                                Edit
                            </div>
                        </b>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    };

    return (
        <Col md={12} lg={12}>
            <Card className="cb-card">
                <CardBody className="cb-card-body">
                    <ServerTableToolbar
                        numSelected={[...selected].filter(el => el[1]).length}
                        handleDeleteSelected={handleDeleteSelected}
                        handleRefresh={handleRefresh}
                        onRequestSort={handleRequestSort}
                        rows={headRows}
                        handleOpen={handleOpenAddServer}
                        handleSubmitSearch={handleSubmitSearch}
                        contents="서버"
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
                    <RegisterServer
                        open={openAddServer}
                        user={user}
                        handleClose={handleCloseAddServer}
                        handleSubmit={handleSubmitAddServer}
                    />
                    <ModifyServer
                        open={openEditServer}
                        user={user}
                        handleClose={handleCloseEditServer}
                        handleSubmit={handleSubmitEditServer}
                        data={modifyData}
                    />
                </CardBody>
            </Card>
        </Col>
    );
};

export default ServerTable;
