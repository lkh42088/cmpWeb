/* eslint-disable react/no-typos */
import React from 'react';
import {
    Button, ButtonToolbar, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import MenuDownIcon from 'mdi-react/MenuDownIcon';
import { EmailsProps } from '../../../../shared/prop-types/EmailProps';

const AssetsSearch = ({ emails, onChangePage, onChangeSelect }) => (
    <div className="inbox__emails-controls-wrap">
        <div className="inbox__emails-controls">
            <UncontrolledDropdown>
                <DropdownToggle className="icon icon--right" outline size="sm">
                    <p>소유권<MenuDownIcon /></p>
                </DropdownToggle>
                <DropdownMenu className="dropdown__menu">
                    <DropdownItem>자사장비</DropdownItem>
                    <DropdownItem>고객장비</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown>
                <DropdownToggle className="icon icon--right" outline size="sm">
                    <p>소유권 구분<MenuDownIcon /></p>
                </DropdownToggle>
                <DropdownMenu className="dropdown__menu">
                    <DropdownItem>고객소유장비</DropdownItem>
                    <DropdownItem>소유형임대</DropdownItem>
                    <DropdownItem>비소유형임대</DropdownItem>
                    <DropdownItem>재고장비</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
            <Button color="primary" onClick={e => e.preventDefault()}>검색</Button>
        </div>
        {/*<div className="inbox__emails-controls-right">
            <div className="inbox__emails-control-search">
                <input placeholder="Search" />
                <div className="inbox__emails-control-search-icon"><MagnifyIcon /></div>
            </div>
        </div>*/}
    </div>
);

AssetsSearch.propTypes = {
    emails: EmailsProps.isRequired,
    onChangePage: PropTypes.func.isRequired,
    onChangeSelect: PropTypes.func.isRequired,
};

export default AssetsSearch;
