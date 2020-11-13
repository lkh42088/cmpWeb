import React, {Fragment, useEffect} from 'react';
import {
    Badge,
    Card, CardBody, Col, Container, Progress, Row,
} from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "notistack";
import {makeStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ListIcon from "@material-ui/icons/List";
import Button from '@material-ui/core/Button';
import {Tooltip} from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';

import VmInfoTable from "./VmInfoTable";
import VmInfoSetting from "./VmInfoSetting";
import VmInfoTableSnapshot from "./VmInfoTableSnapshot";
import VmInfoTableBackup from "./VmInfoTableBackup";
import WriteVm from "./WriteVm";
import {updateMcVmSnapshot, updateMcVmBackup} from "../../../../lib/api/microCloud";

import imageSrc5 from "../../../../shared/img/temp/computer2.jpg";
import {changeVmPage} from "../../../../redux/actions/vmsActions";

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const VmInfo = ({schVm}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user"));
    const {level} = user;
    const {enqueueSnackbar} = useSnackbar();

    const {data, page} = useSelector(({vmsRd}) => ({
        data: vmsRd.data,
        page: vmsRd.pageType,
    }));

    const handlePage = () => {
        dispatch(changeVmPage({
            pageType: 'list',
            data: null,
        }));
    };

    const handleSubmitSnapshot = async (fields) => {
        const {
            idx, cpIdx, vmIndex, serverIdx, snapType, snapDays, snapHours, snapMinutes,
        } = fields;

        try {
            console.log("await start");
            const response = await updateMcVmSnapshot({
                idx,
                cpIdx,
                vmIndex,
                serverIdx,
                snapType: Boolean(snapType),
                snapDays,
                snapHours,
                snapMinutes,
            });

            console.log("handleSubmitSnapshot response : ", response);
            enqueueSnackbar("Snapshot 설정 완료", {variant: "success"});
        } catch (e) {
            console.log("error");
            enqueueSnackbar("Snapshot 설정 error", {variant: "error"});
        }
    };

    const handleSubmitBackup = async (fields) => {
        const {
            idx, cpIdx, vmIndex, serverIdx, backupType, backupDays, backupHours, backupMinutes,
        } = fields;

        try {
            console.log("await start");
            const response = await updateMcVmBackup({
                idx,
                cpIdx,
                vmIndex,
                serverIdx,
                backupType: Boolean(backupType),
                backupDays,
                backupHours,
                backupMinutes,
            });

            console.log("handleSubmitBackup response : ", response);
            enqueueSnackbar("Backup 설정 완료", {variant: "success"});
        } catch (e) {
            console.log("error");
            enqueueSnackbar("Backup 설정 error", {variant: "error"});
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
                                paddingBottom: "5px",
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
                                            {/*<div className="vm__stat">
                                                <p className="vm__stat-title">Company</p>
                                            </div>*/}
                                            <p className="vm__stat-accent-info" style={{
                                                textAlign: "center",
                                            }}>
                                                {data.name}
                                                &nbsp;&nbsp;
                                                {data.currentStatus === 'running' ? (
                                                    <Badge color="primary" style={{
                                                        lineHeight: 1.2,
                                                    }}>&nbsp;running&nbsp;</Badge>
                                                ) : (
                                                    <Badge color="secondary" style={{
                                                        lineHeight: 1.2,
                                                    }}>&nbsp;{data.currentStatus}&nbsp;</Badge>
                                                )}
                                            </p>
                                            {/*<span style={{
                                                fontSize: "x-small",
                                            }}>{data.cpName}</span>*/}
                                            {/*<p className="vm__stat-accent-info" style={{
                                                float: "right",
                                            }}>
                                                {data.currentStatus === 'running' ? (
                                                    <Badge color="primary" style={{
                                                        lineHeight: 1.5,
                                                    }}>&nbsp;running&nbsp;</Badge>
                                                ) : (
                                                    <Badge color="secondary" style={{
                                                        lineHeight: 1.5,
                                                    }}>&nbsp;{data.currentStatus}&nbsp;</Badge>
                                                )}
                                            </p>*/}
                                            <div className="dashboard__sales-report">
                                                <div className="progress-wrap progress-wrap--small">
                                                    <p className="dashboard__sales-report-now" style={{
                                                        textAlign: "center",
                                                    }}>{data.cpName}</p>
                                                    {/*<p className="dashboard__sales-report-plan">
                                                        {data.currentStatus === 'running' ? (
                                                        <Badge color="primary" style={{
                                                            lineHeight: 2,
                                                        }}>&nbsp;running&nbsp;</Badge>
                                                    ) : (
                                                        <Badge color="secondary" style={{
                                                            lineHeight: 2,
                                                        }}>&nbsp;{data.currentStatus}&nbsp;</Badge>
                                                    )}</p>*/}
                                                </div>
                                            </div>
                                        </div>

                                        {/*<div className="vm__stats">
                                            <div className="vm__stat">
                                                <p className="vm__stat-title">VM Name</p>
                                            </div>
                                            <div className="vm__stat">
                                                <p className="vm__stat-contents">{data.name}</p>
                                            </div>
                                        </div>*/}

                                        {/*<div className="vm__stats">
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
                                        </div>*/}
                                    </div>
                                </CardBody>
                            </Card>
                            {/*<Button
                                block
                                variant="link"
                                color="default"
                                size="small"
                                className={classes.button}
                                startIcon={<ListIcon/>}
                                onClick={handlePage}>
                                목록
                            </Button>*/}
                            {/*<p ><ListIcon/>목록</p>
                            <Button variant="link">Link</Button>*/}
                            <Button variant="primary" block
                                    startIcon={<ListIcon/>}
                                    size="small" onClick={handlePage}>
                                목록
                            </Button>

                            <VmInfoTable type="setting" vm={data}/>
                            <VmInfoTable type="status" vm={data}/>
                            {/*<Tooltip title="목록">
                                 eslint-disable-next-line jsx-a11y/anchor-is-valid
                                <a href="#"><i><ListIcon style={{
                                    fontSize: "1.3rem",
                                }} onClick={handlePage}/></i></a>
                            </Tooltip>*/}
                            {/* <Fab variant="extended"
                                 size="small"
                                 onClick={handlePage}>
                                <ListIcon className={classes.extendedIcon} />
                                목록
                            </Fab>*/}
                        </Col>
                        <Col md={12} lg={12} xl={5}>
                            <Row style={{
                                paddingRight: "10px",
                            }}>
                                <VmInfoSetting
                                    type="snapshot"
                                    vm={data}
                                    handleSubmitSnapshot={handleSubmitSnapshot}
                                />
                                <VmInfoTableSnapshot vm={data}/>
                            </Row>
                        </Col>
                        <Col md={12} lg={12} xl={5}>
                            <Row>
                                <VmInfoSetting
                                    type="backup"
                                    vm={data}
                                    handleSubmitBackup={handleSubmitBackup}
                                />
                                <VmInfoTableBackup vm={data}/>
                            </Row>
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
