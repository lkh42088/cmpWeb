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
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {IconButton, Tooltip} from "@material-ui/core";
import { useSnackbar } from 'notistack';
import ReactTooltip from "react-tooltip";
import {
    getCompanyList, getCompanyListWithSearchParam,
} from "../../../../redux/actions/companiesActions";
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
import CommonTableHead from "../../../Common/CommonTableHead";
import RegisterCompanyPage from "./RegisterCompanyPage";
import {modifyCompany, registerCompany, unregisterCompany} from "../../../../lib/api/company";
import CompanyTableToolbar from "./CompanyTableToolbar";
// eslint-disable-next-line import/named
import {limitLongString} from "../../../../lib/utils/utils";
import ModifyCompanyPage from "./ModifyCompanyPage";
import UserTableToolbar from "../../Users/components/UserTableToolbar";

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
    row: {
        '& > *': {
            borderBottom: 'unset',
        },
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
    } = useSelector(({ companiesRd, usersRd }) => ({
        data: companiesRd.data,
        getPage: companiesRd.page,
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
    const [modifyData, setModifyData] = React.useState(null);
    const [openModifyCompany, setOpenModifyCompany] = React.useState(false);
    const [openRegisterCompany, setOpenRegisterCompany] = React.useState(false);

    const [searchParam, setSearchParam] = useState(null);

    const handleOpenModifyCompany = () => {
        setOpenModifyCompany(true);
    };

    const handleCloseModifyCompany = () => {
        setOpenModifyCompany(false);
    };

    const handleOpenRegisterCompany = () => {
        setOpenRegisterCompany(true);
    };

    const handleCloseRegisterCompany = () => {
        setOpenRegisterCompany(false);
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
        if (searchParam !== null) {
            dispatch(getCompanyListWithSearchParam({
                rows: rowsPerPage, offset, orderBy, order, searchParam,
            }));
        } else {
            dispatch(getCompanyList({
                rows: rowsPerPage, offset, orderBy, order,
            }));
        }
    };

    const handleSubmitSearch = (params) => {
        console.log("handleSubmitSearch ", params);
        setSearchParam(params);
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

    const doRegisterCompany = async (props) => {
        const {
            cpName, cpZip, cpAddr, cpAddrDetail, cpHomepage,
            cpTel, cpHp, cpEmail, cpIsCompany, cpMemo, cpTerminationDate,
            userId, userPassword,
        } = props;
        try {
            const response = await registerCompany({
                cpName,
                cpTel,
                cpHp,
                cpZip,
                cpEmail,
                cpHomepage,
                cpAddr,
                cpAddrDetail,
                userId,
                userPassword,
                cpIsCompany,
                cpMemo,
                cpTerminationDate,
            });
            handleTriggerSuccess("고객사 등록이 성공하였습니다.");
            getPageData();
        } catch (error) {
            handleTriggerFailure("고객사 등록이 실패하였습니다.");
            getPageData();
            console.log("doRegisterCompany error!");
        }
    };

    const doModifyCompany = async (props) => {
        const {
          cpName, cpZip, cpAddr, cpAddrDetail, cpHomepage,
          cpTel, cpHp, cpEmail, cpIsCompany, cpMemo, cpTerminationDate,
          userId, userPassword,
        } = props;
        try {
            const response = await modifyCompany({
                cpName,
                cpTel,
                cpHp,
                cpZip,
                cpEmail,
                cpHomepage,
                cpAddr,
                cpAddrDetail,
                userId,
                userPassword,
                cpIsCompany,
                cpMemo,
                cpTerminationDate,
            });
            handleTriggerSuccess("고객사 수정이 성공하였습니다.");
            getPageData();
        } catch (error) {
            handleTriggerFailure("고객사 수정이 실패하였습니다.");
            getPageData();
            console.log("doModifyCompany error!");
        }
    };

    const handleSubmitRegisterCompany = (props) => {
        console.log("handleSubmitRegisterCompany: ", props);
        doRegisterCompany(props);
        setOpenRegisterCompany(false);
    };

    const handleSubmitModifyCompany = (props) => {
        console.log("handleSubmitModifyCompany: ", props);
        doModifyCompany(props);
        setOpenModifyCompany(false);
    };

    useEffect(() => {
        const changeOrderBy = "idx";
        console.log("[] orderBy: ", changeOrderBy);
        dispatch(pagingChangeOrderByWithReset({orderBy: changeOrderBy}));
    }, []);

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
    }, [rowsPerPage, pageBeginRow, orderBy, order]);

    useEffect(() => {
        console.log("useEffect: searchParam ", searchParam);
        getPageData();
    }, [searchParam]);

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

    const longMsgTooltip = (
        <ReactTooltip id="tooltipData" place="top" effect="solid"
                      delayHide={500} type="info"
                      className={classes.reactTooltip}
                      getContent={dataTip => `${dataTip}`} />
    );

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

    const handleDeleteSelectedCompany = (idx) => {
        console.log("delete company: ", idx);
        const delList = [];
        delList.push(idx);
        deleteCompanies(delList);
    };

    const handleModifySelectedCompany = (idx) => {
        console.log("modify company: ", idx);
        const res = data.filter(item => item.idx === idx);
        console.log("res: ", res);
        setModifyData(res[0]);
        handleOpenModifyCompany();
    };

    const DumpRow = (props) => {
        const { row } = props;
        const [openCollapse, setOpenCollapse] = React.useState(false);
        const isSelected = getSelected(row.idx);
        const address = getAddress(row);
        const cellClassName = "cb-material-table__cell";
        const cellIcon = isSelected ? "cb-material-table__cell-right" : cellClassName;
        return (
            <React.Fragment>
                <TableRow
                    hover
                    // className="cb-material-table__row"
                    className={classes.row}
                    role="checkbox"
                    onClick={() => setOpenCollapse(!openCollapse)}
                    aria-checked={isSelected}
                    selected={isSelected}
                >
                    <TableCell
                        className={cellClassName}
                        padding="checkbox"
                        onClick={event => handleClick(event, row.idx)}
                    >
                        <Checkbox checked={isSelected} className="cb-material-table__checkbox" />

                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{ width: "5%" }}
                    >
                        {row.idx}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "15%"}}
                        onMouseEnter={() => { setOpenCollapse(true); }}
                        onMouseLeave={() => { setOpenCollapse(false); }}
                    >
                        {row.name}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "15%"}}
                    >
                        {row.tel}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "15%"}}
                    >
                        {row.email}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "10%"}}
                    >
                        {row.cpUserId}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "25%"}}
                        data-tip={row.address}
                        data-for="tooltipData"
                    >
                        {limitLongString(row.address, 35)}
                    </TableCell>
                    <TableCell
                        className={cellIcon}
                        style={{width: "25%"}}
                        data-tip={row.memo}
                        data-for="tooltipData"
                    >
                        {isSelected ? (
                            <React.Fragment>
                                {limitLongString(row.memo, 10)}
                                <Tooltip title="수정">
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleModifySelectedCompany(row.idx);
                                    }}
                                >
                                    <EditIcon color="secondary"/>
                                </IconButton>
                                </Tooltip>
                                <Tooltip title="삭제">
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteSelectedCompany(row.idx);
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
                        {longMsgTooltip}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                        <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography variant="h6" gutterBottom component="div">
                                    {row.name}
                                </Typography>
                                <div className={classes.grid}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sm={6}>
                                            <ul>
                                                <li>
                                                    <span className={classes.spanSubject}> 회사명 </span>
                                                    <span className={classes.spanContents}> {row.name} </span>
                                                </li>
                                                <li>
                                                    <span className={classes.spanSubject}> Idx </span>
                                                    <span className={classes.spanContents}> {row.idx} </span>
                                                </li>
                                                <li>
                                                    <span className={classes.spanSubject}> 이메일 </span>
                                                    <span className={classes.spanContents}> {row.email} </span>
                                                </li>
                                                <li>
                                                    <span className={classes.spanSubject}> 대표 계정 </span>
                                                    <span className={classes.spanContents}> {row.cpUserId} </span>
                                                </li>
                                                <li>
                                                    <span className={classes.spanSubject}> 전화번호</span>
                                                    <span className={classes.spanContents}> {row.tel} </span>
                                                </li>
                                                <li>
                                                    <span className={classes.spanSubject}> 휴대폰번호</span>
                                                    <span className={classes.spanContents}> {row.hp} </span>
                                                </li>
                                            </ul>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <ul>
                                                <li>
                                                    <span className={classes.spanSubject}> 주소 </span>
                                                    <span className={classes.spanContents}> {address} </span>
                                                </li>
                                                <li>
                                                    <span className={classes.spanSubject}> 등록일 </span>
                                                    {/*<span className={classes.spanContents}> {row.} </span>*/}
                                                </li>
                                                <li>
                                                    <span className={classes.spanSubject}> 홈페이지 </span>
                                                    <span className={classes.spanContents}> {row.homepage} </span>
                                                </li>
                                                <li>
                                                    <span className={classes.spanSubject}> 메모 </span>
                                                    <span className={classes.spanContents}> {row.memo} </span>
                                                </li>
                                            </ul>
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
                    <CompanyTableToolbar
                        numSelected={[...selected].filter(el => el[1]).length}
                        handleDeleteSelected={handleDeleteSelected}
                        onRequestSort={handleRequestSort}
                        handleRefresh={handleRefresh}
                        rows={headRows}
                        handleOpen={handleOpenRegisterCompany}
                        contents="고객사"
                        handleSubmitSearch={handleSubmitSearch}
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
                                <TableBody>
                                    { data && data.map((row, index) => {
                                        const keyId = index;
                                        return (
                                            <DumpRow key={keyId} row={row}/>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {/*{paginationBar}*/}
                        <FormControlLabel
                            className="cb-material-table__padding"
                            control={<Switch checked={dense} onChange={handleChangeDense} />}
                            label="Dense padding"
                        />
                    </div>
                    <ModifyCompanyPage
                        open={openModifyCompany}
                        handleClose={handleCloseModifyCompany}
                        handleSubmit={handleSubmitModifyCompany}
                        refreshPage={getPageData}
                        data={modifyData}
                    />
                    <RegisterCompanyPage
                        open={openRegisterCompany}
                        handleClose={handleCloseRegisterCompany}
                        handleSubmit={handleSubmitRegisterCompany}
                        refreshPage={getPageData}
                    />
               </CardBody>
            </Card>
        </Col>
    );
};

export default CompanyList;
