import {useDispatch} from "react-redux";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {changeUserField} from "../../../../redux/actions/regUserActions";
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
        userId, userPassword, userName, userHp, userEmail,
        userLevel, emailAuthValue, emailAuthFlag, emailAuthGroupFlag,
        emailAuthGroupList, msg, msgError,
        // } = useSelector(({ regUser }) => ({
    } = ({
        userId: userProps.userId,
        userPassword: userProps.password,
        userName: userProps.username,
        userEmail: userProps.email,
        userHp: userProps.cellPhone,
        userLevel: userProps.level,
        emailAuthValue: userProps.emailAuthValue,
        emailAuthFlag: userProps.emailAuthFlag,
        emailAuthGroupFlag: userProps.emailAuthGroupFlag,
        emailAuthGroupList: userProps.emailAuthGroupList,
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
