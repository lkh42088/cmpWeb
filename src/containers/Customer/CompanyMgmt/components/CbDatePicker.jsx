import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import React from "react";

/**
 * https://material-ui-pickers.dev/api/KeyboardDateTimePicker
 * (16jun2020,jungbh)
 */
const CbDatePicker = ({
                          label,
                          selectedDate,
                          handleDateChange,
                          width,
                          labelFont,
                          inputFont,
                          labelFontSize,
                          inputFontSize,
                      }) => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {/*<Grid container justify="space-around">*/}
        <KeyboardDatePicker
            disableToolbar
            variant="inline"
            inputVariant="outlined"
            // format="MM/dd/yyyy"
            format="yyyy년 MM월 dd일"
            // format="yyyy-MM-dd"
            margin="normal"
            id="date-picker-inline"
            label={label}
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
                'aria-label': 'change date',
            }}
            size="small"
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
                    fontWeight: 700,
                },
            }}
        />
        {/*</Grid>*/}
    </MuiPickersUtilsProvider>
);

CbDatePicker.defaultProps = {
    width: '12.3em',
    labelFont: 'Nanum Square RoundB',
    labelFontSize: '13px',
    inputFont: 'Nanum Square RoundR',
    inputFontSize: '12px',
};

export default CbDatePicker;
