import React, {Component} from "react";


 import firebase from '@firebase/app';
 require('firebase/auth');
 require('@firebase/database');
 require("firebase/firestore");

import {FlatList,Text,TouchableWithoutFeedback,View, TouchableOpacity} from 'react-native';

import Card from '../Card';
import CardSection from '../CardSection';

class TrainDetails extends Component {
    
    componentDidMount(){
            let key = 0;
            const { navigation } = this.props;
            const startStation = navigation.getParam('startStation', 'Veyangoda');
            const endStation   = navigation.getParam('endStation', 'Ragama');
            console.log('navprop',startStation,endStation)
            var db = firebase.firestore();
            let trainRef = db.collection("Train");
            let query = trainRef.where(startStation+".stops", "==", "true")
                                .where(endStation+".stops", "==", "true")
            
            query.get().then(snapshot=>{
            
              snapshot.docs.forEach(doc=>{
 
                
                object = { key : key.toString(),
                      title : doc.id, 
                      description :'Departure from '+ startStation +' : '+ doc.get(startStation+'.Dep') +'\n'+
                                   'Arrival at '    + endStation   +' : '+ doc.get(endStation+'.Arr')   +'\n'+
                                   'Description'                                                        +'\n'+                                               
                                   'Available Classes'
                                   ,
                      pressed: false
                    }
                this.setState(prevState => ({
                        data: [...prevState.data,object]
                      }))
                    
                key++
                
                
              })
            })

    }
    constructor(props) {
        
        super(props);
        
        this.state={data:[]
        ,
        pressed: false
        ,pressedButton:0
        }
        
        
        
    }
    static navigationOptions ={
        headerTitle:'Train Details',
        headerStyle: {
            backgroundColor:'orange'
        }
    }

    
    
    onButtonPress = (ik) =>{
        if(this.state.data[ik].pressed==false){
            this.setState(Object.assign(this.state.data[ik],{pressed:true}));
        }else{
            this.setState(Object.assign(this.state.data[ik],{pressed:false}));
        }
    }
    onButtonPress2=(itemDes,itemKey)=> {
        if(this.state.data[itemKey].pressed==true){
                return(itemDes)
            }    
    }

    linkRender=(itemKey)=>{
        if(this.state.data[itemKey].pressed==true){
            return(<TouchableOpacity 
                onPress={
                        ()=>this.props.navigation.navigate('Location',{
                        trainName: this.state.data[itemKey].title,
                      })
                }>
            <Text style={{fontSize: 16, paddingLeft:15}}>location</Text></TouchableOpacity>)
    
        }
    }

    render(){
        return(
            <Card>
            <FlatList
            data={this.state.data}
            extraData={this.state}
            renderItem={({item}) =>  
                <View>
                <CardSection>
                    <TouchableWithoutFeedback 
                    onPress={this.onButtonPress.bind(this,item.key)}>
                    <Text style={{color:'red',fontSize: 18, paddingLeft:10}}>{item.title}</Text>
                    </TouchableWithoutFeedback>
                </CardSection>
                <Text style={{fontSize: 16, paddingLeft:15}}>
                {
                    this.onButtonPress2(item.description,item.key)                  
                }     
                </Text> 
                {
                   this.linkRender(item.key)
                }     
                </View>   
            }
            />
            </Card>
        )
    }
}

export default TrainDetails;