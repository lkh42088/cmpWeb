import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    Card, CardBody, Col,
} from "reactstrap";
import SendIcon from '@material-ui/icons/Send';
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from "prop-types";
import {Button} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SearchIcon from '@material-ui/icons/Search';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import BusinessIcon from '@material-ui/icons/Business';
import {
    addCompany,
    changeCompanyRegisterField,
    checkCompanyRegisterField,
    checkDupCompany, initRegisterCompany,
} from "../../../../redux/actions/companiesActions";
import SearchZip from "./SearchZip";
import {
    changeUserRegisterField,
    checkDupUser,
    checkUserRegisterField, initRegisterUser,
    registerUser,
} from "../../../../redux/actions/usersActions";
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

const renderCbTextField = ({
 input, label, meta: { touched, error }, children, select,
}) => {
    const [variant, setVariant] = useState("filled");

    useEffect(() => {
        if (input.variant !== null && input.variant !== "") {
            setVariant(input.variant);
        }
    }, []);

    const onChange = (e) => {
        e.preventDefault();
        // input.onChange({name: input.name, value: e.target.value});
        input.onChange(e);
    };
    return (
        <TextField
            className="material-form__field"
            label={label}
            error={touched && error}
            value={input.value}
            name={input.name}
            select={select}
            onChange={onChange}
            variant="filled"
        >
            {children}
        </TextField>
    );
};

renderCbTextField.propTypes = {
    input: PropTypes.shape().isRequired,
    label: PropTypes.string,
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.string,
    }),
    select: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.element),
};

renderCbTextField.defaultProps = {
    label: '',
    meta: null,
    select: false,
    children: [],
};

const RegisterCompanyPage = (props) => {
    /************************************************************************************
     * Variable
     ************************************************************************************/
    const classes = useStyles();
    const dispatch = useDispatch();
    const {
        isError,
        required,
        helperText,
        disabled,
        /** message */
        checkCompany,
        confirmCompany,
        cpMsg,
        cpMsgError,
        /** register */
        company,
        cpName,
        cpZip,
        cpAddr,
        cpAddrDetail,
        cpHomepage,
        cpEmail,
        cpTel,
        cpMemo,
    } = useSelector(({ companiesRd }) => ({
        /** message */
        checkCompany: companiesRd.checkCompany,
        confirmCompany: companiesRd.confirmCompany,
        cpMsg: companiesRd.msg,
        cpMsgError: companiesRd.msgError,
        isError: companiesRd.isError,
        helperText: companiesRd.helperText,
        required: companiesRd.required,
        register: companiesRd.register,
        disabled: companiesRd.disabled,
        /** register */
        company: companiesRd.register,
        cpName: companiesRd.register.cpName,
        cpZip: companiesRd.register.cpZip,
        cpAddr: companiesRd.register.cpAddr,
        cpAddrDetail: companiesRd.register.cpAddrDetail,
        cpHomepage: companiesRd.register.cpHomepage,
        cpEmail: companiesRd.register.cpEmail,
        cpTel: companiesRd.register.cpTel,
        cpMemo: companiesRd.register.cpMemo,
    }));

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
    } = useSelector(({ usersRd, userRegisterRd }) => ({
        user: userRegisterRd.register,
        checkUser: userRegisterRd.checkUser,
        confirmUser: userRegisterRd.confirmUser,
        userIsError: userRegisterRd.isError,
        userRequired: userRegisterRd.required,
        userDisabled: userRegisterRd.disabled,
        userHelperText: userRegisterRd.helperText,
        /** register */
        userId: userRegisterRd.register.userId,
        userPassword: userRegisterRd.register.password,
    }));

    const {open, handleClose, handleSubmit } = props;

    /** cpName */
    const [nameButtonDisable, setNameButtonDisable] = useState(true);
    const [openZip, setOpenZip] = useState(false);

    const [values, setValues] = React.useState({
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
     * Function
     ************************************************************************************/
    const handleNameChange = (value) => {
        if (checkCompany === true) {
            dispatch(changeCompanyRegisterField({key: "checkCompany", value: false}));
            if (confirmCompany === true) {
                dispatch(changeCompanyRegisterField({key: "confirmCompany", value: false}));
            }
        }

        if (value.length === 0 && nameButtonDisable === false) {
            setNameButtonDisable(true);
        } else if (value.length !== 0 && nameButtonDisable === true) {
            setNameButtonDisable(false);
        }
    };

    const handleChangeUserTextField = ({name, value}) => {
        console.log("[handleChange] name: ", name, ", value: ", value);
        dispatch(changeUserRegisterField({key: name, value}));
    };

    const handleChangeTextField = ({name, value}) => {
        console.log("[handleChange] name: ", name, ", value: ", value);
        // dispatch(changeCompanyRegField({ key: name, value }));
        dispatch(changeCompanyRegisterField({ key: name, value }));
        if (name === "cpName") {
            handleNameChange(value);
        }
    };

    const handleChangeDateField = (date) => {
        console.log("[handleChange Date] date: ", date, ", type: ", typeof (date));
        console.log("date: ", date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getDay());
        dispatch(changeCompanyRegisterField({ key: "cpTerminationDate", value: date}));
    };

    const handleCheckDupCompany = () => {
        console.log("handleCheckDupCompany: ", cpName);
        if (cpName !== "") {
            dispatch(checkDupCompany({cpName}));
        }
    };

    const handleCancel = () => {
        console.log("handleCancel: ");
        dispatch(initRegisterCompany());
        dispatch(initRegisterUser());
        handleClose();
    };

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
            console.log("read company: success");
            return true;
        }
        console.log("read company: fail");
        return false;
    };

    const isReadyRegisterUser = () => {
        if (user.userId !== ""
            && user.password !== ""
            && checkUser
            && confirmUser
            && checkPasswordPattern(user.password)
        ) {
            console.log("read user: success");
            return true;
        }
        console.log("read user: fail");
        return false;
    };

    const handleFinish = () => {
        console.log("handleFinish: ");
        dispatch(checkCompanyRegisterField());
        dispatch(checkUserRegisterField());
        if (isReadyRegisterCompany() && isReadyRegisterUser()) {
            console.log("send add company");
            // dispatch(addCompany({
            //     cpName: company.cpName,
            //     cpZip: company.cpZip,
            //     cpAddr: company.cpAddr,
            //     cpAddrDetail: company.cpAddrDetail,
            //     cpHomepage: company.cpHomepage,
            //     cpTel: company.cpTel,
            //     cpEmail: company.cpEmail,
            //     cpIsCompany: company.cpIsCompany,
            //     cpMemo: company.cpMemo,
            //     cpTerminationDate: company.cpTerminationDate,
            //     userId,
            //     userPassword,
            // }));
            handleSubmit({
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
                userId,
                userPassword,
            });
            handleClose();
        }
    };

    /** Address ZIP */
    const handleOpenSearchZip = () => {
        setOpenZip(true);
    };

    const handleCloseSearchZip = () => {
        setOpenZip(false);
    };

    const handleCompleteZip = ({zip, address}) => {
        dispatch(changeCompanyRegisterField({ key: "cpZip", value: zip }));
        dispatch(changeCompanyRegisterField({ key: "cpAddr", value: address }));
    };

    const handleCheckDupUser = () => {
        if (userId !== "") {
            dispatch(checkDupUser({userId}));
        }
    };

    /************************************************************************************
     * useEffect
     ************************************************************************************/
    useEffect(() => {
        console.log("[useEffect] INIT");
    }, []);

    useEffect(() => {
    }, [cpMsg]);

    useEffect(() => {
        // handleClose();
    }, [cpMsgError]);

    console.log("Company Page..");

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
                            <Grid container spacing={1}>
                                <Grid item>
                                    <BusinessIcon/>
                                </Grid>
                                <Grid item>
                                    <h3 className="bold-text">고객사 등록</h3>
                                </Grid>
                        </Grid>
                    </div>
                        <form className={formClassName}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <div>
                                        <span className={labelClassName}>* 고객사 이름</span>
                                        <FormControl
                                            className={fieldClassName}
                                            size={fieldSize}
                                            error={isError.cpName}
                                        >
                                            {/*<InputLabel*/}
                                            {/*    htmlFor="standard-adornment-password"*/}
                                            {/*>고객사 이름</InputLabel>*/}
                                            <FilledInput
                                                required={required.cpName}
                                                disabled={disabled.cpName}
                                                name="cpName"
                                                value={cpName}
                                                onChange={(e) => { handleChangeTextField({name: "cpName", value: e.target.value}); }}
                                                endAdornment={(
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleCheckDupCompany}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {confirmCompany ? <CheckBoxOutlinedIcon/> : <CheckBoxOutlineBlankIcon/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )}
                                            />
                                            <FormHelperText id="component-helper-text">{helperText.cpName}</FormHelperText>
                                        </FormControl>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div>
                                        <span className={labelClassName}>* 전화번호</span>
                                        <TextField
                                            className={fieldClassName}
                                            error={isError.cpTel}
                                            required={required.cpTel}
                                            helperText={helperText.cpTel}
                                            disabled={disabled.cpTel}
                                            // label="전화번호"
                                            name="cpTel"
                                            value={cpTel}
                                            onChange={(e) => { handleChangeTextField({name: "cpTel", value: e.target.value}); }}
                                            variant={variant}
                                            size={fieldSize}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div>
                                        <span className={labelClassName}>* 이메일</span>
                                        <TextField
                                            className={fieldClassName}
                                            error={isError.cpEmail}
                                            required={required.cpEmail}
                                            helperText={helperText.cpEmail}
                                            disabled={disabled.cpEmail}
                                            // label="이메일"
                                            name="cpEmail"
                                            value={cpEmail}
                                            onChange={(e) => { handleChangeTextField({name: "cpEmail", value: e.target.value}); }}
                                            variant={variant}
                                            size={fieldSize}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div>
                                        <span className={labelClassName}>홈페이지</span>
                                        <TextField
                                            className={fieldClassName}
                                            error={isError.cpHomepage}
                                            required={required.cpHomepage}
                                            helperText={helperText.cpHomepage}
                                            disabled={disabled.cpHomepage}
                                            // label="홈페이지"
                                            name="cpHomepage"
                                            value={cpHomepage}
                                            onChange={(e) => { handleChangeTextField({name: "cpHomepage", value: e.target.value}); }}
                                            variant={variant}
                                            size={fieldSize}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div>
                                        <span className={labelClassName}>* 대표 계정 ID</span>
                                        <FormControl
                                            size={fieldSize}
                                            className={fieldClassName}
                                            error={userIsError.userId}
                                        >
                                            {/*<InputLabel*/}
                                            {/*    // className={fieldClassName}*/}
                                            {/*    htmlFor="standard-adornment-password"*/}
                                            {/*>계정 ID</InputLabel>*/}
                                            <FilledInput
                                                required={userRequired.userId}
                                                disabled={userDisabled.userId}
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
                                        <span className={labelClassName}>* 계정 암호</span>
                                        <FormControl
                                            size={fieldSize}
                                            className={fieldClassName}
                                            error={userIsError.password}
                                        >
                                            {/*<InputLabel*/}
                                            {/*    // className={fieldClassName}*/}
                                            {/*    htmlFor="standard-adornment-password"*/}
                                            {/*>Password</InputLabel>*/}
                                            <FilledInput
                                                required={userRequired.password}
                                                disabled={userDisabled.password}
                                                name="password"
                                                type={values.showPassword ? 'text' : 'password'}
                                                value={userPassword}
                                                onChange={(e) => { handleChangeUserTextField({name: "password", value: e.target.value}); }}
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
                                        <span className={labelClassName}>* 우편 번호</span>
                                        <FormControl
                                            size={fieldSize}
                                            className={fieldClassName}
                                            error={isError.cpZip}
                                        >
                                            {/*<InputLabel>우편 번호</InputLabel>*/}
                                            <FilledInput
                                                required={required.cpZip}
                                                disabled={disabled.cpZip}
                                                name="cpZip"
                                                value={cpZip}
                                                onChange={(e) => { handleChangeTextField({name: "cpZip", value: e.target.value}); }}
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
                                            <FormHelperText id="component-helper-text">{helperText.cpZip}</FormHelperText>
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
                                        <span className={labelClassName}>* 주소</span>
                                        <TextField
                                            className={fieldClassName}
                                            error={isError.cpAddr}
                                            required={required.cpAddr}
                                            helperText={helperText.cpAddr}
                                            disabled={disabled.cpAddr}
                                            // label="주소"
                                            name="cpAddr"
                                            value={cpAddr}
                                            onChange={(e) => { handleChangeTextField({name: "cpAddr", value: e.target.value}); }}
                                            variant={variant}
                                            size={fieldSize}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div>
                                        <span className={labelClassName}>* 상세주소</span>
                                        <TextField
                                            className={fieldClassName}
                                            error={isError.cpAddrDetail}
                                            required={required.cpAddrDetail}
                                            helperText={helperText.cpAddrDetail}
                                            disabled={disabled.cpAddrDetail}
                                            // label="상세주소"
                                            name="cpAddrDetail"
                                            value={cpAddrDetail}
                                            onChange={(e) => { handleChangeTextField({name: "cpAddrDetail", value: e.target.value}); }}
                                            variant={variant}
                                            size={fieldSize}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div/>
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

export default RegisterCompanyPage;
