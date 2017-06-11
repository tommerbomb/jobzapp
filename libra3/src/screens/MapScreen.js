import React, { Component } from 'react';
import { Platform, StyleSheet, View, AlertIOS } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';
import { MainButton, Spinner } from '../components/common';
import { PostJobModal } from '../components/PostJobModal';
import { BACKGROUND_COLOR } from '../styles/GlobalStyles';

class MapScreen extends Component {

  state = {
     location: {
       latitude: 122,
       longitude: 40,
       latitudeDelta: 0.1,
       longitudeDelta: 0.05
     },
     errorMessage: null,
     loading: false,
     showModal: false
   };

   async componentWillMount() {
     if (Platform.OS === 'android' && !Constants.isDevice) {
       this.setState({
         errorMessage:
         'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
       });
     } else {
       this.setState({ loading: true });
       this.getLocationAsync();
       this.setState({ loading: false });
     }
   }

   getLocationAsync = async () => {
     let { status } = await Permissions.askAsync(Permissions.LOCATION);
     if (status !== 'granted') {
       this.setState({
         errorMessage: 'Permission to access location was denied',
       });
       AlertIOS.alert('You need to allow JobZap to use your location');
     }
     let location = await Location.getCurrentPositionAsync({});
     this.setState({
       location: {
         ...this.state.location,
         latitude: location.coords.latitude,
         longitude: location.coords.longitude } });
   };

   changeModalVisibility() {
     this.setState({ showModal: !this.state.showModal });
     console.log(this);
   }

  render() {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = this.state.location;
    if (this.state.loading) {
      return <Spinner />;
    }

    return (
      <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        region={{
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta
        }}
      >
      <MapView.Marker
      coordinate={{
        latitude,
        longitude }}
      title={JSON.stringify(this.props.user)}
      />
    </MapView>
      <View style={styles.buttonContainer}>
        <MainButton
        style={styles.buttonStyle}
        onPress={this.changeModalVisibility.bind(this)}
        >
        Post Job
        </MainButton>
        <MainButton>Go Online</MainButton>
      </View>
        <PostJobModal
        visible={this.state.showModal}
        onDecline={this.changeModalVisibility.bind(this)}
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
