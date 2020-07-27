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
import {
IconButton, InputBase, Select, Tooltip,
} from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import BlurOnOutlinedIcon from '@material-ui/icons/BlurOnOutlined';
import BuildIcon from '@material-ui/icons/Build';
import ReactTooltip from "react-tooltip";
import {
    pagingChangeCurrentPage,
    pagingChangeCurrentPageNext,
    pagingChangeCurrentPagePrev,
    pagingChangeDense,
    pagingChangeOrder,
    pagingChangeOrderBy,
    pagingChangeOrderByWithReset,
    pagingChangeRowsPerPage,
    pagingChangeSelected, pagingChangeSorting,
    pagingChangeTotalCount,
    pagingDump,
} from "../../../../../redux/actions/pagingActions";
import {getUserList, getUserListWithSearchParam, initRegisterUser} from "../../../../../redux/actions/usersActions";
import {registerUser, unregisterUser} from "../../../../../lib/api/users";
import BootstrapInput from "../../../../Common/BootstrapInput";
import {readSubnet, deleteSubnets} from "../../../../../lib/api/subnet";
import SubnetTableToolbar from "./SubnetTableToolbar";
import CommonTableHead from "../../../../Common/CommonTableHead";
import ConfirmSnackbar from "../../../../Common/ConfirmSnackbar";
import {limitLongString} from "../../../../../lib/utils/utils";
import SubnetWriteForm from "../../CreateSubnet/components/SubnetWriteForm";
import DialogForm from "../../../../Common/DialogForm";

const headRows = [
    {id: 'idx', disablePadding: false, label: 'IDX'},
    {id: 'subnetTag', disablePadding: false, label: 'SUBNET TAG'},
    {id: 'subnet', disablePadding: false, label: 'SUBNET'},
    {id: 'subnetMask', disablePadding: false, label: 'SUBNET MASK'},
    {id: 'gateway', disablePadding: false, label: 'GATEWAY'},
];

/**************************************************************
 * Custom Styles
 **************************************************************/
const useStyles = makeStyles((theme) => {
    // Block to CSS, on case Internet Explorer Browser
    const isIE = /*@cc_on!@*/false || !!document.documentMode;
    if (!isIE) {
        return ({
            rowCss: {
                '& > *': {
                    borderBottom: 'unset',
                },
                "&:hover":
                    theme.palette.type === 'light'
                        ? {
                            boxShadow: "4px 2px 6px 1px #999999",
                            transition: "box-shadow 0.3s 0s",

                        }
                        : {
                            boxShadow: "5px 2px 10px 2px #000000",
                            transition: "box-shadow 0.3s 0s",
                        },
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
        });
    }
    return null;
});

const SubnetList = () => {
    /**************************************************************
     * Variable
     **************************************************************/
    const classes = useStyles();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
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

    /** Pagination */
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
    const [tableHeight, setTableHeight] = useState(580);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [warningContents, setWarningContents] = useState('');

    /**************************************************************
     * Function
     **************************************************************/

    /** Add User in TableToolbar */
    const handleOpenAddUser = () => {
        setOpenAddUser(true);
    };

    /** Add User in TableToolbar */
    const handleCloseAddUser = () => {
        setOpenAddUser(false);
    };

    const handleSnackbarFailure = (snackMsg) => {
        enqueueSnackbar(snackMsg);
    };

    const handleSnackbarSuccess = (snackMsg) => {
        enqueueSnackbar(snackMsg, { variant: "success" });
    };

    /**************************************************************
     * Pagination
     **************************************************************/
    const updatePagingTotalCount = (count) => {
        if (count !== totalCount) {
            dispatch(pagingChangeTotalCount({totalCount: count}));
        }
    };

    const handleChangePage = (event, newPage) => {
        console.log("change page: ", newPage);
        dispatch(pagingChangeCurrentPage({currentPage: newPage}));
    };

    const handleChangeRowsPerPage = (e) => {
        const changeRows = Number(e.target.value);
        dispatch(pagingChangeRowsPerPage({rowsPerPage: changeRows}));
    };

    const handleCellClick = (event, id) => {
        const newSelected = new Map(selected);
        const value = newSelected.get(id);
        let isActive = true;
        if (value) {
            isActive = false;
        }
        newSelected.set(id, isActive);
        dispatch(pagingChangeSelected({selected: newSelected}));
    };

    const handleSelectAllClick = (event, checked) => {
        const newSelected = new Map();
        if (checked) {
            state.data.map(n => newSelected.set(n.idx, true));
        } else {
            state.data.map(n => newSelected.set(n.idx, false));
        }
        dispatch(pagingChangeSelected({selected: newSelected}));
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        const changeOrder = isAsc ? "desc" : "asc";
        dispatch(pagingChangeSorting({
            order: changeOrder,
            orderBy: property,
        }));
    };

    // const getPageData = () => {
    //     let offset = 0;
    //     if (currentPage > 0) {
    //         offset = rowsPerPage * currentPage;
    //     }
    //     console.log("get Page Data: rows ", rowsPerPage, ", offset ", offset,
    //         ", orderBy ", orderBy, ", order ", order, ", searchParam ", searchParam);
    //     if (searchParam !== null) {
    //         dispatch(getUserListWithSearchParam({
    //             rows: rowsPerPage, offset, orderBy, order, searchParam,
    //         }));
    //     } else {
    //         dispatch(getUserList({
    //             rows: rowsPerPage, offset, orderBy, order,
    //         }));
    //     }
    // };

    /**************************************************************
     * Axios Function
     **************************************************************/
    // const addUser = async (user) => {
    //     const {
    //         cpIdx, cpName, id, password, name, email,
    //         cellPhone, level, userZip, userAddr, userAddrDetail,
    //         emailAuthValue, emailAuthGroupList,
    //     } = user;
    //     try {
    //         const response = await registerUser({
    //             cpIdx,
    //             cpName,
    //             id,
    //             password,
    //             name,
    //             email,
    //             authLevel: Number(level),
    //             hp: cellPhone,
    //             zipCode: userZip,
    //             address: userAddr,
    //             addressDetail: userAddrDetail,
    //             emailAuthFlag: emailAuthValue === "1",
    //             emailAuthGroupFlag: emailAuthValue === "2",
    //             emailAuthGroupList,
    //         });
    //         // handleSnackbarSuccess("계정 등록에 성공하였습니다.");
    //         // getPageData();
    //     } catch {
    //         // handleSnackbarFailure("계정 등록에 실패하였습니다.");
    //     }
    // };

    const getData = async () => {
        // console.log("★★★★★★★★", "get Data!!");
        try {
            let response;
            if (searchParam !== null) {
                response = await readSubnet({
                    rows: rowsPerPage,
                    offset: (currentPage === 0) ? 0 : (currentPage - 1) * rowsPerPage,
                    orderBy,
                    order,
                });
            } else {
                response = await readSubnet({
                    rows: rowsPerPage,
                    offset: (currentPage === 0) ? 0 : (currentPage - 1) * rowsPerPage,
                    orderBy,
                    order,
                    searchParam,
                });
            }
            setState({
                ...state,
                data: (
                    response.data.data.map(val => ({
                        ...val,
                        subnet: val.subnetStart.concat(' ~ ') + val.subnetEnd,
                    }))),
                page: response.data.page,
            });
        } catch {
            setState({
                ...state,
                data: [],
                page: [],
            });
        }
    };

    const deleteData = async (idx) => {
        // console.log("★★★★★★★★", "delete Data!! ", idx);
        try {
            const response = await deleteSubnets({idx});
            // console.log(response);
            getData();
            handleSnackbarSuccess("선택 항목 삭제에 성공 하였습니다.");
        } catch {
            getData();
            handleSnackbarFailure("선택 항목 삭제에 실패 하였습니다.");
        }
    };

    // const deleteSubnets = async (subnets) => {
    //     try {
    //         const response = await unregisterUser({idx: subnets});
    //         getData();
    //         // handleSnackbarSuccess("계정 삭제에 성공하였습니다.");
    //     } catch (error) {
    //         getData();
    //         // handleSnackbarFailure("계정 삭제에 실패하였습니다.");
    //     }
    // };

    /**************************************************************
     * Event Handler
     **************************************************************/
    const handleSubmitAddUser = (user) => {
        console.log("handleSubmit() : user ", user);
        // addUser(user);
        handleCloseAddUser();
    };

    const handleRefresh = () => {
        getData();
    };

    const handleDeleteSelected = () => {
        setWarningContents("삭제 하시겠습니까?");
        setOpen(!open);
    };

    const handleOpenModal = () => {
        console.log("★★★★", " Open Modal ");
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        console.log("★★★★", " Close Modal ");
        setOpenModal(false);
    };

    const handleSubmitModal = () => {
        console.log("★★★★", " Submit Modal ");
        setOpenModal(false);
    };

    const handleSubmitSearch = (params) => {
        console.log("handleSubmitSearch() params ", params);
        setSearchParam(params);
        // getPageDataWithSearchParam(params);
    };

    const getSelected = id => !!selected.get(id);

    const handleClickOK = () => {
        setOpen(!open);
        const delList = [];
        if (selected !== null) {
            selected.forEach((value, key, mapObject) => {
                // console.log("selected: key ", key, ", value ", value);
                if (value) {
                    delList.push(key);
                }
            });
        }
        // console.log("delList: ", delList);
        deleteData(delList);
    };

    const handleClickCancel = () => {
        setOpen(!open);
    };

    /**************************************************************
     * useEffect
     **************************************************************/
    useEffect(() => {
        const changeOrderBy = "sub_idx";
        dispatch(pagingChangeOrderByWithReset({orderBy: changeOrderBy}));
    }, []);

    useEffect(() => {
        getData();
    }, [rowsPerPage, pageBeginRow, orderBy, order]);

    useEffect(() => {
        updatePagingTotalCount(state.page.count);
    }, [state.page.count]);

    useEffect(() => {
        console.log("useEffect: searchParam ", searchParam);
        getData();
    }, [searchParam]);

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

    /**************************************************************
     * Component
     **************************************************************/

    /**************************************************************
     * JSX Template
     **************************************************************/
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
                        onClick={event => handleCellClick(event, row.idx)}
                    >
                        <Checkbox checked={isSelected}
                            // className="cb-material-table__checkbox"
                                  className="cb-material-table__checkbox"
                        />
                    </TableCell>
                    <TableCell
                        className="cb-material-table__cell"
                        style={{width: "5%"}}
                    >
                        {row.idx}
                    </TableCell>
                    <TableCell
                        className="cb-material-table__cell"
                        style={{width: "20%"}}
                        onFocus={() => { setOpenCollapse(true); }}
                        onMouseOver={() => { setOpenCollapse(true); }}
                        onMouseLeave={() => { setOpenCollapse(false); }}
                    >
                        {row.subnetTag}
                    </TableCell>
                    <TableCell
                        className="cb-material-table__cell"
                        style={{width: "40%"}}
                    >
                        {row.subnet}
                    </TableCell>
                    <TableCell
                        className="cb-material-table__cell"
                        style={{width: "20%"}}
                    >
                        {row.subnetMask}
                    </TableCell>
                    {/*<TableCell*/}
                    {/*    className="cb-material-table__cell"*/}
                    {/*    style={{width: "25%"}}*/}
                    {/*>*/}
                    {/*    {row.gateway}*/}
                    {/*</TableCell>*/}
                    <TableCell
                        className="cb-material-table__cell"
                        style={{width: "30%"}}
                    >
                        {isSelected ? (
                            <>
                                {limitLongString(row.gateway, 6)}
                                <span style={{padding: "0px 10px"}} />
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // handleModifySelectedUser(row.idx);
                                    }}
                                >
                                    {/*<EditIcon color="secondary"/>*/}
                                    <BuildIcon fontSize="small" color="secondary"
                                               data-tip data-for="tooltipModify"
                                    />
                                    <ReactTooltip id="tooltipModify" effect="float"
                                                  delayHide={100} type="dark" place="bottom"
                                                  className={classes.tooltip}>
                                        수정
                                    </ReactTooltip>
                                </IconButton>
                            </>
                        ) : (
                            <React.Fragment>
                                {limitLongString(row.gateway, 15)}
                            </React.Fragment>
                        )}
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
                                    {/*<Grid container spacing={1}>*/}
                                    {/*    <Grid item xs={12} sm={6}>*/}
                                    {/*        <ul>*/}
                                    {/*            <li>*/}
                                    {/*                <span className={classes.spanSubject}> 소속회사 </span>*/}
                                    {/*                <span className={classes.spanContents}> {row.cpName} </span>*/}
                                    {/*            </li>*/}
                                    {/*            <li>*/}
                                    {/*                <span className={classes.spanSubject}> ID </span>*/}
                                    {/*                <span className={classes.spanContents}> {row.userId} </span>*/}
                                    {/*            </li>*/}
                                    {/*            <li>*/}
                                    {/*                <span className={classes.spanSubject}> 이름 </span>*/}
                                    {/*                <span className={classes.spanContents}> {row.name} </span>*/}
                                    {/*            </li>*/}
                                    {/*            <li>*/}
                                    {/*                <span className={classes.spanSubject}> 전화번호 </span>*/}
                                    {/*                <span className={classes.spanContents}> {row.hp === "" ? "-" : row.hp} </span>*/}
                                    {/*            </li>*/}
                                    {/*            <li>*/}
                                    {/*                <span className={classes.spanSubject}> 이메일 </span>*/}
                                    {/*                <span className={classes.spanContents}> {row.email === "" ? "-" : row.email} </span>*/}
                                    {/*            </li>*/}
                                    {/*        </ul>*/}
                                    {/*    </Grid>*/}
                                    {/*    <Grid item xs={12} sm={6}>*/}
                                    {/*        <ul>*/}
                                    {/*            <li>*/}
                                    {/*                <span className={classes.spanSubject}> 권한 </span>*/}
                                    {/*                /!*<span className={classes.spanContents}> {row.zipcode},&nbsp;{row.address},&nbsp;{row.addressDetail} </span>*!/*/}
                                    {/*                <span className={classes.spanContents}> {row.authLevel} </span>*/}
                                    {/*            </li>*/}
                                    {/*            <li>*/}
                                    {/*                <span className={classes.spanSubject}> 주소 </span>*/}
                                    {/*                /!*<span className={classes.spanContents}> {row.zipcode},&nbsp;{row.address},&nbsp;{row.addressDetail} </span>*!/*/}
                                    {/*                <span className={classes.spanContents}> {address} </span>*/}
                                    {/*            </li>*/}
                                    {/*            <li>*/}
                                    {/*                <span className={classes.spanSubject}> 등록일 </span>*/}
                                    {/*                <span className={classes.spanContents}> {moment(row.registerDate).format('YYYY-MM-DD')} </span>*/}
                                    {/*            </li>*/}
                                    {/*            <li>*/}
                                    {/*                <span className={classes.spanSubject}> 인증 </span>*/}
                                    {/*                <span className={classes.spanContents}>*/}
                                    {/*                    /!* eslint-disable-next-line no-nested-ternary *!/*/}
                                    {/*                    {row.emailAuth === true ? "개인 이메일 인증" : (row.groupEmailAuth === true ? "그룹 이메일 인증" : "사용 안함")}*/}
                                    {/*                </span>*/}
                                    {/*            </li>*/}
                                    {/*        </ul>*/}
                                    {/*    </Grid>*/}
                                    {/*    <Grid item xs={12} sm={6}>*/}
                                    {/*        {*/}
                                    {/*            row.groupEmailAuth && row.groupEmailAuthList ? (*/}
                                    {/*                <React.Fragment>*/}
                                    {/*                    <span className={classes.spanContents}>*/}
                                    {/*                        <GroupIcon/> 이메일 인증 그룹 </span>*/}
                                    {/*                    <ul>*/}
                                    {/*                        {row.groupEmailAuthList.map(auth => (*/}
                                    {/*                            <li key={auth.idx}>*/}
                                    {/*                            <span className={classes.spanContents}>*/}
                                    {/*                                {auth.AuthUserId}/{auth.AuthEmail}</span>*/}
                                    {/*                            </li>*/}
                                    {/*                        ))}*/}
                                    {/*                    </ul>*/}
                                    {/*                </React.Fragment>*/}
                                    {/*            ) : <React.Fragment/>*/}
                                    {/*        }*/}
                                    {/*    </Grid>*/}
                                    {/*    <Grid item xs={12} sm={6}>*/}
                                    {/*        {*/}
                                    {/*            row.participateInAccountList && row.participateInAccountList.length > 0 ? (*/}
                                    {/*                <React.Fragment>*/}
                                    {/*                    <span className={classes.spanContents}>*/}
                                    {/*                        <AccountCircleIcon/> 사용하는 이메일 인증 계정 </span>*/}
                                    {/*                    <ul>*/}
                                    {/*                        {row.participateInAccountList.map(paccount => (*/}
                                    {/*                            <li key={paccount.idx}>*/}
                                    {/*                                <span className={classes.spanContents}>{paccount.UserId}</span>*/}
                                    {/*                            </li>*/}
                                    {/*                        ))}*/}
                                    {/*                    </ul>*/}
                                    {/*                </React.Fragment>*/}
                                    {/*            ) : <React.Fragment/>*/}
                                    {/*        }*/}
                                    {/*    </Grid>*/}
                                    {/*</Grid>*/}
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
            <Card className="cb-card-subnet">
                <Grid container style={{display: "flex"}}>
                    <Grid item md={12}>
                        <SubnetTableToolbar
                            numSelected={[...selected].filter(el => el[1]).length}
                            handleDeleteSelected={handleDeleteSelected}
                            onRequestSort={handleRequestSort}
                            handleRefresh={handleRefresh}
                            rows={headRows}
                            handleOpen={handleOpenModal}
                            handleSubmitSearch={handleSubmitSearch}
                            contents="SUBNET"
                            count={totalCount}
                            rowsPerPage={rowsPerPage}
                            page={currentPage}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            rowsPerPageOptions={displayRowsList}
                            defaultHeight={30}
                            setTableHeight={setTableHeight}
                            data={state.data}
                        />
                    </Grid>
                </Grid>
                <div className="cb-material-table__wrap"
                     style={{
                         height: tableHeight,
                         transition: "height 0.3s 0.1s",
                     }}
                >
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
                    <ConfirmSnackbar
                        open={open}
                        warningContents={warningContents}
                        handleClick={handleClickOK}
                        handleClose={handleClickCancel}
                    />
                </div>
            </Card>
            {/*Modal component for Add & Modify*/}
            <DialogForm
                open={openModal}
                title="서브넷 추가"
                icon={<BlurOnOutlinedIcon />}
                childComponent={(
                    <SubnetWriteForm
                        handleClose={handleCloseModal}
                        handleSubmit={handleSubmitModal}
                        data={state.data}
                    />
                    )}
            />
        </Col>
    );
};

export default React.memo(SubnetList);
