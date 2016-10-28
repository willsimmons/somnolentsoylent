// UserCard.js
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View
} from 'react-native';

export default class UserCard extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    var background = this.props.index % 2 === 0 ? '#F5FCFF' : '#fff'
    return (
      <TouchableOpacity key={this.props.user._id} style={{
        justifyContent: 'flex-start',
        flexDirection: 'row',
        backgroundColor: background,
        padding: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 1
      }}>
        <Image style={styles.image} source={{uri: this.props.user.photoUrl}}/>
        <View style={styles.text}>
          <Text style={styles.title}>{this.props.user.firstName+' '+this.props.user.lastName}</Text>
          <Text style={styles.instructions}>{this.props.user.email}</Text>
          <Text style={styles.states}>{this.props.user.friends.length + ' Friends'}</Text>
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
  },
  image: {
  	borderRadius:4,
  	height:55, 
  	width:55, 
  	marginRight:10
  }
});
