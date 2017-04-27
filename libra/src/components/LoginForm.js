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
  createAccountContainerStyle
} = styles;

    return (
      <View style={backgroundStyle}>
        <StatusBar
          barStyle="light-content"
        />
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
        <View>
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
          <Button onPress={() => Actions.test()}>Log In</Button>
          </View>
          <TouchableOpacity>
            <Text style={textStyle}>
              Did you forget your password?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={createAccountContainerStyle}>
          <TouchableOpacity>
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
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
    marginLeft: 5,
    marginRight: 5,
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
  createAccountContainerStyle: {
    paddingBottom: 15
  }
};

export default LoginForm;
