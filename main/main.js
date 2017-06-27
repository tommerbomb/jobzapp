import Expo from 'expo';
import React from 'react';
import { Provider } from 'react-redux';

import store from './src/store';
import Router from './src/router';


class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

Expo.registerRootComponent(App);
