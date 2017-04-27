import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Test from './components/Test';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key='main' hideNavBar component={LoginForm} />
      <Scene key='test' hideNavBar={false} component={Test} />
    </Router>
  );
};

export default RouterComponent;
