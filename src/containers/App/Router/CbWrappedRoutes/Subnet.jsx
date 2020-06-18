import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SubnetList from '../../../Management/Subnet/ReadSubnet';
import SubnetList2 from '../../../Management/Subnet/ReadSubnet/components/SubnetList2';
import SubnetWrite from '../../../Management/Subnet/CreateSubnet';

export default () => (
    <Switch>
        <Route path="/subnet/write" component={SubnetWrite} />
        <Route path="/subnet/list" component={SubnetList} />
        <Route path="/subnet/list2" component={SubnetList2} />
    </Switch>
);
