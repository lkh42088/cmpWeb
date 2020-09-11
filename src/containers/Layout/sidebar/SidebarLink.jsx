import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Icon, InlineIcon } from '@iconify/react';
import {useDispatch} from "react-redux";
import {clearSidebarWindows} from "../../../redux/actions/sidebarActions";

const SidebarLink = ({
    title, icon, newLink, route, onClick, style,
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
            style={style}
        >
            <button className="cb_sidebar__link" type="button">
                {icon ? <span className="cb_sidebar__link-icon"><Icon icon={icon}/></span> : ''}
                <p className="cb_sidebar__link-title">
                    {title}
                    {newLink ? <Badge className="cb_sidebar__link-badge"><span>New</span></Badge> : ''}
                </p>
            </button>
        </NavLink>
    );
};

SidebarLink.propTypes = {
    title: PropTypes.string.isRequired,
    newLink: PropTypes.bool,
    route: PropTypes.string,
    onClick: PropTypes.func,
};

SidebarLink.defaultProps = {
    newLink: false,
    route: '/',
    onClick: () => {},
};

export default SidebarLink;
