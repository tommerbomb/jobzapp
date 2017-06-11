import Expo from 'expo';
import React from 'react';
import { Provider } from 'react-redux';

import store from './src/store';
import Router from './src/router';

const auth = require('./src/authentication');

class App extends React.Component {

  render() {
    // const MainNavigator = TabNavigator({
    //   welcome: { screen: WelcomeScreen },
    //   auth: {
    //     screen: StackNavigator({
    //       login: { screen: LoginScreen },
    //       register: { screen: RegisterScreen }
    //     })
    //   },
    //   main: {
    //     screen: StackNavigator({
    //       map: { screen: MapScreen },
    //       setting: { screen: SettingScreen }
    //     })
    //   }
    // });
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

Expo.registerRootComponent(App);
