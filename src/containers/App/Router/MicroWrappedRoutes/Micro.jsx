import React from 'react';
import {Route, Switch} from 'react-router-dom';

import MicroCloudDevices from '../../../MicroCloud/Devices/index';
import MicroCloudVms from '../../../MicroCloud/Vms/index';
import MicroCloudImages from '../../../MicroCloud/Images/index';
import MicroCloudNetworks from '../../../MicroCloud/Networks/index';
import MicroCloudVnc from "../../../MicroCloud/Vnc/index";
import MicroCloudDashboard from "../../../MicroCloud/Dashboard/index";
import MicroCloudSnapshot from "../../../MicroCloud/Snapshot/index";
/*import MicroCloudBackup from "../../../MicroCloud/Backup";*/

export default () => (
    <Switch>
        <Route path="/micro/servers" component={MicroCloudDevices}/>
        <Route path="/micro/images" component={MicroCloudImages}/>
        <Route path="/micro/networks" component={MicroCloudNetworks}/>
        <Route path="/micro/vnc" component={MicroCloudVnc}/>
        <Route path="/micro/dashboard" component={MicroCloudDashboard}/>
        <Route path="/micro/vms" component={MicroCloudVms}/>
        <Route path="/micro/vmsCard" component={MicroCloudVms}/>
        <Route path="/micro/snapshot" component={MicroCloudSnapshot}/>
        {/*<Route path="/micro/backup" component={MicroCloudBackup}/>*/}
        <Route path="/micro/vmsPage" component={MicroCloudVms}/>
    </Switch>
);
