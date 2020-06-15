import 'date-fns';
import React, {Fragment, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Fade from "@material-ui/core/Fade";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {Button} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25em',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    textField: {
        fontSize: '1em',
        fontFamily: 'Nanum Brush',
    },
}));

const AddCompany = (props) => {
    const classes = useStyles();
    const {open} = props;
    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));
    const [companyAttr, setCompanyAttr] = useState("");

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleChangeCompanyAttr = (event) => {
        setCompanyAttr(event.target.value);
    };

    console.log("AddCompany");

    return (
        <Fragment>
            <Fade in={open}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">고객사 정보 등록</h2>
                    <p id="transition-modal-description">react-spring animates me.</p>
                    <form className={classes.form} noValidate autoComplete="off">
                        <div>
                            {/*<FormControl variant="outlined" className={classes.formControl}>*/}
                            <FormControl variant="outlined">
                                <InputLabel id="demo-simple-select-outlined-label">회사여부</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={companyAttr}
                                    onChange={handleChangeCompanyAttr}
                                    label="회사여부"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>회사</MenuItem>
                                    <MenuItem value={2}>개인</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <TextField className={classes.textField} id="company-name" label="고객사 이름" variant="outlined"/>
                        </div>
                        <div>
                            <TextField label="고객사 주소" variant="outlined"/>
                        </div>
                        <div>
                            <TextField label="전화번호" variant="outlined"/>
                        </div>
                        <div>
                            <TextField label="홈페이지" variant="outlined"/>
                        </div>
                        <div>
                            <TextField label="이메일" variant="outlined"/>
                        </div>
                        <div>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Date picker inline"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </div>
                    </form>
                    <div className={classes.button}>
                        <Button color="primary">다음</Button>
                        <Button>취소</Button>
                    </div>
                </div>
            </Fade>
        </Fragment>
    );
};

export default AddCompany;
