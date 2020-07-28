import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SubnetList from '../../../Management/Subnet/ReadSubnet';
import SubnetList2 from '../../../Management/Subnet/ReadSubnet/components_backup/SubnetList2';
import SubnetWrite from '../../../Management/Subnet/CreateSubnet';
import SpringModal from "../../../Common/SpringModal";

export default () => (
    <Switch>
        <Route path="/subnet/write" component={SubnetWrite} />
        <Route path="/subnet" component={SubnetList} />
        <Route path="/subnet/2" component={SubnetList2} />
        <Route path="/subnet/3" component={SpringModal} />
    </Switch>
);
