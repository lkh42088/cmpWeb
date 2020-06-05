import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import UserList from "./components/UserList";

const paddingCol = {
    paddingRight: '0px',
    paddingLeft: '0px',
};

const MaterialTable = () => (
    <Container>
        <UserList/>
    </Container>
);

export default MaterialTable;
