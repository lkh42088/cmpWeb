import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import {Button} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import {getCompanies} from "../../../../lib/api/company";
import LookupCompany from "../../../Common/LookupCompany";
import {CUSTOMER_MANAGER} from "../../../../lib/var/globalVariable";

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

const registerTypeList = [
    { value: 1, name: "Domain" },
];

const WriteServer = (props) => {
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
        cpName: '',
        cpIdx: 0,
        serialNumber: '',
        ipAddr: '',
        registerType: 0,
        domainPrefix: '',
        domainId: '',
        domainPassword: '',
    });

    const [requires, setRequireds] = useState({
        cpName: true,
        cpIdx: true,
        serialNumber: true,
        ipAddr: false,
        registerType: true,
        domainPrefix: false,
        domainId: false,
        domainPassword: false,
    });

    const [disables, setDisables] = useState({
        cpName: false,
        cpIdx: false,
        serialNumber: false,
        ipAddr: false,
        registerType: false,
        domainPrefix: false,
        domainId: false,
        domainPassword: false,
    });

    const [helpers, setHelpers] = useState({
        cpName: "",
        cpIdx: "",
        serialNumber: "",
        ipAddr: "",
        registerType: "",
        domainPrefix: "",
        domainId: "",
        domainPassword: "",
    });

    const [errors, setErrors] = useState({
        cpName: false,
        cpIdx: false,
        serialNumber: false,
        ipAddr: false,
        registerType: false,
        domainPrefix: false,
        domainId: false,
        domainPassword: false,
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
            cpName: '',
            cpIdx: 0,
            serialNumber: '',
            ipAddr: '',
            registerType: 0,
            domainPrefix: '',
            domainId: '',
            domainPassword: '',
        });
        setHelpers({
            cpName: "",
            cpIdx: "",
            serialNumber: "",
            ipAddr: "",
            registerType: "",
            domainPrefix: "",
            domainId: "",
            domainPassword: "",
        });
        setErrors({
            cpName: false,
            cpIdx: false,
            serialNumber: false,
            ipAddr: false,
            registerType: false,
            domainPrefix: false,
            domainId: false,
            domainPassword: false,
        });
    };

    const handleCancel = () => {
        console.log("handleCancel() ");
        reset();
        handleClose();
    };

    const handleSubmitInternal = () => {
        console.log("handleSubmitInternal() fields", fields);
        // if (!checkValidation()) {
        //     console.log("handleSubmitInternal() failed");
        //     return;
        // }
        console.log("handleSubmitInternal() success");
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
        console.log("getCompanyList()-----------------------");
        try {
            const response = await getCompanies();
            console.log("getCompanyList() data: ", response.data);
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
                <Grid container spacing={1}>
                    { user && user.level < CUSTOMER_MANAGER && (
                        <React.Fragment>
                            <Grid item xs={6}>
                                <div>
                                    <span className={labelClassName}>* 회사</span>
                                    <FormControl
                                        size={fieldSize}
                                        className={fieldClassName}
                                        variant="filled"
                                        error={errors.cpIdx}
                                        disabled={disables.cpIdx}
                                    >
                                        <Select
                                            required={requires.cpIdx}
                                            name="cpIdx"
                                            value={fields.cpIdx}
                                            error={errors.cpIdx}
                                            onChange={(e) => {
                                                handleChangeField("cpIdx", e.target.value);
                                            }}
                                            onClick={handleMenuCompany}
                                            MenuProps={MenuProps}
                                        >
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
                                    }}
                                >
                                    검색
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <div/>
                            </Grid>
                        </React.Fragment>
                    )}
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>* 시리얼넘버</span>
                            <TextField
                                className={fieldClassName}
                                error={errors.serialNumber}
                                required={requires.serialNumber}
                                disabled={disables.serialNumber}
                                helperText={helpers.serialNumber}
                                name="serialNumber"
                                value={fields.serialNumber}
                                onChange={(e) => {
                                    handleChangeField("serialNumber", e.target.value);
                                }}
                                variant={variant}
                                size={fieldSize}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>* Register Type</span>
                            <FormControl
                                size={fieldSize}
                                className={fieldClassName}
                                variant="filled"
                                error={errors.registerType}
                                disabled={disables.registerType}
                            >
                                <Select
                                    required={requires.registerType}
                                    name="registerType"
                                    value={fields.registerType}
                                    error={errors.registerType}
                                    onChange={(e) => {
                                        handleChangeField("registerType", e.target.value);
                                    }}
                                    onClick={handleMenuCompany}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem key={0} value={0}>
                                        <em>IP Address</em>
                                    </MenuItem>
                                    {registerTypeList && registerTypeList.map((item, index) => {
                                        const key = index;
                                        return (
                                            <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText>{helpers.registerType}</FormHelperText>
                            </FormControl>
                        </div>
                    </Grid>
                    { fields.registerType === 0 ? (
                        <Grid item xs={6}>
                            <div>
                                <span className={labelClassName}>* IP Address</span>
                                <TextField
                                    className={fieldClassName}
                                    error={errors.ipAddr}
                                    required={requires.ipAddr}
                                    disabled={disables.ipAddr}
                                    helperText={helpers.ipAddr}
                                    name="ipAddr"
                                    value={fields.ipAddr}
                                    onChange={(e) => {
                                        handleChangeField("ipAddr", e.target.value);
                                    }}
                                    variant={variant}
                                    size={fieldSize}
                                />
                            </div>
                        </Grid>
                    ) : (
                        <React.Fragment>
                            <Grid item xs={6}>
                                <div>
                                    <span className={labelClassName}>* Domain Prefix</span>
                                    <TextField
                                        className={fieldClassName}
                                        error={errors.domainPrefix}
                                        required={requires.domainPrefix}
                                        disabled={disables.domainPrefix}
                                        helperText={helpers.domainPrefix}
                                        name="domainPrefix"
                                        value={fields.domainPrefix}
                                        onChange={(e) => {
                                            handleChangeField("domainPrefix", e.target.value);
                                        }}
                                        variant={variant}
                                        size={fieldSize}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div>
                                    <span className={labelClassName}>* Domain ID</span>
                                    <TextField
                                        className={fieldClassName}
                                        error={errors.domainId}
                                        required={requires.domainId}
                                        disabled={disables.domainId}
                                        helperText={helpers.domainId}
                                        name="domainId"
                                        value={fields.domainId}
                                        onChange={(e) => {
                                            handleChangeField("domainId", e.target.value);
                                        }}
                                        variant={variant}
                                        size={fieldSize}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div>
                                    <span className={labelClassName}>* Domain Password</span>
                                    <TextField
                                        className={fieldClassName}
                                        error={errors.domainPassword}
                                        required={requires.domainPassword}
                                        disabled={disables.domainPassword}
                                        helperText={helpers.domainPassword}
                                        name="domainPassword"
                                        value={fields.domainPassword}
                                        onChange={(e) => {
                                            handleChangeField("domainPassword", e.target.value);
                                        }}
                                        variant={variant}
                                        size={fieldSize}
                                    />
                                </div>
                            </Grid>
                        </React.Fragment>
                    )}
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
        </React.Fragment>
    );
};

export default WriteServer;
