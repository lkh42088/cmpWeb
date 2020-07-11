import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Alerts from '../../../EasyDev/UI/Alerts/index';
import Buttons from '../../../EasyDev/UI/Buttons/index';
import Carousel from '../../../EasyDev/UI/Carousel/index';
import Collapse from '../../../EasyDev/UI/Collapse/index';
import Grids from '../../../EasyDev/UI/Grids';
import Modals from '../../../EasyDev/UI/Modals/index';
import Notifications from '../../../EasyDev/UI/Notification/index';
import Panels from '../../../EasyDev/UI/Panels/index';
import ProgressBars from '../../../EasyDev/UI/ProgressBars/index';
import RangeSliders from '../../../EasyDev/UI/RangeSliders/index';
import Tabs from '../../../EasyDev/UI/Tabs/index';
import Timeline from '../../../EasyDev/UI/Timeline/index';
import Tooltips from '../../../EasyDev/UI/Tooltips/index';
import Typography from '../../../EasyDev/UI/Typography/index';

export default () => (
  <Switch>
    <Route path="/ui/alerts" component={Alerts} />
    <Route path="/ui/buttons" component={Buttons} />
    <Route path="/ui/carousel" component={Carousel} />
    <Route path="/ui/collapse" component={Collapse} />
    <Route path="/ui/grids" component={Grids} />
    <Route path="/ui/modals" component={Modals} />
    <Route path="/ui/notifications" component={Notifications} />
    <Route path="/ui/panels" component={Panels} />
    <Route path="/ui/progress_bars" component={ProgressBars} />
    <Route path="/ui/range_sliders" component={RangeSliders} />
    <Route path="/ui/tabs" component={Tabs} />
    <Route path="/ui/timeline" component={Timeline} />
    <Route path="/ui/tooltips" component={Tooltips} />
    <Route path="/ui/typography" component={Typography} />
  </Switch>
);
