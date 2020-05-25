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
    </PanelSearchAssets>
);

AssetsSearch.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
};

export default reduxForm({
    form: 'vertical_form_layout_half', // a unique identifier for this form
})(withTranslation('common')(AssetsSearch));
