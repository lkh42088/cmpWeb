import React from 'react';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { RTLProps } from '../../../../shared/prop-types/ReducerProps';

const rows = [
    {
        id: 'no', disablePadding: false, label: 'No.',
    },
    {
        id: 'id', disablePadding: false, label: '아이디',
    },
    {
        id: 'company', disablePadding: false, label: '회사',
    },
    {
        id: 'email', disablePadding: false, label: '이메일',
    },
    {
        id: 'authority', disablePadding: false, label: '권한',
    },
    {
        id: 'phone', disablePadding: false, label: '전화',
    },
    {
        id: 'loginAuth', disablePadding: false, label: '로그인 인증',
    },
    {
        id: 'registerDate', disablePadding: false, label: '등록일',
    },
    {
        id: 'lastAccess', disablePadding: false, label: '최근접속일자',
    },
];

const CustomerHead = ({props}) => {
    const {onSelectAllClick, order, orderBy, numSelected, rowCount, rtl} = {props};
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        className={`material-table__checkbox ${numSelected === rowCount && 'material-table__checkbox--checked'}`}
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        onChange={onSelectAllClick}
                    />
                </TableCell>
                {rows.map(row => (
                    <TableCell
                        className="material-table__cell material-table__cell--sort material-table__cell-right"
                        key={row.id}
                        align={rtl.direction === 'rtl' ? 'right' : 'left'}
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === row.id}
                            direction={order}
                            onClick={createSortHandler(row.id)}
                            className="material-table__sort-label"
                            dir="ltr"
                        >
                            {row.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

CustomerHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    rtl: RTLProps.isRequired,
};

export default CustomerHead;
// export default connect(state => ({
//     rtl: state.rtl,
// }))(CustomerHead);
