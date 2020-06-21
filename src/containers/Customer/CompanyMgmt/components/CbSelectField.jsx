import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";

const CbSelectField = ({
                           labelValue,
                           classes,
                           name,
                           value,
                           onChange,
    }) => {
    const handleChange = (e) => {
        console.log("CbSelectField: ", e.target.value);
        onChange({name, value: e.target.value});
    };

    return (
        <FormControl
            variant="outlined"
            className={classes.formControl}
            size="small"
        >
            <InputLabel id="demo-simple-select-outlined-label">
                {labelValue}
            </InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={value}
                onChange={handleChange}
                label={name}
            >
                <MenuItem value="">
                    <em>사용 안함</em>
                </MenuItem>
                <MenuItem value={1}>개인 이메일 인증</MenuItem>
                <MenuItem value={2}>그룹 이메일 인증</MenuItem>
            </Select>
        </FormControl>
    );
};

CbSelectField.defaultProps = {
    label: '',
    required: false,
    width: '17em',
    labelFont: 'Nanum Square RoundB',
    labelFontSize: '13px',
    inputFont: 'Nanum Square RoundR',
    inputFontSize: '12px',
    disabled: false,
    nbName: '',
    nbValue: '',
};

export default CbSelectField;
