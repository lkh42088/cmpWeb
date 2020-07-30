import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import {useSelector} from "react-redux";

import ProfileMain from './ProfileMain';
import ProfileBtn from './ProfileBtn';
import ProfileTasks from './ProfileTasks';
import ProfileTabs from './ProfileTabs';

const Calendar = () => {
    console.log("userView start");

    const {
        userIdx,
        user,
    } = useSelector(({usersRd}) => ({
        userIdx: usersRd.userIdx,
        user: usersRd.user,
    }));

    return (
        <Container>
            <div className="profile">
                <Row>
                    <Col md={12} lg={12} xl={4}>
                        <Row>
                            <ProfileMain userTemp={user}/>
                            <ProfileBtn />
                            <ProfileTasks />
                        </Row>
                    </Col>
                    <ProfileTabs />
                </Row>
            </div>
        </Container>
    );
};

export default Calendar;
