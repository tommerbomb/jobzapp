import React, { Component } from 'react';
import { View, Picker, Text  } from 'react-native';
import { Input, Button } from './common';
import { BACKGROUND_COLOR } from '../styles/GlobalStyles'

class CreateForm extends Component {
  render() {
    const {
      backgroundStyle,
      inputContainerStyle,
      textStyle,
      textContainerStyle,
      containerStyle,
      inputRowStyle
    } = styles;

    return (
      <View style={backgroundStyle}>
        <View style={containerStyle}>
          <View style={inputRowStyle}>
            <View style={textContainerStyle}>
              <Text style={textStyle}>Name</Text>
            </View>
            <View style={inputContainerStyle}>
              <Input placeholder='First Name' />
              <Input placeholder='Last Name' />
            </View>
          </View>

          <View style={inputRowStyle}>
            <View style={textContainerStyle}>
              <Text style={textStyle}>Mobile Number</Text>
            </View>
            <View style={inputContainerStyle}>
              <Input
              placeholder='(208)-555-5555'
              keyboardType='phone-pad'
              />
            </View>
          </View>

          <View style={inputRowStyle}>
            <View style={textContainerStyle}>
              <Text style={textStyle}>Email</Text>
            </View>
            <View style={inputContainerStyle}>
              <Input placeholder='Email Address' />
            </View>
          </View>

          <View style={inputRowStyle}>
            <View style={textContainerStyle}>
              <Text style={textStyle}>Password</Text>
            </View>
            <View style={inputContainerStyle}>
              <Input
              placeholder='Atleast 5 characters'
              secureTextEntry
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  backgroundStyle: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1
  },
  inputContainerStyle: {
    padding: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative'
  },
  textStyle: {
    color: '#fff'
  },
  textContainerStyle: {
    justifyContent: 'flex-start',
    paddingLeft: 15
  },
  containerStyle: {
    padding: 5,
    paddingTop: 75
  },
  inputRowStyle: {

  }
};

export default CreateForm;
