import React, { Component } from "react";
import { StyleSheet, Text, View ,Dimensions, Button} from 'react-native';

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
            lat:null,
            lon:null,
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
            code:[]
        }
        
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
          
        
    }
    componentDidMount(){
        const database = firebase.firestore()
        var trainsref = database.collection('trains').doc('fdwIkN8LK0rg33ncpsJ9')
        
        setInterval(  
        getdata =()=>{ trainsref.get().then(function(doc) {    
            if (doc.exists) {
                var lat = doc.data().lat
                var lon = doc.data().lon
                alert(lat)
                fun =(lat, lon) => this.setState({
                    lat :lat,
                    lon:lon
                    })
                }
            else{
                // alert('Sorry ! Data Not Available')
                }
            }).catch(err => {
                // alert('Error getting Data. Check your Connection and try Again');
                });
            }, 10000)
        
    }
    
    render(){
        return(
            <View style={styles.container}> 
                <MapView
                    initialRegion={this.state.loc}
                    region={this.state.loc}
                    style={styles.map}
                >
                {this.state.lat && <Marker coordinate={{
                    latitude:this.state.lat ,
                    longitude: this.state.lon}}
                    image={require('./img/icon.png')} >
                </Marker>}
                </MapView>
                
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