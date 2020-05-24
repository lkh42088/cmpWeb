import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import showResults from '../../Form/Show';
import RegisterUserForm from "./components/RegisterUserForm";

const MaterialForm = ({ t }) => (
    <div className="account account--not-photo">
        <div className="account__wrapper">
            <div className="account__card">
                <Container>
                    <Row>
                        <Col md={12}>
                            <h3 className="page-title">{t('forms.material_from.title')}</h3>
                            <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
                                information
                            </h3>
                        </Col>
                    </Row>
                    <Row>
                        <RegisterUserForm onSubmit={showResults} />
                    </Row>
                </Container>
            </div>
        </div>
    </div>
);

MaterialForm.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(MaterialForm);
