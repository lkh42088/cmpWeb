import React from 'react';
import PropTypes from 'prop-types';
import {CustomizerProps} from '../../../shared/prop-types/ReducerProps';

const ToggleSidebar = ({changeToSidebar, customizer}) => (
    <label className="toggle-btn customizer__toggle" htmlFor="sidebar_toggle">
        <input
            className="toggle-btn__input"
            type="checkbox"
            name="sidebar_toggle"
            id="sidebar_toggle"
            checked={customizer.sidebarDropdown}
            onChange={changeToSidebar}
        />
        <span className="toggle-btn__input-label" />
        <span>Sidebar Dropdown</span>
    </label>
);

ToggleSidebar.propTypes = {
    customizer: CustomizerProps.isRequired,
    changeToSidebar: PropTypes.func.isRequired,
};

export default ToggleSidebar;
