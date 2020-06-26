import React, { PureComponent } from 'react';
import {
  Col, Container, Row, CardBody, Card,
} from 'reactstrap';
import { withTranslation } from 'react-i18next';
import {connect, useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import ServerOnPremise from './components/ServerOnPremise';
import NetworkOnPremise from './components/NetworkOnPremise';
import PublicNetwork from './components/PublicNetwork';
import RandomAnimatedBars from './components/RandomAnimatedBars';
import { deleteCryptoTableData } from '../../../redux/actions/cryptoTableActions';
import { CryptoTableProps } from '../../../shared/prop-types/TablesProps';
import { ThemeProps, RTLProps } from '../../../shared/prop-types/ReducerProps';
import CartCard from "../../ECommerce/Cart/components/CartCard";
import SubnetHeader from "../../Management/Subnet/CreateSubnet/components/SubnetHeader";
import CircleGraphCard from "./components/CircleGraphCard";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(1),
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
}));

const DashboardCustomor = (
    t, cryptoTable, theme,
) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {direction} = useSelector(({rtl}) => ({
        direction: rtl.direction,
    }));

    const onDeleteCryptoTableData = (index, e) => {
        e.preventDefault();
        const arrayCopy = [...cryptoTable];
        arrayCopy.splice(index, 1);
        dispatch(deleteCryptoTableData(arrayCopy));
    };

    return (
        // <Container>
        //     <Row>
        //         <Col md={12}>
        //             <SubnetHeader head="DASHBOARD" />
        //         </Col>
        //     </Row>
        //     <Row>
                <Grid container spacing={10}>
                    <Grid itme xs={4} >
                        <CircleGraphCard dir={direction} />
                    </Grid>
                    {/*<Grid item xs={4}>*/}
                    {/*    <ServerOnPremise dir={direction} />*/}
                    {/*</Grid>*/}
                    {/*<Grid item xs={4}>*/}
                    {/*    <NetworkOnPremise dir={direction} />*/}
                    {/*</Grid>*/}
                    {/*<Grid item xs={6}>*/}
                    {/*    <PublicNetwork />*/}
                    {/*</Grid>*/}
                    {/*<Grid item xs={6}>*/}
                    {/*    <RandomAnimatedBars />*/}
                    {/*</Grid>*/}
                </Grid>
        //     </Row>
        // </Container>
    );
};

DashboardCustomor.propTypes = {
  // t: PropTypes.func.isRequired,
  //cryptoTable: CryptoTableProps.isRequired,
  // dispatch: PropTypes.func.isRequired,
  // rtl: RTLProps.isRequired,
  // theme: ThemeProps.isRequired,
};

export default connect(state => ({
  cryptoTable: state.cryptoTable.items,
  rtl: state.rtl,
  theme: state.theme,
}))(withTranslation('common')(DashboardCustomor));
