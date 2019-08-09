import React, { Component } from "react";
import { StyleSheet, Text, View ,Dimensions, Button, ActivityIndicator} from 'react-native';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

// import RNLocation from 'react-native-location';
import Fire from './config/Fire'
import firebase from '@firebase/app';
require('firebase/auth');
require('@firebase/database');
require("firebase/firestore");


export default class App5user extends Component {

    intervalID = 0
    constructor(props){
        super(props);
        this.state = {
            lat:0,
            lon:0,
            timedif:0,
            message:"",
            stations:"",   
            region:{
                latitude: 7.999999,
                longitude: 79.999999,
                latitudeDelta: 0.015*5,
                longitudeDelta:
                    Dimensions.get("window").width /
                    Dimensions.get("window").height *
                    0.0121*5
                },
            ex:''
        }
        
    }
    

    componentDidMount(){
        // firebase.initializeApp({
        //     apiKey: "AIzaSyDin3Ah4eMirhFDz0eizFjGRx03C1v2IMo",
        //     authDomain: "shareplaces-5a4c6.firebaseapp.com",
        //     databaseURL: "https://shareplaces-5a4c6.firebaseio.com",
        //     projectId: "shareplaces-5a4c6",
        //     storageBucket: "shareplaces-5a4c6.appspot.com",
        //     messagingSenderId: "316261499606"
        //   });
        var lat = null 
        var lon = null
        var timeUpdate = null
        var timedif = null
        const database = Fire.firestore()
        var trainsref = database.collection('trains').doc('fdwIkN8LK0rg33ncpsJ9')
        var timeNow = Date.now()
        
        this.intervalID = setInterval( ()=>{ trainsref.get().then(function(doc) {    
            if (doc.exists) {
                lat = doc.data().lat
                lon = doc.data().lng
                timeUpdate = doc.data().time
                var region = {...this.state.region}
                region.latitude =  lat
                region.longitude = lon
                region.latitudeDelta =  0.005
                region.longitudeDelta = 0.005
                this.setState({region})
                timedif = Math.round((timeNow -  timeUpdate)/60000)
                if (timedif > 10){

                }
                this.setState({
                    lat :lat,
                    lon :lon,
                    timedif : timedif
                })

                }
            else{
                alert('Sorry ! Data Not Available')
                }
            }.bind(this)).catch(err => {
                // alert('Error getting Data. Check your Connection and try Again');
                });
            
            }, 10000)
        
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
      }
    render(){
        return(
            <View style={styles.container}> 
                {this.state.lat ? 
                    
                    <MapView
                        region={this.state.region}
                        style={styles.map}
                        onRegionChange={this.onRegionChange}
                    >
                    <Marker coordinate={{
                        latitude:this.state.region.latitude,
                        longitude: this.state.region.longitude}}
                        image={require('./img/icon.png')} >
                    </Marker>
                    </MapView>
                
                : <ActivityIndicator size="large" color="#0000ff" />

                }
                
                
                <Text>{this.state.region.longitude} --state of region</Text>
                <Text>{this.state.region.latitude}state of region </Text>
                <Text>Last Updated {this.state.timedif} Munits Ago </Text>
                <Text>{this.state.ex}state of loc</Text>
                <Button title ="<- Go Back" 
                    onPress={()=>this.props.navigation.navigate('TrainDetails2')}>
                </Button>
                
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