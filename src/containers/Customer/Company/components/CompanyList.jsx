import 'date-fns';
import React, {useEffect, useState} from "react";
import {
    Card,
    CardBody,
    Col,
} from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TablePagination from "@material-ui/core/TablePagination";
import TableContainer from "@material-ui/core/TableContainer";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {makeStyles} from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import { SnackbarProvider, useSnackbar } from 'notistack';
import ReactTooltip from "react-tooltip";
import {
    initRegisterCompany,
    getCompanyList,
    changeCompanyMsgField,
} from "../../../../redux/actions/companiesActions";
import {initRegisterUser} from "../../../../redux/actions/usersActions";
import {
    pagingChangeCurrentPage,
    pagingChangeCurrentPageNext,
    pagingChangeCurrentPagePrev,
    pagingChangeDense,
    pagingChangeOrder,
    pagingChangeOrderBy, pagingChangeOrderByWithReset,
    pagingChangeRowsPerPage,
    pagingChangeSelected,
    pagingChangeTotalCount,
} from "../../../../redux/actions/pagingActions";
import CbAdminTableToolbar from "../../../Common/CbAdminTableToolbar";
import CommonTableHead from "../../../Common/CommonTableHead";
// import AddCompany from "./AddCompany";
import RegisterCompanyPage from "./RegisterCompanyPage";
import {registerCompany, unregisterCompany} from "../../../../lib/api/company";

const headRows = [
    {id: 'idx', disablePadding: false, label: 'Index'},
    {id: 'name', disablePadding: false, label: '회사명'},
    {id: 'tel', disablePadding: false, label: '전화번호'},
    {id: 'email', disablePadding: false, label: '이메일'},
    {id: 'cpUserId', disablePadding: false, label: '대표 ID'},
    {id: 'address', disablePadding: false, label: '주소'},
    {id: 'memo', disablePadding: false, label: '메모'},
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
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalPaper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    reactTooltip: {
        fontSize: 7,
        fontFamily: "GmarketSansTTFBold",
    },
}));

const CompanyList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    /**
     * Company Data
     */
    const {
        data, getPage,
        cpMsg,
        cpMsgError,
    } = useSelector(({ companiesRd, usersRd }) => ({
        data: companiesRd.data,
        getPage: companiesRd.page,
        cpMsg: companiesRd.msg,
        cpMsgError: companiesRd.msgError,
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
    /**
     * Modal variable
     */
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        dispatch(initRegisterCompany());
        dispatch(initRegisterUser());
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleTriggerFailure = (snackMsg) => {
        enqueueSnackbar(snackMsg);
    };

    const handleTriggerSuccess = (snackMsg) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(snackMsg, { variant: "success" });
    };

    /**
     * Date variable
     */
    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
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
        dispatch(pagingChangeOrder({order: changeOrder}));
        dispatch(pagingChangeOrderBy({orderBy: property}));
    };

    /** Pagination */
    const getPageData = () => {
        let offset = 0;
        if (currentPage > 0) {
            offset = rowsPerPage * currentPage;
        }
        console.log(">>>>>> get Page Data: rows ", rowsPerPage, ", offset ", offset,
            ", orderBy ", orderBy, ", order ", order);
        dispatch(getCompanyList({
            rows: rowsPerPage, offset, orderBy, order,
        }));
    };

    const deleteCompanies = async (companies) => {
        try {
            const response = await unregisterCompany({idx: companies});
            handleTriggerSuccess("고객사 삭제에 성공하였습니다.");
            getPageData();
        } catch (error) {
            handleTriggerFailure("고객사 삭제에 실패하였습니다.");
            getPageData();
        }
    };

    const handleDeleteSelected = () => {
        let copyUser = [...data];
        console.log("deleted Selected:");
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
        deleteCompanies(delList);
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
    const getSelected = id => !!selected.get(id);

    const handleRefresh = () => {
        getPageData();
    };

    const handleRegisterCompany = async ({
        cpName, cpZip, cpAddr, cpAddrDetail, cpHomepage,
        cpTel, cpEmail, cpIsCompany, cpMemo, cpTerminationDate,
        userId, userPassword,
    }) => {
        try {
            const response = await registerCompany({
                cpName,
                cpZip,
                cpAddr,
                cpAddrDetail,
                cpHomepage,
                cpTel,
                cpEmail,
                cpIsCompany,
                cpMemo,
                cpTerminationDate,
                userId,
                userPassword,
            });
            handleTriggerSuccess("고객사 등록에 성공하였습니다.");
            getPageData();
        } catch (error) {
            handleTriggerFailure("고객사 등록에 실패하였습니다.");
            getPageData();
            console.log("handleRegisterCompany error!");
        }
    };

    useEffect(() => {
        const changeOrderBy = "idx";
        console.log("[] orderBy: ", changeOrderBy);
        dispatch(pagingChangeOrderByWithReset({orderBy: changeOrderBy}));
        dispatch(changeCompanyMsgField({key: "msg", value: null}));
        dispatch(changeCompanyMsgField({key: "msgError", value: null}));
    }, []);

    useEffect(() => {
        // dispatch(pagingDump());
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
        // dispatch(pagingDump());
    }, [rowsPerPage, pageBeginRow, orderBy, order]);

    // useEffect(() => {
    //     if (cpMsg) {
    //         console.log("cpMsg: success!");
    //         getPageData();
    //         dispatch(changeCompanyMsgField({key: "msg", value: null}));
    //     }
    // }, [cpMsg]);
    //
    // useEffect(() => {
    //     if (cpMsgError) {
    //         console.log("cpMsg: failure!");
    //         dispatch(changeCompanyMsgField({key: "msgError", value: null}));
    //     }
    // }, [cpMsgError]);

    /** Pagination */
    const paginationBar = (
        <TablePagination
            component="div"
            className="cb-material-table__pagination"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            rowsPerPageOptions={displayRowsList}
        />
    );

    /** 글자수 체크 함수 */
    const checkStringLength = (str) => {
        if (str && str.length >= 35) {
            return str.substr(0, 34).concat('......');
        }
        return str;
    };

    const tooltip = (
        <ReactTooltip id="tooltip" place="top" effect="solid"
                      delayHide={500} type="info"
                      className={classes.reactTooltip}
                      getContent={dataTip => `${dataTip}`} />
    );

    const tableRows = (
        <TableBody>
            { data && data.map((row) => {
                const isSelected = getSelected(row.idx);
                    return (
                        <TableRow
                            hover
                            className="cb-material-table__row"
                            role="checkbox"
                            onClick={event => handleClick(event, row.idx)}
                            aria-checked={isSelected}
                            tabIndex={-1}
                            key={row.idx}
                            selected={isSelected}

                        >
                            <TableCell className="cb-material-table__cell" padding="checkbox" >
                                <Checkbox checked={isSelected} className="cb-material-table__checkbox" />
                            </TableCell>
                            <TableCell
                                className="cb-material-table__cell cb-material-table__cell-right"
                                style={{width: "5%"}}
                            >
                                {row.idx}
                            </TableCell>
                            <TableCell
                                className="cb-material-table__cell cb-material-table__cell-right"
                                style={{width: "15%"}}
                            >
                                {row.name}
                            </TableCell>
                            <TableCell
                                className="cb-material-table__cell cb-material-table__cell-right"
                                style={{width: "15%"}}
                            >
                                {row.tel}
                            </TableCell>
                            <TableCell
                                className="cb-material-table__cell cb-material-table__cell-right"
                                style={{width: "15%"}}
                            >
                                {row.email}
                            </TableCell>
                            <TableCell className="cb-material-table__cell cb-material-table__cell-right"
                                style={{width: "10%"}}
                            >
                                {row.cpUserId}
                            </TableCell>
                            <TableCell
                                className="cb-material-table__cell cb-material-table__cell-right"
                                style={{width: "25%"}}
                                data-tip={row.address}
                                data-for="tooltip"
                            >
                                {checkStringLength(row.address)}
                            </TableCell>
                                <TableCell
                                className="cb-material-table__cell cb-material-table__cell-right"
                                style={{width: "25%"}}
                                data-tip={row.memo}
                                data-for="tooltip"
                            >
                                {checkStringLength(row.memo)}
                                {tooltip}
                            </TableCell>
                        </TableRow>
                    );
                })
            }
        </TableBody>
    );

    return (
        <Col md={12} lg={12}>
            <Card className="cb-card">
                <CardBody className="cb-card-body">
                    <CbAdminTableToolbar
                        numSelected={[...selected].filter(el => el[1]).length}
                        handleDeleteSelected={handleDeleteSelected}
                        onRequestSort={handleRequestSort}
                        handleRefresh={handleRefresh}
                        rows={headRows}
                        toolbarTitle="고객사 리스트"
                        handleOpen={handleOpen}
                        contents="고객사"
                    />
                    <div className="cb-material-table__wrap">
                        <TableContainer>
                            <Table
                                className="cb-material-table"
                                size={dense ? 'small' : 'medium'}
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
                                {tableRows}
                            </Table>
                        </TableContainer>
                        {paginationBar}
                        <FormControlLabel
                            className="cb-material-table__padding"
                            control={<Switch checked={dense} onChange={handleChangeDense} />}
                            label="Dense padding"
                        />
                    </div>
                    {/*<AddCompany open={open} handleClose={handleClose} refreshPage={getPageData}/>*/}
                    <RegisterCompanyPage
                        open={open}
                        handleClose={handleClose}
                        handleSubmit={handleRegisterCompany}
                        refreshPage={getPageData}
                    />
                </CardBody>
            </Card>
        </Col>
    );
};

export default CompanyList;
