// EventCard.js
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View
} from 'react-native';

var testEvent = { __v: 0,
  endTime: new Date('Thu Oct 27 2016 20:13:44 GMT-0700 (PDT)'),
  name: 'Basketball',
  location: [ -122.4066, 37.7786 ],
  image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Basketball.png',
  _id: '58126e082dd1b517c1122674',
  savedUsers: [],
  visibility: 'public',
  checkedInUsers: [],
  invitedUsers:
   ['58126e052dd1b517c1122670',
     '58126e052dd1b517c1122671',
     '58126e052dd1b517c1122672',
     '58126e052dd1b517c1122673'],
  tags: [ 'sports', 'basketball' ],
  startTime: new Date('Thu Oct 27 2016 14:13:44 GMT-0700 (PDT)')};

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
      <TouchableOpacity key={this.props.event._id} style={{
        justifyContent: 'flex-start',
        flexDirection: 'row',
        backgroundColor: background,
        padding: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 1
      }}>
        <Image style={{height:55, width:55, marginRight:10}}source={{uri: this.props.event.image}}/>
        <View style={styles.text}>
          <Text style={styles.title}>{this.props.event.name}</Text>
          <Text style={styles.instructions}>{time.toString()}</Text>
          <Text style={styles.stats}>{stats}</Text>
        </View>
      </TouchableOpacity>
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
  }
});
