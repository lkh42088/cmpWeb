import React, {useState} from "react";
import TableCell from "@material-ui/core/TableCell";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
    // Block to CSS, on case Internet Explorer Browser
    const isIE = /*@cc_on!@*/false || !!document.documentMode;
    if (!isIE) {
        return ({
            rowCss: {
                '& > *': {
                    borderBottom: 'unset',
                },
                "&:hover":
                    theme.palette.type === 'light'
                        ? {
                            boxShadow: "4px 2px 6px 1px #999999",
                            transition: "box-shadow 0.3s 0s",

                        }
                        : {
                            boxShadow: "5px 2px 10px 2px #000000",
                            transition: "box-shadow 0.3s 0s",
                        },
            },
            visuallyHidden: {
                border: 0,
                clip: 'rect(0 0 0 0)',
                height: 1,
                margin: -1,
                overflow: 'hidden',
                padding: 0,
                position: 'absolute',
                top: 20,
                width: 1,
            },
            spanSubject: {
                display: 'inline-block',
                width: '100px',
            },
            spanContents: {
                display: 'inline-block',
                // width: '200px',
            },
            grid: {
                flexGrow: 1,
            },
            margin: {
                margin: theme.spacing(1),
                width: 70,
                display: "flex",
            },
            pagination: {
                display: "inline-block",
                paddingTop: 20,
                paddingBottom: 20,
            },
            rect: {
                boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.09)",
            },
        });
    }
    return null;
});

const RECT_SIZE = 25;
const RECT_SPACE = 5;
const START_LOCATION = 34;

const SubnetContents = (props) => {
    const classes = useStyles();
    const {
        openCollapse, row,
    } = props;

    const CustomRect = (properties) => {
        const {
            width, height, x, y, text, id,
        } = properties;

        const textX = x + 4;
        const textY = y + 12;

        return (
            <g
                id={id} key={id}
            >
                <rect x={x} y={y} width={width} height={height} fill="#EDEDED"
                      title="" className={classes.rect}
                      data-container="body"/>
                <text x={textX} y={textY} dominantBaseline="middle"
                      fontSize="10" fill="#9A9A9A">{text}</text>
            </g>
        );
    };

    // eslint-disable-next-line consistent-return
    const MakeRectForm = (properties) => {
        const {
            startIp, endIp, index,
        } = properties;

        if (!startIp || !endIp) {
            return null;
        }
        const start = startIp.split('.');
        const end = endIp.split('.');
        let lastLocationX = 0;
        let lastLocationY = START_LOCATION;
        let count = 0;
        const rects = [];

            if (start[3] <= end[3]) {
                for (let i = Number(start[3]); i <= Number(end[3]); i += 1) {
                    lastLocationX += RECT_SIZE + RECT_SPACE;
                    if (count >= 32) {
                        lastLocationY += RECT_SIZE + RECT_SPACE;
                        lastLocationX = RECT_SIZE + RECT_SPACE;
                        count = 0;
                    }

                    rects.push(CustomRect({
                        width: RECT_SIZE,
                        height: RECT_SIZE,
                        x: lastLocationX,
                        y: lastLocationY,
                        text: i,
                        id: "customRect-".concat(String(index)).concat(`"-"${String(i)}`),
                    }));
                    count += 1;
                }
            }
        return rects;
    };

    return (
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
            <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                <Box margin={1}>
                    <Typography variant="h6" gutterBottom component="div">
                        {String(row.subnetStart).concat(" ~ ").concat(row.subnetEnd)}
                    </Typography>
                    <div className={classes.grid}>
                        <svg width="100%" height="303">
                            {MakeRectForm({
                                startIp: row.subnetStart,
                                endIp: row.subnetEnd,
                                index: row.idx,
                            })}
                        </svg>
                    </div>
                </Box>
            </Collapse>
        </TableCell>
    );
};

export default SubnetContents;
