import React, {Component} from 'react';
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
import SidebarCategory from './SidebarCategory';
import SidebarLink from './SidebarLink';
import {setUserPage} from "../../../redux/actions/usersActions";
import {setCompanyPage} from "../../../redux/actions/companiesActions";

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
            if (level >= 1 && level <= 5) {
                link = "/dashboards/manager";
            } else {
                link = "/dashboards/customer";
            }
        }
        return link;
    };

    return (
        (!sidebarDropdown)
            ? (
                <div className="cb_sidebar__content">
                    <ul className="cb_sidebar__block">
                        {/*test menu*/}
                        <SidebarCategory title="TEST" icon={emojiPeopleIcon} dropdown={dropdown}>
                            <SidebarLink title="TEMP" route="/test/temp"
                                         onClick={() => changeMenuTitle('TEST', 'TEMP', '')}/>
                        </SidebarCategory>
                        {user.id === 'ebjee' && (
                            <SidebarCategory title="EBJEE" icon={emojiPeopleIcon} dropdown={dropdown}>
                                <SidebarLink title="CHART" route="/test/chart"
                                             onClick={() => changeMenuTitle('TEST', 'CHART', '')}/>
                                <SidebarLink title="CODE" route="/test/code"
                                             onClick={() => changeMenuTitle('TEST', 'CODE', '')}/>
                                <SidebarLink title="TEMP" route="/test/temp"
                                             onClick={() => changeMenuTitle('TEST', 'TEMP', '')}/>
                            </SidebarCategory>
                        )}
                        <Link to={getDashBoardLink()} onClick={() => changeMenuTitle('DASHBOARD', '', '')} >
                            <SidebarCategory title="DASHBOARD" icon={outlineDashboard} />
                        </Link>
                        {hybridCloud && (
                                <SidebarCategory title="MICRO CLOUD" icon={serverOutlineBadged} dropdown={dropdown}>
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
                                    <SidebarLink title="VNC" route="/micro/vnc"
                                                 onClick={hideSidebar}/>
                                </SidebarCategory>
                        )}
                        <SidebarCategory title="SERVER" icon={serverOutlineBadged} dropdown={dropdown}>
                            <SidebarLink title="온프레미스" route="/assets/server"
                                         onClick={() => changeMenuTitle('SERVER', '온프레미스', 'server')}/>
                        </SidebarCategory>
                        <SidebarCategory title="NETWORK" icon={routerNetwork} dropdown={dropdown}>
                            <SidebarLink title="네트워크" route="/assets/network"
                                         onClick={() => changeMenuTitle('NETWORK', '네트워크', 'network')}/>
                            <SidebarLink title="파트/기타" route="/assets/part"
                                         onClick={() => changeMenuTitle('NETWORK', '파트/기타', 'part')}/>
                        </SidebarCategory>
                        {/*<SidebarCategory title="BILLING" icon={fileInvoiceDollar}/>*/}
                        {/*<SidebarCategory title="BOARD" icon={listAlt}/>*/}
                        <SidebarCategory title="MANAGER" icon={usersIcon} dropdown={dropdown}>
                            <SidebarLink title="계정 관리" route="/customers/users"
                                // onClick={() => changeMenuTitle('MANAGER', '계정 관리', '')}/>
                                         onClick={hideSidebar}/>
                            <SidebarLink title="고객사 관리" route="/customers/companies"
                                // onClick={() => changeMenuTitle('MANAGER', '고객사 관리', '')}/>
                                         onClick={hideSidebar}/>
                            <SidebarLink title="서브넷 관리" route="/subnet"
                                //onClick={() => changeMenuTitle('MANAGER', '서브넷 관리', '')}/>
                                         onClick={hideSidebar}/>
                        </SidebarCategory>
                        <SidebarCategory title="SETTING" icon={monitorDashboard} />
                    </ul>
                </div>
            )
            : (
                <div className="cb_sidebar__content">
                    <ul className="cb_sidebar__block">
                        <SidebarCategory title="TEST" icon={emojiPeopleIcon} dropdown={dropdown}>
                            <SidebarLink title="TEMP" route="/test/temp"
                                         onClick={() => changeMenuTitle('TEST', 'TEMP', '')}/>
                        </SidebarCategory>
                        {user.id === 'ebjee' && (
                            <SidebarCategory title="EBJEE" icon={emojiPeopleIcon} dropdown={dropdown}>
                                <SidebarLink title="CHART" route="/test/chart"
                                             onClick={() => changeMenuTitle('TEST', 'CHART', '')}/>
                                <SidebarLink title="CODE" route="/test/code"
                                             onClick={() => changeMenuTitle('TEST', 'CODE', '')}/>
                                <SidebarLink title="TEMP" route="/test/temp"
                                             onClick={() => changeMenuTitle('TEST', 'TEMP', '')}/>
                            </SidebarCategory>
                        )}
                        <SidebarLink title="DASHBOARD" icon={outlineDashboard} route={getDashBoardLink()}
                                     onClick={() => changeMenuTitle('DASHBOARD', '', '')}/>
                        {hybridCloud && (
                            <SidebarCategory title="MICRO CLOUD" icon={serverOutlineBadged} dropdown={dropdown}>
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
                                <SidebarLink title="VNC" route="/micro/vnc"
                                             onClick={hideSidebar}/>
                            </SidebarCategory>
                        )}
                        <SidebarCategory title="SERVER" icon={serverOutlineBadged} dropdown={dropdown}>
                            <SidebarLink title="온프레미스" route="/assets/server"
                                         onClick={() => changeMenuTitle('SERVER', '온프레미스', 'server')}/>
                        </SidebarCategory>
                        <SidebarCategory title="NETWORK" icon={routerNetwork} dropdown={dropdown}>
                            <SidebarLink title="네트워크" route="/assets/network"
                                         onClick={() => changeMenuTitle('NETWORK', '네트워크', 'network')}/>
                            <SidebarLink title="파트/기타" route="/assets/part"
                                         onClick={() => changeMenuTitle('NETWORK', '파트/기타', 'part')}/>
                        </SidebarCategory>
                        {/*<SidebarLink title="BILLING" icon={fileInvoiceDollar} route="/billing"
                                     onClick={() => changeMenuTitle('BILLING', '', '')}/>
                        <SidebarLink title="BOARD" icon={listAlt} route="/board"
                                     onClick={() => changeMenuTitle('BOARD', '', '')}/>*/}
                        <SidebarCategory title="MANAGER" icon={usersIcon} dropdown={dropdown}>
                            <SidebarLink title="계정 관리" route="/customers/users"
                                         onClick={hideSidebar}/>
                            <SidebarLink title="고객사 관리" route="/customers/companies"
                                         onClick={hideSidebar}/>
                            <SidebarLink title="서브넷 관리" route="/subnet"
                                         onClick={hideSidebar}/>
                        </SidebarCategory>
                        <SidebarLink title="SETTING" icon={monitorDashboard} route="/setting"
                                     onClick={() => changeMenuTitle('SETTING', '', '')}/>
                    </ul>
                </div>
            )
    );
};

SidebarContent.propTypes = {
    changeToDark: PropTypes.func.isRequired,
    changeToLight: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    changeMenuTitle: PropTypes.func.isRequired,
};

export default SidebarContent;
