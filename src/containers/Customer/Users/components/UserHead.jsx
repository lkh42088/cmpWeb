import React from "react";
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const UserHead = ({
 onSelectAllClick, order, orderBy, numSelected, rowCount, rows,
                  }) => (
    <TableHead>
        <TableRow>
            <TableCell padding="checkbox">
                <Checkbox
                    className={
                        `nb-material-table__checkbox 
                            ${numSelected === rowCount
                        && 'nb-material-table__checkbox--checked'
                        }`
                    }
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={numSelected === rowCount}
                    onChange={onSelectAllClick}
                />
            </TableCell>
            {rows.map(row => (
                <TableCell className="nb-material-table__cell
                        nb-material-table__cell--sort nb-material-table__cell-right"
                           key={row.id}
                           align="left"
                           padding={row.disablePadding ? 'none' : 'default'}
                           sortDirection={orderBy === row.id ? order : false}
                >
                    <TableSortLabel
                        active={orderBy === row.id}
                        direction={order}
                        className="nb-material-table__sort-label"
                        dir="ltr"
                    >
                        {row.label}
                    </TableSortLabel>
                </TableCell>
            ))}
        </TableRow>
    </TableHead>
);

export default UserHead;
