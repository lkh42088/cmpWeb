import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {fade, lighten, makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import RefreshIcon from '@material-ui/icons/Refresh';
import Pagination from "@material-ui/lab/Pagination";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {useDispatch, useSelector} from "react-redux";
import ReactTooltip from "react-tooltip";
import {Button} from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import {
    pagingChangeCurrentPage,
    pagingChangeDense,
    pagingChangeRowsPerPage,
} from "../../../../../redux/actions/pagingActions";
import SubnetSearchBar from "./SubnetSearchBar";
import BootstrapInput from "../../../../Common/BootstrapInput";
import CommonTableExportCSV from "../../../../Common/CommonTableExportCSV";
import CustomSlider from "./CustomSlider";

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                opacity: 0.5,
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
                opacity: 0.5,
            },
    title:
        theme.palette.type === 'light'
            ? {
                flex: '1 1 100%',
                color: '#646777',
                fontSize: 18,
                //fontFamily: "Nanum BarunGothic",
                fontFamily: 'Noto Sans KR R',
            }
            : {
                flex: '1 1 100%',
                color: '#dddddd',
                fontSize: 18,
                //fontFamily: "Nanum BarunGothic",
                fontFamily: 'Noto Sans KR R',
            },
    selected: {
        flex: '1 1 100%',
        fontSize: 15,
        //fontFamily: "Nanum BarunGothic Bold",
        fontFamily: 'Noto Sans KR R',
    },
    margin: {
        margin: theme.spacing(1),
        width: 70,
        display: "flex",
    },
    pagination: {
        display: "inline-block",
        paddingTop: 20,
        paddingBottom: 20,
    },
    tooltip: {
        fontSize: 7,
        fontWeight: "revert",
    },
    grid: {
        gridTemplateColumns: "155 1fr 1fr 350 30",
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        fontSize: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '50%',
            '&:focus': {
                width: '100%',
            },
        },
    },
}));

const TableFilterButton = (props) => {
    const classes = useToolbarStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const { rows, onRequestSort } = props;


    const handleClick = (event) => {
        console.log("TableFilterButton: handleClick");
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        console.log("TableFilterButton: handleClose");
        setAnchorEl(null);
    };

    const handleSort = property => (event) => {
        console.log("TableFilterButton: handleSort");
        onRequestSort(event, property);
    };

    return (
        <>
            <IconButton
                className="cb-material-table__tooltip-button"
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                onClick={handleClick}
                data-tip data-for="tooltipSort"
            >
                <FilterListIcon />
            </IconButton>
            <ReactTooltip id="tooltipSort" effect="float"
                          delayHide={100} type="dark"
                          place="bottom"
                          className={classes.tooltip}
            >
                정렬 목록
            </ReactTooltip>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className="cb-material-table__filter-menu"
            >
                {
                    rows.map(row => (
                        <MenuItem
                            onClick={handleSort(row.id)}
                            className="cb-material-table__filter-menu-item"
                            key={row.id}
                        >
                            {row.label}
                        </MenuItem>
                    ))
                }
            </Menu>
        </>
    );
};

const SubnetTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const dispatch = useDispatch();
    const {
        rows, numSelected, handleDeleteSelected, onRequestSort,
        handleOpen, contents, handleRefresh, handleSubmitSearch,
        count, rowsPerPage, page, onChangePage, onChangeRowsPerPage,
        rowsPerPageOptions, setTableHeight, data,
    } = props;
    const addComment = contents.concat(" 추가");
    const deleteComment = `선택한 ${contents} 삭제`;

    // /** Pagination */
    // const handleChangePage = (event, newPage) => {
    //     console.log("change page: ", newPage);
    //     dispatch(pagingChangeCurrentPage({currentPage: newPage}));
    // };

    // /** Pagination */
    // const handleChangeRowsPerPage = (e) => {
    //     const changeRows = Number(e.target.value);
    //     dispatch(pagingChangeRowsPerPage({rowsPerPage: changeRows}));
    // };
    //
    // /** Pagination */
    // const handleChangeDense = (event) => {
    //     dispatch(pagingChangeDense({checked: event.target.checked}));
    // };
    // const handleDelete = () => {
    //     console.log("handleDelete...");
    // };

    const handleSliderChange = (e, val) => {
        setTableHeight((val * 20));
    };

    /** COMPONENT */
    const paginationBar = (
        <TablePagination
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
            labelRowsPerPage="개수"
            labelDisplayedRows={() => {
                let res = "";
                if (page > 0) {
                    res = `총 ${count} 개 중 ${page * rowsPerPage + 1} ~ ${rowsPerPage * (page + 1)}`;
                } else {
                    res = `총 ${count} 개 중 ${1} ~ ${rowsPerPage}`;
                }
                return res;
            }}
        />
    );
    
    return (
        <div>
            <Toolbar
                className={clsx(classes.root, { [classes.highlight]: numSelected > 0 })}
                variant="dense"
            >
                {numSelected > 0 ? (
                    <>
                        <Typography className={classes.selected} color="inherit" variant="subtitle1" component="div">
                            {numSelected} selected
                        </Typography>
                        <Tooltip title="선택한 계정 삭제">
                            <IconButton
                                aria-label="delete"
                                onClick={handleDeleteSelected}
                            >
                                <DeleteIcon color="secondary" />
                            </IconButton>
                        </Tooltip>
                    </>
                ) : (
                    <>
                        {
                        /*********************************************************************
                         * Table Search bar
                         **********************************************************************/}
                        <Grid container
                              alignItems="center"
                              wrap="nowrap"
                              // style={{maxHeight: 72}}
                              direction="row"
                              justify="space-between"
                              className={classes.grid}
                        >
                            <Grid item md={2} zeroMinWidth>
                                <div>
                                    <IconButton type="button" onClick={handleOpen}
                                                data-tip data-for="tooltipAdd">
                                        <AddIcon/>
                                    </IconButton>
                                    <ReactTooltip id="tooltipAdd" effect="float"
                                                  delayHide={100} type="dark" place="bottom"
                                                  className={classes.tooltip}>
                                        서브넷 추가
                                    </ReactTooltip>
                                    <IconButton
                                        type="button"
                                        onClick={handleRefresh}
                                        data-tip data-for="tooltipRefresh"
                                    >
                                        <RefreshIcon/>
                                    </IconButton>
                                    <CommonTableExportCSV csvData={data} fileName="subnet_test.csv" />
                                    <ReactTooltip id="tooltipRefresh" effect="float"
                                                  delayHide={100} type="dark" place="bottom"
                                                  className={classes.tooltip}>
                                        TABLE RELOAD
                                    </ReactTooltip>
                                    {numSelected > 0 ? (
                                        <Tooltip title={deleteComment} aria-label="delete">
                                            <IconButton
                                                type="button"
                                                onClick={handleDeleteSelected}
                                            >
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    ) : (
                                        <TableFilterButton rows={rows} onRequestSort={onRequestSort}/>
                                    )}
                                    {/*Export CSV*/}
                                </div>
                            </Grid>
                            <Grid item xs md={4} zeroMinWidth>
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        placeholder="Search…"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </div>
                                {/*<div style={{overflow: "hidden"}}>*/}
                                {/*    <SubnetSearchBar*/}
                                {/*        handleSubmit={handleSubmitSearch}*/}
                                {/*    />*/}
                                {/*</div>*/}
                            </Grid>
                            <Grid item md={1} zeroMinWidth/>
                            <Grid item md={1} zeroMinWidth>
                                <CustomSlider
                                    onChange={handleSliderChange}
                                    valueLabelDisplay="auto"
                                    aria-label="테이블 높이"
                                    step="10"
                                    defaultValue="30"
                                    valueLabelFormat={val => (val * 20)}
                                />
                            </Grid>
                            <Grid item md={5} zeroMinWidth>
                                <div style={{
                                    display: "flex", alignItems: "center", float: "right", minWidth: 350,
                                }}>
                                    {/*Pagination*/}
                                    <div style={{paddingRight: 10}}>
                                        {paginationBar}
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Toolbar>
       </div>
    );
};

export default SubnetTableToolbar;
