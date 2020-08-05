import PropTypes from "prop-types";
import React from "react";
import {CustomizerProps} from "../../../shared/prop-types/ReducerProps";

const ToggleLogDetail = ({handleChange, customizer}) => (
    <label className="toggle-btn customizer__toggle" htmlFor="log_detail_toggle">
        <input
            className="toggle-btn__input"
            type="checkbox"
            name="log_detail_toggle"
            id="log_detail_toggle"
            checked={customizer.enableLogDetail}
            onChange={handleChange}
        />
        <span className="toggle-btn__input-label" />
        <span>Log Detail</span>
    </label>
);

ToggleLogDetail.propTypes = {
    customizer: CustomizerProps.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default ToggleLogDetail;
