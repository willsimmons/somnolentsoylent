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

import _navigate from './navigateConfig.js';


export default class Feed extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <OurDrawer topBarFilterVisible={false} topBarName={'Feed'} _navigate={_navigate.bind(this)}>
        <View>
          
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