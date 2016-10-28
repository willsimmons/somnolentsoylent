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
import NewEventFab from './NewEventFab.js';

export default class Map extends Component {
  constructor (props) {
    super(props);
    this.state = {loading: true, markers: null};
  }
  componentWillMount () {
    let context = this;
    navigator.geolocation.getCurrentPosition(data => {
      context.setState({currentLoc: data});
      fetch('http://localhost:3000/api/events/bundle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: "5812c51bfe439c161fcdae44",
          location: [this.state.currentLoc.coords.longitude, this.state.currentLoc.coords.latitude]
        })
      }
      )
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log(data);
          context.setState({markers: data})
          context.setState({loading: false})
        })
        .catch((err) => {
          console.error(err);
        })
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
            {this.state.markers.map(marker => {
              var tempLoc = {
                latitude: marker.location[1],
                longitude: marker.location[0]
              }
              return (
                <MapView.Marker
                  key={marker._id}
                  coordinate={tempLoc}
                  title={marker.name}
                  pinColor='blue'
                />
              )
            })}
            </MapView>
            <NewEventFab/>
          </View>
        </OurDrawer>
      )
    }
  }
}

const styles = StyleSheet.create({
  map: {
    height: Dimensions.get('window').height - 60,
    zIndex: 0
  },
  loading: {
    fontSize: 75,
    fontWeight: 'bold',
  }
});
