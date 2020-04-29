import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Col, Container, Row} from 'reactstrap';

import {fetchPosts} from '../../../../redux/actions/assetsAction';

const ComAssets = () => {
    const postsSelector = useSelector(state => state.assets);
    const dispatch = useDispatch();

    const getDevices = () => dispatch(fetchPosts());

    useEffect(() => {
        getDevices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /*const assets = postsSelector.devices.map(post => (
        <div className="mt-2 style-card" key={post.id}>
            {post}
        </div>
    ));*/

    /*console.log("postsSelector.devices : ", postsSelector.devices);*/

    return (
        <div className="container">{postsSelector.devices}</div>
    );
};

export default ComAssets;
