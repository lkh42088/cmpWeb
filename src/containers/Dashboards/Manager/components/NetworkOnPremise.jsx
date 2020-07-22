/* eslint-disable react/no-array-index-key */
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {
    PieChart, Pie, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {withTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import Panel from './Panel';
import getTooltipStyles from '../../../../shared/helpers';

const data01 = [
    {name: '목동 L3', value: 900, fill: '#4ce1b6'},
    {name: '분당 L2', value: 400, fill: '#70bbfd'},
    {name: '영동', value: 250, fill: '#f6da6e'},
    {name: '부산 L2', value: 200, fill: '#ff4861'}];

const style = (dir) => {
    const left = dir === 'ltr' ? {left: 0} : {right: 0};
    return ({
        ...left,
        width: 150,
        lineHeight: '24px',
        position: 'absolute',
    });
};


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

class NetworkOnPremise extends PureComponent {
    static propTypes = {
        t: PropTypes.func.isRequired,
        themeName: PropTypes.string.isRequired,
    };

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
        const {close, themeName} = this.props;
        const {x, y} = this.state;

        return (
            <Panel title="NETWORK : 온프레미스" close={close}>
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
                    <div className="dashboard__health-chart-number">2750</div>
                </div>
            </Panel>
        );
    }
}

export default connect(state => ({themeName: state.theme.className}))(withTranslation('common')(NetworkOnPremise));
