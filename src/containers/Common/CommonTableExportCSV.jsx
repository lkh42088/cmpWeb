import React from 'react';
import { CSVLink } from 'react-csv';
import GetAppIcon from '@material-ui/icons/GetApp';
import ReactTooltip from "react-tooltip";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
    tooltip: {
        fontSize: 7,
        fontWeight: "revert",
    },
}));

const CommonTableExportCSV = ({csvData, fileName, style}) => {
    const classes = useStyles();

    return (
        <CSVLink data={csvData} filename={fileName}>
            <IconButton type="button" data-tip data-for="tooltipDownload" style={style}>
                <GetAppIcon/>
            </IconButton>
            <ReactTooltip id="tooltipDownload" effect="float"
                          delayHide={100} type="dark" place="bottom"
                          className={classes.tooltip}>
                CSV 파일로 저장
            </ReactTooltip>
        </CSVLink>
    );
};

export default CommonTableExportCSV;
