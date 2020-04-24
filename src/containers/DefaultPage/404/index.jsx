import React from 'react';
import {Link, Route, NavLink} from 'react-router-dom';
import Image404 from '../../../shared/img/404/404.png';
import ProductList from "../../Assets/ProductList";
import SidebarLink from "../../Layout/sidebar/SidebarLink";

const NotFound404 = () => (
  <div className="not-found">
    <div className="not-found__content">
      <img className="not-found__image" src={Image404} alt="404" />
      <h3 className="not-found__info">Ooops! The page you are looking for could not be found :(</h3>
      {/*<Link className="btn btn-primary" to="/todo">todo</Link>
        <a href="/assets/list" title="개발 페이지 이동"><p style={style}>Development →</p></a>
        <SidebarLink title="Todo Application" icon="book" newLink route="/todo"/>*/}
    </div>
  </div>
);

export default NotFound404;
