import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import {RTLProps} from '../../../../shared/prop-types/ReducerProps';

const rows = [
    {
        id: 'no', disablePadding: true, label: 'No.',
    },
    {
        id: 'equCode', disablePadding: true, label: '장비코드',
    },
    {
        id: 'division', disablePadding: false, label: '구분',
    },
    {
        id: 'manufacturer', disablePadding: false, label: '제조사',
    },
    {
        id: 'model', disablePadding: false, label: '모델명',
    },
    {
        id: 'ip', disablePadding: false, label: 'IP',
    },
    {
        id: 'ownership', disablePadding: false, label: '소유권',
    },
    {
        id: 'ownershipDivision', disablePadding: false, label: '소유권 구분',
    },
    {
        id: 'customer', disablePadding: false, label: '고객사',
    },
    {
        id: 'idc', disablePadding: false, label: 'IDC/위치',
    },
    {
        id: 'size', disablePadding: false, label: '크기',
    },
    {
        id: 'usage', disablePadding: false, label: '용도',
    },
];

class MatTableHead extends PureComponent {
    static propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.string.isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
        rtl: RTLProps.isRequired,
    };

    createSortHandler = property => (event) => {
        const {onRequestSort} = this.props;
        onRequestSort(event, property);
    };

    render() {
        const {
            onSelectAllClick, order, orderBy, numSelected, rowCount, rtl,
        } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            className={`material-table__checkbox 
              ${numSelected === rowCount && 'material-table__checkbox--checked'}`}
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {rows.map(row => (
                        <TableCell
                            className="material-table__cell
              material-table__cell--sort material-table__cell-right"
                            key={row.id}
                            align={rtl.direction === 'rtl' ? 'right' : 'left'}
                            padding={row.disablePadding ? 'none' : 'default'}
                            sortDirection={orderBy === row.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === row.id}
                                direction={order}
                                onClick={this.createSortHandler(row.id)}
                                className="material-table__sort-label"
                                dir="ltr"
                            >
                                {row.label}
                            </TableSortLabel>
                        </TableCell>
                    ), this)}
                </TableRow>
            </TableHead>
        );
    }
}

export default connect(state => ({
    rtl: state.rtl,
}))(MatTableHead);
