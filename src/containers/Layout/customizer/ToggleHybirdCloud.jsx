import PropTypes from "prop-types";
import React from "react";
import {CustomizerProps} from "../../../shared/prop-types/ReducerProps";

const ToggleHybridCloud = ({handleChange, customizer}) => (
    <label className="toggle-btn customizer__toggle" htmlFor="cloud_toggle">
        <input
            className="toggle-btn__input"
            type="checkbox"
            name="cloud_toggle"
            id="cloud_toggle"
            checked={customizer.hybridCloud}
            onChange={handleChange}
        />
        <span className="toggle-btn__input-label" />
        <span>Hybrid Cloud</span>
    </label>
);

ToggleHybridCloud.propTypes = {
    customizer: CustomizerProps.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default ToggleHybridCloud;
