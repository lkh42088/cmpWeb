import React, {useEffect, useState} from "react";
import {
    Card, CardBody, Col, Container, Row,
} from "reactstrap";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {Button} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import {makeStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ReactAvatar from "react-avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import {checkPasswordPattern} from "../../../../lib/utils/utils";
import {getCompanies, getUsersByCpIdx} from "../../../../lib/api/company";
import {checkDupUser} from "../../../../lib/api/users";
import LookupCompany from "./LookupCompany";
import LookupZipcode from "./LookupZipcode";

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
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    chip: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
        // height: 100,
        // maxHeight: 100,
    },
    paper: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
        // height: 100,
        // maxHeight: 100,
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

const UserRegisterDialog = (props) => {
    /************************************************************************************
     * Props
     ************************************************************************************/
    const {
        open, handleClose, handleSubmit,
    } = props;

    /************************************************************************************
     * Variable
     ************************************************************************************/
    const classes = useStyles();

    /*******************
     * Field
     *******************/
    const [fields, setFields] = useState({
        cpName: '',
        cpIdx: 0,
        id: '',
        password: '',
        name: '',
        email: '',
        cellPhone: '',
        level: '',
        userZip: '',
        userAddr: '',
        userAddrDetail: '',
        emailAuthValue: "0",
        emailAuthGroupList: [],
    });

    /*******************
     * Required
     *******************/
    const [requires, setRequireds] = useState({
        cpName: false,
        cpIdx: true,
        id: true,
        password: true,
        name: true,
        email: true,
        cellPhone: true,
        level: true,
        userZip: false,
        userAddr: false,
        userAddrDetail: false,
        emailAuthValue: false,
        emailAuthGroupList: false,
    });

    /*******************
     * HelperText
     *******************/
    const [helpers, setHelpers] = useState({
        cpName: '',
        cpIdx: '',
        id: '',
        password: '',
        name: '',
        email: '',
        cellPhone: '',
        level: '',
        userZip: '',
        userAddr: '',
        userAddrDetail: '',
        emailAuthValue: '',
        emailAuthGroupList: '',
    });

    /*******************
     * Error
     *******************/
    const [errors, setErrors] = useState({
        cpName: false,
        cpIdx: false,
        id: false,
        password: false,
        name: false,
        email: false,
        cellPhone: false,
        level: true,
        userZip: false,
        userAddr: false,
        userAddrDetail: false,
        emailAuthValue: false,
        emailAuthGroupList: false,
    });

    /*******************
     * Etc.
     *******************/
    const [companyList, setCompanyList] = useState([]);
    const [userList, setUserList] = useState([]);

    const [confirmUser, setConfirmUser] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [menuCompany, setMenuCompany] = useState(false);
    const [openZip, setOpenZip] = useState(false);
    const [openSearchCompany, setOpenSearchCompany] = useState(false);

    /************************************************************************************
     * Function
     ************************************************************************************/
    const dumpFields = () => {
        console.log("cpName: ", fields.cpName, fields.cpName.length);
        console.log("cpIdx: ", fields.cpIdx);
        console.log("id: ", fields.id, fields.id.length);
        console.log("name: ", fields.name, fields.name.length);
        console.log("password: ", fields.password, fields.password.length);
        console.log("confirmUser: ", confirmUser);
    };

    /*******************
     * Validation
     *******************/
    const checkValidation = () => {
        /** company */
        let errorCpIdx = false;
        let helperCpIdx = '';
        if (fields.cpIdx < 1) {
            errorCpIdx = true;
            helperCpIdx = "* 필수 입력사항입니다.";
        }

        /** id */
        let errorUserId = false;
        let helperUserId = '';
        if (fields.id.length < 1) {
            errorUserId = true;
            helperUserId = "* 필수 입력사항입니다.";
        } else if (!confirmUser) {
            errorUserId = true;
            helperUserId = "* 사용 가능한 ID 인지 확인하십시오.";
        }

        /** password */
        let errorPassword = false;
        let helperPassword = "* 영어 소문자, 숫자, 특수문자 포함 8~16 문자";
        if (fields.password.length < 0) {
            errorPassword = true;
            helperPassword = "* 영어 소문자, 숫자, 특수문자 포함 8~16 문자";
        } else if (!checkPasswordPattern(fields.password)) {
            errorPassword = true;
            helperPassword = "* 영어 소문자, 숫자, 특수문자 포함 8~16 문자";
        }

        /** name */
        let errorUsername = false;
        let helperUsername = '';
        if (fields.name.length < 1) {
            errorUsername = true;
            helperUsername = "* 필수 입력사항입니다.";
        }

        /** cellPhone */
        let helperCellPhone = '';
        let errorCellPhone = false;
        if (fields.cellPhone.length < 1) {
            errorCellPhone = true;
            helperCellPhone = "* 필수 입력사항입니다.";
        }

        /** email */
        let errorEmail = false;
        let helperEmail = '';
        if (fields.cellPhone.length < 1) {
            errorEmail = true;
            helperEmail = "* 필수 입력사항입니다.";
        }

        /** level */
        let errorLevel = false;
        let helperLevel = '';
        if (fields.level === '') {
            errorLevel = true;
            helperLevel = "* 필수 입력사항입니다.";
        }

        setErrors({
            ...errors,
            cpIdx: errorCpIdx,
            id: errorUserId > 0,
            password: errorPassword,
            name: errorUsername,
            email: errorEmail,
            cellPhone: errorCellPhone,
            level: errorLevel,
        });

        setHelpers({
            ...helpers,
            cpIdx: helperCpIdx,
            id: helperUserId,
            password: helperPassword,
            name: helperUsername,
            email: helperEmail,
            cellPhone: helperCellPhone,
            level: helperLevel,
        });

        return !(errorCpIdx || errorUserId || errorPassword);
    };

    /*******************
     * Close & Send
     *******************/
    const reset = () => {
        console.log("reset() ");
        setFields({
            cpName: '',
            cpIdx: 0,
            id: '',
            password: '',
            name: '',
            email: '',
            cellPhone: '',
            level: '',
            userZip: '',
            userAddr: '',
            userAddrDetail: '',
            emailAuthValue: "0",
            emailAuthGroupList: [],
        });
        setHelpers({
            cpName: '',
            cpIdx: '',
            id: '',
            password: '',
            name: '',
            email: '',
            cellPhone: '',
            level: '',
            userZip: '',
            userAddr: '',
            userAddrDetail: '',
            emailAuthValue: '',
            emailAuthGroupList: '',
        });
        setErrors({
            cpName: false,
            cpIdx: false,
            id: false,
            password: false,
            name: false,
            email: false,
            cellPhone: false,
            level: true,
            userZip: false,
            userAddr: false,
            userAddrDetail: false,
            emailAuthValue: false,
            emailAuthGroupList: false,
        });
    };

    const handleCancel = () => {
        console.log("handleCancel() ");
        reset();
        handleClose();
    };

    const handleSubmitInternal = () => {
        console.log("handleSubmitInternal() fields", fields);
        if (!checkValidation()) {
            console.log("handleSubmitInternal() failed");
            return;
        }
        console.log("handleSubmitInternal() success");
        handleSubmit(fields);
    };

    /*******************
     * Axios
     *******************/
    const checkUser = async () => {
        try {
            const response = await checkDupUser({userId: fields.id});
            setConfirmUser(true);
            setErrors({
                ...errors,
                id: false,
            });
            console.log("checkUser: success", response.data);
            setHelpers({
                ...helpers,
                id: "* 사용 가능한 ID 입니다.",
            });
        } catch (error) {
            console.log("checkUser: error ", error);
            setConfirmUser(false);
            setErrors({
                ...errors,
                id: true,
            });
            setHelpers({
                ...helpers,
                id: "* 이미 존재하는 ID 입니다.",
            });
        }
    };

    const getCompanyList = async () => {
        console.log("getCompanyList()-----------------------");
        try {
            const response = await getCompanies();
            console.log("getCompanyList() data: ", response.data);
            setCompanyList(response.data);
        } catch (error) {
            setCompanyList([]);
        }
    };

    const getUserList = async (cpIdx) => {
        console.log("getUserList()-----------------------");
        try {
            const response = await getUsersByCpIdx({cpIdx});
            console.log("getUserList() data: ", response.data);
            setUserList(response.data);
        } catch (error) {
            setUserList([]);
        }
    };

    const handleCheckUser = () => {
        console.log("handleCheckUser: ");
        checkUser();
    };

    /*******************
     * Open
     *******************/
    const handleMenuCompany = () => {
        if (companyList.length === 0) {
            getCompanyList();
        }
        setMenuCompany(!menuCompany);
    };

    const handleOpenSearchZip = () => {
        setOpenZip(true);
    };

    const handleCloseSearchZip = () => {
        setOpenZip(false);
    };

    const handleCompleteZip = (zip, address) => {
        console.log("handleCompleteZip() ", zip, address);
        setFields({
            ...fields,
            userZip: zip,
            userAddr: address,
        });
    };

    const handleOpenSearchCompany = () => {
        setOpenSearchCompany(true);
    };

    const handleCloseSearchCompany = () => {
        setOpenSearchCompany(false);
    };


    /*******************
     * Change
     *******************/
    const handleChangeField = (name, value) => {
        setFields({
            ...fields,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: false,
        });
        setHelpers({
            ...helpers,
            [name]: "",
        });
        if (name === "id") {
            setConfirmUser(false);
        }
        if (name === "cpIdx") {
            getUserList(value);
        }
    };

    /*******************
     * Event
     *******************/
    const handleClickShowPassword = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickEmailAuthUser = (user) => {
        setFields({
            ...fields,
            emailAuthGroupList: fields.emailAuthGroupList.concat(user),
        });
        setUserList(userList.filter(item => item.idx !== user.idx));
    };

    const handleDeleteEmailAuthGroupItem = (user) => {
        setFields({
            ...fields,
            emailAuthGroupList: fields.emailAuthGroupList.filter(item => item.idx !== user.idx),
        });
        setUserList(userList.concat(user));
    };

    const handleCompleteSearchCompany = (idx, name) => {
        console.log("handleCompleteSearchCompany: ", idx, name);
        handleChangeField("cpIdx", idx);
    };

    /*******************
     * useEffect
     *******************/
    useEffect(() => {
        if (companyList.length === 0) {
            getCompanyList();
        }
    });

    /************************************************************************************
     * JSX Template
     ************************************************************************************/
    const variant = "filled";
    const fieldSize = "small";
    const buttonSize = "large";
    const formClassName = "cb-material-form";
    const labelClassName = "cb-material-form__label";
    const fieldClassName = "cb-material-form__field";
    return (
        <Dialog
            open={open}
        >
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
                                        error={errors.cpIdx}
                                    >
                                        <Select
                                            required={requires.cpIdx}
                                            name="cpIdx"
                                            value={fields.cpIdx}
                                            error={errors.cpIdx}
                                            onChange={(e) => { handleChangeField("cpIdx", e.target.value); }}
                                            onClick={handleMenuCompany}
                                            MenuProps={MenuProps}
                                        >
                                            <MenuItem key={0} value={0}>
                                                <em>None</em>
                                            </MenuItem>
                                            {companyList && companyList.map(item => (
                                                <MenuItem key={item.idx} value={item.idx}>{item.name}</MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText>{helpers.cpIdx}</FormHelperText>
                                        <LookupCompany
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
                                    {/* 2. 아이디 */}
                                    <span className={labelClassName}>* 계정 ID</span>
                                    <FormControl
                                        size={fieldSize}
                                        className={fieldClassName}
                                        error={errors.id}
                                    >
                                        <FilledInput
                                            required={requires.id}
                                            error={errors.id}
                                            name="id"
                                            value={fields.id}
                                            onChange={(e) => { handleChangeField("id", e.target.value); }}
                                            endAdornment={(
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleCheckUser}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {confirmUser ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            )}
                                        />
                                        <FormHelperText>{helpers.id}</FormHelperText>
                                    </FormControl>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div>
                                    {/* 3. 패스워드 */}
                                    <span className={labelClassName}>* 계정 암호</span>
                                    <FormControl
                                        size={fieldSize}
                                        className={fieldClassName}
                                        error={errors.password}
                                    >
                                        <FilledInput
                                            required={requires.password}
                                            name="password"
                                            value={fields.password}
                                            onChange={(e) => { handleChangeField("password", e.target.value); }}
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={(
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )}
                                        />
                                        <FormHelperText>{helpers.password}</FormHelperText>
                                    </FormControl>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div>
                                    {/* 4. 이름*/}
                                    <span className={labelClassName}>* 이름</span>
                                    <TextField
                                        className={fieldClassName}
                                        error={errors.name}
                                        required={requires.name}
                                        helperText={helpers.name}
                                        name="name"
                                        value={fields.name}
                                        onChange={(e) => { handleChangeField("name", e.target.value); }}
                                        // label="이름"
                                        variant={variant}
                                        size={fieldSize}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div>
                                    {/* 5. 이메일*/}
                                    <span className={labelClassName}>* 이메일</span>
                                    <TextField
                                        className={fieldClassName}
                                        error={errors.email}
                                        required={requires.email}
                                        helperText={helpers.email}
                                        name="email"
                                        value={fields.email}
                                        onChange={(e) => { handleChangeField("email", e.target.value); }}
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
                                        error={errors.cellPhone}
                                        required={requires.cellPhone}
                                        helperText={helpers.cellPhone}
                                        name="cellPhone"
                                        value={fields.cellPhone}
                                        onChange={(e) => { handleChangeField("cellPhone", e.target.value); }}
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
                                        error={errors.level}
                                        // required={requires.level}
                                        helperText={helpers.level}
                                        name="level"
                                        value={fields.level}
                                        onChange={(e) => { handleChangeField("level", e.target.value); }}
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
                                        error={errors.userZip}
                                        required={requires.userZip}
                                        size={fieldSize}
                                        className={fieldClassName}
                                    >
                                        {/*<InputLabel>우편 번호</InputLabel>*/}
                                        <FilledInput
                                            name="userZip"
                                            value={fields.userZip}
                                            disabled
                                            onChange={(e) => { handleChangeField("userZip", e.target.value); }}
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
                                        <FormHelperText>{helpers.cpZip}</FormHelperText>
                                    </FormControl>
                                    <LookupZipcode
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
                                        error={errors.userAddr}
                                        disabled
                                        required={requires.userAddr}
                                        helperText={helpers.userAddr}
                                        name="userAddr"
                                        value={fields.userAddr}
                                        onChange={(e) => { handleChangeField("userAddr", e.target.value); }}
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
                                        error={errors.userAddrDetail}
                                        required={requires.userAddrDetail}
                                        helperText={helpers.userAddrDetail}
                                        name="userAddrDetail"
                                        value={fields.userAddrDetail}
                                        onChange={(e) => { handleChangeField("userAddrDetail", e.target.value); }}
                                        // label="상세주소"
                                        variant={variant}
                                        size={fieldSize}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div>
                                    {/*// 10. 이메일 인증*/}
                                    <span className={labelClassName}>이메일 인증</span>
                                    <FormControl
                                        size={fieldSize}
                                        className={fieldClassName}
                                        variant="filled"
                                        error={errors.emailAuthValue}
                                    >
                                        <Select
                                            required={errors.emailAuthValue}
                                            disabled={errors.emailAuthValue}
                                            name="emailAuthValue"
                                            value={fields.emailAuthValue}
                                            onChange={(e) => { handleChangeField("emailAuthValue", e.target.value); }}
                                            // onClick={handleClickCompanyMenu}
                                            MenuProps={MenuProps}
                                        >
                                            <MenuItem key={0} value="0">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem key={1} value="1">개인 이메일 인증</MenuItem>
                                            <MenuItem key={2} value="2">그룹 이메일 인증</MenuItem>
                                        </Select>
                                        <FormHelperText>{helpers.emailAuthValue}</FormHelperText>
                                    </FormControl>
                                </div>
                            </Grid>
                            {
                                fields.emailAuthValue === 2 ? (
                                    <React.Fragment>
                                        <Grid item xs={6}>
                                            <div>
                                                {/*// 10. 그룹 이메일 인증*/}
                                                <span className={labelClassName}>그룹 이메일 인증: 사용자 선택</span>
                                                <FormControl
                                                    size={fieldSize}
                                                    className={fieldClassName}
                                                    variant="filled"
                                                >
                                                    <Select>
                                                        <List className={classes.list}>
                                                            {userList && userList.map(item => (
                                                                <ListItem button onClick={() => { handleClickEmailAuthUser(item); }}>
                                                                    <ListItemAvatar>
                                                                        <ReactAvatar className="topbar__avatar-img-list" name={item.id} size={40} />
                                                                    </ListItemAvatar>
                                                                    <ListItemText primary={item.name} secondary={item.email} />
                                                                </ListItem>
                                                            ))}
                                                        </List>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </Grid>
                                        {
                                            fields.emailAuthGroupList.length > 0 ? (
                                                <React.Fragment>
                                                    <Grid item xs={12}>
                                                        <Paper className={classes.paper} variant="outlined" />
                                                        { fields.emailAuthGroupList && fields.emailAuthGroupList.map(item => (
                                                            <Chip
                                                                variant="outlined"
                                                                size="small"
                                                                avatar={<Avatar alt={item.id} src="/static/images/avatar/1.jpg" />}
                                                                label={item.email}
                                                                onDelete={() => { handleDeleteEmailAuthGroupItem(item); }}
                                                            />
                                                        ))}
                                                        <Paper variant="outlined" square />
                                                    </Grid>
                                                </React.Fragment>
                                            ) : (<React.Fragment/>)
                                        }
                                    </React.Fragment>
                                ) : (<React.Fragment/>)
                            }
                            <Grid item xs={12}>
                                <div>
                                    <Button
                                        variant="contained"
                                        size={buttonSize}
                                        onClick={handleCancel}
                                    >
                                        취소
                                    </Button>
                                    <Button
                                        className={classes.margin}
                                        variant="contained"
                                        color="primary"
                                        size={buttonSize}
                                        onClick={handleSubmitInternal}
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
        </Dialog>
    );
};

export default UserRegisterDialog;
