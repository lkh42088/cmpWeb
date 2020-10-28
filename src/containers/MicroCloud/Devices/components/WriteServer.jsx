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

const registerTypeList = [
    { value: 1, name: "Domain" },
];

const backupTypeList = [
    { value: 1, name: "Kt Cloud" },
    { value: 2, name: "NAS" },
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
        idx: '',
        cpName: '',
        cpIdx: 0,
        serialNumber: '',
        ipAddr: '',
        registerType: 0,
        domainPrefix: '',
        domainId: '',
        domainPassword: '',
        backupType: 0,
        accessKey: '',
        secretKey: '',
        projectId: '',
        ktDomainId: '',
        nasUrl: '',
        nasId: '',
        nasPassword: '',
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
        backupType: true,
        accessKey: false,
        secretKey: false,
        projectId: false,
        ktDomainId: false,
        nasUrl: false,
        nasId: false,
        nasPassword: false,
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
        backupType: false,
        accessKey: false,
        secretKey: false,
        projectId: false,
        ktDomainId: false,
        nasUrl: false,
        nasId: false,
        nasPassword: false,
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
        backupType: "",
        accessKey: "",
        secretKey: "",
        projectId: "",
        ktDomainId: "",
        nasUrl: "",
        nasId: "",
        nasPassword: "",
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
        backupType: false,
        accessKey: false,
        secretKey: false,
        projectId: false,
        ktDomainId: false,
        nasUrl: false,
        nasId: false,
        nasPassword: false,
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
            backupType: 0,
            accessKey: '',
            secretKey: '',
            projectId: '',
            ktDomainId: '',
            nasUrl: '',
            nasId: '',
            nasPassword: '',
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
            backupType: "",
            accessKey: "",
            secretKey: "",
            projectId: "",
            ktDomainId: "",
            nasUrl: "",
            nasId: "",
            nasPassword: "",
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
            backupType: false,
            accessKey: false,
            secretKey: false,
            projectId: false,
            ktDomainId: false,
            nasUrl: false,
            nasId: false,
            nasPassword: false,
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
                            {isRegister ? (
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
                            ) : false}
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
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>* Backup Type</span>
                            <FormControl
                                size={fieldSize}
                                className={fieldClassName}
                                variant="filled"
                                error={errors.backupType}
                                disabled={disables.backupType}
                            >
                                <Select
                                    required={requires.backupType}
                                    name="backupType"
                                    value={fields.backupType}
                                    error={errors.backupType}
                                    onChange={(e) => {
                                        handleChangeField("backupType", e.target.value);
                                    }}
                                    onClick={handleMenuCompany}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem key={0} value={0}>
                                        <em>None</em>
                                    </MenuItem>
                                    {backupTypeList && backupTypeList.map((item, index) => {
                                        const key = index;
                                        return (
                                            <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText>{helpers.backupType}</FormHelperText>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={6} />
                    {fields.backupType === 1 ? (
                        <>
                            <hr className="cb_sidebar__horizon"/>
                            <Grid item xs={6}>
                                <div>
                                    <span className={labelClassName}>* KT Ucloud Access Key</span>
                                    <TextField
                                        className={fieldClassName}
                                        error={errors.accessKey}
                                        required={requires.accessKey}
                                        disabled={disables.accessKey}
                                        helperText={helpers.accessKey}
                                        name="accessKey"
                                        value={fields.accessKey}
                                        onChange={(e) => {
                                            handleChangeField("accessKey", e.target.value);
                                        }}
                                        variant={variant}
                                        size={fieldSize}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div>
                                    <span className={labelClassName}>* KT Ucloud Secret Key</span>
                                    <TextField
                                        className={fieldClassName}
                                        error={errors.secretKey}
                                        required={requires.secretKey}
                                        disabled={disables.secretKey}
                                        helperText={helpers.secretKey}
                                        name="secretKey"
                                        value={fields.secretKey}
                                        onChange={(e) => {
                                            handleChangeField("secretKey", e.target.value);
                                        }}
                                        variant={variant}
                                        size={fieldSize}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div>
                                    <span className={labelClassName}>* KT Ucloud Project ID</span>
                                    <TextField
                                        className={fieldClassName}
                                        error={errors.projectId}
                                        required={requires.projectId}
                                        disabled={disables.projectId}
                                        helperText={helpers.projectId}
                                        name="projectId"
                                        value={fields.projectId}
                                        onChange={(e) => {
                                            handleChangeField("projectId", e.target.value);
                                        }}
                                        variant={variant}
                                        size={fieldSize}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div>
                                    <span className={labelClassName}>* KT Ucloud Domain ID</span>
                                    <TextField
                                        className={fieldClassName}
                                        error={errors.ktDomainId}
                                        required={requires.ktDomainId}
                                        disabled={disables.ktDomainId}
                                        helperText={helpers.ktDomainId}
                                        name="ktDomainId"
                                        value={fields.ktDomainId}
                                        onChange={(e) => {
                                            handleChangeField("ktDomainId", e.target.value);
                                        }}
                                        variant={variant}
                                        size={fieldSize}
                                    />
                                </div>
                            </Grid>
                        </>
                    ) : <div/>}
                    {fields.backupType === 2 ? (
                        <>
                            <hr className="cb_sidebar__horizon"/>
                            <Grid item xs={6}>
                                <div>
                                    <span className={labelClassName}>* NAS URL</span>
                                    <TextField
                                        className={fieldClassName}
                                        error={errors.nasUrl}
                                        required={requires.nasUrl}
                                        disabled={disables.nasUrl}
                                        helperText={helpers.nasUrl}
                                        name="nasUrl"
                                        value={fields.nasUrl}
                                        onChange={(e) => {
                                            handleChangeField("nasUrl", e.target.value);
                                        }}
                                        variant={variant}
                                        size={fieldSize}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div>
                                    <span className={labelClassName}>* NAS ID</span>
                                    <TextField
                                        className={fieldClassName}
                                        error={errors.nasId}
                                        required={requires.nasId}
                                        disabled={disables.nasId}
                                        helperText={helpers.nasId}
                                        name="nasId"
                                        value={fields.nasId}
                                        onChange={(e) => {
                                            handleChangeField("nasId", e.target.value);
                                        }}
                                        variant={variant}
                                        size={fieldSize}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div>
                                    <span className={labelClassName}>* NAS Password</span>
                                    <TextField
                                        className={fieldClassName}
                                        error={errors.nasPassword}
                                        required={requires.nasPassword}
                                        disabled={disables.nasPassword}
                                        helperText={helpers.nasPassword}
                                        name="nasPassword"
                                        value={fields.nasPassword}
                                        onChange={(e) => {
                                            handleChangeField("nasPassword", e.target.value);
                                        }}
                                        variant={variant}
                                        size={fieldSize}
                                    />
                                </div>
                            </Grid>
                        </>
                    ) : <div/>}
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
                                    endIcon={<SendIcon/>}
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

export default WriteServer;
