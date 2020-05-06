import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {fetchPosts} from '../../../../redux/actions/assetsAction';

const ComAssets = () => {
    // useSelector -> mapStateToProps와 유사한 기능이며,
    // store의 state의 데이터를 할당할 수 있도록 하는 function
    // 해당 selector의 경우는 연결된 action이 dispatch 될때마다, selector에 접근되어 값을 반환
    const postsSelector = useSelector(state => state.assets);
    // useDispatch -> redux store에 설정된 action에 대한 dispatch를 연결하는 hook
    const dispatch = useDispatch();

    // dispatch가 실제 fetchPosts 이라는 action을 연결할 수 있도록 선언
    const getDevices = () => dispatch(fetchPosts());

    useEffect(() => {
        getDevices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const posts = postsSelector.devices.map(post => (
        <div className="mt-2 style-card" key={post.RegisterId}>
            {post.RegisterId}
        </div>
    ));
    return (
        <div className="container">{posts}</div>
    );
};

export default ComAssets;
