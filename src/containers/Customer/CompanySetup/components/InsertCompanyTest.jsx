import 'date-fns';
import React, {Fragment, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
// import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {Card, CardBody, Col} from "reactstrap";
import PropTypes from 'prop-types';
import Fade from "@material-ui/core/Fade";
import {Field} from "redux-form";

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    form: {
        '& > *': {
            margin: theme.spacing(1.5),
            // width: '120px',
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
    },
    root2: {
        // background: 'linear-gradient(45deg, black 30%, gray 90%)',
        background: 'linear-gradient(45deg, blue 30%, skyblue 90%)',
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        // $disabled is a reference to the local disabled
        // rule within the same style sheet.
        // By using &, we increase the specificity.
        '&$disabled': {
            background: 'rgba(0, 0, 0, 0.12)',
            color: 'white',
            boxShadow: 'none',
        },
    },
}));

const StyledTextField = styled(TextField)`
    .MuiFormControl-root {
    }
    .MuiFormLabel-root {
        font-family: "Nanum Squre acEB";
    }
    label.Mui-focused {
        color: ${props => props.color || '#4ce1b6'};
    }
    .MuiOutlinedInput-root {
        fieldset {
            border-color: inherit;
        }
        &:hover fieldset {
            border-color: ${props => props.color || '#4ce1b6'};
        }
        &.Mui-focused fieldset {
            border-color: ${props => props.color || '#4ce1b6'};
        }
    }
`;

/**
 * Material UI - TextField Props
 * https://github.com/mui-org/material-ui/blob/649ef2e34c10c90788b7506e88958c91f87f924c/src/TextField/TextField.js#L171
 * inputProps : https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes
 * (16jun2020,bhjung)
 */
const NubesTextField = ({
    label,
    children,
    required,
    width,
    labelFont,
    inputFont,
    labelFontSize,
    inputFontSize,
    disabled,
}) => (
    <TextField
        required={required}
        InputLabelProps={{
            style: {
                fontFamily: `${labelFont}`,
                fontSize: `${labelFontSize}`,
            },
        }}
        inputProps={{
            style: {
                fontFamily: `${inputFont}`,
                fontSize: `${inputFontSize}`,
                width: `${width}`,
            },
        }}
        size="small"
        label={label}
        variant="outlined"
        disabled={disabled}
    />
);

NubesTextField.defaultProps = {
    label: '',
    children: [],
    required: false,
    width: '15em',
    labelFont: 'Nanum Square RoundB',
    labelFontSize: '13px',
    inputFont: 'Nanum Square RoundR',
    inputFontSize: '12px',
    disabled: false,
};

/**
 * https://material-ui-pickers.dev/api/KeyboardDateTimePicker
 * (16jun2020,jungbh)
 */
const NubesDatePicker = ({
    label,
    selectedDate,
    handleDateChange,
    width,
    labelFont,
    inputFont,
    labelFontSize,
    inputFontSize,
}) => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {/*<Grid container justify="space-around">*/}
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                // format="MM/dd/yyyy"
                format="yyyy년 MM월 dd일"
                // format="yyyy-MM-dd"
                margin="normal"
                id="date-picker-inline"
                label={label}
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                size="small"
                InputLabelProps={{
                    style: {
                        fontFamily: `${labelFont}`,
                        fontSize: `${labelFontSize}`,
                    },
                }}
                inputProps={{
                    style: {
                        fontFamily: `${inputFont}`,
                        fontSize: `${inputFontSize}`,
                        width: `${width}`,
                        fontWeight: 700,
                    },
                }}
            />
        {/*</Grid>*/}
    </MuiPickersUtilsProvider>
);
//
// NubesDatePicker.propTypes = {
//     label: PropTypes.string.isRequired,
//     selectedDate: PropTypes.string.isRequired,
//     handleDateChange: PropTypes.func.isRequired,
// };

NubesDatePicker.defaultProps = {
    width: '10.3em',
    labelFont: 'Nanum Square RoundB',
    labelFontSize: '13px',
    inputFont: 'Nanum Square RoundR',
    inputFontSize: '12px',
};

/**
 * (16jun2020,bhjung)
 */
const NubesButton = withStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 35,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        margin: '0 0 0 8px',
    },
    label: {
        textTransform: 'capitalize',
        fontFamily: 'Nanum Square RoundR',
        fontSize: '12px',
    },
})(Button);

const NubesButton2 = withStyles({
    root: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        background: '#1976d2',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 35,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        margin: '0 0 0 8px',
    },
    label: {
        textTransform: 'capitalize',
        fontFamily: 'Nanum Square RoundR',
        fontSize: '12px',
    },
})(Button);
/**
 *
 */
const styledBy = (property, mapping) => props => mapping[props[property]];

const styles = {
    root: {
        background: styledBy('color', {
            default: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            blue: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        }),
        borderRadius: 3,
        border: 0,
        margin: '0 0 0 8px',
        color: 'white',
        height: 35,
        padding: '0 30px',
        boxShadow: styledBy('color', {
            default: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            blue: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        }),
    },
    label: {
        textTransform: 'capitalize',
        fontFamily: 'Nanum Square RoundR',
        fontSize: '12px',
    },
};

const NubesButtonColor = withStyles(styles)(({ classes, color, ...other }) => (
    // <Button className={classes.root} {...other} />
    <Button className={classes.root} {...other} />
));

const InsertCompany = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    // const [selectedDate, setSelectedDate] = useState(new Date('2020-06-16'));
    const [selectedDate, setSelectedDate] = useState(new Date());

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
        <Col md={6} lg={8}>
            <div>
            <Card className={classes.paper}>
                <CardBody>
                    <div>
                        <h2>고객사 정보 등록</h2>
                        <p>react-spring animates me.</p>
                        <form className={classes.form} noValidate autoComplete="off">
                            <div>
                                <NubesTextField required="true" label="고객사 이름"/>
                                <NubesButton size="small">확인</NubesButton>
                            </div>
                            <div>
                                <NubesTextField required="true" disabled="false" label="우편번호"/>
                                <NubesButton size="small">검색</NubesButton>
                            </div>
                            <div>
                                <NubesTextField required="true" disabled="false" label="주소"/>
                            </div>
                            <div>
                                <NubesTextField required="true" label="상세주소"/>
                            </div>
                            <div>
                                <NubesTextField required="true" label="전화번호"/>
                            </div>
                            <div>
                                <NubesTextField label="홈페이지"/>
                            </div>
                            <div>
                                <NubesTextField required="true" label="이메일"/>
                            </div>
                            {/*<div>*/}
                            <NubesDatePicker
                                selectedDate={selectedDate}
                                label="해지일자"
                                handleDateChange={handleDateChange}
                            />
                            {/*</div>*/}
                            <div>
                                {/*<Grid container justify="space-around">*/}
                                <NubesButton2 size="small">다음</NubesButton2>
                                <NubesButton size="small">다음</NubesButton>
                                <NubesButton size="small">취소</NubesButton>
                                {/*</Grid>*/}
                            </div>
                            <div>
                                <NubesButtonColor color="blue" size="small">다음</NubesButtonColor>
                                <NubesButtonColor color="default" size="small">취소</NubesButtonColor>
                            </div>
                            <div className={classes.root}>
                                <Button variant="contained" color="primary" size="small">다음</Button>
                                <Button variant="contained" size="small">취소</Button>
                            </div>
                            <div>
                                <Button classes={{
                                    root: classes.root2,
                                }}>
                                    확인
                                </Button>
                            </div>
                        </form>
                    </div>
                </CardBody>
            </Card>
            </div>
        </Col>
    );
};

export default InsertCompany;
