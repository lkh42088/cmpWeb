import React from 'react';
import {
    Card, CardBody, Col, Button, ButtonToolbar, Table, Badge,
} from 'reactstrap';
import MagnifyIcon from "mdi-react/MagnifyIcon";
import ArrowDownwardIcon from "mdi-react/ArrowDownwardIcon";

import {Link} from "react-router-dom";
import {Field, reduxForm} from 'redux-form';
import {withTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import AccountSearchIcon from "mdi-react/AccountSearchIcon";

import renderSelectField from '../../../../shared/components/form/Select';
/*import PanelSearchAssets from "../../../../shared/components/PanelSearch_Assets";*/
import PanelSearchAssets from "./PanelSearch_Assets";

const AssetsSearch = ({handleSubmit, reset, t}) => (
    <PanelSearchAssets lg={12}
                       title={t('Search')}
                       subhead="※상세 검색을 원하시면 오른쪽 버튼을 클릭하세요."
                       label="test"
    >
        <div style={{padding: '0 0 0 5px'}}>
            <form className="form__assets_sch" onSubmit={handleSubmit}>
                <select name="">
                    <option value="">소유권</option>
                    <option value="">자사장비</option>
                    <option value="">고객장비</option>
                </select>
                /
                <select name="">
                    <option value="">소유권구분</option>
                    <option value="">고객소유장비</option>
                    <option value="">소유형임대</option>
                    <option value="">비소유형임대</option>
                    <option value="">재고장비</option>
                </select>
                &nbsp;&nbsp;
                <select name="">
                    <option value="">IDC</option>
                    <option value="">강남KT-IDC</option>
                    <option value="">분당KT-IDC</option>
                    <option value="">목동KT-IDC 1센터</option>
                    <option value="">서초SK-IDC</option>
                    <option value="">...</option>
                </select>
                &nbsp;&nbsp;
                <select name="">
                    <option value="">제조사</option>
                    <option value="">IBM(Lenovo)</option>
                    <option value="">HP</option>
                    <option value="">DELL</option>
                    <option value="">eSilm</option>
                    <option value="">SuperMicro</option>
                    <option value="">FUJITSU</option>
                    <option value="">UNIWIDE</option>
                    <option value="">조립서버</option>
                    <option value="">데스크탑</option>
                    <option value="">CISCO</option>
                    <option value="">SUN</option>
                    <option value="">COMPAQ</option>
                    <option value="">3GEN</option>
                    <option value="">HITACHI</option>
                    <option value="">삼성</option>
                    <option value="">NETGEAR</option>
                    <option value="">SYNOLOGY</option>
                    <option value="">ASUS</option>
                    <option value="">Buffalo</option>
                    <option value="">QNAP</option>
                    <option value="">EMC</option>
                    <option value="">Infortrend</option>
                    <option value="">블레이드서버</option>
                    <option value="">Symantec</option>
                    <option value="">NetApp</option>
                    <option value="">지란지교시큐리티</option>
                    <option value="">Quantum</option>
                    <option value="">Inspur</option>
                    <option value="">VERITAS</option>
                    <option value="">Quantum</option>
                    <option value="">Intel</option>
                    <option value="">Promise Technology</option>
                    <option value="">NUTANIX</option>
                    <option value="">(주)소만사</option>
                    <option value="">TERATEC</option>
                    <option value="">Fortinet</option>
                    <option value="">WAREVALLEY</option>
                </select>
                &nbsp;&nbsp;
                <select name="">
                    <option value="">장비구분</option>
                    <option value="7">서버</option>
                    <option value="8">스토리지</option>
                    <option value="9">기타</option>
                </select>
                &nbsp;&nbsp;
                <input placeholder="IP" name=""/>
                {/*<br/><br/>*/}
                &nbsp;&nbsp;
                <input placeholder="고객사" name=""/>
                <span className="search_btn_span"><AccountSearchIcon/></span>
                &nbsp;&nbsp;
                <select name="">
                    <option value="">랙번호</option>
                    <option value="none">None</option>
                </select>
                &nbsp;&nbsp;
                <select name="">
                    <option value="">모델명</option>
                </select>
            </form>
        </div>
        {/*<Table responsive className="table--bordered">
            <thead>
            <tr>
                <th><Badge color="primary">Completed</Badge></th>
                <th>Invoice</th>
                <th>Customer Name</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Date</th>
                <th>Location</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <select name="">
                        <option value="">소유권</option>
                        <option value="">자사장비</option>
                        <option value="">고객장비</option>
                    </select>
                    /
                    <select name="">
                        <option value="">소유권구분</option>
                        <option value="">고객소유장비</option>
                        <option value="">소유형임대</option>
                        <option value="">비소유형임대</option>
                        <option value="">재고장비</option>
                    </select>
                </td>
                <td>
                    <select name="">
                        <option value="">IDC</option>
                        <option value="">강남KT-IDC</option>
                        <option value="">분당KT-IDC</option>
                        <option value="">목동KT-IDC 1센터</option>
                        <option value="">서초SK-IDC</option>
                        <option value="">...</option>
                    </select>
                </td>
                <td>
                    <select name="">
                        <option value="">제조사</option>
                        <option value="">IBM(Lenovo)</option>
                        <option value="">HP</option>
                        <option value="">DELL</option>
                        <option value="">eSilm</option>
                        <option value="">SuperMicro</option>
                        <option value="">FUJITSU</option>
                        <option value="">UNIWIDE</option>
                        <option value="">조립서버</option>
                        <option value="">데스크탑</option>
                        <option value="">CISCO</option>
                        <option value="">SUN</option>
                        <option value="">COMPAQ</option>
                        <option value="">3GEN</option>
                        <option value="">HITACHI</option>
                        <option value="">삼성</option>
                        <option value="">NETGEAR</option>
                        <option value="">SYNOLOGY</option>
                        <option value="">ASUS</option>
                        <option value="">Buffalo</option>
                        <option value="">QNAP</option>
                        <option value="">EMC</option>
                        <option value="">Infortrend</option>
                        <option value="">블레이드서버</option>
                        <option value="">Symantec</option>
                        <option value="">NetApp</option>
                        <option value="">지란지교시큐리티</option>
                        <option value="">Quantum</option>
                        <option value="">Inspur</option>
                        <option value="">VERITAS</option>
                        <option value="">Quantum</option>
                        <option value="">Intel</option>
                        <option value="">Promise Technology</option>
                        <option value="">NUTANIX</option>
                        <option value="">(주)소만사</option>
                        <option value="">TERATEC</option>
                        <option value="">Fortinet</option>
                        <option value="">WAREVALLEY</option>
                    </select>
                </td>
                <td>
                    <select name="">
                        <option value="">장비구분</option>
                        <option value="7">서버</option>
                        <option value="8">스토리지</option>
                        <option value="9">기타</option>
                    </select>
                </td>
                <td>
                    <input placeholder="IP" name=""/>
                </td>
            </tr>
            <tr>
                <td>
                    <input placeholder="고객사" name="" className="search_customer"/>
                    <span className="search_btn_span">검색</span>
                </td>
                <td>
                    <select name="">
                        <option value="">랙번호</option>
                        <option value="none">랙없음</option>
                    </select>
                </td>
                <td colSpan="3">
                    <select name="">
                        <option value="">모델명</option>
                    </select>
                </td>
            </tr>
            </tbody>
        </Table>*/}
    </PanelSearchAssets>
    /*<Col md={12} lg={12}>
        <Card className="color-picker">
            <CardBody className="products-list">
                <div className="card__title">
                    <h5 className="bold-text">
                        상세 검색 <ArrowDownwardIcon className="dashboard__booking-reservations-link-icon" />
                    </h5>
                    <ButtonToolbar className="products-list__btn-toolbar-top">
                        <form className="form">
                            <div className="form__form-group products-list__search">
                                <input placeholder="장비코드" name="search" />
                                <MagnifyIcon />
                            </div>
                        </form>
                        <Link className="btn btn-primary products-list__btn-add" to="/e-commerce/product_edit">Add new
                            product
                        </Link>
                    </ButtonToolbar>
                </div>
            </CardBody>
            <CardBody className="card-body__assets_sch">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form__assets_sch">
                        <div className="form__form-group__assets_sch">
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
                        <div className="form__form-group__assets_sch">
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
                        <div className="form__form-group__assets_sch">
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
                        <div className="form__form-group__assets_sch">
                            <span className="form__form-group-label__assets_sch">소유권/소유권구분</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="select"
                                    component={renderSelectField}
                                    type="text"
                                    options={[
                                        {value: 'one', label: '자사장비'},
                                        {value: 'two', label: '고객장비'},
                                    ]}
                                    placeholder="소유권"
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
                                    placeholder="소유권구분"
                                />
                            </div>
                        </div>
                        <div className="form__form-group__assets_sch">
                            <span className="form__form-group-label__assets_sch">랙번호</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="select"
                                    component={renderSelectField}
                                    type="text"
                                    options={[
                                        {value: '1', label: '랙없음'},
                                    ]}
                                    placeholder="선택하세요."
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
                                    placeholder="선택하세요."
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
                                    placeholder="선택하세요."
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
                                    placeholder="선택하세요."
                                />
                            </div>
                        </div>
                        <ButtonToolbar className="float-right">
                            <Button color="success" outline size="sm">검색</Button>
                        </ButtonToolbar>
                    </div>
                </form>
            </CardBody>
        </Card>
    </Col>*/
);

AssetsSearch.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
};

export default reduxForm({
    form: 'vertical_form_layout_half', // a unique identifier for this form
})(withTranslation('common')(AssetsSearch));
