import React, {useEffect} from 'react';
import {SnackbarProvider} from "notistack";
import { Container, Row } from 'reactstrap';
import {useSelector, useDispatch} from "react-redux";
import VmTable from "./components/VmTable";
import RouterBreadcrumbs from "../../Layout/page/Breadcrumb";
import VmPage from "./components/VmPage";
import VmCard from "./components/VmCard";

import * as common from "../../../lib/common";
import {setDeviceSearchDivision} from "../../../redux/actions/assetsAction";
import {changeVmPage} from "../../../redux/actions/vmsActions";

const MicroCloudVmTable = () => {
    const dispatch = useDispatch();
    const {page} = useSelector(({vmsRd}) => ({
        page: vmsRd.pageType,
    }));

    useEffect(() => {
        const pageType = common.assetsGetUrlMenu(window.location.href);
        if (pageType === 'vmsCard') {
            dispatch(changeVmPage({pageType: 'card', data: null}));
        }
    }, [window.location.href]);

    return (
        <Container fluid>
            <Row>
                <RouterBreadcrumbs url={window.location.href}/>
            </Row>
            <Row>
                <SnackbarProvider maxSnack={3}>
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {page !== 'card'
                        ? (
                            page === 'list'
                                ? <VmTable/> : <VmPage/>
                        ) : (
                            <VmCard/>
                        )
                    }
                </SnackbarProvider>
            </Row>
        </Container>
    );
};

export default MicroCloudVmTable;
