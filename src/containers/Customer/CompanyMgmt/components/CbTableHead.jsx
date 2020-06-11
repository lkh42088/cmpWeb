import React, {useState, Fragment} from "react";
import clsx from "clsx";
import Grid from '@material-ui/core/Grid';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import {lighten, makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import Menu from "@material-ui/core/Menu";
import MenuItem from '@material-ui/core/MenuItem';

export const CbTableFilterButton = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { rows, onRequestSort } = props;

    const handleClick = (event) => {
        console.log("CbTableFilterButton: handleClick");
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        console.log("CbTableFilterButton: handleClose");
        setAnchorEl(null);
    };

    const handleSort = property => (event) => {
        console.log("CbTableFilterButton: handleSort");
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

export const CbTableToolbar = (props) => {
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
                                            <CbTableFilterButton rows={rows} onRequestSort={onRequestSort}/>
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

function CbTableHead(props) {
    const {
        classes, order, orderBy, numSelected, rowCount, rows,
        onRequestSort, onSelectAllClick,
    } = props;
    const createSortHandler = property => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        className={`cb-material-table__checkbox ${numSelected === rowCount && 'cb-material-table__checkbox--checked'}`}
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {rows.map(row => (
                    <TableCell
                        className="cb-material-table__cell cb-material-table__cell--sort cb-material-table__cell-right"
                        key={row.id}
                        align="left"
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === row.id}
                            direction={orderBy === row.id ? order : 'asc'}
                            onClick={createSortHandler(row.id)}
                            className="cb-material-table__sort-label"
                            dir="ltr"
                        >
                            {row.label}
                            {orderBy === row.id ? (
                                <span className={classes.visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default CbTableHead;
