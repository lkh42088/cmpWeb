import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainWrapper from '../MainWrapper';
import WrappedRoutes from './WrappedRoutes';
import CbWrappedRoutes from './CbWrappedRoutes';
import MicroWrappedRoutes from './MicroWrappedRoutes';
import LogInPage from "../../Login/LogInPage";
import LogInEmailAuth from "../../Login/AuthFromEmail";
import EdgeLaunch, {CheckIE, GuidePage} from "../../Common/BrowserCheck";

const Router = () => (
        <MainWrapper>
            <main>
                <Switch>
                    <Route exact path="/" component={LogInPage}/>
                    <Route path="/login/email/:id/:target/:secret" component={LogInEmailAuth}/>
                    <Route path="/login" component={LogInPage}/>
                    <Route path="/org" component={WrappedRoutes}/>
                    <Route path="/micro" component={MicroWrappedRoutes}/>
                    <Route path="/" component={CbWrappedRoutes}/>
                </Switch>
            </main>
        </MainWrapper>
    );

export default Router;
