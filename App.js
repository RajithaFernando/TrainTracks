import React, {Component} from 'react';
import {Image, Platform, StyleSheet, Text, View,TouchableOpacity, Alert} from 'react-native';

// import SearchInput from './src/components/SearchInput/SearchInput';
// import List from './src/components/List/List';
import Traindetails from './src/components/Traindetails/Traindetails';
import Listitem from './src/components/Listitem/Listitem'
// type Props = {};
export default class App extends Component {
  state = {
    inputt:['Train 1', 'Train 2', 'Train 3'],
    
    selectedTrain : null,
    trains : {
      train1:{
        name:'Udaya devi',
        time:'8:00',
        stat:'Running',
        key:1
      },
      train2:{
        name:'Badulu Kumari',
        time:'9:00',
        stat:'Not Running',
        key:2
      },
      train3:{
        name:'Ruhunu Kumari',
        time:'10:00',
        stat:'Running',
        key:3
      }
    },
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
      selectedTrain :prevState.trains.train1.key
      
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
    for (let i=0; i <5; i++ ){
      code.push(
      <TouchableOpacity onPress = {this.selectHandler}>
   
        <View style={styles.list} >
            <Text> no : {i +1} {this.state.trains.train1.name} Time :  {this.state.trains.train1.time}   Status :  {this.state.trains.train1.stat}   </Text>
        </View>
    </TouchableOpacity>
      )
    }
    // {state.trains.train1.name}
    return (
      <View style={styles.container}>  
        
        <Traindetails train = {this.state.selectedTrain}  buttonHandller = {this.buttonHandller}/> 
        
          <Text style={styles.txt}>Train Tracks {this.state.selectedTrain}</Text>
          <View style={styles.list}>{code}</View>
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