import React from 'react';
import {Card, CardBody, Progress} from 'reactstrap';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Panel from '../../../../shared/components/Panel';

const CpuUsage = ({ t, data }) => (
    <Card className="cb-card" >
        <CardBody className="cb-card-body dashboard">
            <p style={{fontSize: "1vmin", paddingBottom: 20}}>CPU USAGE AVERAGE</p>
            {
                data.map((entry, index) => (
                    <div className="progress-wrap progress-wrap--middle">
                        <p>{entry.name}</p>
                        <Progress
                            animated="progress-bar-animated"
                            className={(entry.use >= 80) ? "progress-wrap--pink" : null}
                            value={entry.use}>
                            {entry.use}%
                        </Progress>
                    </div>
                ))
            }
        </CardBody>
    </Card>
);

CpuUsage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(CpuUsage);
