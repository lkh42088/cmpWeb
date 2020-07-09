import React, {PureComponent} from 'react';
import DatePicker from 'react-datepicker';
import {isMobileOnly} from 'react-device-detect';
import PropTypes from 'prop-types';
import {Field} from "redux-form";
import CalendarBlankIcon from "mdi-react/CalendarBlankIcon";
import EditIcon from "@material-ui/icons/Edit";
import Grid from '@material-ui/core/Grid';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from "moment";

class DatePickerField extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        // eslint-disable-next-line react/require-default-props
        value: PropTypes.string,
    };

    constructor() {
        super();
        this.state = {
            startDate: new Date(),
            earlyFlag: true,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // 여기서는 setState 를 하는 것이 아니라
        // 특정 props 가 바뀔 때 설정하고 설정하고 싶은 state 값을 리턴하는 형태로
        // 사용됩니다.
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

        return null; // null 을 리턴하면 따로 업데이트 할 것은 없다라는 의미
        //return {earlyFlag: false};
    }

    handleChange(date) {
        const {onChange} = this.props;
        this.setState({
            startDate: date,
        });
        onChange(date);
    }

    render() {
        const {startDate} = this.state;
        const {value} = this.props;

        return (
            <div className="date-picker">
                <DatePicker
                    className="form__form-group-datepicker"
                    selected={startDate}
                    onChange={this.handleChange}
                    dateFormat="yyyy/MM/dd"
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
