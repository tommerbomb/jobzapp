import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, loginUser, registerReset } from '../actions';
import { Input, Spinner, MainButton } from '../components/common';
import { BACKGROUND_COLOR, FONT_COLOR, ERROR_COLOR } from '../styles/GlobalStyles';

class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  }

  onPasswordChange(text) {
      this.props.passwordChanged(text);
    }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onButtonPress() {
  const { email, password } = this.props;
  this.props.loginUser({ email, password });
}

  onCreateAccountPress() {
    this.props.registerReset();
    Actions.register();
  }

  renderButton() {
    if (this.props.loading) {
      return (<Spinner />);
    }
    return (<MainButton onPress={this.onButtonPress.bind(this)}>Log In</MainButton>);
  }


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

    console.log('Hello World!!');

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
          JobZap
        </Text>
      </View>

      <View style={middleContainerStyle}>
        <View style={inputContainerStyle}>
            <Input
              placeholder="Email"
              onChangeText={() => console.log('change')}
              value={this.props.email}
              onChangeText={this.onEmailChange.bind(this)}
            />
        </View>
        <View style={inputContainerStyle}>
            <Input
              placeholder="Password"
              onChangeText={() => console.log('change')}
              secureTextEntry
              value={this.props.password}
              onChangeText={this.onPasswordChange.bind(this)}
            />
        </View>

        <View style={buttonContainerStyle}>
          {this.renderButton()}
        </View>
      </View>
      <View>
      <Text style={styles.errorTextStyle}>{ this.props.error }</Text>
      </View>
      <View style={bottomContainerStyle}>
        <TouchableOpacity onPress={() => console.log('forgot password')}>
          <Text style={textStyle}>
            Did you forget your password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onCreateAccountPress.bind(this)}>
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
  },
  errorTextStyle: {
    fontSize: 18,
    alignSelf: 'center',
    color: ERROR_COLOR,
    paddingBottom: 10
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(
  mapStateToProps, {
    passwordChanged,
    emailChanged,
    loginUser,
    registerReset })(LoginScreen);
