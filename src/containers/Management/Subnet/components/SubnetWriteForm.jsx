import React, {useEffect, useState} from 'react';
import {
    Col, Row, Button, ButtonToolbar, Container,
} from 'reactstrap';
import IPut from "iput";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    Container: {
        alignItems: "center",
        "&:focus": {
            border: "2px solid black",
        },
    },
    Row: {
        alignItems: "center",
    },
    RowButton: {
        float: "right",
        alignItems: "center",
    },
    Col: {
        margin: "10px",
    },
    span: {
        fontWeight: "bold",
        fontSize: "20",
        padding: "0px 10px",
    },
    tag: {
        height: "30px",
        borderRadius: "0.25rem",
        border: "1px solid #c2c3c9",
        backgroundColor: "transparent",
        padding: "0px 10px",
        color: theme.palette.type === 'light' ? "#000000" : "#FFFFFF",
    },
    iput: {
        backgroundColor: "transparent",
        "&:focus-within": {
            outline: "black auto 1px",
        },
        "&.react-ip-input input": {
            backgroundColor: "transparent",
            color: theme.palette.type === 'light' ? "#000000" : "#FFFFFF",
        },
    },
}));

const SubnetWriteForm = (props) => {
    const classes = useStyles();
    const {
        pristine, submitting,
        subnetIdxValue, subnetStartValue, subnetEndValue,
        subnetTagValue, subnetMaskValue, gatewayValue,
        handleClose, handleSubmit, create,
    } = props;

    const [fields, setFields] = useState({
        idx: 0,
        subnetStart: '',
        subnetEnd: '',
        subnetTag: '',
        subnetMask: '',
        gateway: '',
    });
    
    const handleSubnetStart = (val) => {
        setFields({
            ...fields,
            subnetStart: val,
        });
    };

    const handleSubnetEnd = (val) => {
        setFields({
            ...fields,
            subnetEnd: val,
        });
    };

    const handleSubnetTag = (e) => {
        setFields({
            ...fields,
            subnetTag: e.target.value,
        });
    };

    const handleSubnetMask = (val) => {
        setFields({
            ...fields,
            subnetMask: val,
        });
    };

    const handleGateway = (val) => {
        setFields({
            ...fields,
            gateway: val,
        });
    };

    const handleCreate = (e) => {
        e.preventDefault();
        const subnet = ({
            idx: fields.idx,
            subnetTag: fields.subnetTag,
            subnetStart: fields.subnetStart,
            subnetEnd: fields.subnetEnd,
            subnetMask: fields.subnetMask,
            gateway: fields.gateway,
        });
        handleSubmit(subnet);
        handleClose();
    };

    const handleClickCancel = () => {
        handleClose();
    };

    useEffect(() => {
        setFields({
            ...fields,
            idx: subnetIdxValue,
            subnetStart: subnetStartValue,
            subnetEnd: subnetEndValue,
            subnetTag: subnetTagValue,
            subnetMask: subnetMaskValue,
            gateway: gatewayValue,
        });
    }, []);

    return (
        <Container className={classes.Container}>
            <Row className={classes.Row}>
                <Col md={3} className={classes.Col}>
                    <div className="form__form-group-label">SUBNET</div>
                </Col>
                <Col md={8} className={classes.Col}>
                    <div style={{display: "flex"}}>
                        <IPut
                            defaultValue={create ? " . . . " : subnetEndValue}
                            onChange={handleSubnetStart}
                            className={classes.iput}/>
                        <span className={classes.span}>~</span>
                        <IPut
                            defaultValue={create ? " . . . " : subnetEndValue}
                            onChange={handleSubnetEnd}
                            className={classes.iput}/>
                    </div>
                </Col>
            </Row>
            <hr size="80%" />
            <Row className={classes.Row}>
                <Col md={3} className={classes.Col}>
                    <span className="form__form-group-label">SUBNET 태그</span>
                </Col>
                <Col md={8} className={classes.Col}>
                    <input
                        value={fields && fields.subnetTag}
                        onChange={handleSubnetTag}
                        className={classes.tag} />
                </Col>
            </Row>
            <hr size="80%" />
            <Row className={classes.Row}>
                <Col md={3} className={classes.Col}>
                    <span className="form__form-group-label">SUBNET 마스크</span>
                </Col>
                <Col md={8} className={classes.Col}>
                    <IPut
                        defaultValue={create ? " . . . " : subnetMaskValue}
                        onChange={handleSubnetMask}
                        className={classes.iput}/>
                </Col>
            </Row>
            <hr size="80%" />
            <Row className={classes.Row}>
                <Col md={3} className={classes.Col}>
                    <span className="form__form-group-label">SUBNET 게이트웨이</span>
                </Col>
                <Col md={8} className={classes.Col}>
                    <IPut
                        defaultValue={create ? " . . . " : gatewayValue}
                        onChange={handleGateway}
                        className={classes.iput}/>
                </Col>
            </Row>
            <Row className={classes.RowButton}>
                {/*Button*/}
                <Col className={classes.Col}>
                <div className="form__form-group">
                    <ButtonToolbar className="form__button-toolbar-sub">
                        <Button color="primary"
                                disabled={!(fields.subnetStart && fields.subnetEnd && fields.subnetMask)
                                || pristine || submitting}
                                onClick={handleCreate}
                                type="submit">
                            {create ? "생성" : "수정"}
                        </Button>
                        <Button type="button"
                                // disabled={pristine || submitting}
                                onClick={handleClickCancel}>
                            취소
                        </Button>
                    </ButtonToolbar>
                </div>
                </Col>
            </Row>
        </Container>
    );
};

export default SubnetWriteForm;
