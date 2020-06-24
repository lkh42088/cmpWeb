/* eslint-disable no-return-assign */
import React, { Component, useEffect } from 'react';
import {connect, useSelector, useDispatch} from "react-redux";
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NotificationSystem from 'rc-notification';

import {fetchPosts, setDeviceType} from '../../redux/actions/assetsAction';

import Topbar from './topbar/Topbar';
import TopbarWithNavigation from './topbar_with_navigation/TopbarWithNavigation';
import Sidebar from './sidebar/Sidebar';
import SidebarMobile from './topbar_with_navigation/sidebar_mobile/SidebarMobile';
import Customizer from './customizer/Customizer';

import { BasicNotification } from '../../shared/components/Notification';
import { changeMobileSidebarVisibility, changeSidebarVisibility } from '../../redux/actions/sidebarActions';
import { changeMenuTitle } from '../../redux/actions/titleActions';
import {
  changeThemeToDark, changeThemeToLight,
} from '../../redux/actions/themeActions';
import {
  changeDirectionToRTL, changeDirectionToLTR,
} from '../../redux/actions/rtlActions';
import { changeBorderRadius, toggleBoxShadow, toggleTopNavigation } from '../../redux/actions/customizerActions';
import {
  CustomizerProps, SidebarProps, ThemeProps, RTLProps, UserProps, MenuTitleProps,
} from '../../shared/prop-types/ReducerProps';
import {logout} from "../../redux/actions/accountActions";

let notification = null;

const showNotification = (rtl) => {
  notification.notice({
    content: <BasicNotification
      title="👋 Welcome to the Nubes-Bridge!"
      message="I wish you success. Enjoy!"
    />,
    duration: 5,
    closable: true,
    style: { top: 0, left: 'calc(100vw - 100%)' },
    className: `right-up ${rtl}-support`,
  });
};

class Layout extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    assetState: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    sidebar: SidebarProps.isRequired,
    customizer: CustomizerProps.isRequired,
    theme: ThemeProps.isRequired,
    rtl: RTLProps.isRequired,
    // user: UserProps.isRequired,
    menuTitle: MenuTitleProps.isRequired,
  };

  // (23jun2020,bhjung)
  state = {
      user: null,
  };

  componentWillMount() {
    const { dispatch } = this.props;

    // ebjee
    dispatch(changeMenuTitle('자산관리', '서버'));

    // (23jun2020,bhjung)
    const xuser = localStorage.getItem('user');
    if (xuser != null) {
      const jsonUser = JSON.parse(xuser);
      this.setState({user: jsonUser});
    }
  }

  componentDidMount() {
    const { rtl } = this.props;
    const { dispatch } = this.props;
    NotificationSystem.newInstance({ style: { top: 65 } }, n => notification = n);
    setTimeout(() => showNotification(rtl.direction), 700);
  }

  componentWillUnmount() {
    notification.destroy();
  }

  changeSidebarVisibility = () => {
    const { dispatch } = this.props;
    dispatch(changeSidebarVisibility());
  };

  changeMobileSidebarVisibility = () => {
    const { dispatch } = this.props;
    dispatch(changeMobileSidebarVisibility());
  };

  changeMenuTitle = (title, subTitle, val) => {
    const { assetState, dispatch } = this.props;
    dispatch(changeMenuTitle(title, subTitle));

    // ebjee
    if (title === '자산관리') {
      dispatch(setDeviceType(val));
   }
  };

  changeToDark = () => {
    const { dispatch } = this.props;
    dispatch(changeThemeToDark());
  };

  changeToLight = () => {
    const { dispatch } = this.props;
    dispatch(changeThemeToLight());
  };

  changeToRTL = () => {
    const { dispatch } = this.props;
    dispatch(changeDirectionToRTL());
  };

  changeToLTR = () => {
    const { dispatch } = this.props;
    dispatch(changeDirectionToLTR());
  };

  toggleTopNavigation = () => {
    const { dispatch } = this.props;
    dispatch(toggleTopNavigation());
  };

  changeBorderRadius = () => {
    const { dispatch } = this.props;
    dispatch(changeBorderRadius());
  };

  toggleBoxShadow = () => {
    const { dispatch } = this.props;
    dispatch(toggleBoxShadow());
  };

  logout = () => {
    const { dispatch } = this.props;
    dispatch(logout());
    localStorage.removeItem('user');
  }

  render() {
    const {
      customizer, sidebar, theme, rtl, menuTitle,
    } = this.props;
    const { user } = this.state;
    const layoutClass = classNames({
      layout: true,
      'layout--collapse': sidebar.collapse,
      'layout--top-navigation': customizer.topNavigation,
    });

    return (
      <div className={layoutClass}>
        <Customizer
          customizer={customizer}
          sidebar={sidebar}
          theme={theme}
          rtl={rtl}
          changeSidebarVisibility={this.changeSidebarVisibility}
          toggleTopNavigation={this.toggleTopNavigation}
          changeToDark={this.changeToDark}
          changeToLight={this.changeToLight}
          changeToRTL={this.changeToRTL}
          changeToLTR={this.changeToLTR}
          changeBorderRadius={this.changeBorderRadius}
          toggleBoxShadow={this.toggleBoxShadow}
        />
        {customizer.topNavigation
          ? (
            <TopbarWithNavigation
              changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
            />
          )
          : (
            <Topbar
              changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
              changeSidebarVisibility={this.changeSidebarVisibility}
              user={user}
              logout={this.logout}
            />
          )
        }
        {customizer.topNavigation
          ? (
            <SidebarMobile
              sidebar={sidebar}
              changeToDark={this.changeToDark}
              changeToLight={this.changeToLight}
              changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
            />
          )
          : (
            <Sidebar
              sidebar={sidebar}
              changeToDark={this.changeToDark}
              changeToLight={this.changeToLight}
              changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
              changeMenuTitle={this.changeMenuTitle}
              user={user}
            />
          )
        }
      </div>
    );
  }
}

export default withRouter(connect(state => ({
  customizer: state.customizer,
  sidebar: state.sidebar,
  theme: state.theme,
  rtl: state.rtl,
  menuTitle: state.menuTitle,
}))(Layout));
