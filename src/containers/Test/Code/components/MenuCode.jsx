import React, {useEffect, useState, Fragment} from 'react';
import {
    Card, Col, CardBody, Container, Row,
} from 'reactstrap';

import {useDispatch, useSelector} from "react-redux";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";

import {
    setMainSubCodeDisplayFlag,
    setMenuSelected,
    getCodesTag, getMainCodeByType,
} from "../../../../redux/actions/codeActions";

const MenuCode = () => {
    const emptyRows = 0;
    const order = 'asc';
    const orderBy = 'calories';
    const selected = new Map([]);
    const page = 0;
    const rowsPerPage = 5;

    const dispatch = useDispatch();

    const [menu, setMenu] = useState([
        {
            idx: 'idc_cd',
            name: 'IDC',
            selected: true,
        }, {
            idx: 'spla_cd',
            name: 'SPLA',
            selected: false,
        }, {
            idx: 'device_type_cd',
            name: '장비구분',
            selected: false,
        }, {
            idx: 'size_cd',
            name: '장비크기',
            selected: false,
        }, {
            idx: 'manufacture_cd',
            name: '제조사',
            selected: false,
        },
    ]);

    const handleClick = (e, item) => {
        setMenu(
            menu.map(d => (d.idx === item.idx ? {
                ...d,
                selected: true,
            } : {
                ...d,
                selected: false,
            })),
        );
        //dispatch(getCodesTag());
        dispatch(setMenuSelected(item.idx));
        dispatch(setMainSubCodeDisplayFlag(false));
        /*dispatch(getMainCodeByType({
            type: 'total',
            subType: item.idx,
        }));*/
        // ed default
    };

    return (
        <Container>
            {/*<Row>
                <Col md={12}>
                    <h3 className="page-title">코드관리</h3>
                    <h3 className="page-subhead subhead">
                        &nbsp;코드관리
                    </h3>
                </Col>
            </Row>*/}
            <Row style={{
                marginTop: "48px",
            }}>
                <Col md={12} lg={12} xl={12}>
                    <Card>
                        <CardBody>
                            <div className="material-table__wrap">
                                <Table className="material-table">
                                    <TableBody>
                                        {menu
                                            /*.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)*/
                                            .map(d => (
                                                <TableRow
                                                    className="material-table__row"
                                                    role="checkbox"
                                                    onClick={event => handleClick(event, d)}
                                                    tabIndex={-1}
                                                    key={d.idx}
                                                    name="selected"
                                                >
                                                    <TableCell
                                                        className="material-table__cell material-table__cell-right"
                                                        component="th"
                                                        scope="row"
                                                        /*padding="none"*/
                                                        style={d.selected ? {
                                                            color: "#e4f9ff",
                                                            background: "#12cad6",
                                                        } : {color: "gray"}}
                                                    >
                                                        {d.name}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        {emptyRows > 0 && (
                                            <TableRow style={{height: 49 * emptyRows}}>
                                                <TableCell colSpan={6}/>
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

export default MenuCode;
