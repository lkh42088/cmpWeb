import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, ButtonToolbar, Modal} from 'reactstrap';
import classNames from 'classnames';
import TableRow from "@material-ui/core/TableRow";
import Collapse from "../../../../shared/components/Collapse";

//assetState: PropTypes.arrayOf(PropTypes.string).isRequired,
class AssetsLogo extends PureComponent {
    static propTypes = {
        // eslint-disable-next-line react/forbid-prop-types
        assetState: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.state = {
            modal: false,
            showPassword: false,
            submit: {
                type: 'comment',
                division: 'create',
            },
            comment: '',
        };
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        // 페이지 리로딩 방지
        e.preventDefault();

        // eslint-disable-next-line react/destructuring-assignment
        // 상태값을 onCreate 를 통하여 부모에게 전달
        // eslint-disable-next-line react/prop-types,react/destructuring-assignment
        this.props.onCreate(this.state);

        // 상태 초기화
        this.setState({
            comment: '',
            modal: false,
        });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    commentToggle = () => {
        this.setState(prevState => ({modal: !prevState.modal}));
    };

    onClose = () => {
        const {closeToggle} = this.props;
        closeToggle(); //
    };

    showComment = () => {
        console.log("옴마나@");
    };

    showPassword = (e) => {
        e.preventDefault();
        this.setState(prevState => ({showPassword: !prevState.showPassword}));
    };

    render() {
        const {assetState, dispatch} = this.props;
        const {modal, comment, submitType} = this.state;
        let Icon;
        //let commentValue = new Map([]);

        console.log("comments : ", assetState.comments);

        /*        if (assetState.comments.length > 0) {
                    // eslint-disable-next-line prefer-destructuring
                    commentValue = assetState.device[0];
                } else {
                    commentValue = assetState.device;
                }*/

        /*        const {
                    Idx, parentTable, fkIdx, dvcDepth, dvcContents, registerId, registerName, registerDate,
                } = commentValue;*/

        let deviceComments;

        if (assetState.comments.length > 0) {
            deviceComments = (
                <Fragment>
                    {assetState.comments
                        .sort()
                        .map(d => (
                            <div
                                key={d.Idx}>
                                <span>▶ {d.RegisterName} ({d.RegisterId}) -  [{d.RegisterDate}]</span>
                                <div className="modal_comment_del">삭제</div>
                                <div className="modal_comment_edit">수정</div>
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
                    <span>▶ 등록된 로고가 없습니다.</span>
                </Fragment>
            );
        }

        return (
            <div>
                <Collapse title="로고 확인"
                          className="with-shadow modal_comment_register assets_write__modal__tableLine">
                    {deviceComments}
                </Collapse>
            </div>
        );
    }
}

export default AssetsLogo;
