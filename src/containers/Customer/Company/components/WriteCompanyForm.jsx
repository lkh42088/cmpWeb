import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import SearchIcon from "@material-ui/icons/Search";
import {Button} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import {makeStyles} from "@material-ui/core/styles";
import LookupZipcode from "../../../Common/LookupZipcode";
import {
    checkAddress,
    checkCompanyName,
    checkEmail,
    checkId,
    checkPasswordPattern,
    checkTelephone,
    checkZipCode,
} from "../../../../lib/utils/utils";
import {checkDupCompany} from "../../../../lib/api/company";
import {checkDuplicateUser} from "../../../../lib/api/users";
import ChangePasswordDialog from "./ChangePasswordDialog";

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

const WriteCompanyFrom = (props) => {
    /************************************************************************************
     * Variable
     ************************************************************************************/
    const classes = useStyles();
    const {
        handleClose, handleSubmit, isRegister, data,
    } = props;

    /** Fields */
    const [fields, setFields] = useState({
        cpName: "",
        cpIdx: 0,
        cpZip: "",
        cpAddr: "",
        cpAddrDetail: "",
        cpHomepage: "",
        cpTel: "",
        cpHp: "",
        cpEmail: "",
        cpIsCompany: false,
        cpMemo: "",
        cpTerminationDate: new Date(),
        userId: "",
        userPassword: "",
    });
    /** Disables */
    const [disables, setDisables] = useState({
        cpName: false,
        cpIdx: false,
        cpZip: true,
        cpAddr: true,
        cpAddrDetail: false,
        cpHomepage: false,
        cpTel: false,
        cpHp: false,
        cpEmail: false,
        cpIsCompany: false,
        cpMemo: false,
        cpTerminationDate: false,
        userId: false,
        userPassword: false,
    });
    /** Requires */
    const [requires, setRequires] = useState({
        cpName: true,
        cpIdx: false,
        cpZip: true,
        cpAddr: true,
        cpAddrDetail: false,
        cpHomepage: false,
        cpTel: true,
        cpHp: false,
        cpEmail: true,
        cpIsCompany: false,
        cpMemo: false,
        cpTerminationDate: false,
        userId: true,
        userPassword: true,
    });
    /** HelperText */
    const [helpers, setHelpers] = useState({
        cpName: "",
        cpIdx: "",
        cpZip: "",
        cpAddr: "",
        cpAddrDetail: "",
        cpHomepage: "",
        cpTel: "",
        cpHp: "",
        cpEmail: "",
        cpIsCompany: "",
        cpMemo: "",
        cpTerminationDate: "",
        userId: "",
        userPassword: "",
    });
    /** Error */
    const [errors, setErrors] = useState({
        cpName: false,
        cpIdx: false,
        cpZip: false,
        cpAddr: false,
        cpAddrDetail: false,
        cpHomepage: false,
        cpTel: false,
        cpHp: false,
        cpEmail: false,
        cpIsCompany: false,
        cpMemo: false,
        cpTerminationDate: false,
        userId: false,
        userPassword: false,
    });
    const [values, setValues] = useState({
        confirmUser: false,
        confirmCompany: false,
        showPassword: false,
    });
    const [passwordGridSize, setPasswordGridSize] = useState(6);
    const [openZip, setOpenZip] = useState(false);
    const [openChangePassword, setOpenChangePassword] = useState(false);
    /************************************************************************************
     * Function
     ************************************************************************************/
    const reset = () => {
        setFields({
            cpName: "",
            cpIdx: 0,
            cpZip: "",
            cpAddr: "",
            cpAddrDetail: "",
            cpHomepage: "",
            cpTel: "",
            cpHp: "",
            cpEmail: "",
            cpIsCompany: false,
            cpMemo: "",
            cpTerminationDate: new Date(),
            userId: "",
            userPassword: "",
        });
        setHelpers({
            cpName: "* 동일한 고객사가 있는지 중복 check를 해주세요.",
            cpIdx: "",
            cpZip: "",
            cpAddr: "",
            cpAddrDetail: "",
            cpHomepage: "",
            cpTel: "",
            cpHp: "",
            cpEmail: "",
            cpIsCompany: "",
            cpMemo: "",
            cpTerminationDate: "",
            userId: "",
            userPassword: "",
        });
        setErrors({
            cpName: false,
            cpIdx: false,
            cpZip: false,
            cpAddr: false,
            cpAddrDetail: false,
            cpHomepage: false,
            cpTel: false,
            cpHp: false,
            cpEmail: false,
            cpIsCompany: false,
            cpMemo: false,
            cpTerminationDate: false,
            userId: false,
            userPassword: false,
        });
        setValues({
            confirmUser: false,
            confirmCompany: false,
            showPassword: false,
        });
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
            cpZip: zip,
            cpAddr: address,
        });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleOpenChangePassword = () => {
        setOpenChangePassword(true);
    };

    const handleCloseChangePassword = () => {
        setOpenChangePassword(false);
    };

    const handleCompleteChangePassword = (res) => {
        setOpenChangePassword(false);
        console.log("change password: ", res);
        setFields({
            ...fields,
            userPassword: res,
        });
    };

    const handleCancel = () => {
        handleClose();
        reset();
    };

    const checkCompanyValidation = () => {
        /** company name */
        let errorCpName = false;
        let helperCpName = checkCompanyName(fields.cpName);
        if (helperCpName !== "") {
            errorCpName = true;
        } else if (values.confirmCompany === false) {
            helperCpName = "* 고객사명을 중복확인 하십시오!";
            errorCpName = true;
        }

        /** tel */
        let errorTel = false;
        const helperTel = checkTelephone(fields.cpTel);
        if (helperTel !== "") {
            errorTel = true;
        }

        /** email */
        let errorEmail = false;
        const helperEmail = checkEmail(fields.cpEmail);
        if (helperEmail !== "") {
            errorEmail = true;
        }

        /** id */
        let errorId = false;
        let helperId = checkId(fields.userId);
        if (helperId !== "") {
            errorId = true;
        } else if (values.confirmUser === false) {
            helperId = "* ID를 중복확인 하십시오!";
            errorId = true;
        }

        /** password */
        let errorPassword = false;
        let helperPassword = "";
        if (isRegister) {
            helperPassword = checkPasswordPattern(fields.userPassword);
            if (helperPassword !== "") {
                errorPassword = true;
            }
        }

        /** zip */
        let errorZip = false;
        const helperZip = checkZipCode(fields.cpZip);
        if (helperZip !== "") {
            errorZip = true;
        }

        /** address */
        let errorAddress = false;
        const helperAddress = checkAddress(fields.cpAddr);
        if (helperAddress !== "") {
            console.log("error");
            errorAddress = true;
        }

        setErrors({
            ...errors,
            cpName: errorCpName,
            cpTel: errorTel,
            cpEmail: errorEmail,
            cpZip: errorZip,
            cpAddr: errorAddress,
            userId: errorId,
            userPassword: errorPassword,
        });

        setHelpers({
            ...helpers,
            cpName: helperCpName,
            cpTel: helperTel,
            cpEmail: helperEmail,
            cpZip: helperZip,
            cpAddr: helperAddress,
            userId: helperId,
            userPassword: helperPassword,
        });

        if (errorCpName
            || errorTel
            || errorEmail
            || errorId
            || errorPassword
            || errorZip
            || errorAddress) {
            return false;
        }
        return true;
    };

    const handleSubmitWrap = () => {
        console.log("handleSubmitWrap...");
        if (!checkCompanyValidation()) {
            console.log("fail!");
            return;
        }
        console.log("success!");
        handleSubmit(fields);
        reset();
    };

    const handleChangeFields = (e) => {
        const { name, value } = e.target;
        console.log("change: name ", name, ", value: ", value);
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
        if (isRegister && name === "cpName" && values.confirmCompany) {
            setValues({
                ...values,
                confirmCompany: false,
            });
        }
        if (isRegister && name === "userId" && values.confirmUser) {
            setValues({
                ...values,
                confirmUser: false,
            });
        }
    };

    const checkCompany = async (name) => {
        try {
            const response = await checkDupCompany({cpName: name});
            console.log("checkCompany... true");
            setValues({
                ...values,
                confirmCompany: true,
            });
        } catch (e) {
            console.log("checkCompany... false");
            setValues({
                ...values,
                confirmCompany: false,
            });
            setErrors({
                ...errors,
                cpName: true,
            });
            setHelpers({
                ...helpers,
                cpName: "* 존재하는 고객사명입니다!",
            });
        }
    };

    const handleCheckDuplicateCompany = () => {
        if (isRegister === false) {
            return;
        }
        console.log("check dup company ", fields.cpName);
        const helperCpName = checkCompanyName(fields.cpName);
        if (helperCpName !== "") {
            setErrors({
                ...errors,
            });
            setHelpers({
                ...helpers,
                cpName: helperCpName,
            });
            return;
        }
        checkCompany(fields.cpName);
    };

    const handleMouseDownPassword = () => {
    };

    const checkUser = async () => {
        try {
            const response = await checkDuplicateUser({userId: fields.userId});
            setValues({
                ...values,
                confirmUser: true,
            });
            setErrors({
                ...errors,
                userId: false,
            });
            console.log("checkUser: success", response.data);
            setHelpers({
                ...helpers,
                userId: "* 사용 가능한 ID 입니다.",
            });
        } catch (error) {
            console.log("checkUser: error ", error);
            setValues({
                ...values,
                confirmUser: false,
            });
            setErrors({
                ...errors,
                userId: true,
            });
            setHelpers({
                ...helpers,
                userId: "* 이미 존재하는 ID 입니다.",
            });
        }
    };

    const handleCheckUser = () => {
        if (isRegister === false) {
            return;
        }
        console.log("handleCheckUser: ");
        const res = checkId(fields.userId);
        if (res !== "") {
            setErrors({
                ...errors,
                userId: true,
            });
            setHelpers({
                ...helpers,
                userId: res,
            });
            return;
        }
        checkUser();
    };

    useEffect(() => {
        console.log("init useEffect: data ", data);
        if (isRegister === false && data) {
            setFields({
                ...fields,
                cpName: data.name,
                cpIdx: data.idx,
                cpZip: data.zipcode,
                cpAddr: data.address,
                cpAddrDetail: data.addressDetail,
                cpHomepage: data.homepage,
                cpTel: data.tel,
                cpHp: data.hp,
                cpEmail: data.email,
                cpIsCompany: data.isCompany,
                cpMemo: data.memo,
                userId: data.cpUserId,
            });
        }
        if (isRegister === false) {
            setPasswordGridSize(4);
            setDisables({
                cpName: true,
                cpIdx: true,
                cpZip: true,
                cpAddr: true,
                cpAddrDetail: false,
                cpHomepage: false,
                cpTel: false,
                cpHp: false,
                cpEmail: false,
                cpIsCompany: false,
                cpMemo: false,
                cpTerminationDate: false,
                userId: true,
                userPassword: true,
            });
            setValues({
                ...values,
                confirmUser: true,
                confirmCompany: true,
            });
        }
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

    return (
        <React.Fragment>
            <form className={formClassName}>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>* 고객사 이름</span>
                            <FormControl
                                className={fieldClassName}
                                size={fieldSize}
                                error={errors.cpName}
                            >
                                <FilledInput
                                    required={requires.cpName}
                                    name="cpName"
                                    value={fields.cpName}
                                    disabled={disables.cpName}
                                    onChange={(e) => { handleChangeFields(e); }}
                                    endAdornment={(
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleCheckDuplicateCompany}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.confirmCompany ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>}
                                            </IconButton>
                                        </InputAdornment>
                                    )}
                                />
                                <FormHelperText id="component-helper-text">{helpers.cpName}</FormHelperText>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>* 이메일</span>
                            <TextField
                                className={fieldClassName}
                                error={errors.cpEmail}
                                required={requires.cpEmail}
                                helperText={helpers.cpEmail}
                                name="cpEmail"
                                value={fields.cpEmail}
                                disabled={disables.cpEmail}
                                onChange={(e) => { handleChangeFields(e); }}
                                variant={variant}
                                size={fieldSize}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>* 전화번호</span>
                            <TextField
                                className={fieldClassName}
                                error={errors.cpTel}
                                required={requires.cpTel}
                                helperText={helpers.cpTel}
                                name="cpTel"
                                value={fields.cpTel}
                                disabled={disables.cpTel}
                                onChange={(e) => { handleChangeFields(e); }}
                                variant={variant}
                                size={fieldSize}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>휴대폰번호</span>
                            <TextField
                                className={fieldClassName}
                                error={errors.cpHp}
                                required={requires.cpHp}
                                helperText={helpers.cpHp}
                                name="cpHp"
                                value={fields.cpHp}
                                disabled={disables.cpHp}
                                onChange={(e) => { handleChangeFields(e); }}
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
                                error={errors.userId}
                            >
                                <FilledInput
                                    required={requires.userId}
                                    name="userId"
                                    value={fields.userId}
                                    disabled={disables.userId}
                                    onChange={(e) => { handleChangeFields(e); }}
                                    endAdornment={(
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleCheckUser}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.confirmUser ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>}
                                            </IconButton>
                                        </InputAdornment>
                                    )}
                                />
                                <FormHelperText id="component-helper-text">{helpers.userId}</FormHelperText>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={passwordGridSize}>
                        <div>
                            <span className={labelClassName}>* 계정 암호</span>
                            <FormControl
                                size={fieldSize}
                                className={fieldClassName}
                                error={errors.userPassword}
                            >
                                <FilledInput
                                    required={requires.userPassword}
                                    name="userPassword"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={fields.userPassword}
                                    disabled={disables.userPassword}
                                    onChange={(e) => { handleChangeFields(e); }}
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
                                <FormHelperText id="component-helper-text">{helpers.userPassword}</FormHelperText>
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
                            <span className={labelClassName}>홈페이지</span>
                            <TextField
                                className={fieldClassName}
                                error={errors.cpHomepage}
                                required={requires.cpHomepage}
                                helperText={helpers.cpHomepage}
                                name="cpHomepage"
                                value={fields.cpHomepage}
                                disabled={disables.cpHomepage}
                                onChange={(e) => { handleChangeFields(e); }}
                                variant={variant}
                                size={fieldSize}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>* 우편 번호</span>
                            <FormControl
                                size={fieldSize}
                                className={fieldClassName}
                                error={errors.cpZip}
                                disabled
                            >
                                <FilledInput
                                    required={requires.cpZip}
                                    name="cpZip"
                                    value={fields.cpZip}
                                    disabled={disables.cpZip}
                                    onChange={(e) => { handleChangeFields(e); }}
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
                                <FormHelperText id="component-helper-text">{helpers.cpZip}</FormHelperText>
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
                            <span className={labelClassName}>* 주소</span>
                            <TextField
                                className={fieldClassName}
                                error={errors.cpAddr}
                                required={requires.cpAddr}
                                helperText={helpers.cpAddr}
                                name="cpAddr"
                                value={fields.cpAddr}
                                disabled={disables.cpAddr}
                                onChange={(e) => { handleChangeFields(e); }}
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
                                error={errors.cpAddrDetail}
                                required={requires.cpAddrDetail}
                                helperText={helpers.cpAddrDetail}
                                name="cpAddrDetail"
                                value={fields.cpAddrDetail}
                                disabled={disables.cpAddrDetail}
                                onChange={(e) => { handleChangeFields(e); }}
                                variant={variant}
                                size={fieldSize}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div/>
                    </Grid>
                    <Grid item xs={12}>
                        <span className={labelClassName}>메모</span>
                        <TextField
                            className={fieldClassName}
                            error={errors.cpMemo}
                            required={requires.cpMemo}
                            helperText={helpers.cpMemo}
                            name="cpMemo"
                            value={fields.cpMemo}
                            disabled={disables.cpMemo}
                            onChange={(e) => { handleChangeFields(e); }}
                            variant={variant}
                            size={fieldSize}
                            multiline
                            rows={4}
                        />
                    </Grid>
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
                                onClick={handleSubmitWrap}
                                size={buttonSize}
                                endIcon={<SendIcon/>}
                            >
                                전송
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    );
};

export default WriteCompanyFrom;
