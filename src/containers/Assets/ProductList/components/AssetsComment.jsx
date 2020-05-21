import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Button, ButtonToolbar, Modal,
} from 'reactstrap';
import classNames from 'classnames';
import Collapse from "../../../../shared/components/Collapse";
import {
    fetchPosts,
    getDeviceCommentByDeviceCode,
    setState,
} from '../../../../redux/actions/assetsAction';
import ModalSub from '../../../../shared/components/ModalSub';

//assetState: PropTypes.arrayOf(PropTypes.string).isRequired,
class AssetsComment extends PureComponent {
    static propTypes = {
        // eslint-disable-next-line react/forbid-prop-types
        assetState: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        // eslint-disable-next-line react/require-default-props
        setTotalManager: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.state = {
            alertModalFlag: false,
            modal: false,
            subModal: false,
            postType: 'comment',
            postDivision: 'create',
            comment: '',
            commentIdx: '',
            registerId: '',
            registerName: '',
            registerDate: '',
            modalColor: 'danger',
            modalTitle: 'ERROR',
            modalMessage: 'ERROR',
            modalType: 'error',
        };
    }

    handleSubmit = (e) => {
        // 페이지 리로딩 방지
        e.preventDefault();

        // eslint-disable-next-line react/destructuring-assignment
        // 상태값을 onCreate 를 통하여 부모에게 전달
        // eslint-disable-next-line react/prop-types,react/destructuring-assignment
        this.props.setTotalManager(this.state);

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
        console.log("👲👲👲 commentDelete");
        const {setTotalManager} = this.props;

        setTotalManager(this.state);

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

    commentToggle = (division, val) => {
        const {assetState, dispatch} = this.props;

        if (division === 'update') {
            this.setCommentVal(division, val);
            this.setState(prevState => ({modal: !prevState.modal}));
        } else if (division === 'delete') {
            this.setCommentVal(division, val);
            const stateVal = ({
                type: assetState.stateVal.type,
                division: assetState.stateVal.division,
                state: 'delete',
            });

            dispatch(setState(stateVal));

            this.setState({
                modalType: 'delete',
                modalColor: 'primary',
                modalTitle: '삭제?',
                modalMessage: '삭제하시겠습니까?',
            });
        } else { //close
            this.setState(prevState => ({modal: !prevState.modal}));
        }
    };

    setCommentVal = (division, val) => {
        this.setState({
            modalType: 'error',
            modalColor: 'danger',
            modalTitle: 'ERROR',
            modalMessage: 'ERROR',
            postDivision: division,
            comment: val.Contents,
            commentIdx: val.Idx,
            registerId: val.RegisterId, //TODO 로그인한 ID로 변경 필요~
            registerName: val.RegisterName,
            registerDate: val.RegisterDate,
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

/*    componentWillMount = () => {
        console.log("00componentWillMount");
    };

    componentDidMount = () => {
        // 외부 라이브러리 연동: D3, masonry, etc
        // 컴포넌트에서 필요한 데이터 요청: Ajax, GraphQL, etc
        // DOM 에 관련된 작업: 스크롤 설정, 크기 읽어오기 등
        console.log("11componentDidMount");
    };*/

    render() {
        const {assetState, dispatch} = this.props;
        const {
            modal, comment, submitType, registerId, registerName, registerDate,
            subModal, alertModalFlag, modalColor, modalTitle, modalMessage, modalType,
        } = this.state;

        let deviceComments;

        const modalClass = classNames({
            'assets_write__modal-dialog': true,
            'assets_write__modal-dialog--colored': true,
            'assets_write__modal-dialog--header': true,
        });

        let openFlag;

        if (assetState.stateVal.state === 'error' || assetState.stateVal.state === 'delete') {
            openFlag = true;
        } else {
            openFlag = false;
        }

        if (assetState.comments.length > 0) {
            deviceComments = (
                <Fragment>
                    {assetState.comments
                        .sort()
                        .map(d => (
                            <div key={d.Idx}>
                                <span>▶ {d.RegisterName} ({d.RegisterId}) -  [{d.RegisterDate}]</span>
                                <div className="modal_comment_del" type="button" role="button" tabIndex="0"
                                     onClick={() => this.commentToggle('delete', d)}
                                     onKeyDown={() => this.commentToggle('delete', d)}>삭제</div>
                                <div className="modal_comment_edit" type="button" role="button" tabIndex="0"
                                     onClick={() => this.commentToggle('update', d)}
                                     onKeyDown={() => this.commentToggle('update', d)}
                                >수정
                                </div>
                                <pre>
                                    {d.Contents}
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
                <Collapse title="댓글 확인"
                          className="with-shadow modal_comment_register assets_write__modal__tableLine">
                    <Fragment>
                        {deviceComments}
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
                                                    <textarea name="comment" value={comment} className="assets_comment"
                                                              placeholder="댓글 입력 창" onChange={this.handleChange}/>
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
                        <ModalSub
                            openFlag={openFlag}
                            modalType={modalType}
                            color={modalColor}
                            title={modalTitle}
                            colored
                            message={modalMessage}
                            assetState={assetState}
                            dispatch={dispatch}
                            modalFunc={this.commentDelete}
                        />
                    </Fragment>
                </Collapse>
            </div>
        );
    }
}

export default AssetsComment;
