import React from 'react';
import { Col, Container, Row } from 'reactstrap';

import ProfileMain from './ProfileMain';
import ProfileBtn from './ProfileBtn';
import ProfileTasks from './ProfileTasks';
import ProfileTabs from './ProfileTabs';
import {NORMAL_USER} from "../../../../lib/var/globalVariable";

const UserView = () => {
    console.log("UserView start");
    return (
        <Container>
            <div className="profile">
                <Row>
                    <Col md={12} lg={12} xl={4} >
                        <Row>
                            <ProfileMain/>
                            {/*<ProfileBtn />*/}
                            {/*<ProfileTasks />*/}
                        </Row>
                    </Col>
                    <ProfileTabs/>
                </Row>
            </div>
        </Container>
    );
};

export default UserView;
