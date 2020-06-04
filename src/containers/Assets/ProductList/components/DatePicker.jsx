import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import { isMobileOnly } from 'react-device-detect';
import PropTypes from 'prop-types';
import moment from "moment";

class DatePickerField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      startDate: new Date(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    //console.log("😱 😱 DatePicker -> nextProps.value : ", nextProps.value);

    if (nextProps.value !== prevState.value) {
      if (nextProps.value !== undefined && nextProps.value !== "") {
        const date = new Date(moment(nextProps.value).format("YYYY/MM/DD"));
        //console.log("😡 startArr : ", date);
        return { startDate: date };
      }
    }
    return null; // null 을 리턴하면 따로 업데이트 할 것은 없다라는 의미
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
      </div>
    );
  }
}

const renderDatePickerField = (props) => {
  const { input } = props;
  return <DatePickerField {...input} />;
};

renderDatePickerField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
};

export default renderDatePickerField;
