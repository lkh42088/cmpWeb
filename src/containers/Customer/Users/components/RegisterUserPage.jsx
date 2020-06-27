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
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
    changeUserField,
    checkDupUser,
    checkUserRegisterField,
    initRegisterUser, registerUser,
} from "../../../../redux/actions/usersActions";
import SearchZip from "../../Company/components/SearchZip";
import {checkPasswordPattern} from "../../../../lib/utils/utils";
import SearchCompany from "./SearchCompany";
import {clearCompanySearch, getCompanies} from "../../../../redux/actions/companiesActions";

const options = [
    'None',
    'Atria',
    'Callisto',
    'Dione',
    'Ganymede',
    'Hangouts Call',
    'Luna',
    'Oberon',
    'Phobos',
    'Pyxis',
    'Sedna',
    'Titania',
    'Triton',
    'Umbriel',
];

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const RegisterUserPage = (props) => {
    /************************************************************************************
     * Variable
     ************************************************************************************/
    const classes = useStyles();
    const {open, handleClose, handleStrictlyClose } = props;
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
        cpName,
        cpIdx,
        userId,
        userPassword,
        /** company menu */
        companyList,
        companyMsgError,
    } = useSelector(({ usersRd, companiesRd}) => ({
        user: usersRd.register,
        checkUser: usersRd.checkUser,
        confirmUser: usersRd.confirmUser,
        userIsError: usersRd.isError,
        userRequired: usersRd.required,
        userDisabled: usersRd.disabled,
        userHelperText: usersRd.helperText,
        /** register */
        cpName: usersRd.register.cpName,
        cpIdx: usersRd.register.cpIdx,
        userId: usersRd.register.userId,
        userPassword: usersRd.register.password,
        companyList: companiesRd.allList.msg,
        companyMsgError: companiesRd.allList.msgError,
    }));
    const [openZip, setOpenZip] = useState(false);
    const [openSearchCompany, setOpenSearchCompany] = useState(false);
    const [values, setValues] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const [openMenu, setOpenMenu] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleClickCompanyMenu = () => {
        setOpenMenu(prevOpen => !prevOpen);
    };

    const handleCloseCompanyMenu = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpenMenu(false);
    };

    function handleCompanyMenuKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpenMenu(false);
        }
    }

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
    const handleDialogClose = () => {
        handleClose();
    };

    const handleChangeUserTextField = ({name, value}) => {
        console.log("[handleChange] name: ", name, ", value: ", value);
        dispatch(changeUserField({key: name, value}));
    };

    const handleOpenSearchCompany = () => {
        setOpenMenu(false);
        dispatch(clearCompanySearch());
        setOpenSearchCompany(true);
    };

    const handleCloseSearchCompany = () => {
        setOpenSearchCompany(false);
    };

    const handleCompleteSearchCompany = ({idx, name}) => {
        handleChangeUserTextField({name: "cpIdx", value: idx});
        console.log("handleCompleteSearchCompany: name ", name, ", idx ", idx);
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
        handleDialogClose();
    };

    const isReadyRegisterUser = () => {
        if (user.userId !== ""
            && user.password !== ""
            && user.email !== ""
            && user.username !== ""
            && user.cellPhone !== ""
            && (cpIdx > 0)
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
                cpIdx,
                userId: user.userId,
                password: user.password,
                username: user.username,
                email: user.email,
                emailAuthFlag: user.emailAuthFlag,
                emailAuthGroupFlag: user.emailAuthGroupFlag,
                emailAuthGroupList: user.emailAuthGroupList,
            }));
            handleDialogClose();
        }
    };


    /************************************************************************************
     * useEffect
     ************************************************************************************/
    useEffect(() => {
        if (companyList === null) {
            console.log("useEffect[]: getCompanyMsg()");
           dispatch(getCompanies());
        }
    }, []);

    useEffect(() => {
        if (companyList) {
           console.log("useEffect[companyList]: companyList: ", companyList);
        }
    }, [companyList]);

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
            onClose={handleDialogClose}
            open={open}
        >
            <Col xs={8} md={12} lg={12}>
                <Card>
                    <CardBody>
                        <div className="card__title">
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <AccountCircleIcon/>
                                    </Grid>
                                    <Grid item>
                                        <h3 className="bold-text">계정 등록</h3>
                                    </Grid>
                                </Grid>
                        </div>
                        <form className={formClassName}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <div>
                                        {/*1. 회사 */}
                                        <span className={labelClassName}>* 회사</span>
                                        <FormControl
                                            size={fieldSize}
                                            className={fieldClassName}
                                            variant="filled"
                                            error={userIsError.cpIdx}
                                        >
                                            <Select
                                                required={userRequired.cpIdx}
                                                disabled={userDisabled.cpIdx}
                                                name="cpIdx"
                                                value={cpIdx}
                                                onChange={(e) => { handleChangeUserTextField({name: "cpIdx", value: e.target.value}); }}
                                                onClick={handleClickCompanyMenu}
                                                MenuProps={MenuProps}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {companyList && companyList.map(item => (
                                                    <MenuItem value={item.idx}>{item.name}</MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText>{userHelperText.cpIdx}</FormHelperText>
                                            <SearchCompany
                                                open={openSearchCompany}
                                                handleClose={handleCloseSearchCompany}
                                                handleComplete={handleCompleteSearchCompany}
                                            />
                                        </FormControl>
                                    </div>
                                </Grid>
                                <Grid item xs={2}>
                                    <span className={labelClassName}/>
                                    <Button
                                        className={classes.margin}
                                        variant="contained"
                                        color="primary"
                                        onClick={handleOpenSearchCompany}
                                        size={buttonSize}
                                        endIcon={<SearchIcon/>}
                                        style={{
                                            maxWidth: '100px',
                                            maxHeight: '45px',
                                            minWidth: '100px',
                                            minHeight: '45px',
                                            margin: '20px 0px 0px 0px',
                                        }}
                                    >
                                        검색
                                    </Button>
                                </Grid>
                                <Grid item xs={4}>
                                    <div/>
                                </Grid>
                                <Grid item xs={6}>
                                    <div>
                                         {/*1. 아이디*/}
                                        <span className={labelClassName}>* 계정 ID</span>
                                        <FormControl
                                            size={fieldSize}
                                            className={fieldClassName}
                                            error={userIsError.userId}
                                        >
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
                                            <FormHelperText>{userHelperText.userId}</FormHelperText>
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
                                            error={userIsError.password}
                                        >
                                            <FilledInput
                                                required={userRequired.password}
                                                disabled={userDisabled.password}
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
                                            <FormHelperText>{userHelperText.password}</FormHelperText>
                                        </FormControl>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div>
                                        {/*// 3. 이름*/}
                                        <span className={labelClassName}>* 이름</span>
                                        <TextField
                                            className={fieldClassName}
                                            error={userIsError.username}
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
                                            error={userIsError.email}
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
                                            error={userIsError.cellPhone}
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
                                            error={userIsError.level}
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
                                            error={userIsError.userZip}
                                            required={userRequired.userZip}
                                            disabled={userDisabled.userZip}
                                            size={fieldSize}
                                            className={fieldClassName}
                                        >
                                            {/*<InputLabel>우편 번호</InputLabel>*/}
                                            <FilledInput
                                                name="userZip"
                                                value={user.userZip}
                                                onChange={(e) => { handleChangeUserTextField({name: "userZip", value: e.target.value}); }}
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
                                            <FormHelperText>{userHelperText.cpZip}</FormHelperText>
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
                                            error={userIsError.userAddr}
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
                                            error={userIsError.userAddrDetail}
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
