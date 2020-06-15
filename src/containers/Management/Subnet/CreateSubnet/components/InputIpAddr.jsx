import React, { useState } from 'react';
import { Field, reduxForm } from "redux-form";
import { withTranslation } from "react-i18next";
import { Icon } from '@iconify/react';
import { useDispatch } from "react-redux";
import { inputSubnet } from '../../../../../redux/actions/subnetActions';
import {themes} from "../../../../../shared/helpers";

const InputIpAddr = ({
    icon, nameText, holderText, activeIcon, id, theme,
}) => {
    const dispatch = useDispatch();
    if (icon) {
        activeIcon = <Icon icon={activeIcon} />;
    }

    let isValid;
    const msg = document.getElementById(id);


    const handleChange = (e) => {
        // eslint-disable-next-line no-undef,react/no-this-in-sfc
        const { name, value } = e.target;
        console.log(test);
        isValid = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value);
        if (isValid === true) {
            console.log(name, value);
            if (isValid === 'theme-light') {
                msg.style.color = '#646777';
            } else {
                msg.style.color = '#dddddd';
            }
            dispatch(inputSubnet({key: name, value}));
        } else {
            msg.style.color = 'red';
        }
    };

    return (
        <>
            <div className="form__form-group-icon">
                {activeIcon}
            </div>
            <Field
                id={id}
                name={nameText}
                component="input"
                type="ip"
                placeholder={holderText}
                onChange={handleChange}
            />
        </>
    );
};

export default reduxForm({
    form: 'horizontal_form_layout_with_icons',
})(withTranslation('common')(InputIpAddr));
