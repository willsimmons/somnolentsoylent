import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Navigator,
  Dimensions
} from 'react-native';

import MapView from 'react-native-maps';
import OurDrawer from './OurDrawer.js';
import _navigate from './navigateConfig.js';

export default class Map extends Component {
  constructor (props) {
    super(props);
    this.state = {loading: true, markers: props.markers};
  }
  componentWillMount () {
    let context = this;
    navigator.geolocation.getCurrentPosition(data => {
      context.setState({currentLoc: data, loading: false});
    });
  }
  render () {
    if(this.state.loading){
      return (
        <OurDrawer _navigate={ _navigate.bind(this)}>
          <View>
            <Text style={styles.loading}>Loading...</Text>
          </View>
        </OurDrawer>
      )
    }
    else {
      return (
        <OurDrawer _navigate={ _navigate.bind(this)}>
          <View>
            <MapView
              showsUserLocation={true}
              style={styles.map}
              initialRegion={{
                latitude: this.state.currentLoc.coords.latitude,
                longitude: this.state.currentLoc.coords.longitude,
                latitudeDelta: .04,
                longitudeDelta: .02
            }}>
            {this.state.markers.map(marker => (
              <MapView.Marker
                key={marker.key}
                coordinate={marker.latlng}
                title={marker.title}
                pinColor='blue'
              />
            ))}
            </MapView>
          </View>
        </OurDrawer>  
      )
    }
  }
}

const styles = StyleSheet.create({
  map: {
    height: Dimensions.get('window').height - 60
  },
  loading: {
    fontSize: 75,
    fontWeight: 'bold',
  },
  marker: {
    fontSize: 50,
    color: 'blue'
  }
});
