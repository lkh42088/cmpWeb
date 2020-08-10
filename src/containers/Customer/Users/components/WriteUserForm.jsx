import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import {Button} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import TextField from "@material-ui/core/TextField";
import React, {useEffect, useState} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ReactAvatar from "react-avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import SendIcon from "@material-ui/icons/Send";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from "@material-ui/core/styles";

import moment from "moment";
import ImageUploader from 'react-images-upload';

import {checkId, checkPasswordPattern} from "../../../../lib/utils/utils";
import {checkDuplicateUser, getAuthList} from "../../../../lib/api/users";
import {getCompanies, getUsersByCpIdx} from "../../../../lib/api/company";
import LookupCompany from "../../../Common/LookupCompany";
import LookupZipcode from "../../../Common/LookupZipcode";
import ChangePasswordDialog from "../../Company/components/ChangePasswordDialog";

import {API_ROUTE, API_ROUTE_SERVER_IMAGE} from "../../../../lib/api/client";

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
    },
    paper: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
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

const WriteUserForm = (props) => {
    // const upload = multer({ dest: 'uploads/' });
    // console.log("?? : ", upload);
    /************************************************************************************
     * Props
     ************************************************************************************/
    const {
        handleClose, handleSubmit, isRegister, data,
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
        tel: '',
        level: '',
        userZip: '',
        userAddr: '',
        userAddrDetail: '',
        emailAuthValue: "0",
        emailAuthGroupList: [],
        memo: '',
        avata: '',
        avataFile: '',
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
        tel: false,
        level: true,
        userZip: false,
        userAddr: false,
        userAddrDetail: false,
        emailAuthValue: false,
        emailAuthGroupList: false,
        memo: false,
    });

    /*******************
     * Disable
     *******************/
    const [disables, setDisables] = useState({
        cpName: false,
        cpIdx: false,
        id: false,
        password: false,
        name: false,
        email: false,
        cellPhone: false,
        tel: false,
        level: false,
        userZip: true,
        userAddr: true,
        userAddrDetail: false,
        emailAuthValue: false,
        emailAuthGroupList: false,
        memo: false,
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
        tel: '',
        level: '',
        userZip: '',
        userAddr: '',
        userAddrDetail: '',
        emailAuthValue: '',
        emailAuthGroupList: '',
        memo: '',
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
        tel: false,
        level: false,
        userZip: false,
        userAddr: false,
        userAddrDetail: false,
        emailAuthValue: false,
        emailAuthGroupList: false,
        memo: false,
    });

    /*******************
     * IMAGE AVATA
     *******************/
    const [pictures, setPictures] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

    /*******************
     * Etc.
     *******************/
    const [companyList, setCompanyList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [authList, setAuthList] = useState([]);

    const [confirmUser, setConfirmUser] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [menuCompany, setMenuCompany] = useState(false);
    const [openZip, setOpenZip] = useState(false);
    const [openSearchCompany, setOpenSearchCompany] = useState(false);
    const [passwordGridSize, setPasswordGridSize] = useState(6);
    const [openChangePassword, setOpenChangePassword] = useState(false);

    /************************************************************************************
     * Function
     ************************************************************************************/
    const onDrop = (pictureFiles, pictureBase64) => {
        // picutreFiles에 boundery 정보가 return 되고,
        // pictureBase64 에 base64 정보가 return 된다. 기본 array로 return

        console.log("pictureFiles : ", pictureFiles);
        // 여기에 ajax를 넣을 수 있다.
    };

    const fileChangedHandler = (event) => {
        setSelectedFile(event.target.files[0]);

        const reader = new FileReader();
        const fd = new FormData();

        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        };

        reader.readAsDataURL(event.target.files[0]);
        const imgName = moment(new Date())
            .format("DDhhmmss") + event.target.files[0].name;

        fd.append('file', event.target.files[0], imgName);

        console.log("fileChangedHandler fd : ", fd);

        setFields({
            ...fields,
            avata: imgName,
            avataFile: fd,
        });
    };

    const dumpFields = () => {
        console.log("cpName: ", fields.cpName, fields.cpName.length);
        console.log("cpIdx: ", fields.cpIdx);
        console.log("id: ", fields.id, fields.id.length);
        console.log("name: ", fields.name, fields.name.length);
        console.log("password: ", fields.password, fields.password.length);
        console.log("confirmUser: ", confirmUser);
    };

    const checkValidateId = (id) => {
        // eslint-disable-next-line no-useless-escape
        let helperUserId = "";
        helperUserId = checkId(id);
        if (helperUserId !== "") {
            return helperUserId;
        }
        if (!confirmUser) {
            helperUserId = "* 사용 가능한 ID 인지 확인하십시오.";
        }

        return helperUserId;
    };

    const avataDelete = (division) => {
        if (division === 'web') {
            setImagePreviewUrl(null);
            setFields({
                ...fields,
                avata: "",
                avataFile: "",
            });
        } else if (division === 'server') {
            setFields({
                ...fields,
                avata: "",
                avataFile: "",
            });
        }
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
        let helperUserId = "";
        helperUserId = checkValidateId(fields.id);
        if (helperUserId !== "") {
            errorUserId = true;
        }

        /** password */
        let errorPassword = false;
        let helperPassword = "";
        if (isRegister === true) {
            helperPassword = checkPasswordPattern(fields.password);
            if (helperPassword !== "") {
                errorPassword = true;
            }
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
            // eslint-disable-next-line no-useless-escape
        const checkEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
        let errorEmail = false;
        let helperEmail = '';
        if (fields.email.length < 1) {
            errorEmail = true;
            helperEmail = "* 필수 입력사항입니다.";
        } else if (!checkEmail.test(fields.email)) {
            errorEmail = true;
            helperEmail = "* 이메일을 올바르게 입력하십시오.";
        }

        /** level */
        let errorLevel = false;
        let helperLevel = '';
        if (fields.level.length < 1) {
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

        return !(errorCpIdx || errorUserId || errorPassword
            || errorUsername || errorCellPhone || errorEmail || errorLevel);
    };

    /*******************
     * Close & Send
     *******************/
    const reset = () => {
        // console.log("reset() ");
        setFields({
            cpName: '',
            cpIdx: 0,
            id: '',
            password: '',
            name: '',
            email: '',
            cellPhone: '',
            tel: '',
            level: '',
            userZip: '',
            userAddr: '',
            userAddrDetail: '',
            emailAuthValue: "0",
            emailAuthGroupList: [],
            memo: '',
            avata: '',
            avataFile: '',
        });
        setHelpers({
            cpName: '',
            cpIdx: '',
            id: '',
            password: '',
            name: '',
            email: '',
            cellPhone: '',
            tel: '',
            level: '',
            userZip: '',
            userAddr: '',
            userAddrDetail: '',
            emailAuthValue: '',
            emailAuthGroupList: '',
            memo: '',
            avata: '',
            avataFile: '',
        });
        setErrors({
            cpName: false,
            cpIdx: false,
            id: false,
            password: false,
            name: false,
            email: false,
            cellPhone: false,
            tel: false,
            level: false,
            userZip: false,
            userAddr: false,
            userAddrDetail: false,
            emailAuthValue: false,
            emailAuthGroupList: false,
            memo: false,
            avata: false,
            avataFile: false,
        });
        setShowPassword(false);
        setConfirmUser(false);
    };

    const handleCancel = () => {
        reset();
        handleClose();
    };

    const handleSubmitInternal = () => {
        if (!checkValidation()) {
            return;
        }

        //console.log("handleSubmitInternal avataFile : ", fields.avataFile);

        if (fields.avata !== null && fields.avata !== "") {
            const fd = new FormData();

            const imgName = fields.avata;

            fd.append('file', selectedFile, imgName);

            const request = new XMLHttpRequest();

            // eslint-disable-next-line func-names
            request.onreadystatechange = function () {
                // eslint-disable-next-line react/no-this-in-sfc
                if (this.readyState === 4 || this.status === 200) {
                    console.log("Uploaded !! ");
                }
            };

            request.open("POST", `${API_ROUTE}/users/fileUpload`, true);
            request.send(fd);

            //console.log("handleSubmitInternal fd : ", fd);
        }

        // todo image file db store
        /*console.log("handleSubmitInternal fields : ", fields);
        console.log("handleSubmitInternal avataFile : ", fields.avataFile);*/

        handleSubmit(fields);
        reset();
    };

    /*******************
     * Axios
     *******************/
    const checkUser = async () => {
        try {
            const response = await checkDuplicateUser({userId: fields.id});
            setConfirmUser(true);
            setErrors({
                ...errors,
                id: false,
            });
            // console.log("checkUser: success", response.data);
            setHelpers({
                ...helpers,
                id: "* 사용 가능한 ID 입니다.",
            });
        } catch (error) {
            // console.log("checkUser: error ", error);
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
        try {
            const response = await getCompanies();
            setCompanyList(response.data);
        } catch (error) {
            setCompanyList([]);
        }
    };

    const getUserList = async (cpIdx) => {
        try {
            const response = await getUsersByCpIdx({cpIdx});
            setUserList(response.data);
        } catch (error) {
            setUserList([]);
        }
    };

    const handleClickCheckUser = () => {
        if (isRegister === false) {
            return;
        }
        const res = checkId(fields.id);
        if (res !== "") {
            setErrors({
                ...errors,
                id: true,
            });
            setHelpers({
                ...helpers,
                id: res,
            });
            return;
        }
        checkUser();
    };

    const getAuth = async () => {
        try {
            const response = await getAuthList();
            setAuthList(response.data);
        } catch (error) {
            setAuthList([]);
        }
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
        // console.log("handleCompleteZip() ", zip, address);
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
    const handleOpenChangePassword = () => {
        setOpenChangePassword(true);
    };

    const handleCloseChangePassword = () => {
        setOpenChangePassword(false);
    };

    const handleCompleteChangePassword = (res) => {
        setOpenChangePassword(false);
        // console.log("change password: ", res);
        setFields({
            ...fields,
            password: res,
        });
    };

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
        // console.log("handleCompleteSearchCompany: ", idx, name);
        handleChangeField("cpIdx", idx);
    };

    /*******************
     * useEffect
     *******************/
    useEffect(() => {
        if (companyList.length === 0) {
            getCompanyList();
        }
        if (isRegister === false) {
            let eva = '0';
            if (data.emailAuth) {
                eva = '1';
            } else if (data.groupEmailAuth) {
                eva = '2';
            }
            setFields({
                ...fields,
                cpName: data.cpName,
                cpIdx: data.companyIdx,
                id: data.userId,
                name: data.name,
                email: data.email,
                cellPhone: data.hp,
                tel: data.tel,
                level: data.authLevel,
                userZip: data.zipcode,
                userAddr: data.address,
                userAddrDetail: data.addressDetail,
                emailAuthValue: eva,
                // emailAuthGroupList: [],
                memo: data.memo,
                avata: data.avata,
                avataFile: data.avataFile,
            });
            setDisables({
                ...disables,
                cpName: true,
                cpIdx: true,
                id: true,
                password: true,
            });
            setConfirmUser(true);
            setPasswordGridSize(4);
        }

        //Auth
        getAuth();
    }, []);

    /************************************************************************************
     * JSX Template
     ************************************************************************************/
    const variant = "filled";
    const fieldSize = "small";
    const buttonSize = "large";
    const formClassName = "cb-material-form";
    const labelClassName = "cb-material-form__label";
    const fieldClassName = "cb-material-form__field";
    // console.log("RegisterUserPage...");
    // encType="multipart/form-data"

    let $imagePreview = (
        <div className="previewText image-container">Please select an Image for Preview</div>
    );
    if (imagePreviewUrl) {
        $imagePreview = (
            <div className="profile__avatar">
                <div
                    style={{
                        width: "inherit",
                        textAlign: "end",
                        position: "absolute",
                    }}
                >
                    <CloseIcon
                        role="button" tabIndex="0"
                        onClick={event => avataDelete('web')}
                        onKeyDown={event => avataDelete('web')}
                    />
                </div>
                <Avatar
                    className="topbar__avatar-img-list"
                    name="img"
                    size="120"
                    src={imagePreviewUrl}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                />
            </div>
        );
    }

    return (
        <React.Fragment>
            <form className={formClassName} encType="multipart/form-data">
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>* 회사</span>
                            <FormControl
                                size={fieldSize}
                                className={fieldClassName}
                                variant="filled"
                                error={errors.cpIdx}
                                disabled={disables.cpIdx}>
                                <Select
                                    required={requires.cpIdx}
                                    name="cpIdx"
                                    value={fields.cpIdx}
                                    error={errors.cpIdx}
                                    onChange={(e) => {
                                        handleChangeField("cpIdx", e.target.value);
                                    }}
                                    onClick={handleMenuCompany}
                                    MenuProps={MenuProps}>
                                    <MenuItem key={0} value={0}>
                                        <em>None</em>
                                    </MenuItem>
                                    {companyList && companyList.map((item, index) => {
                                        const key = index;
                                        return (
                                            <MenuItem key={key} value={item.idx}>{item.name}</MenuItem>
                                        );
                                    })}
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
                            disabled={disables.cpIdx}
                            className={classes.margin}
                            variant="contained"
                            color="primary"
                            onClick={handleOpenSearchCompany}
                            size={buttonSize}
                            endIcon={<SearchIcon/>}
                            style={{
                                maxWidth: '105px',
                                maxHeight: '45px',
                                minWidth: '105px',
                                minHeight: '45px',
                                margin: '20px 0px 0px 0px',
                            }}>
                            검색
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <div/>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>* 계정 ID</span>
                            <FormControl
                                size={fieldSize}
                                className={fieldClassName}
                                error={errors.id}
                                disabled={disables.id}
                            >
                                <FilledInput
                                    disabled={disables.id}
                                    required={requires.id}
                                    error={errors.id}
                                    name="id"
                                    value={fields.id}
                                    onChange={(e) => {
                                        handleChangeField("id", e.target.value);
                                    }}
                                    endAdornment={(
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickCheckUser}
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
                    <Grid item xs={passwordGridSize}>
                        <div>
                            <span className={labelClassName}>* 계정 암호</span>
                            <FormControl
                                size={fieldSize}
                                className={fieldClassName}
                                error={errors.password}
                                disabled={disables.password}
                            >
                                <FilledInput
                                    disabled={disables.password}
                                    required={requires.password}
                                    name="password"
                                    value={fields.password}
                                    onChange={(e) => {
                                        handleChangeField("password", e.target.value);
                                    }}
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={(
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    )}
                                />
                                <FormHelperText>{helpers.password}</FormHelperText>
                            </FormControl>
                        </div>
                    </Grid>
                    {
                        isRegister === false ? (
                            <React.Fragment>
                                <Grid item xs={2}>
                                    <Button
                                        className={classes.margin}
                                        variant="contained"
                                        color="primary"
                                        onClick={handleOpenChangePassword}
                                        size={buttonSize}
                                        // endIcon={<SearchIcon/>}
                                        style={{
                                            maxWidth: '80px',
                                            maxHeight: '45px',
                                            minWidth: '80px',
                                            minHeight: '45px',
                                            margin: '20px 0px 0px 0px',
                                        }}
                                    >
                                        변경
                                    </Button>
                                </Grid>
                                <ChangePasswordDialog
                                    userId={fields.userId}
                                    open={openChangePassword}
                                    handleClose={handleCloseChangePassword}
                                    handleComplete={handleCompleteChangePassword}
                                />
                            </React.Fragment>
                        ) : <React.Fragment/>
                    }
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>* 이름</span>
                            <TextField
                                className={fieldClassName}
                                error={errors.name}
                                required={requires.name}
                                disabled={disables.name}
                                helperText={helpers.name}
                                name="name"
                                value={fields.name}
                                onChange={(e) => {
                                    handleChangeField("name", e.target.value);
                                }}
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
                                error={errors.email}
                                required={requires.email}
                                disabled={disables.email}
                                helperText={helpers.email}
                                name="email"
                                value={fields.email}
                                onChange={(e) => {
                                    handleChangeField("email", e.target.value);
                                }}
                                variant={variant}
                                size={fieldSize}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>* 휴대폰번호</span>
                            <TextField
                                className={fieldClassName}
                                error={errors.cellPhone}
                                required={requires.cellPhone}
                                disabled={disables.cellPhone}
                                helperText={helpers.cellPhone}
                                name="cellPhone"
                                value={fields.cellPhone}
                                onChange={(e) => {
                                    handleChangeField("cellPhone", e.target.value);
                                }}
                                variant={variant}
                                size={fieldSize}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>전화번호</span>
                            <TextField
                                className={fieldClassName}
                                error={errors.tel}
                                required={requires.tel}
                                disabled={disables.tel}
                                helperText={helpers.tel}
                                name="tel"
                                value={fields.tel}
                                onChange={(e) => {
                                    handleChangeField("tel", e.target.value);
                                }}
                                variant={variant}
                                size={fieldSize}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>* 권한</span>
                            <FormControl
                                size={fieldSize}
                                className={fieldClassName}
                                variant="filled"
                                error={errors.level}
                                disabled={disables.level}
                            >
                                <Select
                                    required={errors.level}
                                    disabled={disables.level}
                                    name="level"
                                    value={fields.level}
                                    onChange={(e) => {
                                        handleChangeField("level", e.target.value);
                                    }}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem key={0} value={0}>
                                        <em>None</em>
                                    </MenuItem>
                                    {authList && authList.map((item, index) => {
                                        const key = index;
                                        if (item.tag !== '') {
                                            return (
                                                <MenuItem key={key} value={item.level}>{item.tag}</MenuItem>
                                            );
                                        }
                                        return '';
                                    })}
                                </Select>
                                <FormHelperText>{helpers.level}</FormHelperText>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>우편번호</span>
                            <FormControl
                                error={errors.userZip}
                                required={requires.userZip}
                                disabled={disables.userZip}
                                size={fieldSize}
                                className={fieldClassName}
                            >
                                <FilledInput
                                    name="userZip"
                                    value={fields.userZip}
                                    disabled={disables.userZip}
                                    onChange={(e) => {
                                        handleChangeField("userZip", e.target.value);
                                    }}
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
                            <span className={labelClassName}>주소</span>
                            <TextField
                                className={fieldClassName}
                                error={errors.userAddr}
                                required={requires.userAddr}
                                disabled={disables.userAddr}
                                helperText={helpers.userAddr}
                                name="userAddr"
                                value={fields.userAddr}
                                onChange={(e) => {
                                    handleChangeField("userAddr", e.target.value);
                                }}
                                variant={variant}
                                size={fieldSize}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>상세주소</span>
                            <TextField
                                className={fieldClassName}
                                error={errors.userAddrDetail}
                                required={requires.userAddrDetail}
                                disabled={disables.userAddrDetail}
                                helperText={helpers.userAddrDetail}
                                name="userAddrDetail"
                                value={fields.userAddrDetail}
                                onChange={(e) => {
                                    handleChangeField("userAddrDetail", e.target.value);
                                }}
                                variant={variant}
                                size={fieldSize}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>이메일 인증</span>
                            <FormControl
                                size={fieldSize}
                                className={fieldClassName}
                                variant="filled"
                                error={errors.emailAuthValue}
                                disabled={disables.emailAuthValue}>
                                <Select
                                    required={errors.emailAuthValue}
                                    disabled={disables.emailAuthValue}
                                    name="emailAuthValue"
                                    value={fields.emailAuthValue}
                                    onChange={(e) => {
                                        handleChangeField("emailAuthValue", e.target.value);
                                    }}
                                    MenuProps={MenuProps}>
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
                        fields.emailAuthValue === "2" ? (
                            <React.Fragment>
                                <Grid item xs={6}>
                                    <div>
                                        <span className={labelClassName}>그룹 이메일 인증: 사용자 선택</span>
                                        <FormControl
                                            size={fieldSize}
                                            className={fieldClassName}
                                            variant="filled">
                                            <Select>
                                                <List className={classes.list}>
                                                    {userList && userList.map((item, index) => {
                                                        const key = index;
                                                        return (
                                                            <ListItem key={key} button onClick={() => {
                                                                handleClickEmailAuthUser(item);
                                                            }}>
                                                                <ListItemAvatar>
                                                                    <ReactAvatar className="topbar__avatar-img-list" name={item.id} size={40}/>
                                                                </ListItemAvatar>
                                                                <ListItemText primary={item.name} secondary={item.email}/>
                                                            </ListItem>
                                                        );
                                                    })}
                                                </List>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </Grid>
                                {
                                    fields.emailAuthGroupList.length > 0 ? (
                                        <React.Fragment>
                                            <Grid item xs={12}>
                                                <Paper className={classes.paper} variant="outlined"/>
                                                {fields.emailAuthGroupList && fields.emailAuthGroupList.map((item, index) => {
                                                    const key = index;
                                                    return (
                                                        <Chip
                                                            key={key}
                                                            variant="outlined"
                                                            size="small"
                                                            avatar={<Avatar alt={item.id} src="/static/images/avatar/1.jpg"/>}
                                                            label={item.email}
                                                            onDelete={() => {
                                                                handleDeleteEmailAuthGroupItem(item);
                                                            }}
                                                        />
                                                    );
                                                })}
                                                <Paper variant="outlined" square/>
                                            </Grid>
                                        </React.Fragment>
                                    ) : (<React.Fragment/>)
                                }
                            </React.Fragment>
                        ) : (<React.Fragment/>)
                    }
                    <Grid item xs={12}>
                        <span className={labelClassName}>메모</span>
                        <TextField
                            className={fieldClassName}
                            disabled={disables.memo}
                            error={errors.memo}
                            required={requires.memo}
                            helperText={helpers.memo}
                            name="memo"
                            value={fields.memo}
                            onChange={(e) => {
                                handleChangeField("memo", e.target.value);
                            }}
                            variant={variant}
                            size={fieldSize}
                            multiline
                            rows={4}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <span className={labelClassName}>아바타 이미지 업로드</span>
                        {/*<ImageUploader
                            withIcon
                            withPreview
                            singleImage
                            onChange={onDrop}
                            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                            maxFileSize={5242880}
                            fileSizeError=" file size is too big"
                        />
                        <br/>*/}
                        <div className="filebox">
                            <input className="upload-name" value={fields.avata === "" ? "파일 찾기" : fields.avata} disabled="disabled"/>
                            <label className="upload-name-span" htmlFor="ex_filename">업로드</label>
                            <input type="file"
                                   accept="image/*"
                                   id="ex_filename"
                                   className="upload-hidden"
                                   name="avatar"
                                   onChange={fileChangedHandler}/>
                        </div>
                        {/*<input type="file" name="avatar" onChange={fileChangedHandler}/>*/}
                        {/*<button type="button" onClick={submit}> Upload </button>*/}
                        {!isRegister && fields.avata !== "" ? (
                            <div>
                                <div className="profile__avatar">
                                    <div
                                        style={{
                                            width: "inherit",
                                            textAlign: "end",
                                            position: "absolute",
                                        }}
                                    >
                                        <CloseIcon
                                            role="button" tabIndex="0"
                                            onClick={event => avataDelete('server')}
                                            onKeyDown={event => avataDelete('server')}
                                        />
                                    </div>
                                    <Avatar
                                        className="topbar__avatar-img-list"
                                        name="img"
                                        size="120"
                                        /*src={`${API_ROUTE_SERVER_IMAGE}/${fields.avata}`}*/
                                        src={selectedFile !== null ? imagePreviewUrl : `${API_ROUTE_SERVER_IMAGE}/${fields.avata}`}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                </div>
                            </div>
                        ) : (
                            $imagePreview
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            <Button
                                variant="contained"
                                size={buttonSize}
                                onClick={handleCancel}>
                                취소
                            </Button>
                            <Button
                                className={classes.margin}
                                variant="contained"
                                color="primary"
                                size={buttonSize}
                                onClick={handleSubmitInternal}
                                endIcon={<SendIcon/>}>
                                전송
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </form>
            {/*<form
                action="http://127.0.0.1:8081/v1/users/fileUpload"
                method="post"
                encType="multipart/form-data">
                    upload file: <input type="file" name="file"/>
                    <input type="submit" value="Submit"/>
            </form>*/}
        </React.Fragment>
    );
};

export default WriteUserForm;
