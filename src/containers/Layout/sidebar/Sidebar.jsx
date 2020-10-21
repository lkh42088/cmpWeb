import React from 'react';
import Scrollbar from 'react-smooth-scrollbar';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {Collapse} from "reactstrap";
import {useSelector} from "react-redux";
import SidebarContent from './SidebarContent';
import { SidebarProps } from '../../../shared/prop-types/ReducerProps';
import {NORMAL_USER} from "../../../lib/var/globalVariable";

const Sidebar = ({
    changeToDark, changeToLight, changeMobileSidebarVisibility,
    sidebar, changeMenuTitle, user,
}) => {
    const sidebarClass = classNames({
        sidebar: true,
        'cb_sidebar--show': sidebar.show,
        'cb_sidebar--collapse': sidebar.collapse,
    });
    const {collapse} = sidebar;
    const {level} = user;

    const getCpName = () => {
        if (user) {
            const {cpName} = user;
            if (cpName) {
                return cpName;
            }
        }
        return "WELCOME";
    };

    return (
        <div
            className={sidebarClass}
            /*style={level === NORMAL_USER ? {display: "none"} : {display: ""}}*/
        >
            <button className="cb_sidebar__back" type="button" onClick={changeMobileSidebarVisibility} />
            <Scrollbar className="cb_sidebar__scroll scroll">
                {/*company-name TAG*/}
                <Collapse isOpen={!collapse} >
                    <div className="cb_sidebar__wrapper cb_sidebar__wrapper--company">
                        {getCpName()}
                    </div>
                    <hr className="cb_sidebar__horizon"/>
                </Collapse>
                <div className="cb_sidebar__wrapper cb_sidebar__wrapper--desktop">
                    <SidebarContent
                        onClick={() => {}}
                        changeToDark={changeToDark}
                        changeToLight={changeToLight}
                        changeMenuTitle={changeMenuTitle}
                        user={user}
                    />
                </div>
                <div className="cb_sidebar__wrapper cb_sidebar__wrapper--mobile">
                    <SidebarContent
                        onClick={changeMobileSidebarVisibility}
                        changeToDark={changeToDark}
                        changeToLight={changeToLight}
                        changeMenuTitle={changeMenuTitle}
                        user={user}
                    />
                </div>
            </Scrollbar>
        </div>
    );
};

Sidebar.propTypes = {
    sidebar: SidebarProps.isRequired,
    changeToDark: PropTypes.func.isRequired,
    changeToLight: PropTypes.func.isRequired,
    changeMobileSidebarVisibility: PropTypes.func.isRequired,
    changeMenuTitle: PropTypes.func.isRequired,
};

export default Sidebar;
