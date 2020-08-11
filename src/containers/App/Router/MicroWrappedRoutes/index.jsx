import React from 'react';
import {Route} from 'react-router-dom';
import Layout from '../../../Layout/index';
import MicroCloudDevices from '../../../MicroCloud/Devices/index';
import MicroCloudVms from '../../../MicroCloud/Vms/index';
import MicroCloudImages from '../../../MicroCloud/Images/index';
import MicroCloudNetworks from '../../../MicroCloud/Networks/index';

export default () => (
    <div>
        <Layout/>
        <div className="container__wrap">
            <Route path="/micro/servers" component={MicroCloudDevices} />
            <Route path="/micro/images" component={MicroCloudImages} />
            <Route path="/micro/networks" component={MicroCloudNetworks} />
            <Route path="/micro/vms" component={MicroCloudVms} />
        </div>
    </div>
);
