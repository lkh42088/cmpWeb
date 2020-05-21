import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, ButtonToolbar, Modal} from 'reactstrap';
import classNames from 'classnames';
import {RTLProps} from '../prop-types/ReducerProps';
import {
    fetchPosts,
    getDeviceCommentByDeviceCode,
    setState,
} from '../../redux/actions/assetsAction';

class ModalComponent extends PureComponent {
    static propTypes = {
        // eslint-disable-next-line react/forbid-prop-types
        assetState: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        title: PropTypes.string,
        message: PropTypes.string,
        color: PropTypes.string.isRequired,
        colored: PropTypes.bool,
        header: PropTypes.bool,
        rtl: RTLProps.isRequired,
        openFlag: PropTypes.bool,
        modalType: PropTypes.string.isRequired,
        modalFunc: PropTypes.func.isRequired,
    };

    static defaultProps = {
        title: '',
        message: '',
        colored: false,
        header: false,
        openFlag: false,
    };

    constructor() {
        super();

        this.toggle = this.toggle.bind(this);
    }

    toggle(division) {
        const {
            assetState, dispatch, modalType, modalFunc,
        } = this.props;

        if (division === 'ok' && modalType === 'delete') {
            modalFunc();
        } else { //error
            const stateVal = ({
                type: assetState.stateVal.type,
                division: assetState.stateVal.division,
                state: 'finish',
            });

            dispatch(setState(stateVal));
        }
    }

    render() {
        const {
            color, title, message, colored, header, rtl, openFlag, modalType,
        } = this.props;
        let Icon;

        switch (color) {
            case 'primary':
                Icon = <span className="lnr lnr-pushpin modal__title-icon"/>;
                break;
            case 'success':
                Icon = <span className="lnr lnr-thumbs-up modal__title-icon"/>;
                break;
            case 'warning':
                Icon = <span className="lnr lnr-flag modal__title-icon"/>;
                break;
            case 'danger':
                Icon = <span className="lnr lnr-cross-circle modal__title-icon"/>;
                break;
            default:
                break;
        }
        const modalClass = classNames({
            'modal-dialog--colored': colored,
            'modal-dialog--header': header,
        });

        return (
            <div>
                <Modal
                    isOpen={openFlag}
                    modalClassName={`${rtl.direction}-support`}
                    className={`modal-dialog--${color} ${modalClass}`}
                >
                    <div className="modal__header">
                        <button className="lnr lnr-cross modal__close-btn" type="button" onClick={this.toggle}/>
                        {header ? '' : Icon}
                        <h4 className="text-modal  modal__title">{title}</h4>
                    </div>
                    <div className="modal__body">
                        {message}
                    </div>
                    {
                        modalType === 'error'
                            ? (
                                <ButtonToolbar className="modal__footer">
                                    <Button className="modal_ok" outline={colored} color={color}
                                            onClick={() => this.toggle('close')}>Ok</Button>
                                </ButtonToolbar>
                            )
                            : (
                                <ButtonToolbar className="modal__footer">
                                    <Button className="modal_ok" outline={colored} color={color}
                                            onClick={() => this.toggle('ok')}>Ok</Button>
                                    <Button className="modal_close" outline={colored} color={color}
                                            onClick={() => this.toggle('close')}>Close</Button>
                                </ButtonToolbar>
                            )
                    }
            </Modal>
            </div>
        );
    }
}

export default connect(state => ({
    rtl: state.rtl,
}))(ModalComponent);
