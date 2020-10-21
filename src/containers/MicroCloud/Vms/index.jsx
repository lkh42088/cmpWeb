import React, {Fragment, useEffect, useState} from 'react';
import {SnackbarProvider} from "notistack";
import {Col, Container, Row} from 'reactstrap';
import {useSelector, useDispatch} from "react-redux";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

import * as common from "../../../lib/common";

import VmTable from "./components/VmTable";
import RouterBreadcrumbs from "../../Layout/page/Breadcrumb";
import VmPage from "./components/VmPage";
import VmCard from "./components/VmCard";
import VmInfo from "./components/VmInfo";

import {changeVmPage} from "../../../redux/actions/vmsActions";
import {getCompanies} from "../../../lib/api/company";
import {getMcServers, getMcVms} from "../../../lib/api/microCloud";

const MicroCloudVmTable = () => {
    const dispatch = useDispatch();
    const {data, page} = useSelector(({vmsRd}) => ({
        data: vmsRd.data,
        page: vmsRd.pageType,
    }));
    const user = JSON.parse(localStorage.getItem("user"));

    /*******************
     * Etc.
     *******************/
    const [pageType, setPageType] = useState("");
    const [companyList, setCompanyList] = useState([]);
    const [vmList, setVmList] = useState([]);
    const [schCompany, setSchCompany] = useState(user.cpName);
    const [schVm, setSchVm] = useState("");
    const [vmCom, setVmCom] = useState(<span className="cautionStyle">※ company를 선택하세요.</span>);

    const [vmFirstIndex, setVmFirstIndex] = useState("");

    /**************************************************************
     * Axios Function
     **************************************************************/
    const getCompanyList = async () => {
        try {
            const response = await getCompanies();
            setCompanyList(response.data);
        } catch (error) {
            setCompanyList([]);
        }
    };

    const getVmList = async (company) => {
        try {
            const response = await getMcVms({
                rows: 0,
                offset: 0,
                orderBy: '',
                order: 'desc',
                cpName: company,
            });

            const reData = response.data.data;
            const reDataCompany = reData.filter(item => item.cpName === user.cpName);

            setVmList(reData);

            if (reDataCompany.length > 0) {
                const temp = reDataCompany.slice(0, reDataCompany.length - (reDataCompany.length - 1));

                setVmFirstIndex(temp[0].idx);
                setSchVm(temp[0].idx);
                dispatch(changeVmPage({
                    pageType: 'page',
                    data: temp[0],
                }));
            }
        } catch (error) {
            setVmList([]);
        }
    };

    /**************************************************************
     * Handle Function
     **************************************************************/
    const handleChangeVm = (e) => {
        setSchVm(e.target.value);

        const res = vmList.filter(item => item.idx === e.target.value);
        dispatch(changeVmPage({
            pageType: 'page',
            data: res[0],
        }));
    };

    const handleChangeCompany = (e) => {
        setSchCompany(e.target.value);
        let tempContent;

        if (e.target.value) {
            const hasSubCode = vmList.some(d => (d.cpName === e.target.value));

            if (hasSubCode === true) {
                tempContent = (
                    <FormControl>
                        <InputLabel id="demo-simple-select-autowidth-label"
                                    style={{
                                        fontSize: "0.8rem",
                                    }}>vm</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            name="vm"
                            autoWidth
                            defaultValue={schVm}
                            onChange={handleChangeVm}
                            style={{
                                fontSize: "0.7rem",
                                minWidth: "100px",
                            }}
                        >
                            <MenuItem key="0" value="">
                                <em>:: SELECT ::</em>
                            </MenuItem>
                            {vmList && vmList
                                .map((item, index) => (item.cpName === e.target.value) && (
                                    // eslint-disable-next-line react/no-array-index-key
                                    <MenuItem key={index} value={item.idx}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                );
            } else {
                tempContent = <span className="cautionStyle">※ 연결된 VM이 없습니다.</span>;
                setSchVm("");
            }
        } else {
            tempContent = <span className="cautionStyle">※ company를 선택하세요.</span>;
            setSchVm("");
        }

        setVmCom(tempContent);
    };

    const handleAuthSelectDisplay = (val, flag) => {
        let topSelect;
        if (val) {
            const {level} = user;

            if (level < 5) {
                topSelect = (
                    <div>
                        <FormControl>
                            <InputLabel id="demo-simple-select-autowidth-label"
                                        style={{
                                            fontSize: "0.8rem",
                                        }}>company</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                name="company"
                                autoWidth
                                value={schCompany}
                                onChange={handleChangeCompany}
                                style={{
                                    fontSize: "0.7rem",
                                    minWidth: "100px",
                                }}
                            >
                                <MenuItem key="0" value="">
                                    <em>:: SELECT ::</em>
                                </MenuItem>
                                {companyList && companyList.map((item, index) => {
                                    const key = index;
                                    return (
                                        <MenuItem key={key} value={item.name}>
                                            {item.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>&nbsp;&nbsp;
                        </FormControl>&nbsp;&nbsp;
                        {vmCom}
                    </div>
                );
            } else if (level >= 5) {
                topSelect = (
                    <div>
                        <FormControl>
                            <InputLabel id="demo-simple-select-autowidth-label"
                                        style={{
                                            fontSize: "0.8rem",
                                        }}>vm</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                name="vm"
                                autoWidth
                                defaultValue={vmFirstIndex}
                                value={schVm || vmFirstIndex}
                                onChange={handleChangeVm}
                                style={{
                                    fontSize: "0.7rem",
                                    minWidth: "100px",
                                }}
                            >
                                <MenuItem key="0" value="">
                                    <em>:: SELECT ::</em>
                                </MenuItem>
                                {vmList && vmList
                                    .map((item, index) => (item.cpName === schCompany) && (
                                        // eslint-disable-next-line react/no-array-index-key
                                        <MenuItem key={index}
                                                  value={item.idx}
                                                  selected={index === 1 ? "selected" : ""}
                                        >
                                            {item.name}{/* : {item.idx}*/}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </div>
                );
            }
        }
        return topSelect;
    };

    /*const handleVmPage = (idx) => {
        const res = data.filter(item => item.idx === idx);
        console.log(`idx:${idx}, res:${res}`);
        dispatch(changeVmPage({ pageType: 'page', data: res[0]}));
    };*/

    /**************************************************************
     * useEffect
     **************************************************************/
    useEffect(() => {
        const tempPageType = common.assetsGetUrlMenu(window.location.href);
        if (tempPageType === "vmsCard") {
            dispatch(changeVmPage({
                pageType: 'card',
                data: null,
            }));
        } else if (tempPageType === "vmsPage") {
            dispatch(changeVmPage({
                pageType: 'page',
                data: null,
            }));
        }

        setPageType(tempPageType);

        if (page === 'page' && tempPageType === 'vmsPage') {
            getVmList("all");
        }
    }, [window.location.href]);

    useEffect(() => {
        getCompanyList();
        //getVmList("all");
    }, []);

    useEffect(() => {
        setSchVm("");
    }, [data]);

    useEffect(() => {
        setSchVm(schVm);
    }, [schVm]);

    return (
        <Container fluid>
            <Row>
                <RouterBreadcrumbs url={window.location.href}/>
                {pageType && pageType === 'vmsPage' ? (
                    <div style={{
                        margin: "-19px 0px 0px -240px",
                    }}>
                        <Breadcrumbs aria-label="breadcrumb">
                            {handleAuthSelectDisplay(user)}
                        </Breadcrumbs>
                    </div>
                ) : false}
            </Row>
            <Row>
                <SnackbarProvider maxSnack={3}>
                    {/*eslint-disable-next-line no-nested-ternary*/}
                    {page === 'card' ? <VmCard/> : false}
                    {page === 'list' ? <VmTable/> : false}
                    {page === 'page' ? <VmPage/> : false}
                    {page === 'info' ? <VmInfo/> : false}
                </SnackbarProvider>
            </Row>
        </Container>
    );
};

export default MicroCloudVmTable;
