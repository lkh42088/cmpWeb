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
import Paper from '@material-ui/core/Paper';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {makeStyles} from "@material-ui/core/styles";
import {getUserList} from "../../../../redux/actions/usersActions";
import UserHead from "./UserHead";
import {
    pagingChangeCurrentPage,
    pagingChangeCurrentPageNext, pagingChangeCurrentPagePrev, pagingChangeDense,
    pagingChangeRowsPerPage, pagingChangeSelected,
    pagingChangeTotalCount, pagingDump,
} from "../../../../redux/actions/pagingActions";

const headRows = [
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
        users, getPage,
    } = useSelector(({ userList }) => ({
        users: userList.users,
        getPage: userList.page,
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
    } = useSelector(({pagination}) => ({
        selected: pagination.selected,
        pageBeginRow: pagination.pageBeginRow,
        rowsPerPage: pagination.rowsPerPage,
        currentPage: pagination.currentPage,
        totalPage: pagination.totalPage,
        totalCount: pagination.totalCount,
        displayRowsList: pagination.displayRowsList,
        dense: pagination.dense,
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
            users.map(n => newSelected.set(n.idx, true));
        } else {
            users.map(n => newSelected.set(n.idx, false));
        }
        dispatch(pagingChangeSelected({selected: newSelected}));
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
        console.log("get Page Data: rows ", rowsPerPage, ", offset ", offset);
        dispatch(getUserList({rows: rowsPerPage, offset}));
    };

    /** Pagination */
    const getSelected = id => !!selected.get(id);


    useEffect(() => {
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
    }, [pageBeginRow]);

    useEffect(() => {
        getPageData();
    }, [rowsPerPage]);

    /** Pagination */
    const paginationBar = (
        <TablePagination
            component="div"
            className="nb-material-table__pagination"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            rowsPerPageOptions={displayRowsList}
        />
    );

    const usersTable = (
        <TableBody>
            { users
                // .slice(pagingRedux.pageBeginRow, pagingRedux.pageEndRow)
                .map((user) => {
                    const isSelected = getSelected(user.idx);
                    return (
                        <TableRow
                            hover
                            className="nb-material-table__row"
                            role="checkbox"
                            onClick={event => handleClick(event, user.idx)}
                            aria-checked={isSelected}
                            tabIndex={-1}
                            key={user.idx}
                            selected={isSelected}
                        >
                            <TableCell className="material-table__cell" padding="checkbox">
                                <Checkbox checked={isSelected} className="material-table__checkbox" />
                            </TableCell>
                            <TableCell className="nb-material-table__cell nb-material-table__cell-right">
                                {user.userId}
                            </TableCell>
                            <TableCell className="nb-material-table__cell nb-material-table__cell-right">
                                {user.name}
                            </TableCell>
                            <TableCell className="nb-material-table__cell nb-material-table__cell-right">
                                {user.email}
                            </TableCell>
                            <TableCell className="nb-material-table__cell nb-material-table__cell-right">
                                {user.hp}
                            </TableCell>
                            <TableCell className="nb-material-table__cell nb-material-table__cell-right">
                                {user.authLevel}
                            </TableCell>
                            <TableCell className="nb-material-table__cell nb-material-table__cell-right">
                                {user.registerDate}
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
                    <Paper>
                        <div className="card__title">
                            <h5 className="bold-text">고객리스트</h5>
                        </div>
                        <div className="nb-material-table__wrap">
                            <TableContainer>
                                <Table
                                    className="nb-material-table"
                                    size={dense ? 'small' : 'medium'}
                                >
                                    <UserHead
                                        numSelected={[...selected].filter(el => el[1]).length}
                                        onSelectAllClick={handleSelectAllClick}
                                        rowCount={users.length}
                                        rows={headRows}
                                    />
                                    {usersTable}
                                </Table>
                            </TableContainer>
                            {paginationBar}
                        </div>
                        <FormControlLabel
                            control={<Switch checked={dense} onChange={handleChangeDense} />}
                            label="Dense padding"
                        />
                    </Paper>
                </CardBody>
            </Card>
        </Col>
    );
};

export default UserList;
