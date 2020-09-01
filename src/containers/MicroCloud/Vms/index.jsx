import React from 'react';
import {SnackbarProvider} from "notistack";
import { Container, Row } from 'reactstrap';
import {useSelector} from "react-redux";
import VmTable from "./components/VmTable";
import RouterBreadcrumbs from "../../Layout/page/Breadcrumb";
import VmPage from "./components/VmPage";

const MicroCloudVmTable = () => {
    const {page} = useSelector(({vmsRd}) => ({
        page: vmsRd.pageType,
    }));
    return (
        <Container fluid>
            <Row>
                <RouterBreadcrumbs url={window.location.href}/>
            </Row>
            <Row>
                <SnackbarProvider maxSnack={3}>
                    {page === 'list'
                    ? <VmTable/> : <VmPage/>}
                </SnackbarProvider>
            </Row>
        </Container>
    );
};

export default MicroCloudVmTable;
