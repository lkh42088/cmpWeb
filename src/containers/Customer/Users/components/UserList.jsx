import React, {useEffect} from "react";
import { Card, CardBody, Col } from 'reactstrap';

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
import {makeStyles} from "@material-ui/core/styles";
import {
    pagingChangeCurrentPage,
    pagingChangeCurrentPageNext, pagingChangeCurrentPagePrev, pagingChangeDense, pagingChangeOrder, pagingChangeOrderBy,
    pagingChangeRowsPerPage, pagingChangeSelected,
    pagingChangeTotalCount, pagingDump,
} from "../../../../redux/actions/pagingActions";
import {getUserList} from "../../../../redux/actions/usersActions";
import {CommonTableToolbar} from "../../../Common/CommonTableToolbar";
import CommonTableHead from "../../../Common/CommonTableHead";

const headRows = [
    {id: 'idx', disablePadding: false, label: 'Index'},
    {id: 'userId', disablePadding: false, label: '아이디'},
    {id: 'userName', disablePadding: false, label: '이름'},
    {id: 'email', disablePadding: false, label: '이메일'},
    {id: 'hp', disablePadding: false, label: '핸드폰'},
    {id: 'authlevel', disablePadding: false, label: '권한'},
    {id: 'regdate', disablePadding: false, label: '등록일자'},
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
}));

const UserList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    /**
     * User Data
     */
    const {
        data, getPage,
    } = useSelector(({ userRd }) => ({
        data: userRd.data,
        getPage: userRd.page,
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
        dispatch(pagingChangeOrder({order: changeOrder}));
        dispatch(pagingChangeOrderBy({orderBy: property}));
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

    /** Pagination */
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

    const tableRows = (
        <TableBody>
            { data
                .map((row) => {
                    const isSelected = getSelected(row.idx);
                    return (
                        <TableRow
                            hover
                            className="material-table__row"
                            role="checkbox"
                            onClick={event => handleClick(event, row.idx)}
                            aria-checked={isSelected}
                            tabIndex={-1}
                            key={row.idx}
                            selected={isSelected}
                        >
                            <TableCell className="material-table__cell" padding="checkbox" >
                                <Checkbox checked={isSelected} className="material-table__checkbox" />
                            </TableCell>
                            <TableCell className="material-table__cell material-table__cell-right" >
                                {row.idx}
                            </TableCell>
                            <TableCell className="material-table__cell material-table__cell-right" >
                                {row.userId}
                            </TableCell>
                            <TableCell className="material-table__cell material-table__cell-right" >
                                {row.name}
                            </TableCell>
                            <TableCell className="material-table__cell material-table__cell-right" >
                                {row.email}
                            </TableCell>
                            <TableCell className="material-table__cell material-table__cell-right" >
                                {row.hp}
                            </TableCell>
                            <TableCell className="material-table__cell material-table__cell-right" >
                                {row.authLevel}
                            </TableCell>
                            <TableCell className="material-table__cell material-table__cell-right" >
                                {row.registerDate}
                            </TableCell>
                        </TableRow>
                    );
                })
            }
        </TableBody>
    );

    return (
        <Col md={12} lg={12}>
            <Card>
                <CardBody>
                    <div className="card__title">
                        <h4 className="bold-text">사용자 목록</h4>
                    </div>
                    <CommonTableToolbar
                        numSelected={[...selected].filter(el => el[1]).length}
                        handleDeleteSelected={handleDeleteSelected}
                        onRequestSort={handleRequestSort}
                        rows={headRows}
                        toolbarTitle="사용자 목록"
                    />
                    <div className="material-table__wrap">
                        <TableContainer>
                            <Table
                                className="material-table"
                                size={dense ? 'small' : 'medium'}
                            >
                                <CommonTableHead
                                    classes={classes}
                                    numSelected={[...selected].filter(el => el[1]).length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={data.length}
                                    rows={headRows}
                                />
                                {tableRows}
                            </Table>
                        </TableContainer>
                        {paginationBar}
                    </div>
                    <FormControlLabel
                        control={<Switch checked={dense} onChange={handleChangeDense} />}
                        label="Dense padding"
                    />
                </CardBody>
            </Card>
        </Col>
    );
};

export default UserList;
