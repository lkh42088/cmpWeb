import React, {useEffect, useState, Fragment} from "react";
import {Card, CardBody, Col} from "reactstrap";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import {TableRow} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import {makeStyles} from "@material-ui/core/styles";

import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import {useSnackbar} from "notistack";
import {useDispatch, useSelector} from "react-redux";
import TableToolbarBackup from "./TableToolbarBackup";
import CommonTableHead from "../../../Common/CommonTableHead";
import {
    pagingChangeCurrentPage,
    pagingChangeCurrentPageNext,
    pagingChangeCurrentPagePrev, pagingChangeOrder, pagingChangeOrderBy, pagingChangeRowsPerPage, pagingChangeSelected,
    pagingChangeTotalCount, pagingDump,
} from "../../../../redux/actions/pagingActions";
import {
    deleteSnapshotList, getMcVmSnapshot, recoveryMcVm,
} from "../../../../lib/api/microCloud";
import {OPERATOR} from "../../../../lib/var/globalVariable";
//import SnapshotRecoveryModal from "./SnapshotRecoveryModal";

const headRows = [
    {
        id: 'idx',
        disablePadding: false,
        label: 'Index',
    },
    {
        id: 'date',
        disablePadding: false,
        label: 'Snapshot 날짜',
    },
    {
        id: 'current',
        disablePadding: false,
        label: '현재 Snapshot 위치',
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
        // width: '200px',
    },
    grid: {
        flexGrow: 1,
    },
    margin: {
        margin: theme.spacing(0),
    },
}));

const VmInfoTableBackup = () => {
    const classes = useStyles();
    const cellClassName = "cb-material-table__cell";
    const [checkboxColor, setCheckboxColor] = useState('');
    const [openCollapse, setOpenCollapse] = React.useState(false);
    const isSelected = false;

    const handleSelectAllClick = () => {
        console.log("handleSelectAllClick click");
    };


    const handleRequestSort = (event, property) => {
        console.log("handleRequestSort click");
    };

    return (
        <Card style={{
            height: "auto",
            /*height: "calc(50% -10%)",*/
        }}>
            <CardBody className="vm__card" style={{
                flex: "none",
                height: "650px",
            }}>
                <div className="vm__stats">
                    <div className="vm__stat">
                        <p className="vm__stat-mainTitle" style={{
                            textAlign: "left",
                        }}>Backup</p>
                    </div>
                </div>
                <TableToolbarBackup
                    numSelected={0}
                    handleDeleteSelected=""
                    handleRefresh=""
                    onRequestSort={handleRequestSort}
                    rows={headRows}
                    handleOpen=""
                    handleSubmitSearch=""
                    contents="계정"
                    count={0}
                    rowsPerPage={0}
                    page={0}
                    onChangePage=""
                    onChangeRowsPerPage=""
                    rowsPerPageOptions=""
                />
                <div className="cb-material-table__wrap">
                    <TableContainer>
                        <Table
                            className="cb-material-table"
                            size="small"
                        >
                            <CommonTableHead
                                classes={classes}
                                /*numSelected={[...selected].filter(el => el[1]).length}*/
                                order={0}
                                orderBy={0}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={0}
                                rows={headRows}
                            />
                            <TableBody>
                                <TableRow
                                    hover
                                    className={classes.rowCss}
                                    role="checkbox"
                                    aria-checked={false}
                                    tabIndex={-1}
                                    key={1}
                                    selected={false}
                                    onClick={() => setOpenCollapse(!openCollapse)}
                                    onMouseOver={() => {
                                        if (isSelected === false) {
                                            setCheckboxColor('#737883');
                                        }
                                    }}
                                    onFocus={() => {
                                        if (isSelected === false) {
                                            setCheckboxColor('#737883');
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        if (isSelected === false) {
                                            setCheckboxColor('#dddddd');
                                        }
                                    }}
                                >
                                    <TableCell
                                        className={cellClassName}
                                        padding="checkbox">
                                        <Checkbox checked={isSelected}
                                                  className="cb-material-table__checkbox"
                                                  style={{
                                                      color: `${checkboxColor}`,
                                                  }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        className={cellClassName}>
                                        2020.03.01-23h05m
                                    </TableCell>
                                    <TableCell
                                        className={cellClassName}>
                                        -
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </CardBody>
        </Card>
    );
};

export default VmInfoTableBackup;
