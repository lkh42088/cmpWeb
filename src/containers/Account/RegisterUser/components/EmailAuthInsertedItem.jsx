import React from "react";
import {MdRemoveCircleOutline} from "react-icons/md";

const EmailAuthInsertedItem = ({ emailAuth, onRemove }) => {
    const { id, email } = emailAuth;

    return (
        <div>
            <div className="text">{email}</div>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div className="remove" onClick={() => onRemove(id)}>
                <MdRemoveCircleOutline/>
            </div>
        </div>
    );
};

export default EmailAuthInsertedItem;
