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
import {
    TOP_MANAGER, CUSTOMER_MANAGER, NB_MANAGER, OPERATOR, UNREGISTERED_USER,
} from "../../../lib/var/globalVariable";

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

    let link = "/dashboards/customer";
    const getDashBoardLink = () => {
        if (user) {
            const {level} = user;
            if (level >= TOP_MANAGER && level <= CUSTOMER_MANAGER) {
                link = "/dashboards/manager";
            } else {
                link = "/dashboards/customer";
            }
        }
        return link;
    };

    const getMCDashBoardLink = () => {
        if (user) {
            const {level} = user;
            if (level >= TOP_MANAGER && level <= OPERATOR) {
                link = "/micro/dashboard";
            } else {
                link = "/micro/dashboard";
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
                case TOP_MANAGER:
                    if (sidebarDropdown) {
                        tempData = "block";
                    } else {
                        tempData = "flex";
                    }
                    break;
                case NB_MANAGER:
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

    const authMenuDisplay = (dropFlag, hybridFlag, userLevel, levelFlag) => {
        const menuDisplay = {display: "none"};
        if (user) {
            const {level} = user;

            // sidebar-dropdown & hybrid-cloud check
            if (sidebarDropdown === dropFlag && hybridCloud === hybridFlag) {
                if (sidebarDropdown === true) {
                    menuDisplay.display = "block";
                } else {
                    menuDisplay.display = "flex";
                }
            }

            // Hybrid-cloud level check
            if (hybridCloud === hybridFlag) {
                if (level > userLevel) {
                    menuDisplay.display = "none";
                } else {
                    menuDisplay.display = "block";
                }
            }

            // user level display
            if (levelFlag) {
                /*
                                if (level === userLevel) {
                                    menuDisplay.display = "block";
                                } else {
                                    menuDisplay.display = "none";
                                }
                */
                if (level <= UNREGISTERED_USER && level >= CUSTOMER_MANAGER) {
                    menuDisplay.display = "block";
                } else {
                    menuDisplay.display = "none";
                }
            }
        }

        return menuDisplay;
    };

    return (
        <div className="cb_sidebar__content">
            <ul className="cb_sidebar__block">
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

                {/*COMMON DASHBOARD*/}
                {/*sidebar-dropdown false*/}
                {/* <Link to={getDashBoardLink()}
                      onClick={() => changeMenuTitle('DASHBOARD', '', '')}
                >
                    <SidebarCategory title="DASHBOARD00"
                                     icon={outlineDashboard}
                                     style={authMenuDisplay(false, false, UNREGISTERED_USER)}
                    />
                </Link>*/}
                {/*sidebar-dropdown true*/}
                <SidebarLink title="DASHBOARD" icon={outlineDashboard} route={getDashBoardLink()}
                             onClick={() => changeMenuTitle('DASHBOARD', '', '')}
                    // style={handleAuthMenuDisplay(user, true)}
                             style={authMenuDisplay(true, false, UNREGISTERED_USER)}
                />

                {/*HYBRID CLOUD DASHBOARD*/}
                {/*sidebar-dropdown false*/}
                {/* <Link to={getMCDashBoardLink()}
                      onClick={() => changeMenuTitle('MICRO CLOUD', 'DASHBOARD', '')}
                >
                    <SidebarCategory title="DASHBOARD22"
                                     icon={outlineDashboard}
                                     style={authMenuDisplay(false, true, UNREGISTERED_USER)}
                    />
                </Link>*/}
                {/*sidebar-dropdown true*/}
                <SidebarLink title="DASHBOARD" icon={outlineDashboard}
                             route="/micro/dashboard"
                             onClick={() => changeMenuTitle('HYBRID CLOUD', 'DASHBOARD', '')}
                             style={authMenuDisplay(true, true, UNREGISTERED_USER)}
                />
                {/*before : UNREGISTERED_USER , after : OPERATOR*/}
                <SidebarCategory title="HYBRID CLOUD" icon={serverOutlineBadged}
                                 dropdown={dropdown}
                                 style={authMenuDisplay(sidebarDropdown, true, OPERATOR)}>
                    <SidebarLink title="SERVER" route="/micro/servers"
                                 onClick={() => changeMenuTitle('HYBRID CLOUD', 'SERVER', '')}/>
                    <SidebarLink title="NETWORK" route="/micro/networks"
                                 onClick={() => changeMenuTitle('HYBRID CLOUD', 'NETWORK', '')}
                                 style={authMenuDisplay(sidebarDropdown, true, NB_MANAGER)}/>
                    <SidebarLink title="IMAGE" route="/micro/images"
                                 onClick={() => changeMenuTitle('HYBRID CLOUD', 'IMAGE', '')}
                                 style={authMenuDisplay(sidebarDropdown, true, NB_MANAGER)}/>
                    <SidebarLink title="VM" route="/micro/vms"
                                 onClick={() => changeMenuTitle('HYBRID CLOUD', 'VM', '')}/>
                    <SidebarLink title="VM-CARD" route="/micro/vmsCard"
                                 onClick={() => changeMenuTitle('HYBRID CLOUD', 'VM', 'card')}/>
                    <SidebarLink title="Snapshot" route="/micro/snapshot"
                                 onClick={() => changeMenuTitle('HYBRID CLOUD', 'VM', 'snapshot')}/>
                </SidebarCategory>
                <SidebarCategory title="SERVER" icon={serverOutlineBadged}
                                 dropdown={dropdown}
                                 style={authMenuDisplay(sidebarDropdown, false, UNREGISTERED_USER)}>
                    <SidebarLink title="온프레미스" route="/assets/server"
                                 onClick={() => changeMenuTitle('SERVER', '온프레미스', 'server')}/>
                </SidebarCategory>
                <SidebarCategory title="NETWORK" icon={routerNetwork}
                                 dropdown={dropdown}
                                 style={authMenuDisplay(sidebarDropdown, false, UNREGISTERED_USER)}>
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
                                 style={authMenuDisplay(sidebarDropdown, hybridCloud, OPERATOR)}>
                    <SidebarLink title="계정 관리" route="/customers/users"
                                 onClick={hideSidebar}/>
                    <SidebarLink title="고객사 관리" route="/customers/companies"
                                 onClick={hideSidebar}/>
                    <SidebarLink title="서브넷 관리" route="/subnet"
                                 onClick={hideSidebar}
                                 style={authMenuDisplay(sidebarDropdown, false, UNREGISTERED_USER)}/>
                </SidebarCategory>
                <SidebarCategory title="SETTING" icon={monitorDashboard}
                                 dropdown={dropdown}
                                 style={authMenuDisplay(sidebarDropdown, false, UNREGISTERED_USER)}>
                    <SidebarLink title="SETTING" route="/setting"
                                 onClick={() => changeMenuTitle('SETTING', '', '')}/>
                </SidebarCategory>

                <SidebarLink title="VM CARD" icon={outlineDashboard}
                             route="/micro/vmsCard"
                             onClick={() => changeMenuTitle('VM CARD', '', 'card')}
                             style={authMenuDisplay(sidebarDropdown, true,
                                 UNREGISTERED_USER, true)}
                />

                <SidebarLink title="VM VNC" icon={outlineDashboard}
                             route="/micro/vmsPage"
                             onClick={() => changeMenuTitle('VM PAGE', '', 'page')}
                             style={authMenuDisplay(sidebarDropdown, true,
                                 UNREGISTERED_USER, true)}
                />

                <SidebarLink title="SNAPSHOT" icon={outlineDashboard}
                             route="/micro/snapshot"
                             onClick={() => changeMenuTitle('SNAPSHOT', '', '')}/>
                <SidebarLink title="VM Inventory" icon={outlineDashboard}
                             route="/micro/vms"
                             onClick={() => changeMenuTitle('VM Inventory', '', 'list')}
                             style={authMenuDisplay(sidebarDropdown, true,
                                 UNREGISTERED_USER, true)}
                />
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
