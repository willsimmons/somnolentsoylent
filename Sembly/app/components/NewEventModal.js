import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';

import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class NewEventModal extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    let context = this;
    return (
      <Modal ref={'newEventModal'} style={styles.modal} isOpen={this.props.visibility}>
        <View>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity onPress={() => context.refs.newEventModal.close()}>
            <Icon style={styles.closeButton} name='close'/>
            </TouchableOpacity>
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Create a New Event!</Text>
          </View>
          <View style={styles.titleInputContainer}>
            <TextInput
              style={styles.titleInput}
              placeholder='Enter a title for your Event'/>
          </View>
          //Add location
          //Choose Tags
          //handleImage
          //Start Time Picker
          //End Time Picker
          //Invite Friends
          //Set Visibility
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
  titleInputContainer: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignSelf: 'stretch'
  },
  titleInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    textAlign: 'center'
  }
})
