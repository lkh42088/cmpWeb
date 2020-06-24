import React, {Component} from 'react';
import PropTypes from 'prop-types';
import fileInvoiceDollar from '@iconify/icons-fa-solid/file-invoice-dollar';
import outlineDashboard from '@iconify/icons-ic/outline-dashboard';
import serverOutlineBadged from '@iconify/icons-clarity/server-outline-badged';
import routerNetwork from '@iconify/icons-mdi/router-network';
import monitorDashboard from '@iconify/icons-mdi/monitor-dashboard';
import usersIcon from '@iconify/icons-fa-solid/users';
import listAlt from '@iconify/icons-el/list-alt';
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
                    <SidebarCategory title="DASHBOARD"
                                     icon={outlineDashboard}
                                     onClick={title => changeMenuTitle('대시보드', '관리자', '')}
                    />
                    {/*    <SidebarLink title="관리자" style={{disable: "true"}}*/}
                    {/*                 route="/dashboards/manager"*/}
                    {/*                 onClick={() => changeMenuTitle('대시보드', '관리자', '')}/>*/}
                    {/*</SidebarCategory>*/}
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
                    {/*<SidebarCategory title="INVENTORY" icon={inventoryManagement}>*/}
                    {/*    <SidebarLink title="서버" route="/assets/list"*/}
                    {/*                 onClick={() => changeMenuTitle('자산관리', '서버', 'server')}/>*/}
                    {/*    <SidebarLink title="네트워크" route="/assets/list"*/}
                    {/*                 onClick={() => changeMenuTitle('자산관리', '네트워크', 'network')}/>*/}
                    {/*    <SidebarLink title="파트/기타" route="/assets/list"*/}
                    {/*                 onClick={() => changeMenuTitle('자산관리', '파트/기타', 'part')}/>*/}
                    {/*</SidebarCategory>*/}
                    <SidebarCategory title="BILLING" icon={fileInvoiceDollar} />
                    <SidebarCategory title="BOARD" icon={listAlt} />
                    <SidebarCategory title="MANAGER" icon={usersIcon}>
                        <SidebarLink title="계정 관리" route="/customers/users"
                                     onClick={() => changeMenuTitle('관리자', '계정 관리', '')}/>
                        <SidebarLink title="고객사 관리" route="/customers/admin/companies"
                                     onClick={() => changeMenuTitle('관리자', '고객사 관리', '')}/>
                        <SidebarLink title="서브넷 관리" route="/subnet"
                                     onClick={() => changeMenuTitle('관리자', '서브넷 관리', '')}/>
                    </SidebarCategory>
                    <SidebarCategory title="SETTING" icon={monitorDashboard} />
                </ul>
            </div>
        );
    }
}

export default SidebarContent;
