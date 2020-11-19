import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import ProfileMain from './ProfileMain';
import ProfileTabs from './ProfileTabs';

const UserView = () => (
    <Container>
        <div className="profile">
            <Row>
                <Col md={12} lg={12} xl={4}>
                    <Row>
                        <ProfileMain/>
                    </Row>
                </Col>
                <ProfileTabs/>
            </Row>
        </div>
    </Container>
);

export default UserView;
