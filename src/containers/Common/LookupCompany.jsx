import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import {Card, CardBody} from "reactstrap";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import {FixedSizeList} from "react-window";
import {getCompaniesByName} from "../../lib/api/company";

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
        // height: 300,
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
    },
}));

function renderRow(props) {
    const { index, style, data } = props;
    const {idx, name} = data.cpList[index];
    return (
        <ListItem button style={style} key={index} onClick={() => { data.handleSelect(idx, name); }}>
            <ListItemText primary={`${name}`} />
        </ListItem>
    );
}

const LookupCompany = (props) => {
    /************************************************************************************
     * Props
     ************************************************************************************/
    const { open, handleClose, handleComplete } = props;

    /************************************************************************************
     * Variable
     ************************************************************************************/
    const classes = useStyles();
    const [cpName, setCpName] = useState("");
    const [listHeight, setListHeight] = useState(10);

    const [searchMsg, setSearchMsg] = useState([]);

    /************************************************************************************
     * Function
     ************************************************************************************/
    const getCompanyByCpName = async () => {
        // console.log("getCompanyByCpName() ");
        try {
            const response = await getCompaniesByName({cpName});
            setSearchMsg(response.data);
            // console.log("getCompanyByCpName() data ", response.data);
            if (response.data.length < 1) {
                setListHeight(10);
            } else if (response.data.length < 10) {
                setListHeight(30 * response.data.length);
            } else {
                setListHeight(300);
            }
        } catch (error) {
            setSearchMsg([]);
        }
    };

    const handleChange = (value) => {
        setCpName(value);
    };

    const handleSend = () => {
        getCompanyByCpName();
    };

    const handleSelect = (idx, name) => {
        handleComplete(idx, name);
        handleClose();
    };

    /************************************************************************************
     * JSX Template
     ************************************************************************************/
    const variant = "filled";
    const fieldSize = "small";
    // const fieldSize = "medium";
    const buttonSize = "large";
    const formClassName = "cb-material-form";
    const labelClassName = "cb-material-form__label";
    const fieldClassName = "cb-material-form__field";
    // console.log("LookupCompany...");
    return (
        <Dialog
            open={open}
        >
            <Card>
                <CardBody>
                    <div className="card__title">
                        <Grid container justify="space-between" spacing={1}>
                            <Grid item>
                                <h3 className="bold-text">고객사 검색</h3>
                            </Grid>
                            <Grid item>
                                <IconButton
                                    onClick={handleClose}
                                    edge="end"
                                    style={{
                                        margin: "0px",
                                        padding: "0px",
                                    }}
                                >
                                    <CloseIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        <Grid container spacing={1}>
                            <Grid item xs={7}>
                                <TextField
                                    // className={fieldClassName}
                                    name="cpName"
                                    value={cpName}
                                    onChange={(e) => { handleChange(e.target.value); }}
                                    // label="이름"
                                    variant={variant}
                                    size={fieldSize}
                                    onKeyDown={(event) => {
                                        // console.log("key: ", event.keyCode);
                                        if (event.keyCode === 13) {
                                            handleSend();
                                        }
                                    }}
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
                                <div className={classes.list} >
                                    <FixedSizeList
                                        height={listHeight}
                                        itemSize={30}
                                        itemCount={searchMsg && searchMsg.length ? searchMsg.length : 0}
                                        itemData={{ cpList: searchMsg, handleSelect}}
                                    >
                                        {renderRow}
                                    </FixedSizeList>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </CardBody>
            </Card>
        </Dialog>
    );
};

export default LookupCompany;
