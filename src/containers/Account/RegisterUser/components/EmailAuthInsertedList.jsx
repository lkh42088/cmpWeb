import React from 'react';
import EmailAuthInsertedItem from "./EmailAuthInsertedItem";

const EmailAuthInsertedList = ({emailAuths, onRemove}) => (
        <div>
            {emailAuths && emailAuths.map(emailAuth => (
                <EmailAuthInsertedItem emailAuth={emailAuth} key={emailAuth.id} onRemove={onRemove}/>
            ))}
        </div>
    );

export default EmailAuthInsertedList;
