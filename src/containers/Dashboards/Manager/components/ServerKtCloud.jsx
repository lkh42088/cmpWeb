/* eslint-disable react/no-array-index-key */
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {
    PieChart, Pie, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {withTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {Card} from 'reactstrap';
import getTooltipStyles from '../../../../shared/helpers';
import Panel from './Panel';

const data01 = [
    {name: '서울M', value: 1000, fill: '#4ce1b6'},
    {name: '서울M2', value: 2000, fill: '#70bbfd'},
    {name: '중부1', value: 500, fill: '#f6da6e'},
    {name: '중부2', value: 700, fill: '#ff4861'}];

const renderLegend = ({payload}) => (
    <ul className="dashboard__chart-legend">
        {
            payload.map((entry, index) => (
                <li key={`item-${index}`}>
                    <span style={{backgroundColor: entry.color}}/>
                    {entry.value}
                </li>
            ))
        }
    </ul>
);

renderLegend.propTypes = {
    payload: PropTypes.arrayOf(PropTypes.shape({
        color: PropTypes.string,
        vslue: PropTypes.string,
    })).isRequired,
};

class ServerKtCloud extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
        };
    }

    onMouseMove = (e) => {
        const {dir} = this.props;
        if (e.tooltipPosition) {
            this.setState({
                x: dir === 'ltr' ? e.tooltipPosition.x : e.tooltipPosition.x / 10,
                y: e.tooltipPosition.y,
            });
        }
    };

    render() {
        const {themeName, close} = this.props;
        const {x, y} = this.state;

        return (
            <Panel title="SERVER : KT CLOUD" close={close}>
                <ResponsiveContainer className="dashboard__chart-pie dashboard__chart-pie--crypto"
                                     height={360}>
                    <PieChart className="dashboard__chart-pie-container">
                        <Tooltip
                            formatter={value => (`${value.toFixed(2)}`)}
                            position={{x, y}}
                            {...getTooltipStyles(themeName)}
                        />
                        <Pie
                            data={data01}
                            dataKey="value"
                            cy={175}
                            innerRadius={90}
                            outerRadius={140}
                            label={value => (`${value.value.toFixed(2)}`)}
                            onMouseMove={this.onMouseMove}
                        />
                        <Legend
                            layout="vertical"
                            align="left"
                            verticalAlign="bottom"
                            content={renderLegend}/>
                    </PieChart>
                </ResponsiveContainer>
                <div className="dashboard__health-chart-info">
                    <div className="dashboard__health-chart-number">4200</div>
                </div>
            </Panel>
        );
    }
}

export default connect(state => ({themeName: state.theme.className}))(withTranslation('common')(ServerKtCloud));
