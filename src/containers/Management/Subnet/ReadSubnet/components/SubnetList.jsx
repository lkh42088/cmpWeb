import React, {useEffect, useState} from "react";
import {
    Card,
    CardBody,
    Col,
} from 'reactstrap';

import moment from "moment";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import {useDispatch, useSelector} from "react-redux";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableContainer from "@material-ui/core/TableContainer";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Collapse from '@material-ui/core/Collapse';
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import GroupIcon from '@material-ui/icons/Group';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {useSnackbar} from "notistack";
import {InputBase, Select} from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
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
    pagingDump,
} from "../../../../../redux/actions/pagingActions";
import {getUserList, getUserListWithSearchParam, initRegisterUser} from "../../../../../redux/actions/usersActions";
import CommonTableHead from "../../../../Common/CommonTableHead";
import {registerUser, unregisterUser} from "../../../../../lib/api/users";
import BootstrapInput from "../../../../Common/BootstrapInput";
import {readSubnet} from "../../../../../lib/api/subnet";
import SubnetTableToolbar from "./SubnetTableToolbar";

const headRows = [
    {
        id: 'idx', disablePadding: false, label: 'IDX', minWidth: "50px",
    }, {
        id: 'subnetTag', disablePadding: false, label: 'SUBNET TAG', minWidth: "150px",
    }, {
        id: 'subnet', disablePadding: false, label: 'SUBNET', minWidth: "400px",
    }, {
        id: 'subnetMask', disablePadding: false, label: 'SUBNET MASK', minWidth: "200px",
    }, {
        id: 'gateway', disablePadding: false, label: 'GATEWAY', minWidth: "200px",
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
                    boxShadow: "4px 2px 6px 1px #999999",
                }
                : {
                    boxShadow: "5px 2px 10px 2px #000000",
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
    margin: {
        margin: theme.spacing(1),
        width: 70,
        display: "flex",
    },
    pagination: {
        display: "inline-block",
        paddingTop: 20,
        paddingBottom: 20,
    },
}));

const SubnetList = () => {
    /************************************************************************************
     * Variable
     ************************************************************************************/
    const classes = useStyles();
    const dispatch = useDispatch();
    // const { enqueueSnackbar } = useSnackbar();
    /**
     * User Data
     */
    // const {
    //     /** Paging User Data */
    //     data,
    //     getPage,
    //     /** Register User */
    //     msg,
    //     msgError,
    // } = useSelector(({ usersRd }) => ({
    //     /** Paging User Data */
    //     data: usersRd.data,
    //     getPage: usersRd.page,
    //     /** Register User */
    //     msg: usersRd.msg,
    //     msgError: usersRd.msgError,
    // }));
    const [state, setState] = useState({
        data: [],
        page: [],
    });

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

    /** Add User in TableToolbar */
    const [openAddUser, setOpenAddUser] = React.useState(false);
    const [searchParam, setSearchParam] = useState(null);

    const orderByName = {
        idx: "sub_idx",
        subnetTag: "sub_tag",
        subnet: "sub_ip_start",
        subnetMask: "sub_mask",
        gateway: "sub_gateway",
    };

    /************************************************************************************
     * Function
     ************************************************************************************/

    /** Add User in TableToolbar */
    const handleOpenAddUser = () => {
        setOpenAddUser(true);
    };

    /** Add User in TableToolbar */
    const handleCloseAddUser = () => {
        setOpenAddUser(false);
    };

    // const handleSnackbarFailure = (snackMsg) => {
    //     enqueueSnackbar(snackMsg);
    // };
    //
    // const handleSnackbarSuccess = (snackMsg) => {
    //     enqueueSnackbar(snackMsg, { variant: "success" });
    // };

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
            state.data.map(n => newSelected.set(n.idx, true));
        } else {
            state.data.map(n => newSelected.set(n.idx, false));
        }
        dispatch(pagingChangeSelected({selected: newSelected}));
    };

    /** Pagination */
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        const changeOrder = isAsc ? "desc" : "asc";
        if (property !== "collapse") {
            dispatch(pagingChangeOrder({order: changeOrder}));
            dispatch(pagingChangeOrderBy({orderBy: orderByName[property]}));
        }
    };

    /** Pagination */
    const getPageData = () => {
        let offset = 0;
        if (currentPage > 0) {
            offset = rowsPerPage * currentPage;
        }
        console.log("get Page Data: rows ", rowsPerPage, ", offset ", offset,
            ", orderBy ", orderBy, ", order ", order, ", searchParam ", searchParam);
        if (searchParam !== null) {
            dispatch(getUserListWithSearchParam({
                rows: rowsPerPage, offset, orderBy, order, searchParam,
            }));
        } else {
            dispatch(getUserList({
                rows: rowsPerPage, offset, orderBy, order,
            }));
        }
    };

    const deleteUsers = async (users) => {
        try {
            const response = await unregisterUser({idx: users});
            getPageData();
            // handleSnackbarSuccess("계정 삭제에 성공하였습니다.");
        } catch (error) {
            getPageData();
            // handleSnackbarFailure("계정 삭제에 실패하였습니다.");
        }
    };

    /** Pagination */
    const handleDeleteSelected = () => {
        let copyUser = [...state.data];
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
        deleteUsers(delList);

        for (let i = 0; i < [...selected].filter(el => el[1]).length; i += 1) {
            copyUser = copyUser.filter(obj => obj.id !== selected[i]);
        }
        console.log("after copyUser:", copyUser);
    };

    const handleSubmitSearch = (params) => {
        console.log("handleSubmitSearch() params ", params);
        setSearchParam(params);
        // getPageDataWithSearchParam(params);
    };

    /** Pagination */
    const getSelected = id => !!selected.get(id);

    /*******************
     * Axios
     *******************/
    const addUser = async (user) => {
        const {
            cpIdx, cpName, id, password, name, email,
            cellPhone, level, userZip, userAddr, userAddrDetail,
            emailAuthValue, emailAuthGroupList,
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
                zipCode: userZip,
                address: userAddr,
                addressDetail: userAddrDetail,
                emailAuthFlag: emailAuthValue === "1",
                emailAuthGroupFlag: emailAuthValue === "2",
                emailAuthGroupList,
            });
            // handleSnackbarSuccess("계정 등록에 성공하였습니다.");
            getPageData();
        } catch {
            // handleSnackbarFailure("계정 등록에 실패하였습니다.");
        }
    };

    const getData = async () => {
        try {
            const response = await readSubnet({
                rows: rowsPerPage,
                offset: (currentPage === 0) ? 0 : (currentPage - 1) * rowsPerPage,
                orderBy,
                order,
            });
            setState({
                ...state,
                data: (
                    response.data.data.map(val => ({
                        ...val,
                        subnet: val.subnetStart.concat(' ~ ') + val.subnetEnd,
                    }))),
                page: response.data.page,
            });
            console.log("getData count: ", response.data.page.count);
            updatePagingTotalCount(response.data.page.count);
        } catch {
            setState({
                ...state,
                data: [],
                page: [],
            });
        }
    };

    const deleteUser = async () => {
        console.log("deleteUser");
    };

    /*******************
     * Event
     *******************/
    const handleSubmitAddUser = (user) => {
        console.log("handleSubmit() : user ", user);
        addUser(user);
        handleCloseAddUser();
    };

    /** Pagination */
    const handleRefresh = () => {
        getData();
    };

    /************************************************************************************
     * useEffect
     ************************************************************************************/
    useEffect(() => {
        const changeOrderBy = "sub_idx";
        // console.log("[] orderBy: ", changeOrderBy);
        dispatch(pagingChangeOrderByWithReset({orderBy: changeOrderBy}));
        dispatch(pagingChangeCurrentPage({currentPage: 1}));
    }, []);

    useEffect(() => {
        dispatch(pagingDump());
    }, [totalCount]);

    // useEffect(() => {
    //     if (getPage) {
    //         const {count} = getPage;
    //         /** Pagination */
    //         updatePagingTotalCount({count});
    //     }
    // }, [getPage]);
    //
    useEffect(() => {
        /** Pagination */
        getData();
        // dispatch(pagingDump());
    }, [rowsPerPage, pageBeginRow, orderBy, order]);
    //
    // useEffect(() => {
    //     if (msg) {
    //         // handleSnackbarSuccess("계정 등록에 성공하였습니다.");
    //         dispatch(initRegisterUser());
    //         getPageData();
    //     }
    // }, [msg]);
    //
    // useEffect(() => {
    //     if (msgError) {
    //         dispatch(initRegisterUser());
    //         // handleSnackbarFailure("계정 등록에 실패하였습니다.");
    //     }
    // }, [msgError]);

    useEffect(() => {
        // console.log("useEffect: searchParam ", searchParam);
        getData();
    }, [searchParam]);

    /************************************************************************************
     * Component
     ************************************************************************************/
    // const rowSelector = (
    //     <FormControl className={classes.margin}>
    //         {/*<InputLabel id="demo-customized-select-label">ROWS</InputLabel>*/}
    //         <Button
    //             onChange={handleChangeRowsPerPage}
    //             value={rowsPerPage}
    //             // input={<BootstrapInput />}
    //         >
    //             {displayRowsList.map(size => (
    //                 <MenuItem key={size} value={size}>{size}</MenuItem>
    //             ))}
    //         </Button>
    //     </FormControl>
    // );

    // const paginationBar = (
    //     <div className={classes.pagination}>
    //         <Pagination
    //             shape="rounded"
    //             variant="outlined"
    //             count={Math.ceil(totalCount / rowsPerPage)}
    //             page={currentPage}
    //             onChange={handleChangePage}
    //         />
    //     </div>
    // );

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
        const { row } = props;
        const [openCollapse, setOpenCollapse] = React.useState(false);
        const isSelected = getSelected(row.idx);
        const address = getAddress(row);
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
                >
                    <TableCell
                        className="cb-material-table__cell"
                        padding="checkbox"
                        onClick={event => handleClick(event, row.idx)}
                    >
                        <Checkbox checked={isSelected}
                            // className="cb-material-table__checkbox"
                                  className="cb-material-table__checkbox"
                        />
                    </TableCell>
                    <TableCell
                        className="cb-material-table__cell cb-material-table__cell-right"
                        style={{width: "5%"}}
                    >
                        {row.idx}
                    </TableCell>
                    <TableCell
                        className="cb-material-table__cell cb-material-table__cell-right"
                        style={{width: "20%"}}
                        onFocus={() => { setOpenCollapse(true); }}
                        onMouseOver={() => { setOpenCollapse(true); }}
                        onMouseLeave={() => { setOpenCollapse(false); }}
                    >
                        {row.subnetTag}
                    </TableCell>
                    <TableCell
                        className="cb-material-table__cell cb-material-table__cell-right"
                        style={{width: "40%"}}
                    >
                        {row.subnet}
                    </TableCell>
                    <TableCell
                        className="cb-material-table__cell cb-material-table__cell-right"
                        style={{width: "25%"}}
                    >
                        {row.subnetMask}
                    </TableCell>
                    <TableCell
                        className="cb-material-table__cell cb-material-table__cell-right"
                        style={{width: "25%"}}
                    >
                        {row.gateway}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
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
                                                    <span className={classes.spanContents}> {row.authLevel} </span>
                                                </li>
                                                <li>
                                                    <span className={classes.spanSubject}> 주소 </span>
                                                    {/*<span className={classes.spanContents}> {row.zipcode},&nbsp;{row.address},&nbsp;{row.addressDetail} </span>*/}
                                                    <span className={classes.spanContents}> {address} </span>
                                                </li>
                                                <li>
                                                    <span className={classes.spanSubject}> 등록일 </span>
                                                    <span className={classes.spanContents}> {moment(row.registerDate).format('YYYY-MM-DD')} </span>
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
        <Col>
            <Card className="cb-card">
                <Grid container style={{display: "flex"}}>
                    <Grid item md={12}>
                        <SubnetTableToolbar
                            numSelected={[...selected].filter(el => el[1]).length}
                            handleDeleteSelected={handleDeleteSelected}
                            onRequestSort={handleRequestSort}
                            handleRefresh={handleRefresh}
                            rows={headRows}
                            // handleOpen={handleOpenRegisterCompany}
                            handleSubmitSearch={handleSubmitSearch}
                            contents="SUBNET"
                            count={totalCount}
                            rowsPerPage={rowsPerPage}
                            page={currentPage}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            rowsPerPageOptions={displayRowsList}
                            data={state.data}
                        />
                    </Grid>
                </Grid>
                <div className="cb-material-table__wrap" style={{height: 650}}>
                    <Table
                        stickyHeader
                        className="cb-material-table-fixed"
                        size={densePadding ? 'small' : 'medium'}
                    >
                        <CommonTableHead
                            classes={classes}
                            numSelected={[...selected].filter(el => el[1]).length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={state.data && state.data.length ? state.data.length : 0}
                            rows={headRows}
                        />
                        <TableBody>
                            { state.data && state.data.map((row, index) => {
                                const keyId = index;
                                return (
                                    <ContentsRow key={keyId} row={row} />
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </Col>
    );
};

export default React.memo(SubnetList);
