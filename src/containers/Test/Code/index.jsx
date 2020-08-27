import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Col, Container, Row} from 'reactstrap';
import EdCode from './components/EdCode';
import MenuCode from './components/MenuCode';
import SubCode from './components/SubCode';
import MainCodeTabs from './components/MainCodeTabs';
import RouterBreadcrumbs from "../../Layout/page/Breadcrumb";

import {
    setMainSubCodeDisplayFlag,
    setMenuSelected,
    getCodesTag, getMainCodeByType,
} from "../../../redux/actions/codeActions";

const Code = () => {
    const dispatch = useDispatch();
    const {subCodeDisplayFlag} = useSelector(({codeRd}) => ({
        subCodeDisplayFlag: codeRd.mainSubCodeDisplayFlag,
    }));

    const handleSubmit = (values) => {
        console.log("values : ", values);
        // ebjee 2020-08-27 instert 작업중
    };

    // 메뉴 이동 시 subCodeDisplayFlag 초기화 (false)

    useEffect(() => {
        dispatch(getCodesTag());
        dispatch(getMainCodeByType({
            type: 'total',
            subType: 'idc_cd',
        }));
    }, []);

    return (
        <Container>
            <Row>
                <RouterBreadcrumbs url={window.location.href}/>
            </Row>
            <Row>
                <EdCode handleSubmit={handleSubmit}/>
            </Row>
            <Row>
                <Col md={12} lg={12} xl={2}>
                    <Row>
                        <MenuCode/>
                    </Row>
                </Col>
                <Col md={12} lg={12} xl={subCodeDisplayFlag ? 6 : 10}>
                    <Row>
                        <MainCodeTabs/>
                    </Row>
                </Col>
                {subCodeDisplayFlag ? (
                    <Col md={12} lg={12} xl={4}>
                        <Row>
                            <SubCode/>
                        </Row>
                    </Col>
                ) : false}
            </Row>
        </Container>
    );
};

export default Code;
