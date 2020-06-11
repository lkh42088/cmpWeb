import React, {Component} from 'react';
import {Badge, Collapse} from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon, InlineIcon } from '@iconify/react';

export default class SidebarCategory extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        icon: PropTypes.string,
        isNew: PropTypes.bool,
        children: PropTypes.arrayOf(PropTypes.element).isRequired,
    };

    static defaultProps = {
        icon: '',
        isNew: false,
    };

    constructor() {
        super();
        this.state = {
            collapse: false,
            hover: false,
        };
    }

    toggle = () => {
        const {collapse} = this.state;
        this.setState({collapse: !collapse});
    };

    toggleHover = () => {
        const {collapse, hover} = this.state;
        this.setState({hover: !hover});
    };

    hideSidebar = () => {
        const {collapse} = this.state;
        this.setState({collapse: !collapse});
    };

    render() {
        const {
            title, icon, isNew, children,
        } = this.props;
        const {collapse, hover} = this.state;
        const categoryClass = classNames({
            'cb_sidebar__category-wrap': true,
            'cb_sidebar__category-wrap--open': collapse,
            'cb_sidebar__link cb_sidebar__category': true,
        });


        let linkStyle;
        if (hover) {
            linkStyle = {
                position: "absolute", zIndex: "115",
            };
        } else {
            linkStyle = {position: "absolute"};
        }

        return (
            <div style={{display: "flex"}}>
                <button className={categoryClass} type="button" onClick={this.toggle} style={{zIndex: "120"}}
                        onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                    {/*{icon ? <span className={`cb_sidebar__link-icon lnr lnr-${icon}`}/> : ''}*/}
                    {icon ? <Icon icon={icon} className="cb_sidebar__link-icon" /> : ''}
                    <p className="cb_sidebar__link-title">{title}
                        {isNew && <span className="cb_sidebar__category-new"/>}
                    </p>
                    <span className="cb_sidebar__category-icon lnr lnr-chevron-right"/>
                </button>
                <Collapse isOpen={collapse} className="cb_sidebar__submenu-wrap"
                          style={{position: "absolute", zIndex: "110"}}>
                    <ul className="cb_sidebar__submenu">
                        <div className="cb_sidebar__div_title">
                            {title}
                        </div>
                        <div type="button" className="cb_sidebar__div_button"
                             onClick={this.toggle} onKeyDown={this.toggle}
                             role="button" tabIndex="0">
                            {children}
                        </div>
                    </ul>
                </Collapse>
                <Collapse isOpen={hover} className="cb_sidebar__submenu-wrap" style={linkStyle}>
                    <ul className="cb_sidebar__submenu">
                        <div className="cb_sidebar__div_title">
                            {title}
                        </div>
                        <div type="button" className="cb_sidebar__div_button"
                             onClick={this.toggle} onKeyDown={this.toggle}
                             role="button" tabIndex="0">
                            {children}
                        </div>
                    </ul>
                </Collapse>
            </div>
        );
    }
}
