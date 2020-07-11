import React from 'react';
import { Route, Switch } from 'react-router-dom';

import BasicTables from '../../../EasyDev/Tables/BasicTables/index';
import DataTable from '../../../EasyDev/Tables/DataTable/index';
import EditableTable from '../../../EasyDev/Tables/EditableTable/index';
import MaterialTable from '../../../EasyDev/Tables/MaterialTable/index';

export default () => (
  <Switch>
    <Route path="/org/tables/basic_tables" component={BasicTables} />
    <Route path="/org/tables/data_table" component={DataTable} />
    <Route path="/org/tables/editable_table" component={EditableTable} />
    <Route path="/org/tables/material_table" component={MaterialTable} />
  </Switch>
);
