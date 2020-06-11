import {lighten, makeStyles} from "@material-ui/core/styles";
import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

export const CommonTableFilterButton = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { rows, onRequestSort } = props;

    const handleClick = (event) => {
        console.log("CommonTableFilterButton: handleClick");
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        console.log("CommonTableFilterButton: handleClose");
        setAnchorEl(null);
    };

    const handleSort = property => (event) => {
        console.log("CommonTableFilterButton: handleSort");
        onRequestSort(event, property);
    };

    return (
        <div>
            <IconButton
                className="cb-material-table__toolbar-button"
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <FilterListIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className="cb-material-table__filter-menu"
            >
                {
                    rows.map(row => (
                        <MenuItem
                            onClick={handleSort(rows.id)}
                            className="cb-material-table__filter-menu-item"
                        >
                            {row.label}
                        </MenuItem>
                    ))
                }
            </Menu>
        </div>
    );
};

export const CommonTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const {
        toolbarTitle, rows, numSelected, handleDeleteSelected, onRequestSort,
    } = props;

    return (
        <div className="cb-material-table__toolbar-wrap">
            <Toolbar
                // className={clsx(classes.root, {
                //     [classes.highlight]: numSelected > 0,
                // })}
                className="cb-material-table__toolbar"
            >
                {/*{numSelected > 0 ? (*/}
                {/*    <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">*/}
                {/*        {numSelected} selected*/}
                {/*    </Typography>*/}
                {/*) : (*/}
                {/*    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">*/}
                {/*        {toolbarTitle}*/}
                {/*    </Typography>*/}
                {/*)}*/}

                <div>
                    {numSelected > 0 && (
                        <h5 className="cb-material-table__toolbar-selected">{numSelected} <span>selected</span></h5>
                    )}
                </div>
                <div>
                    {numSelected > 0 ? (
                        <Tooltip title="Delete">
                            <IconButton
                                aria-label="delete"
                                onClick={handleDeleteSelected}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Filter list">
                            <CommonTableFilterButton rows={rows} onRequestSort={onRequestSort}/>
                        </Tooltip>
                    )}
                </div>
            </Toolbar>
        </div>
    );
};