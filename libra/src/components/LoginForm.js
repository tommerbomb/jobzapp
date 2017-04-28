import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { Button, Input, Spinner } from './common';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { BACKGROUND_COLOR, FONT_COLOR } from '../styles/GlobalStyles';

class LoginForm extends Component {

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in.
            console.log(`Signed in as ${user.email}`);
        } else {
            // No user is signed in.
            console.log('Not Signed In');
        }
    });
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onButtonPress() {
  console.log(this.props);
  const { email, password } = this.props;
  this.props.loginUser({ email, password });
}

  renderButton() {
    if (this.props.loading) {
      return (<Spinner />);
    }
    return (<Button onPress={this.onButtonPress.bind(this)}>Log In</Button>);
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
  },
  errorTextStyle: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'red',
    paddingBottom: 10
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(mapStateToProps, { passwordChanged, emailChanged, loginUser })(LoginForm);
