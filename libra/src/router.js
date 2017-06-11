import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { logoutUser, loginReset } from './actions';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import MapView from './components/MapView';
import { BACKGROUND_COLOR } from './styles/GlobalStyles';
import Test from './components/Test';

class RouterComponent extends Component {


onLeftMapView() {
  console.log('logging out');
  this.props.logoutUser();
}

onBackRegister() {
  this.props.loginReset();
  Actions.pop();
}


  render() {
    const { showNavBarStyle, hideNavBarStyle, navBarTitleStyle } = styles;

    return (
      <Router>
        <Scene key='auth' >
          <Scene key='login' hideNavBar component={LoginForm} />
          <Scene
          key='register'
          component={RegisterForm}
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
           component={MapView}
           title='Map View'
           navigationBarStyle={showNavBarStyle}
           titleStyle={navBarTitleStyle}
           hideNavBar={false}
           leftTitle='Log Out'
           onLeft={this.onLeftMapView.bind(this)}
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
