import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import {changeToSidebarDropdown} from "../../../redux/actions/customizerActions";

const icon = `${process.env.PUBLIC_URL}/img/burger.svg`;

const TopbarSidebarButton = (props) => {
    const dispatch = useDispatch();
    const {changeMobileSidebarVisibility, changeSidebarVisibility} = props;
    const [originSidebar, setOriginSidebar] = useState(false);
    const {sidebarDropdown} = useSelector(({customizer}) => ({
        sidebarDropdown: customizer.sidebarDropdown,
    }));
    const {show, collapse} = useSelector(({sidebar}) => ({
        show: sidebar.show,
        collapse: sidebar.collapse,
    }));
    
    // sidebar dropdown 일 경우 window mode 로 변경 필요
    const handleClick = () => {
        setOriginSidebar(sidebarDropdown);
        // 사이드바 닫기 액션
        if (collapse === false) {
            if (sidebarDropdown === true) {
                dispatch(changeToSidebarDropdown());
            }
        } else if (originSidebar !== sidebarDropdown) {
            // 사이드바 열기 액션
            dispatch(changeToSidebarDropdown());
        }
        dispatch(changeSidebarVisibility);
    };
    // 모바일에서 동일 기능
    const handleClickMobile = () => {
        setOriginSidebar(sidebarDropdown);
        // 사이드바 닫기 액션
        if (show === false) {
            if (sidebarDropdown === true) {
                dispatch(changeToSidebarDropdown());
            }
        } else if (originSidebar !== sidebarDropdown) {
            // 사이드바 열기 액션
            dispatch(changeToSidebarDropdown());
        }
        dispatch(changeMobileSidebarVisibility);
    };

    return (
        <div>
            <button className="topbar__button topbar__button--desktop" type="button"
                    onClick={handleClick}>
                <img src={icon} alt="" className="topbar__button-icon"/>
            </button>
            <button className="topbar__button topbar__button--mobile" type="button"
                    onClick={handleClickMobile}>
                <img src={icon} alt="" className="topbar__button-icon"/>
            </button>
            {/*<button type="button"
                        onClick={() => changeMenuTitle('testddd', 'ee')}>
                    Uncaught Error: Expected `onClick` listener to be a function, instead got a value of `object` type.
                    자식 컴포넌트가 prop으로 함수를 받았는데 그걸 이벤트 함수에 그냥 받을 경우 생기는 에러
                    <img src={icon} alt="" className="topbar__button-icon"/>
                </button>*/}
        </div>
    );
};

TopbarSidebarButton.propTypes = {
    changeMobileSidebarVisibility: PropTypes.func.isRequired,
    changeSidebarVisibility: PropTypes.func.isRequired,
};

export default TopbarSidebarButton;
