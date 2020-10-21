import React from 'react';
import Scrollbar from 'react-smooth-scrollbar';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import SidebarContent from './SidebarContent';
import { SidebarProps } from '../../../../shared/prop-types/ReducerProps';

const Sidebar = ({
  changeToDark, changeToLight, changeMobileSidebarVisibility, sidebar,
}) => {
  const sidebarClass = classNames({
    'sidebar sidebar--no-desktop': true,
    'sidebar--show': false,
  });

  return (
    <div className={sidebarClass} style={{
      border: "1px solid red",
      background: "blue",
      color: "green",
    }}>
      <button className="sidebar__back" type="button" onClick={changeMobileSidebarVisibility} />
      <Scrollbar className="sidebar__scroll scroll">
        <div className="sidebar__wrapper sidebar__wrapper--mobile" style={{
          border: "1px solid red",
          background: "blue",
          color: "green",
        }}>
          <SidebarContent
            onClick={changeMobileSidebarVisibility}
            changeToDark={changeToDark}
            changeToLight={changeToLight}
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
};


export default Sidebar;
