import MuAvatar from "@material-ui/core/Avatar";
import Avatar from "react-avatar";
import PersonIcon from "@material-ui/icons/Person";
import {makeStyles} from '@material-ui/core/styles';
import {blue} from '@material-ui/core/colors';
import DownIcon from "mdi-react/ChevronDownIcon";
import {Collapse} from "reactstrap";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {
    setUser,
    setUserIdx,
    setUserPage,
} from "../../../redux/actions/usersActions";

import TopbarMenuLink from "./TopbarMenuLink";
import {getUserById, modifyUser} from "../../../lib/api/users";

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
    const dispatch = useDispatch();


    const {
        data,
    } = useSelector(({usersRd}) => ({
        data: usersRd.data,
    }));

    const toggle = () => {
        setCollapse(!collapse);
    };

    const profile = async () => {
        setCollapse(!collapse);
        /*const res = data.filter(item => item.userId === user.id);
        console.log("handleUserPage res[0] : ..... : ", res[0]);
        console.log("handleUserPage data : ..... : ", data);*/
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

    //console.log("TopbarProfile ....  user : ", user);
    //console.log("TopbarProfile ....  data : ", data);

    return (
        <div className="topbar__profile">
            <button className="topbar__avatar" type="button" onClick={toggle}>
                {(user && user.id) ? (
                    <Avatar className="topbar__avatar-img" name={user.id} size="40"/>
                ) : (
                    <MuAvatar className={classes.avatar}>
                        <PersonIcon/>
                    </MuAvatar>
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
                        onClick={logout}
                    />
                </div>
            </Collapse>
        </div>
    );
};

export default TopbarProfile;
