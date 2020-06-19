import React, {useState} from "react";
import {
    Grid, Form, Pagination, PaginationProps, Icon,
} from "semantic-ui-react";

const PaginationCustomization = (props) => {
    const {
        activePage,
        boundaryRange,
        siblingRange,
        showEllipsis,
        showFirstAndLastNav,
        showPreviousAndNextNav,
        totalPages,
    } = props;
    return (
        <Grid columns={1}>
            <Grid.Column>
                <Pagination
                    activePage={activePage}
                    boundaryRange={boundaryRange}
                    size="mini"
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
