import React, {Image} from 'react';
import {
    Card, CardBody, Col, Button,
} from 'reactstrap';
import {useSelector} from "react-redux";
import FileSaver from "file-saver";
import MatButton from '@material-ui/core/Button';
import SendIcon from "@material-ui/icons/Send";
import TocIcon from '@material-ui/icons/Toc';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from "react-avatar";

import * as common from "../../../../lib/common";

import {API_ROUTE, API_ROUTE_SERVER_IMAGE} from "../../../../lib/api/client";

const ProfileMain = () => {
    const {
        user,
        userPage,
    } = useSelector(({usersRd}) => ({
        user: usersRd.user,
        userPage: usersRd.userPage,
    }));

    /*const handleFileSave = () => {
        //FileSaver.saveAs(user.avataFile, user.avata);
        console.log("type .... : ", typeof user.avataFile);
        console.log("avatafile...length : ", user.avataFile.length);
        //console.log("avatafile... : ", user.avataFile);

        /!*const url = URL.createObjectURL(user.avataFile);
        const url = window.srcObject(user.avataFile);
        console.log("url : ", url);
        document.getElementById('image').src = url;*!/

        //url.src = URL.createObjectURL(user.avataFile);
        //url.srcObject = user.avataFile;
        //document.getElementById('image').src = user.avataFile;

        const blobSupported = new Blob(['ä']).size === 2;
        console.log("blobSupported : ", blobSupported);
    };*/

    return (
        <Col md={12} lg={12} xl={12}>
            <Card>
                <CardBody className="profile__card"
                          style={{
                              /*border: "2px dotted #318fb5",*/
                              /*background: "#8d93ab",*/
                              /*opacity: "0.9",*/
                          }}>
                    <div className="profile__information">
                        <div className="profile__avatar"
                             style={{
                                 borderRadius: "0",
                             }}
                        >
                            {/*todo image file db store*/}
                            {/*<img src={Ava} alt="avatar"/>*/}
                            {/*<Avatar
                                className="topbar__avatar-img-list"
                                name={user.userId}
                                size="120"
                            />*/}
                            {/*★-- {user.avataFile} --★*/}
                            {/*<Image source={{uri: user.avataFile}}/>
                            <Image source={user.avataFile} style={{ height: 200, width: null, flex: 1 }} />*/}
                            {/*<img src={user.avataFile} alt=""/>*/}
                            {/*<img src="" alt="엥~~~" id="image"/>
                            <img src={`blob:http://127.0.0.1:8081/${user.avataFile}`} alt="두번째~"/>
                            <img src={`blob:http://127.0.0.1:4000/${user.avataFile}`} alt="세번째~"/>
                            <img src="blob:10110758배경-독수리.jfif" alt="네번째~"/>
                            <img src="blob:http://127.0.0.1:4000/10110758배경-독수리.jfif" alt="다섯번째~"/>
                            <img src="blob:http://127.0.0.1:8081/10110758배경-독수리.jfif" alt="여섯번째~"/>*/}
                            {/*10110758배경-독수리.jfif*/}
                            {user.avata == null || user.avata === "" ? (
                                <Avatar
                                    className="topbar__avatar-img-list"
                                    name={user.userId}
                                    size="120"
                                />
                            ) : (
                                <Avatar
                                    className="topbar__avatar-img-list"
                                    name={user.userId}
                                    size="120"
                                    src={`${API_ROUTE_SERVER_IMAGE}/${user.avata}`}
                                />
                            )}
                        </div>
                        <div className="profile__data">
                            {/*<p className="profile__contact">
                                 eslint-disable-next-line react/button-has-type
                                다운로드 : <button onClick={handleFileSave}>down</button>
                            </p>*/}
                            <p className="profile__name">{user.name} [{user.userId}]</p>
                            <p className="profile__contact">level: {common.textValueCut(user.authLevelTag, '', '-')}</p>
                            <p className="profile__contact">email: {common.textValueCut(user.email, '', '-')}</p>
                            <p className="profile__contact" dir="ltr">hp: {common.textValueCut(user.hp, '', '-')}</p>
                            <p className="profile__contact">
                                email 인증 :
                                {/* eslint-disable-next-line no-nested-ternary */}
                                {user.emailAuth === true ? "개인 이메일 인증" : (user.groupEmailAuth === true ? "그룹 이메일 인증" : "사용 안함")}
                            </p>
                            {/*<Button color="primary" className="icon profile__btn">
                                <p><MessageTextOutlineIcon/> 정보 수정</p>
                            </Button>*/}
                            {/*<MatButton
                                variant="contained"
                                color="primary"
                                endIcon={<SendIcon/>}>
                                수정
                            </MatButton>*/}
                        </div>
                    </div>
                    <div className="profile__stats">
                        <div className="profile__stat" style={{
                            width: "100%",
                            padding: "5px",
                        }}>
                            <div style={{
                                float: "left",
                            }}>{user.cpName}</div>
                            <div style={{
                                float: "right",
                            }}>
                                <EditIcon style={{
                                    background: "pink",
                                    color: "red",
                                    borderRadios: "5px",
                                }}/>
                                <TocIcon/>
                            </div>
                            {/*<p className="profile__stat-number">
                                <SendIcon/>
                                <TocIcon/>
                                <span style={{
                                    float: "left",
                                }}>
                                    {user.cpName}
                                </span>
                            </p>*/}
                        </div>
                    </div>
                    {/*<div className="profile__stats">
                        <div className="profile__stat">
                            <p className="profile__stat-number">01</p>
                            <p className="profile__stat-title">-</p>
                        </div>
                        <div className="profile__stat">
                            <p className="profile__stat-number">02</p>
                            <p className="profile__stat-title">-</p>
                        </div>
                        <div className="profile__stat">
                            <p className="profile__stat-number">03</p>
                            <p className="profile__stat-title">-</p>
                        </div>
                    </div>*/}
                </CardBody>
            </Card>
        </Col>
    );
};

export default ProfileMain;
