import React, {PureComponent, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import {RTLProps} from '../../../../shared/prop-types/ReducerProps';

const rows = [
    /*{id: 'Idx', disablePadding: false, label: 'No.'},*/
    {id: 'deviceCode', disablePadding: false, label: '장비코드'},
    {id: 'deviceType', disablePadding: false, label: '구분'},
    {id: 'manufacture', disablePadding: false, label: '제조사'},
    {id: 'model', disablePadding: false, label: '모델명'},
    {id: 'ownership', disablePadding: false, label: '소유권'},
    {id: 'ownerCompany', disablePadding: false, label: '소유권 구분'},
    {id: 'customer', disablePadding: false, label: '고객사'},
    {id: 'idc', disablePadding: false, label: 'IDC/위치'},
    {id: 'purpos', disablePadding: false, label: '용도'},
];
/*

function updateHeadRows(type) {
    //TODO 다시 정리 필요~ 마지막 처리
    //console.log("type : ", type);

    if (type === 'server') {
        rows.concat(
            {id: 'Ip', disablePadding: false, label: 'IP'},
            {id: 'Size', disablePadding: false, label: '크기'},
        );
    } else if (type === 'network') {
        rows.concat(
            {id: 'Ip', disablePadding: false, label: 'IP'},
            {id: 'HwSn', disablePadding: false, label: 'HwSn'},
            {id: 'FirmwareVersion', disablePadding: false, label: 'FirmwareVersion'},
            {id: 'WarehousingDate', disablePadding: false, label: 'WarehousingDate'},
        );
    } else if (type === 'part') {
        rows.concat(
            {id: 'HwSn', disablePadding: false, label: 'HwSn'},
            {id: 'Warranty', disablePadding: false, label: 'Warranty'},
            {id: 'WarehousingDate', disablePadding: false, label: 'WarehousingDate'},
        );
    }
}
*/

class AssetsHead extends PureComponent {
    state = {
        // eslint-disable-next-line react/no-unused-state
        rows: [
            /*{id: 'Idx', disablePadding: false, label: 'No.'},*/
            {id: 'deviceCode', disablePadding: false, label: '장비코드'},
            {id: 'deviceType', disablePadding: false, label: '구분'},
            {id: 'manufacture', disablePadding: false, label: '제조사'},
            {id: 'model', disablePadding: false, label: '모델명'},
            {id: 'ownership', disablePadding: false, label: '소유권'},
            {id: 'ownerCompany', disablePadding: false, label: '소유권 구분'},
            {id: 'customer', disablePadding: false, label: '고객사'},
            {id: 'idc', disablePadding: false, label: 'IDC/위치'},
            {id: 'purpos', disablePadding: false, label: '용도'},
        ],
    };

    static propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.string.isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
        rtl: RTLProps.isRequired,
        // eslint-disable-next-line react/forbid-prop-types
        assetState: PropTypes.object.isRequired,
    };


    componentWillMount() {
        const {assetState} = this.props;
        //updateHeadRows(assetState.deviceType);
    }

    componentWillReceiveProps(propData) {
        /*컴포넌트가 prop 을 새로 받았을 때 실행
        prop 에 따라 state 를 업데이트 해야 할 때 사용
        이 안에서 this.setState() 를 해도 추가적으로 렌더링하지 않음.*/
        //updateHeadRows(assetState.deviceType);
        //console.log("AssetsHead componentWillReceiveProps");

        this.setState({
            rows: rows.filter(id => id !== 'HwSn'),
        });
        this.setState({
            rows: rows.filter(id => id !== 'Warranty'),
        });
        this.setState({
            rows: rows.filter(id => id !== 'FirmwareVersion'),
        });
        this.setState({
            rows: rows.filter(id => id !== 'WarehousingDate'),
        });
        this.setState({
            rows: rows.filter(id => id !== 'Ip'),
        });
        this.setState({
            rows: rows.filter(id => id !== 'Size'),
        });

        if (propData.assetState.deviceType === 'server') {
            this.setState({
                rows: rows.concat(
                    {id: 'ip', disablePadding: false, label: 'IP'},
                    {id: 'size', disablePadding: false, label: '크기'},
                ),
            });
        } else if (propData.assetState.deviceType === 'network') {
            this.setState({
                rows: rows.concat(
                    {id: 'ip', disablePadding: false, label: 'IP'},
                    {id: 'hwSn', disablePadding: false, label: 'HwSn'},
                    {id: 'firmwareVersion', disablePadding: false, label: 'FirmwareVersion'},
                    {id: 'warehousingDate', disablePadding: false, label: 'WarehousingDate'},
                ),
            });
        } else if (propData.assetState.deviceType === 'part') {
            this.setState({
                rows: rows.concat(
                    {id: 'hwSn', disablePadding: false, label: 'HwSn'},
                    {id: 'warranty', disablePadding: false, label: 'Warranty'},
                    {id: 'warehousingDate', disablePadding: false, label: 'WarehousingDate'},
                ),
            });
        }
    }

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
                    {/* eslint-disable-next-line react/destructuring-assignment */}
                    {this.state.rows.map(row => (
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
}))(AssetsHead);
