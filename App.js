import React, {Component} from 'react';
import {Image, Platform, StyleSheet, Text, View,} from 'react-native';

import SearchInput from './src/components/SearchInput/SearchInput';
import List from './src/components/List/List';
import Traindetails from './src/components/Traindetails/Traindetails';

// type Props = {};
export default class App extends Component {
  state = {
    inputt:['Train 1', 'Train 2', 'Train 3']
  };
inputHandler = search =>{
  this.setState(prevState =>{
    return{
      inputt: prevState.inputt.concat(search)
    };
  });
};
selectHandler = index =>{
  this.setState(prevState=>{
    return {
      inputt:prevState.inputt.filter((inp,i) =>{
        return i !== index;
      })
    };
  });
};
  render(){  
    return (
      <View style={styles.container}>  
          {/* <Traindetails />  */}
          <Image source={require('./img/logo.png')} style={styles.img} />
          <SearchInput onPlaceAdded ={this.inputHandler} />
          <List 
            inputt = {this.state.inputt}
            select = {this.selectHandler} 
          />  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  img: {
    height: 100,
    justifyContent: "center",
    resizeMode: "contain",
  }
});