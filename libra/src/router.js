import React from 'react';
import { Text } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key='main'>
        <Text>Main Scene</Text>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
