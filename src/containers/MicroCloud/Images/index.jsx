import React from 'react';
import {SnackbarProvider} from "notistack";
import { Container, Row } from 'reactstrap';
import ImageTable from "./components/ImageTable";
import RouterBreadcrumbs from "../../Layout/page/Breadcrumb";

const MicroCloudVmTable = () => (
        <Container fluid>
            <Row>
                <RouterBreadcrumbs url={window.location.href}/>
            </Row>
            <Row>
                <SnackbarProvider maxSnack={3}>
                    <ImageTable/>
                </SnackbarProvider>
            </Row>
        </Container>
    );

export default MicroCloudVmTable;
