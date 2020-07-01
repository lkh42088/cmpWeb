import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, ButtonToolbar, Modal} from 'reactstrap';
import classNames from 'classnames';
import {Field} from "redux-form";

import {RTLProps} from '../../../../shared/prop-types/ReducerProps';

import TextEditor from "../../../../shared/components/text-editor/TextEditor";
import renderIntervalDatePickerField from "../../../../shared/components/form/IntervalDatePicker";
import renderDatePickerField from "../../../../shared/components/form/DatePicker";

import AssetsWrite from "./AssetsWrite";
import _AssetsView from "./AssetsView";

class _AssetsModal extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        message: PropTypes.string,
        modalType: PropTypes.string,
        toggleTitle: PropTypes.string,
        colored: PropTypes.bool,
        header: PropTypes.bool,
        rtl: RTLProps.isRequired,
        // eslint-disable-next-line react/forbid-prop-types
        //assetState: PropTypes.object.isRequired,
        //dispatch: PropTypes.func.isRequired,
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
            title, message, colored, header, rtl, modalType, toggleTitle,
        } = this.props;

        const {modal} = this.state;
        let modalContent;
        const {showPassword} = this.state;
        //const {assetState, dispatch} = this.props;

        const modalClass = classNames({
            'assets_write__modal-dialog': true,
        });

        return (
            <div>
{/*                <div className="assets_add_modal_div" onClick={this.toggle} onKeyDown={this.toggle}
                     role="button" tabIndex="0"><span
                    className="circle__ste"/>---</div>*/}
                <Modal
                    isOpen={modal}
                    /*toggle={this.toggle}*/
                    modalClassName={`${rtl.direction}-support`}
                    className={`assets_write__modal-dialog assets_write__modal-dialog ${modalClass}`}
                >
                    {modalContent}
                </Modal>
            </div>
        );
    }
}

/*export default AssetsModal;*/

export default connect(state => ({
    rtl: state.rtl,
    modal: state.modal,
}))(_AssetsModal);
