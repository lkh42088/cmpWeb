import React, {useState, Fragment} from 'react';
import {
    Card, CardBody, Col,
} from 'reactstrap';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import {Button} from "@material-ui/core";

import HistoryIcon from '@material-ui/icons/History';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';

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

const VmInfoSetting = (props) => {
    const {
        type, vm, handleSubmit,
    } = props;
    const variant = "filled";
    const fieldSize = "small";
    const buttonSize = "large";
    const formClassName = "cb-material-form";
    const labelClassName = "cb-material-form__label";
    const fieldClassName = "cb-material-form__field";

    console.log("★ ~~~~ > : ", vm);

    /*******************
     * Field
     *******************/
    const [fields, setFields] = useState({
        idx: vm.idx,
        cpIdx: vm.cpIdx,
        cpName: vm.cpName,
        vmIndex: vm.vmIndex,
        serverIdx: 0,
        snapDays: vm.snapDays,
        snapHours: vm.snapHours,
        snapMinutes: vm.snapMinutes,
        backupDays: 1,
        backupHours: 0,
        backupMinutes: 0,
    });

    const [errors, setErrors] = useState({
        snapDays: false,
        snapHours: false,
        snapMinutes: false,
    });

    /*******************
     * Change
     *******************/
    const handleChangeField = (name, value) => {
        console.log("change field: name ", name, ", value", value);
        if (name === "cpIdx") {
            setFields({
                ...fields,
                [name]: value,
            });
        } else if (name === "snapType") {
            setFields({
                ...fields,
                [name]: value,
                snapDays: 1,
                snapHours: 0,
                snapMinutes: 0,
            });
        } else if (name === "backupType") {
            setFields({
                ...fields,
                [name]: value,
                backupDays: 1,
                backupHours: 0,
                backupMinutes: 0,
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


    const handleSubmitInternal = () => {
        console.log("handleSubmitInternal() fields", fields);
        handleSubmit(fields);
        //reset();
    };

    return (
        <div>
            {type === "snapshot" ? (
                <div style={{
                    padding: "1rem 0 0 1rem",
                    background: "transition",
                }}>
                    <div className="vm__stats">
                        <form className={formClassName}>
                            <Grid container spacing={1}>
                                <Grid item xs={1} style={{
                                    margin: "10px 15px 10px 0",
                                    color: "#2d6187",
                                }}>
                                    <HistoryIcon/>
                                    <span style={{
                                        margin: "0 -9px",
                                        color: "#686d76",
                                    }}>Snapshot</span>
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
                                                value={fields.snapDays}
                                                onChange={(e) => {
                                                    handleChangeField("snapDays", e.target.value);
                                                }}
                                                style={selectListStyle}
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
                </div>
            ) : (
                <div style={{
                    padding: "1rem 0 0 1rem",
                    background: "transition",
                }}>
                    <div className="vm__stats">
                        <form className={formClassName}>
                            <Grid container spacing={1}>
                                <Grid item xs={1} style={{
                                    margin: "10px 15px 10px 0",
                                    color: "#b83b5e",
                                }}>
                                    <SettingsBackupRestoreIcon/>
                                    <span style={{
                                        margin: "0 -5px",
                                        color: "#f08a5d",
                                    }}>Backup</span>
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
                                                name="backDays"
                                                style={selectListStyle}
                                                value={0}
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
                                                name="backHours"
                                                style={selectListStyle}
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
                                                name="backMinutes"
                                                style={selectListStyle}
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
                                <Grid item xs={1}>
                                    <Tooltip title="수정" aria-label="수정">
                                        <IconButton
                                            type="button"
                                        >
                                            <AddIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VmInfoSetting;
