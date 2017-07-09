import React, { Component } from 'react';
import { Platform, StyleSheet, View, AlertIOS } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { logoutUser } from '../actions';
import { MainButton } from '../components/common';
import { PostJobModal } from '../components/PostJobModal';
import { BACKGROUND_COLOR, BUTTON_COLOR } from '../../styles/GlobalStyles';


class MapScreen extends Component {

//need to move state to a redux implementation
  state = {
     screenLocation: {
       latitude: 122,
       longitude: 40,
       latitudeDelta: 0.1,
       longitudeDelta: 0.05
     },
     markerLocation: {
       latitude: 122,
       longitude: 40
     },
     errorMessage: null,
     loaded: false,
     showModal: false,
     pinColor: BACKGROUND_COLOR,
     onlineButtonText: 'Go Online',
     online: false,
     buttonDisabled: false
   };

// Determine the location of this device with getLocationAsync
   async componentWillMount() {
     console.log('Inside componentWillMount MapScreen!');
     this.updateUserOnlineStatus();
     if (Platform.OS === 'android' && !Constants.isDevice) {
       this.setState({
         errorMessage:
         'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
       });
     } else {
       this.getLocationAsync();
     }
   }

//evt handlers

   onOnlineButtonPress() {
    if (this.state.online) {
      //if online go offline
      this.setState({
        pinColor: BACKGROUND_COLOR,
        online: false,
        onlineButtonText: 'Go Online' }, () => this.updateUserOnlineStatus());
    } else {
      // if offline go online
      this.setState({
        pinColor: BUTTON_COLOR,
        online: true,
        onlineButtonText: 'Go Offline' }, () => this.updateUserOnlineStatus());
    }
   }

   onRegionChange(e) {
     if (this.state.loaded) {
       const { latitude, longitude, latitudeDelta, longitudeDelta } = e;
       console.log(e);
       console.log('OnRegionChange is firing');
       this.setState({ screenLocation: { latitude, longitude, latitudeDelta, longitudeDelta } });
     }
   }

   onMarkerDrag(e) {
     if (this.state.loaded) {
       const { latitude, longitude } = e.nativeEvent.coordinate;
       this.setState({ markerLocation: { latitude, longitude } });
       this.updateUserLocation(longitude, latitude);
       console.log(`latitude: ${this.state.markerLocation.latitude}`);
       console.log(`longitude: ${this.state.markerLocation.longitude}`);
     }
   }

   //get location & update firebase DB

   getLocationAsync = async () => {
     const { status } = await Permissions.askAsync(Permissions.LOCATION);
     if (status !== 'granted') {
       console.log('Permission denied');
       this.setState({
         errorMessage: 'Permission to access location was denied',
       });
       AlertIOS.alert('You need to allow JobZap to use your location');
     }
     const location = await Location.getCurrentPositionAsync({});
     this.setState({
       screenLocation: {
         ...this.state.screenLocation,
         latitude: location.coords.latitude,
         longitude: location.coords.longitude },
       markerLocation: {
         latitude: location.coords.latitude,
         longitude: location.coords.longitude
       } }, () => { this.setState({ loaded: true }); });

        this.updateUserLocation(location.coords.longitude, location.coords.latitude);
   };

   //firebase DB updates

   updateUserLocation(longitude, latitude) {
     const currentUser = firebase.auth().currentUser;
     console.log(`Current User: ${currentUser}`);
     console.log(`Props User: ${this.state.user}`);
     firebase.database().ref(`/users/${currentUser.uid}/location`)
       .set({ longitude, latitude });
   }

   updateUserOnlineStatus() {
     const currentUser = firebase.auth().currentUser;
     firebase.database().ref(`/users/${currentUser.uid}/status/online`)
       .set(this.state.online);
   }

   //modal visibility

   changeModalVisibility() {
     this.setState({ showModal: !this.state.showModal });
     console.log(this);
   }

  render() {
    console.log('Rendering MapScreen!');

    const { latitude, longitude, latitudeDelta, longitudeDelta } = this.state.screenLocation;

    return (
      <View style={{ flex: 1 }}>
      <MapView
        loadingEnabled
        showsTraffic
        provider={'google'}
        style={styles.map}
        region={{
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta
        }}
        onRegionChange={(e) => this.onRegionChange(e)}
      >
        <MapView.Marker
        draggable
        pinColor={this.state.pinColor}
        coordinate={this.state.markerLocation}
        onDrag={(e) => this.onMarkerDrag(e)}
        />
      </MapView>
      <View style={styles.buttonContainer}>
        <MainButton
        style={styles.buttonStyle}
        onPress={this.changeModalVisibility.bind(this)}
        disabled={this.state.buttonDisabled}
        >
        Post Job
        </MainButton>
        <MainButton
          onPress={this.onOnlineButtonPress.bind(this)}
        >{this.state.onlineButtonText}
      </MainButton>
      </View>
        <PostJobModal
        animationType='slide'
        visible={this.state.showModal}
        onDecline={() => {
          this.changeModalVisibility();
        }}
        > Post a Job!!!
        </PostJobModal>
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
  }
});

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  console.log(user);
  return { user };
};


export default connect(mapStateToProps, { logoutUser })(MapScreen);
