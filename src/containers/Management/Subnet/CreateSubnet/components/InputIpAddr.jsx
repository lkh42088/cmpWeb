import React, { useState } from 'react';
import { Field, reduxForm } from "redux-form";
import { withTranslation } from "react-i18next";
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from "react-redux";
import { inputSubnet } from '../../../../../redux/actions/subnetActions';

const InputIpAddr = ({
    icon, nameText, holderText, activeIcon, id, text,
}) => {
    // Hook
    const dispatch = useDispatch();
    const themeName = useSelector(({theme}) => ({
        className: theme.className,
    }));

    // Variable
    let isValid;
    const msg = document.getElementById(id);
    if (icon) {
        activeIcon = <Icon icon={activeIcon} />;
    }

    // Function
    const validateIp = (value) => {
        isValid = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value);
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("[InputIpAddr] name:", name, ",value:", value);
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
        }
        dispatch(inputSubnet({key: name, value}));
    };

    // 마우스 포인터가 필드를 벗어나면 redux 에 저장
    const handleBlur = (e) => {
        const { name, value } = e.target;
        isValid = validateIp(value);
        // if (isValid) {
        //     dispatch(inputSubnet({key: name, value}));
        // }
    };

    return (
        <>
            <div className="form__form-group-icon">
                {activeIcon}
            </div>
            <input
                id={id}
                name={nameText}
                component="input"
                type="ip"
                value={text}
                placeholder={holderText}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </>
    );
};

export default InputIpAddr;
// export default reduxForm({
//    form: 'input_ip_address',
// })(InputIpAddr);
// export default reduxForm({
//     form: 'input_ip_address',
// })(withTranslation('common')(InputIpAddr));
