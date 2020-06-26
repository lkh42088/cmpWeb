import React from 'react';
import { PieChart, Pie } from 'recharts';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Panel from '../../../../shared/components/Panel';

const CustomerBilling = ({ t, data }) => (
  <Panel title={t('dashboard_default.budget_statistic')}>
    <div className="dashboard__stat dashboard__stat--budget">
      <div className="dashboard__stat-main">
        <p className="dashboard__stat-main-title">Total</p>
        <p className="dashboard__stat-main-number">￦877,000</p>
        <hr />
      </div>
      <div className="dashboard__stat-chart">
        <PieChart height={350} width={240}>
          <Pie data={data} dataKey="value" cx={55} cy={55} innerRadius={50} outerRadius={60} />
        </PieChart>
        <p className="dashboard__stat-label">￦</p>
      </div>
      <div className="dashboard__stat-data">
        <div>
          <p className="dashboard__stat-data-number">￦124,000</p>
          <p style={{ color: '#64677b' }}>Completed</p>
        </div>
        <div>
          <p className="dashboard__stat-data-number">￦753,000</p>
          <p style={{ color: '#4ce1b6' }}>Remaining</p>
        </div>
      </div>
    </div>
  </Panel>
);

CustomerBilling.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(CustomerBilling);
