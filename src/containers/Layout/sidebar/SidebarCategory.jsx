import React, {
    Component, useCallback, useEffect, useState,
} from 'react';
import {Badge, Collapse} from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Icon, InlineIcon} from '@iconify/react';
import {useDispatch, useSelector} from "react-redux";
import API_ROUTE from "../../../shared/apiRoute";

const SidebarCategory = ({
    title, icon, isNew, children,
}) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState('false');
    const [hover, setHover] = useState('false');

    const {
        titleRd, subTitleRd,
    } = useSelector(({menuTitle}) => ({
        titleRd: menuTitle.title,
        subTitleRd: menuTitle.subTitle,
    }));

    const toggle = (titleTmp) => {
        //setCollapse(!collapse);

        const collapseId = document.getElementById(`collapseId_${titleTmp}`);
        const collapseName = document.getElementsByName("collapseName");

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < collapseName.length; i++) {
            if (collapseName[i].id !== `collapseId_${titleTmp}`) {
                collapseName[i].style.display = 'none';
            }
        }

        if (collapseId.style.display === "none" || collapseId.style.display === "") {
            collapseId.style.display = "block";
        } else {
            collapseId.style.display = "none";
        }
    };

    const toggleHover = () => {
        setHover(!hover);
    };

    const hideSidebar = () => {
        setShow(!show);
        toggle(title);
    };

    const categoryClass = classNames({
        'cb_sidebar__category-wrap': true,
        'cb_sidebar__category-wrap--open': !show,
        'cb_sidebar__link cb_sidebar__category': true,
    });

    let linkStyle;
    if (hover) {
        linkStyle = {
            position: "absolute",
            display: "none",
        };
    } else {
        linkStyle = {
            position: "absolute",
        };
    }

    const handleClick = () => {
        hideSidebar();
    };

    return (
        <div style={{display: "flex"}} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
            <button className={categoryClass} type="button" onClick={handleClick} style={{zIndex: "120"}}>
                {icon ? <span className="cb_sidebar__link-icon"><Icon icon={icon}/></span> : ''}
                <p className="cb_sidebar__link-title">
                    {title}
                    {isNew && <span className="cb_sidebar__hr"/>}
                </p>
                {/*<span className="cb_sidebar__category-icon lnr lnr-chevron-right"/>*/}
            </button>
            <Collapse isOpen="false" id={`collapseId_${title}`} name="collapseName"
                      className="cb_sidebar__submenu-wrap"
                      style={{position: "absolute", zIndex: "110", display: "none"}}>
                {/** Collapse Sidebar hover window * */}
                <ul className="cb_sidebar__submenu">
                    <div className="cb_sidebar__submenu-wrap-border">
                        <div className="cb_sidebar__div_title">
                            {title}
                        </div>
                        <div type="button" className="cb_sidebar__div_button"
                             role="button" tabIndex="0">
                            {children}
                        </div>
                    </div>
                </ul>
            </Collapse>
            <Collapse isOpen={!hover} className="cb_sidebar__submenu-wrap" style={linkStyle}>
                {/** Sidebar hover window * */}
                <ul className="cb_sidebar__submenu">
                    <div className="cb_sidebar__submenu-wrap-border">
                        <div className="cb_sidebar__div_title">
                            {title}
                        </div>
                        <div type="button" className="cb_sidebar__div_button"
                             role="button" tabIndex="0">
                            {children}
                        </div>
                    </div>
                </ul>
            </Collapse>
        </div>
    );
};

SidebarCategory.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    isNew: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

SidebarCategory.defaultProps = {
    icon: '',
    isNew: false,
};

export default React.memo(SidebarCategory);
