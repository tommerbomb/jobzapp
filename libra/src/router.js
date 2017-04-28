import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import CreateForm from './components/CreateForm';
import MapView from './components/MapView';
import { BACKGROUND_COLOR } from './styles/GlobalStyles';
import Test from './components/Test';

const RouterComponent = () => {
  const { showNavBarStyle, hideNavBarStyle, navBarTitleStyle } = styles;

  return (
    <Router>
      <Scene key='auth' >
        <Scene key='login' hideNavBar component={LoginForm} />
        <Scene
        key='register'
        component={CreateForm}
        title='Register'
        navigationBarStyle={hideNavBarStyle}
        titleStyle={navBarTitleStyle}
        hideNavBar={false}
        />
      </Scene>
      <Scene key='main'>
        <Scene
         key='map'
         component={MapView}
         title='Map View'
         navigationBarStyle={showNavBarStyle}
         titleStyle={navBarTitleStyle}
         hideNavBar={false}
         leftTitle='Log Out'
         onLeft={() => {
           console.log('logging out');
           Actions.pop();
         }}
         rightTitle='Test Nav'
         onRight={() => Actions.test()}
        />
        <Scene
         key='test'
         component={Test}
         title='Testing Nav'
         navigationBarStyle={showNavBarStyle}
         titleStyle={navBarTitleStyle}
         hideNavBar={false}
        />
      </Scene>
    </Router>
  );
};

const styles = {
  hideNavBarStyle: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderBottomWidth: 0
  },
  navBarTitleStyle: {
    color: '#fff',
    fontSize: 18
  },
  showNavBarStyle: {
    backgroundColor: BACKGROUND_COLOR
  }
};

export default RouterComponent;
