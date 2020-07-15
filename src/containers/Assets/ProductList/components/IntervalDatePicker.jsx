/* eslint-disable no-param-reassign */
import React, {PureComponent} from 'react';
import DatePicker from 'react-datepicker';
import {isMobileOnly} from 'react-device-detect';
import MinusIcon from 'mdi-react/MinusIcon';
import PropTypes from 'prop-types';
import moment from 'moment';

class IntervalDatePickerField extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        // eslint-disable-next-line react/require-default-props
        value: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            earlyFlag: true,
        };
        this.handleChange = this.handleChange.bind(this);
    }


    componentDidMount() {
        const {
            rentDate,
        } = this.props;
        const {
            startDate, endDate,
        } = this.state;

        console.log("componentDidMount start : ", rentDate);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // 여기서는 setState 를 하는 것이 아니라
        // 특정 props 가 바뀔 때 설정하고 설정하고 싶은 state 값을 리턴하는 형태로
        // 사용됩니다.
        if (nextProps.value !== prevState.value && prevState.earlyFlag === true) {
            if (nextProps.value !== undefined && nextProps.value !== "|"
                && nextProps.value !== "" && typeof nextProps.value === "string") {
                if (nextProps.value.indexOf("|") !== -1) {
                    const startArr = new Date(moment(nextProps.value.split("|")[0]).format("YYYY/MM/DD"));
                    const endArr = new Date(moment(nextProps.value.split("|")[1]).format("YYYY/MM/DD"));
                    return {startDate: startArr, endDate: endArr, earlyFlag: false};
                }
            }
        }

        if (typeof nextProps.value === "string") {
            return {earlyFlag: true};
        }

        return null; // null 을 리턴하면 따로 업데이트 할 것은 없다라는 의미
        //return {earlyFlag: false};
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
        const {value} = this.props;

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
        <IntervalDatePickerField
            {...input}
        />
    );
};

renderIntervalDatePickerField.propTypes = {
    input: PropTypes.shape({
        onChange: PropTypes.func,
    }).isRequired,
};

export default renderIntervalDatePickerField;
