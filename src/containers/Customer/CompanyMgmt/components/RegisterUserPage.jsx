import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {changeUserField, checkDupUser} from "../../../../redux/actions/usersActions";
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

const RegisterUserPage = () => {
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
    } = useSelector(({ usersRd }) => ({
        isError: usersRd.isError,
        required: usersRd.required,
        disabled: usersRd.disabled,
        helperText: usersRd.helperText,
        /** register */
        userId: usersRd.register.userId,
        userPassword: usersRd.register.password,
        userName: usersRd.register.username,
        userEmail: usersRd.register.email,
        userHp: usersRd.register.cellPhone,
        userLevel: usersRd.register.level,
        emailAuthValue: usersRd.register.emailAuthValue,
        emailAuthFlag: usersRd.register.emailAuthFlag,
        emailAuthGroupFlag: usersRd.register.emailAuthGroupFlag,
        emailAuthGroupList: usersRd.register.emailAuthGroupList,
        /** message */
        msg: usersRd.msg,
        msgError: usersRd.msgError,
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

    const handleCheckDupUser = () => {
        if (userId !== "") {
           dispatch(checkDupUser({userId}));
        }
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
                        isError={isError.userId}
                        required={required.userId}
                        disabled={disabled.userId}
                        helperText={helperText.userId}
                        label="아이디"
                        name="userId"
                        value={userId}
                        onChange={onChangeField}
                    />
                    <NubesButtonSecondary
                        onClick={handleCheckDupUser}
                        size="small"
                    >
                        중복확인
                    </NubesButtonSecondary>
                </div>
                <div>
                    <CbTextField
                        isError={isError.password}
                        required={required.password}
                        disabled={disabled.password}
                        helperText={helperText.password}
                        label="패스워드"
                        name="password"
                        type="password"
                        value={userPassword}
                        onChange={onChangeField}
                    />
                </div>
                <div>
                    <CbTextField
                        isError={isError.username}
                        required={required.username}
                        disabled={disabled.username}
                        helperText={helperText.username}
                        label="이름"
                        name="username"
                        value={userName}
                        onChange={onChangeField}
                    />
                </div>
                <div>
                    <CbTextField
                        isError={isError.email}
                        required={required.email}
                        disabled={disabled.email}
                        helperText={helperText.email}
                        label="이메일"
                        name="email"
                        value={userEmail}
                        onChange={onChangeField}
                    />
                </div>
                <div>
                    <CbTextField
                        isError={isError.cellPhone}
                        required={required.cellPhone}
                        disabled={disabled.cellPhone}
                        helperText={helperText.cellPhone}
                        label="핸드폰 번호"
                        name="cellPhone"
                        value={userHp}
                        onChange={onChangeField}
                    />
                </div>
                <div>
                    <CbTextField
                        isError={isError.level}
                        required={required.level}
                        disabled={disabled.level}
                        helperText={helperText.level}
                        label="권한"
                        name="level"
                        value={userLevel}
                        onChange={onChangeField}
                    />
                </div>
                <div>
                    <CbSelectField
                        isError={isError.emailAuthValue}
                        required={required.emailAuthValue}
                        disabled={disabled.emailAuthValue}
                        helperText={helperText.emailAuthValue}
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
