// EventModal.js
import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

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
      this.setState({event: event, loading: false});
    })
    .catch( error => {
      console.log(error);
    });
  }
  getRender () {
  	if (this.state.loading === true) {

  		return (<Text>Loading...</Text>)
  	} else {

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