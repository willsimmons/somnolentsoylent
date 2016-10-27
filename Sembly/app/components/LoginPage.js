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
        name: 'MainTest'
    })
  }
  render(){
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{borderRadius: 10, backgroundColor: 'green'}}
          onPress={ () => this._navigate() }>
            <Text style={styles.loginButton}>LOGIN</Text>
        </TouchableOpacity>
      </View>   
    );
  }

};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    fontSize: 20,
    color: 'white',

    padding: 10,
    alignItems: 'center',
    fontWeight: 'bold',
    justifyContent: 'center'
  }
});


