import React, {useEffect} from 'react';
import {Col, Container, Row} from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import VmSidebar from "./VmSidebar";
import VmVncViewer from "./VmVncViewer";
import {changeVmPage} from "../../../../redux/actions/vmsActions";
import VmTable from "./VmTable";

const VmPage = ({schVm}) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user"));
    const {level} = user;

    const {data, page} = useSelector(({vmsRd}) => ({
        data: vmsRd.data,
        page: vmsRd.pageType,
    }));

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
                {data !== null && data !== undefined ? (
                    <Row>
                        <Col style={{
                            flexGrow: "0",
                        }}>
                            <Row style={level >= 5 ? {display: "none"} : {display: ""}}>
                                <VmSidebar vm={data}/>
                            </Row>
                        </Col>
                        <VmVncViewer vm={data}/>
                    </Row>
                ) : false}
            </div>
        </Container>
    );
};

export default VmPage;
