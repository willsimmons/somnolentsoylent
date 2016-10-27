import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

import TopBar from './TopBar.js';


export default class MainTest extends Component {
  // _navigate(name) {
  //   this.props.navigator.push({
  //     name: 'Login',
  //     passProps: {
  //       name: name
  //     }
  //   })
  // }
  render(){
    return (
      <View>
        <TopBar />
        <TouchableOpacity style={styles.outerButton} onPress={ () => this.props.navigator.pop() }>
            <Text style={styles.button}>MAIN TEST</Text>
        </TouchableOpacity>
      </View>   
    );
  }
};

const styles = StyleSheet.create({
  outerButton: {
    borderRadius: 10,
    padding: 10,

  },
  button: {
    fontSize: 20,
    color: 'white',
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    fontWeight: 'bold',
    justifyContent: 'center'
  }
});