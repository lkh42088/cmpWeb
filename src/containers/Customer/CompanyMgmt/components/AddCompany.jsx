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
    addCompany, checkCompanyRegisterCheckField,
    initializeCompany,
} from "../../../../redux/actions/companiesActions";
import {
    initializeUser,
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

const AddCompany = (props) => {
    /************************************************************************************
     * 1. Variable
     ************************************************************************************/
    const classes = useStyles();
    const dispatch = useDispatch();

    /** 1.1 Stepper *********************************************************************/
    const {open, handleClose} = props;
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const steps = getStepsAddingCompany();

    /** 1.2 Company, User ***************************************************************/
    const {
        company,
        user,
        checkDupCompany,
        confirmCompany,
    } = useSelector(({ companiesRd, usersRd }) => ({
        checkDupCompany: companiesRd.checkDupCompany,
        confirmCompany: companiesRd.confirmCompany,
        company: companiesRd.register,
        user: usersRd,
    }));

    /************************************************************************************
     * 2. Function
     ************************************************************************************/

    /** 2.1 Stepper */
    const totalSteps = () => steps.length;
    const completedSteps = () => Object.keys(completed).length;
    const isLastStep = () => activeStep === totalSteps() - 1;
    const allStepsCompleted = () => completedSteps() === totalSteps();

    const isReadyRegister = () => {
        if (company.cpName !== ""
            && company.cpZip !== ""
            && company.cpAddr !== ""
            && company.cpAddrDetail !== ""
            && company.cpTel !== ""
            && company.cpEmail !== ""
            && checkDupCompany
            && confirmCompany
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
            dispatch(registerUser({
                userId: user.userId,
                password: user.password,
                username: user.username,
                email: user.email,
                emailAuthFlag: user.emailAuthFlag,
                emailAuthGroupFlag: user.emailAuthGroupFlag,
                emailAuthGroupList: user.emailAuthGroupList,
            }));
            console.log("--> [dispatch] send user/company!!!");
            handleClose();
        } else {
            if (activeStep === 0) {
                /** Company page */
                dispatch(checkCompanyRegisterCheckField());
                // check
                if (isReadyRegister() === false) {
                    return;
                }
            } else if (activeStep === 1) {
                /** User page */
                dispatch(checkCompanyRegisterCheckField());
                // check
                return;
            }
            console.log("--> [dispatch] setup User: ", company.cpName, ", ", company.cpEmail, ", ", company.cpTel);
            dispatch(setupUserBaseByCompany({username: company.cpName, email: company.cpEmail, cellPhone: company.cpTel}));
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
            dispatch(initializeUser());
            dispatch(initializeCompany());
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
