import React from 'react';
import Scrollbar from 'react-smooth-scrollbar';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import SidebarContent from './SidebarContent';
import { SidebarProps } from '../../../shared/prop-types/ReducerProps';

const Sidebar = ({
  changeToDark, changeToLight, changeMobileSidebarVisibility, sidebar, changeMenuTitle,
}) => {
  const sidebarClass = classNames({
    sidebar: true,
    'cb_sidebar--show': sidebar.show,
    'cb_sidebar--collapse': sidebar.collapse,
  });

  return (
    <div className={sidebarClass}>
      <button className="cb_sidebar__back" type="button" onClick={changeMobileSidebarVisibility} />
      <Scrollbar className="cb_sidebar__scroll scroll">
        {/*company-name TAG*/}
        {/*<div className="cb_sidebar__wrapper cb_sidebar__wrapper--company">
          <br />
        </div>*/}
        <div className="cb_sidebar__wrapper cb_sidebar__wrapper--desktop">
          <SidebarContent
            onClick={() => {}}
            changeToDark={changeToDark}
            changeToLight={changeToLight}
            changeMenuTitle={changeMenuTitle}
          />
        </div>
        <div className="cb_sidebar__wrapper cb_sidebar__wrapper--mobile">
          <SidebarContent
            onClick={changeMobileSidebarVisibility}
            changeToDark={changeToDark}
            changeToLight={changeToLight}
            changeMenuTitle={changeMenuTitle}
          />
        </div>
      </Scrollbar>
    </div>
  );
};

Sidebar.propTypes = {
  sidebar: SidebarProps.isRequired,
  changeToDark: PropTypes.func.isRequired,
  changeToLight: PropTypes.func.isRequired,
  changeMobileSidebarVisibility: PropTypes.func.isRequired,
  changeMenuTitle: PropTypes.func.isRequired,
};

export default Sidebar;
