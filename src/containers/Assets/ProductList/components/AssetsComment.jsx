import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col, Modal } from 'reactstrap';
import Avatar from "react-avatar";
import moment from "moment";

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MatButton from '@material-ui/core/Button';

import classNames from 'classnames';
import {
    getDeviceCommentByDeviceCode,
    postDeviceComment,
    setState,
} from '../../../../redux/actions/assetsAction';

class AssetsComment extends PureComponent {
    static propTypes = {
        // eslint-disable-next-line react/forbid-prop-types
        assetState: PropTypes.object.isRequired,
        // eslint-disable-next-line react/forbid-prop-types
        theme: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.state = {
            modal: false,
            comment: '',
            commentIdx: '',
            registerId: '',
            registerName: '',
            registerDate: '',

            modalWarring: false,
            warringTitle: '',
            warringContents: '',
            warringClass: 'modal-dialog--danger',
            warringType: '',
            warringStyle: {
                backgroundColor: "",
            },
            warringIcon: '',
        };
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        if (nextProps.assetState.stateVal.type === 'comment') {
            switch (nextProps.assetState.stateVal.state) {
                case 'confirm':
                    return {
                        modalWarring: false,
                        warringTitle: '',
                        warringContents: '',
                        warringClass: '',
                        warringType: '',
                        warringStyle: {
                            backgroundColor: "",
                        },
                        warringIcon: '',
                    };
                case 'request':
                    return {
                        modalWarring: true,
                        warringTitle: '경고',
                        warringContents: '삭제하시겠습니까?',
                        warringClass: 'modal-dialog--danger',
                        warringType: 'request',
                        warringStyle: {
                            backgroundColor: "",
                        },
                        warringIcon: '',
                    };
                case 'success':
                    return {
                        modalWarring: true,
                        warringTitle: '확인',
                        warringContents: '요청하신 작업에 성공하였습니다.',
                        warringClass: 'modal-dialog--primary',
                        warringType: 'success',
                        warringStyle: {
                            backgroundColor: "#43a047",
                        },
                        warringIcon: <CheckCircleIcon/>,
                    };
                case 'error':
                    return {
                        modalWarring: true,
                        warringTitle: '경고',
                        warringContents: '요청하신 작업에 실패하였습니다.',
                        warringClass: 'modal-dialog--danger',
                        warringType: 'danger',
                        warringStyle: {
                            backgroundColor: "",
                        },
                        warringIcon: '',
                    };
                default:
                    break;
            }
        }
        return null; // null 을 리턴하면 따로 업데이트 할 것은 없다라는 의미
    };

    handleSubmit = (e) => {
        // 페이지 리로딩 방지
        e.preventDefault();

        const { assetState, dispatch, user } = this.props;
        const { commentIdx, comment, registerId } = this.state;

        const submitData = ({
            idx: commentIdx,
            /*registerId: data.registerId,*/ //TODO 로그인한 ID
            registerId: user.id,
            contents: comment,
            deviceCode: assetState.deviceByDeviceCode,
        });

        dispatch(postDeviceComment('update', assetState, submitData, 'view'));

        // 상태 초기화
        this.setState({
            comment: '',
            commentIdx: '',
            registerId: '',
            registerName: '',
            registerDate: '',
            modal: false,
        });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    commentDelete = () => {
        const { assetState, dispatch, user } = this.props;

        //setTotalManager(this.state);
        const { commentIdx, comment, deviceCode } = this.state;

        const submitData = ({
            idx: commentIdx,
            /*registerId: data.registerId,*/ //TODO 로그인한 ID
            registerId: user.id,
            contents: comment,
            deviceCode,
        });

        const stateVal = ({
            page: 'view',
            type: 'comment',
            division: 'delete',
            state: 'confirm',
        });

        dispatch(setState(stateVal));

        this.setState({
            modalWarring: false,
        });

        dispatch(postDeviceComment('delete', assetState, submitData, 'view'));

        // 상태 초기화
        this.setState({
            comment: '',
            commentIdx: '',
            registerId: '',
            registerName: '',
            registerDate: '',
            modal: false,
        });
    };

    modalClose = (division) => {
        const { dispatch } = this.props;
        if (division !== 'error') {
            this.setState(prevState => ({modalOpenFlag: !prevState.modalOpenFlag}));

            const stateVal = ({
                page: 'view',
                type: 'comment',
                division: 'delete',
                state: 'confirm',
            });

            dispatch(setState(stateVal));
        }
    };

    commentToggle = (division, val) => {
        const { dispatch } = this.props;

        if (division === 'update') {
            this.setCommentVal(division, val);
            this.setState(prevState => ({modal: !prevState.modal}));
        } else if (division === 'delete') {
            this.setCommentVal(division, val);
            const stateVal = ({
                page: 'view',
                type: 'comment',
                division: 'delete',
                state: 'request',
            });

            dispatch(setState(stateVal));
        } else { //update - close
            this.setState(prevState => ({modal: !prevState.modal}));
        }
    };

    setCommentVal = (division, val) => {
        //const { user } = this.props;
        this.setState({
            comment: val.contents,
            commentIdx: val.idx,
            registerId: val.registerId, //TODO 로그인한 ID로 변경 필요~
            registerName: val.registerName,
            registerDate: val.registerDate,
        });
    };
    /*
        handleSubModal = () => {
            this.setState(prevState => ({subModal: !prevState.subModal}));
        };*/

    componentDidUpdate = (prevProps, prevState) => {
        const { assetState, dispatch } = this.props;

        if (assetState !== prevProps.assetState) {
            if (assetState.stateVal.state === 'success' && assetState.stateVal.type === 'comment') {
                dispatch(getDeviceCommentByDeviceCode(assetState));
            }
        }
    };

    render() {
        const { assetState, theme } = this.props;
        const {
            modal, comment, registerId, registerName, registerDate,
            modalWarring, warringIcon, warringContents, warringType, warringStyle,
            warringTitle, warringClass,
        } = this.state;

        let deviceComments;

        const bubbleClass = classNames({
            chat__bubble: true,
            'chat__bubble--active': true,
        });

        if (assetState.comments.length > 0) {
            deviceComments = (
                <Fragment>
                    {assetState.comments.map((d, i) => (
                        <div className={bubbleClass} key={d.idx}>
                            <div className="chat__bubble-avatar">
                                <Avatar className="topbar__avatar-img-list" name={d.registerId}
                                        size="40"/>
                            </div>
                            <div className="chat__bubble-message-wrap">
                                <div className="chat__bubble-contact-name">
                                    <span className="text_cor_mat_p">
                                        {d.registerName}
                                        &nbsp;
                                        [{moment(d.registerDate).format('YYYY년MM월DD일')}]
                                    </span>
                                    <div className="chat__bubble-download-comment-wrap">
                                        <div className="chat__bubble-file-name">
                                            <div
                                                className="chat__bubble-btn del"
                                                onClick={event => this.commentToggle('delete', d)}
                                                onKeyDown={event => this.commentToggle('delete', d)}
                                                role="button" tabIndex="0">
                                                삭제<DeleteIcon/>
                                            </div>
                                            &nbsp;&nbsp;
                                            <div
                                                className="chat__bubble-btn edit"
                                                onClick={event => this.commentToggle('update', d)}
                                                onKeyDown={event => this.commentToggle('update', d)}
                                                role="button" tabIndex="0">
                                                수정<EditIcon/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="chat__bubble-message">
                                    <pre>{d.contents}</pre>
                                </div>
                            </div>
                        </div>
                    ))}
                </Fragment>
            );
        } else {
            deviceComments = (
                <Fragment>
                    <div className="chat__dialog-messages">
                        <div className="chat__dialog-messages-empty">
                            <p>등록된 댓글이 없습니다.</p>
                        </div>
                    </div>
                </Fragment>
            );
        }

        return (
            <Col md={12}>
                <Fragment>
                    {deviceComments}
                    <Modal isOpen={modal}
                           modalClassName={theme.className === 'theme-dark' ? (
                               "ltr-support modal-class_dark"
                           ) : (
                               "ltr-support modal-class_light"
                           )}
                           className="comment-modal-dialog modal-comment-wrap">
                        <form onSubmit={this.handleSubmit}>
                            <div className="modal-comment-wrap">
                                <span className="modal_form__form-group-label text_cor_mat_p">
                                    <Avatar className="topbar__avatar-img-list" name={registerId}
                                            size="20"/>&nbsp;{registerName}({registerId})
                                    [{moment(registerDate).format("YYYY-MM-DD")}]
                                </span>
                                <div className="modal_form__form-group-field"
                                     style={{paddingTop: "5px"}}>
                                    <div className="chat__text-field">
                                        <textarea className="chat__field-textarea"
                                                  placeholder="Type here…"
                                                  rows={8}
                                                  cols={12}
                                                  name="comment" value={comment}
                                                  onChange={this.handleChange}/>
                                        <div
                                            className="form-group float-right button-handle-form">
                                            <MatButton variant="contained" size="small"
                                                       color="primary" type="submit"
                                                       startIcon={<EditIcon/>}>
                                                수정
                                            </MatButton>
                                            <MatButton variant="contained"
                                                       size="small" color="default"
                                                       onClick={() => this.commentToggle('close')}>
                                                닫기
                                            </MatButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Modal>
                    {
                        warringType === 'request' ? (
                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                open={modalWarring}
                            >
                                <SnackbarContent
                                    /*message={`${warringIcon} ${warringContents}`}*/
                                    style={warringStyle}
                                    message={(
                                        <span id="client-snackbar" style={{lineHeight: "2"}}>
                                    {warringIcon}&nbsp;{warringContents}
                                 </span>
                                    )}
                                    action={(
                                        <Fragment>
                                            {
                                                assetState.stateVal.state === 'request' ? (
                                                    <Fragment>
                                                        <MatButton className="modal_ok" color="secondary"
                                                                   size="small"
                                                                   onClick={this.commentDelete}>Ok</MatButton>
                                                        <MatButton className="modal_ok" color="secondary"
                                                                   size="small"
                                                                   onClick={this.modalClose}>Close</MatButton>
                                                    </Fragment>
                                                ) : (
                                                    <Fragment>
                                                        &nbsp;
                                                    </Fragment>
                                                )
                                            }
                                        </Fragment>
                                    )}
                                />
                            </Snackbar>
                        ) : (
                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                open={modalWarring}
                                autoHideDuration={3000}
                                onClose={this.modalClose}
                            >
                                <SnackbarContent
                                    /*message={`${warringIcon} ${warringContents}`}*/
                                    style={warringStyle}
                                    message={(
                                        <span id="client-snackbar" style={{lineHeight: "2"}}>
                                    {warringIcon}&nbsp;{warringContents}
                                 </span>
                                    )}
                                />
                            </Snackbar>
                        )
                    }
                </Fragment>
            </Col>
        );
    }
}

export default AssetsComment;
