import React, {useCallback, useEffect} from "react";
import {
    Grid, Pagination,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import {useDispatch} from "react-redux";

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
        onPageChange,
    } = props;

    return (
        <Grid columns={1}>
            <Grid.Column>
                <Pagination
                    activePage={activePage}
                    boundaryRange={boundaryRange}
                    onPageChange={onPageChange}
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

export default React.memo(PaginationCustomization);
