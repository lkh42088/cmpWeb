import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";

import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import {Button} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {makeStyles} from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import CheckIcon from '@material-ui/icons/Check';
import DialogContentText from '@material-ui/core/DialogContentText';
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {getCompanies} from "../../../../lib/api/company";
import {getUserList} from "../../../../lib/api/users";
import LookupCompany from "../../../Common/LookupCompany";
import {
    getMcServersByCpIdx,
    getMcImagesByServerIdx,
    getMcNetworksByServerIdx,
    checkUserCheck,
} from "../../../../lib/api/microCloud";
import {CUSTOMER_MANAGER} from "../../../../lib/var/globalVariable";

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const snapTypeList = [
    { value: true, name: "Enable" },
];

const backupTypeList = [
    { value: true, name: "Enable" },
];

const snapDayList = [
    { value: 7, name: "1 week" },
    { value: 30, name: "1 month" },
];

const snapHourList = [
    { value: 1, name: "1" },
    { value: 2, name: "2" },
    { value: 3, name: "3" },
    { value: 4, name: "4" },
    { value: 5, name: "5" },
    { value: 6, name: "6" },
    { value: 7, name: "7" },
    { value: 8, name: "8" },
    { value: 9, name: "9" },
    { value: 10, name: "10" },
    { value: 11, name: "11" },
    { value: 12, name: "12" },
    { value: 13, name: "13" },
    { value: 14, name: "14" },
    { value: 15, name: "15" },
    { value: 16, name: "16" },
    { value: 17, name: "17" },
    { value: 18, name: "18" },
    { value: 19, name: "19" },
    { value: 20, name: "20" },
    { value: 21, name: "21" },
    { value: 22, name: "22" },
    { value: 23, name: "23" },
];

const snapMinList = [
    { value: 5, name: "5" },
    { value: 10, name: "10" },
    { value: 15, name: "15" },
    { value: 20, name: "20" },
    { value: 25, name: "25" },
    { value: 30, name: "30" },
    { value: 35, name: "35" },
    { value: 40, name: "40" },
    { value: 45, name: "45" },
    { value: 50, name: "50" },
    { value: 55, name: "55" },
];

const cpuList = [
    { value: 2, name: "2" },
    { value: 4, name: "4" },
    { value: 6, name: "6" },
    { value: 8, name: "8" },
    { value: 10, name: "10" },
    { value: 12, name: "12" },
    { value: 14, name: "14" },
    { value: 16, name: "16" },
];

const ramList = [
    { value: 2048, name: "2" },
    { value: 4096, name: "4" },
    { value: 6144, name: "6" },
    { value: 8192, name: "8" },
    { value: 10240, name: "10" },
    { value: 12288, name: "12" },
    { value: 14336, name: "14" },
    { value: 16384, name: "16" },
];

const WriteVm = (props) => {
    /************************************************************************************
     * Props
     ************************************************************************************/
    const {
        handleClose, handleSubmit, isRegister, data, user,
    } = props;
    //vm 회사, 클라우드 서버, 이름, image, cpu, ram 변경 불가

    /************************************************************************************
     * Variable
     ************************************************************************************/
    const classes = useStyles();

    const [companyList, setCompanyList] = useState([]);
    const [serverList, setServerList] = useState([]);
    const [imageList, setImageList] = useState([]);
    const [networkList, setNetworkList] = useState([]);
    const [menuCompany, setMenuCompany] = useState(false);
    const [openSearchCompany, setOpenSearchCompany] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [compareVmUser, setCompareVmUser] = useState('');

    /*******************
     * Field
     *******************/
    const [fields, setFields] = useState({
        idx: '',
        cpName: '',
        cpIdx: 0,
        serverIdx: 0,
        serialNumber: '',
        name: '',
        image: 0,
        imageName: '',
        network: 0,
        networkName: '',
        os: '',
        cpu: 1,
        ram: 1024,
        hdd: 0,
        ipAddr: '',
        snapType: false,
        snapDays: 1,
        snapHours: 0,
        snapMinutes: 0,
        backupType: false,
        backupDays: 1,
        backupHours: 0,
        backupMinutes: 0,
        vmUserId: '',
        vmUserFlag: false,
    });

    const [requires, setRequireds] = useState({
        cpName: true,
        cpIdx: true,
        serverIdx: true,
        serialNumber: true,
        name: true,
        image: true,
        network: true,
        cpu: true,
        ram: true,
        hdd: true,
        ipAddr: true,
        snapType: false,
        snapDays: false,
        snapHours: false,
        snapMinutes: false,
        backupType: false,
        backupDays: false,
        backupHours: false,
        backupMinutes: false,
        vmUserId: false,
    });

    const [disables, setDisables] = useState({
        cpName: false,
        cpIdx: false,
        serverIdx: false,
        serialNumber: false,
        name: false,
        image: false,
        network: false,
        cpu: false,
        ram: false,
        hdd: true,
        ipAddr: false,
        snapType: false,
        snapDays: true,
        snapHours: true,
        snapMinutes: true,
        backupType: false,
        backupDays: true,
        backupHours: true,
        backupMinutes: true,
        vmUserId: true,
    });

    const [helpers, setHelpers] = useState({
        cpName: "",
        cpIdx: "",
        serverIdx: "",
        serialNumber: "",
        name: "",
        image: "",
        network: "",
        cpu: "",
        ram: "",
        hdd: "",
        ipAddr: "",
        snapType: "",
        snapDays: "",
        snapHours: "",
        snapMinutes: "",
        backupType: "",
        backupDays: "",
        backupHours: "",
        backupMinutes: "",
        vmUserId: "",
    });

    const [errors, setErrors] = useState({
        cpName: false,
        cpIdx: false,
        serverIdx: false,
        serialNumber: false,
        name: false,
        image: false,
        network: false,
        cpu: false,
        ram: false,
        hdd: false,
        ipAddr: false,
        snapType: false,
        snapDays: false,
        snapHours: false,
        snapMinutes: false,
        backupType: false,
        backupDays: false,
        backupHours: false,
        backupMinutes: false,
        vmUserId: true,
    });

    /*******************
     * Validation
     *******************/
    const checkValidation = () => {
        const tempHelperImage = "* 필수 입력사항입니다.";

        /** Micro Cloud Server */
        let errorServerIdx = false;
        let helperServerIdx = '';
        if (fields.serverIdx < 1) {
            errorServerIdx = true;
            helperServerIdx = tempHelperImage;
        }

        /** VM 이름 */
        let errorName = false;
        let helperName = '';
        if (fields.name.length < 1) {
            errorName = true;
            helperName = tempHelperImage;
        }
        /** Image */
        let errorImage = false;
        let helperImage = '';
        if (fields.image < 1) {
            errorImage = true;
            helperImage = tempHelperImage;
        }
        /** Network */
        let errorNetwork = false;
        let helperNetwork = '';
        if (fields.network < 1) {
            errorNetwork = true;
            helperNetwork = tempHelperImage;
        }
        /** cpu */
        let errorCpu = false;
        let helperCpu = '';
        if (fields.cpu < 1) {
            errorCpu = true;
            helperCpu = tempHelperImage;
        }
        /** ram */
        let errorRam = false;
        let helperRam = '';
        if (fields.ram < 1) {
            errorRam = true;
            helperRam = tempHelperImage;
        }

        setErrors({
            ...errors,
            serverIdx: errorServerIdx,
            name: errorName,
            image: errorImage,
            network: errorNetwork,
            cpu: errorCpu,
            ram: errorRam,
        });

        setHelpers({
            ...helpers,
            serialNumber: helperServerIdx,
            name: helperName,
            image: helperImage,
            network: helperNetwork,
            cpu: helperCpu,
            ram: helperRam,
        });

        return !(errorServerIdx || errorName || errorImage
            || errorNetwork || errorCpu || errorRam);
    };

    /*******************
     * Close & Send
     *******************/
    const reset = () => {
        setFields({
            cpName: '',
            cpIdx: 0,
            serverIdx: 0,
            serialNumber: '',
            name: '',
            image: 0,
            network: '',
            networkName: '',
            cpu: 1,
            ram: 1024,
            hdd: 0,
            ipAddr: '',
            snapType: false,
            snapDays: 1,
            snapHours: 0,
            snapMinutes: 0,
            backupType: false,
            backupDays: 1,
            backupHours: 0,
            backupMinutes: 0,
            vmUserId: '',
            vmUserFlag: false,
        });

        setDisables({
            cpName: false,
            cpIdx: false,
            serverIdx: false,
            serialNumber: false,
            name: false,
            image: false,
            network: false,
            cpu: false,
            ram: false,
            hdd: true,
            ipAddr: false,
            snapType: false,
            snapDays: true,
            snapHours: true,
            snapMinutes: true,
            backupType: false,
            backupDays: true,
            backupHours: true,
            backupMinutes: true,
            vmUserId: true,
        });

        setHelpers({
            cpName: "",
            cpIdx: "",
            serverIdx: "",
            serialNumber: "",
            name: '',
            image: "",
            network: '',
            cpu: "",
            ram: "",
            hdd: "",
            ipAddr: "",
            snapType: "",
            snapDays: "",
            snapHours: "",
            snapMinutes: "",
            backupType: "",
            backupDays: "",
            backupHours: "",
            backupMinutes: "",
            vmUserId: '',
        });

        setErrors({
            cpName: false,
            cpIdx: false,
            serverIdx: false,
            serialNumber: false,
            name: false,
            image: false,
            network: false,
            cpu: false,
            ram: false,
            hdd: false,
            ipAddr: false,
            snapType: false,
            snapDays: false,
            snapHours: false,
            snapMinutes: false,
            backupType: false,
            backupDays: false,
            backupHours: false,
            backupMinutes: false,
            vmUserId: true,
        });
        setServerList([]);
    };

    const handleDialogClickOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        reset();
        handleClose();
    };

    const handleSubmitInternal = () => {
        if (!checkValidation()) {
            return;
        }

        handleSubmit(fields);
        reset();
    };

    const handleSubmitCheck = (flag) => {
        if (flag) {
            if (fields.vmUserId !== undefined && fields.vmUserId !== "") {
                if (compareVmUser !== fields.vmUserId) {
                    if (errors.vmUserId) {
                        handleDialogClickOpen();
                    } else {
                        handleSubmitInternal();
                    }
                } else {
                    handleSubmitInternal();
                }
            } else {
                handleSubmitInternal();
            }
        } else {
            setFields({
                ...fields,
                vmUserId: "",
            }); // 비동기라 어차피 적용되지 않음....

            handleSubmitInternal();
        }
    };

    /*******************
     * Change
     *******************/
    const handleChangeField = (name, value) => {
        //console.log("★ change field: name ", name, ", value", value);
        if (name === "cpIdx") {
            setFields({
                ...fields,
                serverIdx: 0,
                serialNumber: "",
                image: 0,
                imageName: "",
                os: "",
                network: 0,
                networkName: "",
                [name]: value,
            });

            setDisables({
                ...disables,
                vmUserId: !value,
            });
            /*setHelpers({
                ...helpers,
                vmUserId: "",
            });*/
        } else if (name === "serverIdx") {
            setFields({
                ...fields,
                [name]: value,
                serialNumber: serverList.find(item => item.idx === value),
                image: 0,
                imageName: "",
                os: "",
                network: 0,
                networkName: "",
            });
        } else if (name === "image") {
            const img = imageList.find(item => item.idx === value);
            setFields({
                ...fields,
                [name]: value,
                imageName: img ? img.name : "",
                os: img ? img.variant : "",
            });
        } else if (name === "network") {
            const net = networkList.find(item => item.idx === value);
            setFields({
                ...fields,
                [name]: value,
                networkName: net ? net.name : "",
            });
        } else if (name === "snapType") {
            setFields({
                ...fields,
                [name]: value,
                snapDays: 1,
                snapHours: 0,
                snapMinutes: 0,
            });
            setDisables({
                ...disables,
                snapDays: !value,
                snapHours: !value,
                snapMinutes: !value,
            });
        } else if (name === "backupType") {
            setFields({
                ...fields,
                [name]: value,
                backupDays: 1,
                backupHours: 0,
                backupMinutes: 0,
            });
            setDisables({
                ...disables,
                backupDays: !value,
                backupHours: !value,
                backupMinutes: !value,
            });
        } else if (name === "snapDays") {
            setFields({
                ...fields,
                [name]: value,
                snapHours: 0,
                snapMinutes: 0,
            });
            if (value !== 1) {
                setDisables({
                    ...disables,
                    snapHours: true,
                    snapMinutes: true,
                });
            } else {
                setDisables({
                    ...disables,
                    snapHours: false,
                    snapMinutes: false,
                });
            }
        } else if (name === "backupDays") {
            setFields({
                ...fields,
                [name]: value,
                backupHours: 0,
                backupMinutes: 0,
            });
            if (value !== 1) {
                setDisables({
                    ...disables,
                    backupHours: true,
                    backupMinutes: true,
                });
            } else {
                setDisables({
                    ...disables,
                    backupHours: false,
                    backupMinutes: false,
                });
            }
        } else {
            setFields({
                ...fields,
                [name]: value,
            });
        }

        if (name !== "vmUserId") {
            setErrors({
                ...errors,
                [name]: false,
            });
        }

        if (name === "cpIdx") {
            setHelpers({
                ...helpers,
                vmUserId: "",
                [name]: "",
            });
        } else {
            setHelpers({
                ...helpers,
                [name]: "",
            });
        }
    };

    /*******************
     * Open
     *******************/
    const getCompanyList = async () => {
        try {
            const response = await getCompanies();
            setCompanyList(response.data);
        } catch (error) {
            setCompanyList([]);
        }
    };

    const getMcServers = async () => {
        try {
            console.log("cpIdx.. ", fields.cpIdx);
            const response = await getMcServersByCpIdx({
                cpIdx: fields.cpIdx,
            });
            console.log("get.. ", response);
            setServerList(response.data);
        } catch (e) {
            console.log("fail.. ");
            setServerList([]);
        }
    };

    const getMcNetworks = async () => {
        try {
            const response = await getMcNetworksByServerIdx({
                serverIdx: fields.serverIdx,
            });
            console.log("get.. ", response);
            setNetworkList(response.data);
        } catch (e) {
            console.log("fail.. ");
            setNetworkList([]);
        }
    };

    const getMcImages = async () => {
        try {
            console.log("serverIdx.. ", fields.serverIdx);
            const response = await getMcImagesByServerIdx({
                serverIdx: fields.serverIdx,
            });
            console.log("get.. ", response);
            setImageList(response.data);
        } catch (e) {
            console.log("fail.. ");
            setImageList([]);
        }
    };

    /*******************
     * User Check
     *******************/

    const getUserCheck = async () => {
      try {
          // 넘기는 값 -> fields.vmUserId, fields.cpIdx
          const response = await checkUserCheck({
              id: fields.vmUserId,
              cpIdx: fields.cpIdx,
          });

          const {status} = response.data;
          const {type} = response.data;
          let helper = "";
          let error = false;
          // status : success
          // type : user, vm

          switch (type) {
              case "user":
                  if (status === "fail") {
                    helper = "※ 등록되지 않은 사용자 입니다.";
                    error = true;
                  }
                  break;
              case "vm":
                  if (status === "fail") {
                      helper = "※ 이미 사용자가 등록되어 있습니다.";
                      error = true;
                  } else {
                      helper = "※ 성공!";
                      error = false;
                  }
                  break;
              default:
                  console.log("error");
                  break;
          }

          if (error) {
              setFields({
                  ...fields,
                  vmUserId: "",
                  vmUserFlag: false,
              });
          } else {
              setFields({
                  ...fields,
                  vmUserFlag: true,
              });
          }

          setErrors({
              ...errors,
              vmUserId: error,
          });

          setHelpers({
              ...helpers,
              vmUserId: helper,
          });
      } catch (e) {
          console.log("async error");
      }
    };

    /**************************************************************
     * Handle Function
     **************************************************************/

    const handleMenuCompany = () => {
        if (companyList.length === 0) {
            getCompanyList();
        }
        setMenuCompany(!menuCompany);
    };

    const handleOpenSearchCompany = () => {
        setOpenSearchCompany(true);
    };

    const handleSearchUser = () => {
        const name = "vmUserId";
        if (fields.cpIdx !== 0) { // company값이 존재한다면
            if (!isRegister) {
                if (compareVmUser !== fields.vmUserId) {
                    getUserCheck();
                }
            } else {
                getUserCheck();
            }

            setHelpers({
                ...helpers,
                [name]: "",
            });

           /* if (isRegister) {
                getUserCheck();
                setHelpers({
                    ...helpers,
                    [name]: "",
                });
            } else if (compareVmUser === fields.vmUserId) {
                setHelpers({
                    ...helpers,
                    [name]: "",
                });
            } else {
                getUserCheck();
                setHelpers({
                    ...helpers,
                    [name]: "",
                });
            }*/
        } else {
            setErrors({
                ...errors,
                [name]: true,
            });

            setHelpers({
                ...helpers,
                [name]: "회사를 선택해주세요.",
            });
        }
    };

    const handleCloseSearchCompany = () => {
        setOpenSearchCompany(false);
    };

    const handleCompleteSearchCompany = (idx, name) => {
        console.log("handleCompleteSearchCompany: ", idx, name);
        handleChangeField("cpIdx", idx);
    };

    /**************************************************************
     * useEffect
     **************************************************************/

    useEffect(() => {
        if (fields.serverIdx > 0) {
            getMcImages();
            getMcNetworks();
        } else {
            setImageList([]);
            setNetworkList([]);
        }
    }, [fields.serverIdx]);

    useEffect(() => {
        if (fields.image > 0) {
            const entry = imageList.find(item => item.idx === fields.image);
            handleChangeField("hdd", entry ? entry.hdd : 0);
        } else {
            handleChangeField("hdd", 0);
        }
    }, [fields.image]);

    useEffect(() => {
        if (fields.cpIdx > 0) {
            getMcServers();
        } else {
            setServerList([]);
            setImageList([]);
            setNetworkList([]);
        }
    }, [fields.cpIdx]);

    useEffect(() => {
        if (isRegister === false) {
            if (imageList !== null && imageList.length > 0) {
                const img = imageList.find(item => item.name === fields.imageName);

                setFields({
                    ...fields,
                    image: img.idx,
                });
            }
        }
    }, [imageList]);

    useEffect(() => {
        if (isRegister === false) {
            if (networkList !== null && networkList.length > 0) {
                const net = networkList.find(item => item.name === fields.networkName);

                setFields({
                    ...fields,
                    network: net.idx,
                });
            }
        }
    }, [networkList]);

    useEffect(() => {
        if (companyList === null || companyList.length === 0) {
            getCompanyList();
        }
        if (user) {
            const {level, cpIdx, cpName} = user;
            if (level >= CUSTOMER_MANAGER) {
                setFields({
                        ...fields,
                        cpIdx,
                        cpName,
                });

                setDisables({
                    ...disables,
                    vmUserId: false,
                });
            }
        }

        if (isRegister === false) {
            //console.log("data : ", data);
            setFields({
                ...fields,
                idx: data.idx,
                cpName: data.cpName,
                cpIdx: data.cpIdx,
                serverIdx: data.serverIdx,
                serialNumber: data.serialNumber,
                name: data.name,
                image: data.image,
                imageName: data.image,
                network: data.network,
                networkName: data.network,
                os: data.os,
                cpu: data.cpu,
                ram: data.ram,
                hdd: data.hdd,
                ipAddr: data.ipAddr,
                snapType: data.snapType,
                snapDays: data.snapDays,
                snapHours: data.snapHours,
                snapMinutes: data.snapMinutes,
                backupType: data.backupType,
                backupDays: data.backupDays,
                backupHours: data.backupHours,
                backupMinutes: data.backupMinutes,
                vmUserId: data.vmUserId,
            });

            setCompareVmUser(data.vmUserId);

            //snapType
            //bckupType
            let snapTypeDisable = true;
            let bckupTypeDisable = true;

            if (data.snapType) {
                snapTypeDisable = false;
            }

            if (data.backupType) {
                bckupTypeDisable = false;
            }

            setDisables({
                ...disables,
                cpName: true,
                cpIdx: true,
                serverIdx: true,
                name: true,
                image: true,
                cpu: true,
                ram: true,
                vmUserId: false,
                vmUserFlag: false,
                snapDays: snapTypeDisable,
                snapHours: snapTypeDisable,
                snapMinutes: snapTypeDisable,
                backupDays: bckupTypeDisable,
                backupHours: bckupTypeDisable,
                backupMinutes: bckupTypeDisable,
            });

            /*setErrors({
                ...errors,
                vmUserId: false,
            });*/
        }
    }, []);

    const variant = "filled";
    const fieldSize = "small";
    const buttonSize = "large";
    const formClassName = "cb-material-form";
    const labelClassName = "cb-material-form__label";
    const fieldClassName = "cb-material-form__field";

    return (
        <React.Fragment>
            <form className={formClassName}>
                <Grid container spacing={1}>
                    { user && user.level < CUSTOMER_MANAGER && (
                        <React.Fragment>
                            <Grid item xs={6}>
                                <div>
                                    <span className={labelClassName}>* 회사</span>
                                    <FormControl
                                        size={fieldSize}
                                        className={fieldClassName}
                                        variant="filled"
                                        error={errors.cpIdx}
                                        disabled={disables.cpIdx}
                                    >
                                        <Select
                                            required={requires.cpIdx}
                                            name="cpIdx"
                                            value={fields.cpIdx}
                                            error={errors.cpIdx}
                                            onChange={(e) => {
                                                handleChangeField("cpIdx", e.target.value);
                                            }}
                                            onClick={handleMenuCompany}
                                            MenuProps={MenuProps}
                                        >
                                            <MenuItem key={0} value={0}>
                                                <em>None</em>
                                            </MenuItem>
                                            {companyList && companyList.map((item, index) => {
                                                const key = index;
                                                return (
                                                    <MenuItem key={key} value={item.idx}>{item.name}</MenuItem>
                                                );
                                            })}
                                        </Select>
                                        <FormHelperText>{helpers.cpIdx}</FormHelperText>
                                        <LookupCompany
                                            open={openSearchCompany}
                                            handleClose={handleCloseSearchCompany}
                                            handleComplete={handleCompleteSearchCompany}
                                        />
                                    </FormControl>
                                </div>
                            </Grid>
                            {isRegister ? (
                                <Grid item xs={2}>
                                    <span className={labelClassName}/>
                                    <Button
                                        disabled={disables.cpIdx}
                                        className={classes.margin}
                                        variant="contained"
                                        color="primary"
                                        onClick={handleOpenSearchCompany}
                                        size={buttonSize}
                                        endIcon={<SearchIcon/>}
                                        style={{
                                            maxWidth: '105px',
                                            maxHeight: '45px',
                                            minWidth: '105px',
                                            minHeight: '45px',
                                            margin: '20px 0px 0px 0px',
                                        }}
                                    >
                                        검색
                                    </Button>
                                </Grid>
                            ) : false}
                            <Grid item xs={4}>
                                <div/>
                            </Grid>
                        </React.Fragment>
                    )}
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>* Micro Cloud Server</span>
                            <FormControl
                                size={fieldSize}
                                className={fieldClassName}
                                variant="filled"
                                error={errors.serverIdx}
                                disabled={disables.serverIdx}
                            >
                                <Select
                                    required={errors.serverIdx}
                                    disabled={disables.serverIdx}
                                    name="serverIdx"
                                    value={fields.serverIdx}
                                    onChange={(e) => {
                                        /*console.log("serverIdx: ", e.target);
                                        console.log("serverIdx: value ", e.target.value);*/
                                        handleChangeField("serverIdx", e.target.value);
                                    }}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem key={0} value={0}>
                                        <em>None</em>
                                    </MenuItem>
                                    {serverList && serverList.map((item, index) => {
                                        const key = index;
                                        return (
                                            <MenuItem key={key} value={item.idx}>{item.serialNumber}</MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText>{helpers.serialNumber}</FormHelperText>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>* VM 이름</span>
                            <TextField
                                className={fieldClassName}
                                error={errors.name}
                                required={requires.name}
                                disabled={disables.name}
                                helperText={helpers.name}
                                name="name"
                                value={fields.name}
                                onChange={(e) => { handleChangeField("name", e.target.value); }}
                                variant={variant}
                                size={fieldSize}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>* Image </span>
                            <FormControl
                                size={fieldSize}
                                className={fieldClassName}
                                variant="filled"
                                error={errors.image}
                                disabled={disables.image}
                            >
                                <Select
                                    required={errors.image}
                                    disabled={disables.image}
                                    name="image"
                                    value={fields.image}
                                    onChange={(e) => {
                                        //console.log("event:", e.target.value);
                                        handleChangeField("image", e.target.value);
                                    }}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem key={0} value={0}>
                                        <em>None</em>
                                    </MenuItem>
                                    {imageList.map((item, index) => {
                                        const key = index;
                                        return (
                                            <MenuItem key={key} value={item.idx}>{item.name}</MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText>{helpers.image}</FormHelperText>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>* Network</span>
                            <FormControl
                                size={fieldSize}
                                className={fieldClassName}
                                variant="filled"
                                error={errors.network}
                                disabled={disables.network}
                            >
                                <Select
                                    required={errors.network}
                                    disabled={disables.network}
                                    name="network"
                                    value={fields.network}
                                    onChange={(e) => {
                                        //console.log("event:", e.target.value);
                                        handleChangeField("network", e.target.value);
                                    }}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem key={0} value={0}>
                                        <em>None</em>
                                    </MenuItem>
                                    {networkList.map((item, index) => {
                                        const key = index;
                                        return (
                                            <MenuItem key={key} value={item.idx}>{item.name}</MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText>{helpers.network}</FormHelperText>
                            </FormControl>
                        </div>
                    </Grid>
                    {/*<Grid item xs={4}>*/}
                    {/*    <div>*/}
                    {/*        <span className={labelClassName}>* HDD (G)</span>*/}
                    {/*        <TextField*/}
                    {/*            className={fieldClassName}*/}
                    {/*            error={errors.hdd}*/}
                    {/*            required={requires.hdd}*/}
                    {/*            disabled={disables.hdd}*/}
                    {/*            helperText={helpers.hdd}*/}
                    {/*            name="hdd"*/}
                    {/*            value={fields.hdd}*/}
                    {/*            onChange={(e) => { handleChangeField("hdd", e.target.value); }}*/}
                    {/*            variant={variant}*/}
                    {/*            size={fieldSize}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</Grid>*/}
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>* CPU</span>
                            <FormControl
                                size={fieldSize}
                                className={fieldClassName}
                                variant="filled"
                                error={errors.cpu}
                                disabled={disables.cpu}
                            >
                                <Select
                                    required={errors.cpu}
                                    disabled={disables.cpu}
                                    name="cpu"
                                    value={fields.cpu}
                                    onChange={(e) => {
                                        const res = cpuList.filter(item => item.value === e.target.value);
                                        if (res.length === 0) {
                                            handleChangeField("cpu", 1);
                                        } else {
                                            // console.log("name:", res[0].name);
                                            handleChangeField("cpu", e.target.value);
                                        }
                                    }}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem key={1} value={1}>
                                        <em>1</em>
                                    </MenuItem>
                                    {cpuList.map((item, index) => {
                                        const key = index;
                                        return (
                                            <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText>{helpers.cpu}</FormHelperText>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>* RAM (G)</span>
                            <FormControl
                                size={fieldSize}
                                className={fieldClassName}
                                variant="filled"
                                error={errors.ram}
                                disabled={disables.ram}
                            >
                                <Select
                                    required={errors.ram}
                                    disabled={disables.ram}
                                    name="ram"
                                    value={fields.ram}
                                    onChange={(e) => {
                                        const res = ramList.filter(item => item.value === e.target.value);
                                        if (res.length === 0) {
                                            handleChangeField("ram", 1024);
                                        } else {
                                            //console.log("name:", res[0].name);
                                            handleChangeField("ram", e.target.value);
                                        }
                                    }}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem key={1} value={1024}>
                                        <em>1</em>
                                    </MenuItem>
                                    {ramList.map((item, index) => {
                                        const key = index;
                                        return (
                                            <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText>{helpers.ram}</FormHelperText>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>Snapshot </span>
                            <FormControl
                                size={fieldSize}
                                className={fieldClassName}
                                variant="filled"
                                error={errors.snapType}
                                disabled={disables.snapType}
                            >
                                <Select
                                    required={errors.snapType}
                                    disabled={disables.snapType}
                                    name="snapType"
                                    value={fields.snapType}
                                    onChange={(e) => {
                                        const res = snapTypeList.filter(item => item.value === e.target.value);
                                        if (res.length === 0) {
                                            handleChangeField("snapType", false);
                                        } else {
                                            //console.log("name:", res[0].name);
                                            handleChangeField("snapType", e.target.value);
                                        }
                                    }}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem key={0} value={false}>
                                        <em>Disable</em>
                                    </MenuItem>
                                    {snapTypeList.map((item, index) => {
                                        const key = index;
                                        return (
                                            <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText>{helpers.snapType}</FormHelperText>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            <span className={labelClassName}>Days </span>
                            <FormControl
                                size={fieldSize}
                                className={fieldClassName}
                                variant="filled"
                                error={errors.snapDays}
                                disabled={disables.snapDays}
                            >
                                <Select
                                    required={errors.snapDays}
                                    disabled={disables.snapDays}
                                    name="snapDays"
                                    value={fields.snapDays}
                                    onChange={(e) => {
                                        //console.log("event:", e.target.value);
                                        handleChangeField("snapDays", e.target.value);
                                    }}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem key={1} value={1}>
                                        <em>1 day</em>
                                    </MenuItem>
                                    {snapDayList.map((item, index) => {
                                        const key = index;
                                        return (
                                            <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText>{helpers.snapDays}</FormHelperText>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            <span className={labelClassName}>Hours </span>
                            <FormControl
                                size={fieldSize}
                                className={fieldClassName}
                                variant="filled"
                                error={errors.snapHours}
                                disabled={disables.snapHours}
                            >
                                <Select
                                    required={errors.snapHours}
                                    disabled={disables.snapHours}
                                    name="snapHours"
                                    value={fields.snapHours}
                                    onChange={(e) => {
                                        //console.log("event:", e.target.value);
                                        handleChangeField("snapHours", e.target.value);
                                    }}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem key={0} value={0}>
                                        <em>0</em>
                                    </MenuItem>
                                    {snapHourList.map((item, index) => {
                                        const key = index;
                                        return (
                                            <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText>{helpers.snapHours}</FormHelperText>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            <span className={labelClassName}>Minutes </span>
                            <FormControl
                                size={fieldSize}
                                className={fieldClassName}
                                variant="filled"
                                error={errors.snapMinutes}
                                disabled={disables.snapMinutes}
                            >
                                <Select
                                    required={errors.snapMinutes}
                                    disabled={disables.snapMinutes}
                                    name="snapMinutes"
                                    value={fields.snapMinutes}
                                    onChange={(e) => {
                                        //console.log("event:", e.target.value);
                                        handleChangeField("snapMinutes", e.target.value);
                                    }}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem key={0} value={0}>
                                        <em>0</em>
                                    </MenuItem>
                                    {snapMinList.map((item, index) => {
                                        const key = index;
                                        return (
                                            <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText>{helpers.snapMinutes}</FormHelperText>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>Backup</span>
                            <FormControl
                                size={fieldSize}
                                className={fieldClassName}
                                variant="filled"
                                error={errors.backupType}
                                disabled={disables.backupType}
                            >
                                <Select
                                    required={errors.backupType}
                                    disabled={disables.backupType}
                                    name="backupType"
                                    value={fields.backupType}
                                    onChange={(e) => {
                                        const res = backupTypeList.filter(item => item.value === e.target.value);
                                        if (res.length === 0) {
                                            handleChangeField("backupType", false);
                                        } else {
                                            //console.log("name:", res[0].name);
                                            handleChangeField("backupType", e.target.value);
                                        }
                                    }}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem key={0} value={false}>
                                        <em>Disable</em>
                                    </MenuItem>
                                    {backupTypeList.map((item, index) => {
                                        const key = index;
                                        return (
                                            <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText>{helpers.backupType}</FormHelperText>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            <span className={labelClassName}>Days </span>
                            <FormControl
                                size={fieldSize}
                                className={fieldClassName}
                                variant="filled"
                                error={errors.backupDays}
                                disabled={disables.backupDays}
                            >
                                <Select
                                    required={errors.backupDays}
                                    disabled={disables.backupDays}
                                    name="backupDays"
                                    value={fields.backupDays}
                                    onChange={(e) => {
                                        //console.log("event:", e.target.value);
                                        handleChangeField("backupDays", e.target.value);
                                    }}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem key={1} value={1}>
                                        <em>1 day</em>
                                    </MenuItem>
                                    {snapDayList.map((item, index) => {
                                        const key = index;
                                        return (
                                            <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
                                    );
                                    })}
                                </Select>
                                <FormHelperText>{helpers.backupDays}</FormHelperText>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            <span className={labelClassName}>Hours </span>
                            <FormControl
                                size={fieldSize}
                                className={fieldClassName}
                                variant="filled"
                                error={errors.backupHours}
                                disabled={disables.backupHours}
                            >
                                <Select
                                    required={errors.backupHours}
                                    disabled={disables.backupHours}
                                    name="backupHours"
                                    value={fields.backupHours}
                                    onChange={(e) => {
                                        //console.log("event:", e.target.value);
                                        handleChangeField("backupHours", e.target.value);
                                    }}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem key={0} value={0}>
                                        <em>0</em>
                                    </MenuItem>
                                    {snapHourList.map((item, index) => {
                                        const key = index;
                                        return (
                                            <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText>{helpers.backupHours}</FormHelperText>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            <span className={labelClassName}>Minutes </span>
                            <FormControl
                                size={fieldSize}
                                className={fieldClassName}
                                variant="filled"
                                error={errors.backupMinutes}
                                disabled={disables.backupMinutes}
                            >
                                <Select
                                    required={errors.backupMinutes}
                                    disabled={disables.backupMinutes}
                                    name="backupMinutes"
                                    value={fields.backupMinutes}
                                    onChange={(e) => {
                                        //console.log("event:", e.target.value);
                                        handleChangeField("backupMinutes", e.target.value);
                                    }}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem key={0} value={0}>
                                        <em>0</em>
                                    </MenuItem>
                                    {snapMinList.map((item, index) => {
                                        const key = index;
                                        return (
                                            <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText>{helpers.backupMinutes}</FormHelperText>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <span className={labelClassName}>VM 사용자&nbsp;
                                <span style={{
                                    color: "gray",
                                    fontSize: "x-small",
                                }}>ID 입력</span>
                            </span>
                            <TextField
                                className={fieldClassName}
                                error={errors.vmUserId}
                                required={requires.vmUserId}
                                disabled={disables.vmUserId}
                                helperText={helpers.vmUserId}
                                name="vmUserId"
                                value={fields.vmUserId}
                                onChange={(e) => { handleChangeField("vmUserId", e.target.value); }}
                                variant={variant}
                                size={fieldSize}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <span className={labelClassName}/>
                        <Button
                            disabled={disables.vmUserFlag}
                            className={classes.margin}
                            variant="contained"
                            color="primary"
                            onClick={handleSearchUser}
                            size={buttonSize}
                            endIcon={<CheckIcon/>}
                            style={{
                                maxWidth: '135px',
                                maxHeight: '45px',
                                minWidth: '135px',
                                minHeight: '45px',
                                margin: '20px 0px 0px 0px',
                            }}
                        >
                            중복확인
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <div/>
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            <Button
                                variant="contained"
                                size={buttonSize}
                                onClick={handleCancel}>
                                취소
                            </Button>
                            {isRegister ? (
                                <Button
                                    className={classes.margin}
                                    variant="contained"
                                    color="primary"
                                    size={buttonSize}
                                    onClick={(e) => {
                                        handleSubmitCheck(true);
                                    }}
                                    endIcon={<SendIcon/>}
                                >
                                    전송
                                </Button>
                            ) : (
                                <Button
                                    className={classes.margin}
                                    variant="contained"
                                    color="primary"
                                    size={buttonSize}
                                    onClick={(e) => {
                                        handleSubmitCheck(true);
                                    }}
                                    endIcon={<SendIcon/>}
                                >
                                    수정
                                </Button>
                            )}
                        </div>
                    </Grid>
                </Grid>
            </form>
            <Dialog
                open={open}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                {/*<DialogTitle id="alert-dialog-title">&nbsp;</DialogTitle>*/}
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        VM 사용자의 등록 가능 여부를 체크하지 않았습니다.<br/>
                        그대로 진행할 경우 VM 사용자의 정보는 변경되지 않습니다.<br/>
                        진행하시겠습니까?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Disagree
                    </Button>
                    <Button
                        onClick={(e) => {
                            handleSubmitCheck(false);
                        }} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default WriteVm;
