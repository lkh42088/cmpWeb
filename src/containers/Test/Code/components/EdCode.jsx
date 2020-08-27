import React, {
    useEffect, useState, Fragment,
} from 'react';
import {
    Card, Col, CardBody, Container, Row, NavItem, NavLink,
} from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {Field, reduxForm} from "redux-form";

import {withTranslation} from "react-i18next";
import ReactTooltip from "react-tooltip";

import {makeStyles} from '@material-ui/core/styles';
import MatButton from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import * as common from "../../../../lib/common";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    iconAdd: {
        margin: "0 10px 0 0",
        padding: "0",
    },
}));

const EdCode = (props) => {
    const {
        handleSubmit,
    } = props;
    const classNameMap = {
        rowFormItem: "row form-infor__item",
        itemContainer: "item-container-half",
        formInforLabel: "form-infor__label",
        formControlValue: "form-control-value",
        textareaPreCont: "textarea-prefix form-control",
    };
    const classes = useStyles();
    const dispatch = useDispatch();
    const {
        edMainCode, edSubCode, mainCodeTag, edDivision,
    } = useSelector(({codeRd}) => ({
        edMainCode: codeRd.edMainCode,
        edSubCode: codeRd.edSubCode,
        mainCodeTag: codeRd.mainCodeTag,
        edDivision: codeRd.edDivision,
    }));

    const [fields, setFields] = useState({
        name: '',
        order: 0,
        type: '',
    });

   /* setFields({
        name: '',
        order: 0,
        type: '',
    });*/

    const handleSubmitInternal = () => {
        handleSubmit(fields);
    };

    /*******************
     * Change
     *******************/
    const handleChangeField = (name, value) => {
        setFields({
            ...fields,
            [name]: value,
        });
    };
    //console.log("edMainCode : ", edMainCode);

    return (
        <Container>
            <Card>
                <CardBody>
                    <form className="modal_form modal_form--horizontal" onSubmit={handleSubmit}>
                        <div className="form-infor" style={{
                            border: "none",
                        }}>
                            <div className="row modal_form__form-group">
                                <div className="col-md-3">
                                    <div className={classNameMap.rowFormItem}>
                                        <div className={classNameMap.itemContainer}>
                                            <div className={classNameMap.formInforLabel}>분류</div>
                                        </div>
                                        <div className="col-lg-8 col-md-12">
                                            <Field
                                                name="type"
                                                component="select"
                                                className="select_col_10"
                                                onChange={(e) => {
                                                    handleChangeField("type", e.target.value);
                                                }}
                                            >
                                                {/* <option value="0">:: SELECT ::</option>
                                                {mainCodeTag
                                                    .map((d, index) => (
                                                        <option key={d.type.toString()}
                                                                value={d.type}>{d.name}</option>
                                                    ))}*/}
                                                {mainCodeTag && mainCodeTag.map((row, index) => {
                                                    let navLinkTitle = "";

                                                    switch (row.type) {
                                                        case "total":
                                                            navLinkTitle = "공통";
                                                            break;
                                                        case "device_server":
                                                            navLinkTitle = "서버";
                                                            break;
                                                        case "device_network":
                                                            navLinkTitle = "네트워크";
                                                            break;
                                                        case "device_part":
                                                            navLinkTitle = "파트/기타";
                                                            break;
                                                        default:
                                                            break;
                                                    }

                                                    return (
                                                        <option
                                                                key={`${row.type}|${navLinkTitle}`}
                                                                value={row.type}>{navLinkTitle}</option>
                                                    );
                                                })}
                                            </Field>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className={classNameMap.rowFormItem}>
                                        <div className={classNameMap.itemContainer}>
                                            <div className={classNameMap.formInforLabel}>ITEM</div>
                                        </div>
                                        <div className="col-lg-8 col-md-12">
                                            <Field
                                                name="name"
                                                component="input"
                                                className="input_col_10"
                                                type="text"
                                                placeholder="ITEM"
                                                onChange={(e) => {
                                                    handleChangeField("name", e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className={classNameMap.rowFormItem}>
                                        <div className={classNameMap.itemContainer}>
                                            <div className={classNameMap.formInforLabel}>순서</div>
                                        </div>
                                        <div className="col-lg-5 col-md-12">
                                            <Field
                                                name="order"
                                                component="input"
                                                className="input_col_10"
                                                type="number"
                                                placeholder=""
                                                onChange={(e) => {
                                                    handleChangeField("order", e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className={classNameMap.rowFormItem}>
                                        <div>
                                            {/*<MatButton
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                className={classes.button}
                                                startIcon={<SendIcon/>}
                                            >
                                                Save
                                            </MatButton>*/}
                                            {edDivision.division === 'add' ? (
                                                <Fragment>
                                                    <IconButton type="button"
                                                                data-tip data-for="tooltipAdd"
                                                                onClick={handleSubmitInternal}
                                                                className={classes.iconAdd}>
                                                        <AddIcon/>
                                                    </IconButton>
                                                    <ReactTooltip id="tooltipAdd" effect="float"
                                                                  delayHide={100} type="dark" place="bottom"
                                                                  className={classes.tooltip}>
                                                        추가
                                                    </ReactTooltip>
                                                </Fragment>
                                            ) : (
                                                <Fragment>
                                                    <IconButton type="button"
                                                                data-tip data-for="tooltipEdit"
                                                                className={classes.iconAdd}>
                                                        <EditIcon/>
                                                    </IconButton>
                                                    <ReactTooltip id="tooltipEdit" effect="float"
                                                                  delayHide={100} type="dark" place="bottom"
                                                                  className={classes.tooltip}>
                                                        수정
                                                    </ReactTooltip>
                                                    <IconButton type="button"
                                                                data-tip data-for="tooltipDelete"
                                                                className={classes.iconAdd}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                    <ReactTooltip id="tooltipDelete" effect="float"
                                                                  delayHide={100} type="dark" place="bottom"
                                                                  className={classes.tooltip}>
                                                        삭제
                                                    </ReactTooltip>
                                                </Fragment>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </Container>
    );
};

export default reduxForm({
    form: 'EdCodeForm', // a unique identifier for this form
})(withTranslation('common')(EdCode));
