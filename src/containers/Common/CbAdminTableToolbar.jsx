import React, {Fragment, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {lighten, fade, makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import RefreshIcon from '@material-ui/icons/Refresh';

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
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '50ch',
            // '&:focus': {
            //     width: '40ch',
            // },
        },
    },
    paper: {
        width: '60ch',
        color: 'inherit',
        backgroundClip: theme.palette.common.white,
    },
}));

const CbAdminTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const {
        toolbarTitle, rows, numSelected, handleDeleteSelected, onRequestSort,
        handleOpen, contents, handleRefresh,
    } = props;
    const addComment = contents.concat(" 추가");
    const deleteComment = `선택한 ${contents} 삭제`;

    return (
        <div>
            <Toolbar
                className={clsx(classes.root, { [classes.highlight]: numSelected > 0 })}
            >
                {numSelected > 0 ? (
                    <Fragment>
                        <Typography className={classes.selected} color="inherit" variant="subtitle1" component="div">
                            {numSelected} selected
                        </Typography>
                        <Tooltip title="선택한 항목 삭제">
                            <IconButton
                                onClick={handleDeleteSelected}
                                aria-label="delete"
                            >
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
                                    <div>
                                   <Tooltip title={addComment} aria-label="add">
                                        <IconButton type="button" onClick={handleOpen}>
                                            <AddIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Refresh" aria-label="refresh">
                                            <IconButton type="button" onClick={handleRefresh}>
                                                <RefreshIcon/>
                                            </IconButton>
                                    </Tooltip>
                                    {numSelected > 0 ? (
                                        <Tooltip title={deleteComment} aria-label="delete">
                                            <IconButton
                                                aria-label="delete"
                                            >
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title="정렬목록" aria-label="sort">
                                            <TableFilterButton rows={rows} onRequestSort={onRequestSort}/>
                                        </Tooltip>
                                    )}
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Fragment>
                )}
            </Toolbar>
       </div>
    );
};

export default CbAdminTableToolbar;
