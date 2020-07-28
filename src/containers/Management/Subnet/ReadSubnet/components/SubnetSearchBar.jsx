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
import Container from "@material-ui/core/Container";
import {useDispatch, useSelector} from "react-redux";

const useStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight: {
        color: theme.palette.type === 'light'
            ? theme.palette.secondary.main
            : theme.palette.text.primary,
        backgroundColor: theme.palette.type === 'light'
            ? lighten(theme.palette.secondary.light, 0.85)
            : theme.palette.secondary.dark,
    },
    title: {
        color: theme.palette.type === 'light' ? "#646777" : "#DDDDDD",
        flex: '1 1 100%',
        fontSize: 18,
    },
    selected: {
        flex: '1 1 100%',
        fontSize: 15,
        fontFamily: 'Noto Sans KR R',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.25),
        },
        marginLeft: 0,
        width: "50%",
        [theme.breakpoints.up('sm')]: {
            width: "50%",
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
    span: {
        color: theme.palette.type === 'light' ? "#646777" : "#DDDDDD",
        padding: theme.spacing(1, 2),
        height: 'auto',
        display: 'flex',
        justifyContent: 'left',
    },
    inputRoot: {
        color: theme.palette.type === 'light' ? 'inherit' : '#AAAAAA',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: "width 0.5s 0s",
        width: "50%",
        [theme.breakpoints.up('sm')]: {
            width: "12ch",
            '&:focus-within': {
                width: "20ch",
            },
        },
    },
    paper: {
        width: '85ch',
        color: 'inherit',
        backgroundColor: theme.palette.type === 'light' ? "#f2f4f7" : "#33333a",
    },
}));

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
