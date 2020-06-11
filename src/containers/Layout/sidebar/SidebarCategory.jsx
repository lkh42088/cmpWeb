import React, { Component } from 'react';
import {Badge, Collapse} from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
    };
  }

  toggle = () => {
    const { collapse } = this.state;
    this.setState({ collapse: !collapse });
  };

  hideSidebar = () => {
    const { collapse } = this.state;
    this.setState({ collapse: !collapse });
  };

  render() {
    const {
      title, icon, isNew, children,
    } = this.props;
    const { collapse } = this.state;
    const categoryClass = classNames({
      'cb_sidebar__category-wrap': true,
      'cb_sidebar__category-wrap--open': collapse,
      'cb_sidebar__link cb_sidebar__category': true,
    });

    return (
      <div style={{display: "flex"}}>
        <button className={categoryClass} type="button" onClick={this.toggle}>
          {icon ? <span className={`cb_sidebar__link-icon lnr lnr-${icon}`} /> : ''}
          <p className="cb_sidebar__link-title">{title}
            {isNew && <span className="cb_sidebar__category-new" />}
          </p>
          <span className="cb_sidebar__category-icon lnr lnr-chevron-right" />
        </button>
        <Collapse isOpen={collapse} className="cb_sidebar__submenu-wrap" style={{position: "absolute"}}>
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
