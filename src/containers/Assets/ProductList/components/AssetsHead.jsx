import React, {PureComponent, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import {RTLProps} from '../../../../shared/prop-types/ReducerProps';
import {
    fetchPosts,
    setApiPage,
} from '../../../../redux/actions/assetsAction';

const rows = [
    /*{id: 'Idx', disablePadding: false, label: 'No.'},*/
    {id: 'deviceCode', disablePadding: false, label: '장비코드'},
    {id: 'deviceType', disablePadding: false, label: '구분'},
    {id: 'manufacture', disablePadding: false, label: '제조사'},
    {id: 'model', disablePadding: false, label: '모델명'},
    {id: 'customer', disablePadding: false, label: '고객사'},
    {id: 'idc', disablePadding: false, label: 'IDC'},
    {id: 'rack', disablePadding: false, label: '위치'},
    {id: 'ownership', disablePadding: false, label: '소유권'},
    {id: 'ownerCompany', disablePadding: false, label: '소유권 구분'},
    // {id: 'purpose', disablePadding: false, label: '용도'},
];

class AssetsHead extends PureComponent {
    state = {
        // eslint-disable-next-line react/no-unused-state
        rows: [
            /*{id: 'Idx', disablePadding: false, label: 'No.'},*/
            {id: 'deviceCode', disablePadding: false, label: '장비코드'},
            {id: 'deviceType', disablePadding: false, label: '구분'},
            {id: 'manufacture', disablePadding: false, label: '제조사'},
            {id: 'model', disablePadding: false, label: '모델명'},
            {id: 'customer', disablePadding: false, label: '고객사'},
            {id: 'idc', disablePadding: false, label: 'IDC'},
            {id: 'rack', disablePadding: false, label: '위치'},
            {id: 'ownership', disablePadding: false, label: '소유권'},
            {id: 'ownerCompany', disablePadding: false, label: '소유권 구분'},
            // {id: 'purpose', disablePadding: false, label: '용도'},
        ],
    };

    static propTypes = {
        // eslint-disable-next-line react/forbid-prop-types
        assetState: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.string.isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
        rtl: RTLProps.isRequired,
        selectedSize: PropTypes.number.isRequired,
        rowsPerPage: PropTypes.number.isRequired,
    };

    // eslint-disable-next-line consistent-return
    static getDerivedStateFromProps = (nextProps, prevState) => {
        if (nextProps.assetState.deviceType === 'server') {
            return {
                rows: rows.concat(
                    {id: 'ip', disablePadding: false, label: 'IP'},
                    {id: 'size', disablePadding: false, label: '크기'},
                ),
            };
        }

        if (nextProps.assetState.deviceType === 'network') {
            return {
                rows: rows.concat(
                    {id: 'ip', disablePadding: false, label: 'IP'},
                    {id: 'hwSn', disablePadding: false, label: 'HwSn'},
                    {id: 'firmwareVersion', disablePadding: false, label: 'FirmwareVersion'},
                    /*{id: 'warehousingDate', disablePadding: false, label: '입고일'},*/
                ),
            };
        }

        if (nextProps.assetState.deviceType === 'part') {
            return {
                rows: rows.concat(
                    {id: 'hwSn', disablePadding: false, label: 'HwSn'},
                    /*{id: 'warranty', disablePadding: false, label: 'Warranty'},
                    {id: 'warehousingDate', disablePadding: false, label: '입고일'},*/
                ),
            };
        }

      /*  if (nextProps.assetState.apiPageRd.order === prevState.stateOrder) {
            onRequestSort(nextProps.assetState.apiPageRd.orderBy, nextProps.assetState.apiPageRd.order);
        }*/
    };

    /*componentWillReceiveProps(propData) {
        /!*컴포넌트가 prop 을 새로 받았을 때 실행
        prop 에 따라 state 를 업데이트 해야 할 때 사용
        이 안에서 this.setState() 를 해도 추가적으로 렌더링하지 않음.*!/
        //updateHeadRows(assetState.deviceType);
        console.log("AssetsHead componentWillReceiveProps");

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
    }*/

    createSortHandler = property => (event) => {
        const {
            onRequestSort, dispatch, assetState, order,
        } = this.props;
        const {stateOrder, stateOrderBy} = this.state;
        console.log("order : ", order, ", property : ", property);

        let submitOrder = 'desc';

        //dispatch(setApiPage());
        if (order === 'desc') {
            submitOrder = 'asc';
        }

        const submitData = ({
            deviceType: assetState.apiPageRd.deviceType,
            orderBy: property,
            order: submitOrder,
            rowsPerPage: assetState.apiPageRd.rowsPerPage,
            page: assetState.apiPageRd.page,
            showPage: assetState.apiPageRd.showPage,
            outFlag: assetState.apiPageRd.outFlag,
            offsetPage: assetState.apiPageRd.offsetPage,
        });

        dispatch(setApiPage(submitData));

        setTimeout(() => {
            onRequestSort(property, submitOrder);
        }, 100);
    };

    render() {
        const {
            onSelectAllClick, order, orderBy, numSelected, rowCount, rtl, assetState,
            selectedSize, rowsPerPage,
        } = this.props;

        let allCheck = false;
        if (selectedSize === undefined || selectedSize === 0) {
            if (numSelected === rowCount) {
                allCheck = true;
            } else {
                allCheck = false;
            }
        } else if (selectedSize === rowCount) {
                allCheck = true;
            } else {
                allCheck = false;
            }

        return (
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Checkbox
                            className={`${numSelected === rowCount && 'material-table__checkbox--checked'}`}
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={allCheck}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {/* eslint-disable-next-line react/destructuring-assignment */}
                    {this.state.rows.map(row => (
                        <TableCell
                            className="material-table__cell
                            material-table__cell--sort material-table__cell-right"
                            key={row.id}
                            padding={row.disablePadding ? 'none' : 'default'}
                            sortDirection={orderBy === row.id ? order : false}
                            width="500"
                        >
                            <TableSortLabel
                                active={orderBy === row.id}
                                direction={order}
                                onClick={this.createSortHandler(row.id)}
                                className="material-table__sort-label material-table__sort-label-padding"
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
