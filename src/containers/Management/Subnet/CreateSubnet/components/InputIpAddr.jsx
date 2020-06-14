import React, {useState} from 'react';
import {Field, reduxForm} from "redux-form";
import {withTranslation} from "react-i18next";
import MailRuIcon from "mdi-react/MailRuIcon";
import WebIcon from "mdi-react/WebIcon";
import { Icon } from '@iconify/react';

const InputIpAddr = ({
contents, icon, nameText, holderText, activeIcon,
}) => {
    const [ipAddr, setIpAddr] = useState('');
    if (icon === "MailRuIcon") {
        // activeIcon = <MailRuIcon />;
    } else if (icon === "WebIcon") {
        // activeIcon = <WebIcon />;
    } else {
        activeIcon = <Icon icon={activeIcon} />;
    }

    let isValid;
    const onChangeText = (e) => {
        isValid = /^(([1-9]?d|1dd|2[0-4]d|25[0-5])(.(?!$)|$)){4}$/.test(e.target.value);
        if (isValid === true) {
            console.log(e.target.value);
            setIpAddr(e.target.value);
        }
    };

    return (
        <>
            <div className="form__form-group-icon">
                {activeIcon}
            </div>
            <Field
                name={nameText}
                component="input"
                type="ip"
                placeholder={holderText}
                onChange={onChangeText}
            />
        </>
    );
};

export default reduxForm({
    form: 'horizontal_form_layout_with_icons',
})(withTranslation('common')(InputIpAddr));
