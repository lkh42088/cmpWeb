import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {
    Card,
    CardBody,
    Col,
} from 'reactstrap';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import PropTypes, {string} from 'prop-types';

import AssetsHead from './AssetsHead';
import AssetsModal from "./AssetsModal";

/*let counter = 0;

function createData(equCode, division, manufacturer, model, ip, ownership,
                    ownershipDivision, customer, idc, size, usage) {
    counter += 1;
    return {
        id: counter,
        equCode,
        division,
        manufacturer,
        model,
        ip,
        ownership,
        ownershipDivision,
        customer,
        idc,
        size,
        usage,
    };
}*/

function getSorting(order, orderBy) {
    if (order === 'desc') {
        return (a, b) => {
            if (a[orderBy] < b[orderBy]) {
                return -1;
            }
            if (a[orderBy] > b[orderBy]) {
                return 1;
            }
            return 0;
        };
    }
    return (a, b) => {
        if (a[orderBy] > b[orderBy]) {
            return -1;
        }
        if (a[orderBy] < b[orderBy]) {
            return 1;
        }
        return 0;
    };
}

export default class MatTable extends PureComponent {
    state = {
        order: 'asc',
        orderBy: 'DeviceCode',
        selected: new Map([]),
        /*data: [
            createData('CBS04912', '서버', 'HP', 'DL360p Gen8',
                '0.0.0.0', '고객장비', '고객소유장비', '노퀘어|지케이클로벌', '강남KT-IDC / 06D-06',
                '1U', 'Manage'),
            createData('CBS04911', '서버', 'HP', 'DL360p Gen8',
                '255.255.255.0', '고객장비', '고객소유장비', '노퀘어|지케이클로벌', '강남KT-IDC / 06D-06',
                '1U', 'Manage'),
        ],*/
        data: [],
        page: 0,

        rowsPerPage: 1,
    };

    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        assetState: PropTypes.arrayOf(PropTypes.string).isRequired,
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
        const {orderBy: stateOrderBy, order: stateOrder} = this.state;

        if (stateOrderBy === property && stateOrder === 'desc') {
            order = 'asc';
        }

        this.setState({order, orderBy});
    };

    handleSelectAllClick = (event, checked) => {
        console.log("CLICK : handleSelectAllClick");
        if (checked) {
            const {assetState} = this.props;
            const newSelected = new Map();
            assetState.devices.map(n => newSelected.set(n.Idx, true));
            this.setState({selected: newSelected});
            return;
        }
        this.setState({selected: new Map([])});
    };

    handleClick = (event, id) => {
        console.log("CLICK : handleClick");
        const {selected} = this.state;
        const newSelected = new Map(selected);
        const value = newSelected.get(id);
        let isActive = true;
        if (value) {
            isActive = false;
        }
        newSelected.set(id, isActive);
        this.setState({selected: newSelected});
    };

    handleChangePage = (event, page) => {
        console.log("CLICK : handleChangePage");
        this.setState({page});
    };

    handleChangeRowsPerPage = (event) => {
        console.log("CLICK : handleChangeRowsPerPage");
        this.setState({rowsPerPage: event.target.value});
    };

   /* handleDeleteSelected = () => {
        const {data} = this.state;
        let copyData = [...data];
        const {selected} = this.state;

        for (let i = 0; i < [...selected].filter(el => el[1]).length; i += 1) {
            copyData = copyData.filter(obj => obj.id !== selected[i]);
        }

        this.setState({data: copyData, selected: new Map([])});
    };*/

    isSelected = (id) => {
        const {selected} = this.state;
        return !!selected.get(id);
    };

    render() {
        const {
            data, order, orderBy, selected, rowsPerPage, page,
        } = this.state;
        /*const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - (page * rowsPerPage));*/
        const {handleSubmit} = this.props;
        const {assetState} = this.props;

        const devices = assetState.devices.map(post => (
            <div className="mt-2 style-card" key={post.RegisterId}>
                {post.RegisterId}
            </div>
        ));

        return (
            <Col md={12} lg={12}>
                <Card>
                    <CardBody>
                        <div className="material-table__wrap">
                            <Table className="material-table">
                                <AssetsHead
                                    numSelected={[...selected].filter(el => el[1]).length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={this.handleSelectAllClick}
                                    onRequestSort={this.handleRequestSort}
                                    rowCount={assetState.devices.length}
                                />
                                <TableBody>
                                    {assetState.devices
                                        .sort(getSorting(order, orderBy))
                                        .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                                        .map((d) => {
                                            const isSelected = this.isSelected(d.Idx);
                                            return (
                                                <TableRow
                                                    className="material-table__row"
                                                    role="checkbox"
                                                    aria-checked={isSelected}
                                                    tabIndex={-1}
                                                    key={d.Idx}
                                                    selected={isSelected}
                                                >
                                                    <TableCell className="material-table__cell"
                                                               padding="checkbox"
                                                               onClick={event => this.handleClick(event, d.Idx)}>
                                                        <Checkbox checked={isSelected}
                                                                  className="material-table__checkbox"/>
                                                    </TableCell>
                                                    <TableCell
                                                        className="material-table__cell material-table__cell-right"
                                                    >{/*No*/}
                                                        {d.Idx}
                                                    </TableCell>
                                                    <TableCell
                                                        className="material-table__cell material-table__cell-right"
                                                    >{/*장비코드*/}
                                                        <b className="text_cor_green mouse_over_list">
                                                            <AssetsModal
                                                                title="장비 확인"
                                                                message="자산관리 > 서버 장비 확인 페이지 입니다."
                                                                modalType="view"
                                                                toggleTitle={d.DeviceCode}
                                                            />
                                                        </b>
                                                    </TableCell>
                                                    <TableCell
                                                        className="material-table__cell material-table__cell-right"
                                                    >{/*구분*/}{d.DeviceType}
                                                    </TableCell>
                                                    <TableCell
                                                        className="material-table__cell material-table__cell-right"
                                                    >{/*제조사*/}{d.Manufacture}
                                                    </TableCell>
                                                    <TableCell
                                                        className="material-table__cell material-table__cell-right"
                                                    >{/*모델명*/}{d.Model}
                                                    </TableCell>
                                                    <TableCell
                                                        className="material-table__cell material-table__cell-right"
                                                    >{/*IP*/}{d.Ip}
                                                    </TableCell>
                                                    <TableCell
                                                        className="material-table__cell material-table__cell-right"
                                                    >{/*소유권*/}{d.Ownership}
                                                    </TableCell>
                                                    <TableCell
                                                        className="material-table__cell material-table__cell-right"
                                                    >{/*소유권구분*/}{d.OwnerCompany}
                                                    </TableCell>
                                                    <TableCell
                                                        className="material-table__cell material-table__cell-right"
                                                    >{/*고객사*/}<b className="text_cor_orange">{d.Customer}</b>
                                                    </TableCell>
                                                    <TableCell
                                                        className="material-table__cell material-table__cell-right"
                                                    >{/*IDC/위치*/}{d.IDC} {d.Rack}
                                                    </TableCell>
                                                    <TableCell
                                                        className="material-table__cell material-table__cell-right"
                                                    >{/*크기*/}{d.Size}
                                                    </TableCell>
                                                    <TableCell
                                                        className="material-table__cell material-table__cell-right"
                                                    >{/*용도*/}{d.Purpos}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {/*{emptyRows > 0 && (
                                        <TableRow style={{height: 49 * emptyRows}}>
                                            <TableCell colSpan={13}/>
                                        </TableRow>
                                    )}*/}
                                </TableBody>
                            </Table>
                        </div>
                        <TablePagination
                            component="div"
                            className="material-table__pagination"
                            count={assetState.devices.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            backIconButtonProps={{'aria-label': 'Previous Page'}}
                            nextIconButtonProps={{'aria-label': 'Next Page'}}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            rowsPerPageOptions={[1, 15]}
                            dir="ltr"
                            SelectProps={{
                                inputProps: {'aria-label': 'rows per page'},
                                native: true,
                            }}
                        />
                    </CardBody>
                </Card>
            </Col>
        );
    }
}
