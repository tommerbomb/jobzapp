import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { Button, Input, Spinner } from './common';
import { BACKGROUND_COLOR } from '../styles/GlobalStyles';

class LoginForm extends Component {
  render() {
const { backgroundStyle, inputContainerStyle, buttonContainerStyle } = styles;

    return (
      <View style={backgroundStyle}>
      <StatusBar
      barStyle="light-content"
      />
        <Text
        style={{
          textAlign: 'center',
          fontSize: 40,
          color: 'white',
          paddingBottom: 40 }}
        >
          Libra
        </Text>
        <View style={inputContainerStyle}>
            <Input
              placeholder="Email"
              onChangeText={() => console.log('change')}
            />
        </View>
        <View style={inputContainerStyle}>
            <Input
              placeholder="Password"
              onChangeText={() => console.log('change')}
              secureTextEntry
            />
        </View>
        <View style={buttonContainerStyle}>
        <Button>Log In</Button>
        </View>
      </View>
    );
  }
}

const styles = {
  inputContainerStyle: {
    borderRadius: 50,
    padding: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
    marginLeft: 5,
    marginRight: 5,
  },
  backgroundStyle: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
    justifyContent: 'center'
  },
  buttonContainerStyle: {
    padding: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
    marginLeft: 5,
    marginRight: 5,
  }
};

export default LoginForm;
