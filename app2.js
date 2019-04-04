import React, {Component} from 'react';
import {Image,FlatList, Platform, StyleSheet, Text, View,TouchableOpacity, Alert} from 'react-native';

import firebase from '@firebase/app';
require('firebase/auth');
require('@firebase/database');
require("firebase/firestore");


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        code:[]
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
      

      // var code=[]
      const database = firebase.firestore()
      // var citiesRef = db.collection('cities');
      var trainsref = database.collection('trains')
      var query = trainsref.get().then(snapshot => {
        
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }
        snapshot.docs.forEach(doc => {
          // data = data + doc.data()
          // console.log(doc.data().name)
          alert(doc.data().name)

          this.setState(prevState => ({
            code: [...prevState.code.concat( 
            <TouchableOpacity onPress = {this.selectHandler}>
              <View><Text>{doc.data().name} </Text></View>
              </TouchableOpacity>)    ]
            



            
          }
            ))

          // code.push(<View>
          //             <Text>
          //               {doc.data().name}
          //             </Text>
          //           </View>
          //           )
          console.log('code is ')
          console.log(doc.id, '=>', data =doc.data())
          // name = doc.data().name
        });
        
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }
  render(){  
    return (
        <View style={styles.container}> 
            

            <View style={styles.list}>{this.state.code}</View>

            <View style={styles.list}></View>
            
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
    // margin:5,
    marginLeft:10,
    marginRight:10,
    // marginTop:5,
    // border:2,
}
});

export default App;