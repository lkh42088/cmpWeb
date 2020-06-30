import React from 'react';
import { connect } from 'react-redux';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {Card, CardBody} from "reactstrap";

import getTooltipStyles from '../../../../shared/helpers';

const InternetStatistics = ({
  t, dir, themeName, data,
}) => (
    <Card className="cb-card" >
      <CardBody className="cb-card-body">
        <p>인터넷 전용선</p>
        <div dir="ltr">
          <ResponsiveContainer height={400} className="dashboard__area">
            <AreaChart data={data} margin={{ top: 20, left: -15, bottom: 20 }}>
              <XAxis dataKey="name" tickLine={false} reversed={dir === 'rtl'} />
              <YAxis tickLine={false} orientation={dir === 'rtl' ? 'right' : 'left'} />
              <Tooltip {...getTooltipStyles(themeName, 'defaultItems')} />
              <Legend />
              <CartesianGrid />
              <Area name="수신" type="monotone" dataKey="a" fill="#4ce1b6" stroke="#4ce1b6" fillOpacity={0.2} />
              <Area name="송신" type="monotone" dataKey="b" fill="#70bbfd" stroke="#70bbfd" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
);

InternetStatistics.propTypes = {
  t: PropTypes.func.isRequired,
  dir: PropTypes.string.isRequired,
  themeName: PropTypes.string.isRequired,
};

export default connect(state => ({
  themeName: state.theme.className,
}))(withTranslation('common')(InternetStatistics));
