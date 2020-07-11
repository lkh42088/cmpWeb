import React from 'react';
import { Route, Switch } from 'react-router-dom';


import Introduction from '../../../EasyDev/Documentation/01_introduction/index';
import Installation from '../../../EasyDev/Documentation/02_installation/index';
import FileStructure from '../../../EasyDev/Documentation/03_files_structure/index';
import Components from '../../../EasyDev/Documentation/04_components/index';
import Form from '../../../EasyDev/Documentation/05_forms/index';
import ColorThemes from '../../../EasyDev/Documentation/06_change_and_add_color_themes/index';
import NavigationItem from '../../../EasyDev/Documentation/07_new_navigation_item/index';
import Authentication from '../../../EasyDev/Documentation/08_authentication/index';
import Resources from '../../../EasyDev/Documentation/09_resources/index';
import Changelog from '../../../EasyDev/Documentation/10_changelog/index';
import FAQ from '../../../EasyDev/Documentation/11_faq/index';

export default () => (
  <Switch>
    <Route path="/documentation/introduction" component={Introduction} />
    <Route path="/documentation/installation" component={Installation} />
    <Route path="/documentation/file_structure" component={FileStructure} />
    <Route path="/documentation/components" component={Components} />
    <Route path="/documentation/form" component={Form} />
    <Route path="/documentation/color_themes" component={ColorThemes} />
    <Route path="/documentation/navigation_item" component={NavigationItem} />
    <Route path="/documentation/authentication" component={Authentication} />
    <Route path="/documentation/resources" component={Resources} />
    <Route path="/documentation/changelog" component={Changelog} />
    <Route path="/documentation/faq" component={FAQ} />
  </Switch>
);
