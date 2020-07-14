import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {fade, lighten, makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import RefreshIcon from '@material-ui/icons/Refresh';
import SubnetSearchBar from "./SubnetSearchBar";

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

const TableFilterButton = (props) => {
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
        <>
            <Tooltip title="정렬목록" aria-label="sort">
                <IconButton
                    className="cb-material-table__tooltip-button"
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
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
                            onClick={handleSort(row.id)}
                            className="cb-material-table__filter-menu-item"
                            key={row.id}
                        >
                            {row.label}
                        </MenuItem>
                    ))
                }
            </Menu>
        </>
    );
};

const SubnetTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const {
        toolbarTitle, rows, numSelected, handleDeleteSelected, onRequestSort,
        handleOpen, contents, handleRefresh, handleSubmitSearch,
    } = props;
    const addComment = contents.concat(" 추가");
    const deleteComment = `선택한 ${contents} 삭제`;

    const handleDelete = () => {
        console.log("handleDelete...");
    };

    return (
        <div>
            <Toolbar
                className={clsx(classes.root, { [classes.highlight]: numSelected > 0 })}
            >
                {numSelected > 0 ? (
                    <>
                        <Typography className={classes.selected} color="inherit" variant="subtitle1" component="div">
                            {numSelected} selected
                        </Typography>
                        <Tooltip title="선택한 계정 삭제">
                            <IconButton
                                aria-label="delete"
                                onClick={handleDeleteSelected}
                            >
                                <DeleteIcon color="secondary" />
                            </IconButton>
                        </Tooltip>
                    </>
                ) : (
                    <>
                        {/*********************************************************************
                         * Table Search bar
                         **********************************************************************/}
                        <Grid container>
                            <Grid item container xs={12} alignItems="flex-end" direction="column">
                                <Grid item>
                                    <Tooltip title={addComment} aria-label="add">
                                        <IconButton type="button" onClick={handleOpen}>
                                            <AddIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Refresh" aria-label="refresh">
                                            <IconButton
                                                type="button"
                                                onClick={handleRefresh}
                                            >
                                                <RefreshIcon/>
                                            </IconButton>
                                    </Tooltip>
                                    {numSelected > 0 ? (
                                        <Tooltip title={deleteComment} aria-label="delete">
                                            <IconButton
                                                type="button"
                                                onClick={handleDeleteSelected}
                                            >
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    ) : (
                                        <TableFilterButton rows={rows} onRequestSort={onRequestSort}/>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                        <SubnetSearchBar
                            handleSubmit={handleSubmitSearch}
                        />
                        {/*<Grid>*/}
                        {/*    */}
                        {/*</Grid>*/}
                    </>
                )}
            </Toolbar>
       </div>
    );
};

export default SubnetTableToolbar;
