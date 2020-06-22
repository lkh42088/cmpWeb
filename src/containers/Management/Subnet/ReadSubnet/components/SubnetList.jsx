import React, {
    forwardRef, Component, useEffect, useState, useCallback,
} from 'react';
import {useDispatch, useSelector} from "react-redux";
import MaterialTable from 'material-table';
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
/** icon **/
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
import {pagingChangeCurrentPage, pagingChangeTotalCount} from "../../../../../redux/actions/pagingActions";
import {readSubnet} from "../../../../../redux/actions/subnetActions";

/** Custom CSS **/
const useStyles = makeStyles(theme => ({
    root: {
        fontFamily: 'Nanum Square acEB',
        fontSize: 8,
        color: "red",
    },
    tab: {
        fontSize: 12,
        color: "red",
    },

}));

const headerStyle = makeStyles(theme => ({
    backgroundColor: theme.palette.common.black,
    color: theme.palette.primary.contrastText,
}));
const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

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
    const nb = useStyles();
    const dispatch = useDispatch();
    /**
     * Subnet Data state
     **/
    const {
        data, getPage,
    } = useSelector(({ subnetRd }) => ({
        data: subnetRd.data,
        getPage: subnetRd.page,
    }));

    /** Initial data **/
    const [state, setState] = React.useState({
        columns: [
            { title: 'SUBNET 태그', field: 'subnetTag' },
            { title: 'SUBNET', field: 'subnetStart' },
            { title: 'SUBNET 마스크', field: 'subnetMask' },
            { title: '게이트웨이', field: 'gateway' },
        ],
        data: [],
    });
    /**
     * Pagination state
     **/
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
    const handlePaginationChange = useCallback(
        (event, pageData) => dispatch(pagingChangeCurrentPage({
            currentPage: pageData.activePage,
        })), [dispatch],
    );

    /** Get subnet data **/
    useEffect(() => {
        dispatch(readSubnet({
            rows: 10,
            offset: rowsPerPage * currentPage,
            orderBy: "sub_idx",
            order,
        }));
    }, []);

    /** Bind Subnet data **/
    useEffect(() => {
        // setState(prevState => ({
        //         ...prevState,
        //         data,
        //     }));
    }, [getPage]);

    /** Update & Register Device **/
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
        // const [current, total, onPageChange] = props;
            <PaginationCustomization
                activePage={currentPage}
                boundaryRange="1"
                siblingRange="2"
                // totalPages={totalPage}
                totalPages="20"
                onPageChange={handlePaginationChange}
                showEllipsis="true"
                showFirstAndLastNav="true"
                showPreviousAndNextNav="true"
                size="mini"
                rowsPerPageOptions={displayRowsList}
            />
        );

    /** Material-Table component override **/
    const customComponents = {
        Pagination: props => (
            <div style={{textAlign: "center", padding: 30 }}>
                {paginationBar(props)}
            </div>
        ),
    };

    /** Material-Table options attribute **/
    const themeName = useSelector(({theme}) => ({
        className: theme.className,
    }));
    const options = {
        headerStyle: {
            backgroundColor: "#000000",
            color: "#FFFFFF",
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
            emptyDataSourceMessage: "해당 자료가 없습니다.",
        },
    };

    return (
        <>
            <MaterialTable
                title="SUBNET 리스트"
                icons={tableIcons}
                columns={state.columns}
                data={data}
                className={nb.root}
                editable={{
                    onRowUpdate: RowUpdate,
                    onRowDelete: RowDelete,
                }}
                components={customComponents}
                options={options}
                localization={localization}
            />
        </>
    );
};

export default React.memo(SubnetList);
