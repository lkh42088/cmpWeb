import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Button, ButtonToolbar, Card, Col, Modal,
} from 'reactstrap';
import classNames from 'classnames';
import Collapse from "../../../../shared/components/Collapse";
import {
    fetchPosts,
    getDeviceCommentByDeviceCode, postDeviceComment,
    setState,
} from '../../../../redux/actions/assetsAction';
import ModalSub from '../../../../shared/components/ModalSub';

//assetState: PropTypes.arrayOf(PropTypes.string).isRequired,
class AssetsComment extends PureComponent {
    static propTypes = {
        // eslint-disable-next-line react/forbid-prop-types
        assetState: PropTypes.object.isRequired,
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
        };
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        /*console.log("nextProps : ", nextProps.assetState.stateVal);
        console.log("type : ", nextProps.assetState.stateVal.type);
        console.log("state : ", nextProps.assetState.stateVal.state);*/

        if (nextProps.assetState.stateVal.type === 'comment') {
            switch (nextProps.assetState.stateVal.state) {
                case 'confirm':
                    return {
                        modalWarring: false,
                        warringTitle: '',
                        warringContents: '',
                        warringClass: '',
                        warringType: '',
                    };
                case 'request':
                    return {
                        modalWarring: true,
                        warringTitle: '경고',
                        warringContents: '삭제하시겠습니까?',
                        warringClass: 'modal-dialog--danger',
                        warringType: 'danger',
                    };
                case 'success':
                    return {
                        modalWarring: true,
                        warringTitle: '확인',
                        warringContents: '요청하신 작업에 성공하였습니다.',
                        warringClass: 'modal-dialog--primary',
                        warringType: 'primary',
                    };
                case 'error':
                    return {
                        modalWarring: true,
                        warringTitle: '경고',
                        warringContents: '요청하신 작업에 실패하였습니다.',
                        warringClass: 'modal-dialog--danger',
                        warringType: 'danger',
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

        // eslint-disable-next-line react/destructuring-assignment
        // 상태값을 onCreate 를 통하여 부모에게 전달
        // eslint-disable-next-line react/prop-types,react/destructuring-assignment
        // this.props.setTotalManager(this.state);
        const {assetState, dispatch} = this.props;
        const {
            commentIdx, comment, registerId,
        } = this.state;

        const submitData = ({
            idx: commentIdx,
            /*registerId: data.registerId,*/ //TODO 로그인한 ID
            registerId: 'lkb',
            contents: comment,
            deviceCode: assetState.deviceByDeviceCode,
        });

        dispatch(postDeviceComment('update', assetState, submitData));

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
        const {assetState, dispatch} = this.props;

        //setTotalManager(this.state);
        const {
            commentIdx, comment, deviceCode,
        } = this.state;

        const submitData = ({
            idx: commentIdx,
            /*registerId: data.registerId,*/ //TODO 로그인한 ID
            registerId: 'lkb',
            contents: comment,
            deviceCode,
        });

        const stateVal = ({
            type: 'comment',
            division: 'delete',
            state: 'confirm',
        });

        dispatch(setState(stateVal));

        this.setState({
            modalWarring: false,
        });

        dispatch(postDeviceComment('delete', assetState, submitData));

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
        const {assetState, dispatch} = this.props;
        if (division !== 'error') {
            this.setState(prevState => ({modalOpenFlag: !prevState.modalOpenFlag}));

            const stateVal = ({
                type: 'comment',
                division: 'delete',
                state: 'confirm',
            });

            dispatch(setState(stateVal));
        }
    };

    commentToggle = (division, val) => {
        const {assetState, dispatch} = this.props;

        //console.log("division : ", division);

        if (division === 'update') {
            this.setCommentVal(division, val);
            this.setState(prevState => ({modal: !prevState.modal}));
        } else if (division === 'delete') {
            this.setCommentVal(division, val);
            const stateVal = ({
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
        const {assetState, dispatch} = this.props;

        if (assetState !== prevProps.assetState) {
            if (assetState.stateVal.state === 'success' && assetState.stateVal.type === 'comment') {
                dispatch(getDeviceCommentByDeviceCode(assetState));
            }
        }
    };

    render() {
        const {assetState, dispatch} = this.props;
        const {
            modal, comment, registerId, registerName, registerDate,
            modalWarring, warringTitle, warringContents, warringClass, warringType,
        } = this.state;

        let deviceComments;

        const modalClass = classNames({
            'assets_write__modal-dialog': true,
            'assets_write__modal-dialog--colored': true,
            'assets_write__modal-dialog--header': true,
        });

        if (assetState.comments.length > 0) {
            deviceComments = (
                <Fragment>
                    {assetState.comments
                        .sort()
                        .map(d => (
                            <div key={d.idx}>
                                <span>▶ {d.registerName} ({d.registerId}) -  [{d.registerDate}]</span>
                                <div>
                                    <span className="modal_comment_del" type="button" role="button" tabIndex="0"
                                          onClick={() => this.commentToggle('delete', d)}
                                          onKeyDown={() => this.commentToggle('delete', d)}>삭제
                                    </span>
                                        <span className="modal_comment_edit" type="button" role="button"
                                              tabIndex="0"
                                              onClick={() => this.commentToggle('update', d)}
                                              onKeyDown={() => this.commentToggle('update', d)}
                                        >수정
                                    </span>
                                </div>
                                <pre>
                                    {d.contents}
                                </pre>
                            </div>
                        ))}
                </Fragment>
            );
        } else {
            deviceComments = (
                <Fragment>
                    <span>▶ 등록된 댓글이 없습니다.</span>
                </Fragment>
            );
        }

        return (
            <div>
                {/*<Collapse title="댓글 확인"
                          className="with-shadow modal_comment_register assets_write__modal__tableLine">
                </Collapse>*/}
                <Fragment>
                    <Col md={12} lg={12}>
                        <Card>
                            {deviceComments}
                        </Card>
                    </Col>
                    <Modal
                        isOpen={modal}
                        className={`assets_write__modal-dialog 
                                    assets_write__modal-dialog--success ${modalClass}`}
                    >
                        <form onSubmit={this.handleSubmit}>
                            <div className="assets_write__modal__body assets_write__modal__tableLine">
                                <div className="modal_form__form-group">
                                            <span className="modal_form__form-group-label text_cor_green">
                                                {registerName} ({registerId}) -  [{registerDate}]</span>
                                    <div className="modal_form__form-group-field">
                                                    <textarea name="comment" value={comment}
                                                              className="assets_comment"
                                                              placeholder="댓글 입력 창"
                                                              onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </div>
                            <ButtonToolbar className="assets_write__modal__footer_comment">
                                <Button className="assets_write__modal_ok"
                                        type="submit" color="success">수정</Button>&nbsp;
                                <Button className="assets_write__modal_cancel"
                                        onClick={() => this.commentToggle('close')}
                                >Cancel</Button>
                            </ButtonToolbar>
                        </form>
                    </Modal>
                    <Modal
                        isOpen={modalWarring}
                        toggle={this.modalClose}
                        modalClassName="ltr-support"
                        className={`modal-dialog-dialog ${warringClass}`}
                    >
                        <div className="modal__header">
                            <button className="lnr lnr-cross modal__close-btn" type="button"
                                    onClick={this.modalClose}/>
                            <span className="lnr lnr-cross-circle modal__title-icon"/>
                            <h4 className="text-modal  modal__title">{warringTitle}</h4>
                        </div>
                        <div className="modal__body">
                            {warringContents}
                            <br/>
                            <span className="modal_form__form-group-description">
                                  작성한 사용자만 수정/삭제 할 수 있습니다.
                                </span>
                        </div>
                        <ButtonToolbar className="modal__footer">
                            {
                                assetState.stateVal.state === 'request' ? (
                                    <Button className="modal_ok" outline={warringType} color={warringType}
                                            onClick={this.commentDelete}>Ok</Button>
                                ) : (
                                    <Fragment>
                                        &nbsp;
                                    </Fragment>
                                )
                            }
                            <Button className="modal_ok" outline={warringType} color={warringType}
                                    onClick={this.modalClose}>Close</Button>
                        </ButtonToolbar>
                    </Modal>
                </Fragment>
            </div>
        );
    }
}

export default AssetsComment;
