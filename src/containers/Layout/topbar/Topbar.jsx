import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import TopbarSidebarButton from './TopbarSidebarButton';
import TopbarProfile from './TopbarProfile';
import TopbarMail from './TopbarMail';
import TopbarNotification from './TopbarNotification';
import TopbarSearch from './TopbarSearch';
import TopbarLanguage from './TopbarLanguage';
import {UserProps, MenuTitleProps} from '../../../shared/prop-types/ReducerProps';

class Topbar extends PureComponent {
    static propTypes = {
        changeMobileSidebarVisibility: PropTypes.func.isRequired,
        changeSidebarVisibility: PropTypes.func.isRequired,
        user: UserProps.isRequired,
        menuTitle: MenuTitleProps.isRequired,
    };

    render() {
        const {
            changeMobileSidebarVisibility, changeSidebarVisibility, user, menuTitle,
        } = this.props;

        //const localMenuTitle = JSON.parse(localStorage.getItem("localMenuTitle"));

        return (
            <div className="topbar">
                <div className="topbar__wrapper">
                    <div className="topbar__left">
                        <TopbarSidebarButton
                            changeMobileSidebarVisibility={changeMobileSidebarVisibility}
                            changeSidebarVisibility={changeSidebarVisibility}
                        />
                        {/*<Link className="topbar__logo" to="/dashboard_default" />*/}
                        <div style={{paddingLeft: '10px'}}>
                            <span className="text-danger">Nubes-Bridge</span>
                            <h3 className="account__title">
                                {/*<span
                                  className="account__logo"> {localMenuTitle.title ? localMenuTitle.title : 'title'}
                                  <span
                                      className="account__logo-accent"> {localMenuTitle.subTitle ? localMenuTitle.subTitle : 'subTitle'}</span>
                              </span>*/}
                                <span className="account__logo">
                                    {menuTitle.title}
                                    <span className="account__logo-accent">
                                    {menuTitle.subTitle}
                                    </span>
                              </span>
                            </h3>
                        </div>
                    </div>
                    <div className="topbar__right">
                        <TopbarSearch/>
                        {/*<TopbarNotification/>*/}
                        {/*<TopbarMail new/>*/}
                        <TopbarProfile user={user}/>
                        {/*<TopbarLanguage/>*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default Topbar;
