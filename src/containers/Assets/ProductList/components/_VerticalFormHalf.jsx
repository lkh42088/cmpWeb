import React from 'react';
import {
    Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import {withTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import renderRadioButtonField from '../../../../shared/components/form/RadioButton';
import renderSelectField from '../../../../shared/components/form/Select';

const style = {
    backgroundColor: 'black',
    color: 'white',
    width: '30%',
};

const board = {
    border: '1px solid red',
};

const _VerticalFormHalf = ({handleSubmit, reset, t}) => (
    <Col md={12} lg={12}>
        <Card className="color-picker">
            <CardBody className="card-body__assets_sch">
                test
            </CardBody>
        </Card>
    </Col>
);

_VerticalFormHalf.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
};

export default reduxForm({
    form: 'vertical_form_layout_half', // a unique identifier for this form
})(withTranslation('common')(_VerticalFormHalf));
