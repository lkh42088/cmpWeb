import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import { isMobileOnly } from 'react-device-detect';
import PropTypes from 'prop-types';
import moment from "moment";

class DatePickerField extends PureComponent {
    constructor() {
        super();
        this.state = {
            startDate: new Date(),
            earlyFlag: true,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.value !== prevState.value && prevState.earlyFlag === true) {
            if (nextProps.value !== undefined && nextProps.value !== "0"
                && nextProps.value !== "" && typeof nextProps.value === "string") {
                const returnVal = new Date(moment(nextProps.value).format("YYYY/MM/DD"));
                return {startDate: returnVal, earlyFlag: false};
            }
        }

        if (typeof nextProps.value === "string") {
            return {earlyFlag: true};
        }

        return null;
    }

    handleChange(date) {
        const { onChange } = this.props;
        this.setState({
            startDate: date,
        });
        onChange(date);
    }

    render() {
        const { startDate } = this.state;
        const { value } = this.props;

        return (
            <div className="date-picker">
                <DatePicker
                    className="form__form-group-datepicker"
                    selected={startDate}
                    onChange={this.handleChange}
                    dateFormat="yyyy년MM월dd일"
                    dropDownMode="select"
                    popperPlacement="center"
                    withPortal={isMobileOnly}
                />
                {/*                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="yyyy/MM/dd"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker inline"
                            value={startDate}
                            onChange={this.handleChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>*/}
            </div>
        );
    }
}

const renderDatePickerField = (props) => {
    const {input} = props;
    return <DatePickerField {...input} />;
};

renderDatePickerField.propTypes = {
    input: PropTypes.shape({
        onChange: PropTypes.func,
        name: PropTypes.string,
    }).isRequired,
};

export default renderDatePickerField;
