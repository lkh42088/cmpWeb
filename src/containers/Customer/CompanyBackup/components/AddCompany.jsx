import 'date-fns';
import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import {Card, CardBody, Col} from "reactstrap";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import {
    addCompany, checkCompanyRegisterField,
} from "../../../../redux/actions/companiesActions";
import {
    checkUserRegisterField,
    registerUser,
    setupUserBaseByCompany,
} from "../../../../redux/actions/usersActions";

import RegisterCompanyPage from "./RegisterCompanyPage";
import RegisterUserPage from "./RegisterUserPage";

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

/** Stepper */
function getStepsAddingCompany() {
    return ['고객사 등록', '대표 계정 등록'];
}

function getStepAddingCompany(step, company, user) {
    switch (step) {
        case 0:
            return <RegisterCompanyPage/>;
        case 1:
            return <RegisterUserPage userProps={user}/>;
        default:
            return <RegisterUserPage userProps={user}/>;
    }
}

// function checkPasswordPattern(str) {
//     const pass = str.value;
//     let message = "";
//
//     // 비밀번호 문자열에 숫자 존재 여부 검사
//     const pattern1 = /[0-9]/; // 숫자
//     if (pattern1.test(pass) === false) {
//         message = "비밀번호에 숫자가 입력되지 않았습니다.\n숫자를 입력하여 주시기 바랍니다.";
//     }
//
//     // 비밀번호 문자열에 영문 소문자 존재 여부 검사
//     const pattern2 = /[a-z]/;
//     if (pattern2.test(pass) === false) {
//         message = "비밀번호에 영문 소문자가 입력되지 않았습니다.\n영문 소문자를 입력하여 주시기 바랍니다.";
//     }
//
//     // 비밀번호 문자열에 영문 대문자 존재 여부 검사
//     // const pattern3 = /[A-Z]/;
//     // if (pattern3.test(pass) === false) {
//     //     message = "비밀번호에 영문 대문자가 입력되지 않았습니다.\n영문 대문자를 입력하여 주시기 바랍니다.";
//     // }
//
//     // 비밀번호 문자열에 특수문자 존재 여부 검사
//     // const pattern4 = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
//     // if (pattern4.test(pass) === false) {
//     //     message = "비밀번호에 특수문자가 입력되지 않았습니다.\n특수문자를 입력하여 주시기 바랍니다.";
//     // }
//
//     // 비밀번호 문자열의 입력 길이 검사
//     if (pass.length < 8 || pass.length > 16) {
//         message = "비밀번호는 8자리 이상 16자리 이하만 가능합니다.\n비밀번호를 다시 입력하여 주시기 바랍니다.";
//     }
//
//     // 비밀번호 문자열 결과 출력
//     if (message) {
//         // alert(message);
//         // str.value = "";
//         // str.focus();
//         return false;
//     }
//     // alert("사용하셔도 좋은 비밀번호 입니다.");
//     return true;
// }

function checkPasswordPattern(pass) {
    let message = "";

    // 비밀번호 문자열에 숫자 존재 여부 검사
    const pattern1 = /[0-9]/; // 숫자
    if (pattern1.test(pass) === false) {
        message = "비밀번호에 숫자가 입력되지 않았습니다.\n숫자를 입력하여 주시기 바랍니다.";
    }

    // 비밀번호 문자열에 영문 소문자 존재 여부 검사
    const pattern2 = /[a-z]/;
    if (pattern2.test(pass) === false) {
        message = "비밀번호에 영문 소문자가 입력되지 않았습니다.\n영문 소문자를 입력하여 주시기 바랍니다.";
    }

    // 비밀번호 문자열에 영문 대문자 존재 여부 검사
    // const pattern3 = /[A-Z]/;
    // if (pattern3.test(pass) === false) {
    //     message = "비밀번호에 영문 대문자가 입력되지 않았습니다.\n영문 대문자를 입력하여 주시기 바랍니다.";
    // }

    // 비밀번호 문자열에 특수문자 존재 여부 검사
    // const pattern4 = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
    // if (pattern4.test(pass) === false) {
    //     message = "비밀번호에 특수문자가 입력되지 않았습니다.\n특수문자를 입력하여 주시기 바랍니다.";
    // }

    // 비밀번호 문자열의 입력 길이 검사
    if (pass.length < 8 || pass.length > 16) {
        message = "비밀번호는 8자리 이상 16자리 이하만 가능합니다.\n비밀번호를 다시 입력하여 주시기 바랍니다.";
    }

    // 비밀번호 문자열 결과 출력
    if (message) {
        // alert(message);
        // str.value = "";
        // str.focus();
        return false;
    }
    // alert("사용하셔도 좋은 비밀번호 입니다.");
    return true;
}

const AddCompany = (props) => {
    /************************************************************************************
     * 1. Variable
     ************************************************************************************/
    const classes = useStyles();
    const dispatch = useDispatch();

    /** 1.1 Stepper *********************************************************************/
    const {open, handleClose, refreshPage } = props;
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const steps = getStepsAddingCompany();

    /** 1.2 Company, User ***************************************************************/
    const {
        company,
        checkCompany,
        confirmCompany,
        cpMsg,
        cpMsgError,
        user,
        checkUser,
        confirmUser,
        userMsg,
        userMsgError,
    } = useSelector(({ companiesRd, usersRd }) => ({
        company: companiesRd.register,
        checkCompany: companiesRd.checkCompany,
        confirmCompany: companiesRd.confirmCompany,
        cpMsg: companiesRd.msg,
        cpMsgError: companiesRd.msgError,
        user: usersRd.register,
        checkUser: usersRd.checkUser,
        confirmUser: usersRd.confirmUser,
        userMsg: usersRd.msg,
        userMsgError: usersRd.msgError,
    }));

    /************************************************************************************
     * 2. Function
     ************************************************************************************/

    /** 2.1 Stepper */
    const totalSteps = () => steps.length;
    const completedSteps = () => Object.keys(completed).length;
    const isLastStep = () => activeStep === totalSteps() - 1;
    const allStepsCompleted = () => completedSteps() === totalSteps();

    const isReadyRegisterCompany = () => {
        // eslint-disable-next-line no-useless-escape
        const checkEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
        if (company.cpName !== ""
            && company.cpZip !== ""
            && company.cpAddr !== ""
            && company.cpAddrDetail !== ""
            && company.cpTel !== ""
            && company.cpEmail !== ""
            && checkEmail.test(company.cpEmail)
            && checkCompany
            && confirmCompany
        ) {
            return true;
        }
        return false;
    };

    const isReadyRegisterUser = () => {
        if (user.userId !== ""
            && user.password !== ""
            && user.email !== ""
            && user.username !== ""
            && user.cellPhone !== ""
            && checkUser
            && confirmUser
            && checkPasswordPattern(user.password)
        ) {
            return true;
        }
        return false;
    };

    const handleNext = () => {
        const lastStep = isLastStep();
        const completeComplete = allStepsCompleted();
        console.log("activeStep ", activeStep);
        console.log("totalStep", totalSteps() - 1);

        if (activeStep === 0) {
            /** Company page */
            dispatch(checkCompanyRegisterField());
            // check
            if (isReadyRegisterCompany() === false) {
                return;
            }
        } else if (activeStep === 1) {
            /** User page */
            dispatch(checkUserRegisterField());
            // check
            if (isReadyRegisterUser() === false) {
                return;
            }
        }

        if (activeStep === (totalSteps() - 1)) {
            dispatch(addCompany({
                cpName: company.cpName, 
                cpZip: company.cpZip, 
                cpAddr: company.cpAddr, 
                cpAddrDetail: company.cpAddrDetail, 
                cpHomepage: company.cpHomepage, 
                cpTel: company.cpTel, 
                cpEmail: company.cpEmail, 
                cpIsCompany: company.cpIsCompany, 
                cpMemo: company.cpMemo, 
                cpTerminationDate: company.cpTerminationDate,
            }));

            console.log("--> [dispatch] send user/company!!!");
            handleClose();
        } else {
            console.log("--> [dispatch] setup User: ", company.cpName, ", ", company.cpEmail, ", ", company.cpTel);
            dispatch(setupUserBaseByCompany({
                cpName: company.cpName, username: company.cpName, email: company.cpEmail, cellPhone: company.cpTel,
            }));
        }

        const newActiveStep = isLastStep() && !allStepsCompleted()
            // eslint-disable-next-line operator-linebreak
            ? // It's the last step, but not all steps have been completed,
              // find the first step that has been completed
            steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        console.log("handleBack: prevActiveStep ", activeStep);
        if (activeStep === 0) {
            console.log("handleBack: --> dispatch");
            handleClose();
            return;
        }
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleStep = step => () => {
        console.log("handleStep: prevActiveStep ", activeStep);
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

    /************************************************************************************
     * 3. useEffect
     ************************************************************************************/
    useEffect(() => {
        if (cpMsg !== null && cpMsg.msg && cpMsg.success === true) {
            console.log("registerUser: cpMsg.idx ", cpMsg.idx);
            console.log("registerUser: cpMsg ", cpMsg);
            dispatch(registerUser({
                cpIdx: cpMsg.msg.idx,
                userId: user.userId,
                password: user.password,
                username: user.username,
                email: user.email,
                emailAuthFlag: user.emailAuthFlag,
                emailAuthGroupFlag: user.emailAuthGroupFlag,
                emailAuthGroupList: user.emailAuthGroupList,
            }));
        }
    }, [cpMsg]);

    useEffect(() => {
    }, [cpMsgError]);

    useEffect(() => {
    }, [userMsg]);

    useEffect(() => {
        if (refreshPage !== null) {
            refreshPage();
        }
    }, [userMsgError]);

    /************************************************************************************
     * 4. JSX Template
     ************************************************************************************/
    console.log("AddCompany");
    return (
        <Dialog
            onClose={handleClose}
            open={open}
        >
            <div>
                <Card className={classes.paper}>
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
                                        <RegisterCompanyPage/>
                                    </div>
                                ) : (
                                    <div>
                                        {getStepAddingCompany(activeStep, company, user)}
                                        <div>
                                            <Button
                                                // disabled={activeStep === 0}
                                                onClick={handleBack}
                                                className={classes.backButton}
                                            >
                                                {activeStep === 0 ? 'Cancel' : 'Back'}
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
            </div>
        </Dialog>
    );
};

export default AddCompany;
