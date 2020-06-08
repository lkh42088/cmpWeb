import React, {useState} from 'react';
import {Field, reduxForm} from "redux-form";
import {withTranslation} from "react-i18next";
import MailRuIcon from "mdi-react/MailRuIcon";
import WebIcon from "mdi-react/WebIcon";
import AccountOutlineIcon from "mdi-react/AccountOutlineIcon";

const InputIpAddr = ({
contents, icon, nameText, holderText,
}) => {
    const [ipAddr, setIpAddr] = useState('');
    let activeIcon;
    if (icon === "MailRuIcon") {
        activeIcon = <MailRuIcon />;
    } else if (icon === "WebIcon") {
        activeIcon = <WebIcon />;
    } else {
        activeIcon = <AccountOutlineIcon />;
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
        <div className="form__form-group">
            <span className="form__form-group-label">{contents}</span>
            <div className="form__form-group-field">
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
            </div>
        </div>
    );
};

export default reduxForm({
    form: 'horizontal_form_layout_with_icons',
})(withTranslation('common')(InputIpAddr));
