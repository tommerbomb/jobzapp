import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import CreateForm from './components/CreateForm';

const RouterComponent = () => {
  const { navBarStyle, navBarTitleStyle } = styles;

  return (
    <Router>
      <Scene key='auth' >
        <Scene key='login' hideNavBar component={LoginForm} />
        <Scene
        key='register'
        navigationBarStyle={navBarStyle}
        titleStyle={navBarTitleStyle}
        hideNavBar={false}
        component={CreateForm}
        title='Register'
        />
      </Scene>
    </Router>
  );
};

const styles = {
  navBarStyle: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderBottomWidth: 0
  },
  navBarTitleStyle: {
    color: '#fff',
    fontSize: 18
  }
};

export default RouterComponent;
