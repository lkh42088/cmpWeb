import React, {useEffect, useState} from "react";
import {Card, CardBody, Col} from 'reactstrap';
import Avatar from "react-avatar";

import moment from "moment";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import {useDispatch, useSelector} from "react-redux";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableContainer from "@material-ui/core/TableContainer";
import Collapse from '@material-ui/core/Collapse';
import {makeStyles} from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import GroupIcon from '@material-ui/icons/Group';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {IconButton, Tooltip} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {useSnackbar} from "notistack";
import {
    pagingChangeCurrentPage,
    pagingChangeCurrentPageNext,
    pagingChangeCurrentPagePrev,
    pagingChangeDense,
    pagingChangeOrder,
    pagingChangeOrderBy,
    pagingChangeOrderByWithReset,
    pagingChangeRowsPerPage,
    pagingChangeSelected,
    pagingChangeTotalCount,
    pagingDump, pagingSetLog,
} from "../../../../redux/actions/pagingActions";
import {
    getUserList, getUserListWithSearchParam, initRegisterUser,
    setUserPage, setUserIdx, setUser,
} from "../../../../redux/actions/usersActions";

import CommonTableHead from "../../../Common/CommonTableHead";
import RegisterUserPage from "./RegisterUserPage";
import {modifyUser, registerUser, unregisterUser} from "../../../../lib/api/users";
import UserTableToolbar from "./UserTableToolbar";
import {limitLongString} from "../../../../lib/utils/utils";
import ModifyUserPage from "./ModifyUserPage";

import {API_ROUTE, API_ROUTE_SERVER_IMAGE} from "../../../../lib/api/client";

const headRows = [
    {
        id: 'idx',
        disablePadding: false,
        label: 'Index',
    },
    {
        id: 'avata',
        disablePadding: false,
        label: '아바타',
    },
    {
        id: 'userId',
        disablePadding: false,
        label: '아이디',
    },
    {
        id: 'userName',
        disablePadding: false,
        label: '이름',
    },
    {
        id: 'email',
        disablePadding: false,
        label: '이메일',
    },
    {
        id: 'cpName',
        disablePadding: false,
        label: '회사명',
    },
    {
        id: 'authlevel',
        disablePadding: false,
        label: '권한',
    },
    {
        id: 'memo',
        disablePadding: false,
        label: '메모',
    },
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
    },
    grid: {
        flexGrow: 1,
    },
}));

const UserList = () => {
    /************************************************************************************
     * Variable
     ************************************************************************************/
    const classes = useStyles();
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    /**
     * User Data
     */
    const {
        /** Paging User Data */
        data,
        getPage,
        /** Register User */
        msg,
        msgError,
    } = useSelector(({usersRd}) => ({
        /** Paging User Data */
        data: usersRd.data,
        getPage: usersRd.page,
        /** Register User */
        msg: usersRd.msg,
        msgError: usersRd.msgError,
    }));

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
        orderBy: pagingRd.orderBy,
        order: pagingRd.order,
    }));

    /** Dense Padding */
    const {
        densePadding,
        enableLogNormal,
        enableLogDetail,
    } = useSelector(({customizer}) => ({
        densePadding: customizer.densePadding,
        enableLogNormal: customizer.enableLogNormal,
        enableLogDetail: customizer.enableLogDetail,
    }));

    const [modifyData, setModifyData] = React.useState(null);
    const [openModifyUser, setOpenModifyUser] = React.useState(false);

    const [openAddUser, setOpenAddUser] = React.useState(false);
    const [searchParam, setSearchParam] = useState(null);

    /************************************************************************************
     * Function
     ************************************************************************************/
    const handleOpenModifyUser = () => {
        setOpenModifyUser(true);
    };

    const handleCloseModifyUser = () => {
        setOpenModifyUser(false);
    };

    const handleOpenAddUser = () => {
        setOpenAddUser(true);
    };

    const handleCloseAddUser = () => {
        setOpenAddUser(false);
    };

    const handleSnackbarFailure = (snackMsg) => {
        enqueueSnackbar(snackMsg);
    };

    const handleSnackbarSuccess = (snackMsg) => {
        enqueueSnackbar(snackMsg, {variant: "success"});
    };

    /*******************
     * Pagination
     *******************/

    /** Pagination */
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
        // console.log("change page: ", newPage);
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
    const getPageData = () => {
        let offset = 0;
        if (currentPage > 0) {
            offset = rowsPerPage * currentPage;
        }
        if (enableLogNormal) {
            console.log("getPageData: rows ", rowsPerPage, ", offset ", offset,
                ", orderBy ", orderBy, ", order ", order, ", searchParam ", searchParam);
        }
        if (searchParam !== null) {
            dispatch(getUserListWithSearchParam({
                rows: rowsPerPage,
                offset,
                orderBy,
                order,
                searchParam,
            }));
        } else {
            dispatch(getUserList({
                rows: rowsPerPage,
                offset,
                orderBy,
                order,
            }));
        }
    };

    const deleteUsers = async (users, avatas) => {
        try {
            const response = await unregisterUser({
                idx: users,
                avata: avatas,
            });
            getPageData();
            handleSnackbarSuccess("계정 삭제에 성공하였습니다.");
        } catch (error) {
            getPageData();
            handleSnackbarFailure("계정 삭제에 실패하였습니다.");
        }
    };

    /** Pagination */
    const handleDeleteSelected = () => {
        let copyUser = [...data];
        console.log("deleted Selected:");
        console.log("copyUser:", copyUser);
        //console.log("SELECTED:", selected);
        const delList = [];
        const delAvataList = [];
        if (selected !== null) {
            selected.forEach((value, key, mapObject) => {
                //console.log("selected: key ", key, ", value ", value);
                if (value) {
                    delList.push(key);

                    copyUser.forEach((valueSub, keySub) => {
                        //console.log("copyUser: key ", key, ", valueSub.idx ", valueSub.idx);
                        if (key === valueSub.idx) {
                            //console.log("valueSub avata : ", valueSub.avata);
                            delAvataList.push(valueSub.avata);
                        }
                    });
                }
            });
        }
        //console.log("★★★ delList: ", delList);
        deleteUsers(delList, delAvataList);

        for (let i = 0; i < [...selected].filter(el => el[1]).length; i += 1) {
            copyUser = copyUser.filter(obj => obj.id !== selected[i]);
        }
        //console.log("after copyUser:", copyUser);
    };

    /** Pagination */
    const handleChangeDense = (event) => {
        dispatch(pagingChangeDense({checked: event.target.checked}));
    };

    const handleSubmitSearch = (params) => {
        // console.log("handleSubmitSearch() params ", params);
        setSearchParam(params);
    };

    /** Pagination */
    const getSelected = id => !!selected.get(id);

    /** Pagination */
    const handleRefresh = () => {
        getPageData();
    };

    /*******************
     * Axios
     *******************/
    const asyncAddUser = async (user) => {
        const {
            cpIdx, cpName, id, password, name, email,
            cellPhone, tel, level, userZip, userAddr, userAddrDetail,
            emailAuthValue, emailAuthGroupList, memo, avata,
        } = user;
        try {
            const response = await registerUser({
                cpIdx,
                cpName,
                id,
                password,
                name,
                email,
                authLevel: Number(level),
                hp: cellPhone,
                tel,
                zipCode: userZip,
                address: userAddr,
                addressDetail: userAddrDetail,
                emailAuthFlag: emailAuthValue === "1",
                emailAuthGroupFlag: emailAuthValue === "2",
                emailAuthGroupList,
                memo,
                avata,
            });
            handleSnackbarSuccess("계정 등록에 성공하였습니다.");
            getPageData();
        } catch {
            handleSnackbarFailure("계정 등록에 실패하였습니다.");
        }
    };

    const asyncModifyUser = async (user) => {
        const {
            cpIdx, cpName, id, password, name, email,
            cellPhone, tel, level, userZip, userAddr, userAddrDetail,
            emailAuthValue, emailAuthGroupList, memo, avata,
        } = user;
        try {
            const response = await modifyUser({
                cpIdx,
                cpName,
                id,
                password,
                name,
                email,
                authLevel: Number(level),
                hp: cellPhone,
                tel,
                zipCode: userZip,
                address: userAddr,
                addressDetail: userAddrDetail,
                emailAuthFlag: emailAuthValue === "1",
                emailAuthGroupFlag: emailAuthValue === "2",
                emailAuthGroupList,
                memo,
                avata,
            });

            handleSnackbarSuccess("계정 수정이 성공하였습니다.");
            getPageData();
        } catch {
            handleSnackbarFailure("계정 수정이 실패하였습니다.");
        }
    };

    const deleteUser = async () => {
        // console.log("deleteUser");
    };

    /*******************
     * Event
     *******************/
    const handleSubmitAddUser = (user) => {
        if (enableLogNormal) {
            console.log("handleSubmit() : user ", user);
        }
        asyncAddUser(user);
        handleCloseAddUser();
    };

    const handleSubmitModifyUser = (user) => {
        if (enableLogNormal) {
            console.log("handleSubmitModifyUser: user ", user);
        }
        asyncModifyUser(user);
        handleCloseModifyUser();
    };

    const handleDeleteSelectedUser = (idx, avata) => {
        const delList = [];
        const delAvataList = [];
        delList.push(idx);
        delAvataList.push(avata);

        deleteUsers(delList, delAvataList);
    };

    const handleModifySelectedUser = (idx) => {
        // console.log("modify user: ", idx);
        const res = data.filter(item => item.idx === idx);
        setModifyData(res[0]);
        handleOpenModifyUser();
    };

    const handleUserPage = (idx) => {
        const res = data.filter(item => item.idx === idx);
        console.log("handleUserPage : ..... : ", data);
        dispatch(setUserPage('view'));
        dispatch(setUserIdx({userIdx: idx}));
        dispatch(setUser(res[0]));
    };

    /************************************************************************************
     * useEffect
     ************************************************************************************/
    useEffect(() => {
        const changeOrderBy = "idx";
        // console.log("[] orderBy: ", changeOrderBy);
        dispatch(pagingChangeOrderByWithReset({orderBy: changeOrderBy}));
    }, []);

    useEffect(() => {
        if (enableLogDetail) {
            dispatch(pagingDump());
        }
    }, [totalCount]);

    useEffect(() => {
        if (getPage) {
            const {count} = getPage;
            /** Pagination */
            updatePagingTotalCount({count});
        }
    }, [getPage]);

    useEffect(() => {
        /** Pagination */
        getPageData();
        dispatch(pagingDump());
    }, [rowsPerPage, pageBeginRow, orderBy, order]);

    useEffect(() => {
        if (msg) {
            handleSnackbarSuccess("계정 등록에 성공하였습니다.");
            dispatch(initRegisterUser());
            getPageData();
        }
    }, [msg]);

    useEffect(() => {
        if (msgError) {
            dispatch(initRegisterUser());
            handleSnackbarFailure("계정 등록에 실패하였습니다.");
        }
    }, [msgError]);

    useEffect(() => {
        // console.log("useEffect: searchParam ", searchParam);
        getPageData();
    }, [searchParam]);

    useEffect(() => {
        dispatch(pagingSetLog({enableLog: enableLogDetail}));
    }, [enableLogDetail]);

    useEffect(() => {
        if (enableLogDetail && data) {
            console.log("update data: ", data);
        }
    }, [data]);

    /************************************************************************************
     * JSX Template
     ************************************************************************************/
    const getAddress = (row) => {
        let address = "-";
        if (row.zipcode) {
            address = row.zipcode;
            address = address.concat(', ');
        }
        if (row.address) {
            address = address.concat(row.address);
        }
        if (row.addressDetail) {
            if (row.address) {
                address = address.concat(', ');
                address = address.concat(row.addressDetail);
            } else {
                address = address.concat(row.addressDetail);
            }
        }
        return address;
    };

    const ContentsRow = (props) => {
        const {row} = props;
        const [openCollapse, setOpenCollapse] = React.useState(false);
        const isSelected = getSelected(row.idx);
        const address = getAddress(row);
        const cellClassName = "cb-material-table__cell";
        const cellIcon = isSelected ? "cb-material-table__cell-right" : cellClassName;
        const [checkboxColor, setCheckboxColor] = useState('');
        return (
            <React.Fragment>
                <TableRow
                    hover
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
                        style={{width: "5%"}}
                    >
                        {row.idx}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "5%"}}
                    >
                        {row.avata == null || row.avata === "" ? (
                            <Avatar
                                className="topbar__avatar-img-list"
                                name={row.userId}
                                size="40"
                            />
                        ) : (
                            <Avatar
                                className="topbar__avatar-img-list"
                                name={row.userId}
                                size="40"
                                src={`${API_ROUTE_SERVER_IMAGE}/${row.avata}`}
                            />
                        )}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "10%"}}
                        onMouseEnter={() => {
                            setOpenCollapse(true);
                        }}
                        onMouseLeave={() => {
                            setOpenCollapse(false);
                        }}
                    >
                        <b className="text_cor_green mouse_over_list">
                            <div className="assets_add_modal_div"
                                 onClick={event => handleUserPage(row.idx)}
                                 onKeyDown={event => handleUserPage(row.idx)}
                                 role="button" tabIndex="0"><span
                                className="circle__ste"/>{row.userId}</div>
                        </b>
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "10%"}}
                    >
                        {row.name}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "15%"}}
                    >
                        {row.email}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "15%"}}
                    >
                        {row.cpName}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "10%"}}
                    >
                        {row.authLevelTag}
                    </TableCell>
                    <TableCell
                        className={cellIcon}
                        style={{width: "25%"}}
                    >
                        {isSelected ? (
                            <React.Fragment>
                                {limitLongString(row.memo, 10)}
                                <Tooltip title="수정">
                                    <IconButton
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleModifySelectedUser(row.idx);
                                        }}
                                    >
                                        <EditIcon color="secondary"/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="삭제">
                                    <IconButton
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteSelectedUser(row.idx, row.avata);
                                        }}
                                    >
                                        <DeleteIcon color="secondary"/>
                                    </IconButton>
                                </Tooltip>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {limitLongString(row.memo, 35)}
                            </React.Fragment>
                        )}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{
                        paddingBottom: 0,
                        paddingTop: 0,
                    }} colSpan={12}>
                        <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography variant="h6" gutterBottom component="div">
                                    {row.userId}
                                </Typography>
                                <div className={classes.grid}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sm={6}>
                                            <ul>
                                                <li>
                                                    <span className={classes.spanSubject}> 소속회사 </span>
                                                    <span className={classes.spanContents}> {row.cpName} </span>
                                                </li>
                                                <li>
                                                    <span className={classes.spanSubject}> ID </span>
                                                    <span className={classes.spanContents}> {row.userId} </span>
                                                </li>
                                                <li>
                                                    <span className={classes.spanSubject}> 이름 </span>
                                                    <span className={classes.spanContents}> {row.name} </span>
                                                </li>
                                                <li>
                                                    <span className={classes.spanSubject}> 전화번호 </span>
                                                    <span className={classes.spanContents}> {row.tel === "" ? "-" : row.tel} </span>
                                                </li>
                                                <li>
                                                    <span className={classes.spanSubject}> 휴대폰번호 </span>
                                                    <span className={classes.spanContents}> {row.hp === "" ? "-" : row.hp} </span>
                                                </li>
                                                <li>
                                                    <span className={classes.spanSubject}> 이메일 </span>
                                                    <span className={classes.spanContents}> {row.email === "" ? "-" : row.email} </span>
                                                </li>
                                            </ul>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <ul>
                                                <li>
                                                    <span className={classes.spanSubject}> 권한 </span>
                                                    {/*<span className={classes.spanContents}> {row.zipcode},&nbsp;{row.address},&nbsp;{row.addressDetail} </span>*/}
                                                    <span className={classes.spanContents}> {row.authLevelTag} </span>
                                                </li>
                                                <li>
                                                    <span className={classes.spanSubject}> 주소 </span>
                                                    {/*<span className={classes.spanContents}> {row.zipcode},&nbsp;{row.address},&nbsp;{row.addressDetail} </span>*/}
                                                    <span className={classes.spanContents}> {address} </span>
                                                </li>
                                                <li>
                                                    <span className={classes.spanSubject}> 등록일 </span>
                                                    <span className={classes.spanContents}> {moment(row.registerDate)
                                                        .format('YYYY-MM-DD')} </span>
                                                </li>
                                                <li>
                                                    <span className={classes.spanSubject}> 인증 </span>
                                                    <span className={classes.spanContents}>
                                                        {/* eslint-disable-next-line no-nested-ternary */}
                                                        {row.emailAuth === true ? "개인 이메일 인증" : (row.groupEmailAuth === true ? "그룹 이메일 인증" : "사용 안함")}
                                                    </span>
                                                </li>
                                            </ul>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            {
                                                row.groupEmailAuth && row.groupEmailAuthList ? (
                                                    <React.Fragment>
                                                        <span className={classes.spanContents}>
                                                            <GroupIcon/> 이메일 인증 그룹 </span>
                                                        <ul>
                                                            {row.groupEmailAuthList.map(auth => (
                                                                <li key={auth.idx}>
                                                                <span className={classes.spanContents}>
                                                                    {auth.AuthUserId}/{auth.AuthEmail}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </React.Fragment>
                                                ) : <React.Fragment/>
                                            }
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            {
                                                row.participateInAccountList && row.participateInAccountList.length > 0 ? (
                                                    <React.Fragment>
                                                        <span className={classes.spanContents}>
                                                            <AccountCircleIcon/> 사용하는 이메일 인증 계정 </span>
                                                        <ul>
                                                            {row.participateInAccountList.map(paccount => (
                                                                <li key={paccount.idx}>
                                                                    <span className={classes.spanContents}>{paccount.UserId}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </React.Fragment>
                                                ) : <React.Fragment/>
                                            }
                                        </Grid>
                                    </Grid>
                                </div>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    };

    return (
        <Col md={12} lg={12}>
            <Card className="cb-card">
                <CardBody className="cb-card-body">
                    <UserTableToolbar
                        numSelected={[...selected].filter(el => el[1]).length}
                        handleDeleteSelected={handleDeleteSelected}
                        handleRefresh={handleRefresh}
                        onRequestSort={handleRequestSort}
                        rows={headRows}
                        handleOpen={handleOpenAddUser}
                        handleSubmitSearch={handleSubmitSearch}
                        contents="계정"
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
                                    {data && data.map((row, index) => {
                                        const keyId = index;
                                        return (
                                            <ContentsRow key={keyId} row={row}/>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <ModifyUserPage
                        open={openModifyUser}
                        handleClose={handleCloseModifyUser}
                        handleSubmit={handleSubmitModifyUser}
                        data={modifyData}
                    />
                    <RegisterUserPage
                        open={openAddUser}
                        handleClose={handleCloseAddUser}
                        handleSubmit={handleSubmitAddUser}
                    />
                </CardBody>
            </Card>
        </Col>
    );
};

export default UserList;
