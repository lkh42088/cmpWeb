import React, {Fragment, useState, useEffect} from "react";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {lighten, makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import RefreshIcon from '@material-ui/icons/Refresh';
import Paper from "@material-ui/core/Paper";
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import TablePagination from '@material-ui/core/TablePagination';
import Grid from "@material-ui/core/Grid";
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 130,
    },
    paper: {
        margin: '0px 0px 0px 3px',
        padding: '0px 0px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        backgroundColor:
            theme.palette.type === 'light'
            ? '#f2f4f7' : '#424242',
        "&:hover":
            theme.palette.type === 'light'
                ? {
                    boxShadow: "4px 2px 2px #999999",
                    border: "1px solid #e0e0e0",
                    borderRight: "1px solid #e0e0e0",
                    backgroundColor: '#ffffff',
                }
                : {
                    boxShadow: "4px 2px 2px #000000",
                    border: "1px solid #000000",
                    borderRight: "1px solid #e0e0e0",
                    backgroundColor: '#424242',
                },
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

const searchConditions = [
    '아이디',
    '이름',
    '회사명',
];

const ITEM_HEIGHT = 48;

const TableFilterButton = (props) => {
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
        <Fragment>
            <Tooltip title="정렬목록" aria-label="sort">
                <IconButton
                    className="cb-material-table__tooltip-button"
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
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
        </Fragment>
    );
};

const VmTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const {
        rows, numSelected, handleDeleteSelected, onRequestSort,
        handleOpen, contents, handleRefresh, handleSubmitSearch,
        count, rowsPerPage, page, onChangePage, onChangeRowsPerPage, rowsPerPageOptions,
    } = props;
    const addComment = contents.concat(" 추가");
    const deleteComment = `선택한 ${contents} 삭제`;

    const [anchorMenu, setAnchorMenu] = React.useState(null);
    const openMenu = Boolean(anchorMenu);
    const [selectSearch, setSelectSearch] = useState("아이디");
    const [searchPlaceHolder, setSearchPlaceHolder] = useState("");
    const [searchContent, setSearchContent] = useState("");

    const handleClickMenu = (event) => {
        setAnchorMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorMenu(null);
    };

    const handleSelectItem = (item) => {
        setSelectSearch(item);
        setSearchPlaceHolder(`${item} 검색`);
        setSearchContent("");
        setAnchorMenu(null);
    };

    const handleChangeSearch = (e) => {
        console.log("handleChangeSearch: ", e.target.value);
        setSearchContent(e.target.value);
    };

    const convertSearchType = () => {
        switch (selectSearch) {
            case "이름":
                return "name";
            case "회사명":
                return "cpName";
            default:
                return "id";
        }
    };

    const handleClickSearchIcon = (e) => {
        if (searchContent.trim().length > 0) {
            handleSubmitSearch({
                searchType: convertSearchType(),
                searchContent,
            });
        } else {
            handleSubmitSearch(null);
        }
    };

    const handleDelete = () => {
        console.log("handleDelete...");
    };

    const handleChange = () => {
    };

    useEffect(() => {
        setSearchPlaceHolder(`${selectSearch} 검색`);
    }, []);

    return (
        <div>
            <Toolbar
                className={clsx(classes.root, { [classes.highlight]: numSelected > 0 })}
                style={{ paddingLeft: numSelected > 0 ? '16px' : '1px'}}
            >
                {numSelected > 0 ? (
                    <Fragment>
                        <Typography className={classes.selected} color="inherit" variant="subtitle1" component="div">
                            {numSelected} selected
                        </Typography>
                        <Tooltip title={`선택한 ${contents} 삭제`}>
                            <IconButton
                                aria-label="delete"
                                onClick={handleDeleteSelected}
                            >
                                <DeleteIcon color="secondary" />
                            </IconButton>
                        </Tooltip>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <Grid item md={3} zeroMinWidth>
                                <TableFilterButton rows={rows} onRequestSort={onRequestSort}/>
                                <Tooltip title="Refresh" aria-label="refresh">
                                    <IconButton
                                        type="button"
                                        onClick={handleRefresh}
                                    >
                                        <RefreshIcon/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={addComment} aria-label="add">
                                    <IconButton type="button" onClick={handleOpen}>
                                        <AddIcon/>
                                    </IconButton>
                                </Tooltip>
                                {/*<Tooltip title="더보기" aria-label="more">
                                    <IconButton type="button" onClick={handleOpen}>
                                        <MoreVertIcon/>
                                    </IconButton>
                                </Tooltip>*/}
                            </Grid>

                            <Grid item md={4} zeroMinWidth>
                                <Paper component="div" className={classes.paper}>
                                    <Tooltip title="검색조건" aria-label="searchCondition">
                                        <IconButton
                                            className={classes.iconButton}
                                            aria-label="menu"
                                            onClick={handleClickMenu}
                                        >
                                            <MenuIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        id="long-menu"
                                        anchorEl={anchorMenu}
                                        keepMounted
                                        open={openMenu}
                                        onClose={handleCloseMenu}
                                        PaperProps={{
                                            style: {
                                                maxHeight: ITEM_HEIGHT * 4.5,
                                                width: '20ch',
                                            },
                                        }}
                                     >
                                        {searchConditions.map(condition => (
                                            <MenuItem key={condition}
                                                      selected={condition === selectSearch}
                                                      onClick={() => handleSelectItem(condition)}>
                                                {condition}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                    <InputBase
                                        className={classes.input}
                                        placeholder={searchPlaceHolder}
                                        inputProps={{ 'aria-label': `search google maps` }}
                                        value={searchContent}
                                        onChange={handleChangeSearch}
                                    />
                                    <IconButton
                                        // type="submit"
                                        className={classes.iconButton}
                                        aria-label="search"
                                        onClick={handleClickSearchIcon}
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                    {/*<Divider className={classes.divider} orientation="vertical" />
                                    <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                                        <DirectionsIcon />A
                                    </IconButton>*/}
                                </Paper>
                            </Grid>
                            <Grid item md={5} zeroMinWidth>
                            <TablePagination
                                component="div"
                                className="material-table__pagination"
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
                                        res = `${count}개 중 ${page * rowsPerPage + 1}-${rowsPerPage * (page + 1)}`;
                                    } else {
                                        res = `${count}개 중 ${1}-${rowsPerPage}`;
                                    }
                                    return res;
                                }}
                            />
                            </Grid>
                        </Grid>
                    </Fragment>
                )}
            </Toolbar>
       </div>
    );
};

export default VmTableToolbar;
