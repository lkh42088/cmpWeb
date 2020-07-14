import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import { isMobileOnly } from 'react-device-detect';
import PropTypes from 'prop-types';

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
          dateFormat="yyyy년MM월dd일"
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
