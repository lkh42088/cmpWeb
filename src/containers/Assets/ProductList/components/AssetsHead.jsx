import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import { RTLProps } from '../../../../shared/prop-types/ReducerProps';
import { setApiPage } from '../../../../redux/actions/assetsAction';

const rows = [
    /*{id: 'Idx', disablePadding: false, label: 'No.'},*/
    {
        id: 'deviceCode', disablePadding: false, label: '장비코드', order: 1,
    },
    {
        id: 'deviceType', disablePadding: false, label: '구분', order: 2,
    },
    {
        id: 'manufacture', disablePadding: false, label: '제조사', order: 3,
    },
    {
        id: 'model', disablePadding: false, label: '모델명', order: 4,
    },
    {
        id: 'customer', disablePadding: false, label: '고객사', order: 5,
    },
    {
        id: 'idc', disablePadding: false, label: 'IDC', order: 6,
    },
    {
        id: 'rack', disablePadding: false, label: '위치', order: 7,
    },
    {
        id: 'ownership', disablePadding: false, label: '소유권', order: 8,
    },
    {
        id: 'ownerCompany', disablePadding: false, label: '소유권 구분', order: 9,
    },
];

class AssetsHead extends PureComponent {
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

    constructor() {
        super();
        this.state = {
            rows: [
                {
                    id: 'deviceCode', disablePadding: false, label: '장비코드', order: 1,
                },
                {
                    id: 'deviceType', disablePadding: false, label: '구분', order: 2,
                },
                {
                    id: 'manufacture', disablePadding: false, label: '제조사', order: 3,
                },
                {
                    id: 'model', disablePadding: false, label: '모델명', order: 4,
                },
                {
                    id: 'customer', disablePadding: false, label: '고객사', order: 5,
                },
                {
                    id: 'idc', disablePadding: false, label: 'IDC', order: 6,
                },
                {
                    id: 'rack', disablePadding: false, label: '위치', order: 7,
                },
                {
                    id: 'ownership', disablePadding: false, label: '소유권', order: 8,
                },
                {
                    id: 'ownerCompany', disablePadding: false, label: '소유권 구분', order: 9,
                },
            ],
        };
    }

    // eslint-disable-next-line consistent-return
    static getDerivedStateFromProps = (nextProps, prevState) => {
        let oriRows = rows;

        if (nextProps.assetState.searchRd.operatingFlag === true
            && nextProps.assetState.searchRd.carryingFlag === true) {
            oriRows = oriRows.concat(
                {
                    id: 'outFlag', disablePadding: false, label: '운영여부', order: 15,
                },
            );
        }

        switch (nextProps.assetState.deviceType) {
            case "server":
                oriRows = oriRows.concat(
                    {
                        id: 'ip', disablePadding: false, label: 'IP', order: 10,
                    },
                    {
                        id: 'size', disablePadding: false, label: '크기', order: 11,
                    },
                );
                break;
            case "network":
                oriRows = oriRows.concat(
                    {
                        id: 'ip', disablePadding: false, label: 'IP', order: 10,
                    },
                    {
                        id: 'hwSn', disablePadding: false, label: 'HwSn', order: 11,
                    },
                    {
                        id: 'firmwareVersion', disablePadding: false, label: 'FirmwareVersion', order: 12,
                    },
                );
                break;
            case "part":
                oriRows = oriRows.concat(
                    {
                        id: 'hwSn', disablePadding: false, label: 'HwSn', order: 10,
                    },
                );
                break;
            default:
                break;
        }

        return {
            rows: oriRows,
        };
    };

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
            onSelectAllClick, order, orderBy, numSelected, rowCount, selectedSize,
            rtl, assetState, rowsPerPage,
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
                    {this.state.rows
                        .sort((a, b) => (a.order > b.order ? 1 : -1))
                        .map(row => (
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
