import React, {useState, Fragment} from 'react';
import {
    Card, CardBody, Col,
} from 'reactstrap';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";

import HistoryIcon from '@material-ui/icons/History';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import CustomizedSwitches from './Switch';

const selectListStyle = {
    fontSize: "small",
    padding: "0",
};

const selectLabel = {
    position: "relative",
    bottom: "15px",
};

const dayList = [
    { value: 0, name: "0 days" },
    { value: 1, name: "1 days" },
    { value: 2, name: "2 days" },
    { value: 3, name: "3 days" },
    { value: 4, name: "4 days" },
    { value: 5, name: "5 days" },
    { value: 6, name: "6 days" },
    { value: 7, name: "1 week" },
    { value: 30, name: "1 month" },
];

const hourList = [
    { value: 0, name: "0" },
    { value: 1, name: "1" },
    { value: 2, name: "2" },
    { value: 3, name: "3" },
    { value: 4, name: "4" },
    { value: 5, name: "5" },
    { value: 6, name: "6" },
    { value: 7, name: "7" },
    { value: 8, name: "8" },
    { value: 9, name: "9" },
    { value: 10, name: "10" },
    { value: 11, name: "11" },
    { value: 12, name: "12" },
    { value: 13, name: "13" },
    { value: 14, name: "14" },
    { value: 15, name: "15" },
    { value: 16, name: "16" },
    { value: 17, name: "17" },
    { value: 18, name: "18" },
    { value: 19, name: "19" },
    { value: 20, name: "20" },
    { value: 21, name: "21" },
    { value: 22, name: "22" },
    { value: 23, name: "23" },
];

const minList = [
    { value: 0, name: "0" },
    { value: 5, name: "5" },
    { value: 10, name: "10" },
    { value: 15, name: "15" },
    { value: 20, name: "20" },
    { value: 25, name: "25" },
    { value: 30, name: "30" },
    { value: 35, name: "35" },
    { value: 40, name: "40" },
    { value: 45, name: "45" },
    { value: 50, name: "50" },
    { value: 55, name: "55" },
];

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const VmInfoSetting = (props) => {
    const classes = useStyles();
    const {
        type, vm, handleSubmitSnapshot, handleSubmitBackup,
    } = props;
    const variant = "filled";
    const fieldSize = "small";
    const buttonSize = "large";
    const formClassName = "cb-material-form";
    const labelClassName = "cb-material-form__label";
    const fieldClassName = "cb-material-form__field";

    /*******************
     * Field
     *******************/
    const [fields, setFields] = useState({
        idx: vm.idx,
        cpIdx: vm.cpIdx,
        cpName: vm.cpName,
        vmIndex: vm.vmIndex,
        serverIdx: 0,
        snapType: vm.snapType,
        snapDays: vm.snapDays,
        snapHours: vm.snapHours,
        snapMinutes: vm.snapMinutes,
        backupType: vm.backupType,
        backupDays: vm.backupDays,
        backupHours: vm.backupHours,
        backupMinutes: vm.backupMinutes,
    });

    const [errors, setErrors] = useState({
        snapType: false,
        snapDays: false,
        snapHours: false,
        snapMinutes: false,
    });

    /*******************
     * Change
     *******************/
    const handleChangeField = (name, value) => {
        //console.log("change field: name ", name, ", value", value);
        if (name === "cpIdx") {
            setFields({
                ...fields,
                [name]: value,
            });
        } else if (name === "snapshot") {
            setFields({
                ...fields,
                snapType: value,
            });
        } else if (name === "backup") {
            setFields({
                ...fields,
                backupType: value,
            });
        } else {
            setFields({
                ...fields,
                [name]: value,
            });
        }
        setErrors({
            ...errors,
            [name]: false,
        });
    };

    // eslint-disable-next-line no-shadow
    const handelChangeType = (type, val) => {
        //console.log("changeType type : ", type, ", val : ", val);
        let reVal = 0;
        if (val) {
            reVal = 1;
        }

        handleChangeField(type, reVal);
    };

    const handleSubmitInternal = () => {
        //console.log("handleSubmitInternal() fields", fields);

        if (type === "snapshot") {
            handleSubmitSnapshot(fields);
        } else {
            handleSubmitBackup(fields);
        }

        //reset();
    };

    return (
        <Card>
            {type === "snapshot" ? (
                <CardBody className="vm__card"
                          style={{
                              padding: "1.5rem 0 0 1rem",
                              background: "transition",
                          }}>
                    <div className="vm__stats">
                        <form className={formClassName}>
                            <Grid container spacing={1}>
                                <Grid item xs={1} style={{
                                    margin: "10px 15px 10px 0",
                                    color: "#2d6187",
                                }}>
                                    {/*<HistoryIcon/>
                                    <span style={{
                                        margin: "0 -9px",
                                        color: "#686d76",
                                    }}>Snapshot</span>*/}

                                    {/*<Button
                                        variant="contained"
                                        size="small"
                                        color="default"
                                        className={classes.button}
                                        startIcon={<HistoryIcon />}
                                    >
                                        Snapshot
                                    </Button>
                                    <Button
                                        variant="contained"
                                        disabled
                                        size="small"
                                        color="secondary"
                                        className={classes.button}
                                        startIcon={<HistoryIcon />}
                                    >
                                        Snapshot
                                    </Button>*/}
                                    <CustomizedSwitches
                                        type="snapshot"
                                        data={vm.snapType}
                                        chHandelChangeType={handelChangeType}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <div>
                                        <span className={labelClassName} style={selectLabel}>* Days </span>
                                        <FormControl
                                            size={fieldSize}
                                            className={fieldClassName}
                                            variant="filled"
                                            error={errors.snapDays}
                                            style={{
                                                marginTop: "-15px",
                                            }}
                                        >
                                            <Select
                                                required={errors.snapDays}
                                                name="snapDays"
                                                style={selectListStyle}
                                                value={fields.snapDays}
                                                onChange={(e) => {
                                                    handleChangeField("snapDays", e.target.value);
                                                }}
                                            >
                                               {/* <MenuItem key={0} value={0}>
                                                    <em>0 day</em>
                                                </MenuItem>*/}
                                                {dayList.map((item, index) => {
                                                    const key = index;
                                                    return (
                                                        <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </Grid>
                                <Grid item xs={3}>
                                    <div>
                                        <span className={labelClassName} style={selectLabel}>* Hours </span>
                                        <FormControl
                                            size={fieldSize}
                                            className={fieldClassName}
                                            variant="filled"
                                            error={errors.snapHours}
                                            style={{
                                                marginTop: "-15px",
                                            }}
                                        >
                                            <Select
                                                required={errors.snapHours}
                                                name="snapHours"
                                                value={fields.snapHours}
                                                onChange={(e) => {
                                                    handleChangeField("snapHours", e.target.value);
                                                }}
                                                style={selectListStyle}
                                            >
                                                {/*<MenuItem key={0} value={0}>
                                                    <em>0</em>
                                                </MenuItem>*/}
                                                {hourList.map((item, index) => {
                                                    const key = index;
                                                    return (
                                                        <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </Grid>
                                <Grid item xs={3}>
                                    <div>
                                        <span className={labelClassName} style={selectLabel}>* Minutes </span>
                                        <FormControl
                                            size={fieldSize}
                                            className={fieldClassName}
                                            variant="filled"
                                            error={errors.snapMinutes}
                                            style={{
                                                marginTop: "-15px",
                                            }}
                                        >
                                            <Select
                                                required={errors.snapMinutes}
                                                name="snapMinutes"
                                                value={fields.snapMinutes}
                                                onChange={(e) => {
                                                    handleChangeField("snapMinutes", e.target.value);
                                                }}
                                                style={selectListStyle}
                                            >
                                                {/*<MenuItem key={0} value={0}>
                                                    <em>0</em>
                                                </MenuItem>*/}
                                                {minList.map((item, index) => {
                                                    const key = index;
                                                    return (
                                                        <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </Grid>
                                <Grid item xs={1}>
                                    <Tooltip title="수정" aria-label="수정">
                                        <IconButton
                                            type="button"
                                            onClick={handleSubmitInternal}
                                        >
                                            <AddIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </CardBody>
            ) : (
                <CardBody className="vm__card"
                          style={{
                              padding: "1.5rem 0 0 1rem",
                              background: "transition",
                          }}>
                    <div className="vm__stats">
                        <form className={formClassName}>
                            <Grid container spacing={1}>
                                <Grid item xs={1} style={{
                                    margin: "10px 15px 10px 0",
                                    color: "#b83b5e",
                                }}>
                                    {/*<SettingsBackupRestoreIcon/>
                                    <span style={{
                                        margin: "0 -5px",
                                        color: "#f08a5d",
                                    }}>Backup</span>*/}
                                    <CustomizedSwitches
                                        type="backup"
                                        data={vm.backupType}
                                        chHandelChangeType={handelChangeType}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <div>
                                        <span className={labelClassName} style={selectLabel}>* Days </span>
                                        <FormControl
                                            size={fieldSize}
                                            className={fieldClassName}
                                            variant="filled"
                                            style={{
                                                marginTop: "-15px",
                                            }}
                                        >
                                            <Select
                                                name="backupDays"
                                                style={selectListStyle}
                                                value={fields.backupDays}
                                                onChange={(e) => {
                                                    handleChangeField("backupDays", e.target.value);
                                                }}
                                            >
                                                {dayList.map((item, index) => {
                                                    const key = index;
                                                    return (
                                                        <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </Grid>
                                <Grid item xs={3}>
                                    <div>
                                        <span className={labelClassName} style={selectLabel}>* Hours </span>
                                        <FormControl
                                            size={fieldSize}
                                            className={fieldClassName}
                                            variant="filled"
                                            style={{
                                                marginTop: "-15px",
                                            }}
                                            value={0}
                                        >
                                            <Select
                                                name="backupHours"
                                                style={selectListStyle}
                                                value={fields.backupHours}
                                                onChange={(e) => {
                                                    handleChangeField("backupHours", e.target.value);
                                                }}
                                            >
                                                {hourList.map((item, index) => {
                                                    const key = index;
                                                    return (
                                                        <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </Grid>
                                <Grid item xs={3}>
                                    <div>
                                        <span className={labelClassName} style={selectLabel}>* Minutes </span>
                                        <FormControl
                                            size={fieldSize}
                                            className={fieldClassName}
                                            variant="filled"
                                            style={{
                                                marginTop: "-15px",
                                            }}
                                            value={0}
                                        >
                                            <Select
                                                name="backupMinutes"
                                                style={selectListStyle}
                                                value={fields.backupMinutes}
                                                onChange={(e) => {
                                                    handleChangeField("backupMinutes", e.target.value);
                                                }}
                                            >
                                                {minList.map((item, index) => {
                                                    const key = index;
                                                    return (
                                                        <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </Grid>
                                <Grid item xs={1}>
                                    <Tooltip title="수정" aria-label="수정">
                                        <IconButton
                                            type="button"
                                            onClick={handleSubmitInternal}
                                        >
                                            <AddIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </CardBody>
            )}
        </Card>
    );
};

export default VmInfoSetting;
