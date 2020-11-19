import React from 'react';
import {SnackbarProvider} from "notistack";
import {useDispatch, useSelector} from "react-redux";
import {Container, Row} from 'reactstrap';
import UserList from "./components/UserList";
import UserView from "./components/UserView";
import RouterBreadcrumbs from "../../Layout/page/Breadcrumb";
import AssetsList from "../../Assets/ProductList/components/AssetsList";
import AssetsView from "../../Assets/ProductList/components/AssetsView";
import {NORMAL_USER} from "../../../lib/var/globalVariable";

const MaterialTable = () => {
    const {page} = useSelector(({usersRd}) => ({
        page: usersRd.userPage,
    }));
    const user = JSON.parse(localStorage.getItem("user"));
    const {level} = user;

    return (
        <Container fluid
                   style={level === NORMAL_USER ? {
                       width: "80%",
                       margin: "0 auto",
                   } : {}}>
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
