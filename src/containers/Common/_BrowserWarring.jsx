import React from "react";
import {Card, CardBody, CardHeader} from "reactstrap";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ImageExplorer from "../../shared/img/explorer.png";

const BrowserWarring = (props) => {
    const {
        open, handleClose, handleSubmit, data,
        childComponent, title, icon, width,
    } = props;

    return (
        /*<div className="container">
            <div className="error">
                <h1>500</h1>
                <h2>...</h2>
                <h2>error</h2>
                {/!*<div className="explorer_warring-img"/>*!/}
                <p>Ruh-roh, something just is not right... Time to paw through your logs and get down and dirty in your
                    stack-trace;)</p>{/!*
                <img src="http://127.0.0.1:4000/shared/img/explorer.png" alt="" className="explorer_warring-img"/>
                <img src="/src/shared/img/explorer.png" alt="" className="explorer_warring-img"/>*!/}
            </div>
        </div>*/
        /*<div id="bg"> <img src="" alt="" className="bg"/></div>*/
        /*<div id="bg"><div className="bgimg"/></div>*/

        <div className="warring-explorer">
            <div className="warring-explorer__content">
                {/*<img className="warring-explorer__image" src={ImageExplorer} alt="404" />*/}
                {/*<div id="demotext">
                     eslint-disable-next-line react/no-unescaped-entities
                    Ooops! <br/>&nbsp;You're using a web browser we don't support :(
                </div>*/}
                <div className="body">
                    <div className="error-number">
                        <svg alignmentBaseline="middle" className="warring-explorer__bg-title">
                            <defs>
                                <clipPath id="clip2">
                                    <path d="M 0 0 L 600 0 L 600 80 L 0 80 L 0 0 L 0 125 L 600 125 L 600 200 L 0 200 Z"/>
                                </clipPath>
                            </defs>
                            <text x="300" y="175"
                                  style={{
                                      width: "600px",
                                      height: "200px",
                                  }}
                                  textAnchor="middle" fontFamily="Lato" fontWeight="700"
                                  fontSize="250" fill="#505458" clipPath="url(#clip2)">So
                                <tspan fill="#35b8e0">rr</tspan>
                                y
                            </text>
                        </svg>
                        <div className="warring-explorer__title">PAGE NOT FOUND</div>
                    </div>
                    Oh no, looks like shit hit the fan.
                </div>
            </div>
        </div>
    );
};

export default BrowserWarring;
