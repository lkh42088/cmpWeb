import React, {useEffect} from 'react';
import { Col, Container, Row } from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import VmSidebar from "./VmSidebar";
import VmVncViewer from "./VmVncViewer";
import {changeVmPage} from "../../../../redux/actions/vmsActions";

const VmPage = () => {
    const dispatch = useDispatch();
    const {data} = useSelector(({vmsRd}) => ({
       data: vmsRd.data,
    }));

    console.log("vmPage:", data);
    useEffect(() => {
        // if (data === null || data.length() === 0) {
        //     console.log("vmPage: dispatch list");
        //     dispatch(changeVmPage("list", null));
        // }
    }, []);

    useEffect(() => {
    }, [data]);

    return (
        <Container>
            <div>
                <Row>
                    <Col style={{
                        flexGrow: "0",
                    }}>
                        <Row>
                            <VmSidebar vm={data} />
                        </Row>
                    </Col>
                    <VmVncViewer vm={data}/>
                </Row>
            </div>
        </Container>
    );
};

export default VmPage;
