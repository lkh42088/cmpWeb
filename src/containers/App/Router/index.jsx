import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Card, CardBody, Col} from "reactstrap";
import MainWrapper from '../MainWrapper';
import WrappedRoutes from './WrappedRoutes';
import CbWrappedRoutes from './CbWrappedRoutes';
import MicroWrappedRoutes from './MicroWrappedRoutes';
import LogInPage from "../../Login/LogInPage";
import LogInEmailAuth from "../../Login/AuthFromEmail";
import EdgeLaunch, {CheckIE} from "../../Common/BrowserCheck";
import BrowserWarring from "../../Common/BrowserWarring";
import RegisterUserPage from "../../Customer/Users/components/RegisterUserPage";

/*const Router = () => {
    /!** IE is right, Open 1.Edge 2.Chrome *!/
    if (CheckIE() === true) {
        //EdgeLaunch();
        return (
            <MainWrapper>
                <main>
                    <BrowserWarring/>
                </main>
            </MainWrapper>
        );
    } 
        return (
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
    
    //return null;
};*/

const Router = () => (
    <BrowserWarring/>
);

export default Router;
