import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {changeCompanyRegisterField, checkDuplicatedCompany} from "../../../../redux/actions/companiesActions";
import CbTextField from "./CbTextField";
import {NubesButtonSecondary} from "./NubesButton";
import SearchZip from "./SearchZip";
import CbDatePicker from "./CbDatePicker";

const useStyles = makeStyles(theme => ({
    form: {
        '& > *': {
            margin: theme.spacing(1.9),
            // width: '120px',
        },
    },
}));

const RegisterCompanyPage = () => {
    /************************************************************************************
     * Variable
     ************************************************************************************/
    const classes = useStyles();
    const dispatch = useDispatch();
    const {
        register,
        isError,
        required,
        helperText,
        disabled,
        cpName, cpZip, cpAddr, cpAddrDetail, cpHomepage, cpEmail,
        cpTel, cpIsCompany, cpMemo, cpTerminationDate,
        checkDupCompany, confirmCompany,
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
        checkDupCompany: companiesRd.checkDupCompany,
        confirmCompany: companiesRd.confirmCompany,
    }));

    /** cpName */
    const [nameButtonDisable, setNameButtonDisable] = useState(true);
    const [open, setOpen] = useState(false);
    const requiredVal = true;
    const disableVal = true;
    const [cpNameError, setCpNameError] = useState(false);
    const [cpNameHelper, setCpNameHelper] = useState(false);

    /************************************************************************************
     * Function
     ************************************************************************************/
    const handleNameChange = (value) => {
        if (checkDuplicatedCompany === true) {
            dispatch(changeCompanyRegisterField({key: "checkDupCompany", value: false}));
            if (confirmCompany === true) {
                dispatch(changeCompanyRegisterField({key: "confirmCompany", value: false}));
            }
        }

        if (value.length === 0 && nameButtonDisable === false) {
            setNameButtonDisable(true);
        } else if (value.length !== 0 && nameButtonDisable === true) {
            setNameButtonDisable(false);
        }
        setCpNameError(false);
        setCpNameHelper("");
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

    const handleCheckDuplicatedName = () => {
        console.log("handleCheckDuplicatedName: ", cpName);
        if (cpName !== "") {
            dispatch(checkDuplicatedCompany({cpName}));
        }
    };

    /** Address ZIP */
    const handleOpenSearchZip = () => {
        setOpen(true);
    };

    const handleCloseSearchZip = () => {
        setOpen(false);
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

    useEffect(() => {
        if (checkDupCompany === true
            && confirmCompany === false
            && cpNameError === false) {
            setCpNameError(true);
            setCpNameHelper("* 이미 존재하는 이름입니다!");
        } else if (checkDupCompany === true
            && confirmCompany === true) {
            setCpNameHelper("* 사용 가능한 이름입니다.");
        }
    }, [checkDupCompany, confirmCompany]);

    console.log("Company Page..");

    /************************************************************************************
     * JSX Template
     ************************************************************************************/
    return (
        <div>
            <form className={classes.form} noValidate autoComplete="off">
                <div>
                    <CbTextField
                        isError={isError.cpName}
                        required={required.cpName}
                        helperText={helperText.cpName}
                        disabled={disabled.cpName}
                        label="고객사 이름"
                        name="cpName"
                        value={cpName}
                        onChange={handleChange}
                    />
                    <NubesButtonSecondary
                        disabled={nameButtonDisable}
                        onClick={handleCheckDuplicatedName}
                        size="small"
                    >
                        중복확인
                    </NubesButtonSecondary>
                </div>
                <div>
                    <CbTextField
                        isError={isError.cpZip}
                        required={required.cpZip}
                        helperText={helperText.cpZip}
                        disabled={disabled.cpZip}
                        label="우편번호"
                        name="cpZip"
                        value={cpZip}
                        onChange={handleChange}
                    />
                    <NubesButtonSecondary
                        size="small"
                        onClick={handleOpenSearchZip}
                    >
                        검색
                    </NubesButtonSecondary>
                    <SearchZip
                        open={open}
                        handleClose={handleCloseSearchZip}
                        handleComplete={handleCompleteZip}
                    />
                </div>
                <div>
                    <CbTextField
                        isError={isError.cpAddr}
                        required={required.cpAddr}
                        helperText={helperText.cpAddr}
                        disabled={disabled.cpAddr}
                        label="주소"
                        name="cpAddr"
                        value={cpAddr}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <CbTextField
                        isError={isError.cpAddrDetail}
                        required={required.cpAddrDetail}
                        helperText={helperText.cpAddrDetail}
                        disabled={disabled.cpAddrDetail}
                        label="상세주소"
                        name="cpAddrDetail"
                        value={cpAddrDetail}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <CbTextField
                        isError={isError.cpTel}
                        required={required.cpTel}
                        helperText={helperText.cpTel}
                        disabled={disabled.cpTel}
                        label="전화번호"
                        name="cpTel"
                        value={cpTel}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <CbTextField
                        isError={isError.cpHomepage}
                        required={required.cpHomepage}
                        helperText={helperText.cpHomepage}
                        disabled={disabled.cpHomepage}
                        label="홈페이지"
                        name="cpHomepage"
                        value={cpHomepage}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <CbTextField
                        isError={isError.cpEmail}
                        required={required.cpEmail}
                        helperText={helperText.cpEmail}
                        disabled={disabled.cpEmail}
                        label="이메일"
                        name="cpEmail"
                        value={cpEmail}
                        onChange={handleChange}
                    />
                </div>
                <CbDatePicker
                    isError={isError.cpTerminationDate}
                    required={required.cpTerminationDate}
                    helperText={helperText.cpTerminationDate}
                    disabled={disabled.cpTerminationDate}
                    selectedDate={cpTerminationDate}
                    label="해지일자"
                    handleDateChange={handleChangeDateField}
                />
            </form>
        </div>
    );
};

export default RegisterCompanyPage;
