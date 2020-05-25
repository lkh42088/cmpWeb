import React from 'react';
import {Button, ButtonToolbar} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import CurrencyUsdIcon from 'mdi-react/CurrencyUsdIcon';
import TagIcon from 'mdi-react/TagIcon';
import SearchIcon from 'mdi-react/SearchIcon';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import TimetableIcon from 'mdi-react/TimetableIcon';
import renderSelectField from '../../../../shared/components/form/Select';
import renderDatePickerField from '../../../../shared/components/form/DatePicker';
import renderIntervalDatePickerField from '../../../../shared/components/form/IntervalDatePicker';
import TextEditor from '../../../../shared/components/text-editor/TextEditor';
import Alert from '../../../../shared/components/Alert';
// .theme-light .react-select__control  .react-select .row {
const AssetsWriteForm = ({handleSubmit, reset}) => (
    <form className="form product-edit" onSubmit={handleSubmit}>
        {/*  -----------------------------------------------------------------------------------------왼쪽 폼  */}
        <div className="form__half">
            <div className="form__form-group-id-category">
                <div className="form__form-group form__form-group-id">
                    <span className="form__form-group-label">장비코드</span>
                    <div className="form__form-group-field">
                        <span
                            className="badge badge-secondary valid-feedback">
                          장비 등록 시 자동생성</span>
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">IDC/랙번호</span>
                    <div className="form__form-group-field">
                        <Field
                            name="category"
                            component={renderSelectField}
                            type="text"
                            options={[
                                {value: 'one', label: 'One'},
                                {value: 'two', label: 'Two'},
                            ]}
                            placeholder="IDC"
                        />
                        <Field
                            name="category"
                            component={renderSelectField}
                            type="text"
                            options={[
                                {value: 'one', label: 'One'},
                                {value: 'two', label: 'Two'},
                            ]}
                            placeholder="랙번호"
                        />
                    </div>
                </div>
            </div>
            <div className="form__form-group">
                <span className="form__form-group-label">크기</span>
                <div className="form__form-group-field">
                    <Field
                        name="category"
                        component={renderSelectField}
                        type="text"
                        options={[
                            {value: 'one', label: 'One'},
                            {value: 'two', label: 'Two'},
                        ]}
                        placeholder="선택하세요."
                    />
                </div>
            </div>
            <div className="form__form-group-id-category">
                <div className="form__form-group form__form-group-id">
                    <span className="form__form-group-label">장비구분</span>
                    <div className="form__form-group-field">
                        <Field
                            name="category"
                            component={renderSelectField}
                            type="text"
                            options={[
                                {value: 'one', label: 'One'},
                                {value: 'two', label: 'Two'},
                            ]}
                            placeholder="선택하세요."
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">고객사명</span>
                    <div className="form__form-group-field">
                        <Field
                            name="short_description"
                            component="input"
                            type="text"
                        />
                        <div className="form__form-group-icon">
                            <SearchIcon/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form__form-group">
                <span className="form__form-group-label">소유업체명</span>
                <div className="form__form-group-field">
                    <Field
                        name="short_description"
                        component="input"
                        type="text"
                    />
                    <div className="form__form-group-icon">
                        <SearchIcon/>
                    </div>
                </div>
            </div>
            <div className="form__form-group-id-category">
                <div className="form__form-group form__form-group-id">
                    <span className="form__form-group-label">CPU</span>
                    <div className="form__form-group-field">
                        <Field
                            name="short_description"
                            component="input"
                            type="text"
                        />
                    </div>
                </div>
                <div className="form__form-group form__form-group-id">
                    <span className="form__form-group-label">MEMORY</span>
                    <div className="form__form-group-field">
                        <Field
                            name="short_description"
                            component="input"
                            type="text"
                        />
                    </div>
                </div>
            </div>
            <div className="form__form-group">
                <span className="form__form-group-label">임대기간</span>
                <div className="form__form-group-field">
                    <Field
                        name="interval_date"
                        component={renderIntervalDatePickerField}
                    />
                </div>
            </div>
            <div className="form__form-group-id-category">
                <div className="form__form-group form__form-group-id">
                    <span className="form__form-group-label">원가</span>
                    <div className="form__form-group-field">
                        <div className="form__form-group-icon">
                            <CurrencyUsdIcon/>
                        </div>
                        <Field
                            name="short_description"
                            component="input"
                            type="text"
                        />
                    </div>
                </div>
                <div className="form__form-group form__form-group-id">
                    <span className="form__form-group-label">용도</span>
                    <div className="form__form-group-field">
                        <Field
                            name="short_description"
                            component="input"
                            type="text"
                        />
                    </div>
                </div>
            </div>
            <div className="form__form-group">
                <span className="form__form-group-label">SPLA</span>
                <div className="form__form-group-field">
                    <Field
                        name="category"
                        component={renderSelectField}
                        type="text"
                        options={[
                            {value: 'one', label: 'One'},
                            {value: 'two', label: 'Two'},
                        ]}
                        placeholder="선택하세요."
                    />
                    <Field
                        name="category"
                        component={renderSelectField}
                        type="text"
                        options={[
                            {value: 'one', label: 'One'},
                            {value: 'two', label: 'Two'},
                        ]}
                        placeholder="선택하세요."
                    />
                </div>
            </div>
        </div>
        {/*  ----------------------------------------------------------------------------------------오른쪽 폼  */}
        <div className="form__half">
            <div className="form__form-group">
                <span className="form__form-group-label">제조사/모델명</span>
                <div className="form__form-group-field">
                    <Field
                        name="category"
                        component={renderSelectField}
                        type="text"
                        options={[
                            {value: 'one', label: 'One'},
                            {value: 'two', label: 'Two'},
                        ]}
                        placeholder="제조사"
                    />
                    <Field
                        name="category"
                        component={renderSelectField}
                        type="text"
                        options={[
                            {value: 'one', label: 'One'},
                            {value: 'two', label: 'Two'},
                        ]}
                        placeholder="모델명"
                    />
                </div>
            </div>
            <div className="form__form-group">
                <span className="form__form-group-label">IP</span>
                <div className="form__form-group-field">
                    <Field
                        name="size"
                        component="input"
                        type="text"
                    />
                </div>
            </div>
            <div className="form__form-group">
                <span className="form__form-group-label">소유권/소유권구분<span
                    dir="ltr">(고객사명 선택 후 입력해주세요.)</span></span>
                <div className="form__form-group-field">
                    <Field
                        name="category"
                        component={renderSelectField}
                        type="text"
                        options={[
                            {value: 'one', label: 'One'},
                            {value: 'two', label: 'Two'},
                        ]}
                        placeholder="소유권"
                    />
                    <Field
                        name="category"
                        component={renderSelectField}
                        type="text"
                        options={[
                            {value: 'one', label: 'One'},
                            {value: 'two', label: 'Two'},
                        ]}
                        placeholder="소유권구분"
                    />
                </div>
            </div>
            <div className="form__form-group">
                <span className="form__form-group-label">HW S/N</span>
                <div className="form__form-group-field">
                    <Field
                        name="short_description"
                        component="input"
                        type="text"
                    />
                </div>
            </div>
            <div className="form__form-group">
                <span className="form__form-group-label">HDD</span>
                <div className="form__form-group-field">
                    <Field
                        name="delivery"
                        component="input"
                        type="text"
                    />
                </div>
            </div>
            <div className="form__form-group">
                <span className="form__form-group-label">입고일</span>
                <div className="form__form-group-field">
                    <Field
                        name="default_date"
                        component={renderDatePickerField}
                    />
                    <div className="form__form-group-icon">
                        <CalendarBlankIcon/>
                    </div>
                </div>
            </div>
        </div>
        <div className="form__form-group">
            <span className="form__form-group-label">기타사항</span>
            <TextEditor onChange={() => {
            }}/>
          <ButtonToolbar className="form__button-toolbar float-right">
            <Button color="primary" type="submit">Submit</Button>
            <Button type="button" onClick={reset}>
              Cancel
            </Button>
          </ButtonToolbar>
        </div>

    </form>
);

AssetsWriteForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
};

export default reduxForm({
    form: 'product_edit_form', // a unique identifier for this form
})(AssetsWriteForm);
