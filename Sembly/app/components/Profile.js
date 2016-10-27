import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

import Drawer from 'react-native-drawer';


import TopBar from './TopBar.js';
import OurDrawer from './OurDrawer.js';
import Menu from './Menu.js';


export default class Profile extends Component {
  constructor(props){
    super(props);
  }
  _navigate(name) {
    if(name === 'Main'){
      this.props.navigator.push({
        name: 'Main'
      });
    }
  }

    render(){
      return (
        <OurDrawer _navigate={this._navigate.bind(this)}>
          <View>
            <TouchableOpacity onPress={ () => this._navigate('Main') }>
              <Text style={styles.button}>Profile</Text>
            </TouchableOpacity>
          </View>  
        </OurDrawer>
      )
    }
};

 const drawerStyles = {
  drawer: {
  backgroundColor: 'red', 
  shadowColor: '#000000', 
  shadowOpacity: 0.8, 
  shadowRadius: 3,
  }
}

const styles = StyleSheet.create({
  listElem: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'black',
    width: 225,
    padding: 10,
    paddingLeft: 80

  },
  button: {
    fontSize: 20,
    color: 'white',
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
    
  }
});