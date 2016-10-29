import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';

import Drawer from 'react-native-drawer';


import TopBar from './TopBar.js';
import OurDrawer from './OurDrawer.js';
import Menu from './Menu.js';
import UserCard from './UserCard.js';

import _navigate from './navigateConfig.js';

export default class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      searchString: '',
      view: 'Friends'
    };
  }

  componentWillMount(){
    this.getFriends();
  }

  searchUsers(search){
    var search = search || '';
    fetch('http://localhost:3000/api/users/'+ search,{
      method: 'GET',
      headers: { "Content-Type" : "application/json" }
      // body: JSON.stringify({userId: this.props.user._id, search: search})
    })
    .then(response => {
      return response.json();
    })
    .then( users => {
      this.setState({
        feed: users,  
        loading: false
      });
    })
    .catch( error => {
      console.log(error);
    });
  }
  getFriends(search){
    var search = search || '';
    fetch('http://localhost:3000/api/friends/getFriends',{
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({userId: this.props.user._id, search: search})
    })
    .then(response => {
      return response.json();
    })
    .then( friends => {
      if(search.length>0){
        this.setState({
          feed: friends,  
          loading: false
        });
      }
      if(search.length===0){
        this.setState({
          feed: friends,
          friends: friends,
          loading: false
        })
      }
    })
    .catch( error => {
      console.log(error);
    });
  }

  filterFriends(){
    this.setState({view: 'Friends'});
    this.setState({feed: this.state.friends});
  }

  filterUsers(){
    this.setState({view: 'Users'});
    this.setState({feed: []});
  }

  filterRequests(){
    //add a requestCard view later to have a add friend or not option
    this.setState({view: 'Requests'});
    this.setState({feed: this.props.user.requests});
  }

  onSearchTextChange(event){
    this.setState({searchString: event.nativeEvent.text});
  }

  onSearchGo(){
    if(this.state.view === 'Friends'){
      this.getFriends(this.state.searchString);
    }
    if(this.state.view === 'Requests'){

    }
    if(this.state.view === 'Users'){
      this.searchUsers(this.state.searchString);
    }

  }
  render(){
    if (this.state.loading) {
      return (
        <OurDrawer topBarFilterVisible={false} topBarName={'Feed'} _navigate={_navigate.bind(this)}>
          <View>
            <Text>Loading...</Text>
          </View>  
        </OurDrawer>
        )
    }


    return (
      <OurDrawer topBarName={'Profile'} _navigate={_navigate.bind(this)}>
        <View style={styles.container}>
          <Image style={styles.image} source={{uri: this.props.user.photoUrl}}/>
          <Text style={styles.description}>
            Name: {this.props.user.firstName + ' ' + this.props.user.lastName}
          </Text> 
          <Text style={styles.description}>
            Email: {this.props.user.email}
          </Text> 
          <View style={styles.flowRight}>
            <TouchableOpacity onPress={this.filterFriends.bind(this)} style={styles.button}>
              <Text style={styles.buttonText}>Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.filterUsers.bind(this)} style={styles.button}>
              <Text style={styles.buttonText}>Search Users</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.filterRequests.bind(this)} style={styles.button}>
              <Text style={styles.buttonText}>Friend Requests</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.flowRight}>
            <TextInput
              style={styles.searchInput}
              placeholder='Search via name or email'
              onChange={this.onSearchTextChange.bind(this)}
              />
            <TouchableOpacity onPress={()=> this.onSearchGo()} style={styles.button}>
              <Text style={styles.buttonText}>Go</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {this.state.feed.map( 
            (friend, index) => { 
              return (
                <UserCard view={this.state.view} user={friend} index={index}/>
              )
            }
          )}
        </View>
      </OurDrawer>
    )
  }
};

var styles = StyleSheet.create({
  description: {
    marginBottom: 10,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
    // backgroundColor: 'blue',
    // borderColor: 'black',
    // borderWidth: 1,
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
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginRight: 2
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    color: 'black',
  },
  image: {
    borderRadius:8,
    height:200, 
    width:200, 
    marginRight:10,
    marginBottom: 20
  }
});

//  const drawerStyles = {
//   drawer: {
//   backgroundColor: 'red', 
//   shadowColor: '#000000', 
//   shadowOpacity: 0.8, 
//   shadowRadius: 3,
//   }
// }

// const styles = StyleSheet.create({
//   listElem: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'white',
//     marginTop: 20,
//     alignItems: 'center',
//     borderStyle: 'solid',
//     borderWidth: 2,
//     borderColor: 'black',
//     width: 225,
//     padding: 10,
//     paddingLeft: 80

//   },
//   button: {
//     fontSize: 20,
//     color: 'white',
//     backgroundColor: 'red',
//     padding: 10,
//     alignItems: 'center',
//     fontWeight: 'bold',
//     justifyContent: 'center',
    
//   }
// });