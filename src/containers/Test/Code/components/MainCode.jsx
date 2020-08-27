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

// DeleteSweep
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";

import CommonTableHead from "../../../Common/CommonTableHead";

import {
    setMainSubCodeDisplayFlag, setMainSubCodeSelected,
    getCodesTag, getSubCodeByIdx,
    setEdMainCode,
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

const MainCode = () => {
    const emptyRows = 0;
    //const selected = new Map([]);
    const page = 0;
    const rowsPerPage = 5;
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('type');
    const [selected, setSelected] = useState(new Map([]));
    const [modifyData, setModifyData] = React.useState(null);

    const classes = useStyles();
    const dispatch = useDispatch();
    const {
        mainSubCodeDisplayFlag, mainCodeTag,
        menuSelected, mainTabSelected,
        mainCode,
    } = useSelector(({codeRd}) => ({
        mainSubCodeDisplayFlag: codeRd.mainSubCodeDisplayFlag,
        mainCodeTag: codeRd.mainCodeTag,
        menuSelected: codeRd.menuSelected,
        mainTabSelected: codeRd.mainTabSelected,
        mainCode: codeRd.mainCode,
    }));

    const [tableRow, setTableRow] = useState([
        /*{
            id: 'type',
            disablePadding: true,
            label: '분류',
        },*/
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
    ]);

    const handleSubCodeTableDisplay = (event, id) => {
        dispatch(setMainSubCodeDisplayFlag(true));
        dispatch(setMainSubCodeSelected(id));
        dispatch(getSubCodeByIdx({
            type: mainTabSelected,
            subType: menuSelected,
            idx: id,
        }));
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
            mainCode.map(n => newSelected.set(n.codeId, true));
        } else {
            mainCode.map(n => newSelected.set(n.codeId, false));
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

    const handleToggleEd = (d) => {
        console.log("toggle ed : ", d);
        dispatch(setEdMainCode(d));
    };

    const getSelected = id => !!selected.get(id);

    const classNameMap = {
        tableCell: "material-table__cell",
        tableCellRight: "material-table__cell-right",
        formInforLabel: "form-infor__label",
        formControlValue: "form-control-value",
        textareaPreCont: "textarea-prefix form-control",
    };

    useEffect(() => {
        if (menuSelected === 'idc_cd' || menuSelected === 'manufacture_cd') {
            if (tableRow.length === 2) {
                const cpmenu = {
                    id: 'btn',
                    disablePadding: true,
                    label: '',
                };

                setTableRow(tableRow.concat(cpmenu));
            }
        } else {
            setTableRow(tableRow.filter(d => d.id !== 'btn'));
        }
    }, [menuSelected]);

    return (
        <Container>
            {/*<Row>
                <Col md={12}>
                    <div style={{
                        float: "right",
                    }}>
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
                              label="12"/>
                    </div>
                </Col>
            </Row>*/}
            <Row>
                <div className="material-table__wrap" style={{
                    width: "100%",
                }}>
                    <Table className="material-table" size="small">
                        <CommonTableHead
                            classes={classes}
                            numSelected={[...selected].filter(el => el[1]).length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={mainCode && mainCode.length ? mainCode.length : 0}
                            rows={tableRow}
                            checkboxFlag={mainSubCodeDisplayFlag}
                        />
                        <TableBody>
                            {mainCode
                                .sort(getSorting(order, orderBy))
                                /*.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)*/
                                .map((d) => {
                                    const isSelected = getSelected(d.codeId);
                                    return (
                                        <TableRow
                                            key={`${d.codeId}${d.name}`}
                                            className="material-table__row"
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            /*onClick={event => handleClick(event, d.idx)}*/
                                            tabIndex={-1}
                                            selected={isSelected}
                                        >
                                            <TableCell
                                                className={classNameMap.tableCell}
                                                padding="checkbox"
                                                style={mainSubCodeDisplayFlag ? {display: "none"} : {}}
                                            >
                                                <Checkbox
                                                    checked={isSelected}
                                                    onClick={event => handleClick(event, d.codeId)}
                                                    className="material-table__checkbox"/>
                                            </TableCell>
                                            {/*<TableCell
                                                style={{
                                                    textAlign: "center",
                                                }}
                                                className={`${classNameMap.tableCell}${classNameMap.tableCellRight}`}>
                                                {d.type}
                                            </TableCell>*/}
                                            <TableCell
                                                className={`${classNameMap.tableCell}${classNameMap.tableCellRight}`}>
                                                <b className="text_cor_green mouse_over_list">
                                                    <div className="assets_add_modal_div"
                                                         onClick={event => handleToggleEd(d)}
                                                         onKeyDown={event => handleToggleEd(d)}
                                                         role="button" tabIndex="0"><span
                                                        className="circle__ste"/>{d.name}</div>
                                                </b>
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    textAlign: "center",
                                                }}
                                                className={`${classNameMap.tableCell}${classNameMap.tableCellRight}`}
                                            >{d.order}
                                            </TableCell>
                                            <TableCell
                                                className={`${classNameMap.tableCell}${classNameMap.tableCellRight}`}
                                                style={menuSelected === 'idc_cd' || menuSelected === 'manufacture_cd'
                                                    ? {} : {display: "none"}}
                                            >
                                                <IconButton type="button"
                                                            style={{
                                                                padding: "0px",
                                                                color: "#87dfd6",
                                                            }}
                                                            onClick={event => handleSubCodeTableDisplay(event, d.codeId)}
                                                            data-tip data-for="tooltipSubCode">
                                                    <PostAddIcon/>
                                                </IconButton>
                                                <ReactTooltip id="tooltipSubCode" effect="float"
                                                              delayHide={100} type="dark" place="bottom">
                                                    서브코드 확인
                                                </ReactTooltip>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {mainCode.length === 0 && (
                                <TableRow style={{height: 49 * emptyRows}}>
                                    <TableCell colSpan={4} style={{
                                        textAlign: "center",
                                    }}>
                                        데이터가 없습니다.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Row>
        </Container>
    );
};

export default MainCode;
