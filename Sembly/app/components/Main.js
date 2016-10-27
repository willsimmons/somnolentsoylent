import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

import Drawer from 'react-native-drawer';

import TopBar from './TopBar.js';
import OurDrawer from './OurDrawer.js';
import Menu from './Menu.js';



export default class Main extends Component {
  constructor(props){
    super(props);
  }
  _navigate(name) {
    if(name === 'Invites'){
      this.props.navigator.push({
        name: 'Invites'
      });
    }
  }

    render(){
      return (
        <OurDrawer _navigate={this._navigate.bind(this)}>
          <View>
            <TouchableOpacity onPress={ () => this._navigate('Invites') }>
              <Text style={styles.button}>MAIN TEST</Text>
            </TouchableOpacity>
          </View>  
        </OurDrawer>
      )
    }
};
  // }
  // render(){
  //   return (
  //     <Drawer
  //       ref={(ref) => this._drawer = ref}
  //       type="overlay"
  //       content={<Menu _navigate={this._navigate.bind(this)}/>}
  //       tapToClose={true}
  //       open={false}
  //       openDrawerOffset={0.4}
  //       panCloseMask={0.4}
  //       closedDrawerOffset={-3}
  //       styles={drawerStyles}
  //       tweenHandler={(ratio) => ({
  //               main: { opacity:(2-ratio)/2 }
  //       })}>
  //       {
  //         <View>
  //           <TopBar openDrawer={() => {this._drawer.open()} }/>
  //           <TouchableOpacity onPress={ () => this._navigate('Invites') }>
  //               <Text style={styles.button}>MAIN TEST</Text>
  //           </TouchableOpacity>
  //         </View>  
  //       }
  //   </Drawer>
      
  //   );
//};

 // <View>
 //        <TopBar />
 //        <TouchableOpacity onPress={ () => this.props.navigator.pop() }>
 //            <Text style={styles.button}>MAIN TEST</Text>
 //        </TouchableOpacity>
 //      </View>  

 const drawerStyles = {
  drawer: {
  backgroundColor: 'red', 
  shadowColor: '#000000', 
  shadowOpacity: 0.8, 
  shadowRadius: 3,
  }
}

const styles = StyleSheet.create({
  listElem: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'black',
    width: 225,
    padding: 10,
    paddingLeft: 80

  },
  button: {
    fontSize: 20,
    color: 'white',
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
    
  }
});