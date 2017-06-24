import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Input, MainButton, Spinner } from '../components/common';
import { BACKGROUND_COLOR, ERROR_COLOR } from '../../styles/GlobalStyles';
import {
  firstNameChanged,
  lastNameChanged,
  mobileNumberChanged,
  registerEmailChanged,
  registerPasswordChanged,
  createUser
} from '../actions';

class RegisterScreen extends Component {
  static navigationOptions = {
    title: 'Register',
    headerStyle: {
      backgroundColor: 'rgba(0,0,0,0)',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0 },
    headerTintColor: '#fff',
    headerTitleStyle: { color: '#fff' }
  }

  onFirstNameChange(text) {
    console.log(`changed to ${text}`);
    this.props.firstNameChanged(text);
  }
  onLastNameChange(text) {
    this.props.lastNameChanged(text);
  }

  onMobileNumberChange(text) {
    //Could put some logic to format number here
    this.props.mobileNumberChanged(text);
  }

  onEmailChange(text) {
    this.props.registerEmailChanged(text);
  }

  onPasswordChange(text) {
    this.props.registerPasswordChanged(text);
  }

  onButtonPress() {
    console.log(this.props);
    const { firstName, lastName, mobileNumber, email, password } = this.props;
    this.props.createUser({ firstName, lastName, mobileNumber, email, password });
  }

  renderButton() {
    if (this.props.loading) {
      return (<Spinner />);
    }
    return (<MainButton onPress={this.onButtonPress.bind(this)}>Register</MainButton>);
  }

  render() {
    const {
      backgroundStyle,
      inputContainerStyle,
      textStyle,
      textContainerStyle,
      containerStyle,
      inputRowStyle,
      buttonContainerStyle
    } = styles;

    return (
      <View style={backgroundStyle}>
        <View style={containerStyle}>
          <View style={inputRowStyle}>
            <View style={textContainerStyle}>
              <Text style={textStyle}>Name</Text>
            </View>
            <View style={inputContainerStyle}>
              <Input
              placeholder='First Name'
              onChangeText={this.onFirstNameChange.bind(this)}
              value={this.props.firstName}
              />
              <Input
              placeholder='Last Name'
              onChangeText={this.onLastNameChange.bind(this)}
              value={this.props.lastName}
              />
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
              onChangeText={this.onMobileNumberChange.bind(this)}
              value={this.props.mobileNumber}
              />
            </View>
          </View>

          <View style={inputRowStyle}>
            <View style={textContainerStyle}>
              <Text style={textStyle}>Email</Text>
            </View>
            <View style={inputContainerStyle}>
              <Input
              placeholder='Email Address'
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
              />
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
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
              />
            </View>
          </View>
          <View style={buttonContainerStyle}>
            {this.renderButton()}
          </View>
          <View>
          <Text style={styles.errorTextStyle}>{ this.props.error.message }</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  backgroundStyle: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
    justifyContent: 'center'
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
    padding: 5
  },
  buttonContainerStyle: {
    padding: 10,
    paddingTop: 25,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative'
  },
  errorTextStyle: {
    fontSize: 18,
    alignSelf: 'center',
    color: ERROR_COLOR,
    paddingBottom: 10
  }
};

const mapStateToProps = ({ register }) => {
  const {
    firstName,
    lastName,
    mobileNumber,
    email,
    password,
    loading,
    error
  } = register;

  return {
    firstName,
    lastName,
    mobileNumber,
    email,
    password,
    loading,
    error
  };
};


export default connect(
  mapStateToProps,
  {
    firstNameChanged,
    lastNameChanged,
    mobileNumberChanged,
    registerEmailChanged,
    registerPasswordChanged,
    createUser
  })(RegisterScreen);
