import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,} from 'react-native';

import SearchInput from './src/components/SearchInput/SearchInput';
import List from './src/components/List/List';

// type Props = {};
export default class App extends Component {
  state = {
    inputt:[]
  };
inputHandler = search =>{
  this.setState(prevState =>{
    return{
      inputt: prevState.inputt.concat(search)
    };
  });
};
delHandler = index =>{
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
          <SearchInput onPlaceAdded ={this.inputHandler} />
          <List 
            inputt = {this.state.inputt}
            delt = {this.delHandler} 
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
    backgroundColor: '#F5FCFF',
  }
});