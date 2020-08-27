import React, {useEffect, useState, Fragment} from 'react';
import {
    Card, Col, CardBody, Container, Row,
} from 'reactstrap';

import {makeStyles} from "@material-ui/core/styles";

import {useDispatch, useSelector} from "react-redux";

import ReactTooltip from "react-tooltip";

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import MatButton from '@material-ui/core/Button';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import PostAddIcon from "@material-ui/icons/PostAdd";
import UndoIcon from "@material-ui/icons/Undo";

// DeleteSweep
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";

import CommonTableHead from "../../../Common/CommonTableHead";

import {
    setMainSubCodeDisplayFlag,
} from "../../../../redux/actions/codeActions";

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

const rows = [
    {
        id: 'name',
        disablePadding: false,
        label: 'ITEM',
    },
    {
        id: 'order',
        disablePadding: false,
        label: '순서',
    },
];

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    rowCss: {
        '& > *': {
            borderBottom: 'unset',
        },
        "&:hover":
            theme.palette.type === 'light'
                ? {
                    boxShadow: "4px 2px 3px #999999",
                }
                : {
                    boxShadow: "4px 2px 3px #000000",
                },
    },
    spanSubject: {
        display: 'inline-block',
        width: '100px',
    },
    spanContents: {
        display: 'inline-block',
    },
    grid: {
        flexGrow: 1,
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

const SubCode = () => {
    let emptyRows = 0;
    //const selected = new Map([]);
    const page = 0;
    const rowsPerPage = 5;
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('type');
    const [selected, setSelected] = useState(new Map([]));

    const classes = useStyles();
    const dispatch = useDispatch();
    const {
        mainSubCodeDisplayFlag, menuSelected, mainSubCodeSelected, subCode,
    } = useSelector(({codeRd}) => ({
        mainSubCodeDisplayFlag: codeRd.mainSubCodeDisplayFlag,
        menuSelected: codeRd.menuSelected,
        mainSubCodeSelected: codeRd.mainSubCodeSelected,
        subCode: codeRd.subCode,
    }));

    const handleSubCodeTableDisplay = (event) => {
        dispatch(setMainSubCodeDisplayFlag(false));
    };

    const handleClick = (event, id) => {
        const newSelected = new Map(selected);
        const value = newSelected.get(id);
        let isActive = true;
        if (value) {
            isActive = false;
        }
        newSelected.set(id, isActive);
        setSelected(newSelected);
    };

    /** Pagination */
    const handleSelectAllClick = (event, checked) => {
        const newSelected = new Map();
        if (checked) {
            subCode.map(n => newSelected.set(n.id, true));
        } else {
            subCode.map(n => newSelected.set(n.id, false));
        }
        setSelected(newSelected);
    };

    /** Pagination */
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        const changeOrder = isAsc ? "desc" : "asc";

        setOrder(changeOrder);
        setOrderBy(property);
    };

    const getSelected = id => !!selected.get(id);

    if (subCode.length > 0) {
        emptyRows = subCode.length;
    } else {
        emptyRows = 0;
    }

    return (
        <Container>
            <Row>
                <Col md={12}>
                    <div style={{
                        float: "right",
                    }}>
                        <IconButton type="button"
                                    data-tip data-for="tooltipUndo"
                                    className={classes.iconAdd}
                                    onClick={event => handleSubCodeTableDisplay(event)}
                                    style={{
                                        color: "#87dfd6",
                                    }}>
                            <UndoIcon/>
                        </IconButton>
                        <ReactTooltip id="tooltipUndo" effect="float"
                                      delayHide={100} type="dark" place="bottom"
                                      className={classes.tooltip}>
                            실행 취소
                        </ReactTooltip>
                        <IconButton type="button"
                                    data-tip data-for="tooltipSelectDelete"
                                    className={classes.iconAdd}>
                            <DeleteSweepIcon/>
                        </IconButton>
                        <ReactTooltip id="tooltipSelectDelete" effect="float"
                                      delayHide={100} type="dark" place="bottom"
                                      className={classes.tooltip}>
                            선택 삭제
                        </ReactTooltip>
                        <Chip variant="outlined"
                              size="small"
                              avatar={<Avatar>C</Avatar>}
                              label={subCode.length}/>
                    </div>
                </Col>
            </Row>
            <Row style={{
                height: "500px",
                overflowY: "auto",
            }}>
                <Col md={12} lg={12} xl={12}>
                    <Card>
                        <CardBody>
                            <div className="material-table__wrap">
                                <Table className="material-table" size="small">
                                    <CommonTableHead
                                        classes={classes}
                                        numSelected={[...selected].filter(el => el[1]).length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={subCode && subCode.length ? subCode.length : 0}
                                        rows={rows}
                                    />
                                    <TableBody>
                                        {subCode
                                            .sort(getSorting(order, orderBy))
                                            .map((d) => {
                                                const isSelected = getSelected(d.id);
                                                return (
                                                    <TableRow
                                                        key={`${d.id}${d.name}`}
                                                        className="material-table__row"
                                                        role="checkbox"
                                                        aria-checked={isSelected}
                                                        onClick={event => handleClick(event, d.id)}
                                                        tabIndex={-1}
                                                        selected={isSelected}
                                                    >
                                                        <TableCell className="material-table__cell" padding="checkbox">
                                                            <Checkbox
                                                                checked={isSelected}
                                                                className="material-table__checkbox"/>
                                                        </TableCell>
                                                        <TableCell
                                                            className="material-table__cell material-table__cell-right"
                                                        >{d.name}
                                                        </TableCell>
                                                        <TableCell
                                                            className="material-table__cell material-table__cell-right"
                                                        >{d.order}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        {subCode.length === 0 && (
                                            <TableRow style={{height: 49 * emptyRows}}>
                                                <TableCell colSpan={6}/>
                                                test
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default SubCode;
