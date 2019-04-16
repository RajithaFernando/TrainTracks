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
    // iOS Only
    // activityType: "other",
    // allowsBackgroundLocationUpdates: false,
    // headingFilter: 1, // Degrees
    // headingOrientation: "portrait",
    // pausesLocationUpdatesAutomatically: false,
    // showsBackgroundLocationIndicator: false,
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
         alert(locations[0].latitude)
         alert(locations[0].longitude)
        })
      }
      else{
          alert('permission naa lu')
      }
    })
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
            loc :{
                latitude: 7.093546,
                longitude: 79.993703,
                latitudeDelta: 0.0122,
                longitudeDelta:
                    Dimensions.get("window").width /
                    Dimensions.get("window").height *
                    0.0122
                }
                
        }
    }
    //\
    
    
    componentDidlMount(){
        RNLocation.configure({ distanceFilter: null });
        RNLocation.getLatestLocation({ timeout: 60000 })
        .then(latestLocation => {
            // Use the location here
            alert(latestLocation)
            alert('something')
            })
            alert('something 2')

        }
        
        

    // componentDidMount() {
    //     // Instead of navigator.geolocation, just use Geolocation.
    //     if (hasLocationPermission) {
    //         Geolocation.getCurrentPosition(
    //             (position) => {
    //                 console.log(position);
    //             },
    //             (error) => {
    //                 // See error code charts below.
    //                 console.log(error.code, error.message);
    //             },
    //             { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    //         );
    //     }
    // }

    componentWillMount(){


        // geolocation.setRNConfiguration(config);
        // geolocation.requestAuthorization();
        // geolocation.getCurrentPosition(geo_success, [geo_error], [geo_options]);

        
        // 1 1111111111111111111111
        
        // let geoOptions = {
        //     enableHighAccuracy: true,
        //     timeOut: 20000,
        //     maximumAge: 60 * 60 * 24
        // };
        
        // this.setState({ready:false, error: null });
        // navigator.geolocation.getCurrentPosition( this.geoSuccess, this.geoFailure,geoOptions);
        
        // geoSuccess = (position) => {
        //     // console.log(position.coords.latitude);
        //     // console.log(position)
        //     alert(position.coords.latitude)
        //     alert(position.coords.longitude )
        //     alert('something')
        //     // this.setState({loc:{latitude:position.coords.latitude,
        //     //                     longitude:position.coords.longitude}
        //     //                 })
            
        //     this.setState({
        //         ready:true,
        //         where: {lat: 'abc',lng:position.coords.longitude }
                
        //     })

        //     // hear update query
        // }
        // geoFailure = (err) => {
        //     this.setState({error: err.message});
        //     alert (err.message)
        //     alert('something 3')
        // }
        // 1111111111111111111111111111111111111111111

        
            // alert('came here')
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
              var lats = this.state.where.lat
              var lngs = this.state.where.lng 
            //   alert(this.state.where.lat)

              function writefun () {
                reference.set({
                lat: String(lats),
                lng:String(lngs) 
                  
                //   timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(()=>{
                        // alert('Firebase success')
                    }).catch(function(error) {
                  alert('Error writing new message to Firebase Database');
                });
              }
              writefun() 

                
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
