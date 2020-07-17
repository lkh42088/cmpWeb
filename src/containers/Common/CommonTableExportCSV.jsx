import React from 'react';
import { CSVLink } from 'react-csv';
import GetAppIcon from '@material-ui/icons/GetApp';
import ReactTooltip from "react-tooltip";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    tooltip: {
        fontSize: 7,
        fontWeight: "revert",
    },
}));

const CommonTableExportCSV = ({csvData, fileName}) => {
    const classes = useStyles();

    return (
        <CSVLink data={csvData} filename={fileName} >
            <GetAppIcon fontSize="middle" data-tip data-for="tooltip"/>
            <ReactTooltip id="tooltip" effect="float"
                          delayHide={100} type="dark"
                          place="bottom"
                          className={classes.tooltip}
            >
                CSV 파일로 저장
            </ReactTooltip>
        </CSVLink>
    );
};

export default CommonTableExportCSV;
