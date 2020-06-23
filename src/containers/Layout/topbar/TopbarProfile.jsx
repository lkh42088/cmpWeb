import MuAvatar from "@material-ui/core/Avatar";
import Avatar from "react-avatar";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import DownIcon from "mdi-react/ChevronDownIcon";
import {Collapse} from "reactstrap";
import React, {useState} from "react";
import TopbarMenuLink from "./TopbarMenuLink";

// const Ava = `${process.env.PUBLIC_URL}/img/ava.png`;

const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
        margin: '10px',
    },
});

// (23jun2020,bhjung) : change class to function style.
const TopbarProfile = (props) => {
    const classes = useStyles();
    const [collapse, setCollapse] = useState(false);
    const { user, logout } = props;

    const toggle = () => {
        setCollapse(!collapse);
    };

    return (
        <div className="topbar__profile">
            <button className="topbar__avatar" type="button" onClick={toggle}>
                {/*<img*/}
                {/*  className="topbar__avatar-img"*/}
                {/*  // src={(auth0.user && auth0.user.picture) || user.avatar || Ava}*/}
                {/*  alt="avatar"*/}
                {/*/>*/}
                {/*<Avatar className="topbar__avatar-img">*/}
                { (user && user.name) ? (
                    <Avatar className="topbar__avatar-img" name={user.name} size="40" />
                ) : (
                    <MuAvatar className={classes.avatar}>
                        <PersonIcon />
                    </MuAvatar>
                )}
                <p className="topbar__avatar-name">
                    {/*{ auth0.loading ? 'Loading...' : (auth0.user && auth0.user.name) || user.fullName}*/}
                </p>
                <DownIcon className="topbar__icon" />
            </button>
            {collapse && <button className="topbar__back" type="button" onClick={toggle} />}
            <Collapse isOpen={collapse} className="topbar__menu-wrap">
                <div className="topbar__menu">
                    <TopbarMenuLink
                        title="My Profile"
                        icon="user"
                        path="/account/profile"
                        onClick={toggle}
                    />
                    <TopbarMenuLink
                        title="Calendar"
                        icon="calendar-full"
                        path="/default_pages/calendar"
                        onClick={toggle}
                    />
                    <TopbarMenuLink
                        title="Tasks"
                        icon="list"
                        path="/todo"
                        onClick={toggle}
                    />
                    <TopbarMenuLink
                        title="Inbox"
                        icon="inbox"
                        path="/mail"
                        onClick={toggle}
                    />
                    <div className="topbar__menu-divider" />
                    <TopbarMenuLink
                        title="Account Settings"
                        icon="cog"
                        path="/account/profile"
                        onClick={toggle}
                    />
                    <TopbarMenuLink
                        title="Lock Screen"
                        icon="lock"
                        path="/lock_screen"
                        onClick={toggle}
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
};

export default TopbarProfile;
