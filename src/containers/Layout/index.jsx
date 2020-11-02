/* eslint-disable no-return-assign */
import React, {useState, useEffect} from 'react';
import {connect, useSelector, useDispatch} from "react-redux";
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NotificationSystem from 'rc-notification';

import {
    fetchPosts, setDeviceType, setApiPage, setSearch,
    setDeviceSelected, setAssetsPage, setState,
    setDeviceByDeviceCode,
} from '../../redux/actions/assetsAction';

import Topbar from './topbar/Topbar';
import TopbarWithNavigation from './topbar_with_navigation/TopbarWithNavigation';
import Sidebar from './sidebar/Sidebar';
import SidebarMobile from './topbar_with_navigation/sidebar_mobile/SidebarMobile';
import Customizer from './customizer/Customizer';

import {BasicNotification} from '../../shared/components/Notification';
import {changeMobileSidebarVisibility, changeSidebarVisibility} from '../../redux/actions/sidebarActions';
import {changeMenuTitle} from '../../redux/actions/titleActions';
import {
    changeThemeToDark, changeThemeToLight,
} from '../../redux/actions/themeActions';
import {
    changeDirectionToRTL, changeDirectionToLTR,
} from '../../redux/actions/rtlActions';
import {
    changeBorderRadius,
    changeToSidebarDropdown,
    toggleBoxShadow,
    toggleTopNavigation,
    changeDensePadding, toggleHybridCloud, enableLogNormal, enableLogDetail,
} from '../../redux/actions/customizerActions';
import {logout} from "../../redux/actions/loginActions";
import {
    CustomizerProps, SidebarProps, ThemeProps, RTLProps, UserProps, MenuTitleProps,
} from '../../shared/prop-types/ReducerProps';
import {setUserPage} from "../../redux/actions/usersActions";
import {setCompanyPage} from "../../redux/actions/companiesActions";
import {changeVmPage, initVmPage} from "../../redux/actions/vmsActions";
import {NORMAL_USER} from "../../lib/var/globalVariable";

let notification = null;

const showNotification = (rtl) => {
    notification.notice({
        content: <BasicNotification
            title="👋 Welcome to the Contents-Bridge!"
            message="I wish you success. Enjoy!"
        />,
        duration: 5,
        closable: true,
        style: {
            top: 0,
            left: 'calc(100vw - 100%)',
        },
        className: `right-up ${rtl}-support`,
    });
};

const Layout = ({
                    customizer, sidebar, theme, rtl,
                }) => {
    const dispatch = useDispatch();
    //const [user, setUser] = useState('');
    const user = JSON.parse(localStorage.getItem("user"));
    const {level} = user;
    /*const getUser = () => {
        console.log("겟유저 함수를 실행합니까?>");
        const xuser = localStorage.getItem('user');
        if (xuser !== null) {
            if (typeof xuser === "string") {
                setUser(JSON.parse(xuser));
                return;
            }
            setUser(xuser);
        }
    };*/

    useEffect(() => {
        NotificationSystem.newInstance({style: {top: 65}}, n => notification = n);
        //getUser();
    }, []);

    const changeSidebarVisibilityFunc = () => {
        dispatch(changeSidebarVisibility());
    };

    const changeMobileSidebarVisibilityFunc = () => {
        dispatch(changeMobileSidebarVisibility());
    };

    const changeMenuTitleFunc = (title, subTitle, val) => {
        dispatch(changeMenuTitle(title, subTitle));
        dispatch(setUserPage('list'));
        dispatch(setCompanyPage('list'));

        // 자산관리 메뉴 선택 시
        if (title === 'SERVER' || title === 'NETWORK') {
            const submitDataPage = ({
                deviceType: val,
                orderBy: 'DeviceCode',
                order: '1',
                rowsPerPage: 10,
                page: 0,
                showPage: 1,
                outFlag: '0',
                offsetPage: 0,
            });

            const submitDataSearch = ({
                customer: '',
                deviceCode: '',
                deviceType: '',
                idc: '',
                manufacture: '',
                outFlag: '',
                ownership: '',
                ownershipDiv: '',
                operatingFlag: true,
                carryingFlag: false,
                rentPeriod: false,
            });

            const stateVal = ({
                page: 'list',
                type: 'device',
                division: 'outFlag',
                state: 'empty',
            });

            dispatch(setState(stateVal));
            dispatch(setDeviceType(val));
            //자산관리 메뉴 이동 시 초기화
            dispatch(setAssetsPage('list'));
            dispatch(setDeviceSelected(''));
            dispatch(setApiPage(submitDataPage));
            dispatch(setSearch(submitDataSearch));
            dispatch(setDeviceByDeviceCode(''));
        }

        if (val === "card") {
            dispatch(changeVmPage({
                pageType: 'card',
                data: null,
            }));
        } else if (val === "page") {
            dispatch(changeVmPage({
                pageType: 'page',
                data: null,
            }));
        } else {
            dispatch(changeVmPage({
                pageType: 'list',
                data: null,
            }));
        }
    };

    const changeToDarkFunc = () => {
        dispatch(changeThemeToDark());
    };

    const changeToLightFunc = () => {
        dispatch(changeThemeToLight());
    };

    const changeToRTLFunc = () => {
        dispatch(changeDirectionToRTL());
    };

    const changeToLTRFunc = () => {
        dispatch(changeDirectionToLTR());
    };

    const toggleTopNavigationFunc = () => {
        dispatch(toggleTopNavigation());
    };

    const changeBorderRadiusFunc = () => {
        dispatch(changeBorderRadius());
    };

    const toggleBoxShadowFunc = () => {
        dispatch(toggleBoxShadow());
    };

    const changeToSidebarDropdownFunc = () => {
        dispatch(changeToSidebarDropdown());
    };

    const changeDensePaddingFunc = () => {
        dispatch(changeDensePadding());
    };

    const toggleHybridCloudFunc = () => {
        dispatch(toggleHybridCloud());
    };

    const changeLogNormalFunc = () => {
        dispatch(enableLogNormal());
    };

    const changeLogDetailFunc = () => {
        dispatch(enableLogDetail());
    };

    const logoutFunc = () => {
        dispatch(logout());
    };

    const layoutClass = classNames({
        layout: true,
        'layout--collapse': sidebar.collapse,
        'layout--top-navigation': customizer.topNavigation,
    });

    /*console.log("customizer.topNavigation : ", customizer.topNavigation);
    console.log("sidebar : ", sidebar);*/
    //.container__wrap sidebar__submenu .customizer__wrap

    return (
        <div className={layoutClass}>
            <Customizer
                customizer={customizer}
                sidebar={sidebar}
                theme={theme}
                rtl={rtl}
                changeSidebarVisibility={changeSidebarVisibilityFunc}
                toggleTopNavigation={toggleTopNavigationFunc}
                changeToDark={changeToDarkFunc}
                changeToLight={changeToLightFunc}
                changeToRTL={changeToRTLFunc}
                changeToLTR={changeToLTRFunc}
                changeBorderRadius={changeBorderRadiusFunc}
                toggleBoxShadow={toggleBoxShadowFunc}
                changeToSidebarDropdown={changeToSidebarDropdownFunc}
                changeDensePadding={changeDensePaddingFunc}
                toggleHybridCloud={toggleHybridCloudFunc}
                changeLogNormal={changeLogNormalFunc}
                changeLogDetail={changeLogDetailFunc}
            />
            {customizer.topNavigation
                ? (
                    <TopbarWithNavigation
                        changeMobileSidebarVisibility={changeMobileSidebarVisibilityFunc}
                    />
                )
                : (
                    <Topbar
                        changeMobileSidebarVisibility={changeSidebarVisibilityFunc}
                        changeSidebarVisibility={changeSidebarVisibilityFunc}
                        user={user}
                        logout={logoutFunc}
                    />
                )
            }
            {/* eslint-disable-next-line no-nested-ternary */}
            {level === NORMAL_USER ? (
                    <SidebarMobile
                        sidebar={sidebar}
                        changeToDark={changeToDarkFunc}
                        changeToLight={changeToLightFunc}
                        changeMobileSidebarVisibility={changeMobileSidebarVisibilityFunc}
                        changeMenuTitle={changeMenuTitleFunc}
                        user={user}/>
                )
                : customizer.topNavigation ? (
                    <SidebarMobile
                        sidebar={sidebar}
                        changeToDark={changeToDarkFunc}
                        changeToLight={changeToLightFunc}
                        changeMobileSidebarVisibility={changeMobileSidebarVisibilityFunc}
                        changeMenuTitle={changeMenuTitleFunc}
                        user={user}
                    />
                ) : (
                    <Sidebar
                        sidebar={sidebar}
                        changeToDark={changeToDarkFunc}
                        changeToLight={changeToLightFunc}
                        changeMobileSidebarVisibility={changeMobileSidebarVisibilityFunc}
                        changeMenuTitle={changeMenuTitleFunc}
                        user={user}
                    />
                )}
            {/*{level !== NORMAL_USER ? (customizer.topNavigation
                    ? (
                        <SidebarMobile
                            sidebar={sidebar}
                            changeToDark={changeToDarkFunc}
                            changeToLight={changeToLightFunc}
                            changeMobileSidebarVisibility={changeMobileSidebarVisibilityFunc}
                            changeMenuTitle={changeMenuTitleFunc}
                            user={user}
                        />
                    )
                    : (
                        <Sidebar
                            sidebar={sidebar}
                            changeToDark={changeToDarkFunc}
                            changeToLight={changeToLightFunc}
                            changeMobileSidebarVisibility={changeMobileSidebarVisibilityFunc}
                            changeMenuTitle={changeMenuTitleFunc}
                            user={user}
                        />
                    )
                )
             : false}*/}
        </div>
    );
};

Layout.propTypes = {
    sidebar: SidebarProps.isRequired,
    customizer: CustomizerProps.isRequired,
    theme: ThemeProps.isRequired,
    rtl: RTLProps.isRequired,
};

export default withRouter(connect(state => ({
    customizer: state.customizer,
    sidebar: state.sidebar,
    theme: state.theme,
    rtl: state.rtl,
    menuTitle: state.menuTitle,
}))(Layout));
