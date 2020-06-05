import React, {useEffect, useState} from "react";
import { Card, CardBody, Col } from 'reactstrap';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import {useDispatch, useSelector} from "react-redux";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import {getUserList} from "../../../../redux/actions/usersActions";
import UserHead from "./UserHead";
import {
    pagingChangeCurrentPageNext, pagingChangeCurrentPagePrev,
    pagingChangeRowsPerPage,
    pagingChangeTotalCount,
} from "../../../../redux/actions/pagingActions";

const UserList = () => {
    const dispatch = useDispatch();
    const {
        users, getPage, pageBeginRow, rowsPerPage, currentPage, totalPage, totalCount, displayRowsList,
    } = useSelector(({userList, pagination}) => ({
        users: userList.users,
        getPage: userList.page,
        // Pagination
        pageBeginRow: pagination.pageBeginRow,
        rowsPerPage: pagination.rowsPerPage,
        currentPage: pagination.currentPage,
        totalPage: pagination.totalPage,
        totalCount: pagination.totalCount,
        displayRowsList: pagination.displayRowsList,
    }));

    const dumpPagingVar = ({location}) => {
        console.log(location, "-------------------------");
        console.log("- rowsPerPage:", rowsPerPage);
        console.log("- currentPage:", currentPage);
        console.log("- totalPage:", totalPage);
        console.log("- totalCount:", totalCount);
    };

    const updatePagingTotalCount = ({count}) => {
        console.log("[update]", count);
        console.log("--> totalCount:", totalCount);
        console.log("--> rowsPerPage:", rowsPerPage);
        if (count !== totalCount) {
            console.log("Change TotalCount");
            dispatch(pagingChangeTotalCount({totalCount: count}));
        }
    };

    const handleChangePagePrev = () => {
        if (currentPage > 1) {
            const pageNum = currentPage - 1;
            dispatch(pagingChangeCurrentPagePrev());
        }
    };

    const handleChangePageNext = () => {
        if (currentPage < totalCount) {
            const pageNum = currentPage + 1;
            dispatch(pagingChangeCurrentPageNext());
        }
    };

    const handleChangeRowsPerPage = (e) => {
        const changeRows = Number(e.target.value);
        console.log("[handleChangeRowsPerPage]");
        console.log("--> ", changeRows);
        dispatch(pagingChangeRowsPerPage({rowsPerPage: changeRows}));
    };

    const getPageData = () => {
        let offset = 0;
        if (currentPage > 1) {
            offset = rowsPerPage * currentPage;
        }
        console.log("[dispatch-->getUserList] rows:", rowsPerPage, ", offset:", offset);
        dispatch(getUserList({rows: rowsPerPage, offset}));
    };

    useEffect(() => {
    }, []);

    useEffect(() => {
        console.log("[useEffect] rowsPerPage - ", rowsPerPage);
    }, [rowsPerPage]);

    useEffect(() => {
        if (getPage) {
            const {count} = getPage;
            console.log("[getPage]", getPage);
            console.log("--> count", count);
            updatePagingTotalCount({count});
        }
    }, [getPage]);

    useEffect(() => {
        dumpPagingVar({location: "[USERS]"});
        console.log("getPage:", getPage);
        if (users) {
            console.log("[users]");
            console.log(users);
        }
    }, [users]);

    useEffect(() => {
        dumpPagingVar({location: "[INIT]"});
    }, [totalCount]);

    useEffect(() => {
        console.log("[useEffect] rowsPerPage");
        getPageData();
    }, [rowsPerPage]);

    useEffect(() => {
        console.log("[useEffect] pageBeginRow");
        getPageData();
    }, [pageBeginRow]);

    const pageBar = (
        <TablePagination
            component="div"
            className="material-table__pagination"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            backIconButtonProps={{
                'aria-label': 'Previous Page',
                disabled: false,
                onClick: handleChangePagePrev,
            }}
            nextIconButtonProps={{'aria-label': 'Next Page'}}
            onChangePage={handleChangePageNext}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            rowsPerPageOptions={displayRowsList}
            dir="ltr"
            labelDisplayedRows={
                ({to, count}) => (
                    <span style={{fontSize: 14}}><span>page: {currentPage}</span>&nbsp;&nbsp;&nbsp; total : {totalCount}
                                    </span>
                )
            }
            SelectProps={{
                inputProps: {'aria-label': 'rows per page'},
                native: true,
            }}
        />
    );

    const usersTable = (
        <TableBody>
            { users
                // .slice(pagingRedux.pageBeginRow, pagingRedux.pageEndRow)
                .map((user) => {
                    console.log("rendering map...");
                    return (
                        <TableRow
                            className="material-table__row"
                            tabIndex={-1}
                            key={user.idx}
                        >
                            <TableCell className="material-table__cell material-table__cell-right">
                                {user.userId}
                            </TableCell>
                            <TableCell className="material-table__cell material-table__cell-right">
                                {user.name}
                            </TableCell>
                            <TableCell className="material-table__cell material-table__cell-right">
                                {user.email}
                            </TableCell>
                            <TableCell className="material-table__cell material-table__cell-right">
                                {user.hp}
                            </TableCell>
                            <TableCell className="material-table__cell material-table__cell-right">
                                {user.authLevel}
                            </TableCell>
                            <TableCell className="material-table__cell material-table__cell-right">
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
                    <div className="material-table__wrap">
                        <Table className="material-table">
                            <UserHead/>
                            {usersTable}
                        </Table>
                        {pageBar}
                   </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default UserList;
