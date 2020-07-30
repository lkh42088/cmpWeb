import React from 'react';
import {SnackbarProvider} from "notistack";
import {useDispatch, useSelector} from "react-redux";
import {Container, Row} from 'reactstrap';
import UserList from "./components/UserList";
import UserView from "./components/UserView";
import RouterBreadcrumbs from "../../Layout/sidebar/Breadcrumb";
import AssetsList from "../../Assets/ProductList/components/AssetsList";
import AssetsView from "../../Assets/ProductList/components/AssetsView";

const MaterialTable = () => {
    const {page} = useSelector(({usersRd}) => ({
        page: usersRd.userPage,
    }));

    console.log("index start");

    return (
        <Container fluid>
            <Row>
                <RouterBreadcrumbs url={window.location.href}/>
            </Row>
            <Row>
                <SnackbarProvider maxSnack={3}>
                    {page === 'list'
                        ? <UserList/> : <UserView/>}
                </SnackbarProvider>
            </Row>
        </Container>
    );
};

export default MaterialTable;
