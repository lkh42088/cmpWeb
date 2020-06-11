import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';

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
                    <SidebarCategory title="자산관리" icon="diamond">
                        <SidebarLink title="서버" route="/assets/list"
                                     onClick={() => changeMenuTitle('자산관리', '서버', 'server')}/>
                        <SidebarLink title="네트워크" route="/assets/list"
                                     onClick={() => changeMenuTitle('자산관리', '네트워크', 'network')}/>
                        <SidebarLink title="파트/기타" route="/assets/list"
                                     onClick={() => changeMenuTitle('자산관리', '파트/기타', 'part')}/>
                    </SidebarCategory>
                    <SidebarCategory title="관리자" icon="diamond">
                        <SidebarLink title="계정관리" route="/customers/users"
                                     onClick={() => changeMenuTitle('관리자', '', '')}/>
                        <SidebarLink title="고객사관리" route="/customers/companies"
                                     onClick={() => changeMenuTitle('관리자', '고객사관리', '')}/>
                        <SidebarLink title="모니터링 관리" route="/management/monitoring/main"
                                     onClick={() => changeMenuTitle('관리자', '모니터링관리', '')}/>
                    </SidebarCategory>
                </ul>
            </div>
        );
    }
}

export default SidebarContent;
