import React, {PureComponent} from 'react';
import {
    Col, Card, Row, CardBody,
} from 'reactstrap';
import PropTypes from 'prop-types';
import AssetsList from './AssetsList';
import AssetsWrite from './AssetsWrite';

import VerticalFormHalf from './VerticalFormHalf';

export default class __Assets extends PureComponent {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.state = {
            pageType: 'list',
        };
    }

    nextPage = () => {
        this.setState(prevState => ({page: prevState.page + 1}));
    };

    previousPage = () => {
        this.setState(prevState => ({page: prevState.page - 1}));
    };

    render() {
        const {onSubmit} = this.props;
        const {pageType} = this.state;

        return (
            <Row>
                {pageType === 'list'
                && (
                    <VerticalFormHalf/>
                )}
                {pageType === 'list'
                && (
                    <AssetsList
                        onSubmit={this.nextPage}/>
                )}
                {pageType === 'write'
                && (
                    <AssetsWrite
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage}
                    />
                )}
                {pageType === 'edit'
                && (
                    <AssetsWrite
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage}
                    />
                )}

            </Row>
        );
    }
}
