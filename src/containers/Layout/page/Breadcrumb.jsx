import React, {useEffect} from 'react';
import {emphasize, makeStyles, withStyles} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Route, MemoryRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import Chip from "@material-ui/core/Chip";
import HomeIcon from '@material-ui/icons/Home';
// icon
import {Icon} from '@iconify/react';
import fileInvoiceDollar from '@iconify/icons-fa-solid/file-invoice-dollar';
import outlineDashboard from '@iconify/icons-ic/outline-dashboard';
import serverOutlineBadged from '@iconify/icons-clarity/server-outline-badged';
import routerNetwork from '@iconify/icons-mdi/router-network';
import monitorDashboard from '@iconify/icons-mdi/monitor-dashboard';
import usersIcon from '@iconify/icons-fa-solid/users';
import listAlt from '@iconify/icons-el/list-alt';
import thList from "@iconify/icons-fa-solid/th-list";
import gridChartSolid from "@iconify/icons-clarity/grid-chart-solid";
import monitorMultiple from "@iconify/icons-mdi/monitor-multiple";
import outlineRestore from "@iconify/icons-ic/outline-restore";
import cloudServerOutlined from '@iconify/icons-ant-design/cloud-server-outlined';
import {themes} from "../../../shared/helpers";
import {OPERATOR, SEPARATION_URL} from "../../../lib/var/globalVariable";

const StyledBreadcrumb = withStyles(theme => ({
    root: {
        backgroundColor: theme.palette.type === 'dark' ? themes.darkTheme.backgroundColor : theme.palette.grey[100],
        height: theme.spacing(3),
        color: theme.palette.type === 'dark' ? "darkgray" : "black",
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: 11,
        fontFamily: "Noto Sans KR Medium",
        '&:hover, &:focus': {
            backgroundColor: theme.palette.grey[300],
            color: theme.palette.type === 'dark' ? "black" : "white",
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            color: emphasize(theme.palette.grey[300], 0.12),
        },
    },
}))(Chip); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: 360,
        paddingBottom: 30,
    },
    lists: {
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(1),
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const USER_URL = {
    "dashboards/manager": {title: "관리자 대시보드", subTitle: null, icon: outlineDashboard},
    "dashboards/customer": {title: "사용자 대시보드", subTitle: null, icon: outlineDashboard},
    "micro/dashboard": {title: "사용자 대시보드", subTitle: null, icon: null},
    "micro/servers": {title: "SERVER", subTitle: null, icon: serverOutlineBadged},
    "micro/networks": {title: "NETWORK", subTitle: null, icon: routerNetwork},
    "micro/images": {title: "IMAGE", subTitle: null, icon: null},
    "micro/vms": {title: "VM INVENTORY", subTitle: null, icon: thList},
    "micro/vmsCard": {title: "VM CARD", subTitle: null, icon: gridChartSolid},
    "micro/vmsPage": {title: "VM VNC", subTitle: null, icon: monitorMultiple},
    "micro/vnc": {title: "VM VNC", subTitle: null, icon: monitorMultiple},
    "micro/snapshot": {title: "SNAPSHOT", subTitle: null, icon: outlineRestore},
    "assets/server": {title: "SERVER", subTitle: "온프레미스", icon: serverOutlineBadged},
    "assets/network": {title: "NETWORK", subTitle: "네트워크", icon: routerNetwork},
    "assets/part": {title: "NETWORK", subTitle: "파트 & 기타", icon: routerNetwork},
    billing: {title: "BILLING", subTitle: "", icon: fileInvoiceDollar},
    board: {title: "BOARD", subTitle: "", icon: listAlt},
    "customers/users": {title: "MANAGER", subTitle: "계정 관리", icon: usersIcon},
    "customers/companies": {title: "MANAGER", subTitle: "고객사 관리", icon: usersIcon},
    subnet: {title: "MANAGER", subTitle: "서브넷 관리", icon: usersIcon},
    setting: {title: "SETTING", subTitle: "", icon: monitorDashboard},
};

const MANAGER_URL = {
    "dashboards/manager": {title: "관리자 대시보드", subTitle: null, icon: outlineDashboard},
    "dashboards/customer": {title: "사용자 대시보드", subTitle: null, icon: outlineDashboard},
    "micro/dashboard": {title: "HYBRID CLOUD", subTitle: "DASHBOARD", icon: cloudServerOutlined},
    "micro/servers": {title: "HYBRID CLOUD", subTitle: "SERVER", icon: cloudServerOutlined},
    "micro/networks": {title: "HYBRID CLOUD", subTitle: "NETWORK", icon: cloudServerOutlined},
    "micro/images": {title: "HYBRID CLOUD", subTitle: "IMAGE", icon: cloudServerOutlined},
    "micro/vms": {title: "HYBRID CLOUD", subTitle: "VM", icon: cloudServerOutlined},
    "micro/vmsCard": {title: "HYBRID CLOUD", subTitle: "VM CARD", icon: cloudServerOutlined},
    "micro/vmsPage": {title: "HYBRID CLOUD", subTitle: "VM VNC", icon: cloudServerOutlined},
    "micro/vnc": {title: "HYBRID CLOUD", subTitle: "VNC", icon: cloudServerOutlined},
    "micro/snapshot": {title: "HYBRID CLOUD", subTitle: "SNAPSHOT", icon: cloudServerOutlined},
    "assets/server": {title: "SERVER", subTitle: "온프레미스", icon: serverOutlineBadged},
    "assets/network": {title: "NETWORK", subTitle: "네트워크", icon: routerNetwork},
    "assets/part": {title: "NETWORK", subTitle: "파트 & 기타", icon: routerNetwork},
    billing: {title: "BILLING", subTitle: "", icon: fileInvoiceDollar},
    board: {title: "BOARD", subTitle: "", icon: listAlt},
    "customers/users": {title: "MANAGER", subTitle: "계정 관리", icon: usersIcon},
    "customers/companies": {title: "MANAGER", subTitle: "고객사 관리", icon: usersIcon},
    subnet: {title: "MANAGER", subTitle: "서브넷 관리", icon: usersIcon},
    setting: {title: "SETTING", subTitle: "", icon: monitorDashboard},
};

const LinkRouter = props => <Link {...props} component={RouterLink} />;

export default function RouterBreadcrumbs(props) {
    const classes = useStyles();
    const {url} = props;
    // const handleClick = () => {
    //     setOpen(prevOpen => !prevOpen);
    // };

    const user = JSON.parse(localStorage.getItem("user"));
    const PAGE_URL = (user.level <= OPERATOR ? MANAGER_URL : USER_URL);

    const seperateUrl = (tmpUrl) => {
        let tmp = tmpUrl;
        tmp = tmp.replace(SEPARATION_URL, "");
        if (tmp && tmp.length > 1 && PAGE_URL[tmp]) {
            return tmp;
        }
        return null;
    };

    const getTitle = (tmpUrl) => {
        // console.log("■", tmpUrl, SEP_STRING);
        const tmp = seperateUrl(tmpUrl);
        if (tmp) {
            const pageTitle = PAGE_URL[tmp].title;
            return pageTitle;
        }
        return null;
    };

    const getSubTitle = (tmpUrl) => {
        const tmp = seperateUrl(tmpUrl);
        if (tmp) {
            const pageSubTitle = PAGE_URL[tmp].subTitle;
            return pageSubTitle;
        }
        return null;
    };

    const getIcon = (tmpUrl) => {
        const tmp = seperateUrl(tmpUrl);
        if (tmp) {
            const iconSet = PAGE_URL[tmp].icon;
            return iconSet;
        }
        return null;
    };

    useEffect(() => {
        if (url) {
            getTitle(url);
        }
    }, []);

    return (
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <div className={classes.root}>
                <Route>
                    {({ location }) => (
                        // const pathnames = location.pathname.split('/').filter(x => x);
                        <Breadcrumbs aria-label="breadcrumb">
                            {/*<StyledBreadcrumb href="/" label="HOME" icon={<HomeIcon fontSize="small"/>}/>*/}
                            {(url && getTitle(url) !== null)
                                ? (<StyledBreadcrumb icon={<Icon icon={getIcon(url)}/>} label={getTitle(url)} />)
                                : null
                            }
                            {(url && getSubTitle(url) !== null)
                                ? (<StyledBreadcrumb label={getSubTitle(url)} />)
                                : null
                            }
                        </Breadcrumbs>
                        )
                    }
                </Route>
            </div>
        </MemoryRouter>
    );
}
