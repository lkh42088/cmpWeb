import React, {PureComponent} from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    ButtonToolbar,
    Card,
    CardBody,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown,
} from 'reactstrap';

import CheckIcon from 'mdi-react/CheckIcon';
import MenuDownIcon from 'mdi-react/MenuDownIcon';
import ReloadIcon from 'mdi-react/ReloadIcon';
import MagnifyIcon from 'mdi-react/MagnifyIcon';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import PropTypes from 'prop-types';

import MatTableHead from './MatTableHead';

let counter = 0;

const board = {
    border: '1px solid red',
};

const nbFontSize = {
    fontSize: 'x-small',
    border: '1px solid red',
};

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
}

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
        orderBy: 'equCode',
        selected: new Map([]),
        data: [
            createData('CBS04912', '서버', 'HP', 'DL360p Gen8',
                '0.0.0.0', '고객장비', '고객소유장비', '노퀘어|지케이클로벌', '강남KT-IDC / 06D-06',
                '1U', 'Manage'),
            createData('CBS04911', '서버', 'HP', 'DL360p Gen8',
                '255.255.255.0', '고객장비', '고객소유장비', '노퀘어|지케이클로벌', '강남KT-IDC / 06D-06',
                '1U', 'Manage'),
            createData('CBS04910', '서버', 'HP', 'DL360p Gen8',
                '255.255.255.0', '고객장비', '고객소유장비', '노퀘어|지케이클로벌', '강남KT-IDC / 06D-06',
                '1U', 'Manage'),
            createData('CBS04910', '서버', 'HP', 'DL360p Gen8',
                '255.255.255.0', '고객장비', '고객소유장비', '노퀘어|지케이클로벌', '강남KT-IDC / 06D-06',
                '1U', 'Manage'),
            createData('CBS04910', '서버', 'HP', 'DL360p Gen8',
                '255.255.255.0', '고객장비', '고객소유장비', '노퀘어|지케이클로벌', '강남KT-IDC / 06D-06',
                '1U', 'Manage'),
            createData('CBS04910', '서버', 'HP', 'DL360p Gen8',
                '255.255.255.0', '고객장비', '고객소유장비', '노퀘어|지케이클로벌', '강남KT-IDC / 06D-06',
                '1U', 'Manage'),
            createData('CBS04910', '서버', 'HP', 'DL360p Gen8',
                '255.255.255.0', '고객장비', '고객소유장비', '노퀘어|지케이클로벌', '강남KT-IDC / 06D-06',
                '1U', 'Manage'),
            createData('CBS04910', '서버', 'HP', 'DL360p Gen8',
                '255.255.255.0', '고객장비', '고객소유장비', '노퀘어|지케이클로벌', '강남KT-IDC / 06D-06',
                '1U', 'Manage'),
            createData('CBS04910', '서버', 'HP', 'DL360p Gen8',
                '255.255.255.0', '고객장비', '고객소유장비', '노퀘어|지케이클로벌', '강남KT-IDC / 06D-06',
                '1U', 'Manage'),
        ],
        page: 0,
        rowsPerPage: 5,
    };

    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
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
        if (checked) {
            const {data} = this.state;
            const newSelected = new Map();
            data.map(n => newSelected.set(n.id, true));
            this.setState({selected: newSelected});
            return;
        }
        this.setState({selected: new Map([])});
    };

    handleClick = (event, id) => {
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
        this.setState({page});
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage: event.target.value});
    };

    handleDeleteSelected = () => {
        const {data} = this.state;
        let copyData = [...data];
        const {selected} = this.state;

        for (let i = 0; i < [...selected].filter(el => el[1]).length; i += 1) {
            copyData = copyData.filter(obj => obj.id !== selected[i]);
        }

        this.setState({data: copyData, selected: new Map([])});
    };

    isSelected = (id) => {
        const {selected} = this.state;
        return !!selected.get(id);
    };

    render() {
        const {
            data, order, orderBy, selected, rowsPerPage, page,
        } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - (page * rowsPerPage));
        const { handleSubmit } = this.props;

        return (
            <Col md={12} lg={12}>

                <form className="form" onSubmit={handleSubmit}>
                <div>
                    <div className="float-left">
                        <Button size="sm" className="btn-outline-dae9f4"><Link to="/">장비반출</Link></Button>
                        <Button size="sm" className="btn-outline-dae9f4"><Link to="/AssetsWrite">장비등록</Link></Button>

                        <Button
                            color="primary"
                            size="sm"
                            onClick={this.onWrite}
                        >
                            장비등록2
                        </Button>
                    </div>
                    <div className="float-right">
                        <Button size="sm" outline>재고장비</Button>
                        <Button size="sm" outline>SPLA</Button>
                        <Button size="sm" outline>가용장비</Button>
                        <Button size="sm" outline>반출장비</Button>
                    </div>
                </div>
                </form>
                <Card>
                    <CardBody>
                        <div className="card__title">
                            {/*<h5 className="bold-text">자산관리<h6>서버</h6></h5>*/}
                        </div>
                        <div className="material-table__wrap">
                            <Table className="material-table">
                                <MatTableHead
                                    numSelected={[...selected].filter(el => el[1]).length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={this.handleSelectAllClick}
                                    onRequestSort={this.handleRequestSort}
                                    rowCount={data.length}
                                />
                                <TableBody>
                                    {data
                                        .sort(getSorting(order, orderBy))
                                        .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                                        .map((d) => {
                                            const isSelected = this.isSelected(d.id);
                                            return (
                                                <TableRow
                                                    className="material-table__row"
                                                    role="checkbox"
                                                    onClick={event => this.handleClick(event, d.id)}
                                                    aria-checked={isSelected}
                                                    tabIndex={-1}
                                                    key={d.id}
                                                    selected={isSelected}
                                                >
                                                    <TableCell className="material-table__cell"
                                                               padding="checkbox">
                                                        <Checkbox checked={isSelected}
                                                                  className="material-table__checkbox"/>
                                                    </TableCell>
                                                    <TableCell
                                                        className="material-table__cell material-table__cell-right"
                                                    >
                                                        {d.id}
                                                    </TableCell>
                                                    <TableCell
                                                        className="material-table__cell material-table__cell-right"
                                                    >{d.equCode}
                                                    </TableCell>
                                                    <TableCell
                                                        className="material-table__cell material-table__cell-right"
                                                    >{d.division}
                                                    </TableCell>
                                                    <TableCell
                                                        className="material-table__cell material-table__cell-right"
                                                    >{d.manufacturer}
                                                    </TableCell>
                                                    <TableCell
                                                        className="material-table__cell material-table__cell-right"
                                                    >{d.model}
                                                    </TableCell>
                                                    <TableCell
                                                        className="material-table__cell material-table__cell-right"
                                                    >{d.ip}
                                                    </TableCell>
                                                    <TableCell
                                                        className="material-table__cell material-table__cell-right"
                                                    >{d.ownership}
                                                    </TableCell>
                                                    <TableCell
                                                        className="material-table__cell material-table__cell-right"
                                                    >{d.ownershipDivision}
                                                    </TableCell>
                                                    <TableCell
                                                        className="material-table__cell material-table__cell-right"
                                                    >{d.customer}
                                                    </TableCell>
                                                    <TableCell
                                                        className="material-table__cell material-table__cell-right"
                                                    >{d.idc}
                                                    </TableCell>
                                                    <TableCell
                                                        className="material-table__cell material-table__cell-right"
                                                    >{d.size}
                                                    </TableCell>
                                                    <TableCell
                                                        className="material-table__cell material-table__cell-right"
                                                    >{d.usage}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{height: 49 * emptyRows}}>
                                            <TableCell colSpan={13}/>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <TablePagination
                            component="div"
                            className="material-table__pagination"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            backIconButtonProps={{'aria-label': 'Previous Page'}}
                            nextIconButtonProps={{'aria-label': 'Next Page'}}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            rowsPerPageOptions={[5, 10, 15]}
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
