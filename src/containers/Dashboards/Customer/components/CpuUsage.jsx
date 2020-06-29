import React from 'react';
import {Card, CardBody, Progress} from 'reactstrap';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const CpuUsage = ({ t, data }) => (
    <Card className="cb-card" >
        <CardBody className="cb-card-body dashboard">
            <p>CPU USAGE</p>
            {
                data.map((entry, index) => (
                    <div className="progress-wrap progress-wrap--small">
                        <p>{entry.name}</p>
                        <progress value={entry.use}>{entry.use}%</progress>
                    </div>
                ))
            }
            <div className="progress-wrap progress-wrap--small">
                <p>Completed Purchase</p>
                <Progress value={46}>46%</Progress>
            </div>
            <div className="progress-wrap progress-wrap--small">
                <p>New clients</p>
                <Progress value={67}>67%</Progress>
            </div>
            <div className="progress-wrap progress-wrap--small">
                <p>New subscribers</p>
                <Progress value={87}>87%</Progress>
            </div>
            <div className="progress-wrap progress-wrap--small">
                <p>Site visits from ADS banners</p>
                <Progress value={24}>24%</Progress>
            </div>
            <div className="progress-wrap progress-wrap--small">
                <p>Total page views</p>
                <Progress value={56}>56%</Progress>
            </div>
            <div className="progress-wrap progress-wrap--small">
                <p>Positive feedback</p>
                <Progress value={46}>46%</Progress>
            </div>
        </CardBody>
    </Card>
);

CpuUsage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(CpuUsage);
