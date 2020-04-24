import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, ButtonToolbar, Modal} from 'reactstrap';
import classNames from 'classnames';

import {RTLProps} from '../../../../shared/prop-types/ReducerProps';

import CustomerWrite from './CustomerWrite';
import CustomerView from './CustomerView';

class CustomerModal extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        message: PropTypes.string,
        modalType: PropTypes.string,
        toggleTitle: PropTypes.string,
        color: PropTypes.string.isRequired,
        colored: PropTypes.bool,
        header: PropTypes.bool,
        btn: PropTypes.string.isRequired,
        rtl: RTLProps.isRequired,
    };

    static defaultProps = {
        title: '',
        message: '',
        modalType: '',
        toggleTitle: '-',
        colored: false,
        header: false,
    };

    constructor() {
        super();
        this.state = {
            modal: false,
            showPassword: false,
        };
    }

    toggle = () => {
        this.setState(prevState => ({modal: !prevState.modal}));
    };

    /* closeToggle = () => {
       this.setState(prevState => ({modal: !prevState.modal}));
     };*/

    showPassword = (e) => {
        e.preventDefault();
        this.setState(prevState => ({showPassword: !prevState.showPassword}));
    };

    render() {
        const {
            color, btn, title, message, colored, header, rtl, modalType, toggleTitle,
        } = this.props;
        const {modal} = this.state;
        let Icon;
        let modalContent;
        const {showPassword} = this.state;

        const tempStyle = {
            textDecoration: '#ffdd67 underline',
            fontWeight: 'bold',
            /*textUnderlinePosition: 'under',*/
        };

        switch (color) {
            case 'primary':
                Icon = <span className="lnr lnr-pushpin assets_write__modal__title-icon"/>;
                break;
            case 'success':
                Icon = <span className="lnr lnr-thumbs-up assets_write__modal__title-icon"/>;
                break;
            case 'warning':
                Icon = <span className="lnr lnr-flag assets_write__modal__title-icon"/>;
                break;
            case 'danger':
                Icon = <span className="lnr lnr-cross-circle assets_write__modal__title-icon"/>;
                break;
            default:
                break;
        }

        const modalClass = classNames({
            'assets_write__modal-dialog': true,
            'assets_write__modal-dialog--colored': colored,
            'assets_write__modal-dialog--header': header,
        });

        switch (modalType) {
            case 'write':
                modalContent = <CustomerWrite closeToggle={this.toggle} title={title} message={message}/>;
                break;
            case 'view':
                modalContent = <CustomerView closeToggle={this.toggle} title={title} message={message}/>;
                break;
            default:
                modalContent = 'Error!';
                break;
        }

        return (
            <div>
                <div className="assets_add_modal_div" onClick={this.toggle} onKeyDown={this.toggle}
                     role="button" tabIndex="0"><span
                    className="circle__ste"/>{toggleTitle}</div>
                <Modal
                    isOpen={modal}
                    /*toggle={this.toggle}*/
                    modalClassName={`${rtl.direction}-support`}
                    className={`assets_write__modal-dialog assets_write__modal-dialog--${color} ${modalClass}`}
                >
                    {modalContent}
                </Modal>
            </div>
        );
    }
}

/*export default CustomerModal;*/

export default connect(state => ({
    rtl: state.rtl,
    modal: state.modal,
}))(CustomerModal);
