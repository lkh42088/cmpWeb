import React from 'react';
import { Route, Switch } from 'react-router-dom';

import BasicTables from '../../../Tables/BasicTables/index';
import DataTable from '../../../Tables/DataTable/index';
import EditableTable from '../../../Tables/EditableTable/index';
import MaterialTable from '../../../Tables/MaterialTable/index';

export default () => (
  <Switch>
    <Route path="/org/tables/basic_tables" component={BasicTables} />
    <Route path="/org/tables/data_table" component={DataTable} />
    <Route path="/org/tables/editable_table" component={EditableTable} />
    <Route path="/org/tables/material_table" component={MaterialTable} />
  </Switch>
);
