import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import {Card, CardBody, Col} from "reactstrap";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import FormHelperText from "@material-ui/core/FormHelperText";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import {Button} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import {makeStyles} from "@material-ui/core/styles";
import {
    changeUserField,
    checkDupUser,
    checkUserRegisterField,
    initRegisterUser, registerUser,
} from "../../../../redux/actions/usersActions";
import SearchZip from "../../Company/components/SearchZip";
import {checkPasswordPattern} from "../../../../lib/utils/utils";

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
}));

const RegisterUserPage = (props) => {
    /************************************************************************************
     * Variable
     ************************************************************************************/
    const classes = useStyles();
    const {open, handleClose, refreshPage } = props;

    const dispatch = useDispatch();

    const {
        user,
        checkUser,
        confirmUser,
        userIsError,
        userRequired,
        userDisabled,
        userHelperText,
        /** register */
        userId, userPassword,
        /** message */
    } = useSelector(({ usersRd }) => ({
        user: usersRd.register,
        checkUser: usersRd.checkUser,
        confirmUser: usersRd.confirmUser,
        userIsError: usersRd.isError,
        userRequired: usersRd.required,
        userDisabled: usersRd.disabled,
        userHelperText: usersRd.helperText,
        /** register */
        userId: usersRd.register.userId,
        userPassword: usersRd.register.password,
    }));

    const [openZip, setOpenZip] = useState(false);
    const [values, setValues] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handlePassChange = prop => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    /************************************************************************************
     * Functions
     ************************************************************************************/
    const handleChangeUserTextField = ({name, value}) => {
        console.log("[handleChange] name: ", name, ", value: ", value);
        dispatch(changeUserField({key: name, value}));
    };

    const handleOpenSearchZip = () => {
        setOpenZip(true);
    };

    const handleCloseSearchZip = () => {
        setOpenZip(false);
    };

    const handleCompleteZip = ({zip, address}) => {
        dispatch(changeUserField({ key: "userZip", value: zip }));
        dispatch(changeUserField({ key: "userAddr", value: address }));
    };

    const handleCheckDupUser = () => {
        if (userId !== "") {
            dispatch(checkDupUser({userId}));
        }
    };

    const handleCancel = () => {
        console.log("handleCancel: ");
        dispatch(initRegisterUser());
        handleClose();
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

    const handleFinish = () => {
        console.log("handleFinish: ");
        dispatch(checkUserRegisterField());
        if (isReadyRegisterUser()) {
            console.log("send add company");
            dispatch(registerUser({
                userId: user.userId,
                password: user.password,
                username: user.username,
                email: user.email,
                emailAuthFlag: user.emailAuthFlag,
                emailAuthGroupFlag: user.emailAuthGroupFlag,
                emailAuthGroupList: user.emailAuthGroupList,
            }));
            handleClose();
        }
    };
    /************************************************************************************
     * useEffect
     ************************************************************************************/

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

    return (
        <Dialog
            onClose={handleClose}
            open={open}
        >
            <Col xs={8} md={12} lg={12}>
                <Card>
                    <CardBody>
                        <div className="card__title">
                            <h3 className="bold-text">계정 등록</h3>
                        </div>
                        <form className={formClassName}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <div>
                                         {/*1. 아이디*/}
                                        <span className={labelClassName}>* 계정 ID</span>
                                        <FormControl
                                            size={fieldSize}
                                            className={fieldClassName}
                                        >
                                            <FilledInput
                                                isError={userIsError.userId}
                                                required={userRequired.userId}
                                                disabled={userDisabled.userId}
                                                helperText={userHelperText.userId}
                                                name="userId"
                                                value={userId}
                                                onChange={(e) => { handleChangeUserTextField({name: "userId", value: e.target.value}); }}
                                                endAdornment={(
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleCheckDupUser}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {confirmUser ? <CheckBoxOutlinedIcon/> : <CheckBoxOutlineBlankIcon/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )}
                                            />
                                            <FormHelperText id="component-helper-text">{userHelperText.userId}</FormHelperText>
                                        </FormControl>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div>
                                        {/*// 2. 패스워드*/}
                                        <span className={labelClassName}>* 계정 암호</span>
                                        <FormControl
                                            size={fieldSize}
                                            className={fieldClassName}
                                        >
                                            <FilledInput
                                                isError={userIsError.password}
                                                required={userRequired.password}
                                                disabled={userDisabled.password}
                                                helperText={userHelperText.password}
                                                name="password"
                                                value={userPassword}
                                                onChange={(e) => { handleChangeUserTextField({name: "password", value: e.target.value}); }}
                                                type={values.showPassword ? 'text' : 'password'}
                                                endAdornment={(
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )}
                                            />
                                            <FormHelperText id="component-helper-text">{userHelperText.password}</FormHelperText>
                                        </FormControl>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div>
                                        {/*// 3. 이름*/}
                                        <span className={labelClassName}>* 이름</span>
                                        <TextField
                                            className={fieldClassName}
                                            isError={userIsError.username}
                                            required={userRequired.username}
                                            disabled={userDisabled.username}
                                            helperText={userHelperText.username}
                                            name="username"
                                            value={user.username}
                                            onChange={(e) => { handleChangeUserTextField({name: "username", value: e.target.value}); }}
                                            // label="이름"
                                            variant={variant}
                                            size={fieldSize}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div>
                                        {/*// 4. 이메일*/}
                                        <span className={labelClassName}>* 이메일</span>
                                        <TextField
                                            className={fieldClassName}
                                            isError={userIsError.email}
                                            required={userRequired.email}
                                            disabled={userDisabled.email}
                                            helperText={userHelperText.email}
                                            name="email"
                                            value={user.email}
                                            onChange={(e) => { handleChangeUserTextField({name: "email", value: e.target.value}); }}
                                            // label="이메일"
                                            variant={variant}
                                            size={fieldSize}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div>
                                        {/*// 5. 전화번호*/}
                                        <span className={labelClassName}>* 전화번호</span>
                                        <TextField
                                            className={fieldClassName}
                                            isError={userIsError.cellPhone}
                                            required={userRequired.cellPhone}
                                            disabled={userDisabled.cellPhone}
                                            helperText={userHelperText.cellPhone}
                                            name="cellPhone"
                                            value={user.cellPhone}
                                            onChange={(e) => { handleChangeUserTextField({name: "cellPhone", value: e.target.value}); }}
                                            // label="전화번호"
                                            variant={variant}
                                            size={fieldSize}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div>
                                        {/*// 6. 권한*/}
                                        <span className={labelClassName}>* 권한</span>
                                        <TextField
                                            className={fieldClassName}
                                            isError={userIsError.level}
                                            required={userRequired.level}
                                            disabled={userDisabled.level}
                                            helperText={userHelperText.level}
                                            name="level"
                                            value={user.level}
                                            onChange={(e) => { handleChangeUserTextField({name: "level", value: e.target.value}); }}
                                            // label="권한"
                                            variant={variant}
                                            size={fieldSize}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div>
                                        {/*// 7. 우편번호*/}
                                        <span className={labelClassName}>우편 번호</span>
                                        <FormControl
                                            isError={userIsError.userZip}
                                            required={userRequired.userZip}
                                            disabled={userDisabled.userZip}
                                            helperText={userHelperText.userZip}
                                            name="userZip"
                                            value={user.userZip}
                                            onChange={(e) => { handleChangeUserTextField({name: "userZip", value: e.target.value}); }}
                                            size={fieldSize}
                                            className={fieldClassName}
                                        >
                                            {/*<InputLabel>우편 번호</InputLabel>*/}
                                            <FilledInput

                                                endAdornment={(
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={handleOpenSearchZip}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            <SearchIcon/>
                                                        </IconButton>
                                                    </InputAdornment>
                                                )}
                                            />
                                            <FormHelperText id="component-helper-text">{userHelperText.cpZip}</FormHelperText>
                                        </FormControl>
                                        <SearchZip
                                            open={openZip}
                                            handleClose={handleCloseSearchZip}
                                            handleComplete={handleCompleteZip}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div>
                                        {/*// 8. 주소*/}
                                        <span className={labelClassName}>주소</span>
                                        <TextField
                                            className={fieldClassName}
                                            isError={userIsError.userAddr}
                                            required={userRequired.userAddr}
                                            disabled={userDisabled.userAddr}
                                            helperText={userHelperText.userAddr}
                                            name="userAddr"
                                            value={user.userAddr}
                                            onChange={(e) => { handleChangeUserTextField({name: "userAddr", value: e.target.value}); }}
                                            // label="주소"
                                            variant={variant}
                                            size={fieldSize}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div>
                                        {/*// 9. 상세주소*/}
                                        <span className={labelClassName}>상세주소</span>
                                        <TextField
                                            className={fieldClassName}
                                            isError={userIsError.userAddrDetail}
                                            required={userRequired.userAddrDetail}
                                            disabled={userDisabled.userAddrDetail}
                                            helperText={userHelperText.userAddrDetail}
                                            name="userAddrDetail"
                                            value={user.userAddrDetail}
                                            onChange={(e) => { handleChangeUserTextField({name: "userAddrDetail", value: e.target.value}); }}
                                            // label="상세주소"
                                            variant={variant}
                                            size={fieldSize}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div>
                                        {/*// 10. 이메일 인증*/}
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div>
                                        <Button
                                            variant="contained"
                                            size={buttonSize}
                                            onClick={handleCancel}
                                            // startIcon={<ClearIcon/>}
                                        >
                                            취소
                                        </Button>
                                        <Button
                                            className={classes.margin}
                                            variant="contained"
                                            color="primary"
                                            onClick={handleFinish}
                                            size={buttonSize}
                                            endIcon={<SendIcon/>}
                                        >
                                            전송
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </form>
                    </CardBody>
                </Card>
            </Col>
        </Dialog>
    );
};

export default RegisterUserPage;
