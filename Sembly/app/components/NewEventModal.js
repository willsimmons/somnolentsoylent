import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import Modal from 'react-native-modalbox';

export default class Map extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <Modal style={styles.modal} isOpen={this.props.visibility}>
        <View>
          <Text>Hello modal!</Text>
        </View>
      </Modal>
    )
  }
}


const styles = StyleSheet.create({
  modal: {
    marginTop:20
  }
})
