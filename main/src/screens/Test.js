import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';


class Test extends Component {

  state = {
    text: 'Clients Online: ',
    clients: []
  };

  componentWillMount() {
    const DB = firebase.database().ref('/users');
    DB.on('value', function (snapshot) {
      this.setState({ ...this.state,
         clients: this.state.clients
         .push(`<Text style={{ paddingTop: 150 }}>{${snapshot.val()}}</Text>`) })
         .then();
    });
  }

  render() {
    return (
      <View>
        <Text style={{ paddingTop: 150 }}>{this.state.text}</Text>
        <Text style={{ paddingTop: 150 }}>{this.state.clients}</Text>
      </View>
    );
  }
}

export default Test;
