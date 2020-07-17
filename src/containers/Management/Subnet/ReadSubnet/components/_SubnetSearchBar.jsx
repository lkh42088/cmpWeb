import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import {Button, TextField} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import {fade, lighten, makeStyles} from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import withStyles from "@material-ui/core/styles/withStyles";
import Portal from "@material-ui/core/Portal";
import Container from "@material-ui/core/Container";
import Switch from "@material-ui/core/Switch";
import Pagination from "@material-ui/lab/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {AutoComplete, SelectField} from "material-ui";
import {
    pagingChangeCurrentPage,
    pagingChangeDense,
    pagingChangeRowsPerPage,
} from "../../../../../redux/actions/pagingActions";
import BootstrapInput from "../../../../Common/BootstrapInput";

const useStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                // backgroundColor: "transparent",
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
                // backgroundColor: "transparent",
            },
    title:
        theme.palette.type === 'light'
            ? {
                flex: '1 1 100%',
                color: '#646777',
                fontSize: 18,
                fontFamily: "Nanum BarunGothic",
            }
            : {
                flex: '1 1 100%',
                color: '#dddddd',
                fontSize: 18,
                fontFamily: "Nanum BarunGothic",
            },
    selected: {
        flex: '1 1 100%',
        fontSize: 15,
        fontFamily: "Nanum BarunGothic Bold",
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
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
    span:
        theme.palette.type === 'light'
            ? {
                color: '#646777',
                padding: theme.spacing(1, 2),
                height: 'auto',
                display: 'flex',
                justifyContent: 'left',
            }
            : {
                color: '#dddddd',
                padding: theme.spacing(1, 2),
                height: 'auto',
                display: 'flex',
                justifyContent: 'left',
            },
    inputRoot:
        theme.palette.type === 'light'
            ? {
                color: 'inherit',
            }
            : {
                color: '#AAAAAA',
            },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '50ch',
            // '&:focus': {
            //     width: '40ch',
            // },
        },
    },
    paper:
        theme.palette.type === 'light'
            ? {
                width: '85ch',
                color: 'inherit',
                backgroundColor: "#f2f4f7",
            }
            : {
                width: '85ch',
                color: 'inherit',
                backgroundColor: "#33333a",
            },
}));

// 권한 레벨 INPUT
// const BootstrapInput = withStyles(theme => ({
//     input: {
//         borderRadius: 4,
//         position: 'relative',
//         backgroundColor: theme.palette.background.paper,
//         border: '1px solid #ced4da',
//         fontSize: 12,
//         padding: '5px 26px 10px 12px',
//         transition: theme.transitions.create(['border-color', 'box-shadow']),
//         '&:focus': {
//             borderRadius: 4,
//             borderColor: '#80bdff',
//             boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
//         },
//     },
// }))(InputBase);

// 권한 레벨 Menu
const ITEM_HEIGHT = 36;
const ITEM_PADDING_TOP = 8;
const authLevelList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const MenuProps = {
    disablePortal: true,
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 100,
        },
    },
};

const SubnetSearchBar = (props) => {
    /************************************************************************************
     * Variable
     ************************************************************************************/
    const classes = useStyles();
    const dispatch = useDispatch();
    const { handleSubmit } = props;

    const [openSearch, setOpenSearch] = React.useState(false);
    const anchorRef = React.useRef(null);

    const [fields, setFields] = useState({
        userId: "",
        username: "",
        email: "",
        cpName: "",
        level: 0,
    });

    /************************************************************************************
     * Function
     ************************************************************************************/
    const handleChangeField = (e) => {
        const {name, value} = e.target;
        setFields({
            ...fields,
            [name]: value,
        });
    };

    const handleToggle = () => {
        setOpenSearch(prevOpen => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpenSearch(false);
    };

    const handleSubmitInternal = () => {
        console.log("handleSubmitInternal() fields ", fields);
        handleSubmit(fields);
    };

    const handleCheckEmail = () => {
        console.log("handleCheckEmail");
    };

    const handleCheckGroupEmail = () => {
        console.log("handleCheckGroupEmail");
    };

    /************************************************************************************
     * useEffect
     ************************************************************************************/
    const prevOpen = React.useRef(openSearch);
    React.useEffect(() => {
        if (prevOpen.current === true && openSearch === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = openSearch;
    }, [openSearch]);

    /************************************************************************************
     * JSX Template
     ************************************************************************************/


    const variant = "standard";
    const fieldSize = "small";
    const buttonSize = "small";

    console.log("SearchBar...");
    return (
        <Container>
            <Grid container spacing={2} >
                <Grid item>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            ref={anchorRef}
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            endAdornment={(
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                        aria-controls={openSearch ? 'menu-list-grow' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleToggle}
                                    >
                                        <ArrowDropDownIcon/>
                                    </IconButton>
                                </InputAdornment>
                            )}
                        />
                        <Popper
                            open={openSearch}
                            anchorEl={anchorRef.current}
                            role={undefined}
                            transition
                            style={{position: "relative", zIndex: 1100}}
                        >
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                >
                                    <Paper
                                        className={classes.paper}
                                    >
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <div style={{
                                                margin: '5px',
                                                padding: '5px',
                                            }}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={2} spacing={1}>
                                                        <span className={classes.span}>서브넷 태그</span>
                                                    </Grid>
                                                    <Grid item xs={9} spacing={1}>
                                                        <TextField
                                                            variant={variant}
                                                            size={fieldSize}
                                                            name="userId"
                                                            onChange={(e) => { handleChangeField(e); }}
                                                            fullWidth />
                                                    </Grid>
                                                    <Grid item xs={1} />
                                                    <Grid item xs={2} spacing={1}>
                                                        <span className={classes.span}>서브넷 주소</span>
                                                    </Grid>
                                                    <Grid item xs={9} spacing={1}>
                                                        <TextField
                                                            variant={variant}
                                                            size={fieldSize}
                                                            name="username"
                                                            onChange={(e) => { handleChangeField(e); }}
                                                            fullWidth />
                                                    </Grid>
                                                    <Grid item xs={1} />
                                                    <Grid item xs={2} spacing={1}>
                                                        <span className={classes.span}>게이트 웨이</span>
                                                    </Grid>
                                                    <Grid item xs={9} spacing={1}>
                                                        <TextField
                                                            variant={variant}
                                                            size={fieldSize}
                                                            name="email"
                                                            onChange={(e) => { handleChangeField(e); }}
                                                            fullWidth />
                                                    </Grid>
                                                    <Grid item xs={1} />
                                                    {/*<Grid item xs={2} spacing={1}>*/}
                                                    {/*    <span className={classes.span}>회사명</span>*/}
                                                    {/*</Grid>*/}
                                                    {/*<Grid item xs={4} spacing={1}>*/}
                                                    {/*    <TextField*/}
                                                    {/*        variant={variant}*/}
                                                    {/*        size={fieldSize}*/}
                                                    {/*        fullWidth />*/}
                                                    {/*</Grid>*/}
                                                    {/*<Grid item xs={2} spacing={1}>*/}
                                                    {/*    <span className={classes.span}>권한</span>*/}
                                                    {/*</Grid>*/}
                                                    {/*<Grid item xs={3} spacing={1}>*/}
                                                    {/*    <FormControl>*/}
                                                    {/*        <Select*/}
                                                    {/*            name="level"*/}
                                                    {/*            value={fields.level}*/}
                                                    {/*            onChange={(e) => { handleChangeField(e); }}*/}
                                                    {/*            input={<BootstrapInput />}*/}
                                                    {/*            MenuProps={MenuProps}*/}
                                                    {/*            autoWidth*/}
                                                    {/*        >*/}
                                                    {/*            <MenuItem alignItems="center" value={0}>선택</MenuItem>*/}
                                                    {/*            {*/}
                                                    {/*                authLevelList.map(value => (*/}
                                                    {/*                    <MenuItem alignItems="center" value={value}>{value}</MenuItem>*/}
                                                    {/*                ))*/}
                                                    {/*            }*/}
                                                    {/*        </Select>*/}
                                                    {/*    </FormControl>*/}
                                                    {/*</Grid>*/}
                                                    {/*<Grid item spacing={1}>*/}
                                                    {/*        <span className={classes.span}>*/}
                                                    {/*            <FormControlLabel*/}
                                                    {/*                control={<Checkbox onChange={handleCheckEmail} name="email" color="primary" />}*/}
                                                    {/*                label="이메일 인증"*/}
                                                    {/*            />*/}
                                                    {/*            <FormControlLabel*/}
                                                    {/*                control={<Checkbox onChange={handleCheckGroupEmail} name="groupEmail" color="primary" />}*/}
                                                    {/*                label="그룹 이메일 인증"*/}
                                                    {/*                aria-setsize="5"*/}
                                                    {/*            />*/}
                                                    {/*        </span>*/}
                                                    {/*</Grid>*/}
                                                    <Grid item xs={12} spacing={1}>
                                                        <div style={{
                                                            float: 'right',
                                                            padding: "10",
                                                        }}>
                                                            <Button
                                                                className={classes.margin}
                                                                variant="contained"
                                                                color="primary"
                                                                size={buttonSize}
                                                                onClick={handleSubmitInternal}
                                                            >
                                                                검색
                                                            </Button>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SubnetSearchBar;
