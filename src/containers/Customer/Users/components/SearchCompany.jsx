import React, {useEffect, useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import {Card, CardBody, Col} from "reactstrap";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import {useDispatch, useSelector} from "react-redux";
import {clearCompanySearch, getCompaniesByName} from "../../../../redux/actions/companiesActions";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
    list: {
        width: '90%',
        height: 300,
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
    },
}));

function renderRow(props) {
    const { index, style, data } = props;

    const {name} = data[index];
    console.log("randerRow: company ", name);
    return (
        <ListItem button style={style} key={index}>
            <ListItemText primary={`${name}`} />
        </ListItem>
    );
}

const SearchCompany = (props) => {
    /************************************************************************************
     * Variable
     ************************************************************************************/
    const classes = useStyles();
    const { open, handleClose, handleComplete } = props;
    const [cpName, setCpName] = useState("");
    const dispatch = useDispatch();
    const {
        searchMsg,
        searchMsgError,
    } = useSelector(({companiesRd}) => ({
       searchMsg: companiesRd.searchMsg,
       searchMsgError: companiesRd.searchMsgError,
    }));

    const variant = "filled";
    const fieldSize = "small";
    // const fieldSize = "medium";
    const buttonSize = "large";
    const formClassName = "cb-material-form";
    const labelClassName = "cb-material-form__label";
    const fieldClassName = "cb-material-form__field";

    const handleChange = ({value}) => {
        setCpName(value);
    };

    /************************************************************************************
     * Function
     ************************************************************************************/
    const handleSend = () => {
        console.log("handle send: ");
        dispatch(getCompaniesByName({cpName}));
    };

    /************************************************************************************
     * useEffect
     ************************************************************************************/
    useEffect(() => {
    }, []);

    useEffect(() => {
        console.log("searchMsg");
        if (searchMsg) {
           console.log("search Message: ", searchMsg, ", len ", searchMsg.length);
        }
    }, [searchMsg]);

    useEffect(() => {
        console.log("searchMsgError");
        if (searchMsgError) {
            console.log("search Message Error: ", searchMsgError);
        }
    }, [searchMsgError]);

    /************************************************************************************
     * JSX Template
     ************************************************************************************/
    console.log("SearchCompany...");
    return (
        <Dialog
            onClose={handleClose}
            open={open}
        >
            <Card>
                <CardBody>
                    <div className="card__title">
                        <h3 className="bold-text">고객사 검색</h3>
                    </div>
                    <form className={formClassName}>
                        <Grid container spacing={1}>
                            <Grid item xs={7}>
                                <TextField
                                // className={fieldClassName}
                                name="cpName"
                                value={cpName}
                                onChange={(e) => { handleChange({value: e.target.value}); }}
                                // label="이름"
                                variant={variant}
                                size={fieldSize}
                            />
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    className={classes.margin}
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSend}
                                    size={buttonSize}
                                    endIcon={<SearchIcon/>}
                                    style={{
                                        maxWidth: '100px',
                                        maxHeight: '45px',
                                        minWidth: '100px',
                                        minHeight: '45px',
                                        margin: '0px',
                                    }}
                                >
                                    검색
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <div className={classes.list}>
                                    <FixedSizeList
                                        height={300}
                                        itemSize={30}
                                        itemCount={searchMsg && searchMsg.length ? searchMsg.length : 0}
                                        itemData={searchMsg}
                                    >
                                        {renderRow}
                                    </FixedSizeList>
                                </div>
                            </Grid>
                        </Grid>
                    </form>
                </CardBody>
            </Card>
        </Dialog>
    );
};

export default SearchCompany;
