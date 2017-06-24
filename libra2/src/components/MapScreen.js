import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { MapView } from 'expo';
import { Button } from '../components/common';
import { BACKGROUND_COLOR } from '../styles/GlobalStyles';


class MapScreen extends Component {

  state = {
    region: {
      latitude: 37,
      longitude: -122,
      latitudeDelta: 0.09,
      longitudeDelta: 0.04
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        region={this.state.region}
      />
      <View style={styles.buttonContainer}>
        <Button style={styles.buttonStyle}>Post Job</Button>
        <Button>Go Online</Button>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  buttonStyle: {
    backgroundColor: BACKGROUND_COLOR,
  },

});

export default MapScreen;
