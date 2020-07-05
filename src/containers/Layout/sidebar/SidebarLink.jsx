import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Icon, InlineIcon } from '@iconify/react';
import {useDispatch} from "react-redux";
import {clearSidebarWindows} from "../../../redux/actions/sidebarActions";

const SidebarLink = ({
    title, icon, newLink, route, onClick,
}) => {
    const dispatch = useDispatch();
    const handleClick = () => {
        onClick();
        dispatch(clearSidebarWindows({value: true}));
    };

    return (
        <NavLink
            to={route}
            onClick={handleClick}
            activeClassName="cb_sidebar__link-active"
        >
            <li className="cb_sidebar__link">
                {icon ? <span className="cb_sidebar__link-icon"><Icon icon={icon}/></span> : ''}
                <p className="cb_sidebar__link-title">
                    {title}
                    {newLink ? <Badge className="cb_sidebar__link-badge"><span>New</span></Badge> : ''}
                </p>
            </li>
        </NavLink>
    );
};

SidebarLink.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    newLink: PropTypes.bool,
    route: PropTypes.string,
    onClick: PropTypes.func,
};

SidebarLink.defaultProps = {
    icon: '',
    newLink: false,
    route: '/',
    onClick: () => {},
};

export default SidebarLink;
