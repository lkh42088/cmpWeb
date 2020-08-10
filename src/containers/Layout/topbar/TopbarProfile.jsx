import MuAvatar from "@material-ui/core/Avatar";
import Avatar from "react-avatar";
import PersonIcon from "@material-ui/icons/Person";
import {makeStyles} from '@material-ui/core/styles';
import {blue} from '@material-ui/core/colors';
import DownIcon from "mdi-react/ChevronDownIcon";
import {Collapse} from "reactstrap";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {
    setUser,
    setUserIdx,
    setUserPage,
} from "../../../redux/actions/usersActions";
import {setCompanyPage} from "../../../redux/actions/companiesActions";

import TopbarMenuLink from "./TopbarMenuLink";
import {getUserById, modifyUser} from "../../../lib/api/users";

import {API_ROUTE, API_ROUTE_SERVER_IMAGE} from "../../../lib/api/client";

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
    const {user, logout} = props;
    const [avata, setAvata] = useState(user.avata);
    const dispatch = useDispatch();

    const {
        data,
    } = useSelector(({usersRd}) => ({
        data: usersRd.data,
    }));
    let copyUser = [...data];

    for (let i = 0; i < [...data].filter(el => el[1]).length; i += 1) {
        copyUser = copyUser.filter(obj => obj.userId === data[i].id);
    }

    const toggle = () => {
        setCollapse(!collapse);
    };

    const profile = async () => {
        setCollapse(!collapse);
        dispatch(setUserPage({userPage: 'view'}));
        try {
            const response = await getUserById({
                id: user.id,
            });
            dispatch(setUserIdx({userIdx: response.data.idx}));
            dispatch(setUser(response.data));
        } catch {
            console.log("topbar profile error");
        }
    };

    const logoutToggle = () => {
        //dispatch(setUserPage('list'));
        localStorage.removeItem('user');
        logout();
        dispatch(setUserPage('list'));
        dispatch(setCompanyPage('list'));
    };

    useEffect(() => {
        data.forEach((value, key) => {
            if (value.userId === user.id) {
                setAvata(value.avata);
            }
        });
    }, [data]);

    //console.log("TopbarProfile ....  user : ", user);
    //console.log("TopbarProfile ....  data : ", data);

    return (
        <div className="topbar__profile">
            <button className="topbar__avatar" type="button" onClick={toggle}>
                {/*{(user && user.id) ? (
                    <Avatar className="topbar__avatar-img" name={user.id} size="40"/>
                ) : (
                    <MuAvatar className={classes.avatar}>
                        <PersonIcon/>
                    </MuAvatar>
                )}*/}
                {avata == null || avata === "" ? (
                    <Avatar
                        className="topbar__avatar-img-list"
                        name={user.id}
                        size="40"
                        style={{
                            margin: "7px",
                        }}
                    />
                ) : (
                    <Avatar
                        className="topbar__avatar-img-list"
                        name={user.id}
                        size="40"
                        src={`${API_ROUTE_SERVER_IMAGE}/${avata}`}
                        style={{
                            margin: "7px",
                        }}
                    />
                )}
                <p className="topbar__avatar-name">
                    {user != null && user.name != null ? user.name : ""}
                </p>
                <DownIcon className="topbar__icon"/>
            </button>
            {collapse && <button className="topbar__back" type="button" onClick={toggle}/>}
            <Collapse isOpen={collapse} className="topbar__menu-wrap">
                <div className="topbar__menu">
                    <TopbarMenuLink
                        title="My Profile"
                        icon="user"
                        path="/customers/users"
                        onClick={profile}
                    />
                    {/*<TopbarMenuLink
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
                    />*/}
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
                        path="/login"
                        onClick={logoutToggle}
                    />
                </div>
            </Collapse>
        </div>
    );
};

export default TopbarProfile;
