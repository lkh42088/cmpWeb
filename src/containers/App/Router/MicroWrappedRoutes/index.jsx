import React from 'react';
import {Route} from 'react-router-dom';
import Layout from '../../../Layout/index';
import MicroCloudDevices from '../../../MicroCloud/Devices/index';
import MicroCloudVms from '../../../MicroCloud/Vms/index';

export default () => (
    <div>
        <Layout/>
        <div className="container__wrap">
            <Route path="/micro/servers" component={MicroCloudDevices} />
            <Route path="/micro/vms" component={MicroCloudVms} />
        </div>
    </div>
);
