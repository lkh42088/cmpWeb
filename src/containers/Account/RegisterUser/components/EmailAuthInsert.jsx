import React, {useCallback, useState} from 'react';
import { MdAdd } from 'react-icons/md';

const EmailAuthInsert = ({onInsert}) => {
    const [value, setValue] = useState('');

    const onChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    const onClick = useCallback((e) => {
        console.log('EmailAuthInsert: ', value);
        onInsert(value);
        setValue('');

        e.preventDefault();
    }, [onInsert, value]);

    return (
        <div>
            <input
                placeholder="email@example.com"
                value={value}
                onChange={onChange}
            />
            <button type="submit" onClick={onClick}>
                <MdAdd/>
            </button>
        </div>
    );
};

export default EmailAuthInsert;
