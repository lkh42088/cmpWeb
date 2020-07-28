import React, {useState} from 'react';
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

const WriteVm = (props) => {
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
        name: '',
        image: '0',
        cpu: 0,
        ram: 0,
        hdd: 0,
        ipAddr: '',
    });

    const [requires, setRequireds] = useState({
        cpName: true,
        cpIdx: true,
        serialNumber: true,
        name: true,
        image: true,
        cpu: true,
        ram: true,
        hdd: true,
        ipAddr: true,
    });

    const [disables, setDisables] = useState({
        cpName: false,
        cpIdx: false,
        serialNumber: false,
        name: false,
        image: false,
        cpu: false,
        ram: false,
        hdd: false,
        ipAddr: false,
    });

    const [helpers, setHelpers] = useState({
        cpName: "",
        cpIdx: "",
        serialNumber: "",
        name: "",
        image: "",
        cpu: "",
        ram: "",
        hdd: "",
        ipAddr: "",
    });

    const [errors, setErrors] = useState({
        cpName: false,
        cpIdx: false,
        serialNumber: false,
        name: false,
        image: false,
        ipAddr: false,
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
            name: '',
            image: '0',
            cpu: 0,
            ram: 0,
            hdd: 0,
            ipAddr: '',
        });
        setHelpers({
            cpName: "",
            cpIdx: "",
            serialNumber: "",
            name: '',
            image: "",
            cpu: "",
            ram: "",
            hdd: "",
            ipAddr: "",
        });
        setErrors({
            cpName: false,
            cpIdx: false,
            serialNumber: false,
            name: false,
            image: false,
            cpu: false,
            ram: false,
            hdd: false,
            ipAddr: false,
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
                                    onChange={(e) => { handleChangeField("cpIdx", e.target.value); }}
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
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>* Micro Cloud Server</span>
                            <FormControl
                                size={fieldSize}
                                className={fieldClassName}
                                variant="filled"
                                error={errors.serialNumber}
                                disabled={disables.serialNumber}
                            >
                                <Select
                                    required={errors.serialNumber}
                                    disabled={disables.serialNumber}
                                    name="serialNumber"
                                    value={fields.serialNumber}
                                    onChange={(e) => { handleChangeField("serialNumber", e.target.value); }}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem key={0} value="0">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem key={1} value="1">Light</MenuItem>
                                    <MenuItem key={2} value="1">Standard</MenuItem>
                                    <MenuItem key={3} value="2">Advance</MenuItem>
                                </Select>
                                <FormHelperText>{helpers.serialNumber}</FormHelperText>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>* VM 이름</span>
                            <TextField
                                className={fieldClassName}
                                error={errors.name}
                                required={requires.name}
                                disabled={disables.name}
                                helperText={helpers.name}
                                name="name"
                                value={fields.name}
                                onChange={(e) => { handleChangeField("name", e.target.value); }}
                                variant={variant}
                                size={fieldSize}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>* Type</span>
                            <FormControl
                                size={fieldSize}
                                className={fieldClassName}
                                variant="filled"
                                error={errors.image}
                                disabled={disables.image}
                            >
                                <Select
                                    required={errors.image}
                                    disabled={disables.image}
                                    name="image"
                                    value={fields.image}
                                    onChange={(e) => { handleChangeField("image", e.target.value); }}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem key={0} value="0">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem key={1} value="1">Light</MenuItem>
                                    <MenuItem key={2} value="1">Standard</MenuItem>
                                    <MenuItem key={3} value="2">Advance</MenuItem>
                                </Select>
                                <FormHelperText>{helpers.image}</FormHelperText>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>* CPU</span>
                            <TextField
                                className={fieldClassName}
                                error={errors.cpu}
                                required={requires.cpu}
                                disabled={disables.cpu}
                                helperText={helpers.cpu}
                                name="cpu"
                                value={fields.cpu}
                                onChange={(e) => { handleChangeField("cpu", e.target.value); }}
                                variant={variant}
                                size={fieldSize}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>* RAM</span>
                            <TextField
                                className={fieldClassName}
                                error={errors.ram}
                                required={requires.ram}
                                disabled={disables.ram}
                                helperText={helpers.ram}
                                name="ram"
                                value={fields.ram}
                                onChange={(e) => { handleChangeField("ipAddr", e.target.value); }}
                                variant={variant}
                                size={fieldSize}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>* HDD</span>
                            <TextField
                                className={fieldClassName}
                                error={errors.hdd}
                                required={requires.hdd}
                                disabled={disables.hdd}
                                helperText={helpers.hdd}
                                name="hdd"
                                value={fields.hdd}
                                onChange={(e) => { handleChangeField("hdd", e.target.value); }}
                                variant={variant}
                                size={fieldSize}
                            />
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
                                onChange={(e) => { handleChangeField("ipAddr", e.target.value); }}
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

export default WriteVm;
