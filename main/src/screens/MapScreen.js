import React, { Component } from 'react';
import { Platform, StyleSheet, View, AlertIOS } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';
import { marker } from '../../assets/icons/marker.png';
import { MainButton, Spinner } from '../components/common';
import { PostJobModal } from '../components/PostJobModal';
import { BACKGROUND_COLOR, BUTTON_COLOR } from '../../styles/GlobalStyles';

class MapScreen extends Component {

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
     online: false
   };

   async componentWillMount() {
     console.log('Mounting MapScreen!');
     if (Platform.OS === 'android' && !Constants.isDevice) {
       this.setState({
         errorMessage:
         'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
       });
     } else {
       this.getLocationAsync();
     }
   }

   onOnlineButtonPress() {
    if (this.state.online) {
      //if online go offline
      this.setState({ pinColor: BACKGROUND_COLOR, online: false, onlineButtonText: 'Go Online' });
    } else {
      // if offline go online
      this.setState({ pinColor: BUTTON_COLOR, online: true, onlineButtonText: 'Go Offline' });
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
       console.log(`latitude: ${this.state.markerLocation.latitude}`);
       console.log(`longitude: ${this.state.markerLocation.longitude}`);
     }
   }

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
   };

   changeModalVisibility() {
     this.setState({ showModal: !this.state.showModal });
     console.log(this);
   }

  render() {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = this.state.screenLocation;
    console.log(this.state.markerLocation);
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
  return { user };
};


export default connect(mapStateToProps, { logoutUser })(MapScreen);
