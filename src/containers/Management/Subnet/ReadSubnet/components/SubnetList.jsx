import React, {
    forwardRef, Component, useEffect, useState, useCallback,
} from 'react';
import {
    Card,
    CardBody,
    Col,
} from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import MaterialTable, {MTableToolbar} from 'material-table';
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
/** Tooltip **/
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
/** Material Icon **/
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import PaginationCustomization from "../../../../Common/PaginationBar";
import {
    pagingChangeCurrentPage, pagingChangeOrder, pagingChangeOrderBy, pagingChangeTotalCount, pagingDump, pagingSetup,
} from "../../../../../redux/actions/pagingActions";
// import {readSubnet} from "../../../../../redux/actions/subnetActions";
/** Subnet Add Modal **/
import SubnetWriteForm from "../../CreateSubnet/components/SubnetWriteForm";
import SpringModal from "../../../../Common/SpringModal";
import API_ROUTE from "../../../../../shared/apiRoute";
import {readSubnet} from "../../../../../lib/api/subnet";

/** Custom CSS **/
const useStyles = makeStyles(theme => ({
    root: {
        fontFamily: "Nanum Square acEB",
        fontSize: 8,
        fontWeight: "revert",
        // '&:hover': {
        //     color: "#063263",
        // },
    },
    tab: {
        fontSize: 12,
    },
    fab: {
        margin: theme.spacing(2),
    },
}));

/** Material table icons **/
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const SubnetList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    /**
     * Subnet Data
     **/
    // const {
    //     dataSet, page,
    // } = useSelector(({ subnetRd }) => ({
    //     dataSet: subnetRd.data,
    //     page: subnetRd.page,
    // }));

    /**
     * Pagination state
     **/
    // const rows = 15;
    // const {
    //     selected,
    //     pageBeginRow,
    //     rowsPerPage,
    //     currentPage,
    //     totalPage,
    //     totalCount,
    //     displayRowsList,
    //     dense,
    //     orderBy,
    //     order,
    // } = useSelector(({pagingRd}) => ({
    //     selected: pagingRd.selected,
    //     pageBeginRow: pagingRd.pageBeginRow,
    //     rowsPerPage: pagingRd.rowsPerPage,
    //     currentPage: pagingRd.currentPage,
    //     totalPage: pagingRd.totalPage,
    //     totalCount: pagingRd.totalCount,
    //     displayRowsList: pagingRd.displayRowsList,
    //     dense: pagingRd.dense,
    //     orderBy: pagingRd.orderBy,
    //     order: pagingRd.order,
    // }));

    /** Initial data **/
    const [state, setState] = useState({
        columns: [
            {title: 'IDX', field: 'idx'},
            {title: 'SUBNET 태그', field: 'subnetTag', width: "20%"},
            {title: 'SUBNET', field: 'subnet', width: "40%"},
            {title: 'SUBNET 마스크', field: 'subnetMask', width: "25%"},
            {title: '게이트웨이', field: 'gateway', width: "25%"},
        ],
        data: [],
        page: [],
        // data: [{
        //     idx: null,
        //     deviceCode: '',
        //     subnetTag: '',
        //     subnetStart: '',
        //     subnetEnd: '',
        //     subnetMask: '',
        //     gateway: '',
        //     subnet: '',
        // }],
        // page: [{
        //     count: 0,
        //     offset: 0,
        //     order: 'desc',
        //     orderBy: 'sub_idx',
        //     rows: 5,
        // }],
    });

    const orderByName = [
        "idx",
        "subnetTag",
        "subnetStart",
        "subnetMask",
        "subnetGateway",
    ];

    // const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    // const [totalCount, setTotalCount] = useState(0);
    // const [orderBy, setOrderBy] = useState("sub_idx");
    // const [order, setOrder] = useState("desc");
    const {
        rows, offset, count, orderBy, order,
    } = state.page;

    const handleOrderChange = (orderByStr, direction) => {
        const isAsc = order === direction && order === "asc";
        const changeOrder = isAsc ? "desc" : "asc";
        setState({
            ...state,
            page: {
                ...state,
                order: changeOrder,
                orderBy: orderByName[orderByStr],
            },
        });
    };

    const handleRowsPerPage = (size) => {
        setState({
            ...state,
            page: {
                ...state,
                rows: size,
            },
        });
    };

    const handleChangePage = (pageValue, pageSize) => {
        setCurrentPage(pageValue);
    };

    /** Get subnet data **/
    // useEffect(() => {
    //     //getPageData();
    //     let offset = 0;
    //     let orderByData;
    //     let rowData;
    //     if (orderBy) {
    //         orderByData = "sub_idx";
    //     }
    //     if (rowsPerPage) {
    //         rowData = 5;
    //     }
    //     if (currentPage > 0) {
    //         offset = Number(rowsPerPage * currentPage);
    //     }
    //     dispatch(readSubnet({
    //         rows: rowData, offset, orderBy: orderByData, order,
    //     }));
    //     if (page && page.count !== 0) {
    //         dispatch(pagingChangeTotalCount({totalCount: page.count}));
    //     }
    // }, [rowsPerPage, currentPage, orderBy, order]);

    // const handleChangePage = useCallback(
    //     (event, pageData) => dispatch(pagingChangeCurrentPage({
    //         currentPage: pageData.activePage,
    //     })), [dispatch],
    // );

    /** Update & Register Device **/
    const RowAdd = newData => null;

    const RowUpdate = (newData, oldData) => new Promise(resolve => null);

    const RowDelete = oldData => new Promise(resolve => null);

    const getData = async () => {
        try {
            const response = await readSubnet({
                rows: state.page.rows,
                offset: state.page.offset,
                orderBy: state.page.orderBy,
                order: state.page.order,
            });
            console.log("subnet: ", response.data.data);
            setState({
                ...state,
                data: (
                    response.data.data.map(val => ({
                        ...val,
                        subnet: val.subnetStart.concat(' ~ ') + val.subnetEnd,
                    }))),
                page: response.data.page,

            });
            console.log("state data: ", state.data);
        } catch {
            setState({
                ...state,
                data: [],
            });
        }
    };

    useEffect(() => {
        if (state && state.page.order !== undefined) {
            getData();
        }
    }, [rows, currentPage, count, orderBy, order]);

    useEffect(() => {
        if (state && state.page.order !== undefined) {
            getData();
        } else {
            setState({
                ...state,
                page: {
                    rows: 5,
                    count: 0,
                    offset: 0,
                    orderBy: 'sub_idx',
                    order: 'desc',
                },
            });
        }
        // dispatch(readSubnet({
        //     rows: page.rowsPerPage, offset: page.offset, orderBy, order,
        // }));
    }, []);

    /** Customizing Pagination Bar **/
    // const paginationBar = () => (
    //         <PaginationCustomization
    //             className={classes.root}
    //             activePage={currentPage}
    //             boundaryRange="1"
    //             showEllipsis="true"
    //             siblingRange="2"
    //             totalPages={Math.ceil(totalCount / rowsPerPage) - 1}
    //             //onPageChange={handleChangePage}
    //             showFirstAndLastNav="true"
    //             showPreviousAndNextNav="true"
    //             size="mini"
    //         />
    //         );

    /** Material-Table component override **/
    // const customComponents = {
    //     Pagination: () => (
    //         <TableCell>
    //             <div>
    //                 {paginationBar()}
    //             </div>
    //         </TableCell>
    //     ),
    // };

    /** Material-Table options attribute **/
    const themeName = useSelector(({theme}) => ({
        className: theme.className,
    }));

    const brushColor = () => {
        if (themeName.className === "theme-light") {
            return "#FFFFFF";
        }
        return "#AAAAAA";
    };
    const brushBack = () => {
        if (themeName.className === "theme-light") {
            return "#505050";
        }
        return "#343434";
    };

    const options = {
        headerStyle: {
            backgroundColor: brushBack(),
            color: brushColor(),
            minWidth: 120,
            fontSize: 12,
            fontWeight: "bold",
            textAlign: "center",
        },
        cellStyle: {
            fontSize: 12,
            fontWeight: "revert",
            fontFamily: "Roboto",
            textAlign: "center",
        },
        rowStyle: {
            "&:hover": {
                boxShadow: "2px 0 5px 0 darkgray",
            },
        },
        exportButton: true,
        pageSize: 5,
        actionsColumnIndex: -1,
        thirdSortClick: false,
    };

    const actions = {
        // tooltip: "수정 및 삭제",
        // hidden: true,
    };

    /** Material-Table localization **/
    const localization = {
        header: {
            actions: "수정/삭제",
        },
        body: {
            emptyDataSourceMessage: "",
        },
    };

    return (
        <Col>
            <Card className="cb-card">
                <MaterialTable
                    title="SUBNET LIST"
                    icons={tableIcons}
                    columns={state.columns}
                    className={classes.root}
                    editable={{
                        // onRowAdd: RowAdd,
                        // onRowUpdate: RowUpdate,
                        // onRowDelete: RowDelete,
                    }}
                    onOrderChange={handleOrderChange}
                    onChangeRowsPerPage={handleRowsPerPage}
                    onChangePage={handleChangePage}
                    onRowClick={() => null}
                    options={options}
                    // actions={actions}
                    localization={localization}
                    data={state.data}
                    // data={dataSet}
                    // components={customComponents}
                />
            </Card>
        </Col>
    );
};

export default React.memo(SubnetList);
