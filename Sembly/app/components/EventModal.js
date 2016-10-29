// EventModal.js
import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import Spinner from './Spinner.js';
import UserCard from './UserCard.js';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class EventModal extends Component {
  constructor (props) {
    super(props);
    this.state = {visible: false, loading: true};
  }
  getEvent() {
  	fetch('http://localhost:3000/api/events/' + this.props.event)
    .then(response => {
      return response.json();
    })
    .then( event => {
      this.setState({event: event, loading: false, users: event.invitedUsers});
    })
    .catch( error => {
      console.log(error);
    });
  }
  changeUsers(type) {
  	if (type === 'invited') {
  		this.setState({users: this.state.event.invitedUsers})
  	} else if (type === 'saved') {
  		this.setState({users: this.state.event.savedUsers})
  	} else {
  		this.setState({users: this.state.event.checkedInUsers})
  	}
  }
  saveEvent() {
  	fetch('http://localhost:3000/api/events/saveEvent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: this.props.user._id,
        eventId: this.state.event._id
      })
    })
    .then(data => {
      this.getEvent();
    });
  }
  checkIn() {
  	fetch('http://localhost:3000/api/events/checkIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: this.props.user._id,
        eventId: this.state.event._id
      })
    })
    .then(data => {
      this.getEvent();
    });
  }
  getUsers() {
  	if (this.state.users.length === 0) {
  		return (<Text>No Users</Text>)
  	} else {
  		return this.state.users.map((user, index) => <UserCard user={user} index={index} freinds={'users'} />);
  	}
  }
  getRender () {
  	if (this.state.loading === true && this.props.visibility) {
  		this.getEvent();
  		return (<Spinner/>)
  	} else if (this.state.loading) {
  		return (<Spinner/>)
  	} else {
  		return (
  			<View>
  				<View>
	  				<Image source={{uri: this.state.event.image}}/>
	  				<Text>{this.state.event.name}</Text>
  				</View>
  				<View>
  				  <Text>{this.state.event.startTime}</Text>
  				</View>
  				<View>
  					<TouchableOpacity onPress={e => this.saveEvent()}><Text>Save Event!</Text></TouchableOpacity>
  					<TouchableOpacity onPress={e => this.checkIn()}><Text>Check In!</Text></TouchableOpacity>
  				</View>
  				<View>
  					<TouchableOpacity onPress={e => this.changeUsers('invited')}><Text>Invited</Text></TouchableOpacity>
  					<TouchableOpacity onPress={e => this.changeUsers('saved')}><Text>Saved</Text></TouchableOpacity>
  					<TouchableOpacity onPress={e => this.changeUsers('checkedin')}><Text>Checked In</Text></TouchableOpacity>
  				</View>
  				<View>
  				{this.getUsers()}
  				</View>
  			</View>
  			)
  	}
  }
  render () {
    let context = this;
    return (
      <Modal ref={'EventModal'} style={styles.modal} isOpen={this.props.visibility}>
        <View style={styles.container}>
          {this.getRender()}
          <TouchableOpacity onPress={() => {context.setState({loading: true}); context.refs.EventModal.close()}}>
            <Icon style={styles.closeButton} name='close'/>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }
}


const styles = StyleSheet.create({
  modal: {
    marginTop: 40
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  closeButton:{
    fontSize: 30
  }
})