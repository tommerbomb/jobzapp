import Expo from 'expo';
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import Router from './src/router';
import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyCC8V3S-b8-iWZY9iEjf6GaYo7AuWpE__g',
    authDomain: 'libra-27695.firebaseapp.com',
    databaseURL: 'https://libra-27695.firebaseio.com',
    projectId: 'libra-27695',
    storageBucket: 'libra-27695.appspot.com',
    messagingSenderId: '873309250369'
  };

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(`Signed in as ${user.uid}`);
  } else {
    console.log(`Signed out as ${user}`);
  }
});

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
