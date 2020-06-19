import React from "react";
import {
    Grid, Pagination,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import {useDispatch, useSelector} from "react-redux";
import {
    pagingChangeCurrentPage,
    pagingChangeCurrentPageNext,
    pagingChangeCurrentPagePrev,
    pagingChangeDense,
    pagingChangeOrder,
    pagingChangeOrderBy,
    pagingChangeRowsPerPage,
    pagingChangeSelected,
    pagingChangeTotalCount, pagingDump,
} from "../../redux/actions/pagingActions";

const PaginationCustomization = (props) => {
    const dispatch = useDispatch();
    const {
        activePage,
        boundaryRange,
        siblingRange,
        showEllipsis,
        showFirstAndLastNav,
        showPreviousAndNextNav,
        totalPages,
        size,
    } = props;

    const {
        // selected,
        // pageBeginRow,
        // rowsPerPage,
        currentPage,
        totalPage,
        // totalCount,
        // displayRowsList,
        // dense,
        // orderBy,
        // order,
    } = useSelector(({pagingRd}) => ({
        // selected: pagingRd.selected,
        // pageBeginRow: pagingRd.pageBeginRow,
        // rowsPerPage: pagingRd.rowsPerPage,
        currentPage: pagingRd.currentPage,
        totalPage: pagingRd.totalPage,
        // totalCount: pagingRd.totalCount,
        // displayRowsList: pagingRd.displayRowsList,
        // dense: pagingRd.dense,
        // orderBy: pagingRd.orderBy,
        // order: pagingRd.order,
    }));

    // Event
    const handlePaginationChange = () => {
        dispatch(pagingChangeCurrentPage({currentPage: activePage}));
        dispatch(pagingChangeTotalCount({totalCount: totalPages}));
    };

    return (
        <Grid columns={1}>
            <Grid.Column>
                <Pagination
                    activePage={activePage}
                    boundaryRange={boundaryRange}
                    onPageChange={handlePaginationChange}
                    size={size}
                    siblingRange={siblingRange}
                    totalPages={totalPages}
                    ellipsisItem={showEllipsis ? undefined : null}
                    firstItem={showFirstAndLastNav ? undefined : null}
                    lastItem={showFirstAndLastNav ? undefined : null}
                    prevItem={showPreviousAndNextNav ? undefined : null}
                    nextItem={showPreviousAndNextNav ? undefined : null}
                />
            </Grid.Column>
        </Grid>
    );
};

export default PaginationCustomization;
