import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, ButtonToolbar, Modal} from 'reactstrap';
import classNames from 'classnames';
import TableRow from "@material-ui/core/TableRow";
import Collapse from "../../../../shared/components/Collapse";

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
            modal: false,
            type: 'comment',
            division: 'create',
            comment: '',
            commentIdx: '',
            registerId: '',
            registerName: '',
            registerDate: '',
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

    commentToggle = (val) => {
        this.setState(prevState => ({modal: !prevState.modal}));
        if (val !== 'close') {
            this.setCommentVal(val);
        }
    };

    setCommentVal = (val) => {
        this.setState({
            division: 'update',
            comment: val.Contents,
            commentIdx: val.Idx,
            registerId: val.RegisterId,
            registerName: val.RegisterName,
            registerDate: val.RegisterDate,
        });
    };

    render() {
        const {assetState, dispatch} = this.props;
        const {
            modal, comment, submitType, registerId, registerName, registerDate,
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
                            <div key={d.Idx}>
                                <span>▶ {d.RegisterName} ({d.RegisterId}) -  [{d.RegisterDate}]</span>
                                <div className="modal_comment_del">삭제</div>
                                <div className="modal_comment_edit" type="button" role="button" tabIndex="0"
                                     onClick={() => this.commentToggle(d)}
                                     onKeyDown={() => this.commentToggle(d)}
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
                    </Fragment>
                </Collapse>
            </div>
        );
    }
}

export default AssetsComment;
