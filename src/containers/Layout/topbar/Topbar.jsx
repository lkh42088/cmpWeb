import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import InfoIcon from '@material-ui/icons/Info';

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
        // user: UserProps.isRequired,
        logout: PropTypes.func.isRequired,
    };

    render() {
        const {
            changeMobileSidebarVisibility, changeSidebarVisibility, user, logout,
        } = this.props;

        //log
        return (
            <div className="topbar">
                <div className="topbar__wrapper">
                    <div className="topbar__left">
                        <TopbarSidebarButton
                            changeMobileSidebarVisibility={changeMobileSidebarVisibility}
                            changeSidebarVisibility={changeSidebarVisibility}
                        />
                        <Link className="topbar__logo" to="/assets/server" />
                        {/*<div style={{paddingLeft: '10px'}}>
                            <span className="text-danger">-</span>
                            <h3 className="topbar__title">
                                <span
                                  className="account__logo"> {localMenuTitle.title ? localMenuTitle.title : 'title'}
                                  <span
                                      className="account__logo-accent"> {localMenuTitle.subTitle ? localMenuTitle.subTitle : 'subTitle'}</span>
                              </span>
                                <DoubleArrowIcon/>
                                <span className="topbar__menuTitle">
                                    {menuTitle.title}
                                    <span className="topbar__menuTitle-side">
                                    {menuTitle.subTitle}
                                    </span>
                              </span>
                            </h3>
                        </div>*/}
                    </div>
                    <div className="topbar__right">
                        {/*<TopbarSearch/>*/}
                        {/*<TopbarNotification/>*/}
                        {/*<TopbarMail new/>*/}
                        <TopbarProfile user={user} logout={logout}/>
                        {/*<TopbarLanguage/>*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default Topbar;
