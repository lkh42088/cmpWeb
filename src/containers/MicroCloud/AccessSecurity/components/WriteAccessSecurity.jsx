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
import {getMcServersByCpIdx} from "../../../../lib/api/microCloud";

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

const WriteAccessSecurity = (props) => {
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
    const [serverList, setServerList] = useState([]);
    const [menuCompany, setMenuCompany] = useState(false);
    const [openSearchCompany, setOpenSearchCompany] = useState(false);

    /*******************
     * Field
     *******************/
    const [fields, setFields] = useState({
        idx: '',
        cpName: '',
        cpIdx: 0,
        serverIdx: 0,
        serialNumber: '',
        ipAddr: '',
        comments: '',
    });

    const [requires, setRequireds] = useState({
        cpName: true,
        cpIdx: true,
        serverIdx: true,
        serialNumber: true,
        ipAddr: false,
        comments: false,
    });

    const [disables, setDisables] = useState({
        cpName: false,
        cpIdx: false,
        serverIdx: false,
        serialNumber: false,
        ipAddr: false,
        comments: false,
    });

    const [helpers, setHelpers] = useState({
        cpName: "",
        cpIdx: "",
        serverIdx: "",
        serialNumber: "",
        ipAddr: "",
        comments: "",
    });

    const [errors, setErrors] = useState({
        cpName: false,
        cpIdx: false,
        serverIdx: false,
        serialNumber: false,
        ipAddr: false,
        comments: false,
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
            serverIdx: 0,
            serialNumber: '',
            ipAddr: '',
            comments: '',
        });
        setHelpers({
            cpName: "",
            cpIdx: "",
            serverIdx: "",
            serialNumber: "",
            ipAddr: "",
            comments: "",
        });
        setErrors({
            cpName: false,
            cpIdx: false,
            serverIdx: false,
            serialNumber: false,
            ipAddr: false,
            comments: false,
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

    const getMcServers = async () => {
        try {
            console.log("cpIdx.. ", fields.cpIdx);
            const response = await getMcServersByCpIdx({
                cpIdx: fields.cpIdx,
            });
            console.log("get.. ", response);
            setServerList(response.data);
        } catch (e) {
            console.log("fail.. ");
            setServerList([]);
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
        if (fields.cpIdx > 0) {
            getMcServers();
        } else {
            setServerList([]);
        }
    }, [fields.cpIdx]);

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
                comments: data.comments,
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
                            <span className={labelClassName}>* Micro Cloud Server</span>
                            <FormControl
                                size={fieldSize}
                                className={fieldClassName}
                                variant="filled"
                                error={errors.serverIdx}
                                disabled={disables.serverIdx}
                            >
                                <Select
                                    required={errors.serverIdx}
                                    disabled={disables.serverIdx}
                                    name="serverIdx"
                                    value={fields.serverIdx}
                                    onChange={(e) => {
                                        console.log("serverIdx: ", e.target);
                                        console.log("serverIdx: value ", e.target.value);
                                        handleChangeField("serverIdx", e.target.value);
                                    }}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem key={0} value={0}>
                                        <em>None</em>
                                    </MenuItem>
                                    {serverList && serverList.map((item, index) => {
                                        const key = index;
                                        return (
                                            <MenuItem key={key} value={item.idx}>{item.serialNumber}</MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText>{helpers.serialNumber}</FormHelperText>
                            </FormControl>
                        </div>
                    </Grid>
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
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>* 비고</span>
                            <TextField
                                className={fieldClassName}
                                error={errors.comments}
                                required={requires.comments}
                                disabled={disables.comments}
                                helperText={helpers.comments}
                                name="comments"
                                value={fields.comments}
                                onChange={(e) => {
                                    handleChangeField("comments", e.target.value);
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

export default WriteAccessSecurity;
