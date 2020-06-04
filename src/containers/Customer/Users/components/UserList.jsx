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
    pagingChangeCurrentPage,
    pagingChangeRowsPerPage,
    pagingChangeTotalCount, pagingChangeTotalPage,
} from "../../../../redux/actions/pagingActions";

const UserList = () => {
    const dispatch = useDispatch();
    const {
        users, page, paging, rowsPerPage, currentPage, totalPage, totalCount, displayRowsList,
    } = useSelector(({userList, pagination}) => ({
        users: userList.users,
        page: userList.page,
        paging: pagination,
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
        console.log("--> totalPage:", totalPage);
        if (count === 0) {
            dispatch(pagingChangeTotalPage({totalPage: 1}));
        } else if (count !== totalCount) {
            dispatch(pagingChangeTotalCount({totalCount: count}));
            const total = (count / rowsPerPage);
            console.log("--> count:", count);
            console.log("--> total:", total);
            if (total !== totalPage) {
                dispatch(pagingChangeTotalPage({totalPage: Math.ceil(total)}));
            }
        }
    };

    const handleChangePagePrev = () => {
        if (currentPage > 1) {
            // dispatch(pagingChangeCurrentPage(currentPage - 1));
        }
    };

    const handleChangePageNext = () => {
        if (currentPage < totalCount) {
            // dispatch(pagingChangeCurrentPage(currentPage + 1));
        }
    };

    const handleChangeRowsPerPage = (e) => {
        const changeRows = Number(e.target.value);
        console.log("[changeRowsPerPage]");
        console.log("--> ", changeRows);
        dispatch(pagingChangeRowsPerPage({changeRows}));
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
        getPageData();
    }, []);

    useEffect(() => {
        console.log("[useEffect] paging: ", paging);
    }, [paging]);

    useEffect(() => {
        console.log("[useEffect] rowsPerPage - ", rowsPerPage);
    }, [rowsPerPage]);

    useEffect(() => {
        if (page) {
            const {count} = page;
            console.log("[page]", page);
            console.log("--> count", count);
            updatePagingTotalCount({count});
        }
    }, [page]);

    useEffect(() => {
        dumpPagingVar({location: "[USERS]"});
        console.log("page:", page);
        if (users) {
            console.log("[users]");
            console.log(users);
        }
    }, [users]);


    useEffect(() => {
        dumpPagingVar({location: "[INIT]"});
    }, [totalCount]);

    const usersTable = (
        <TableBody>
            { users
                .map((user) => {
                    console.log("map..");
                    return (
                        <TableRow
                            className="material-table__row"
                            role="checkbox"
                            tabIndex={-1}
                            key={user.idx}
                        >
                            <TableCell className="material-table__cell"
                                       padding="checkbox">
                                <Checkbox checked={false}
                                          className="material_table__checkbox"/>
                            </TableCell>
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
                                // rowsPerPageOptions={[10, 50, 100]}
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
                        </Table>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default UserList;
