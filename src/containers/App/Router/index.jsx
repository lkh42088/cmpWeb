import React, {useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Card, CardBody, Col} from "reactstrap";
import MainWrapper from '../MainWrapper';
import WrappedRoutes from './WrappedRoutes';
import NbWrappedRoutes from './NbWrappedRoutes';
import MicroWrappedRoutes from './MicroWrappedRoutes';
import LogInPage from "../../Login/LogInPage";
import LogInEmailAuth from "../../Login/AuthFromEmail";
import EdgeLaunch, {CheckIE} from "../../Common/BrowserCheck";
import _BrowserWarring from "../../Common/_BrowserWarring";
import RouteIf from './RouteIf';

const Router = () => (
        <MainWrapper>
            <main>
                <Switch>
                    <Route exact path="/" component={LogInPage}/>
                    <Route path="/login/email/:id/:target/:secret" component={LogInEmailAuth}/>
                    <Route path="/login" component={LogInPage}/>
                    <Route path="/org" component={WrappedRoutes}/>
                    <Route path="/micro" component={MicroWrappedRoutes}/>
                    <Route path="/" component={NbWrappedRoutes}/>
                    {/*<RouteIf
                        path="/test/temp"
                        exact
                        component={NbWrappedRoutes}
                        role={JSON.parse(localStorage.getItem('user'))}
                    />*/}
                </Switch>
            </main>
        </MainWrapper>
    );

export default Router;
