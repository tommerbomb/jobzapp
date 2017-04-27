import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, Input, Spinner } from './common';
import { BACKGROUND_COLOR, FONT_COLOR } from '../styles/GlobalStyles';

class LoginForm extends Component {
  render() {
const {
  backgroundStyle,
  inputContainerStyle,
  buttonContainerStyle,
  textStyle,
  bottomContainerStyle,
  titleContainerStyle,
  middleContainerStyle
} = styles;

    return (
      <View style={backgroundStyle}>
        <StatusBar
          barStyle="light-content"
        />

        <View style={titleContainerStyle}>
          <Text
          style={{
            textAlign: 'center',
            fontSize: 40,
            color: '#fff',
            paddingTop: 50
          }}
          >
            Libra
          </Text>
        </View>

        <View style={middleContainerStyle}>
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
          <Button onPress={() => console.log('logging in')}>Log In</Button>
          </View>

        </View>

        <View style={bottomContainerStyle}>
          <TouchableOpacity onPress={() => console.log('forgot password')}>
            <Text style={textStyle}>
              Did you forget your password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.register()}>
            <Text style={textStyle}>
              Create an account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  inputContainerStyle: {
    padding: 10,
    paddingBottom: 15,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
    marginLeft: 5,
    marginRight: 5,
  },
  middleContainerStyle: {
    paddingTop: 40,
    flex: 1
  },
  backgroundStyle: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
    justifyContent: 'space-between'
  },
  buttonContainerStyle: {
    padding: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
    marginLeft: 5,
    marginRight: 5,
  },
  textStyle: {
    color: FONT_COLOR,
    textAlign: 'center'
  },
  bottomContainerStyle: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 15
  },
  titleContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
};

export default LoginForm;
