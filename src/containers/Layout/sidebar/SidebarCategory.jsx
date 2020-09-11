import React, {
    Component, useCallback, useEffect, useState,
} from 'react';
import {Badge, Collapse} from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Icon, InlineIcon} from '@iconify/react';
import {useDispatch, useSelector} from "react-redux";
import {clearSidebarWindows} from "../../../redux/actions/sidebarActions";

const flexStyle = {
    display: "flex",
};

const SidebarCategory = ({
    title, icon, isNew, children, dropdown, style,
}) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [hover, setHover] = useState(false);
    const [state, setState] = useState(false);
    // const {sidebarDropdown} = useSelector(({customizer}) => ({
    //     sidebarDropdown: customizer.sidebarDropdown,
    // }));
    const {collapse} = state;
    const {clearWindow} = useSelector(({sidebar}) => ({
        clearWindow: sidebar.clearWindow,
    }));
    const categoryClass = classNames({
        'cb_sidebar__category-wrap': true,
        'cb_sidebar__category-wrap--open': collapse,
        'cb_sidebar__category cb_sidebar__link': true,
    });
    const {sidebarDropdown} = useSelector(({customizer}) => ({
        sidebarDropdown: customizer.sidebarDropdown,
    }));

    const handleMouseEnter = () => {
        setHover(true);
    };
    const handleMouseLeave = () => {
        setHover(false);
    };

    let linkStyle;
    if (hover === true) {
        linkStyle = {
            position: "absolute",
        };
    } else {
        linkStyle = {
            position: "absolute",
            display: "none",
        };
    }

    const toggle = (e, titleTmp) => {
        const collapseId = document.getElementById(`collapseId_${titleTmp}`);
        const collapseName = document.getElementsByName("collapseName");

        for (let i = 0; i < collapseName.length; i += 1) {
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

    const handleClick = (e) => {
        setShow(!show);
        toggle(e, title);
    };

    // 사이드바 window 항목 클릭 시 window 닫힘
    useEffect(() => {
        if (clearWindow && clearWindow === true) {
            dispatch(clearSidebarWindows({value: false}));
            const collapseName = document.getElementsByName("collapseName");
            for (let i = 0; i < collapseName.length; i += 1) {
                collapseName[i].style.display = 'none';
            }
        }
    }, [clearWindow]);

    const toggleDropdown = () => {
        setState({collapse: !collapse});
    };

    return (
        // sidebar toggle : dropdown
        (sidebarDropdown)
            ? (
                <div style={style}>
                    <button className={categoryClass} type="button" onClick={toggleDropdown} style={{zIndex: "120"}}>
                        {icon ? <span className="cb_sidebar__link-icon"><Icon icon={icon}/></span> : ''}
                        <p className="cb_sidebar__link-title">
                            {title}
                            {isNew && <span className="cb_sidebar__hr"/>}
                        </p>
                        <span className="cb_sidebar__category-icon lnr lnr-chevron-right"/>
                    </button>
                    <Collapse isOpen={collapse} className="sidebar__submenu-wrap">
                        <ul className="sidebar__submenu">
                            <div>
                                {children}
                            </div>
                        </ul>
                    </Collapse>
                </div>
            )
            : (
                // sidebar toggle window
            /*<input className={`form-control round-lg ${this.state.valid ? '' : 'error'}`} />*/
                <div style={style}
                     onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <button className={categoryClass} type="button" onClick={handleClick} style={{zIndex: "120"}}>
                        {icon ? <span className="cb_sidebar__link-icon"><Icon icon={icon}/></span> : ''}
                        <p className="cb_sidebar__link-title">
                            {title}
                            {isNew && <span className="cb_sidebar__hr"/>}
                        </p>
                        {/*<span className="cb_sidebar__category-icon lnr lnr-chevron-right"/>*/}
                    </button>
                    <Collapse isOpen={show} id={`collapseId_${title}`} name="collapseName"
                              className="cb_sidebar__submenu-wrap"
                              style={{
                                  position: "absolute",
                                  zIndex: "110",
                                  display: "none",
                              }}>
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
                    <Collapse isOpen={hover} className="cb_sidebar__submenu-wrap" style={linkStyle}>
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
            )
    );
};

SidebarCategory.propTypes = {
    title: PropTypes.string.isRequired,
    isNew: PropTypes.bool,
};

SidebarCategory.defaultProps = {
    isNew: false,
};

export default React.memo(SidebarCategory);
