import _ from 'lodash';
import React, { Component } from 'react';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';
import { BUTTON_COLOR, BACKGROUND_COLOR } from '../../styles/GlobalStyles';

const SLIDE_DATA = [
  { text: 'Welcome to JobZap', color: BUTTON_COLOR },
  { text: 'Use this to post or find work', color: BACKGROUND_COLOR },
  { text: 'Set your location, then post away', color: BUTTON_COLOR }
];

class WelcomeScreen extends Component {
  state = { token: null };

// temporary authentication to skip welcome screen if logged in...
  async componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(`Signed in as ${user.uid}`);
        this.setState({ token: user.uid });
        Actions.main();
      } else {
        console.log(`Signed out as ${user}`);
        this.setState({ token: false });
      }
    });
  }

  onSlidesComplete = () => {
    Actions.auth();
  }

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    }
    return (
      <Slides
        data={SLIDE_DATA}
        onComplete={this.onSlidesComplete}
      />
    );
  }
}

export default WelcomeScreen;
