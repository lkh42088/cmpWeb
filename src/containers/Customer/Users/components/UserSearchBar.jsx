import React, {Fragment, useState} from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {fade, makeStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        // borderRadius: theme.shape.borderRadius,
        borderRadius: '25px',
        // backgroundColor: fade(theme.palette.common.black, 0.15),
        '&:hover': {
            border: '0.1px solid #E0E0E0',
            // backgroundColor: fade(theme.palette.common.white, 0.25),
        },
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
    inputRoot:
        theme.palette.type === 'light'
            ? {
                color: 'inherit',
                fontSize: "10px",
            }
            : {
                color: '#AAAAAA',
                fontSize: "10px",
            },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '10ch',
            '&:focus': {
                width: '20ch',
            },
        },
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
    console.log("SearchBar...");
    return (
        <div className={classes.root}>

            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    ref={anchorRef}
                    placeholder="아이디 검색"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    endAdornment={(
                        <InputAdornment position="end" >
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
            </div>
        </div>
    );
};

export default UserSearchBar;
