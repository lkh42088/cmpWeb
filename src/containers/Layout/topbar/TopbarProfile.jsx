import React, { PureComponent } from 'react';
import DownIcon from 'mdi-react/ChevronDownIcon';
import { Collapse } from 'reactstrap';
import PropTypes from "prop-types";
import TopbarMenuLink from './TopbarMenuLink';
import { UserProps } from '../../../shared/prop-types/ReducerProps';

const Ava = `${process.env.PUBLIC_URL}/img/ava.png`;

class TopbarProfile extends PureComponent {
  static propTypes = {
    user: UserProps.isRequired,
    logout: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      collapse: false,
    };
  }

  toggle = () => {
    this.setState(prevState => ({ collapse: !prevState.collapse }));
  };

  render() {
    // const { user, auth0 } = this.props;
    const { user, logout } = this.props;
    const { collapse } = this.state;

    return (
      <div className="topbar__profile">
        <button className="topbar__avatar" type="button" onClick={this.toggle}>
          <img
            className="topbar__avatar-img"
            // src={(auth0.user && auth0.user.picture) || user.avatar || Ava}
            alt="avatar"
          />
          <p className="topbar__avatar-name">
            {/*{ auth0.loading ? 'Loading...' : (auth0.user && auth0.user.name) || user.fullName}*/}
          </p>
          <DownIcon className="topbar__icon" />
        </button>
        {collapse && <button className="topbar__back" type="button" onClick={this.toggle} />}
        <Collapse isOpen={collapse} className="topbar__menu-wrap">
          <div className="topbar__menu">
            <TopbarMenuLink
              title="My Profile"
              icon="user"
              path="/account/profile"
              onClick={this.toggle}
            />
            <TopbarMenuLink
              title="Calendar"
              icon="calendar-full"
              path="/default_pages/calendar"
              onClick={this.toggle}
            />
            <TopbarMenuLink
              title="Tasks"
              icon="list"
              path="/todo"
              onClick={this.toggle}
            />
            <TopbarMenuLink
              title="Inbox"
              icon="inbox"
              path="/mail"
              onClick={this.toggle}
            />
            <div className="topbar__menu-divider" />
            <TopbarMenuLink
              title="Account Settings"
              icon="cog"
              path="/account/profile"
              onClick={this.toggle}
            />
            <TopbarMenuLink
              title="Lock Screen"
              icon="lock"
              path="/lock_screen"
              onClick={this.toggle}
            />
            {/*{auth0.isAuthenticated && (*/}
            {/*  <TopbarMenuLink*/}
            {/*    title="Log Out Auth0"*/}
            {/*    icon="exit"*/}
            {/*    path="/log_in"*/}
            {/*    onClick={auth0.logout}*/}
            {/*  />*/}
            {/*)*/}
            {/*}*/}
            <TopbarMenuLink
              title="Log Out"
              icon="exit"
              path="/log_in"
              onClick={logout}
            />
          </div>
        </Collapse>
      </div>
    );
  }
}

export default TopbarProfile;
