import React from 'react';
import { render } from 'react-dom';
import App from './containers/App/App';

localStorage.clear();
const localMenuTitle = {
    title: '',
    subTitle: '',
};

localMenuTitle.title = '자산관리';
localMenuTitle.subTitle = '서버';
localStorage.localMenuTitle = JSON.stringify(localMenuTitle);

render(
  <App />,
  document.getElementById('root'),
);
