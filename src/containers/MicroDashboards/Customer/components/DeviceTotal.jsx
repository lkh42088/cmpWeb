import React from 'react';
import {
  Card, CardBody, Col, Progress,
} from 'reactstrap';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';

const DeviceTotal = ({total, description, progress}) => (
    <Card className="cb-card">
        <CardBody className="dashboard__booking-card">
            <div className="dashboard">
                <div className="dashboard__booking-total-container">
                    <h5 className="dashboard__booking-total-title dashboard__booking-total-title--green">
                        {total}
                    </h5>
                    <TrendingUpIcon className="dashboard__trend-icon" />
                </div>
                <h5 className="dashboard__booking-total-description">{description}</h5>
                <div className="progress-wrap progress-wrap--small progress-wrap--lime-gradient progress-wrap--rounded">
                    <p className="dashboard__booking-card-progress-label progress__label">{progress}%</p>
                    <Progress value={progress} />
                </div>
            </div>
        </CardBody>
    </Card>
);

export default DeviceTotal;
