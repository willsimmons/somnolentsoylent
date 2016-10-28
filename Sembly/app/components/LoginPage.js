import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

export default class LoginPage extends Component {

  _navigate() {
    this.props.navigator.push({
        name: 'Map'
    });
  }
  render(){
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={ () => this._navigate() }>
            <Text style={styles.loginButton}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }

};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  loginButton: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'red',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25

  }
});
