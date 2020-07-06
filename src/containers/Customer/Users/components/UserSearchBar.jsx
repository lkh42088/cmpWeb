import React, {Fragment, useState} from "react";
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
    span: {
        padding: theme.spacing(1, 2),
        height: 'auto',
        display: 'flex',
        justifyContent: 'left',
    },
    inputRoot: {
        color: 'inherit',
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
    paper: {
        width: '60ch',
        color: 'inherit',
        backgroundClip: theme.palette.common.white,
    },
}));

const UserSearchBar = (props) => {
    /************************************************************************************
     * Variable
     ************************************************************************************/
    const classes = useStyles();
    const { handleSubmit } = props;

    const [openSearch, setOpenSearch] = React.useState(false);
    const anchorRef = React.useRef(null);

    const [fields, setFields] = useState({
        userId: "",
        username: "",
        email: "",
        cpName: "",
        level: "",
    });

    /************************************************************************************
     * Function
     ************************************************************************************/
    const handleChangeField = (name, value) => {
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
        <Fragment>
            <Grid
                container
                justify="space-between"
                spacing={2}
            >
                <Grid item container xs={12} alignItems="flex-end" direction="column">
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
                                // disablePortal
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
                                                        <Grid item xs={3} spacing={1}>
                                                            <span className={classes.span}>아이디</span>
                                                        </Grid>
                                                        <Grid item xs={9} spacing={1}>
                                                            <TextField
                                                                variant={variant}
                                                                size={fieldSize}
                                                                name="userId"
                                                                onChange={(e) => { handleChangeField("userId", e.target.value); }}
                                                                fullWidth />
                                                        </Grid>
                                                        <Grid item xs={3} spacing={1}>
                                                            <span className={classes.span}>이름</span>
                                                        </Grid>
                                                        <Grid item xs={9} spacing={1}>
                                                            <TextField
                                                                variant={variant}
                                                                size={fieldSize}
                                                                name="username"
                                                                onChange={(e) => { handleChangeField("username", e.target.value); }}
                                                                fullWidth />
                                                        </Grid>
                                                        <Grid item xs={3} spacing={1}>
                                                            <span className={classes.span}>이메일</span>
                                                        </Grid>
                                                        <Grid item xs={9} spacing={1}>
                                                            <TextField
                                                                variant={variant}
                                                                size={fieldSize}
                                                                name="email"
                                                                onChange={(e) => { handleChangeField("email", e.target.value); }}
                                                                fullWidth />
                                                        </Grid>
                                                        <Grid item xs={3} spacing={1}>
                                                            <span className={classes.span}>회사명</span>
                                                        </Grid>
                                                        <Grid item xs={9} spacing={1}>
                                                            <TextField
                                                                variant={variant}
                                                                size={fieldSize}
                                                                fullWidth />
                                                        </Grid>
                                                        <Grid item xs={3} spacing={1}>
                                                            <span className={classes.span}>권한</span>
                                                        </Grid>
                                                        <Grid item xs={9} spacing={1}>
                                                            <TextField
                                                                variant={variant}
                                                                size={fieldSize}
                                                                name="level"
                                                                onChange={(e) => { handleChangeField("level", e.target.value); }}
                                                                fullWidth />
                                                        </Grid>
                                                        <Grid item xs={12} spacing={1}>
                                                            <div style={{
                                                                float: 'right',
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
            </Grid>
        </Fragment>
    );
};

export default UserSearchBar;
