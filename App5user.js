import React, { Component } from "react";
import { StyleSheet, Text, View ,Dimensions, Button, ActivityIndicator} from 'react-native';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

// import RNLocation from 'react-native-location';

import firebase from '@firebase/app';
require('firebase/auth');
require('@firebase/database');
require("firebase/firestore");


export default class App5user extends Component {
    constructor(){
        super();
        this.state = {
            lat:0,
            lon:0,
            message:"",
            stations:"",   
            lats:[],
            lons:[],
            loc :{
                latitude: 7.093546,
                longitude: 79.993703,
                latitudeDelta: 0.0122,
                longitudeDelta:
                    Dimensions.get("window").width /
                    Dimensions.get("window").height *
                    0.0122
                },
            code:[],
            marker :{

            }
        }
        
    }
    

    componentDidMount(){
        firebase.initializeApp({
            apiKey: "AIzaSyDin3Ah4eMirhFDz0eizFjGRx03C1v2IMo",
            authDomain: "shareplaces-5a4c6.firebaseapp.com",
            databaseURL: "https://shareplaces-5a4c6.firebaseio.com",
            projectId: "shareplaces-5a4c6",
            storageBucket: "shareplaces-5a4c6.appspot.com",
            messagingSenderId: "316261499606"
          });
        var lat = null 
        var lon = null
        const database = firebase.firestore()
        var trainsref = database.collection('trains').doc('fdwIkN8LK0rg33ncpsJ9')
        
        setInterval(  
        getdata =()=>{ trainsref.get().then(function(doc) {    
            if (doc.exists) {
                lat = doc.data().lat
                lon = doc.data().lon
                // alert(lat)
               
                this.setState({
                    lat :lat,
                    lon :lon,
                    loc:{
                        latitude: lat,
                        longitude: lon,}
                    })

                }
            else{
                alert('Sorry ! Data Not Available')
                }
            }.bind(this)).catch(err => {
                // alert('Error getting Data. Check your Connection and try Again');
                });
            newfun2 =()=>{
                    this.setState({
                        lat :lat,
                        lon :lon,
                        })
                }
            
            }, 10000)
        
    }
    
    render(){
        return(
            <View style={styles.container}> 
                {this.state.lat ? 
                    
                    <MapView
                    region={this.state.lat}
                    onRegionChange={this.onRegionChange}
                    />
                
                : <ActivityIndicator size="large" color="#0000ff" />

                }
                
                
                <Text>{this.state.lon}state of lat</Text>
                <Text>{this.state.lat}state of</Text>
                <Button title ="press " onPress={this.newfun2}></Button>
                
            </View>
        )
    }
}




const styles = StyleSheet.create({
    
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    map: {
        width:'100%',
        height:'50%'
    },
})