import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { logoutUser, loginReset } from './actions';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MapScreen from './screens/MapScreen';
import { BACKGROUND_COLOR } from '../styles/GlobalStyles';
import Test from './screens/Test';

class RouterComponent extends Component {

onLeftMapScreen() {
  console.log('logging out');
  this.props.logoutUser();
  Actions.auth({ type: 'reset' });
}

onBackRegister() {
  this.props.loginReset();
  Actions.pop();
}


  render() {
    const { showNavBarStyle, hideNavBarStyle, navBarTitleStyle } = styles;

    return (
      <Router panHandlers={null}>
        <Scene key='welcome' hideNavBar component={WelcomeScreen} />
        <Scene key='auth' >
          <Scene key='login' hideNavBar component={LoginScreen} />
          <Scene
          key='register'
          component={RegisterScreen}
          title='Register'
          navigationBarStyle={hideNavBarStyle}
          titleStyle={navBarTitleStyle}
          hideNavBar={false}
          onBack={this.onBackRegister.bind(this)}
          />
        </Scene>
        <Scene key='main'>
          <Scene
           key='map'
           component={MapScreen}
           title='Map Screen'
           navigationBarStyle={showNavBarStyle}
           titleStyle={navBarTitleStyle}
           hideNavBar={false}
           leftTitle='Log Out'
           onLeft={this.onLeftMapScreen.bind(this)}
           rightTitle='Test Nav'
           onRight={() => Actions.account()}
          />
          <Scene
           key='account'
           component={Test}
           title='Account Info'
           navigationBarStyle={showNavBarStyle}
           titleStyle={navBarTitleStyle}
           hideNavBar={false}
          />
        </Scene>
      </Router>
    );
  }
}

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

export default connect(null, { logoutUser, loginReset })(RouterComponent);
