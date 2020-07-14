/* eslint-disable no-param-reassign */
import React, {PureComponent, Fragment} from 'react';
import DatePicker from 'react-datepicker';
import {isMobileOnly} from 'react-device-detect';
import MinusIcon from 'mdi-react/MinusIcon';
import PropTypes from 'prop-types';
import {Field} from "redux-form";
import CalendarBlankIcon from "mdi-react/CalendarBlankIcon";

class IntervalDatePickerField extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChangeStart = startDate => this.handleChange({startDate});

    handleChangeEnd = endDate => this.handleChange({endDate});

    handleChange({startDate, endDate}) {
        const {startDate: stateStartDate, endDate: stateEndDate} = this.state;

        const {onChange} = this.props;

        startDate = startDate || stateStartDate;
        endDate = endDate || stateEndDate;

        this.setState({startDate, endDate});
        onChange({start: startDate, end: endDate});
    }

    render() {
        const {startDate, endDate} = this.state;

        return (
            <div className="date-picker date-picker--interval">
                <DatePicker
                    selected={startDate}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    onChange={this.handleChangeStart}
                    dateFormat="yyyy년MM월dd일"
                    placeholderText="From"
                    dropDownMode="select"
                    withPortal={isMobileOnly}
                />
                <MinusIcon className="date-picker__svg"/>
                <DatePicker
                    selected={endDate}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    onChange={this.handleChangeEnd}
                    dateFormat="yyyy년MM월dd일"
                    placeholderText="To"
                    dropDownMode="select"
                    withPortal={isMobileOnly}
                />
            </div>
        );
    }
}

const renderIntervalDatePickerField = (props) => {
    const {input} = props;
    return (
        <Fragment>
            <IntervalDatePickerField
                {...input}
            />
        </Fragment>
    );
};

renderIntervalDatePickerField.propTypes = {
    input: PropTypes.shape({
        onChange: PropTypes.func,
    }).isRequired,
};

export default renderIntervalDatePickerField;
