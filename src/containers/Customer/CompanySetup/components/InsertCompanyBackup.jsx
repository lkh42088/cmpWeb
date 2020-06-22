import 'date-fns';
import React, {Fragment, useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
// import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
/** stepper */
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {Card, CardBody, Col} from "reactstrap";
import PropTypes from 'prop-types';
import Fade from "@material-ui/core/Fade";
import {Field, Form} from "redux-form";
import {useDispatch, useSelector} from "react-redux";
import {changeUserField} from "../../../../redux/actions/usersActions";
import {changeCompanyRegisterField} from "../../../../redux/actions/companiesActions";

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(2),
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
            margin: theme.spacing(1.9),
            // width: '120px',
        },
    },
    formControl: {
        // margin: theme.spacing(1),
        width: 232,
        minWidth: 200,
        '& > *': {
            fontSize: '13px',
            fontFamily: 'Nanum Square RoundB',
        },
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
    label: {
        fontSize: '13px',
        fontFamily: 'Nanum Square RoundB',
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
    root3: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
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
const CbTextField = ({
    label,
    required,
    width,
    labelFont,
    inputFont,
    labelFontSize,
    inputFontSize,
    disabled,
    onChange,
    name,
    value,
}) => {
    const handleChange = (event) => {
        event.preventDefault();
        console.log("name:", name, ", value:", event.target.value);
        onChange({name, value: event.target.value});
    };

    console.log("label:", label, "nbName:", name, ", nbValue:", value);
    return (
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
            value={value}
            name={name}
            onChange={handleChange}
        />
    );
};

CbTextField.defaultProps = {
    label: '',
    required: false,
    width: '17em',
    labelFont: 'Nanum Square RoundB',
    labelFontSize: '13px',
    inputFont: 'Nanum Square RoundR',
    inputFontSize: '12px',
    disabled: false,
    nbName: '',
    nbValue: '',
};

/**
 *
 */
// const CbInputLabel = styled(InputLabel)`
//     .MuiFormLabel-root {
//         font-size: '12px';
//         font-family: 'Nanum Square RoundB';
//     }
// `;

const CbSelectField = ({
    labelValue,
    classes,
    name,
    value,
    onChange,
}) => {
    const handleChange = (e) => {
        console.log("CbSelectField: ", e.target.value);
        onChange({name, value: e.target.value});
    };

    return (
    <FormControl
        variant="outlined"
        className={classes.formControl}
        size="small"
    >
        <InputLabel id="demo-simple-select-outlined-label">
            {labelValue}
        </InputLabel>
        <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={value}
            onChange={handleChange}
            label={name}
        >
            <MenuItem value="">
                <em>사용 안함</em>
            </MenuItem>
            <MenuItem value={1}>개인 이메일 인증</MenuItem>
            <MenuItem value={2}>그룹 이메일 인증</MenuItem>
        </Select>
    </FormControl>
    );
};

CbSelectField.defaultProps = {
    label: '',
    required: false,
    width: '17em',
    labelFont: 'Nanum Square RoundB',
    labelFontSize: '13px',
    inputFont: 'Nanum Square RoundR',
    inputFontSize: '12px',
    disabled: false,
    nbName: '',
    nbValue: '',
};
/**
 * https://material-ui-pickers.dev/api/KeyboardDateTimePicker
 * (16jun2020,jungbh)
 */
const CbDatePicker = ({
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

CbDatePicker.defaultProps = {
    width: '12.3em',
    labelFont: 'Nanum Square RoundB',
    labelFontSize: '13px',
    inputFont: 'Nanum Square RoundR',
    inputFontSize: '12px',
};

/**
 * (16jun2020,bhjung)
 */
const NubesButtonDefault = withStyles({
    root: {
        background: 'linear-gradient(45deg, #d0c6c6 30%, #e7e2e2 90%)',
        borderRadius: 3,
        border: 0,
        boxSizing: 'content-box',
        minWidth: '5em',
        width: '5em',
        color: 'white',
        height: 35,
        padding: '0 10px',
        boxShadow: '0 3px 5px 2px rgba(181, 180, 176, .3)',
        margin: '0 8px 0 0',
    },
    label: {
        textTransform: 'capitalize',
        fontFamily: 'Nanum Square RoundR',
        fontSize: '12px',
        color: "#524d4d",
        width: '100%',
    },
})(Button);

const NubesButtonPrimary = withStyles({
    root: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        boxSizing: 'content-box',
        minWidth: '5em',
        width: '5em',
        height: 35,
        padding: '0 10px',
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        margin: '0 8px 0 0',
    },
    label: {
        textTransform: 'capitalize',
        fontFamily: 'Nanum Square RoundR',
        fontSize: '12px',
        width: '100%',
    },
})(Button);

const NubesButtonSecondary = withStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        boxSizing: 'content-box',
        minWidth: '5em',
        width: '5em',
        height: 35,
        padding: '0 10px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        margin: '0 0 0 8px',
    },
    label: {
        textTransform: 'capitalize',
        fontFamily: 'Nanum Square RoundR',
        fontSize: '12px',
        width: '100%',
        // width: '5em',
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
    <Button className={classes.root} {...other} />
));

const CompanyPage = ({ classes }) => {
    /************************************************************************************
     * Variable
     ************************************************************************************/
    const dispatch = useDispatch();
    const {
        regCompany, cpName, cpZip, cpAddr, cpAddrDetail, cpHomepage, cpEmail,
        cpTel, cpIsCompany, cpMemo, cpTerminationDate,
    } = useSelector(({ companiesRd }) => ({
        cpName: companiesRd.regCompany.cpName,
        cpZip: companiesRd.regCompany.cpZip,
        cpAddr: companiesRd.regCompany.cpAddr,
        cpAddrDetail: companiesRd.regCompany.cpAddrDetail,
        cpHomepage: companiesRd.regCompany.cpHomepage,
        cpEmail: companiesRd.regCompany.cpEmail,
        cpTel: companiesRd.regCompany.cpTel,
        cpIsCompany: companiesRd.regCompany.cpIsCompany,
        cpMemo: companiesRd.regCompany.cpMemo,
        cpTerminationDate: companiesRd.regCompany.cpTerminationDate,
    }));

    /************************************************************************************
     * useEffect
     ************************************************************************************/
    useEffect(() => {
        console.log("[useEffect] INIT");
    }, []);

    // useEffect(() => {
    //     console.log("[useEffect] cpName: ", cpName);
    //     console.log("[useEffect] cpEmail: ", cpEmail);
    //     console.log("[useEffect] cpTel: ", cpTel);
    // }, [cpName, cpEmail, cpTel]);

    /************************************************************************************
     * Function
     ************************************************************************************/
    const handleChange = ({name, value}) => {
        console.log("[handleChange] name: ", name, ", value: ", value);
        dispatch(changeCompanyRegisterField({ key: name, value }));
    };

    const handleChangeDateField = (date) => {
        console.log("[handleChange Date] date: ", date, ", type: ", typeof (date));
        console.log("date: ", date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getDay());
        dispatch(changeCompanyRegisterField({ key: "cpTerminationDate", value: date}));
    };

    console.log("Company Page..");

    /************************************************************************************
     * JSX Template
     ************************************************************************************/
    return (
        <div>
            <h2>고객사 정보 등록</h2>
            <p>react-spring animates me.</p>
            <form className={classes.form} noValidate autoComplete="off">
                <div>
                    <CbTextField
                        required="true"
                        label="고객사 이름"
                        name="cpName"
                        value={cpName}
                        onChange={handleChange}
                    />
                    <NubesButtonSecondary size="small">중복확인</NubesButtonSecondary>
                </div>
                <div>
                    <CbTextField
                        required="true"
                        disabled="false"
                        label="우편번호"
                        name="cpZip"
                        value={cpZip}
                        onChange={handleChange}
                    />
                    <NubesButtonSecondary size="small">검색</NubesButtonSecondary>
                </div>
                <div>
                    <CbTextField
                        required="true"
                        disabled="false"
                        label="주소"
                        name="cpAddr"
                        value={cpAddr}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <CbTextField
                        required="true"
                        label="상세주소"
                        name="cpAddrDetail"
                        value={cpAddrDetail}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <CbTextField
                        required="true"
                        label="전화번호"
                        name="cpTel"
                        value={cpTel}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <CbTextField
                        label="홈페이지"
                        name="cpHomepage"
                        value={cpHomepage}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <CbTextField
                        required="true"
                        label="이메일"
                        name="cpEmail"
                        value={cpEmail}
                        onChange={handleChange}
                    />
                </div>
                <CbDatePicker
                    selectedDate={cpTerminationDate}
                    label="해지일자"
                    handleDateChange={handleChangeDateField}
                />

                <div>
                    <NubesButtonPrimary
                        size="small"
                    >다음</NubesButtonPrimary>
                    <NubesButtonDefault
                        size="small"
                    >취소</NubesButtonDefault>
                </div>
            </form>
        </div>
    );
};

const UserPage = ({ classes }) => {
    /************************************************************************************
     * Variable
     ************************************************************************************/
    const dispatch = useDispatch();
    const {
        userId, userPassword, userName, userHp, userEmail,
        userLevel, emailAuthValue, emailAuthFlag, emailAuthGroupFlag,
        emailAuthGroupList, msg, msgError,
    } = useSelector(({ regUser }) => ({
        userId: regUser.userId,
        userPassword: regUser.password,
        userName: regUser.username,
        userEmail: regUser.email,
        userHp: regUser.cellPhone,
        userLevel: regUser.level,
        emailAuthValue: regUser.emailAuthValue,
        emailAuthFlag: regUser.emailAuthFlag,
        emailAuthGroupFlag: regUser.emailAuthGroupFlag,
        emailAuthGroupList: regUser.emailAuthGroupList,
        msg: regUser.msg,
        msgError: regUser.msgError,
    }));

    /************************************************************************************
     * useEffect
     ************************************************************************************/

    /************************************************************************************
     * Function
     ************************************************************************************/
    const onChangeField = ({name, value}) => {
        console.log("onChangeField: name - ", name, ", value - ", value);
        dispatch(changeUserField({key: name, value}));
    };

    /************************************************************************************
     * JSX Template
     ************************************************************************************/
    console.log("User Page..");
    return (
        <div>
            <h2>고객사 이메일 등록</h2>
            <p>react-spring animates me.</p>
            <form className={classes.form} noValidate autoComplete="off">
                <div>
                    <CbTextField
                        required="true"
                        label="아이디"
                        name="userId"
                        value={userId}
                        onChange={onChangeField}
                    />
                    <NubesButtonSecondary size="small">중복확인</NubesButtonSecondary>
                </div>
                <div>
                    <CbTextField
                        required="true"
                        label="패스워드"
                        name="password"
                        value={userPassword}
                        onChange={onChangeField}
                    />
                </div>
                <div>
                    <CbTextField
                        required="true"
                        label="이름"
                        name="username"
                        value={userName}
                        onChange={onChangeField}
                    />
                </div>
                <div>
                    <CbTextField
                        required="true"
                        label="이메일"
                        name="email"
                        value={userEmail}
                        onChange={onChangeField}
                    />
                </div>
                <div>
                    <CbTextField
                        required="true"
                        label="핸드폰 번호"
                        name="cellPhone"
                        value={userHp}
                        onChange={onChangeField}
                    />
                </div>
                <div>
                    <CbTextField
                        required="true"
                        label="권한"
                        name="level"
                        value={userLevel}
                        onChange={onChangeField}
                    />
                </div>
                <div>
                    <CbSelectField
                        labelValue="이메일 인증"
                        classes={classes}
                        name="emailAuthValue"
                        value={emailAuthValue}
                        onChange={onChangeField}
                    />
                </div>
                <div>
                    <NubesButtonPrimary size="small">이전</NubesButtonPrimary>
                    <NubesButtonPrimary size="small">등록</NubesButtonPrimary>
                    <NubesButtonDefault size="small">취소</NubesButtonDefault>
                </div>
            </form>
        </div>
    );
};

/** Stepper */
function getSteps() {
    return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepsAddingCompany() {
    return ['고객정보 등록', '이메일 계정 등록', '담당자 등록'];
}

function getStepAddingCompany(step) {
    const classes = useStyles();
    switch (step) {
        case 0:
            return <CompanyPage classes={classes}/>;
        case 1:
            return <UserPage classes={classes}/>;
        case 2:
            return <CompanyPage classes={classes}/>;
        default:
            return <UserPage classes={classes}/>;
    }
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Step 1: Select campaign settings...';
        case 1:
            return 'Step 2: What is an ad group anyways?';
        case 2:
            return 'Step 3: This is the bit I really care about!';
        default:
            return 'Unknown step';
    }
}

const InsertCompany = () => {
    const classes = useStyles();
    const [isCompanyPage, setIsCompanyPage] = useState(false);

    /** Stepper */
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    // const steps = getSteps();
    const steps = getStepsAddingCompany();

    const totalSteps = () => steps.length;

    const completedSteps = () => Object.keys(completed).length;

    const isLastStep = () => activeStep === totalSteps() - 1;

    const allStepsCompleted = () => completedSteps() === totalSteps();

    const handleNext = () => {
        const newActiveStep = isLastStep() && !allStepsCompleted()
            // eslint-disable-next-line operator-linebreak
                ? // It's the last step, but not all steps have been completed,
                  // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleStep = step => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };


    console.log("AddCompany");
    return (
        // <Col md={6} lg={8}>
        //     <Card className={classes.paper}>
        //         <CardBody>
        //             {isCompanyPage ? <CompanyPage classes={classes}/>
        //                 : <UserPage classes={classes}/>
        //             }
        //         </CardBody>
        //     </Card>
        // </Col>
        <Col md={6} lg={8}>
            <Card>
        <div className={classes.root3}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <CardBody>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>All steps completed</Typography>
                        <CompanyPage classes={classes}/>
                    </div>
                ) : (
                    <div>
                        {/*<Typography className={classes.instructions}>*/}
                        {/*    {getStepContent(activeStep)}*/}
                        {/*</Typography>*/}
                        {getStepAddingCompany(activeStep)}
                        <div>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                Back
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            </CardBody>
        </div>
            </Card>
        </Col>
    );
};

export default InsertCompany;
