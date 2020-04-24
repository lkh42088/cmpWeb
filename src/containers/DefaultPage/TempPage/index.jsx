import React, {useState} from 'react';
import axios from 'axios';
import {Form} from "redux-form";
import {Link, Route, NavLink} from 'react-router-dom';
import Image404 from '../../../shared/img/404/404.png';
import API_ROUTE from '../../../shared/apiRoute';

const style = {
    backgroundColor: 'black',
    padding: '8px',
    color: 'white',
    display: 'block',
    width: '250px',
    margin: '0 auto',
};

/*/v1/devices/:type/:outFlag*/
const NotFound404 = () => {
    const [data, setData] = useState(null);
    const onClick = () => {
        axios.get(`${API_ROUTE}/devices/server/0/list`, {}).then((response) => {
            console.log('response is data : ', response.data);
        }).catch((error) => {
            if (error.response) {
                console.log("error.response : ", error.response.headers);
            } else if (error.request) {
                console.log("error.request : ", error.request);
            } else {
                console.log("error.message : ", error.message);
            }
            console.log("error.config : ", error.config);
        });
    };
    return (
        <div className="not-found">
            <div className="not-found__content">
                <img className="not-found__image" src={Image404} alt="404"/>
                <h3 className="not-found__info">Ooops! The page is under development :(</h3>
                <a href="/assets/list" title="개발 페이지 이동" style={style}>
                    Development →
                </a>
                <button type="button" onClick={onClick}>test value</button>
            </div>
        </div>
    );
};

export default NotFound404;
