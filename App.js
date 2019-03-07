/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button} from 'react-native';

import Listitem from './src/components/Listitem/Listitem'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Fuck you\n' +
    'This works ',
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    search:'',
    inputt:[]
  }
searchHandler = val =>{
  this.setState({
    search:val
    });
}

inputHandler = ()=>{
  if (this.state.search.trim()===""){
    return
  }

  this.setState(prevState =>{
    return{
      inputt: prevState.inputt.concat(prevState.search)
    }
  })
}

  render() {
    const Output = this.state.inputt.map((inp, i) =>(
      <Listitem key={i} 
      itemname={inp} 
      pressed = {()=> alert('Pressed MOther fucker : ' + i)}
      />
    ));
    return (

      
      <View style={styles.container}>
     
        
          <Text style={styles.welcome}>Train Tracks</Text>
          <Text style={styles.instructions}>For People, By Peoples</Text>
          <Text style={styles.instructions}>{instructions}</Text>
          <View style={styles.newCont}>
          <TextInput 
          style={{width:300, borderColor:"black", borderWidth:1}}
          value={this.state.search} 
          onChangeText={this.searchHandler}
        />
        <Button style={styles.button}
        onPress={this.inputHandler }
          title='Search'
        />

      </View>
      <View style={styles.list}>
        {Output}
      </View>
      
        
        
      </View>
    );
  }
}
// onPress={this.inputHandler }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black',
    fontWeight: 'bold'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button:{
    padding:20,
  },
  newCont:{
    // flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  list:{
    width:'100%'
  }
});
