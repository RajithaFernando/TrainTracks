import React, {Component} from 'react';
// 
import {Image,FlatList, Platform, StyleSheet, Text, View,TouchableOpacity, Alert} from 'react-native';
// import { connect } from 'react-redux'
// import { viewTrains } from './store/actons/index'
// import SearchInput from './src/components/SearchInput/SearchInput';
// import List from './src/components/List/List';
import Traindetails from './src/components/Traindetails/Traindetails';
// import Listitem from './src/components/Listitem/Listitem'

// import firebase from 'react-native-firebase';
import firebase from '@firebase/app';
require('firebase/auth');
require('@firebase/database');
require("firebase/firestore");

// const firebase = require("firebase");

// const config = {
//   apiKey: "AIzaSyDin3Ah4eMirhFDz0eizFjGRx03C1v2IMo",
//   authDomain: "shareplaces-5a4c6.firebaseapp.com",
//   databaseURL: "https://shareplaces-5a4c6.firebaseio.com",
//   projectId: "shareplaces-5a4c6",
//   storageBucket: "shareplaces-5a4c6.appspot.com",
//   messagingSenderId: "316261499606"
// };
// firebase.initializeApp(config);


// class App extends Component{
  





// var connectedRef = firebase.database().ref(".info/connected");
// connectedRef.on("value", function(snap) {
//   if (snap.val() === true) {
//     alert("connected");
//     console.log('Connected you Mother Fucker')
//   } else {
//     alert("not connected");
//     console.log('Not Connected you Dumb cunt')

//   }
// });



// console.log(userId);
// console.log(userId);
// console.log(username)
// const firestore = require("firebase/firestore");
// db = firebase.firestore();
// db.settings({ timestampsInSnapshots: true });
// firebase-auth()

// type Props = {};
class App extends Component {


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
      // var citiesRef = db.collection('cities');
      var trainsref = database.collection('trains')
      var query = trainsref.get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }

        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });





      // database.collection('trains').get().then()(function(snap){
      //   console.log(snap.val());
      // })
  }


  state = {
    inputt:['Train 1', 'Train 2', 'Train 3'],
    
    selectedTrain : null,
    trains : [
      {name:'Udaya devi',time:'8:00',stat:'Running',key:1},
      {name:'Badulu Kumari',time:'9:00',stat:'Not Running',key:2},
      {name:'Ruhunu Kumari',time:'10:00',stat:'Running', key:3}
    ],
    inp :false
  };


  // var const details = 
// inputHandler = search =>{
//   this.setState(prevState =>{
//     return{
//       inputt: prevState.inputt.concat(search)
//     };
//   });
// };
// selectHandler = index =>{
//   this.setState(prevState =>{
//     return{
//       selectedTrain: prevState.
//     }
//   }

//   )

//   // this.setState(prevState=>{
//   //   return {
//   //     inputt:prevState.inputt.filter((inp,i) =>{
//   //       return i !== index;
//   //     })
//   //   };
//   // });
// }
selectHandler= ()=>{
  this.setState(prevState=>{
    return{
      selectedTrain :prevState.trains[1].key
      
    }
  }
  )
  // alert(this.state.selectedTrain)  
  
}
buttonHandller = ()=>{
  this.setState({
    selectedTrain : null
  })
  
  }
  

  render(){  
    // var leng = this.state.trains.train1.length();
    
    var code =[];
    // //////////////////////////////////////////////////////////

    // const items = {1:"a",2: "b", 3:"c"}
    
    // const abc = Object.keys(this.state.trains).map(function(key2){
    //   return "ITEM" 
    // })
    // let def
    // for (j in items){
    //   return def = def + 'Item'
    // }
    // const listoftrains =  items.map(function(key){
    //   return "Name " 
    // }) 
    // alert(abc)
    // alert(def)
    
    for (let i=0; i <3; i++ ){
      code.push(
      <TouchableOpacity onPress = {this.selectHandler}>
   
        <View style={styles.list} >
            <Text> no : {i +1} 
              {this.state.trains[i].name} 
              Time :  {this.state.trains[i].time}   
              Status :  {this.state.trains[i].stat}   
            </Text>
        </View>
      </TouchableOpacity>
      )
    }
    
    // console.log('firebase is :' +firebase)
    // console.log(this.state)
    // console.log('firabase name is ' +firebase.app().name)
    console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR')
    // {state.trains.train1.name}
    // var ref = database.ref('trains')

    // ref.on('value', gotData , errData)
    // function gotData (data){
    //   // console.log(data.val())
    //   // console.log('Got your data')
    //   var trainlist = data.val()
    //   var keys = Object.keys(trainlist)
    //   console.log(keys)
      

    // }
    // function errData (err){
    //   console.log(err)
    //   console.log('Errorrrr')
    // }
    
    



    return (
      <View style={styles.container}> 
      
        
        <Traindetails train = {this.state.selectedTrain}  buttonHandller = {this.buttonHandller}/> 
        
          <Text style={styles.txt}>Train Tracks {this.state.selectedTrain}</Text>
          <View style={styles.list}>{code}
          <FlatList
        
        data={[{name: 'Rajitha'}, {name: 'Fernando'},{name: 'Rajitha'}, {name: 'Fernando'}]}
        renderItem={({item}) => <Text>{item.name}</Text>}
      /> 

          </View>
          <Image source={require('./img/logo.png')} style={styles.img} />
          
          {/* alert(this.state.selectedTrain) */}
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
    backgroundColor: '#141823',
    fontWeight: 'bold',
    fontSize: 30,
    color:'white'
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


// const mapStateToProps = state =>{
//   train_val = state.trains_red.trains
// }

// const mapDispatchToProps = dispatch =>{
//   onClickOnIt :() =>dispatch(viewTrains());
//   // onsomeother : (var) => dispatch(somesome(var))

// }
// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;