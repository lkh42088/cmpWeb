import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const icon = `${process.env.PUBLIC_URL}/img/burger.svg`;

class TopbarSidebarButton extends PureComponent {
    static propTypes = {
        changeMobileSidebarVisibility: PropTypes.func.isRequired,
        changeSidebarVisibility: PropTypes.func.isRequired,
    };

    render() {
        const {changeMobileSidebarVisibility, changeSidebarVisibility} = this.props;

        return (
            <div>
                <button className="topbar__button topbar__button--desktop" type="button"
                        onClick={changeSidebarVisibility}>
                    <img src={icon} alt="" className="topbar__button-icon"/>
                </button>
                <button className="topbar__button topbar__button--mobile" type="button"
                        onClick={changeMobileSidebarVisibility}>
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
    }
}

export default TopbarSidebarButton;
