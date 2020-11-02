import React, {Fragment, useEffect} from 'react';
import {
    Badge,
    Card, CardBody, Col, Container, Row,
} from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "notistack";
import { makeStyles } from '@material-ui/core/styles';
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
import {updateMcVmSnapshot} from "../../../../lib/api/microCloud";

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
    const { enqueueSnackbar } = useSnackbar();

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
                                            {/*<div className="vm__stat">
                                                <p className="vm__stat-title">Company</p>
                                            </div>*/}
                                            <div className="vm__stat">
                                                <p className="vm__stat-accent">{data.cpName}</p>
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

                            <Button
                                variant="contained"
                                color="default"
                                className={classes.button}
                                startIcon={<ListIcon />}
                                onClick={handlePage}
                            >
                                목록
                            </Button>
                        </Col>
                        <Col md={12} lg={12} xl={5}>
                            <VmInfoSetting
                                type="snapshot"
                                vm={data}
                                handleSubmit={handleSubmit}
                            />
                            <VmInfoTableSnapshot vm={data}/>
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
