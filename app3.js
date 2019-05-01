import React from 'react';
import { Button, View, Text,TouchableOpacity,StyleSheet ,ActivityIndicator} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

import Locationpage from './locationpage';
import App5 from './app5';

import firebase from '@firebase/app';
require('firebase/auth');
require('@firebase/database');
require("firebase/firestore");



class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        code:[],
        animation : true

      }
    }

  selectHandler= ()=>{
    alert('SOmething Pressed')
      }
      
  componentWillMount(){


    
    firebase.initializeApp({
        apiKey: "AIzaSyDin3Ah4eMirhFDz0eizFjGRx03C1v2IMo",
        authDomain: "shareplaces-5a4c6.firebaseapp.com",
        databaseURL: "https://shareplaces-5a4c6.firebaseio.com",
        projectId: "shareplaces-5a4c6",
        storageBucket: "shareplaces-5a4c6.appspot.com",
        messagingSenderId: "316261499606"
      });
      
      const database = firebase.firestore()
  
      var trainsref = database.collection('trains')
      var query = trainsref.get().then(snapshot => {
        
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }
        snapshot.docs.forEach(doc => {
          
          // alert(doc.data().name)


          this.setState(prevState => ({
            animation:false,
            code: [...prevState.code.concat( 
            <TouchableOpacity onPress = {() => this.props.navigation.navigate('App5')}>
              <View style={styles.list}><Text >{doc.data().name}  </Text></View>
            </TouchableOpacity>)    ] 
          }
            ))

         
          console.log('code is ')
          console.log(doc.id, '=>', data =doc.data())
          // name = doc.data().name
        });
        
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>


        <View style={styles.list}>{this.state.code}</View>
        {/* <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        /> */}


        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff"  animating = {this.state.animation}/>
        </View>
      </View>
    );
  }
}
<App5></App5>
{/* <Locationpage></Locationpage> */}

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    App5: {
      screen: App5,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    width:'100%'
  },
  img: {
    height: 100,
    justifyContent: "center",
    resizeMode: "contain",
  },
  txt: {
    backgroundColor: 'white',
    // fontfontWeight: 'bold',
    fontSize: 30,
    color:'white',
    width:'100%'
  },
  list:{
    width:'100%',
    padding:10,
    backgroundColor:'#eee',
    margin:5,
    marginLeft:10,
    marginRight:10,
    // marginTop:5,
    // border:2,
},
container: {
  flex: 1,
  justifyContent: 'center'
},
horizontal: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  padding: 10
}
});
