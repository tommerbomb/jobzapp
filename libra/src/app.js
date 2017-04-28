import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import Router from './router';
import { config } from './authentication';
import reducers from './reducers';


class App extends Component {

  componentWillMount() {
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log(`Signed in as ${user.email}`);
      } else {
          // No user is signed in.
          console.log('Not Signed In');
      }
    });
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
       <Provider store={store}>
        <Router />
       </Provider>
    );
  }
}

export default App;
