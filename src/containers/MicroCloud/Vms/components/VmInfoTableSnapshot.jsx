import React, {useEffect, useState, Fragment} from "react";
import {Card, CardBody, Col} from "reactstrap";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import {TableRow} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import {makeStyles} from "@material-ui/core/styles";
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import {useSnackbar} from "notistack";
import {useDispatch, useSelector} from "react-redux";
import TableToolbarSnapshot from "./TableToolbarSnapshot";
import CommonTableHead from "../../../Common/CommonTableHead";
import {
    pagingChangeCurrentPage,
    pagingChangeCurrentPageNext,
    pagingChangeCurrentPagePrev, pagingChangeOrder, pagingChangeOrderBy, pagingChangeRowsPerPage, pagingChangeSelected,
    pagingChangeTotalCount, pagingDump,
} from "../../../../redux/actions/pagingActions";
import {
    deleteSnapshotList, getMcVmSnapshot, recoveryMcVm,
} from "../../../../lib/api/microCloud";
import {OPERATOR} from "../../../../lib/var/globalVariable";
//import SnapshotRecoveryModal from "./SnapshotRecoveryModal";

const headRows = [
    {
        id: 'idx',
        disablePadding: false,
        label: 'Index',
    },
    {
        id: 'date',
        disablePadding: false,
        label: 'Snapshot 날짜',
    },
    {
        id: 'current',
        disablePadding: false,
        label: '현재 Snapshot 위치',
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
        // width: '200px',
    },
    grid: {
        flexGrow: 1,
    },
    margin: {
        margin: theme.spacing(0),
    },
}));

const VmInfoTableSnapshot = () => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("user"));

    const [data, setData] = useState([]);
    const [paging, setPaging] = useState(null);
    const [adminLevel, setAdminLevel] = useState(true);
    const [openRecovery, setOpenRecovery] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const [recoveryRow, setRecoveryRow] = useState(null);

    const dispatch = useDispatch();

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

    /*******************
     * Pagination
     *******************/
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
    const getSelected = id => !!selected.get(id);

    const getPageData = async () => {
        let offset = 0;
        if (currentPage > 0) {
            offset = rowsPerPage * currentPage;
        }
        let companyName;
        if (user.level <= OPERATOR) { //관리자
            companyName = "all";
        } else {
            companyName = user.cpName;
        }
        try {
            console.log("companyName : ", companyName);
            const response = await getMcVmSnapshot({
                rows: rowsPerPage,
                offset,
                orderBy,
                order,
                cpName: companyName,
            });
            console.log("response: data ", response.data.data);
            console.log("response: page ", response.data.page);
            setData(response.data.data);
            setPaging(response.data.page);
        } catch (e) {
            console.log("getPageData error!");
        }
    };

    /** Pagination */
    const handleRefresh = () => {
        getPageData();
    };

    const handleSnackbarFailure = (snackMsg) => {
        enqueueSnackbar(snackMsg);
    };

    const handleSnackbarSuccess = (snackMsg) => {
        enqueueSnackbar(snackMsg, {variant: "success"});
    };

    const deleteData = async (items) => {
        try {
            const response = await deleteSnapshotList({idx: items});
            getPageData();
            handleSnackbarSuccess("Snapshot 삭제에 성공하였습니다.");
        } catch (error) {
            getPageData();
            handleSnackbarFailure("Snapshot 삭제에 실패하였습니다.");
        }
    };

    const handleDeleteSelected = () => {
        let copyData = [...data];
        const delList = [];
        if (selected !== null) {
            selected.forEach((value, key, mapObject) => {
                if (value) {
                    delList.push(key);
                }
            });
        }
        deleteData(delList);

        for (let i = 0; i < [...selected].filter(el => el[1]).length; i += 1) {
            copyData = copyData.filter(obj => obj.id !== selected[i]);
        }
    };

    const handleOpenRecovery = () => {
        setOpenRecovery(true);
    };

    const handleCloseRecovery = () => {
        setOpenRecovery(false);
    };

    const asyncRecoveryVm = async (obj) => {
        try {
            const response = await recoveryMcVm({
                idx: obj.idx,
                serverIdx: obj.serverIdx,
                vmName: obj.vmName,
                name: obj.name,
            });
            handleSnackbarSuccess("Snapshot 복구에 성공하였습니다.");
            getPageData();
        } catch (e) {
            handleSnackbarFailure("Snapshot 복구에 실패하였습니다.");
        }
    };

    const handleSubmitRecovery = (snap) => {
        setOpenRecovery(false);
        console.log("submit: ", snap);
        asyncRecoveryVm(snap);
    };

    useEffect(() => {
        /** Pagination */
        getPageData();
        dispatch(pagingDump());
    }, [rowsPerPage, pageBeginRow, orderBy, order]);

    useEffect(() => {
        if (paging) {
            const {count} = paging;
            updatePagingTotalCount({count});
        }
    }, [paging]);

    useEffect(() => {

    }, []);

    const ContentsRow = (props) => {
        const {row} = props;
        const isSelected = getSelected(row.idx);
        const cellClassName = "cb-material-table__cell";
        const cellIcon = isSelected ? "cb-material-table__cell-right" : cellClassName;
        const [openCollapse, setOpenCollapse] = useState(false);
        const [checkboxColor, setCheckboxColor] = useState('');
        const [recoveryColor, setRecoveryColor] = useState("action");
        return (
            <React.Fragment>
                <TableRow
                    hover
                    // className="cb-material-table__row"
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
                        className="cb-material-table__checkbox"
                        padding="checkbox"
                        onClick={event => handleClick(event, row.idx)}
                        style={{width: "5%"}}
                    >
                        <Checkbox checked={isSelected}
                                  className="cb-material-table__checkbox"
                                  style={{
                                      color: `${checkboxColor}`,
                                  }}
                        />
                    </TableCell>
                    {adminLevel && (
                        <React.Fragment>
                            <TableCell
                                className={cellClassName}
                                style={{width: "5%"}}
                            >
                                {row.idx}
                            </TableCell>
                        </React.Fragment>
                    )}
                    <TableCell
                        className={cellClassName}
                        style={{width: "5%"}}
                    >
                        {row.year}년{row.month}월{row.day}일, {row.hour}시{row.minute}분{row.second}초
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "5%"}}
                    >
                        {row.current ? <RadioButtonCheckedIcon color="secondary"/>
                            : (
                                <RadioButtonUncheckedIcon
                                    color={recoveryColor}
                                    onMouseOver={(e) => {
                                        setRecoveryRow(row);
                                        setRecoveryColor("secondary");
                                    }}
                                    onMouseLeave={(e) => {
                                        setRecoveryColor("action");
                                    }}
                                    onClick={handleOpenRecovery}/>
                            )}
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    };

    return (
        <Card>
            <CardBody className="vm__card" style={{
                padding: "0.2rem",
            }}>
                <TableToolbarSnapshot
                    numSelected={[...selected].filter(el => el[1]).length}
                    handleDeleteSelected={handleDeleteSelected}
                    handleRefresh={handleRefresh}
                    onRequestSort={handleRequestSort}
                    rows={headRows}
                    contents="Snapshot"
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
                            size="{densePadding ? 'small' : 'medium'}"
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
            </CardBody>
        </Card>
    );
};

export default VmInfoTableSnapshot;
