import React, {Component} from 'react';
import PropTypes from 'prop-types';
import fileInvoiceDollar from '@iconify/icons-fa-solid/file-invoice-dollar';
import outlineDashboard from '@iconify/icons-ic/outline-dashboard';
import serverOutlineBadged from '@iconify/icons-clarity/server-outline-badged';
import routerNetwork from '@iconify/icons-mdi/router-network';
import monitorDashboard from '@iconify/icons-mdi/monitor-dashboard';
import usersIcon from '@iconify/icons-fa-solid/users';
import {Link} from "react-router-dom";
import listAlt from '@iconify/icons-el/list-alt';
import SidebarCategory from './SidebarCategory';
import SidebarLink from './SidebarLink';

const SidebarContent = ({
    changeToLight, changeToDark, changeMenuTitle, onClick, user,
}) => {
    const hideSidebar = () => {
        onClick();
    };

    let link = "/dashboards/customer";
    const getDashBoardLink = () => {
        console.log(user);
        if (user) {
            const {level} = user;
            if (level === 1 || level === 2) {
                link = "/dashboards/manager";
            } else {
                link = "/dashboards/customer";
            }
        }
        return link;
    };

    return (
        <div className="cb_sidebar__content">
            <ul className="cb_sidebar__block">
                <Link to={getDashBoardLink()} onClick={() => changeMenuTitle('DASHBOARD', '', '')} >
                    <SidebarCategory title="DASHBOARD" icon={outlineDashboard} />
                </Link>
                <SidebarCategory title="SERVER" icon={serverOutlineBadged}>
                    <SidebarLink title="온프레미스" route="/assets/server"
                                 onClick={() => changeMenuTitle('SERVER', '온프레미스', 'server')}/>
                </SidebarCategory>
                <SidebarCategory title="NETWORK" icon={routerNetwork} >
                    <SidebarLink title="네트워크" route="/assets/network"
                                 onClick={() => changeMenuTitle('NETWORK', '네트워크', 'network')}/>
                    <SidebarLink title="파트/기타" route="/assets/part"
                                 onClick={() => changeMenuTitle('NETWORK', '파트/기타', 'part')}/>
                </SidebarCategory>
                <SidebarCategory title="BILLING" icon={fileInvoiceDollar} />
                <SidebarCategory title="BOARD" icon={listAlt} />
                <SidebarCategory title="MANAGER" icon={usersIcon}>
                    <SidebarLink title="계정 관리" route="/customers/users"
                                 onClick={() => changeMenuTitle('관리자', '계정 관리', '')}/>
                    <SidebarLink title="고객사 관리" route="/customers/companies"
                                 onClick={() => changeMenuTitle('관리자', '고객사 관리', '')}/>
                    <SidebarLink title="서브넷 관리" route="/subnet"
                                 onClick={() => changeMenuTitle('관리자', '서브넷 관리', '')}/>
                </SidebarCategory>
                <SidebarCategory title="SETTING" icon={monitorDashboard} />
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
