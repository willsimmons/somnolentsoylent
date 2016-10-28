import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

import {
  MKProgress,
  MKSpinner,
} from 'react-native-material-kit';

const styles = StyleSheet.create({
container: {
  padding: 30,
  marginTop: 200,
  alignItems: 'center'
},
buttonText: {
  fontSize: 20,
  fontWeight: 'bold',
  color: 'white',
  alignSelf: 'center'
},
button: {
  height: 36,
  flex: 1,
  backgroundColor: 'red',
  borderColor: 'red',
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 10,
  alignSelf: 'stretch',
  justifyContent: 'center'
},
spinner: {
    width: 40,
    height: 40
  }

});

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build();

export default class LoginPage extends Component {
  constructor(props){
    super(props);
    this.state = {loading: false}
  }

  _navigate() {
    this.props.navigator.push({
        name: 'Map'
    });
  }

  componentWillMount () {
    this.props.getLocation();
  }

  login() {
    this.setState({loading: true});
     fetch('http://localhost:3000/api/users/login',{
       method: 'POST',
       headers: { "Content-Type" : "application/json" },
       body: JSON.stringify({email: 'spencer@test.com', password: 'test'})
     })
     .then(response => {
       return response.json();
     })
     .then( user => {
       this.props.setUser(user);
       this._navigate();
     })
   }

  render(){
    if (this.state.loading) {
      return (<View style={styles.container}><SingleColorSpinner /></View>)
    }
    else {  
      return (
        <View>
          <View style={styles.container}>
            <TouchableOpacity onPress={(e)=>{this.login()}} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      );  
    }
  }
};

