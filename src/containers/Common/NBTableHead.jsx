import React, {useState} from "react";
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import {lighten, makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import Menu from "@material-ui/core/Menu";
import MenuItem from '@material-ui/core/MenuItem';

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

export const NBTableFilterButton = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { rows, onRequestSort } = props;

    const handleClick = (event) => {
        console.log("NBTableFilterButton: handleClick");
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        console.log("NBTableFilterButton: handleClose");
        setAnchorEl(null);
    };

    const handleSort = property => (event) => {
        console.log("NBTableFilterButton: handleSort");
        onRequestSort(event, property);
    };

    return (
        <div>
                <IconButton
                    className="material-table__toolbar-button"
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
                    className="material-table__filter-menu"
                >
                    {
                        rows.map(row => (
                            <MenuItem
                                onClick={handleSort(rows.id)}
                                className="material-table__filter-menu-item"
                            >
                                {row.label}
                            </MenuItem>
                        ))
                    }
                </Menu>
        </div>
    );
};

export const NBTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const {
        toolbarTitle, rows, numSelected, handleDeleteSelected, onRequestSort,
    } = props;

    return (
        <div className="nb-material-table__toolbar-wrap">
            <Toolbar
                // className={clsx(classes.root, {
                //     [classes.highlight]: numSelected > 0,
                // })}
                className="nb-material-table__toolbar"
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
                        <h5 className="nb-material-table__toolbar-selected">{numSelected} <span>selected</span></h5>
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
                            <NBTableFilterButton rows={rows} onRequestSort={onRequestSort}/>
                        </Tooltip>
                    )}
                </div>
            </Toolbar>
        </div>
    );
};

function NBTableHead(props) {
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
                        className={`nb-material-table__checkbox ${numSelected === rowCount && 'material-table__checkbox--checked'}`}
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {rows.map(row => (
                    <TableCell
                        className="nb-material-table__cell nb-material-table__cell--sort nb-material-table__cell-right"
                        key={row.id}
                        align="left"
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === row.id}
                            direction={orderBy === row.id ? order : 'asc'}
                            onClick={createSortHandler(row.id)}
                            className="material-table__sort-label"
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

export default NBTableHead;
