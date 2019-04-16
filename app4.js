import React, { Component } from "react";
import { StyleSheet, Text, View ,Dimensions} from 'react-native';

// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-maps';


import RNLocation from 'react-native-location';

import firebase from '@firebase/app';
require('firebase/auth');
require('@firebase/database');
require("firebase/firestore");
// import Geolocation from 'react-native-geolocation-service';


//   RNLocation.checkPermission({
//     ios: 'whenInUse', // or 'always'
//     android: {
//       detail: 'coarse' // or 'fine'
//     }
//   });

  
export default class App4 extends Component {
    constructor(){
        super();
        this.state = {
            ready: false,
            where: {lat:null, lng:null},
            error: null,
            lat: null,
            lon: null,
            loc :{
                latitude: 7.093546,
                longitude: 79.993703,
                latitudeDelta: 0.0122,
                longitudeDelta:
                    Dimensions.get("window").width /
                    Dimensions.get("window").height *
                    0.0122
                },
                
        }
    }
    //\
    
    
    
        

    

    componentDidMount(){
        
      RNLocation.configure({
        distanceFilter: 100, // Meters
        desiredAccuracy: {
          ios: "best",
          android: "balancedPowerAccuracy"
        },
        // Android only
        androidProvider: "auto",
        interval: 5000, // Milliseconds
        fastestInterval: 10000, // Milliseconds
        maxWaitTime: 5000, // Milliseconds
        })
    
        RNLocation.requestPermission({
            ios: "whenInUse",
            android: {
              detail: "fine"
            }
          }).then(granted => {
            if (granted) {
              this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
                /* Example location returned
                {
                  speed: -1,
                  longitude: -0.1337,
                  latitude: 51.50998,
                  accuracy: 5,
                  heading: -1,
                  altitude: 0,
                  altitudeAccuracy: -1
                  floor: 0
                  timestamp: 1446007304457.029
                }
                */
               let lat = locations[0].latitude;
               let lon = locations[0].longitude;
               this.setState({  lat: lat, lon: lon });
                                
               if (this.state.lat !== null){
                writefun()
               }
               else{
                 alert('state is null')
               }
                
                })
              }
              else{
                  alert('permission naa lu')
              }
            })
            firebase.initializeApp({
                apiKey: "AIzaSyDin3Ah4eMirhFDz0eizFjGRx03C1v2IMo",
                authDomain: "shareplaces-5a4c6.firebaseapp.com",
                databaseURL: "https://shareplaces-5a4c6.firebaseio.com",
                projectId: "shareplaces-5a4c6",
                storageBucket: "shareplaces-5a4c6.appspot.com",
                messagingSenderId: "316261499606"
              });
              
              const database = firebase.firestore()
              
              var reference = database.collection('trains').doc('fdwIkN8LK0rg33ncpsJ9')
            
              function writefun () {
                lat2 = String(this.state.lat)
                lon2 = String(this.state.lon)
                reference.set({
                lat: lat2,
                lng: lon2 
                  
                //   timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(()=>{
                        // alert('Firebase success')
                    }).catch(function(error) {
                  alert('Error writing new message to Firebase Database');
                });
              }
                    
          }



    render() {
        return (
            <View style={styles.container}>
                
                <MapView
                initialRegion={this.state.loc}
                region={this.state.loc}
                style={styles.map}
                >
                </MapView>
                <Text>{}</Text>
              
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
    container: {
    //   ...StyleSheet.absoluteFillObject,
        height: '100%',
      width: '100%',
    //   justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      width:'100%',
      height:'50%'
    },
       
    big: {
        fontSize: 48
    }
});
