import React, {useEffect, useState} from "react";
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
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import BusinessIcon from '@material-ui/icons/Business';
import {checkDupCompany} from "../../../../lib/api/company";
import {checkDuplicateUser} from "../../../../lib/api/users";
import {
    checkAddress,
    checkCompanyName, checkEmail, checkId, checkPasswordPattern, checkTelephone, checkZipCode,
} from "../../../../lib/utils/utils";
import LookupZipcode from "../../../Common/LookupZipcode";

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
    /** props */
    const {open, handleClose, handleSubmit } = props;
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
    const [confirmCompany, setConfirmCompany] = useState(false);
    const [confirmUser, setConfirmUser] = useState(false);
    const [values, setValues] = useState({
        amount: '',
        userPassword: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    const [openZip, setOpenZip] = useState(false);

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
        setConfirmCompany(false);
        setConfirmUser(false);
    };

    const handlePassChange = prop => (event) => {
        setValues({ ...values, [prop]: event.target.value });
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
        } else if (confirmCompany === false) {
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
        } else if (confirmUser === false) {
            helperId = "* ID를 중복확인 하십시오!";
            errorId = true;
        }

        /** password */
        let errorPassword = false;
        const helperPassword = checkPasswordPattern(fields.userPassword);
        if (helperPassword !== "") {
            errorPassword = true;
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
        if (name === "cpName" && confirmCompany) {
            setConfirmCompany(false);
        }
        if (name === "userId" && confirmUser) {
            setConfirmUser(false);
        }
    };

    const checkCompany = async (name) => {
        try {
            const response = await checkDupCompany({cpName: name});
            console.log("checkCompany... true");
            setConfirmCompany(true);
        } catch (e) {
            console.log("checkCompany... false");
            setConfirmCompany(false);
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
            setConfirmUser(true);
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
            setConfirmUser(false);
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

    /************************************************************************************
     * JSX Template
     ************************************************************************************/
    const variant = "filled";
    const fieldSize = "small";
    const buttonSize = "large";
    const formClassName = "cb-material-form";
    const labelClassName = "cb-material-form__label";
    const fieldClassName = "cb-material-form__field";

    console.log("Register Company Page..");

    return (
        <Dialog
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
                                            error={errors.cpName}
                                        >
                                            <FilledInput
                                                required={requires.cpName}
                                                name="cpName"
                                                value={fields.cpName}
                                                onChange={(e) => { handleChangeFields(e); }}
                                                endAdornment={(
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleCheckDuplicateCompany}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {confirmCompany ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>}
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
                                                onChange={(e) => { handleChangeFields(e); }}
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
                                            <FormHelperText id="component-helper-text">{helpers.userId}</FormHelperText>
                                        </FormControl>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
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
                                            disabled
                                            helperText={helpers.cpAddr}
                                            name="cpAddr"
                                            value={fields.cpAddr}
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
                    </CardBody>
                </Card>
            </Col>
        </Dialog>
    );
};

export default RegisterCompanyPage;
