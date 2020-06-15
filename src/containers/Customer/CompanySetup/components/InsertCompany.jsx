import 'date-fns';
import React, {Fragment, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// import Fade from "@material-ui/core/Fade";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {Card, CardBody, Col} from "reactstrap";

const useStyles = makeStyles(theme => ({
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const InsertCompany = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    console.log("AddCompany");

    return (
        <Col md={6} lg={6}>
            <Card>
                <CardBody>
                    {/*<Fade in={open}>*/}
                        <div className={classes.paper}>
                            <h2 id="transition-modal-title">고객사 정보 등록</h2>
                            <p id="transition-modal-description">react-spring animates me.</p>
                            <form className={classes.form} noValidate autoComplete="off">
                                <div>
                                    <TextField id="company-name" label="고객사 이름" variant="outlined"/>
                                </div>
                                <div>
                                    <TextField id="company-address" label="고객사 주소" variant="outlined"/>
                                </div>
                                <div>
                                    <TextField id="company-tel" label="전화번호" variant="outlined"/>
                                </div>
                                <div>
                                    <TextField id="company-homepage" label="홈페이지" variant="outlined"/>
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
                                <div>
                                    <TextField id="company-email" label="이메일" variant="outlined"/>
                                </div>
                            </form>
                        </div>
                    {/*</Fade>*/}
                </CardBody>
            </Card>
        </Col>
    );
};

export default InsertCompany;
