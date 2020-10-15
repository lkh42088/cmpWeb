import React, {Fragment, useEffect} from 'react';
import {
    Badge,
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

import image1 from "../../../../shared/img/temp/cubes.jpg";
import image5 from "../../../../shared/img/temp/alarm.png";
import image6 from "../../../../shared/img/temp/timearrow.png";

import imageSrc1 from "../../../../shared/img/temp/webdesign.jpg";
import imageSrc2 from "../../../../shared/img/temp/computer1.jpg";
import imageSrc3 from "../../../../shared/img/temp/battery.jpg";
import imageSrc4 from "../../../../shared/img/temp/laptop.jpg";
import imageSrc5 from "../../../../shared/img/temp/computer2.jpg";
import imageSrc6 from "../../../../shared/img/temp/online.png";
import imageSrc7 from "../../../../shared/img/temp/statistics.jpg";

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
                        <Col md={12} lg={12} xl={2}>
                            <Card style={{
                                height: "auto",
                            }}>
                                <CardBody className="vm__card" style={{
                                    padding: "0",
                                    border: "none",
                                }}>
                                    <img src={imageSrc5}
                                         alt="info"/>
                                    <div style={{
                                        padding: "0.5rem",
                                    }}>

                                        <div className="vm__stats" style={{
                                            display: "block",
                                            border: "none",
                                        }}>
                                            <div className="vm__stat">
                                                <p className="vm__stat-title">Company</p>
                                            </div>
                                            <div className="vm__stat">
                                                <p className="vm__stat-contents">{data.cpName}</p>
                                            </div>
                                        </div>

                                        <div className="vm__stats">
                                            <div className="vm__stat">
                                                <p className="vm__stat-title">VM Name</p>
                                            </div>
                                            <div className="vm__stat">
                                                <p className="vm__stat-contents">{data.name}</p>
                                            </div>
                                        </div>

                                        <div className="vm__stats">
                                            <div className="vm__stat">
                                                <p className="vm__stat-title">VM 상태</p>
                                            </div>
                                            <div className="vm__stat">
                                                <p className="vm__stat-contents">
                                                    {data.currentStatus === 'running' ? (
                                                        <Badge color="primary">&nbsp;running&nbsp;</Badge>
                                                    ) : (
                                                        <Badge color="secondary">&nbsp;{data.currentStatus}&nbsp;</Badge>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>

                            <VmInfoTable type="setting" vm={data}/>

                            <VmInfoTable type="status" vm={data}/>
                        </Col>
                        <Col md={12} lg={12} xl={5}>
                            <VmInfoSetting
                                type="snapshot"
                                vm={data}
                                handleSubmit={handleSubmit}
                            />
                            <VmInfoTableSnapshot/>
                        </Col>
                        <Col md={12} lg={12} xl={5}>
                            <VmInfoSetting type="backup" vm={data}/>
                            <VmInfoTableBackup/>
                        </Col>
                        {/*<Col md={12} lg={12} xl={3}>
                            <Row style={{
                                margin: "auto -2px",
                            }}>
                                <VmInfoTable type="setting" vm={data}/>
                            </Row>
                            <Row style={{
                                margin: "auto -2px",
                            }}>
                                <VmInfoTable type="status" vm={data}/>
                            </Row>
                        </Col>
                        <Col md={12} lg={12} xl={4}>
                            <VmInfoSetting
                                type="snapshot"
                                vm={data}
                                handleSubmit={handleSubmit}
                            />
                            <VmInfoSetting type="backup" vm={data}/>
                        </Col>*/}
                    </Row>

                    {/*<Row>
                        <Col md={12} lg={12} xl={3}>
                            <VmInfoTable type="setting" vm={data}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12} lg={12} xl={3}>
                            <VmInfoTable type="status" vm={data}/>
                        </Col>
                    </Row>*/}

                    {/*
                    첫번째 두개 이미지 카드~
                    <Row>
                        <Col md={12} lg={12} xl={3}>
                            <VmInfoTable type="setting" vm={data}/>
                        </Col>
                        <Col md={12} lg={12} xl={3}>
                            <VmInfoTable type="status" vm={data}/>
                        </Col>
                        <Col md={12} lg={12} xl={6}>
                            <VmInfoSetting
                                type="snapshot"
                                vm={data}
                                handleSubmit={handleSubmit}
                            />
                            <VmInfoSetting type="backup" vm={data}/>
                        </Col>
                    </Row>*/}

                    {/*<Row>
                        <Col md={12} lg={12} xl={3}>
                            <VmInfoTable type="setting" vm={data}/>
                        </Col>
                        <Col md={12} lg={12} xl={3}>
                            <VmInfoTable type="status" vm={data}/>
                        </Col>
                        <Col md={12} lg={12} xl={6}>
                            <VmInfoSetting
                                type="snapshot"
                                vm={data}
                                handleSubmit={handleSubmit}
                            />
                            <VmInfoSetting type="backup" vm={data}/>
                        </Col>
                    </Row>*/}
                    {/*<Row>
                        <Col md={12} lg={12} xl={6}>
                            <VmInfoTableSnapshot/>
                        </Col>
                        <Col md={12} lg={12} xl={6}>
                            <VmInfoTableBackup/>
                        </Col>
                    </Row>*/}
                    {/*<Row>
                        <Col md={12} lg={12} xl={6}>
                            &nbsp;
                        </Col>
                        <Col md={12} lg={12} xl={6}>
                            <VmInfoTableBackup/>
                        </Col>
                    </Row>*/}
                </div>
            ) : false}
        </Container>
    );
};

export default VmInfo;
