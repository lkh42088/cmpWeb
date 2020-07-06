import React, { PureComponent } from 'react';
import {
  Col, Container, Row, CardBody, Card,
} from 'reactstrap';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ServerKtCloud from './components/ServerKtCloud';
import ServerOnPremise from './components/ServerOnPremise';
import NetworkOnPremise from './components/NetworkOnPremise';
import PublicNetwork from './components/PublicNetwork';
import RandomAnimatedBars from './components/RandomAnimatedBars';
import { deleteCryptoTableData } from '../../../redux/actions/cryptoTableActions';
import { CryptoTableProps } from '../../../shared/prop-types/TablesProps';
import { ThemeProps, RTLProps } from '../../../shared/prop-types/ReducerProps';
import RouterBreadcrumbs from "../../Layout/sidebar/Breadcrumb";

class CryptoDashboard extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
    cryptoTable: CryptoTableProps.isRequired,
    dispatch: PropTypes.func.isRequired,
    rtl: RTLProps.isRequired,
    theme: ThemeProps.isRequired,
  };

  onDeleteCryptoTableData = (index, e) => {
    const { dispatch, cryptoTable } = this.props;
    e.preventDefault();
    const arrayCopy = [...cryptoTable];
    arrayCopy.splice(index, 1);
    dispatch(deleteCryptoTableData(arrayCopy));
  };

  render() {
    const {
      t, cryptoTable, rtl, theme,
    } = this.props;

    return (
      <Container className="dashboard">
        <Row>
          <RouterBreadcrumbs url={window.location.href}/>
          {/*<Col md={12}>*/}
          {/*  <h3 className="page-title">DASHBOARD</h3>*/}
          {/*</Col>*/}
        </Row>
        <Row>
          <ServerKtCloud dir={rtl.direction} />
          <ServerOnPremise dir={rtl.direction} />
          <NetworkOnPremise dir={rtl.direction} />
        </Row>
        <Row>
          <PublicNetwork />
          <RandomAnimatedBars />
        </Row>
      </Container>
    );
  }
}

export default connect(state => ({
  cryptoTable: state.cryptoTable.items,
  rtl: state.rtl,
  theme: state.theme,
}))(withTranslation('common')(CryptoDashboard));
