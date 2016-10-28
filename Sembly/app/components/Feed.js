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
import NewEventModal from './NewEventModal.js';
import EventModal from './EventModal.js';
import NewEventFab from './NewEventFab.js';

import TopBar from './TopBar.js';
import OurDrawer from './OurDrawer.js';
import Menu from './Menu.js';
import EventCard from './EventCard';

import _navigate from './navigateConfig.js';


export default class Feed extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      eventModal: false,
      addEventModal: false
    }
  }
  componentWillMount() {
    if (this.props.page === 'bundle') {
      this.getBundle()
    }
    else if (this.props.page === 'invited') {
      this.getInvited();
    } else if (this.props.page === 'saved') {
      this.getSaved();
    }
  }
  openEvent(eventId) {
    this.setState({eventModal: true, eventId: eventId, addEventModal: false});
  }
  openModal () {
    this.setState({addEventModal: true, eventModal:false});
  }
  getInvited() {
    fetch('http://localhost:3000/api/events/invited',{
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({userId: this.props.user._id})
    })
    .then(response => {
      return response.json();
    })
    .then( events => {
      this.setState({events: events, loading: false});
    })
    .catch( error => {
      console.log(error);
    });
  }
  getSaved() {
    fetch('http://localhost:3000/api/events/saved',{
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({userId: this.props.user._id})
    })
    .then(response => {
      return response.json();
    })
    .then( events => {
      this.setState({events: events, loading: false});
    })
    .catch( error => {
      console.log(error);
    });
  }
  getBundle() {
    fetch('http://localhost:3000/api/events/bundle',{
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({userId: this.props.user._id, location: this.props.mongoLocation})
    })
    .then(response => {
      return response.json();
    })
    .then( events => {
      this.setState({events: events, loading: false});
    })
    .catch( error => {
      console.log(error);
    });
  }
  render(){
    if (this.state.loading) {
      return (
        <OurDrawer topBarFilterVisible={false} topBarName={'Feed'} _navigate={_navigate.bind(this)}>
          <View>
            <Text>Loading...</Text>
          </View>  
        </OurDrawer>
        )
    }
    return (
      <OurDrawer topBarFilterVisible={false} topBarName={'Feed'} _navigate={_navigate.bind(this)}>
        <View>
          {this.state.events.map( (event, index) => <EventCard openModal={this.openEvent.bind(this)} event={event} index={index}/>)}
        </View>
        <NewEventFab onPress={this.openModal.bind(this)}/> 
        <EventModal visibility={this.state.eventModal} event={this.state.eventId}/>
        <NewEventModal visibility={this.state.addEventModal}/>
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