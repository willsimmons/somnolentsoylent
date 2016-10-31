import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  DatePickerIOS
} from 'react-native';

import Modal from 'react-native-modalbox';
import { MKCheckbox, MKButton } from 'react-native-material-kit'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class NewEventModal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      friends: [],
      newEventName: '',
      newEventStartTime: new Date(),
      newEventTags: '',
    }
  }

  componentWillMount () {
    fetch('http://localhost:3000/api/friends/getFriends',{
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({userId: this.props.userId, search: ''})
    })
    .then(response => {
      return response.json();
    })
    .then( friends => {
      this.setState({
        friends: friends
      });
    })
    .catch( error => {
      console.log(error);
    });
  }
  handleSubmit () {
    let eventToBePosted = {
      name: this.state.newEventName,
      location: [],
      startTime: this.state.newEventStartTime,
      image: 'http://blogs-images.forbes.com/steveolenski/files/2015/07/Messe_Luzern_Corporate_Event.jpg',
      tags: [],
      invitedUsers: [],
      visibility: ''
    }

    eventToBePosted.location[0] = this.props.eventCoords.longitude;
    eventToBePosted.location[1] = this.props.eventCoords.latitude;

    if(this.refs.visibilityCheckbox.state.checked) {
      eventToBePosted.visibility = 'invite'
    } else {
      eventToBePosted.visibility = 'public'
    }

    eventToBePosted.tags = this.state.newEventTags.split(' ');

    this.state.friends.forEach((friend, index) => {
      if(this.refs['friend' + index].state.checked){
        eventToBePosted.invitedUsers.push(this.refs['friend' + index].props.friendCheckId)
      }
    })

    fetch('http://localhost:3000/api/events',{
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(eventToBePosted)
    })
    .then(response => {
      console.log('~~~~~response headers', response)
    })
    .catch( error => {
      console.log(error);
    });
  }
  render () {
    let context = this;
    return (
      <Modal ref={'newEventModal'} style={styles.modal} isOpen={this.props.modalVisibility}>
        <View>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity onPress={() => context.refs.newEventModal.close()}>
            <Icon style={styles.closeButton} name='close'/>
            </TouchableOpacity>
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.header}>Create a New Event!</Text>
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder='Enter a title for your Event'
              onChangeText={(text) => this.setState({newEventName: text})}
              />
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder='Separate tags for your Event with a space'
              onChangeText={(text) => this.setState({newEventTags: text})}
              />
          </View>
          <View style={styles.dateInputContainer}>
            <DatePickerIOS
              date={this.state.newEventStartTime}
              onDateChange={(d) => {this.setState({newEventStartTime:d})}}
            />
          </View>
          <View style={styles.friendsCheckGroup}>
            <Text>Invite your friends!</Text>
            {this.state.friends.map((friend, index) => {
              return (
                <View style={styles.friendCheck} key={friend._id}>
                  <MKCheckbox
                    checked={false} ref={'friend' + index} friendCheckId={friend._id}
                  />
                  <Text>{friend.firstName + ' ' + friend.lastName}</Text>
                </View>
              )
            })}
          </View>
          <View>
            <Text>Make your event invite only?</Text>
            <MKCheckbox ref={'visibilityCheckbox'} checked={false}/>
          </View>
          <View style={styles.createEventButtonContainer}>
            <MKButton
              backgroundColor='red'
              shadowRadius={2}
              shadowOffset={{width:0, height:2}}
              shadowOpacity={.7}
              shadowColor="black"
              onPress={this.handleSubmit.bind(this)}
              >
              <Text pointerEvents="none"
                    style={{color: 'white', fontWeight: 'bold',}}>
                CREATE EVENT
              </Text>
            </MKButton>
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
  closeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  closeButton:{
    color: 'grey',
    fontSize: 30
  },
  headerContainer:{
    flexDirection: 'row',
    justifyContent: 'center'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  textInputContainer: {
    justifyContent:'center',
    padding: 10
  },
  textInput: {
    height: 36,
    width: 300,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    textAlign: 'center'
  },
  friendsCheckGroup: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  friendCheck: {

    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  createEventButtonContainer: {
    justifyContent: 'center'
  }
})
