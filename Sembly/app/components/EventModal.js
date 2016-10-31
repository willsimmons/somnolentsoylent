// EventModal.js
import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView
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
  componentWillMount() {
  	this.setState({loading:true})
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
  		return this.state.users.map((user, index) => <UserCard user={user} index={index} friends={'users'} />);
  	}
  }
  getRender () {
  	if (this.state.loading === true) {
  		this.getEvent();
  		return (<Spinner/>)
  	} else {
  		return (
  			<View>
	  			<Image style={styles.image} source={{uri: this.state.event.image}}/>
  				<View>
	  				<Text style={styles.title} >{this.state.event.name}</Text>
  				</View>
  				<View>
  				  <Text style={styles.description}>{this.state.event.startTime}</Text>
  				</View>
  				<View style={styles.flowRight}>
  					<TouchableOpacity style={styles.button} onPress={e => this.saveEvent()}><Text style={styles.buttonText}>Save Event!</Text></TouchableOpacity>
  					<TouchableOpacity style={styles.button} onPress={e => this.checkIn()}><Text style={styles.buttonText}>Check In!</Text></TouchableOpacity>
  				</View>
  				<View style={styles.flowRight}>
  					<TouchableOpacity style={styles.button} onPress={e => this.changeUsers('invited')}><Text style={styles.buttonText}>Invited</Text></TouchableOpacity>
  					<TouchableOpacity style={styles.button} onPress={e => this.changeUsers('saved')}><Text style={styles.buttonText}>Saved</Text></TouchableOpacity>
  					<TouchableOpacity style={styles.button} onPress={e => this.changeUsers('checkedin')}><Text style={styles.buttonText}>Checked In</Text></TouchableOpacity>
  				</View>
  				<ScrollView>
  				{this.getUsers()}
  				</ScrollView>
  			</View>
  			)
  	}
  }
  render () {
    let context = this;
    return (
      <Modal ref={'EventModal'} style={styles.modal} isOpen={true}>
        <View style={styles.container}>
          {this.getRender()}
          <View style={styles.absoluteX}>
	          <TouchableOpacity onPress={() => {this.props.close(); context.refs.EventModal.close()}}>
	            <Icon style={styles.closeButton} name='close'/>
	          </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
}


const styles = StyleSheet.create({
  modal: {
    marginTop: 40
  },
  scroll: {
  	flex: 1
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  title: {
  	fontSize: 40,
  	color: 'black',
  	alignSelf: 'center'
  },
  absolute: {
    position: 'absolute',
    top: 40,
    left: 15
  },
  absoluteX: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
    closeButton:{
    fontSize: 30,
    zIndex: 3
  },
  description: {
    marginBottom: 10,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
    borderColor: 'red',
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderColor: 'grey',
    borderRadius: 8,
    color: 'black',
  },
  image: {
    height:200, 
    width: Dimensions.get('window').width,
    marginBottom: 20,
    zIndex: 1
  }
})