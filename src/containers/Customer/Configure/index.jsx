import {Container, Row} from "reactstrap";
import UserList from "../Users/components/UserList";
import React from "react";

const MaterialTable = () => (
    <Container>
        <Row>
            <h3 className="page-title">고객 정보</h3>
            <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
                information
            </h3>
            <UserList/>
        </Row>
    </Container>
);

export default MaterialTable;