import React, { useState } from 'react';
import { Field, reduxForm } from "redux-form";
import { withTranslation } from "react-i18next";
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from "react-redux";
import { inputSubnet } from '../../../../../redux/actions/subnetActions';

const InputIpAddr = ({
    icon, nameText, holderText, activeIcon, id,
}) => {
    const dispatch = useDispatch();
    if (icon) {
        activeIcon = <Icon icon={activeIcon} />;
    }

    let isValid;
    const msg = document.getElementById(id);
    const themeName = useSelector(({theme}) => ({
        className: theme.className,
    }));

    const { subnetMask, gateway } = useSelector(({subnetRd}) => ({
        subnetMask: subnetRd.subnetMask,
        gateway: subnetRd.gateway,
    }));

    const validateIp = (value) => {
        isValid = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value);
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Check IP address
        isValid = validateIp(value);
        if (isValid === true) {
            // theme font-color 원복
            if (themeName.className === 'theme-light') {
                msg.style.color = '#646777';
            } else {
                msg.style.color = '#dddddd';
            }
        } else {
            // IP Address 형식에 맞지 않을 경우 font-color : red
            msg.style.color = 'red';
            console.log(gateway);
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        isValid = validateIp(value);
        if (isValid) {
            dispatch(inputSubnet({key: name, value}));
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
                onBlur={handleBlur}
            />
        </>
    );
};

export default reduxForm({
    form: 'input_ip_address',
})(withTranslation('common')(InputIpAddr));
