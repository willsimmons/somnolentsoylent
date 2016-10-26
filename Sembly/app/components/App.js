import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

import TopBar from './TopBar.js';

export default class App extends Component {
  render () {
    return (
      <View style={styles.container}>
        <TopBar />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  }
});
