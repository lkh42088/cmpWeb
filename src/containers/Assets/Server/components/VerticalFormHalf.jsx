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

const VerticalFormHalf = ({handleSubmit, reset, t}) => (
    <Col md={12} lg={12}>
        <Card className="color-picker">
            <CardBody className="card-body__assets_sch">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form__assets_sch">
                        <div className="form__form-group">
                            <span className="form__form-group-label__assets_sch">장비코드</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="first_name"
                                    component="input"
                                    type="text"
                                    placeholder="ex) CBS04912"
                                />
                            </div>
                        </div>
                        <div className="form__form-group">
                            <span className="form__form-group-label__assets_sch">고객사</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="birth"
                                    component="input"
                                    type="text"
                                    placeholder="고객사"
                                />
                            </div>
                        </div>
                        <div className="form__form-group">
                            <span className="form__form-group-label__assets_sch">IP</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="zip"
                                    component="input"
                                    type="text"
                                    placeholder="ex) 0.0.0.0"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form__assets_sch">
                        <div className="form__form-group">
                            <span className="form__form-group-label__assets_sch">소유권/소유권 구분</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="select"
                                    component={renderSelectField}
                                    type="text"
                                    options={[
                                        {value: 'one', label: '자사장비'},
                                        {value: 'two', label: '고객장비'},
                                    ]}
                                />
                                <Field
                                    name="select"
                                    component={renderSelectField}
                                    type="text"
                                    options={[
                                        {value: '1', label: '고객소유장비'},
                                        {value: '2', label: '소유형임대'},
                                        {value: '3', label: '비소유형임대'},
                                        {value: '4', label: '재고장비'},
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="form__form-group">
                            <span className="form__form-group-label__assets_sch">랙번호</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="select"
                                    component={renderSelectField}
                                    type="text"
                                    options={[
                                        {value: '1', label: '랙없음'},
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form__assets_sch">
                        <div className="form__form-group__assets_sch">
                            <span className="form__form-group-label__assets_sch">IDC</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="select"
                                    component={renderSelectField}
                                    type="text"
                                    options={[
                                        {value: '1', label: '강남KT-IDC'},
                                        {value: '2', label: '분당KT-IDC'},
                                        {value: '3', label: '목동KT-IDC 1센터'},
                                        {value: '4', label: '서초SK-IDC'},
                                        {value: '5', label: '서초-KIDC'},
                                        {value: '6', label: '동판교 국사'},
                                        {value: '7', label: '...'},
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="form__form-group__assets_sch">
                            <span className="form__form-group-label__assets_sch">모델명</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="select"
                                    component={renderSelectField}
                                    type="text"
                                    options={[
                                        {value: 'one', label: '...'},
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form__assets_sch">
                        <div className="form__form-group__assets_sch">
                            <span className="form__form-group-label__assets_sch">제조사</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="last_name"
                                    component="input"
                                    type="text"
                                    placeholder="ex) HP"
                                />
                            </div>
                        </div>
                        <div className="form__form-group__assets_sch">
                            <span className="form__form-group-label__assets_sch">장비구분</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="select"
                                    component={renderSelectField}
                                    type="text"
                                    options={[
                                        {value: '1', label: '서버'},
                                        {value: '2', label: '스토리지'},
                                        {value: '3', label: '기타'},
                                    ]}
                                />
                            </div>
                        </div>
                        <ButtonToolbar>
                            <Button color="primary" size="sm" type="submit">검색</Button>
                        </ButtonToolbar>
                    </div>
                </form>
            </CardBody>
        </Card>
    </Col>
);

VerticalFormHalf.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
};

export default reduxForm({
    form: 'vertical_form_layout_half', // a unique identifier for this form
})(withTranslation('common')(VerticalFormHalf));
