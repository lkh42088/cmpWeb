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
import PaginationCustomization from "../../../../Common/PaginationBar";
import {
    pagingChangeCurrentPage, pagingChangeOrder, pagingChangeOrderBy, pagingChangeTotalCount, pagingDump, pagingSetup,
} from "../../../../../redux/actions/pagingActions";
import {readSubnet} from "../../../../../redux/actions/subnetActions";
/** Subnet Add Modal **/
import SubnetWriteForm from "../../CreateSubnet/components/SubnetWriteForm";
import SpringModal from "../../../../Common/SpringModal";

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
    const {
        data, page,
    } = useSelector(({ subnetRd }) => ({
        data: subnetRd.data,
        page: subnetRd.page,
    }));

    /**
     * Pagination state
     **/
    const rows = 15;
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

    /** Initial data **/
    const [state, setState] = React.useState({
        columns: [
            {title: 'IDX', field: 'idx', width: "5%" },
            {title: 'SUBNET 태그', field: 'subnetTag', width: "20%"},
            {title: 'SUBNET', field: 'subnetStart', width: "30%"},
            {title: 'SUBNET 마스크', field: 'subnetMask', width: "20%"},
            {title: '게이트웨이', field: 'gateway', width: "20%"},
        ],
        data: [],
    });

    const handleOrderChange = (event, direction) => {
        const isAsc = page.order === direction && page.order === "asc";
        const changeOrder = isAsc ? "desc" : "asc";
        console.log(changeOrder);
        dispatch(pagingChangeOrder({order: changeOrder}));
    };

    const handleFilterChange = (event, filter) => {
        console.log(filter);
        dispatch(pagingChangeOrderBy({orderBy: filter}));
        dispatch(pagingChangeOrder({order: "asc"}));
    };

    // const getPageData = () => {
    //     let offset = 0;
    //     if (currentPage > 0) {
    //         offset = Number(rowsPerPage * currentPage);
    //     }
    //     console.log("[PAGE DATA]: rows ", rowsPerPage, ", offset ", offset,
    //         ", orderBy ", orderBy, ", order ", order);
    //     dispatch(readSubnet({
    //         rows: rowsPerPage, offset, orderBy, order,
    //     }));
    // };

    /** Init pagination **/
    useEffect(() => {
        // dispatch(readSubnet({
        //     rows: 15,
        //     offset: 0,
        //     orderBy: "sub_idx",
        //     order: "desc",
        // }));
        dispatch(pagingChangeOrderBy({orderBy: "sub_idx"}));
        dispatch(pagingChangeOrder({order: "desc"}));
        // if (page) {
        //     const {count} = page;
        //     dispatch(pagingSetup({
        //         rowsPerPage: rows,
        //         currentPage: 1,
        //         totalPage: Math.ceil(count / rows) - 1,
        //         totalCount: count,
        //     }));
        // }
        // dispatch(pagingDump());
    }, []);

    /** Get subnet data **/
    useEffect(() => {
        //getPageData();
        let offset = 0;
        let orderByData;
        let rowData;
        if (orderBy) {
            orderByData = "sub_idx";
        }
        if (rowsPerPage) {
            rowData = 5;
        }
        if (currentPage > 0) {
            offset = Number(rowsPerPage * currentPage);
        }
        // console.log("[PAGE DATA]: rows ", rowsPerPage, ", offset ", offset,
        //     ", orderBy ", orderBy, ", order ", order);
        dispatch(readSubnet({
            rows: rowData, offset, orderBy: orderByData, order,
        }));
        if (page && page.count !== 0) {
            dispatch(pagingChangeTotalCount({totalCount: page.count}));
        }
    }, [rowsPerPage, currentPage, orderBy, order]);

    const handleChangePage = useCallback(
        (event, pageData) => dispatch(pagingChangeCurrentPage({
            currentPage: pageData.activePage,
        })), [dispatch],
    );

    /** Update & Register Device **/
    const RowAdd = (newData) => {

    };
    // const RowAdd = newData => new Promise((resolve) => {
    //         setTimeout(() => {
    //             resolve();
    //             setState((prevState) => {
    //                 const data = [...prevState.data];
    //                 data.push(newData);
    //                 return { ...prevState, data };
    //             });
    //         }, 600);
    //     });
    // }

    const RowUpdate = (newData, oldData) => new Promise((resolve) => {
        // setTimeout(() => {
        //     resolve();
        //     if (oldData) {
        //         setState((prevState) => {
        //             const data = [...prevState.data];
        //             data[data.indexOf(oldData)] = newData;
        //             return { ...prevState, data };
        //         });
        //     }
        // }, 600);
    });

    const RowDelete = oldData => new Promise((resolve) => {
        // setTimeout(() => {
        //     resolve();
        //     setState((prevState) => {
        //         const data = [...prevState.data];
        //         data.splice(data.indexOf(oldData), 1);
        //         return { ...prevState, data };
        //     });
        // }, 600);
    });

    /** Customizing Pagination Bar **/
    const paginationBar = props => (
            <PaginationCustomization
                className={classes.root}
                activePage={currentPage}
                boundaryRange="1"
                showEllipsis="true"
                siblingRange="2"
                totalPages={Math.ceil(totalCount / rowsPerPage) - 1}
                onPageChange={handleChangePage}
                showFirstAndLastNav="true"
                showPreviousAndNextNav="true"
                size="mini"
                // rowsPerPageOptions={displayRowsList}
            />
            );

    /** Material-Table component override **/
    const customComponents = {
        Pagination: props => (
            <div style={{textAlign: "center", padding: 30 }}>
                {paginationBar(props)}
            </div>
        ),
        Tooltip: props => (
            <Tooltip>
                <Fab color="primary" className={classes.fab} />
            </Tooltip>
        ),
        // Toolbar: props => (
        //     <div style={{padding: '0px 10px'}}>
        //         <MTableToolbar {...props} />
        //         {SpringModal(SubnetWriteForm)}
        //     </div>
        // ),
    };

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
            return "#000000";
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
        },
    };

    /** Material-Table localization **/
    const localization = {
        header: {
            actions: "수정/삭제",
        },
        body: {
            //emptyDataSourceMessage: "해당 자료가 없습니다.",
            emptyDataSourceMessage: "",
        },
    };

    return (
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card className="card cb-card">
                <MaterialTable
                    title=""
                    icons={tableIcons}
                    columns={state.columns}
                    data={data}
                    className={classes.root}
                    editable={{
                        // onRowAdd: RowAdd,
                        onRowUpdate: RowUpdate,
                        onRowDelete: RowDelete,
                    }}
                    onOrderChange={handleOrderChange}
                    onFilterChange={handleFilterChange}
                    components={customComponents}
                    options={options}
                    localization={localization}
                />
            </Card>
        </Col>
    );
};

export default React.memo(SubnetList);
