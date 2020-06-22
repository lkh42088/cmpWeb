import {useDispatch} from "react-redux";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {changeUserField} from "../../../../redux/actions/usersActions";
import CbTextField from "./CbTextField";
import CbSelectField from "./CbSelectField";
import {NubesButtonSecondary} from "./NubesButton";

const useStyles = makeStyles(theme => ({
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
}));

const RegisterUserPage = ({ userProps }) => {
    /************************************************************************************
     * Variable
     ************************************************************************************/
    const classes = useStyles();
    const dispatch = useDispatch();
    const {
        isError,
        required,
        disabled,
        helperText,
        userId, userPassword, userName, userHp, userEmail,
        userLevel, emailAuthValue, emailAuthFlag, emailAuthGroupFlag,
        emailAuthGroupList, msg, msgError,
        // } = useSelector(({ regUser }) => ({
    } = ({
        userId: userProps.register.userId,
        userPassword: userProps.register.password,
        userName: userProps.register.username,
        userEmail: userProps.register.email,
        userHp: userProps.register.cellPhone,
        userLevel: userProps.register.level,
        emailAuthValue: userProps.register.emailAuthValue,
        emailAuthFlag: userProps.register.emailAuthFlag,
        emailAuthGroupFlag: userProps.register.emailAuthGroupFlag,
        emailAuthGroupList: userProps.register.emailAuthGroupList,
        msg: userProps.msg,
        msgError: userProps.msgError,
    });

    const requiredVal = true;
    const disableVal = true;

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
            <form className={classes.form} noValidate autoComplete="off">
                <div>
                    <CbTextField
                        required={requiredVal}
                        label="아이디"
                        name="userId"
                        value={userId}
                        onChange={onChangeField}
                    />
                    <NubesButtonSecondary size="small">중복확인</NubesButtonSecondary>
                </div>
                <div>
                    <CbTextField
                        required={requiredVal}
                        label="패스워드"
                        name="password"
                        value={userPassword}
                        onChange={onChangeField}
                    />
                </div>
                <div>
                    <CbTextField
                        disabled={disableVal}
                        required={requiredVal}
                        label="이름"
                        name="username"
                        value={userName}
                        onChange={onChangeField}
                    />
                </div>
                <div>
                    <CbTextField
                        disabled={disableVal}
                        required={requiredVal}
                        label="이메일"
                        name="email"
                        value={userEmail}
                        onChange={onChangeField}
                    />
                </div>
                <div>
                    <CbTextField
                        disabled={disableVal}
                        required={requiredVal}
                        label="핸드폰 번호"
                        name="cellPhone"
                        value={userHp}
                        onChange={onChangeField}
                    />
                </div>
                <div>
                    <CbTextField
                        disabled={disableVal}
                        required={requiredVal}
                        label="권한"
                        name="level"
                        value={userLevel}
                        onChange={onChangeField}
                    />
                </div>
                <div>
                    <CbSelectField
                        disabled={disableVal}
                        labelValue="이메일 인증"
                        classes={classes}
                        name="emailAuthValue"
                        value={emailAuthValue}
                        onChange={onChangeField}
                    />
                </div>
            </form>
        </div>
    );
};

export default RegisterUserPage;
