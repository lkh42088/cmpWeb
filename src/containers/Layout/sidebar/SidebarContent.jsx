import React, {Component, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import emojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import fileInvoiceDollar from '@iconify/icons-fa-solid/file-invoice-dollar';
import outlineDashboard from '@iconify/icons-ic/outline-dashboard';
import serverOutlineBadged from '@iconify/icons-clarity/server-outline-badged';
import routerNetwork from '@iconify/icons-mdi/router-network';
import monitorDashboard from '@iconify/icons-mdi/monitor-dashboard';
import usersIcon from '@iconify/icons-fa-solid/users';
import {Link} from "react-router-dom";
import listAlt from '@iconify/icons-el/list-alt';
import {useDispatch, useSelector} from "react-redux";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import SidebarCategory from './SidebarCategory';
import SidebarLink from './SidebarLink';
import {setUserPage} from "../../../redux/actions/usersActions";
import {setCompanyPage} from "../../../redux/actions/companiesActions";
import {initVmPage} from "../../../redux/actions/vmsActions";

const SidebarContent = ({
                            changeToLight, changeToDark, changeMenuTitle, onClick,
                            user, dropdown, changeHybridCloud,
                        }) => {
    const dispatch = useDispatch();

    const hideSidebar = () => {
        onClick();
        dispatch(setUserPage('list'));
        dispatch(setCompanyPage('list'));
    };
    const {
        sidebarDropdown,
        hybridCloud,
    } = useSelector(({customizer}) => ({
        sidebarDropdown: customizer.sidebarDropdown,
        hybridCloud: customizer.hybridCloud,
    }));

    //const [authMenu, setAuthMenu] = useState('');

    //const {userLevel} = user;

    let link = "/dashboards/customer";
    const getDashBoardLink = () => {
        if (user) {
            const {level} = user;
            if (level >= 1 && level <= 5) {
                link = "/dashboards/manager";
            } else {
                link = "/dashboards/customer";
            }
        }
        return link;
    };

    const handleAuthMenuDisplay = (val, flag) => {
        let authMenuDisplay = {};
        let tempData = "block";
        if (val) {
            const {level} = user;
            switch (level) {
                case 1:
                    if (sidebarDropdown) {
                        tempData = "block";
                    } else {
                        tempData = "flex";
                    }
                    break;
                case 2:
                    if (flag) {
                        if (sidebarDropdown) {
                            tempData = "block";
                        } else {
                            tempData = "flex";
                        }
                    } else {
                        tempData = "none";
                    }
                    break;
                default:
                    break;
            }

            authMenuDisplay = {
                display: tempData,
            };
        }
        return authMenuDisplay;
    };

    useEffect(() => {
    }, [user]);

    return (
        <div className="cb_sidebar__content">
            {/*▶{user}◀*/}
            <ul className="cb_sidebar__block">
                <SidebarCategory title="TEST" icon={emojiPeopleIcon}
                                 dropdown={dropdown} style={handleAuthMenuDisplay(user, false)}>
                    <SidebarLink title="TEMP" route="/test/temp"
                                 onClick={() => changeMenuTitle('TEST', 'TEMP', '')}/>
                    <SidebarLink title="UI" route="/test/ui"
                                 onClick={() => changeMenuTitle('TEST', 'UI', '')}/>
                </SidebarCategory>
                {user.id === 'ebjee' && (
                    <SidebarCategory title="EBJEE" icon={emojiPeopleIcon} dropdown={dropdown}
                                     style={handleAuthMenuDisplay(user, false)}>
                        <SidebarLink title="CHART" route="/test/chart"
                                     onClick={() => changeMenuTitle('TEST', 'CHART', '')}/>
                        <SidebarLink title="CODE" route="/test/code"
                                     onClick={() => changeMenuTitle('TEST', 'CODE', '')}/>
                        <SidebarLink title="TEMP" route="/test/temp"
                                     onClick={() => changeMenuTitle('TEST', 'TEMP', '')}/>
                        <SidebarLink title="UI" route="/test/ui"
                                     onClick={() => changeMenuTitle('TEST', 'UI', '')}/>
                    </SidebarCategory>
                )}
                {!sidebarDropdown ? (
                    <Link to={getDashBoardLink()}
                          onClick={() => changeMenuTitle('DASHBOARD', '', '')}
                    >
                        <SidebarCategory title="DASHBOARD"
                                         icon={outlineDashboard}
                                         style={handleAuthMenuDisplay(user, true)}
                        />
                    </Link>
                ) : (
                    <SidebarLink title="DASHBOARD" icon={outlineDashboard} route={getDashBoardLink()}
                                 onClick={() => changeMenuTitle('DASHBOARD', '', '')}
                                 style={handleAuthMenuDisplay(user, true)}
                    />
                )}
                {hybridCloud && (
                    <SidebarCategory title="MICRO CLOUD" icon={serverOutlineBadged}
                                     dropdown={dropdown}
                                     style={handleAuthMenuDisplay(user, true)}
                    >
                        <SidebarLink title="DASHBOARD" route="/micro/dashboard"
                                     onClick={() => changeMenuTitle('MICRO CLOUD', 'DASHBOARD', '')}/>
                        <SidebarLink title="SERVER" route="/micro/servers"
                                     onClick={() => changeMenuTitle('MICRO CLOUD', 'SERVER', '')}/>
                        <SidebarLink title="NETWORK" route="/micro/networks"
                                     onClick={() => changeMenuTitle('MICRO CLOUD', 'NETWORK', '')}/>
                        <SidebarLink title="IMAGE" route="/micro/images"
                                     onClick={() => changeMenuTitle('MICRO CLOUD', 'IMAGE', '')}/>
                        <SidebarLink title="VM" route="/micro/vms"
                                     onClick={() => changeMenuTitle('MICRO CLOUD', 'VM', '')}/>
                        <SidebarLink title="VM-CARD" route="/micro/vmsCard"
                                     onClick={() => changeMenuTitle('MICRO CLOUD', 'VM', 'card')}/>
                    </SidebarCategory>
                )}
                <SidebarCategory title="SERVER" icon={serverOutlineBadged}
                                 dropdown={dropdown}
                                 style={handleAuthMenuDisplay(user, false)}>
                    <SidebarLink title="온프레미스" route="/assets/server"
                                 onClick={() => changeMenuTitle('SERVER', '온프레미스', 'server')}/>
                </SidebarCategory>
                <SidebarCategory title="NETWORK" icon={routerNetwork}
                                 dropdown={dropdown}
                                 style={handleAuthMenuDisplay(user, false)}>
                    <SidebarLink title="네트워크" route="/assets/network"
                                 onClick={() => changeMenuTitle('NETWORK', '네트워크', 'network')}/>
                    <SidebarLink title="파트/기타" route="/assets/part"
                                 onClick={() => changeMenuTitle('NETWORK', '파트/기타', 'part')}/>
                </SidebarCategory>
                {/*<SidebarLink title="BILLING" icon={fileInvoiceDollar} route="/billing"
                                     onClick={() => changeMenuTitle('BILLING', '', '')}/>
                        <SidebarLink title="BOARD" icon={listAlt} route="/board"
                                     onClick={() => changeMenuTitle('BOARD', '', '')}/>*/}
                <SidebarCategory title="MANAGER" icon={usersIcon}
                                 dropdown={dropdown}
                                 style={handleAuthMenuDisplay(user, false)}>
                    <SidebarLink title="계정 관리" route="/customers/users"
                                 onClick={hideSidebar}/>
                    <SidebarLink title="고객사 관리" route="/customers/companies"
                                 onClick={hideSidebar}/>
                    <SidebarLink title="서브넷 관리" route="/subnet"
                                 onClick={hideSidebar}/>
                </SidebarCategory>
                {/*<SidebarLink title="SETTING" icon={monitorDashboard} route="/setting"
                             onClick={() => changeMenuTitle('SETTING', '', '')}/>*/}
                <SidebarCategory title="SETTING" icon={monitorDashboard}
                                 dropdown={dropdown}
                                 style={handleAuthMenuDisplay(user, false)}>
                    <SidebarLink title="SETTING" route="/setting"
                                 onClick={() => changeMenuTitle('SETTING', '', '')}/>
                </SidebarCategory>
            </ul>
        </div>
    );
};

SidebarContent.propTypes = {
    changeToDark: PropTypes.func.isRequired,
    changeToLight: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    changeMenuTitle: PropTypes.func.isRequired,
};

export default SidebarContent;
