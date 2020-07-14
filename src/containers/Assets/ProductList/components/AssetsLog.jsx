import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Card, CardBody, Col, Badge,
} from 'reactstrap';
import moment from "moment";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import classNames from 'classnames';
import Collapse from "../../../../shared/components/Collapse";


function textLengthOverCut(txt, len, lastTxt) {
    if (len === "" || len === undefined) { // 기본값
        len = 20;
    }
    if (lastTxt === "" || lastTxt === undefined) { // 기본값
        lastTxt = "...";
    }
    if (txt.length > len) {
        txt = txt.substr(0, len) + lastTxt;
    }
    return txt;
}

function textSplitOverCut(txt, com) {
    const splaArray = txt.split(com);

    // eslint-disable-next-line array-callback-return,consistent-return
    const output = [...splaArray].map((char, index) => {
        if (char !== "") {
            return (
                <ol key={`${char}`}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{char}</ol>
            );
        }
    });

    return <React.Fragment>{output}</React.Fragment>;
}

//assetState: PropTypes.arrayOf(PropTypes.string).isRequired,
class AssetsLog extends PureComponent {
    static propTypes = {
        // eslint-disable-next-line react/forbid-prop-types
        assetState: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.state = {
            order: 'asc',
            orderBy: 'calories',
            selected: new Map([]),
            page: 0,
            rowsPerPage: 5,
        };
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
        const {orderBy: stateOrderBy, order: stateOrder} = this.state;

        if (stateOrderBy === property && stateOrder === 'desc') {
            order = 'asc';
        }

        this.setState({order, orderBy});
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

    onClose = () => {
        const {closeToggle} = this.props;
        closeToggle(); //
    };

    showPassword = (e) => {
        e.preventDefault();
        this.setState(prevState => ({showPassword: !prevState.showPassword}));
    };

    renderSwitch = (param) => {
        switch (param) {
            case '1':
                return '장비 등록';
            case '2':
                return '장비 정보 수정';
            case '3':
                return '장비 반입';
            case '4':
                return '장비 반출';
            case '5':
                return '장비 이동';
            default:
                return 'error';
        }
    };

    renderLogLevelSwitch = (param) => {
        switch (param) {
            case '1':
                return <Badge color="danger">Fatal</Badge>;
            case '2':
                return <Badge color="danger">Error</Badge>;
            case '3':
                return <Badge color="warning">Warn</Badge>;
            case '4':
                return <Badge color="primary">Info</Badge>;
            case '5':
                return <Badge color="primary">Debug</Badge>;
            default:
                return '';
        }
    };

    render() {
        const {
            order, orderBy, selected, rowsPerPage, page,
        } = this.state;
        const {assetState, dispatch} = this.props;
        let emptyRows;
        let count;
        /*Collapse... with-shadow modal_comment_register*/

        if (assetState.deviceLog.length > 0) {
            emptyRows = rowsPerPage - Math.min(rowsPerPage, assetState.deviceLog.length - (page * rowsPerPage));
            count = assetState.deviceLog.length;
        } else {
            emptyRows = 0;
            count = 0;
        }

        return (
            /*<Collapse title="로그 확인"
                      className="assets_write__modal__tableLine">*/
            <Col md={12} lg={12}>
                {/*<div className="card__title">
                            <h5 className="bold-text">title</h5>
                            <h5 className="subhead">Use default table with property <span
                                className="red-text">responsive</span></h5>
                        </div>*/}
                <div className="material-table__wrap">
                    <Table className="material-table" style={{overFlowX: "scroll"}}>
                        <thead>
                        <TableRow>
                            <TableCell
                                className="material-table__cell material-table__cell-right">Level</TableCell>
                            <TableCell
                                className="material-table__cell material-table__cell-right">Code</TableCell>
                            <TableCell
                                className="material-table__cell material-table__cell-right">작성자(ID)</TableCell>
                            <TableCell
                                className="material-table__cell material-table__cell-right">등록일</TableCell>

                            <TableCell
                                className="material-table__cell material-table__cell-right">구분</TableCell>
                            <TableCell
                                className="material-table__cell material-table__cell-right">내용</TableCell>
                        </TableRow>
                        </thead>
                        {
                            assetState.deviceLog.length > 0 ? (
                                <TableBody>
                                    {assetState.deviceLog
                                        .sort((a, b) => b.idx - a.idx)
                                        .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                                        .map(d => (
                                            <TableRow
                                                className="material-table__row"
                                                tabIndex={-1}
                                                key={d.idx}
                                            >
                                                <TableCell
                                                    className="material-table__cell material-table__cell-right"
                                                    component="th"
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {this.renderLogLevelSwitch(d.logLevel.toString())}
                                                </TableCell>
                                                <TableCell
                                                    className="material-table__cell material-table__cell-right"
                                                >{this.renderSwitch(d.workCode.toString())}
                                                </TableCell>
                                                <TableCell
                                                    className="material-table__cell material-table__cell-right"
                                                >{d.registerName} ({d.registerId})
                                                </TableCell>
                                                <TableCell
                                                    className="material-table__cell material-table__cell-right"
                                                >{moment(d.registerDate).format("YYYY-MM-DD")}
                                                </TableCell>
                                                <TableCell
                                                    className="material-table__cell material-table__cell-right"
                                                >{d.field}
                                                </TableCell>
                                                <TableCell
                                                    className="material-table__cell material-table__cell-right
                                                            text-left"
                                                >{
                                                    // eslint-disable-next-line no-nested-ternary
                                                    d.workCode.toString() === '2' ? (
                                                        d.field === "SPLA" ? (
                                                            <Fragment>
                                                                변경 전 :
                                                                <span title={d.oldStatus}>
                                                                    {textSplitOverCut(d.oldStatus, ",")}
                                                                </span>
                                                                <br/>
                                                                변경 후 :
                                                                <span title={d.newStatus}>
                                                                    {textSplitOverCut(d.newStatus, ",")}
                                                                </span>
                                                            </Fragment>
                                                        ) : (
                                                            <Fragment>
                                                                변경 전 :
                                                                <span title={d.oldStatus}>
                                                                    {textLengthOverCut(d.oldStatus, 80)}
                                                                </span>
                                                                <br/>
                                                                변경 후 :
                                                                <span title={d.newStatus}>
                                                                    {textLengthOverCut(d.newStatus, 80)}
                                                                </span>
                                                            </Fragment>
                                                        )
                                                    ) : (
                                                        <Fragment>
                                                            &nbsp;
                                                        </Fragment>
                                                    )
                                                }
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{height: 49 * emptyRows}}>
                                            <TableCell colSpan={6}/>
                                        </TableRow>
                                    )}
                                </TableBody>
                            ) : (
                                <Fragment>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell collspan="6">
                                                등록된 로그가 없습니다.
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Fragment>
                            )
                        }
                    </Table>
                </div>
                <TablePagination
                    component="div"
                    className="material-table__pagination"
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{'aria-label': 'Previous Page'}}
                    nextIconButtonProps={{'aria-label': 'Next Page'}}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    rowsPerPageOptions={[5]}
                    dir="ltr"
                    SelectProps={{
                        inputProps: {'aria-label': 'rows per page'},
                        native: true,
                    }}
                />
            </Col>
            /*</Collapse>*/
        );
    }
}

export default AssetsLog;
