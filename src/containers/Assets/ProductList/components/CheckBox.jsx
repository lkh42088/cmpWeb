/* eslint-disable jsx-a11y/label-has-for */
import React, { PureComponent } from 'react';
import CheckIcon from 'mdi-react/CheckIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class CheckBoxField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]).isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    color: PropTypes.string,
    valueChk: PropTypes.string,
  };

  static defaultProps = {
    label: '',
    disabled: false,
    className: '',
    color: '',
    valueChk: '1',
  };

  componentDidMount() {
    const { onChange, valueChk } = this.props;
    onChange(valueChk);
  }

  render() {
    const {
      disabled, className, name, value, onChange, label, color, valueChk,
    } = this.props;
    const CheckboxClass = classNames({
      'checkbox-btn': true,
      disabled,
    });

    console.log(label, "....체크박스 실행");
    //console.log(label, "....valueChk : ", Boolean(valueChk));

    return (
      <label
        className={`${CheckboxClass} ${className ? ` checkbox-btn--${className}` : ''}`}
        htmlFor={name}
      >
        <input
          className="checkbox-btn__checkbox"
          type="checkbox"
          id={name}
          name={name}
          onChange={onChange}
          checked={Boolean(Number(valueChk))}
          disabled={disabled}
        />
        <span
          className="checkbox-btn__checkbox-custom"
          style={color ? { background: color, borderColor: color } : {}}
        >
          <CheckIcon />
        </span>
        {className === 'button'
          ? (
            <span className="checkbox-btn__label-svg">
              <CheckIcon className="checkbox-btn__label-check" />
              <CloseIcon className="checkbox-btn__label-uncheck" />
            </span>
          ) : ''}
        <span className="checkbox-btn__label">
          {label}
        </span>
      </label>
    );
  }
}

const renderCheckBoxField = (props) => {
  const {
    input, label, defaultChecked, disabled, className, color, valueChk,
  } = props;

  return (
    <CheckBoxField
      {...input}
      label={label}
      defaultChecked={defaultChecked}
      disabled={disabled}
      className={className}
      color={color}
      valueChk={valueChk}
    />
  );
};

renderCheckBoxField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
  }).isRequired,
  label: PropTypes.string,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.string,
  valueChk: PropTypes.string,
};

renderCheckBoxField.defaultProps = {
  label: '',
  defaultChecked: false,
  disabled: false,
  className: '',
  color: '',
  valueChk: '1',
};

export default renderCheckBoxField;
