import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Text } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import LoginForm from './components/LoginForm';
import Router from './router';

class App extends Component {


  render() {
    // const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      // <Provider store={store}>
        <LoginForm />
      // </Provider>
    );
  }
}

export default App;
