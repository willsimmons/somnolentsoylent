// UserCard.js
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class UserCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: this.props.view
    }
  }

  addFriend() {

  }

  removeFriend() {

  }

  acceptRequest() {
  	
  }

  render () {
    var background = this.props.index % 2 === 0 ? '#F5FCFF' : '#fff'
    var message;
    if (this.props.friends === 'friends') {
    	message = 'Remove '+ this.props.user.firstName +' from your friends list?'
    } else if (this.props.friends === 'users') {
    	message = 'Request ' + this.props.user.firstName +' to your friends list?'
    } else {
    	message = 'Accept ' + this.props.user.firstName +'\'s friend request?'
    }
    return (
      	  // <Modal>
      	  // 	<View>
	      	 //  	<Text> {message} </Text>
	      	 //  	<TouchableOpacity></TouchableOpacity>
	      	 //  	<TouchableOpacity></TouchableOpacity>
      	  // 	</View>
      	  // </Modal>
      <View>
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
          <View style={styles.buttons}>
            <TouchableOpacity>
              {this.props.view === 'Requests' ? <Icon name='add-circle' style={styles.icon}></Icon> : <Text></Text>}
            </TouchableOpacity>
            <TouchableOpacity>
              {this.props.view === 'Requests' ? <Icon name='remove' style={styles.icon}></Icon> : <Text></Text>}
            </TouchableOpacity>
          </View>
	      </TouchableOpacity>
      </View>
    );
  }
};

//{ this.props.topBarFilterVisible ? <Icon name='filter-list' style={styles.content}></Icon> : <Text></Text> }

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
  },
  buttons: {
    flexDirection: 'row',
    marginLeft: 90,
    alignSelf: 'stretch'
  },
  icon: {
    fontSize: 30,
    marginRight: 10,
    marginTop: 15,
    color: 'gray'
  }
});
