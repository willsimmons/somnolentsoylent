import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import TopBar from './TopBar.js';
import NavMenu from './NavMenu.js';
import LoginPage from './LoginPage.js';
import Main from './Main.js';
import Invites from './Invites.js';
import Profile from './Profile.js';
import Feed from './Feed.js';
import Saved from './Saved.js';

export default class App extends Component {

  renderScene(route, navigator){
    if(route.name === 'LoginPage'){
      return <LoginPage navigator={navigator}/>   
    }

    if(route.name === 'Profile') {
      return <Profile navigator={navigator}/>
    }
    if(route.name === 'Main') {
      return <Main navigator={navigator}/>
    }
    if(route.name === 'Feed') {
      return <Feed navigator={navigator}/>
    }
    if(route.name === 'Invites') {
      return <Invites navigator={navigator}/>
    }
    if(route.name === 'Saved') {
      return <Saved navigator={navigator}/>
    }
  }

  configureScene(route, routeStack){
   return Navigator.SceneConfigs.FloatFromBottom;
  }

  render () {
    return (
      <Navigator
        configureScene={ this.configureScene }
        style={styles.container}
        initialRoute={{name: 'LoginPage'}}
        renderScene={this.renderScene}/>
    )
  }
}


const styles = StyleSheet.create({
  container: {
  }
});


