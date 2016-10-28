// EventCard.js
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View
} from 'react-native';

import EventModal from './EventModal.js';

export default class EventCard extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    var time;
    var stats = this.props.event.invitedUsers.length + ' Users invited  ' + this.props.event.savedUsers.length + ' Users Saved  ' + this.props.event.checkedInUsers.length + ' Users Checked In';
    if (this.props.event.startTime - Date.now() < 0) {
      time = this.props.event.endTime
    } else {
      time = this.props.event.startTime
    }
    var background = this.props.index % 2 === 0 ? '#F5FCFF' : '#fff'
    return (
      <View>
        <EventModal event={this.props.event._id} />
        <TouchableOpacity key={this.props.event._id} style={{
          justifyContent: 'flex-start',
          flexDirection: 'row',
          backgroundColor: background,
          padding: 10,
          borderBottomColor: 'grey',
          borderBottomWidth: 1
        }}>
          <Image style={styles.image} source={{uri: this.props.event.image}}/>
          <View style={styles.text}>
            <Text style={styles.title}>{this.props.event.name}</Text>
            <Text style={styles.instructions}>{time.toString()}</Text>
            <Text style={styles.stats}>{stats}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  text: {
    alignItems: 'flex-start'
  },
  title: {
    fontSize:20,
    color: 'black'
  },
  stats: {
    fontSize:12,
    color: 'black'
  },
  instructions: {
    color: 'black'
  },
  image: {
    borderRadius:3,
    height:55, 
    width:55, 
    marginRight:10
  }
});
