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


export default class app5 extends Component {
    
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
        // const trainName = navigation.getParam('trainName');
        const database = Fire.firestore()
        var reference = database.collection('trains').doc('fdwIkN8LK0rg33ncpsJ9')
        var user = Fire.auth().currentUser;
        var sec = Date.now(); //Current Seconds
        var d = Date(Date.now()); 
		update = d.toString() 
		
		
			leng =  trainlat.length - 1
			
		var distancearray=[]
		var distance =(stlat,stlon,trlat,trlon)=>{
				var R = 6371; // km (change this constant to get miles)
				var dLat = (trlat-stlat) * Math.PI / 180;
				var dLon = (trlon-stlon) * Math.PI / 180;
				var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
					Math.cos(stlat * Math.PI / 180 ) * Math.cos(trlat * Math.PI / 180 ) *
					Math.sin(dLon/2) * Math.sin(dLon/2);
				var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
				var d = R * c;
				return d;
			}

        this.intervalID = setInterval ( ()=> {
            navigator.geolocation.getCurrentPosition(
                position => {

					for (i = 0; i<leng; i++){
						var dist = distance(trainlat[i],trainlon[i], position.coords.latitude, position.coords.longitude)
						distancearray.push(dist)
					}
					var myvar = Math.min(...distancearray)
					if (myvar < 0.5){
						alert('langa inne')
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
					}
					else{
						alert('dura inne')
						
					}
					// alert('Distance:' + myvar )
					// alert('Min imum distance : ' Math.min(...distancearray))
                    
                },
                (error) => console.log(error.message),
                { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
            );
         }, 6000)
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

const trainlat =[6.933045,
	6.932912,
	6.9328254,
	6.9326691,
	6.9323263,
	6.9317813,
	6.9310494,
	6.9316707,
	6.9308427,
	6.9299347,
	6.9294651,
	6.9292709,
	6.9290742,
	6.9288174,
	6.9287098,
	6.9284091,
	6.9286556,
	6.9283787,
	6.9282352,
	6.9282035,
	6.9283099,
	6.9283982,
	6.9284546,
	6.9285234,
	6.9289472,]

const trainlon = [79.852716,
	79.8534974,
	79.8538112,
	79.8530261,
	79.854732,
	79.8559648,
	79.8570646,
	79.8572015,
	79.8574259,
	79.8579493,
	79.8582918,
	79.8586981,
	79.8590767,
	79.8596036,
	79.8596878,
	79.8602367,
	79.8597085,
	79.8611286,
	79.8616011,
	79.862358,
	79.8628232,
	79.8627866,
	79.863342,
	79.863442,
	79.8647078,]