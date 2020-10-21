import React, {useEffect} from 'react';
import {Col, Container, Row} from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import VmSidebar from "./VmSidebar";
import VmVncViewer from "./VmVncViewer";
import {CUSTOMER_MANAGER, NORMAL_USER} from "../../../../lib/var/globalVariable";/*5*/

const VmPage = ({schVm}) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const {level} = user;

    const {data, page} = useSelector(({vmsRd}) => ({
        data: vmsRd.data,
        page: vmsRd.pageType,
    }));

    return (
        <Container>
            <div>
                {data !== null && data !== undefined ? (
                    <Row>
                        <Col style={{
                            flexGrow: "0",
                        }}>
                            <Row style={level >= CUSTOMER_MANAGER ? {display: "none"} : {display: ""}}>
                                <VmSidebar vm={data}/>
                            </Row>
                        </Col>
                        <Col style={level === NORMAL_USER ? {
                                 flexGrow: "0",
                                 paddingLeft: "0",
                                 width: '100vw',
                                 height: '90vh',
                                 margin: "0 auto",
                             } : {paddingRight: 0}}
                        >
                            <VmVncViewer vm={data}/>
                        </Col>
                    </Row>
                ) : false}
            </div>
        </Container>
    );
};

export default VmPage;
