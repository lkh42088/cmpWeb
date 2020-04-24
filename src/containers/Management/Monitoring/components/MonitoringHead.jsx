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
        id: 'dc', disablePadding: false, label: 'DC',
    },
    {
        id: 'rack', disablePadding: false, label: 'Rack',
    },
    {
        id: 'deviceCode', disablePadding: false, label: '장비코드',
    },
    {
        id: 'deviceType', disablePadding: false, label: '장비타입',
    },
    {
        id: 'manufacture', disablePadding: false, label: '제조사',
    },
    {
        id: 'model', disablePadding: false, label: '모델명',
    },
    {
        id: 'ip', disablePadding: false, label: 'IP',
    },
    {
        id: 'monitoringType', disablePadding: false, label: '모니터링 방식',
    },
];

class MonitoringHead extends PureComponent {
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
}))(MonitoringHead);
