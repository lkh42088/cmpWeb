import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import {IconButton} from "@material-ui/core";
import BuildIcon from "@material-ui/icons/Build";
import ReactTooltip from "react-tooltip";
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
        });
    }
    return null;
});

const SubnetContents = (props) => {
    const {
        openCollapse, row,
    } = props;
    const classes = useStyles();

    return (
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                        <Typography variant="h6" gutterBottom component="div">
                            {row.userId}
                        </Typography>
                        <div className={classes.grid}>
                            {/*<Grid container spacing={1}>*/}
                            {/*    <Grid item xs={12} sm={6}>*/}
                            {/*        <ul>*/}
                            {/*            <li>*/}
                            {/*                <span className={classes.spanSubject}> 소속회사 </span>*/}
                            {/*                <span className={classes.spanContents}> {row.cpName} </span>*/}
                            {/*            </li>*/}
                            {/*            <li>*/}
                            {/*                <span className={classes.spanSubject}> ID </span>*/}
                            {/*                <span className={classes.spanContents}> {row.userId} </span>*/}
                            {/*            </li>*/}
                            {/*            <li>*/}
                            {/*                <span className={classes.spanSubject}> 이름 </span>*/}
                            {/*                <span className={classes.spanContents}> {row.name} </span>*/}
                            {/*            </li>*/}
                            {/*            <li>*/}
                            {/*                <span className={classes.spanSubject}> 전화번호 </span>*/}
                            {/*                <span className={classes.spanContents}> {row.hp === "" ? "-" : row.hp} </span>*/}
                            {/*            </li>*/}
                            {/*            <li>*/}
                            {/*                <span className={classes.spanSubject}> 이메일 </span>*/}
                            {/*                <span className={classes.spanContents}> {row.email === "" ? "-" : row.email} </span>*/}
                            {/*            </li>*/}
                            {/*        </ul>*/}
                            {/*    </Grid>*/}
                            {/*    <Grid item xs={12} sm={6}>*/}
                            {/*        <ul>*/}
                            {/*            <li>*/}
                            {/*                <span className={classes.spanSubject}> 권한 </span>*/}
                            {/*                /!*<span className={classes.spanContents}> {row.zipcode},&nbsp;{row.address},&nbsp;{row.addressDetail} </span>*!/*/}
                            {/*                <span className={classes.spanContents}> {row.authLevel} </span>*/}
                            {/*            </li>*/}
                            {/*            <li>*/}
                            {/*                <span className={classes.spanSubject}> 주소 </span>*/}
                            {/*                /!*<span className={classes.spanContents}> {row.zipcode},&nbsp;{row.address},&nbsp;{row.addressDetail} </span>*!/*/}
                            {/*                <span className={classes.spanContents}> {address} </span>*/}
                            {/*            </li>*/}
                            {/*            <li>*/}
                            {/*                <span className={classes.spanSubject}> 등록일 </span>*/}
                            {/*                <span className={classes.spanContents}> {moment(row.registerDate).format('YYYY-MM-DD')} </span>*/}
                            {/*            </li>*/}
                            {/*            <li>*/}
                            {/*                <span className={classes.spanSubject}> 인증 </span>*/}
                            {/*                <span className={classes.spanContents}>*/}
                            {/*                    /!* eslint-disable-next-line no-nested-ternary *!/*/}
                            {/*                    {row.emailAuth === true ? "개인 이메일 인증" : (row.groupEmailAuth === true ? "그룹 이메일 인증" : "사용 안함")}*/}
                            {/*                </span>*/}
                            {/*            </li>*/}
                            {/*        </ul>*/}
                            {/*    </Grid>*/}
                            {/*    <Grid item xs={12} sm={6}>*/}
                            {/*        {*/}
                            {/*            row.groupEmailAuth && row.groupEmailAuthList ? (*/}
                            {/*                <React.Fragment>*/}
                            {/*                    <span className={classes.spanContents}>*/}
                            {/*                        <GroupIcon/> 이메일 인증 그룹 </span>*/}
                            {/*                    <ul>*/}
                            {/*                        {row.groupEmailAuthList.map(auth => (*/}
                            {/*                            <li key={auth.idx}>*/}
                            {/*                            <span className={classes.spanContents}>*/}
                            {/*                                {auth.AuthUserId}/{auth.AuthEmail}</span>*/}
                            {/*                            </li>*/}
                            {/*                        ))}*/}
                            {/*                    </ul>*/}
                            {/*                </React.Fragment>*/}
                            {/*            ) : <React.Fragment/>*/}
                            {/*        }*/}
                            {/*    </Grid>*/}
                            {/*    <Grid item xs={12} sm={6}>*/}
                            {/*        {*/}
                            {/*            row.participateInAccountList && row.participateInAccountList.length > 0 ? (*/}
                            {/*                <React.Fragment>*/}
                            {/*                    <span className={classes.spanContents}>*/}
                            {/*                        <AccountCircleIcon/> 사용하는 이메일 인증 계정 </span>*/}
                            {/*                    <ul>*/}
                            {/*                        {row.participateInAccountList.map(paccount => (*/}
                            {/*                            <li key={paccount.idx}>*/}
                            {/*                                <span className={classes.spanContents}>{paccount.UserId}</span>*/}
                            {/*                            </li>*/}
                            {/*                        ))}*/}
                            {/*                    </ul>*/}
                            {/*                </React.Fragment>*/}
                            {/*            ) : <React.Fragment/>*/}
                            {/*        }*/}
                            {/*    </Grid>*/}
                            {/*</Grid>*/}
                        </div>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    );
};

export default SubnetContents;
