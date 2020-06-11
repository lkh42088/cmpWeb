import React, {Fragment, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {lighten, makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";

export const TableFilterButton = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { rows, onRequestSort } = props;

    const handleClick = (event) => {
        console.log("TableFilterButton: handleClick");
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        console.log("TableFilterButton: handleClose");
        setAnchorEl(null);
    };

    const handleSort = property => (event) => {
        console.log("TableFilterButton: handleSort");
        onRequestSort(event, property);
    };

    return (
        <Fragment>
            <IconButton
                className="cb-material-table__tooltip-button"
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
        </Fragment>
    );
};

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
    title:
        theme.palette.type === 'light'
            ? {
                flex: '1 1 100%',
                color: '#646777',
                fontSize: 18,
                fontFamily: "Nanum BarunGothic",
            }
            : {
                flex: '1 1 100%',
                color: '#dddddd',
                fontSize: 18,
                fontFamily: "Nanum BarunGothic",
            },
    selected: {
        flex: '1 1 100%',
        fontSize: 15,
        fontFamily: "Nanum BarunGothic Bold",
    },
}));

export const CompanyTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const {
        toolbarTitle, rows, numSelected, handleDeleteSelected, onRequestSort,
    } = props;

    return (
        <Fragment>
            <Toolbar
                className={clsx(classes.root, { [classes.highlight]: numSelected > 0 })}
            >
                {numSelected > 0 ? (
                    <Fragment>
                        <Typography className={classes.selected} color="inherit" variant="subtitle1" component="div">
                            {numSelected} selected
                        </Typography>
                        <Tooltip title="Delete">
                            <IconButton aria-label="delete">
                                <DeleteIcon color="secondary" />
                            </IconButton>
                        </Tooltip>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                            {toolbarTitle}
                        </Typography>
                        <Grid container justify="center">
                            <Grid item container xs={12} alignItems="flex-end" direction="column">
                                <Grid item>
                                    <Tooltip title="고객사 추가" aria-label="add">
                                        <IconButton>
                                            <AddIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    {numSelected > 0 ? (
                                        <Tooltip title="선택한 고객사 삭제" aria-label="delete">
                                            <IconButton
                                                aria-label="delete"
                                                onClick={handleDeleteSelected}
                                            >
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title="정렬 목록" aria-label="sort">
                                            <TableFilterButton rows={rows} onRequestSort={onRequestSort}/>
                                        </Tooltip>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Fragment>
                )}
            </Toolbar>
        </Fragment>
    );
};
