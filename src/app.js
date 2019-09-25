// Dependencies
import '@babel/polyfill';
import React from 'react';
import {Provider} from 'react-redux';

// Store
import store from './store';

// Actions
import {onChangeUserIsLogin, onChangeUserData} from './actions';

//  Routes
import Routes from './Routes';

//  Styles
import './styles/_global.scss';

async function init() {
  let localUserData = await localStorage.getItem('@user:data');
  if (localUserData) localUserData = JSON.parse(localUserData);

  if (localUserData) {
    store.dispatch(async () => await onChangeUserData({
      dispatch: store.dispatch,
      data: localUserData
    }));
  }

  store.dispatch(async () => await onChangeUserIsLogin({
    dispatch: store.dispatch,
    value: !!localUserData
  }));
}

init().then();

export default (
  <Provider store={store}>
    <Routes/>
  </Provider>
);
