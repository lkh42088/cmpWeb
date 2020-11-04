import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import {getCompanies} from "../../../../lib/api/company";
import {CUSTOMER_MANAGER} from "../../../../lib/var/globalVariable";

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
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

const agentList = [
    { value: 1, name: "SVCMGR" },
    { value: 2, name: "MC AGENT" },
    { value: 3, name: "WINDOWS AGENT" },
];

const WriteEnvVariable = (props) => {
    /************************************************************************************
     * Props
     ************************************************************************************/
    const {
        handleClose, handleSubmit, isRegister, data, user,
    } = props;

    /************************************************************************************
     * Variable
     ************************************************************************************/
    const classes = useStyles();

    const [companyList, setCompanyList] = useState([]);
    const [menuCompany, setMenuCompany] = useState(false);
    const [openSearchCompany, setOpenSearchCompany] = useState(false);

    /*******************
     * Field
     *******************/
    const [fields, setFields] = useState({
        agentType: 0,
        fieldName: "",
        value: "",
    });

    const [requires, setRequireds] = useState({
        agentType: true,
        fieldName: true,
        value: true,
    });

    const [disables, setDisables] = useState({
        agentType: false,
        fieldName: false,
        value: false,
    });

    const [helpers, setHelpers] = useState({
        agentType: "",
        fieldName: "",
        value: "",
    });

    const [errors, setErrors] = useState({
        agentType: false,
        fieldName: false,
        value: false,
    });

    /*******************
     * Validation
     *******************/
    const checkValidation = () => {

    };

    /*******************
     * Close & Send
     *******************/
    const reset = () => {
        setFields({
            agentType: 0,
            fieldName: '',
            value: '',
        });
        setHelpers({
            agentType: "전송할 에이전트",
            fieldName: "컨피그 파일 필드 이름",
            value: "변경할 값",
        });
        setErrors({
            agentType: false,
            fieldName: false,
            value: false,
        });
    };

    const handleCancel = () => {
        console.log("handleCancel() ");
        reset();
        handleClose();
    };

    const handleSubmitInternal = () => {
        console.log("handleSubmitInternal() fields", fields);
        handleSubmit(fields);
        reset();
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
    };

    /*******************
     * Open
     *******************/
    const getCompanyList = async () => {
        try {
            const response = await getCompanies();
            setCompanyList(response.data);
        } catch (error) {
            setCompanyList([]);
        }
    };

    const handleMenuCompany = () => {
        if (companyList.length === 0) {
            getCompanyList();
        }
        setMenuCompany(!menuCompany);
    };

    const handleOpenSearchCompany = () => {
        setOpenSearchCompany(true);
    };

    const handleCloseSearchCompany = () => {
        setOpenSearchCompany(false);
    };

    const handleCompleteSearchCompany = (idx, name) => {
        console.log("handleCompleteSearchCompany: ", idx, name);
        handleChangeField("cpIdx", idx);
    };

    useEffect(() => {
        if (companyList === null || companyList.length === 0) {
            getCompanyList();
        }
        if (user) {
            const {level, cpIdx, cpName} = user;
            if (level >= CUSTOMER_MANAGER) {
                setFields({
                    ...fields,
                    cpIdx,
                    cpName,
                });
            }
        }

        if (isRegister === false) {
            console.log("isRegister data : ", data);
            setFields({
                ...fields,
                idx: data.idx,
                cpName: data.cpName,
                cpIdx: data.cpIdx,
                serialNumber: data.serialNumber,
                ipAddr: data.ipAddr,
                registerType: data.registerType,
                domainPrefix: data.domainPrefix,
                domainId: data.domainId,
                domainPassword: data.domainPassword,
                accessKey: data.accessKey,
                secretKey: data.secretKey,
                projectId: data.projectId,
                ktDomainId: data.ktDomainId,
                nasUrl: data.nasUrl,
                nasId: data.nasId,
                nasPassword: data.nasPassword,
            });

            setDisables({
                ...disables,
                cpName: true,
                cpIdx: true,
                serialNumber: true,
            });
        }
    }, []);

    const variant = "filled";
    const fieldSize = "small";
    const buttonSize = "large";
    const formClassName = "cb-material-form";
    const labelClassName = "cb-material-form__label";
    const fieldClassName = "cb-material-form__field";

    return (
        <React.Fragment>
            <form className={formClassName}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <div>
                            <span className={labelClassName}>* 전송 AGENT</span>
                            <FormControl
                                size={fieldSize}
                                className={fieldClassName}
                                variant="filled"
                                error={errors.agentType}
                                disabled={disables.agentType}
                            >
                                <Select
                                    required={requires.agentType}
                                    name="agentType"
                                    value={fields.agentType}
                                    error={errors.agentType}
                                    onChange={(e) => {
                                        handleChangeField("agentType", e.target.value);
                                    }}
                                    onClick={handleMenuCompany}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem key={0} value={0}>
                                        <em>선택</em>
                                    </MenuItem>
                                    {agentList && agentList.map((item, index) => {
                                        const key = index;
                                        return (
                                            <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText>{helpers.agentType}</FormHelperText>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div>
                            <span className={labelClassName}>* 필드 이름</span>
                            <TextField
                                className={fieldClassName}
                                error={errors.fieldName}
                                required={requires.fieldName}
                                disabled={disables.fieldName}
                                helperText={helpers.fieldName}
                                name="fieldName"
                                value={fields.fieldName}
                                onChange={(e) => {
                                    handleChangeField("fieldName", e.target.value);
                                }}
                                variant={variant}
                                size={fieldSize}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div>
                            <span className={labelClassName}>* 값</span>
                            <TextField
                                className={fieldClassName}
                                error={errors.value}
                                required={requires.value}
                                disabled={disables.value}
                                helperText={helpers.value}
                                name="value"
                                value={fields.value}
                                onChange={(e) => {
                                    handleChangeField("value", e.target.value);
                                }}
                                variant={variant}
                                size={fieldSize}
                            />
                        </div>
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

                            {isRegister ? (
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
                            ) : (
                                <Button
                                    className={classes.margin}
                                    variant="contained"
                                    color="primary"
                                    size={buttonSize}
                                    onClick={handleSubmitInternal}
                                >
                                    수정
                                </Button>
                            )}
                        </div>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    );
};

export default WriteEnvVariable;
