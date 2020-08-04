import {Col, Container, Row} from "reactstrap";
import React from "react";
import {useSelector} from "react-redux";
import {SnackbarProvider} from 'notistack';
import CompanyList from "./components/CompanyList";
import CompanyView from "./components/CompanyView";
import RouterBreadcrumbs from "../../Layout/page/Breadcrumb";

const CompaniesModule = () => {
    const {page} = useSelector(({companiesRd}) => ({
        page: companiesRd.companyPage,
    }));
    return (
        <Container fluid>
            <Row>
                <RouterBreadcrumbs url={window.location.href}/>
            </Row>
            <Row>
                {/*<Col md={12}>*/}
                {/*    /!* eslint-disable-next-line react/no-unescaped-entities *!/*/}
                {/*    <h3 className="page-title-cb">MANAGER &gt; 고객사관리</h3>*/}
                {/*</Col>*/}
                <SnackbarProvider maxSnack={3}>
                    {page === 'list'
                        ? <CompanyList/> : <CompanyView/>}
                </SnackbarProvider>
            </Row>
        </Container>
    );
};

export default CompaniesModule;
