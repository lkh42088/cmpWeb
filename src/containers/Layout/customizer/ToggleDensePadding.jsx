import React from 'react';
import PropTypes from 'prop-types';
import {CustomizerProps} from '../../../shared/prop-types/ReducerProps';

const ToggleDensePadding = ({changeDense, customizer}) => (
    <label className="toggle-btn customizer__toggle" htmlFor="dense_toggle">
        <input
            className="toggle-btn__input"
            type="checkbox"
            name="dense_toggle"
            id="dense_toggle"
            checked={customizer.densePadding}
            onChange={changeDense}
        />
        <span className="toggle-btn__input-label" />
        <span>Dense Padding</span>
    </label>
);

ToggleDensePadding.propTypes = {
    customizer: CustomizerProps.isRequired,
    changeDense: PropTypes.func.isRequired,
};

export default ToggleDensePadding;
