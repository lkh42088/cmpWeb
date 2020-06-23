import TextField from "@material-ui/core/TextField";
import React from "react";
import styled from "styled-components";

/**
 * Material UI - TextField Props
 * https://github.com/mui-org/material-ui/blob/649ef2e34c10c90788b7506e88958c91f87f924c/src/TextField/TextField.js#L171
 * inputProps : https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes
 * (16jun2020,bhjung)
 */
const CbTextField = ({
        label,
        required,
        width,
        labelFont,
        inputFont,
        labelFontSize,
        inputFontSize,
        disabled,
        onChange,
        name,
        value,
        isError,
        helperText,
        // type,
    }) => {
    const handleChange = (event) => {
        event.preventDefault();
        console.log("name:", name, ", value:", event.target.value);
        onChange({name, value: event.target.value});
    };

    // console.log("label:", label, "nbName:", name, ", nbValue:", value);
    return (
        <TextField
            error={isError}
            required={required}
            InputLabelProps={{
                style: {
                    fontFamily: `${labelFont}`,
                    fontSize: `${labelFontSize}`,
                },
            }}
            inputProps={{
                style: {
                    fontFamily: `${inputFont}`,
                    fontSize: `${inputFontSize}`,
                    width: `${width}`,
                },
            }}
            size="small"
            label={label}
            variant="outlined"
            disabled={disabled}
            value={value}
            name={name}
            onChange={handleChange}
            helperText={helperText}
            // type={type}
        />
    );
};

CbTextField.defaultProps = {
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
    isError: false,
    helperText: '',
    // type: "",
};

export const StyledTextField = styled(TextField)`
    .MuiFormControl-root {
    }
    .MuiFormLabel-root {
        font-family: "Nanum Squre acEB";
    }
    label.Mui-focused {
        color: ${props => props.color || '#4ce1b6'};
    }
    .MuiOutlinedInput-root {
        fieldset {
            border-color: inherit;
        }
        &:hover fieldset {
            border-color: ${props => props.color || '#4ce1b6'};
        }
        &.Mui-focused fieldset {
            border-color: ${props => props.color || '#4ce1b6'};
        }
    }
`;

export default CbTextField;
