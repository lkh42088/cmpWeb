import React, {useEffect, useState} from "react";
import clsx from 'clsx';
import {useDispatch, useSelector} from "react-redux";
import {
    Card, CardBody, Col,
} from "reactstrap";
import { Field, reduxForm } from 'redux-form';
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {Button} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {changeCompanyRegisterField, checkDupCompany} from "../../../../redux/actions/companiesActions";
import SearchZip from "./SearchZip";

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
//
// export const CbButtonSecondary = withStyles({
//     root: {
//         background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//         borderRadius: 3,
//         border: 0,
//         color: 'white',
//         boxSizing: 'content-box',
//         minWidth: '5em',
//         width: '5em',
//         height: 35,
//         padding: '0 10px',
//         boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//         margin: '0 0 0 8px',
//     },
//     label: {
//         textTransform: 'capitalize',
//         fontFamily: 'Nanum Square RoundR',
//         fontSize: '12px',
//         width: '100%',
//         // width: '5em',
//     },
// })(MButton);

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
        cpName, cpZip, cpAddr, cpAddrDetail, cpHomepage, cpEmail,
        cpTel, cpIsCompany, cpMemo, cpTerminationDate,
        checkCompany, confirmCompany,
    } = useSelector(({ companiesRd }) => ({
        isError: companiesRd.isError,
        helperText: companiesRd.helperText,
        required: companiesRd.required,
        register: companiesRd.register,
        disabled: companiesRd.disabled,
        cpName: companiesRd.register.cpName,
        cpZip: companiesRd.register.cpZip,
        cpAddr: companiesRd.register.cpAddr,
        cpAddrDetail: companiesRd.register.cpAddrDetail,
        cpHomepage: companiesRd.register.cpHomepage,
        cpEmail: companiesRd.register.cpEmail,
        cpTel: companiesRd.register.cpTel,
        cpIsCompany: companiesRd.register.cpIsCompany,
        cpMemo: companiesRd.register.cpMemo,
        cpTerminationDate: companiesRd.register.cpTerminationDate,
        checkCompany: companiesRd.checkCompany,
        confirmCompany: companiesRd.confirmCompany,
    }));
    const {open, handleClose, refreshPage } = props;

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

    const handleChange = ({name, value}) => {
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

    /** Address ZIP */
    const handleOpenSearchZip = () => {
        setOpenZip(true);
    };

    const handleCloseSearchZip = () => {
        setOpenZip(false);
    };

    const handleCompleteZip = ({zip, address}) => {
        console.log("handleComplete: zip ", zip);
        dispatch(changeCompanyRegisterField({ key: "cpZip", value: zip }));
        console.log("handleComplete: address ", address);
        dispatch(changeCompanyRegisterField({ key: "cpAddr", value: address }));
    };

    /************************************************************************************
     * useEffect
     ************************************************************************************/
    useEffect(() => {
        console.log("[useEffect] INIT");
    }, []);

    console.log("Company Page..");

    /************************************************************************************
     * JSX Template
     ************************************************************************************/
    const variant = "filled";
    const fieldSize = "large";
    const buttonSize = "large";
    const formClassName = "material-form";
    const labelClassName = "material-form__label-cb";
    const fieldClassName = "material-form__field-cb";

    return (
        <Dialog
            onClose={handleClose}
            open={open}
        >
            <Col xs={8} md={12} lg={12}>
                <Card>
                    <CardBody>
                        <div className="card__title">
                            <h3 className="bold-text">고객사 등록</h3>
                        </div>
                        <form className={formClassName}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <div>
                                        <span className={labelClassName}>고객사 이름</span>
                                        <FormControl className={fieldClassName}>
                                            <InputLabel
                                                // className={fieldClassName}
                                                htmlFor="standard-adornment-password"
                                            >Password</InputLabel>
                                            <FilledInput
                                                // className={fieldClassName}
                                                id="filled-adornment-password"
                                                type={values.showPassword ? 'text' : 'password'}
                                                value={values.password}
                                                onChange={handlePassChange('password')}
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
                                        </FormControl>
                                    </div>
                                </Grid>
                                {/*<Grid item xs={6}>*/}
                                {/*    <div>*/}
                                {/*        <span className={labelClassName}>고객사 이름</span>*/}
                                {/*        <TextField*/}
                                {/*            className={fieldClassName}*/}
                                {/*            isError={isError.cpName}*/}
                                {/*            required={required.cpName}*/}
                                {/*            helperText={helperText.cpName}*/}
                                {/*            disabled={disabled.cpName}*/}
                                {/*            name="cpName"*/}
                                {/*            value={cpName}*/}
                                {/*            // placeholder="고객사 이름"*/}
                                {/*            onChange={handleChange}*/}
                                {/*            variant={variant}*/}
                                {/*            size={fieldSize}*/}
                                {/*        />*/}
                                {/*        <Button*/}
                                {/*            className={labelClassName}*/}
                                {/*            variant="contained"*/}
                                {/*            color="warning"*/}
                                {/*            disabled={nameButtonDisable}*/}
                                {/*            onClick={handleCheckDupCompany}*/}
                                {/*            size={buttonSize}*/}
                                {/*        >*/}
                                {/*            중복확인*/}
                                {/*        </Button>*/}
                                {/*    </div>*/}
                                {/*</Grid>*/}
                                <Grid item xs={6}>
                                    <div>
                                        <span className={labelClassName}>고객사 이름</span>
                                        <FormControl className={fieldClassName}>
                                            <InputLabel
                                                // className={fieldClassName}
                                                htmlFor="standard-adornment-password"
                                            >Password</InputLabel>
                                            <FilledInput
                                                // className={fieldClassName}
                                                id="filled-adornment-password"
                                                type={values.showPassword ? 'text' : 'password'}
                                                value={values.password}
                                                onChange={handlePassChange('password')}
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
                                        </FormControl>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div>
                                        <span className={labelClassName}>고객사 이름</span>
                                        <FormControl className={fieldClassName}>
                                            <InputLabel
                                                // className={fieldClassName}
                                                htmlFor="standard-adornment-password"
                                            >Password</InputLabel>
                                            <FilledInput
                                                // className={fieldClassName}
                                                id="filled-adornment-password"
                                                type={values.showPassword ? 'text' : 'password'}
                                                value={values.password}
                                                onChange={handlePassChange('password')}
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
                                        </FormControl>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div>
                                        <span className={labelClassName}>우편번호</span>
                                        <TextField
                                            className={fieldClassName}
                                            isError={isError.cpZip}
                                            required={required.cpZip}
                                            helperText={helperText.cpZip}
                                            disabled={disabled.cpZip}
                                            name="cpZip"
                                            value={cpZip}
                                            //placeholder="우편번호"
                                            onChange={handleChange}
                                            variant={variant}
                                            size={fieldSize}
                                        />
                                        {/*<Button*/}
                                        {/*    className={labelClassName}*/}
                                        {/*    color="warning"*/}
                                        {/*    variant="contained"*/}
                                        {/*    onClick={handleOpenSearchZip}*/}
                                        {/*    size={buttonSize}*/}
                                        {/*>*/}
                                        {/*    검색*/}
                                        {/*</Button>*/}
                                        <SearchZip
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
                                            isError={isError.cpAddr}
                                            required={required.cpAddr}
                                            helperText={helperText.cpAddr}
                                            disabled={disabled.cpAddr}
                                            //label="주소"
                                            name="cpAddr"
                                            value={cpAddr}
                                            onChange={handleChange}
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
                                            isError={isError.cpAddrDetail}
                                            required={required.cpAddrDetail}
                                            helperText={helperText.cpAddrDetail}
                                            disabled={disabled.cpAddrDetail}
                                            //label="상세주소"
                                            name="cpAddrDetail"
                                            value={cpAddrDetail}
                                            onChange={handleChange}
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
                                            isError={isError.cpTel}
                                            required={required.cpTel}
                                            helperText={helperText.cpTel}
                                            disabled={disabled.cpTel}
                                            //label="전화번호"
                                            name="cpTel"
                                            value={cpTel}
                                            onChange={handleChange}
                                            variant={variant}
                                            size={fieldSize}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div>
                                        <span className={labelClassName}>이메일</span>
                                        <TextField
                                            className={fieldClassName}
                                            isError={isError.cpEmail}
                                            required={required.cpEmail}
                                            helperText={helperText.cpEmail}
                                            disabled={disabled.cpEmail}
                                            //label="이메일"
                                            name="cpEmail"
                                            value={cpEmail}
                                            onChange={handleChange}
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
                                            isError={isError.cpHomepage}
                                            required={required.cpHomepage}
                                            helperText={helperText.cpHomepage}
                                            disabled={disabled.cpHomepage}
                                            //label="홈페이지"
                                            name="cpHomepage"
                                            value={cpHomepage}
                                            onChange={handleChange}
                                            variant={variant}
                                            size={fieldSize}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size={buttonSize}
                                        >
                                            Next
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

export default reduxForm({
    form: 'regCpPage',
})(withTranslation('common')(RegisterCompanyPage));
