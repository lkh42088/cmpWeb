import React from 'react';
import EmailAuthInsertedItem from "./EmailAuthInsertedItem";

const EmailAuthInsertedList = ({emailAuths, onRemove}) => (
        <div>
            {emailAuths && emailAuths.map(emailAuth => (
                <EmailAuthInsertedItem emailAuth={emailAuth} onRemove={onRemove}/>
            ))}
        </div>
    );

export default EmailAuthInsertedList;
