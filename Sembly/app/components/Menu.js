import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Navigator,
  ListView,
  TouchableOpacity
} from 'react-native';

import Button from 'react-native-button';

export default class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
    	<View>
	    	<TouchableOpacity style={styles.firstListTouchable} onPress={()=> {this.props._navigate('Profile')}} >
	      	<Text style={styles.listElem}>Profile</Text>
	      </TouchableOpacity>
    		<TouchableOpacity style={styles.listTouchable} onPress={()=> {this.props._navigate('Map')}}>
	      	<Text style={styles.listElem}>Map</Text>
	      </TouchableOpacity>
	      <TouchableOpacity style={styles.listTouchable} onPress={()=> {this.props._navigate('Feed')}}>
	      	<Text style={styles.listElem}>Feed</Text>
	      </TouchableOpacity>
	      <TouchableOpacity style={styles.listTouchable} onPress={()=> {this.props._navigate('Invites')}}>
	      	<Text style={styles.listElem}>Invites</Text>
	      </TouchableOpacity>
	      <TouchableOpacity style={styles.listTouchable} onPress={()=> {this.props._navigate('Saved')}} >
	      	<Text style={styles.listElem}>Saved</Text>
	      </TouchableOpacity>
	    </View>
    );
  }

}

const styles = StyleSheet.create({
	firstListTouchable: {
		borderStyle: 'solid',
		borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'black',
    marginTop: 20,
	},
	listTouchable: {
		borderStyle: 'solid',
    borderBottomWidth: 2,
    borderColor: 'black',

	},
  listElem: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    alignItems: 'center',
    width: 225,
    padding: 10,
    paddingLeft: 80

  }
})
     //  <ListView
     //    dataSource={this.state.dataSource}
     //    renderRow={(item) => this._renderMenuItem(item)}
    	// />
