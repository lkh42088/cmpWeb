import React, {useState} from 'react';
import {Field} from "redux-form";
import AccountOutlineIcon from "mdi-react/AccountOutlineIcon";
import MagnifyIcon from "mdi-react/MagnifyIcon";

const DeviceSearch = () => {
    const [search, setSearch] = useState(false);
    const [text, setText] = useState('');
    const onChangeText = (e) => {
        setText(e.target.value);
    };
    const onClickSearch = (e) => {
        e.preventDefault();
        setSearch(!search);
    };

    return (
        <div className="form__form-group">
            <span className="form__form-group-label">DEVICE 검색</span>
            <div className="form__form-group-field">
                <div className="form__form-group-icon">
                    {/*<AccountOutlineIcon />*/}
                </div>
                <Field
                    name="user_name"
                    component="input"
                    type="text"
                    placeholder="Device Code"
                    onChange={onChangeText}
                />
                <button
                    type="button"
                    className="form__form-group-button"
                    onClick={onClickSearch}
                ><MagnifyIcon />
                </button>
            </div>
        </div>
    );
};

export default DeviceSearch;
