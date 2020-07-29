import axios from 'axios';
import React from "react";
import {Map} from "immutable";

import API_ROUTE from "../../shared/apiRoute";

export const GET_DEVICES = 'GET_DEVICES';
export const GET_DEVICES_CHECKCOUNT = 'GET_DEVICES_CHECKCOUNT';
export const GET_DEVICE_BY_DEVICECODE = 'GET_DEVICE_BY_DEVICECODE';
export const GET_DEVICE_ORI_BY_DEVICECODE = 'GET_DEVICE_ORI_BY_DEVICECODE';
export const GET_COMMENTS_BY_DEVICECODE = 'GET_COMMENTS_BY_DEVICECODE';
export const GET_CODES = 'GET_CODES';
export const GET_SUBCODES = 'GET_SUBCODES';
export const GET_COMPANIES = 'GET_COMPANIES';
export const GET_DEVICES_SEARCH = 'GET_DEVICES_SEARCH';

export const SET_DEVICE_DEVICECODE = 'SET_DEVICE_DEVICECODE';
export const SET_COMMENT = 'SET_COMMENT';
export const SET_STATUS = 'SET_STATUS';
export const SET_ADD_ELE_IP_DATA = 'SET_ADD_ELE_IP_DATA';
export const SET_ADD_ELE_SPLA_DATA = 'SET_ADD_ELE_SPLA_DATA';
export const SET_DEVICE_SELECTED = 'SET_DEVICE_SELECTED';
export const SET_DEVICE_OUTFLAG = 'SET_DEVICE_OUTFLAG';
export const SET_DEVICE_TYPE = 'SET_DEVICE_TYPE';
export const SET_DEVICE_SEARCH = 'SET_DEVICE_SEARCH';
export const SET_DEVICE_OUTFLAG_OPERATING = 'SET_DEVICE_OUTFLAG_OPERATING';
export const SET_DEVICE_OUTFLAG_CARRYING = 'SET_DEVICE_OUTFLAG_CARRYING';
export const SET_API_PAGE = 'SET_API_PAGE';
export const SET_ASSETS_PAGE = 'SET_ASSETS_PAGE';
export const SET_DEVICE_LOG = 'SET_DEVICE_LOG';
export const SET_DEVICE_STATISTICS = 'SET_DEVICE_STATISTICS';
export const SET_DEVICE_MENU_URL = 'SET_DEVICE_MENU_URL';
export const SET_DEVICE_SEARCH_DIVISION = 'SET_DEVICE_SEARCH_DIVISION';

// const API_ROUTE = 'http://127.0.0.1:8081/v1';
// order direction
// 0 : ASC
// 1 : DESC

function checkOrder(val) {
    if (typeof val === 'undefined' || val === 'asc') {
        val = 1;
    } else if (val === 'desc') {
        val = 0;
    }
    return val;
}

function setCodeMap(val, codeType, subType) {
    return val.map(d => d.type === codeType && d.subType === subType
        && ({
            codeId: d.codeId,
            name: d.name,
            order: d.order,
            subType: d.subType,
            type: d.type,
        }))
        .filter(d => d !== false);
}

/**
 ****************************************************************************************
 **/

export const setState = dispatchVal => async (dispatch) => {
    dispatch({
        type: SET_STATUS,
        payload: dispatchVal,
    });
};

export const getCodes = dispatchVal => async (dispatch) => {
    try {
        console.log("💎 getCodes start : ", dispatchVal.deviceMenuUrl);
        const Codes = await axios.get(`${API_ROUTE}/codes`);
        const SubCodes = await axios.get(`${API_ROUTE}/subcodes`);
        const codeType = `device_${dispatchVal.deviceMenuUrl}`;

        const DeviceType = setCodeMap(Codes.data, codeType, 'device_type_cd');
        const Manufacture = setCodeMap(Codes.data, codeType, 'manufacture_cd');
        const Ownership = setCodeMap(Codes.data, 'total', 'ownership_cd');
        const OwnershipDiv = setCodeMap(Codes.data, 'total', 'ownership_div_cd');
        const Idc = setCodeMap(Codes.data, 'total', 'idc_cd');
        const Size = setCodeMap(Codes.data, 'total', 'size_cd');
        const Spla = setCodeMap(Codes.data, 'total', 'spla_cd');
        const Customer = setCodeMap(Codes.data, 'total', 'customer_cd');
        const RackCode = setCodeMap(Codes.data, 'total', 'rack_code_cd');

        const submitData = ({
            DeviceType,
            Manufacture,
            Ownership,
            OwnershipDiv,
            Idc,
            Size,
            Spla,
            Customer,
            RackCode,
        });

        dispatch({
            type: GET_CODES,
            payload: submitData,
        });

        dispatch({
            type: GET_SUBCODES,
            payload: SubCodes,
        });
    } catch (error) {
        console.log("try getCodes error : ", error);
    }
};

// first dispatch
export const fetchPosts = assetState => async (dispatch) => {
    try {
        console.log("💎 fetchPosts start : ", assetState.deviceMenuUrl);

        const deviceTypeData = assetState.deviceMenuUrl;
        //const outFlag = assetState.deviceOutFlag;
        const order = checkOrder(assetState.apiPageRd.order);

        const url = `${API_ROUTE}/search/devices/${assetState.deviceMenuUrl}/${assetState.apiPageRd.rowsPerPage}/${assetState.apiPageRd.showPage}/${assetState.apiPageRd.orderBy}/${order}/${assetState.apiPageRd.offsetPage}`;
        const cntUrl = `${API_ROUTE}/search/count/devices/${assetState.deviceMenuUrl}`;

        const postJsonData = JSON.stringify(assetState.searchRd);

        axios({
            method: 'post',
            url: cntUrl,
            data: postJsonData,
        })
            .then((response) => {
                dispatch({
                    type: SET_DEVICE_STATISTICS,
                    payload: response.data,
                });
            })
            .catch((error) => {
                console.log('fetchPosts axios error : ', error.response);
            });

        axios({
            method: 'post',
            url,
            data: postJsonData,
        })
            .then((response) => {
                const dispatchVal = ({
                    deviceType: assetState.deviceMenuUrl,
                    orderBy: assetState.apiPageRd.orderBy,
                    order,
                    rowsPerPage: assetState.apiPageRd.rowsPerPage,
                    showPage: assetState.page.page,
                    outFlag: assetState.deviceOutFlag,
                    offsetPage: assetState.apiPageRd.offsetPage,
                });

                dispatch({
                    type: GET_DEVICES,
                    payload: response.data,
                    deviceType: deviceTypeData,
                    page: 0,
                });

                dispatch({
                    type: SET_API_PAGE,
                    payload: dispatchVal,
                });
            })
            .catch((error) => {
                console.log('fetchPosts error : ', error.response);
            });
    } catch (error) {
        dispatch({
            type: GET_DEVICES,
            payload: undefined,
            deviceType: 'server',
            page: 0,
        });
        console.log("try deviceStatistics error : ", error);
    }
};

export const fetchPostsCheckCount = (assetState, dispatchVal) => async (dispatch) => {
    try {
        console.log("💎 fetchPostsCheckCount start : ", dispatchVal.offsetPage);
        const order = checkOrder(dispatchVal.order);
        //const offsetPage = (dispatchVal.rowsPerPage * (dispatchVal.showPage - 1));
        const url = `${API_ROUTE}/search/devices/${dispatchVal.deviceType}/${dispatchVal.rowsPerPage}/${dispatchVal.showPage}/${dispatchVal.orderBy}/${order}/${dispatchVal.offsetPage}`;

        const postJsonData = JSON.stringify(assetState.searchRd);

        axios({
            method: 'post',
            url,
            data: postJsonData,
        })
            .then((response) => {
                dispatch({
                    type: GET_DEVICES_CHECKCOUNT,
                    payload: response.data,
                    deviceType: dispatchVal.deviceType,
                    page: dispatchVal.showPage,
                });
                dispatch({
                    type: SET_API_PAGE,
                    payload: dispatchVal,
                });
            })
            .catch((error) => {
                console.log('fetchPostsCheckCount axios error : ', error.response);
            });
    } catch (error) {
        dispatch({
            type: GET_DEVICES_CHECKCOUNT,
            payload: undefined,
            deviceType: 'server',
            page: 0,
        });
        console.log("try fetchPostsCheckCount error : ", error);
    }
};

// list search dispatch
export const fetchPostSearchDevice = (assetState, dispatchVal) => async (dispatch) => {
    try {
        console.log("💎 fetchPostSearchDevice start : ", dispatchVal);
        const tempCustomer = [];
        let postJsonData = JSON.stringify(dispatchVal);
        const orderBy = 'DeviceCode';
        const order = 1;
        const {rowsPerPage} = assetState.apiPageRd;
        const offsetPage = 0;

        // v1/search/devices/:type/:outFlag/:row/:page/:order/:dir/:offsetPage
        const url = `${API_ROUTE}/search/devices/${assetState.deviceMenuUrl}/${rowsPerPage}/1/${orderBy}/${order}/${offsetPage}`;
        const cntUrl = `${API_ROUTE}/search/count/devices/${assetState.deviceMenuUrl}`;

        if (dispatchVal.customer !== '' && dispatchVal.customer !== undefined) {
            axios({
                url: `${API_ROUTE}/companies/${dispatchVal.customer}`,
                method: 'get',
            })
                .then((response) => {
                    response.data
                        // eslint-disable-next-line no-return-assign
                        .map(c => (
                            /*tempCustomer = `${tempCustomer},${c.userId}`*/
                            tempCustomer.push(`'${c.cpUserId}'`)
                        ));

                    dispatchVal = ({
                        ...dispatchVal,
                        customer: tempCustomer.toString(),
                    });
                    dispatch({
                        type: SET_DEVICE_SEARCH,
                        payload: dispatchVal,
                    });

                    postJsonData = JSON.stringify(dispatchVal);

                    if (response.data.length > 0) {
                        axios({
                            method: 'post',
                            url,
                            data: postJsonData,
                        })
                            .then((responseSearch) => {
                                dispatch({
                                    type: GET_DEVICES_CHECKCOUNT,
                                    payload: responseSearch.data,
                                    deviceType: assetState.deviceMenuUrl,
                                    page: responseSearch.data,
                                });
                            })
                            .catch((error) => {
                                console.log('fetchPostSearchDevice axios error : ', error.response);
                            });
                    }
                })
                .catch((error) => {
                    console.log('fetchPostSearchDevice axios error : ', error.response);
                });
        } else { // 그 외
            axios({
                method: 'post',
                url,
                data: postJsonData,
            })
                .then((responseSearch) => {
                    dispatch({
                        type: GET_DEVICES_CHECKCOUNT,
                        payload: responseSearch.data,
                        deviceType: assetState.deviceMenuUrl,
                        page: responseSearch.data,
                    });

                    dispatch({
                        type: SET_DEVICE_SEARCH,
                        payload: dispatchVal,
                    });
                })
                .catch((error) => {
                    console.log('fetchPostSearchDevice error : ', error.response);
                });
        }

        axios({
            method: 'post',
            url: cntUrl,
            data: postJsonData,
        })
            .then((response) => {
                dispatch({
                    type: SET_DEVICE_STATISTICS,
                    payload: response.data,
                });
            })
            .catch((error) => {
                console.log('deviceStatistics error : ', error.response);
            });
    } catch (error) {
        console.log("try fetchPostSearchDevice error : ", error);
    }
};

// 특정 장비 가져오기
export const getDeviceByIdx = (deviceCode, deviceType) => async (dispatch) => {
    try {
        console.log("💎 getDeviceByIdx start : ", `${API_ROUTE}/device/${deviceType}/${deviceCode}`);

        dispatch({
            type: SET_DEVICE_DEVICECODE,
            payload: deviceCode,
        });

        const res = await axios.get(`${API_ROUTE}/device/${deviceType}/${deviceCode}`);
        const comments = await axios.get(`${API_ROUTE}/comments/${deviceCode}`);
        const logs = await axios.get(`${API_ROUTE}/logs/${deviceCode}`);

        dispatch({
            type: GET_DEVICE_BY_DEVICECODE,
            payload: res.data,
        });

        dispatch({
            type: SET_COMMENT,
            payload: comments.data,
        });

        dispatch({
            type: SET_DEVICE_LOG,
            payload: logs.data,
        });
    } catch (error) {
        dispatch({
            type: SET_DEVICE_DEVICECODE,
            payload: undefined,
        });
        dispatch({
            type: GET_DEVICE_BY_DEVICECODE,
            payload: undefined,
        });
        console.log("try getDeviceByIdx error : ", error);
    }
};

// 특정 장비 ori 가져오기 (수정 시 사용)
export const getDeviceOriByIdx = (deviceCode, deviceType) => async (dispatch) => {
    try {
        // API_ROUTE/raw/device/$(type)/$(deviceCode)
        console.log("💎 getDeviceOriByIdx start : ", deviceCode, deviceType);
        const res = await axios.get(`${API_ROUTE}/raw/device/${deviceType}/${deviceCode}`);

        let deviceIpArray = new Map();
        let deviceSplaArray = new Map();

        const jsonData = res.data[0];

        let IpArray = '';
        let SplaArray = '';
        let ipCheckCount = 0;
        let splaCheckCount = 0;

        if (jsonData !== undefined) {
            switch (deviceType) {
                case 'server':
                    IpArray = jsonData.ip.split("|");
                    // eslint-disable-next-line no-loop-func,no-return-assign
                    IpArray.map(d => (
                        d !== undefined && d !== "" && (
                            deviceIpArray = deviceIpArray.set(`ip_${ipCheckCount}`, d),
                                ipCheckCount += 1
                        )));

                    dispatch({
                        type: SET_ADD_ELE_IP_DATA,
                        payload: JSON.parse(JSON.stringify(deviceIpArray)),
                    });

                    SplaArray = jsonData.spla.split("|");
                    // eslint-disable-next-line no-loop-func,no-return-assign
                    SplaArray.map(d => (
                        d !== undefined && d !== "" && (
                            deviceSplaArray = deviceSplaArray.set(`spla_${splaCheckCount}`, d),
                                splaCheckCount += 1
                        )));

                    dispatch({
                        type: SET_ADD_ELE_SPLA_DATA,
                        payload: JSON.parse(JSON.stringify(deviceSplaArray)),
                    });

                    break;
                case 'network':
                    IpArray = jsonData.ip.split("|");
                    // eslint-disable-next-line no-loop-func,no-return-assign
                    IpArray.map(d => (
                        d !== undefined && d !== "" && (
                            deviceIpArray = deviceIpArray.set(`ip_${ipCheckCount}`, d),
                                ipCheckCount += 1
                        )));

                    dispatch({
                        type: SET_ADD_ELE_IP_DATA,
                        payload: JSON.parse(JSON.stringify(deviceIpArray)),
                    });

                    dispatch({
                        type: SET_ADD_ELE_SPLA_DATA,
                        payload: '',
                    });
                    break;
                case 'part':
                    dispatch({
                        type: SET_ADD_ELE_IP_DATA,
                        payload: '',
                    });

                    dispatch({
                        type: SET_ADD_ELE_SPLA_DATA,
                        payload: '',
                    });
                    break;
                default:
                    break;
            }
        }

        dispatch({
            type: GET_DEVICE_ORI_BY_DEVICECODE,
            payload: jsonData,
        });

        dispatch({
            type: SET_DEVICE_SELECTED,
            payload: {},
        });
    } catch (error) {
        console.log("try getDeviceOriByIdx error : ", error);
    }
};

// 고객사 name 명으로 검색하기
export const getCompanyByName = dispatchVal => async (dispatch) => {
    // API_ROUTE/companies/:name
    // GET_COMPANIES
    try {
        console.log("💎 getCompanyByName start...");

        const res = await axios.get(`${API_ROUTE}/companies/${dispatchVal}`);

        dispatch({
            type: GET_COMPANIES,
            payload: res.data,
        });
    } catch (error) {
        console.log("try getCompanyByName error : ", error);
    }
};

// 장비 댓글 list 가져오기
export const getDeviceCommentByDeviceCode = assetState => async (dispatch) => {
    try {
        console.log("💎 getDeviceCommentByDeviceCode start");
        //API_ROUTE/device/comments/${deviceCode}/${type}
        const comments = await axios.get(`${API_ROUTE}/comments/${assetState.deviceByDeviceCode}`);

        const stateVal = ({
            page: 'view',
            type: 'comment',
            division: assetState.stateVal.division,
            state: 'finish',
        });
        dispatch({
            type: SET_STATUS,
            payload: stateVal,
        });
        dispatch({
            type: SET_COMMENT,
            payload: comments.data,
        });
    } catch (error) {
        dispatch({
            type: SET_COMMENT,
            comment: undefined,
        });
        console.log("try getDeviceCommentByDeviceCode error : ", error);
    }
};

// 장비 cud
export const postDevice = (division, assetState, submitData, pageType) => async (dispatch) => {
    try {
        console.log("💎 postDevice start");
        let method = '';
        //"API_ROUTE/device/create/$(type)/"
        let url = `${API_ROUTE}/device/${division}/${assetState.deviceMenuUrl}`;
        switch (division) {
            case 'create':
                method = 'post';
                break;
            case 'update':
                method = 'put';
                url = `${API_ROUTE}/device/${division}/${assetState.deviceMenuUrl}/${submitData.deviceCode}`;
                break;
            case 'delete':
                method = 'delete';
                url = `${API_ROUTE}/device/${division}/${assetState.deviceMenuUrl}/${submitData.idx}`;
                break;
            default:
                break;
        }
        const postJsonData = JSON.stringify(submitData);

        axios({
            method,
            url,
            data: postJsonData,
        })
            .then((responseDevice) => {
                const stateVal = ({
                    page: pageType,
                    type: 'device',
                    division,
                    state: 'success',
                });

                dispatch({
                    type: SET_STATUS,
                    payload: stateVal,
                });
            })
            .catch((error) => {
                console.log('postDevice error : ', error.response);
                const stateVal = ({
                    page: pageType,
                    type: 'device',
                    division,
                    state: 'error',
                });

                dispatch({
                    type: SET_STATUS,
                    payload: stateVal,
                });
            });
    } catch (error) {
        console.log("try postDevice error : ", error);
    }
};


// 장비 댓글 cud
export const postDeviceComment = (division, assetState, submitData, pageType) => async (dispatch) => {
    try {
        console.log("💎 postDeviceComment start");
        let method = '';
        let url = `${API_ROUTE}/comment/${division}`;
        switch (division) {
            case 'create':
                method = 'post';
                break;
            case 'update':
                method = 'put';
                break;
            case 'delete':
                method = 'delete';
                url = `${API_ROUTE}/comment/${division}/${submitData.registerId}/${submitData.idx}`;
                break;
            default:
                break;
        }

        const postJsonData = JSON.stringify(submitData);
        axios({
            method,
            url,
            data: postJsonData,
        })
            .then((response) => {
                const stateVal = ({
                    page: pageType,
                    type: 'comment',
                    division,
                    state: 'success',
                });
                dispatch({
                    type: SET_STATUS,
                    payload: stateVal,
                });
            })
            .catch((error) => {
                console.log('postDeviceComment error : ', error.response);
                const stateVal = ({
                    page: pageType,
                    type: 'comment',
                    division,
                    state: 'error',
                });

                dispatch({
                    type: SET_STATUS,
                    payload: stateVal,
                });
            });
    } catch (error) {
        const stateVal = ({
            page: pageType,
            type: 'comment',
            division,
            state: 'error',
        });

        dispatch({
            type: SET_STATUS,
            payload: stateVal,
        });
        console.log("try postDeviceComment error : ", error);
    }
};

// 장비 반입/반출 update
export const postDeviceOutFlag = (assetState, dispatchVal, pageType) => async (dispatch) => {
    try {
        const method = 'put';
        const url = `${API_ROUTE}/devices/update/${assetState.deviceMenuUrl}`;
        const postJsonData = JSON.stringify(dispatchVal);

        axios({
            method,
            url,
            data: postJsonData,
        })
            .then((response) => {
                const stateVal = ({
                    page: pageType,
                    type: 'device',
                    division: 'outFlag',
                    state: 'success',
                });
                dispatch({
                    type: SET_STATUS,
                    payload: stateVal,
                });
            })
            .catch((error) => {
                console.log('submitDeviceOutFlag error : ', error.response);
                const stateVal = ({
                    page: pageType,
                    type: 'device',
                    division: 'outFlag',
                    state: 'error',
                });

                dispatch({
                    type: SET_STATUS,
                    payload: stateVal,
                });
            });
    } catch (error) {
        console.log("try submitDeviceOutFlag error : ", error);
    }
};

// 수정 시 ip, spal 저장
export const setAddEleData = (type, value) => async (dispatch) => {
    try {
        console.log("💎 setAddEleData start"); //SET_ADD_ELE_IP_DATA

        let dispatchType = '';

        if (type === 'ip') {
            dispatchType = SET_ADD_ELE_IP_DATA;
        } else if (type === 'spla') {
            dispatchType = SET_ADD_ELE_SPLA_DATA;
        }

        dispatch({
            type: dispatchType,
            payload: value,
        });
    } catch (error) {
        console.log("try setAddEleData error : ", error);
    }
};

// 리스트에서 selected redux 저장
export const setDeviceSelected = dispatchVal => async (dispatch) => {
    try {
        console.log("💎 setDeviceSelected start"); //SET_DEVICE_SELECTED

        dispatch({
            type: SET_DEVICE_SELECTED,
            payload: dispatchVal,
        });
    } catch (error) {
        console.log("try setAddEleData error : ", error);
    }
};

// deviceType 저장
export const setDeviceType = dispatchVal => async (dispatch) => {
    try {
        console.log("💎 setDeviceType start"); //SET_DEVICE_TYPE

        dispatch({
            type: SET_DEVICE_TYPE,
            payload: dispatchVal,
        });
    } catch (error) {
        console.log("try setDeviceType error : ", error);
    }
};

// assetsPage 저장
export const setAssetsPage = dispatchVal => async (dispatch) => {
    try {
        console.log("💎 setAssetsPage start"); //SET_ASSETS_PAGE

        dispatch({
            type: SET_ASSETS_PAGE,
            payload: dispatchVal,
        });
    } catch (error) {
        console.log("try setDeviceType error : ", error);
    }
};

// apiPage 저장 SET_API_PAGE
export const setApiPage = dispatchVal => async (dispatch) => {
    try {
        console.log("💎 setApiPage start"); //SET_API_PAGE

        dispatch({
            type: SET_API_PAGE,
            payload: dispatchVal,
        });
    } catch (error) {
        console.log("try setApiPage error : ", error);
    }
};

// searchRd 저장
export const setSearch = dispatchVal => async (dispatch) => {
    try {
        console.log("💎 setSearch start");

        dispatch({
            type: SET_DEVICE_SEARCH,
            payload: dispatchVal,
        });
    } catch (error) {
        console.log("try setSearch error : ", error);
    }
};

// 로그 저장
export const setDeviceLog = dispatchVal => async (dispatch) => {
    try {
        console.log("💎 setDeviceLog start");
        const res = await axios.get(`${API_ROUTE}/logs/${dispatchVal}`);

        dispatch({
            type: SET_DEVICE_LOG,
            payload: res.data,
        });
    } catch (error) {
        console.log("try setDeviceLog error : ", error);
    }
};

// MENU URL 저장
export const setDeviceMenuUrl = dispatchVal => async (dispatch) => {
    try {
        console.log("💎 setDeviceMenuUrl start : ", dispatchVal);

        dispatch({
            type: SET_DEVICE_MENU_URL,
            payload: dispatchVal,
        });
    } catch (error) {
        console.log("try setDeviceMenuUrl error : ", error);
    }
};

export const setDeviceSearchDivision = dispatchVal => async (dispatch) => {
  try {
      console.log("💎 setDeviceSearchDivision start : ", dispatchVal);

      dispatch({
          type: SET_DEVICE_SEARCH_DIVISION,
          payload: dispatchVal,
      });
  } catch (error) {
      console.log("try setDeviceSearchDivision error : ", error);
  }
};

export const setDeviceByDeviceCode = dispatchVal => async (dispatch) => {
    try {
        console.log("💎 setDeviceByDeviceCode start : ", dispatchVal);

        dispatch({
            type: SET_DEVICE_DEVICECODE,
            payload: dispatchVal,
        });
    } catch (error) {
        console.log("try setDeviceByDeviceCode error : ", error);
    }
};
