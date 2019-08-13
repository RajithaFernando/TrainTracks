import React, { Component } from "react";
import { StyleSheet, Text, View ,Dimensions, Button, Alert} from 'react-native';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import RNLocation from 'react-native-location';

import Fire from './config/Fire'
//drivers 
// import firebase from '@firebase/app';
require('firebase/auth');
require('@firebase/database');
require("firebase/firestore");


export default class App5 extends Component {
    
    intervalID = 0
    componentWillMount(){
        var stations = []
        var lats =[]
        var lons = []
        var code =''  
          
        const database = Fire.firestore()
        // var reference = database.collection('trains').doc('fdwIkN8LK0rg33ncpsJ9')
        var stationsref = database.collection('stations')
        
        
    }
    
    

    
    componentDidMount() {
		
        const { navigation } = this.props;
        const trainName = navigation.getParam('trainName');
        const database = Fire.firestore()
        var reference = database.collection('trains').doc('fdwIkN8LK0rg33ncpsJ9')
        var user = Fire.auth().currentUser;
        var sec = Date.now(); //Current Seconds
        var d = Date(Date.now()); 
        update = d.toString() 
        this.intervalID = setInterval ( ()=> {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.setState({
                        region: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0422,
                        }
                    })
                    alert(position.coords.latitude)
                    alert(sec)
                    reference.update({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude, 
                        time: sec,
                        update :update,
                    }).then(()=>{
                        alert('firebase updated')
                        }).catch(function(error) {
                            alert('Error writing new message to Firebase Database');
                            })
                },
                (error) => console.log(error.message),
                { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
            );
         }, 5000)
        //  clearInterval(interval1)
         
    }
    


    constructor(){
        super();
        this.state = {
            lat:"",
            lon:"",
            message:"",
            stations:"",   
            lats:[],
            lons:[],
            loc :{
                latitude: 7.093546,
                longitude: 79.993703,
                latitudeDelta: 0.04,
                longitudeDelta:
                    Dimensions.get("window").width /
                    Dimensions.get("window").height *
                    0.0122
                },
            code:[],
            updating:true,
            region: {
                latitude: 7.093546,
                longitude: 7.093546,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0422,
            }
        }
        
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
      }
    render(){
        return(
            <View style={styles.container}> 
                <MapView
                    region={this.state.region}
                    style={styles.map}
                >
                <Marker coordinate={{
                    latitude:this.state.region.latitude,
                    longitude: this.state.region.longitude}}
                    image={require('./img/icon.png')} >
                </Marker>
                </MapView>
                <Button title ="Stop Providing Location" 
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