import React, {useEffect, useState} from "react";
import {Card, Col} from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import {useDispatch, useSelector} from "react-redux";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import {useSnackbar} from "notistack";
import {IconButton} from "@material-ui/core";
import BlurOnOutlinedIcon from '@material-ui/icons/BlurOnOutlined';
import BuildIcon from '@material-ui/icons/Build';
import ReactTooltip from "react-tooltip";
import {
    pagingChangeCurrentPage,
    pagingChangeOrderByWithReset,
    pagingChangeRowsPerPage,
    pagingChangeSelected, pagingChangeSorting,
    pagingChangeTotalCount,
} from "../../../../redux/actions/pagingActions";
import {
    readSubnet, deleteSubnets, createSubnet, updateSubnet,
} from "../../../../lib/api/subnet";
import SubnetTableToolbar from "./SubnetTableToolbar";
import CommonTableHead from "../../../Common/CommonTableHead";
import ConfirmSnackbar from "../../../Common/ConfirmSnackbar";
import {limitLongString} from "../../../../lib/utils/utils";
import SubnetWriteForm from "./SubnetWriteForm";
import DialogForm from "../../../Common/DialogForm";
import SubnetContents from "./SubnetContents";

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
    const [tableHeight, setTableHeight] = useState(600);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [title, setTitle] = useState('');
    const [selectedData, setSelectedData] = useState(null);
    const [create, setCreate] = useState(true);
    const [warningContents, setWarningContents] = useState('');

    /**************************************************************
     * Function
     **************************************************************/
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

    /**************************************************************
     * Axios Function
     **************************************************************/
    const getData = async () => {
        // console.log("★★★★★★★★", "get Data!!");
        try {
            let response;
            if (searchParam !== null && searchParam !== '') {
                console.log("★★★★", currentPage, rowsPerPage, searchParam);
                response = await readSubnet({
                    rows: rowsPerPage,
                    offset: (currentPage === 0) ? 0 : currentPage * rowsPerPage,
                    orderBy,
                    order,
                    searchParam,
                });
            } else {
                response = await readSubnet({
                    rows: rowsPerPage,
                    offset: (currentPage === 0) ? 0 : currentPage * rowsPerPage,
                    orderBy,
                    order,
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

    const createData = async (data) => {
        // console.log("★★★★★★★★", "Create Data!! ", data);
        try {
            const response = await createSubnet({
                subnetTag: data.subnetTag,
                subnetStart: data.subnetStart,
                subnetEnd: data.subnetEnd,
                subnetMask: data.subnetMask,
                gateway: data.gateway,
            });
            // console.log(response);
            getData();
            handleSnackbarSuccess("SUBNET 생성에 성공 하였습니다.");
        } catch {
            handleSnackbarFailure("SUBNET 생성에 실패 하였습니다.");
        }
    };

    const modifyData = async (data) => {
        // console.log("★★★★★★★★", "Modify Data!! ", data);
        try {
            const response = await updateSubnet({
                idx: data.idx,
                subnetTag: data.subnetTag,
                subnetStart: data.subnetStart,
                subnetEnd: data.subnetEnd,
                subnetMask: data.subnetMask,
                gateway: data.gateway,
            });
            // console.log(response);
            getData();
            handleSnackbarSuccess("SUBNET 수정에 성공 하였습니다.");
        } catch {
            handleSnackbarFailure("SUBNET 수정에 실패 하였습니다.");
        }
    };

    /**************************************************************
     * Event Handler
     **************************************************************/
    const handleRefresh = () => {
        getData();
    };

    const handleDeleteSelected = () => {
        setWarningContents("삭제 하시겠습니까?");
        setOpen(!open);
    };

    const handleOpenModal = () => {
        setSelectedData({
            idx: 0,
            subnetTag: '',
            subnetStart: '',
            subnetEnd: '',
            subnetMask: '',
            gateway: '',
        });
        setTitle("서브넷 추가");
        setCreate(true);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleSubmitModal = (data) => {
        if (create) {
            createData(data);
        } else {
            modifyData(data);
        }
        setOpenModal(false);
    };

    const handleSubmitSearchModal = (search) => {
        setSearchParam(search);
        getData();

        /** Init value */
        setSearchParam('');
    };

    const handleModifySelected = (id) => {
        const row = state.data.filter(item => item.idx === id);
        setSelectedData(row[0]);

        setTitle("서브넷 수정");
        setCreate(false);
        setOpenModal(true);
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
        // console.log("useEffect: searchParam ", searchParam);
        getData();
    }, [searchParam]);

    /**************************************************************
     * Component
     **************************************************************/

    /**************************************************************
     * JSX Template
     **************************************************************/
    const ContentsRow = (props) => {
        const { row } = props;
        const [openCollapse, setOpenCollapse] = React.useState(false);
        const isSelected = getSelected(row.idx);
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
                                        handleModifySelected(row.idx);
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
                    {SubnetContents}
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
                title={title}
                icon={<BlurOnOutlinedIcon />}
                width="600px"
                childComponent={(
                    <SubnetWriteForm
                        handleClose={handleCloseModal}
                        handleSubmit={handleSubmitModal}
                        handleSubmitSearch={handleSubmitSearchModal}
                        subnetIdxValue={selectedData && selectedData.idx}
                        subnetStartValue={selectedData && selectedData.subnetStart}
                        subnetEndValue={selectedData && selectedData.subnetEnd}
                        subnetTagValue={selectedData && selectedData.subnetTag}
                        subnetMaskValue={selectedData && selectedData.subnetMask}
                        gatewayValue={selectedData && selectedData.gateway}
                        create={create}
                    />
                    )}
            />
        </Col>
    );
};

export default React.memo(SubnetList);
