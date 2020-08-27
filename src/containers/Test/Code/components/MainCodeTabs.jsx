import React, {PureComponent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    Card, CardBody, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane,
} from 'reactstrap';
import classnames from 'classnames';
import {withTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import ReactTooltip from "react-tooltip";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

import {
    setMainTabSelected,
    getMainCodeByType, getCodesTag,
} from "../../../../redux/actions/codeActions";

import MainCode from './MainCode';
import {getUserList} from "../../../../redux/actions/usersActions";

const MainCodeTabs = () => {
    const dispatch = useDispatch();
    const {
        mainSubCodeDisplayFlag, mainCodeTag,
        menuSelected, mainTabSelected, mainCode,
    } = useSelector(({codeRd}) => ({
        mainSubCodeDisplayFlag: codeRd.mainSubCodeDisplayFlag,
        mainCodeTag: codeRd.mainCodeTag,
        menuSelected: codeRd.menuSelected,
        mainTabSelected: codeRd.mainTabSelected,
        mainCode: codeRd.mainCode,
    }));
    const [activeTab, setActiveTab] = useState("total");

    const toggle = (tab) => {
        setActiveTab(tab);
        //setMainTabSelected
        dispatch(setMainTabSelected(tab));
        //dispatch(getMainCodeByType({menuSelected, tab}));
        dispatch(getMainCodeByType({
            type: tab,
            subType: menuSelected,
        }));
    };

    useEffect(() => {
        toggle('total');
    }, [menuSelected]);

    return (
        <Container>
            <Row>
                <Col md={12}>
                    <div style={mainSubCodeDisplayFlag ? {
                        float: "right",
                        padding: "12px",
                    } : {float: "right"}}>
                        <IconButton type="button"
                                    data-tip data-for="tooltipSelectDelete"
                        >
                            {mainSubCodeDisplayFlag ? "" : (
                                <DeleteSweepIcon/>
                            )}
                        </IconButton>
                        <ReactTooltip id="tooltipSelectDelete" effect="float"
                                      delayHide={100} type="dark" place="bottom">
                            선택 삭제
                        </ReactTooltip>
                        <Chip variant="outlined"
                              size="small"
                              avatar={<Avatar>C</Avatar>}
                              label={mainCode.length}
                        />
                    </div>
                </Col>
            </Row>
            <Row style={{
                height: "500px",
                overflowY: "auto",
            }}>
                <Col md={12} lg={12} xs={12}>
                    <Card>
                        <CardBody>
                            <div className="tabs tabs--vertical">
                                <div className="tabs__wrap">
                                    <Nav tabs style={{
                                        width: "70px",
                                    }}>
                                        {/*for 돌리기*/}
                                        {/*<NavItem>
                                            <NavLink
                                                className={classnames({active: activeTab === 'all'})}
                                                onClick={() => {
                                                    toggle('all');
                                                }}
                                            >
                                                전체
                                            </NavLink>
                                        </NavItem>*/}
                                        {mainCodeTag && mainCodeTag.map((row, index) => {
                                            let navLinkTitle = "";

                                            switch (row.type) {
                                                case "total":
                                                    navLinkTitle = "공통";
                                                    break;
                                                case "device_server":
                                                    navLinkTitle = "서버";
                                                    break;
                                                case "device_network":
                                                    navLinkTitle = "네트워크";
                                                    break;
                                                case "device_part":
                                                    navLinkTitle = "파트/기타";
                                                    break;
                                                default:
                                                    break;
                                            }

                                            return (
                                                <NavItem
                                                    key={`${row.type}${navLinkTitle}`}>
                                                    <NavLink
                                                        key={row}
                                                        /*className={classnames({active: activeTab === row.type})}*/
                                                        onClick={() => {
                                                            toggle(row.type);
                                                        }}
                                                        style={activeTab === row.type ? {
                                                            fontSize: "12px",
                                                            fontWeight: "bold",
                                                            color: "#12cad6",
                                                            borderRight: "0",
                                                        } : {
                                                            fontSize: "12px",
                                                            borderRight: "0",
                                                        }}
                                                    >
                                                        {navLinkTitle}
                                                    </NavLink>
                                                </NavItem>
                                            );
                                        })}
                                    </Nav>
                                    <TabContent style={{
                                        width: "100%",
                                    }}>
                                        <TabPane style={{
                                            paddingLeft: "0",
                                        }}>
                                            <MainCode/>
                                        </TabPane>
                                    </TabContent>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default withTranslation('common')(MainCodeTabs);
