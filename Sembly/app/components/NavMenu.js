import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class NavMenu extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          Nunyabeezwax
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  instructions: {
    color: 'red'
  }
});
