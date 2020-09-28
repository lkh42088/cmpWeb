import React, {Fragment} from "react";
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';

function CommonTableHead(props) {
    const {
        classes, order, orderBy, numSelected, rowCount, rows,
        onRequestSort, onSelectAllClick, checkboxFlag,
    } = props;
    const createSortHandler = property => (event) => {
        onRequestSort(event, property);
    };

    console.log("props : ", props);

    /*checkboxFlag -> 코드관리*/

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" style={checkboxFlag ? {display: "none"} : {}}>
                    <Checkbox
                        className={`cb-material-table__checkbox ${numSelected === rowCount && 'cb-material-table__checkbox--checked'}`}
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {rows.map((row, index) => (
                    <TableCell
                        className="cb-material-table__cell cb-material-table__cell--sort cb-material-table__cell-right"
                        key={row.id}
                        align="left"
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                        style={{minWidth: row.minWidth}}
                        colSpan={row.id === "colspan" ? 2 : 1}
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

export default CommonTableHead;
