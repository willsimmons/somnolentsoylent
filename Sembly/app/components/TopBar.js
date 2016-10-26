import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class TopBar extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.menu}>Menu</Text>
        <Text style={styles.logo}>Sembly</Text>
        <Text style={styles.sort}>Sort</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: 40,
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    backgroundColor: 'red',
    alignItems: 'center'
  },
  menu: {
    color: 'white',
  },
  sort: {
    color: 'white',
  },
  logo: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
