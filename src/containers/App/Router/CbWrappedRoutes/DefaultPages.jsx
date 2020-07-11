import React from 'react';
import {Route, Switch} from 'react-router-dom';

import NotFound404 from "../../../EasyDev/DefaultPage/404";
import Calendar from '../../../EasyDev/DefaultPage/Calendar/index';
import FAQ from '../../../EasyDev/DefaultPage/Faq/index';
import Gallery from '../../../EasyDev/DefaultPage/Gallery/index';
import PricingCards from '../../../EasyDev/DefaultPage/PricingCards/index';
import TextEditor from '../../../EasyDev/DefaultPage/TextEditor/index';
import InvoiceTemplate from '../../../EasyDev/DefaultPage/InvoiceTemplate/index';
import SearchResults from '../../../EasyDev/DefaultPage/SearchResults/index';
import ProjectSummary from '../../../EasyDev/DefaultPage/ProjectSummary/index';

export default () => (
    <Switch>
        <Route path="/404" component={NotFound404}/>
        <Route path="/default_pages/calendar" component={Calendar}/>
        <Route path="/default_pages/faq" component={FAQ}/>
        <Route path="/default_pages/gallery" component={Gallery}/>
        <Route path="/default_pages/invoice_template" component={InvoiceTemplate}/>
        <Route path="/default_pages/pricing_cards" component={PricingCards}/>
        <Route path="/default_pages/project_summary" component={ProjectSummary}/>
        <Route path="/default_pages/search_results" component={SearchResults}/>
        <Route path="/default_pages/text_editor" component={TextEditor}/>
    </Switch>
);
