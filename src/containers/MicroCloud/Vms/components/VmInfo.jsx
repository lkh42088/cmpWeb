import React, {Fragment, useEffect} from 'react';
import {
    Card, CardBody, Col, Container, Row,
} from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "notistack";

import VmInfoTable from "./VmInfoTable";
import VmInfoSetting from "./VmInfoSetting";
import VmInfoTableSnapshot from "./VmInfoTableSnapshot";
import VmInfoTableBackup from "./VmInfoTableBackup";
import WriteVm from "./WriteVm";
import {updateMcVmSnapshot} from "../../../../lib/api/microCloud";

const VmInfo = ({schVm}) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user"));
    const {level} = user;
    const { enqueueSnackbar } = useSnackbar();

    const {data, page} = useSelector(({vmsRd}) => ({
        data: vmsRd.data,
        page: vmsRd.pageType,
    }));

    const handleSubmit = async (fields) => {
      const {
          idx, cpIdx, vmIndex, serverIdx, snapDays, snapHours, snapMinutes,
      } = fields;

      try {
          console.log("await start");
          const response = await updateMcVmSnapshot({
              idx,
              cpIdx,
              vmIndex,
              serverIdx,
              snapDays,
              snapHours,
              snapMinutes,
          });

          console.log("response : ", response);
          enqueueSnackbar("Snapshot 설정 완료", { variant: "success" });
      } catch (e) {
          console.log("error");
          enqueueSnackbar("Snapshot 설정 error", { variant: "error" });
      }
    };

    useEffect(() => {
    }, [data]);

    return (
        <Container>
            {data !== null && data !== undefined ? (
                <div>
                    <Row>
                        <Col md={12} lg={12} xl={6}>
                            <VmInfoTable type="setting" vm={data}/>
                        </Col>
                        <Col md={12} lg={12} xl={6}>
                            <VmInfoTable type="status" vm={data}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} lg={12} xl={6}>
                            <VmInfoSetting
                                type="snapshot"
                                vm={data}
                                handleSubmit={handleSubmit}
                            />
                            <VmInfoSetting type="backup" vm={data}/>
                        </Col>
                        <Col md={12} lg={12} xl={6}>
                            <VmInfoTableSnapshot/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} lg={12} xl={6}>
                            &nbsp;
                        </Col>
                        <Col md={12} lg={12} xl={6}>
                            <VmInfoTableBackup/>
                        </Col>
                    </Row>
                </div>
            ) : false}
        </Container>
    );
};

export default VmInfo;
