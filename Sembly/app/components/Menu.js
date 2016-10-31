import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Navigator,
  ListView,
  TouchableOpacity,
  Image
} from 'react-native';

import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Menu extends Component {
  constructor(props) {
    super(props);
  }

        

  render(){
    return (
      <View>
        <View style={styles.imageView}>
            { this.props.user ? <Image style={styles.image} source={{uri: this.props.user.photoUrl}}/> : <Text></Text>}
        </View>
        <Text style={styles.description}>
           {this.props.user ? this.props.user.firstName + ' ' + this.props.user.lastName : <Text></Text>}
        </Text> 
        <View style={styles.menuView}>
          <View style={styles.flowRight}>
            <Icon name='account-circle' style={styles.icon}></Icon>
            <TouchableOpacity style={styles.listTouchable} onPress={()=> {this.props._navigate('Profile')}} >
            	<Text style={styles.listElem}>Profile</Text>
            </TouchableOpacity>
          </View>
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
      </View>

    );
  }

}

const styles = StyleSheet.create({
  menuView: {
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderColor: '#aeb3ba',

  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingLeft: 12
  },
  imageView: {
    marginTop: 60,
    alignItems: 'center'
  },
  description: {
    marginBottom: 10,
    fontSize: 15,
    textAlign: 'center',
    color: 'black'
  },
  icon: {
    fontSize: 26,
    marginRight: 10,
    marginTop: 15,
    color: 'gray',

  },
  image: {
    borderRadius: 8,
    height: 150, 
    width: 150, 
    marginRight:10,
    marginBottom: 20
  },
	firstListTouchable: {
		// borderStyle: 'solid',
		// borderTopWidth: 2,
  //   borderBottomWidth: 2,
  //   borderColor: 'black',
    // marginTop: 20,
	},
	listTouchable: {
		// borderStyle: 'solid',
  //   borderBottomWidth: 2,
  //   borderColor: 'black',
    marginTop: 10

	},
  listElem: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: 'black',
    alignItems: 'center',

    padding: 10,
    // paddingLeft: 80

  }
})
     //  <ListView
     //    dataSource={this.state.dataSource}
     //    renderRow={(item) => this._renderMenuItem(item)}
    	// />
