import React from 'react';

const SubnetHeader = ({head, subhead}) => (
    <div className="cb_card__title" >
        <span className="cb_card__title-head">{head}</span>
        <span className="cb_card__title-subhead">{subhead}</span>
    </div>
);

export default SubnetHeader;
