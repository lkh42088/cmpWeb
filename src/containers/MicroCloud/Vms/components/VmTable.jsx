import React, {useEffect, useState, Fragment} from "react";
import {
    Card,
    CardBody,
    Col,
} from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";

import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import {Button, TableRow, Tooltip} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {useSnackbar} from "notistack";
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from '@material-ui/core/NativeSelect';
import Menu from '@material-ui/core/Menu';
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import {
    pagingChangeCurrentPage,
    pagingChangeCurrentPageNext,
    pagingChangeCurrentPagePrev,
    pagingChangeOrder,
    pagingChangeOrderBy,
    pagingChangeRowsPerPage,
    pagingChangeSelected,
    pagingChangeTotalCount, pagingDump,
} from "../../../../redux/actions/pagingActions";
import VmTableToolbar from "./VmTableToolbar";
import CommonTableHead from "../../../Common/CommonTableHead";
import RegisterVm from "./RegisterVm";
import {
    getMcVms, registerMcVm, sendVmAction, unregisterMcVm, modifyMcVm,
} from "../../../../lib/api/microCloud";
import {changeVmPage} from "../../../../redux/actions/vmsActions";
import {CUSTOMER_MANAGER, OPERATOR, TOP_MANAGER} from "../../../../lib/var/globalVariable";
import ModifyVm from "./ModifyVm";

const headRows = [
    {id: 'idx', disablePadding: false, label: 'Index'},
    {id: 'cpName', disablePadding: false, label: '회사명'},
    {id: 'serialNumber', disablePadding: false, label: '서버 SN'},
    {id: 'name', disablePadding: false, label: 'VM 이름'},
    {id: 'cpu', disablePadding: false, label: 'CPU'},
    {id: 'ram', disablePadding: false, label: 'RAM'},
    {id: 'hdd', disablePadding: false, label: 'HDD'},
    {id: 'status', disablePadding: false, label: 'Status'},
    {id: 'network', disablePadding: false, label: 'Network'},
    {id: 'ipAddr', disablePadding: false, label: 'IP Address'},
    {id: 'remoteAddr', disablePadding: false, label: 'Remote RDP'},
    // {id: 'snapshot', disablePadding: false, label: 'Snapshot'},
    {id: 'colspan', disablePadding: false, label: 'Action'},
    {id: 'button', disablePadding: false, label: ''},
    /*{id: 'action', disablePadding: false, label: 'Action'},*/
];

const BootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

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
                    // border: "1px solid #e0e0e0",
                    // borderRight: "1px solid #e0e0e0",
                }
                : {
                    boxShadow: "4px 2px 3px #000000",
                    // border: "1px solid #000000",
                    // borderRight: "1px solid #e0e0e0",
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const actionList = [
    { value: 1, name: "Shutdown" },
    { value: 2, name: "Start" },
    { value: 3, name: "Restart" },
    { value: 4, name: "Suspend" },
    { value: 5, name: "Resume" },
    { value: 6, name: "Snapshot" },
];

const VmTable = () => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("user"));

    const [data, setData] = useState([]);
    const [paging, setPaging] = useState(null);
    const [openAddVm, setOpenAddVm] = useState(false);
    const [openEditVm, setOpenEditVm] = useState(false);
    const [searchParam, setSearchParam] = useState(null);
    const [adminLevel, setAdminLevel] = useState(true);
    const {enqueueSnackbar} = useSnackbar();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [modifyData, setModifyData] = React.useState(null);

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
            const response = await getMcVms({
                rows: rowsPerPage, offset, orderBy, order, cpName: companyName,
            });
            setData(response.data.data);
            setPaging(response.data.page);
        } catch (e) {
            console.log("getPageData error!");
        }
    };

    const handleOpenAddVm = () => {
        setOpenAddVm(true);
    };

    const handleCloseAddVm = () => {
        setOpenAddVm(false);
    };

    const handleOpenEditVm = () => {
        setOpenEditVm(true);
    };

    const handleCloseEditVm = () => {
        setOpenEditVm(false);
    };

    const handleSnackbarFailure = (snackMsg) => {
        enqueueSnackbar(snackMsg);
    };

    const handleSnackbarSuccess = (snackMsg) => {
        enqueueSnackbar(snackMsg, { variant: "success" });
    };

    const asyncSendVmAction = async (idx, vmAction) => {
        try {
            const response = await sendVmAction({
               idx,
               vmAction,
            });
            handleSnackbarSuccess("VM Action 성공하였습니다.");
        } catch (e) {
            handleSnackbarFailure("VM Action 실패하였습니다.");
        }
    };

    const asyncAddVm = async (vm) => {
        const {
            name, cpIdx, serialNumber, serverIdx, cpu, ram, hdd, image, imageName, os, networkName,
            snapType, snapDays, snapHours, snapMinutes,
            backupType, backupDays, backupHours, backupMinutes,
            vmUserId, vmUserFlag,
        } = vm;
        //console.log("💍💍💍💍💍💍 asyncAddVm : ", vm);
        try {
            let tempVmUserId = vmUserId;
            if (!vmUserFlag) {
                tempVmUserId = "";
            }
            const response = await registerMcVm({
                name,
                cpIdx,
                serialNumber,
                serverIdx,
                // eslint-disable-next-line radix
                cpu: parseInt(cpu),
                // eslint-disable-next-line radix
                ram: parseInt(ram),
                // eslint-disable-next-line radix
                hdd: parseInt(hdd),
                image: imageName,
                os,
                network: networkName,
                snapType,
                snapDays,
                snapHours,
                snapMinutes,
                backupType,
                backupDays,
                backupHours,
                backupMinutes,
                vmUserId: tempVmUserId,
            });

            handleSnackbarSuccess("VM 등록에 성공하였습니다.");
            getPageData();
        } catch (e) {
            handleSnackbarFailure("VM 등록에 실패하였습니다.");
        }
    };


    const asyncEditVm = async (vm) => {
        const {
            idx, cpIdx,
            snapType, snapDays, snapHours, snapMinutes,
            vmUserId, vmUserFlag, networkName,
            backupType, backupDays, backupHours, backupMinutes,
        } = vm;
        //console.log("🤖🤖🤖🤖🤖🤖🤖 asyncEditVm : ", vm);
        try {
            let tempVmUserId = vmUserId;
            if (!vmUserFlag) {
                tempVmUserId = "";
            }
            const response = await modifyMcVm({
                idx,
                network: networkName,
                snapType,
                snapDays,
                snapHours,
                snapMinutes,
                backupType,
                backupDays,
                backupHours,
                backupMinutes,
                vmUserId: tempVmUserId,
            });

            handleSnackbarSuccess("VM 수정에 성공하였습니다.");
            getPageData();
        } catch (e) {
            handleSnackbarFailure("VM 수정에 실패하였습니다.");
        }
    };

    const handleSubmitAddVm = (vm) => {
        asyncAddVm(vm);
        handleCloseAddVm();
    };

    const handleSubmitEditVm = (vm) => {
        console.log("handleSubmitEditVm start");
        asyncEditVm(vm);
        handleCloseEditVm();
    };

    const handleModifySelectedVm = (idx) => {
        const res = data.filter(item => item.idx === idx);
        setModifyData(res[0]);
        handleOpenEditVm();
    };

    const handleSubmitSearch = (params) => {
        setSearchParam(params);
    };

    /** Pagination */
    const handleRefresh = () => {
        getPageData();
    };

    const deleteData = async (items) => {
        try {
            const response = await unregisterMcVm({idx: items});
            getPageData();
            handleSnackbarSuccess("VM 삭제에 성공하였습니다.");
        } catch (error) {
            getPageData();
            handleSnackbarFailure("VM 삭제에 실패하였습니다.");
        }
    };

    const handleDeleteSelected = () => {
        let copyData = [...data];
        /*console.log("deleted Selected:");
        console.log("copyData:", copyData);
        console.log("SELECTED:", selected);*/
        const delList = [];
        if (selected !== null) {
            selected.forEach((value, key, mapObject) => {
                //console.log("selected: key ", key, ", value ", value);
                if (value) {
                    delList.push(key);
                }
            });
        }
        //console.log("delList: ", delList);
        deleteData(delList);

        for (let i = 0; i < [...selected].filter(el => el[1]).length; i += 1) {
            copyData = copyData.filter(obj => obj.id !== selected[i]);
        }
        //console.log("after copyData:", copyData);
    };

    const handleVmPage = (idx) => {
        const res = data.filter(item => item.idx === idx);
        //dispatch(changeVmPage({ pageType: 'page', data: res[0]}));
        dispatch(changeVmPage({ pageType: 'info', data: res[0]}));
    };

    const handleSendVmAction = (vm, vmAction) => {
        /*console.log("handleSendVmAction:", vm);
        console.log("handleSendVmAction: vmAction", vmAction);*/
        // vm.idx, vmAction
        asyncSendVmAction(vm.idx, vmAction);
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
        if (user) {
            const {level} = user;
            if (level >= CUSTOMER_MANAGER) {
                let idx = headRows.findIndex(item => item.id === 'idx');
                if (idx > -1) {
                    headRows.splice(idx, 1);
                }
                idx = headRows.findIndex(item => item.id === 'cpName');
                if (idx > -1) {
                    headRows.splice(idx, 1);
                }
                idx = headRows.findIndex(item => item.id === 'serialNumber');
                if (idx > -1) {
                    headRows.splice(idx, 1);
                }
                setAdminLevel(false);
            }
        }
    }, []);

   /* const variant = "filled";
    const fieldSize = "small";
    const buttonSize = "small";
    const formClassName = "cb-material-form";
    const labelClassName = "cb-material-form__label";
    const fieldClassName = "cb-material-form__field";*/

    const ContentsRow = (props) => {
        const {row} = props;
        const isSelected = getSelected(row.idx);
        const cellClassName = "cb-material-table__cell";
        const cellIcon = isSelected ? "cb-material-table__cell-right" : cellClassName;
        const [openCollapse, setOpenCollapse] = useState(false);
        const [checkboxColor, setCheckboxColor] = useState('');
        const [vmAction, setVmAction] = useState(0);
        const [spacing, setSpacing] = useState(0);
        return (
            <React.Fragment>
                {/*<div style={{
                    border: "1px solid red",
                    padding: "0 0 0 20px",
                }}>
                    <Button aria-controls={`simple-menu${row.idx}`}
                            aria-haspopup="true"
                            onClick={handleAnchorElClick}>
                        {row.vmUserId}
                    </Button>
                    <Menu
                        id={`simple-menu${row.idx}`}
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleAnchorElClose}
                    >
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>My account</MenuItem>
                    </Menu>
                </div>*/}
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
                                {/*<b className="text_cor_green mouse_over_list_blue">
                                    <div className="assets_add_modal_div"
                                         onClick={event => handleModifySelectedVm(row.idx)}
                                         onKeyDown={event => handleModifySelectedVm(row.idx)}
                                         role="button" tabIndex="0"><span className="circle__ste"/>
                                        Edit
                                    </div>
                                </b>*/}
                            </TableCell>
                            <TableCell
                                className={cellClassName}
                                style={{width: "10%"}}
                            >
                                {row.cpName}
                            </TableCell>
                            <TableCell
                                className={cellClassName}
                                style={{width: "5%"}}
                            >
                                {row.serialNumber}
                            </TableCell>
                        </React.Fragment>
                    )}
                    <TableCell
                        className={cellClassName}
                        style={{width: "5%"}}
                    >
                        <b className="text_cor_green mouse_over_list">
                            <div className="assets_add_modal_div"
                                 onClick={event => handleVmPage(row.idx)}
                                 onKeyDown={event => handleVmPage(row.idx)}
                                 role="button" tabIndex="0"><span className="circle__ste"/>
                                {row.name}
                            </div>

                            {/*<Tooltip title="수정">
                                 eslint-disable-next-line jsx-a11y/anchor-is-valid
                                <a href="#"><i><EditIcon style={{
                                    fontSize: "1.3rem",
                                }}/></i></a>
                            </Tooltip>*/}
                        </b>
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "5%"}}
                    >
                        {row.cpu}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "5%"}}
                    >
                        {row.ram}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "5%"}}
                    >
                        {row.hdd}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "5%"}}
                    >
                        {row.currentStatus}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "5%"}}
                    >
                        {row.network}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "10%"}}
                    >
                        {row.ipAddr}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "10%"}}
                    >
                        {row.remoteAddr}
                    </TableCell>
                    {/*<TableCell*/}
                    {/*    className={cellClassName}*/}
                    {/*    style={{width: "20%"}}*/}
                    {/*>*/}
                    {/*    -*/}
                    {/*</TableCell>*/}
                    <TableCell
                        className={cellClassName}
                        style={{width: "5%"}}
                    >
                        <FormControl>
                            <Select
                                name="vmAction"
                                value={vmAction}
                                onChange={(e) => {
                                    /*console.log("action value ", e.target.value);*/
                                    setVmAction(e.target.value);
                                }}
                                MenuProps={MenuProps}
                                input={<BootstrapInput />}>
                                <MenuItem value={0}>
                                    <em>Select</em>
                                </MenuItem>
                                {actionList && actionList.map((item, index) => {
                                    const key = index;
                                    return (
                                        <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "5%"}}
                        /*style={{width: "20%"}}*/>
                        {/*<Grid container>
                            <Grid item xs={12}>
                                <Grid container justify="center" spacing={spacing}>
                                    <Grid item>*/}
                        {/*</Grid>
                                    <Grid item>*/}
                        {/*<Button*/}
                        {/*    className={classes.margin}*/}
                        {/*    variant="contained"*/}
                        {/*    color="primary"*/}
                        {/*    // onClick={handleOpenSearchCompany}*/}
                        {/*    endIcon={<SendIcon fontSize="small" />}*/}
                        {/*    style={{*/}
                        {/*        maxWidth: '40px',*/}
                        {/*        maxHeight: '40px',*/}
                        {/*        minWidth: '40px',*/}
                        {/*        minHeight: '40px',*/}
                        {/*        margin: '0px 0px 0px 3px',*/}
                        {/*    }}*/}
                        {/*/>*/}
                        <IconButton
                            onClick={() => handleSendVmAction(row, vmAction)}
                            color="primary"
                            style={{
                                maxWidth: '40px',
                                maxHeight: '40px',
                                minWidth: '40px',
                                minHeight: '40px',
                                margin: '0px 0px 0px 3px',
                            }}
                        >
                            <SendIcon/>
                        </IconButton>
                        {/*</Grid>
                                </Grid>
                            </Grid>
                        </Grid>*/}
                    </TableCell>
                    <TableCell
                        className={cellClassName}
                        style={{width: "5%"}}>
                        <b className="text_cor_green mouse_over_list_blue">
                            <div className="assets_add_modal_div"
                                 onClick={event => handleModifySelectedVm(row.idx)}
                                 onKeyDown={event => handleModifySelectedVm(row.idx)}
                                 role="button" tabIndex="0"><span className="circle__ste"/>
                                Edit
                            </div>
                        </b>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    };

    return (
        <Col md={12} lg={12}>
            <Card className="cb-card">
                <CardBody className="cb-card-body">
                    <VmTableToolbar
                        numSelected={[...selected].filter(el => el[1]).length}
                        handleDeleteSelected={handleDeleteSelected}
                        handleRefresh={handleRefresh}
                        onRequestSort={handleRequestSort}
                        rows={headRows}
                        handleOpen={handleOpenAddVm}
                        handleSubmitSearch={handleSubmitSearch}
                        contents="VM"
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
                                size={densePadding ? 'small' : 'medium'}
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
                                            <ContentsRow key={keyId} row={row} />
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <RegisterVm
                        open={openAddVm}
                        user={user}
                        handleClose={handleCloseAddVm}
                        handleSubmit={handleSubmitAddVm}
                    />
                    <ModifyVm
                        open={openEditVm}
                        user={user}
                        handleClose={handleCloseEditVm}
                        handleSubmit={handleSubmitEditVm}
                        data={modifyData}
                    />
                </CardBody>
            </Card>
        </Col>
    );
};

export default VmTable;
