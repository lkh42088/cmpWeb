import React, {useEffect} from "react";
import { Card, CardBody, Col } from 'reactstrap';
import Avatar from "react-avatar";

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
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {makeStyles} from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {useSnackbar} from "notistack";
import {
    pagingChangeCurrentPage,
    pagingChangeCurrentPageNext, pagingChangeCurrentPagePrev, pagingChangeDense, pagingChangeOrder, pagingChangeOrderBy,
    pagingChangeRowsPerPage, pagingChangeSelected,
    pagingChangeTotalCount, pagingDump,
} from "../../../../redux/actions/pagingActions";
import {getUserList, initRegisterUser} from "../../../../redux/actions/usersActions";
import CommonTableHead from "../../../Common/CommonTableHead";
import CbAdminTableToolbar from "../../../Common/CbAdminTableToolbar";
import {initRegisterCompany} from "../../../../redux/actions/companiesActions";
import RegisterUserPage from "./RegisterUserPage";

const headRows = [
    {id: 'idx', disablePadding: false, label: 'Index'},
    {id: 'avata', disablePadding: false, label: '아바타'},
    {id: 'userId', disablePadding: false, label: '아이디'},
    {id: 'userName', disablePadding: false, label: '이름'},
    {id: 'email', disablePadding: false, label: '이메일'},
    {id: 'hp', disablePadding: false, label: '전화번호'},
    {id: 'cpName', disablePadding: false, label: '회사명'},
    {id: 'authlevel', disablePadding: false, label: '권한'},
    {id: 'collapse', disablePadding: false, label: ''},
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
    row: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
}));

const UserList = () => {
    /************************************************************************************
     * Variable
     ************************************************************************************/
    const classes = useStyles();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    /**
     * User Data
     */
    const {
        data,
        getPage,
        msg,
        msgError,
    } = useSelector(({ usersRd }) => ({
        data: usersRd.data,
        getPage: usersRd.page,
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
        totalPage,
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

    /** Modal variable */
    const [open, setOpen] = React.useState(false);
    const [openCollapse, setOpenCollapse] = React.useState(false);

    /************************************************************************************
     * Function
     ************************************************************************************/
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenCollapse = () => {
        setOpenCollapse(true);
    };

    const handleCloseCollapse = () => {
        setOpenCollapse(false);
    };

    const handleTriggerFailure = () => {
        enqueueSnackbar('계정 등록에 실패했습니다!');
    };

    const handleTriggerSuccess = () => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar('계정 등록에 성공했습니다.', { variant: "success" });
    };

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
            data.map(n => newSelected.set(n.idx, true));
        } else {
            data.map(n => newSelected.set(n.idx, false));
        }
        dispatch(pagingChangeSelected({selected: newSelected}));
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        const changeOrder = isAsc ? "desc" : "asc";
        if (property !== "collapse") {
            dispatch(pagingChangeOrder({order: changeOrder}));
            dispatch(pagingChangeOrderBy({orderBy: property}));
        }
    };

    const handleDeleteSelected = () => {
        let copyUser = [...data];
        console.log("deleted Selected:");
        for (let i = 0; i < [...selected].filter(el => el[1]).length; i += 1) {
            copyUser = copyUser.filter(obj => obj.id !== selected[i]);
        }
        console.log("copyUser:", copyUser);
    };

    /** Pagination */
    const handleChangeDense = (event) => {
        dispatch(pagingChangeDense({checked: event.target.checked}));
    };

    /** Pagination */
    const getPageData = () => {
        let offset = 0;
        if (currentPage > 0) {
            offset = rowsPerPage * currentPage;
        }
        console.log("get Page Data: rows ", rowsPerPage, ", offset ", offset,
            ", orderBy ", orderBy, ", order ", order);
        dispatch(getUserList({
            rows: rowsPerPage, offset, orderBy, order,
        }));
    };

    /** Pagination */
    const getSelected = id => !!selected.get(id);

    const handleRefresh = () => {
        getPageData();
    };

    /************************************************************************************
     * useEffect
     ************************************************************************************/
    useEffect(() => {
        const changeOrderBy = "idx";
        console.log("[] orderBy: ", changeOrderBy);
        dispatch(pagingChangeOrderBy({orderBy: changeOrderBy}));
    }, []);

    useEffect(() => {
        dispatch(pagingDump());
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
            handleTriggerSuccess();
            dispatch(initRegisterUser());
            getPageData();
        }
    }, [msg]);

    useEffect(() => {
        if (msgError) {
            dispatch(initRegisterUser());
            handleTriggerFailure();
        }
    }, [msgError]);

    /************************************************************************************
     * Component
     ************************************************************************************/
    const paginationBar = (
        <TablePagination
            component="div"
            className="material-table__pagination"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            rowsPerPageOptions={displayRowsList}
        />
    );

    /************************************************************************************
     * JSX Template
     ************************************************************************************/
    const tableRows = (
        <TableBody>
            { data && data.map((row) => {
                    const isSelected = getSelected(row.idx);
                return (
                    <React.Fragment>
                        <TableRow
                            hover
                            // className="cb-material-table__row"
                            classes={classes.row}
                            role="checkbox"
                            aria-checked={isSelected}
                            tabIndex={-1}
                            key={row.idx}
                            selected={isSelected}
                        >
                            <TableCell
                                // className="cb-material-table__cell"
                                padding="checkbox"
                                onClick={event => handleClick(event, row.idx)}
                            >
                                <Checkbox checked={isSelected}
                                          className="cb-material-table__checkbox"
                                />
                            </TableCell>
                            <TableCell
                                // className="cb-material-table__cell cb-material-table__cell-right"
                            >
                                {row.idx}
                            </TableCell>
                            <TableCell
                                // className="cb-material-table__cell cb-material-table__cell-right"
                            >
                                <Avatar className="topbar__avatar-img-list" name={row.userId} size="40" />
                            </TableCell>
                            <TableCell
                                // className="cb-material-table__cell cb-material-table__cell-right"
                            >
                                {row.userId}
                            </TableCell>
                            <TableCell
                                //className="cb-material-table__cell cb-material-table__cell-right"
                            >
                                {row.name}
                            </TableCell>
                            <TableCell
                                //className="cb-material-table__cell cb-material-table__cell-right"
                            >
                                {row.email}
                            </TableCell>
                            <TableCell
                                //className="cb-material-table__cell cb-material-table__cell-right"
                            >
                                {row.hp}
                            </TableCell>
                            <TableCell
                                //className="cb-material-table__cell cb-material-table__cell-right"
                            >
                                {row.cpName}
                            </TableCell>
                            <TableCell
                                //className="cb-material-table__cell cb-material-table__cell-right"
                            >
                                {row.authLevel}
                            </TableCell>
                            <TableCell>
                                <IconButton aria-label="expand row" size="small" onClick={() => setOpenCollapse(!openCollapse)}>
                                    {openCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                                <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                                    <Box margin={1}>
                                        <Typography variant="h6" gutterBottom component="div">
                                            History
                                        </Typography>
                                    </Box>
                                </Collapse>
                            </TableCell>
                        </TableRow>
                    </React.Fragment>
                );
                })
            }
        </TableBody>
    );

    return (
        <Col md={12} lg={12}>
            <Card>
                <CardBody>
                    <CbAdminTableToolbar
                        numSelected={[...selected].filter(el => el[1]).length}
                        handleDeleteSelected={handleDeleteSelected}
                        handleRefresh={handleRefresh}
                        onRequestSort={handleRequestSort}
                        rows={headRows}
                        toolbarTitle="계정 리스트"
                        handleOpen={handleOpen}
                        contents="계정"
                    />
                    <div
                        // className="cb-material-table__wrap"
                    >
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table"
                                // className="cb-material-table"
                                size={dense ? 'small' : 'medium'}
                            >
                                {/*<CommonTableHead*/}
                                {/*    classes={classes}*/}
                                {/*    numSelected={[...selected].filter(el => el[1]).length}*/}
                                {/*    order={order}*/}
                                {/*    orderBy={orderBy}*/}
                                {/*    onSelectAllClick={handleSelectAllClick}*/}
                                {/*    onRequestSort={handleRequestSort}*/}
                                {/*    rowCount={data && data.length ? data.length : 0}*/}
                                {/*    rows={headRows}*/}
                                {/*/>*/}
                                {tableRows}
                            </Table>
                        </TableContainer>
                        {paginationBar}
                        <FormControlLabel
                            // className="cb-material-table__padding"
                            control={<Switch checked={dense} onChange={handleChangeDense} />}
                            label="Dense padding"
                        />
                    </div>
                    <RegisterUserPage open={open} handleClose={handleClose}/>
                </CardBody>
            </Card>
        </Col>
    );
};

export default UserList;
