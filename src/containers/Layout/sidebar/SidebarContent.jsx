import React, {Component} from 'react';
import PropTypes from 'prop-types';
import outlineDashboard from '@iconify/icons-ic/outline-dashboard';
import serverOutlineBadged from '@iconify/icons-clarity/server-outline-badged';
import routerNetwork from '@iconify/icons-mdi/router-network';
import monitorDashboard from '@iconify/icons-mdi/monitor-dashboard';
import inventoryManagement from '@iconify/icons-carbon/inventory-management';
import usersIcon from '@iconify/icons-fa-solid/users';
import SidebarCategory from './SidebarCategory';
import SidebarLink from './SidebarLink';

class SidebarContent extends Component {
    static propTypes = {
        changeToDark: PropTypes.func.isRequired,
        changeToLight: PropTypes.func.isRequired,
        onClick: PropTypes.func.isRequired,
        changeMenuTitle: PropTypes.func.isRequired,
    };

    hideSidebar = () => {
        const {onClick} = this.props;
        onClick();
    };

    render() {
        const {changeToLight, changeToDark, changeMenuTitle} = this.props;

        return (
            <div className="cb_sidebar__content">
                <ul className="cb_sidebar__block">
                    {/*<SidebarCategory title="DASHBOARD" icon={outlineDashboard} route="/dashboards/manager"
                                     />*/}
                    <SidebarLink
                        title="DASHBOARD"
                        icon={outlineDashboard}
                        route="/dashboards/manager"
                        onClick={() => changeMenuTitle('대시보드', '관리자', 'server')}
                    />
                    <SidebarCategory title="SERVER" icon={serverOutlineBadged} />
                    <SidebarCategory title="NETWORK" icon={routerNetwork} />
                    <SidebarCategory title="INVENTORY" icon={inventoryManagement}>
                        <SidebarLink title="서버" route="/assets/list"
                                     onClick={() => changeMenuTitle('자산관리', '서버', 'server')}/>
                        <SidebarLink title="네트워크" route="/assets/list"
                                     onClick={() => changeMenuTitle('자산관리', '네트워크', 'network')}/>
                        <SidebarLink title="파트/기타" route="/assets/list"
                                     onClick={() => changeMenuTitle('자산관리', '파트/기타', 'part')}/>
                    </SidebarCategory>
                    <SidebarCategory title="MANAGER" icon={usersIcon}>
                        <SidebarLink title="계정관리" route="/customers/users"
                                     onClick={() => changeMenuTitle('관리자', '', '')}/>
                        <SidebarLink title="고객사관리" route="/customers/admin/companies"
                                     onClick={() => changeMenuTitle('관리자', '고객사관리', '')}/>
                        <SidebarLink title="고객사설정" route="/customers/admin/add-company"
                                     onClick={() => changeMenuTitle('관리자', '고객사설정', '')}/>
                        <SidebarLink title="Picker" route="/customers/admin/pick-company"
                                     onClick={() => changeMenuTitle('관리자', '고객사설정', '')}/>
                        <SidebarLink title="모니터링 관리" route="/management/monitoring/main"
                                     onClick={() => changeMenuTitle('관리자', '모니터링관리', '')}/>
                    </SidebarCategory>
                    <SidebarCategory title="SETTING" icon={monitorDashboard} />
                </ul>
            </div>
        );
    }
}

export default SidebarContent;
