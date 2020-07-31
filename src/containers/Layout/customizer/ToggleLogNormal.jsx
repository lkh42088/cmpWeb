import PropTypes from "prop-types";
import React from "react";
import {CustomizerProps} from "../../../shared/prop-types/ReducerProps";

const ToggleLogNormal = ({handleChange, customizer}) => (
    <label className="toggle-btn customizer__toggle" htmlFor="log_normal_toggle">
        <input
            className="toggle-btn__input"
            type="checkbox"
            name="log_normal_toggle"
            id="log_normal_toggle"
            checked={customizer.enableLogNormal}
            onChange={handleChange}
        />
        <span className="toggle-btn__input-label" />
        <span>Log Normal</span>
    </label>
);

ToggleLogNormal.propTypes = {
    customizer: CustomizerProps.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default ToggleLogNormal;
