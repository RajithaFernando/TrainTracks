import React, {Component} from "react";
import { View, Text, StyleSheet, Image } from 'react-native';

import Fire from './config/Fire'
require('firebase/auth');
require('@firebase/database');
require("firebase/firestore");

export default class searchwithloc extends Component {

	state = {
		currentLongitude: 'unknown', //Initial Longitude
		currentLatitude: 'unknown', //Initial Latitude
	  };

	  componentDidMount() {
        const database = Fire.firestore()
        var reference = database.collection('stationlocations').doc('weyangoda-fort')
        
        
        // update = d.toString() 
        this.intervalID = setInterval ( ()=> {
			var time = Date.now(); 
			var latitude
			var longitude
			var timestamp
			var query = reference.get().then (function(doc){
				navigator.geolocation.getCurrentPosition(
					position => {
						latitude =doc.data().lat + ','+position.coords.latitude,
						longitude= doc.data().lon + ',' +position.coords.longitude,
						timestamp = doc.data().timestamp + ','+ time,
						reference.update({
							lat: latitude,
							lon: longitude, 
							timestamp: timestamp,
						}).then(()=>{
							alert('firebase updated')
							}).catch(function(error) {
								alert('Error writing new message to Firebase Database');
								})
					},
					(error) => console.log(error.message),
					{ enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
					
				);
				
				
			})
            
			
		}, 1000*15)
        //  clearInterval(interval1)
         
    }
	  componentWillUnmount = () => {
		clearInterval(this.intervalID);
	  };
	  render() {
		return (
		  <View style={styles.container}>
			<Image
			  source={{ uri: 'https://png.icons8.com/dusk/100/000000/compass.png' }}
			  style={{ width: 100, height: 100 }}
			/>
			<Text style={styles.boldText}>You are Here</Text>
			<Text
			  style={{
				justifyContent: 'center',
				alignItems: 'center',
				marginTop: 16,
			  }}>
			  Longitude: {this.state.currentLongitude}
			</Text>
			<Text
			  style={{
				justifyContent: 'center',
				alignItems: 'center',
				marginTop: 16,
			  }}>
			  Latitude: {this.state.currentLatitude}
			</Text>
		  </View>
		);
	  }
	}
	
	const styles = StyleSheet.create({
	  container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 50,
		padding: 16,
	  },
	  boldText: {
		fontSize: 30,
		color: 'red',
	  },
	});
	
