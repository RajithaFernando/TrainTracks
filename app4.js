import React, { Component } from "react";
import { StyleSheet, Text, View ,Dimensions} from 'react-native';

// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-maps';
  
  
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
    // 
    componentWillMount(){
        let geoOptions = {
            enableHighAccuracy: true,
            timeOut: 20000,
            maximumAge: 60 * 60 * 24
        };
        this.setState({ready:false, error: null });
        navigator.geolocation.getCurrentPosition( this.geoSuccess, 
                                                this.geoFailure,
                                                geoOptions);
        }
        geoSuccess = (position) => {
            console.log(position.coords.latitude);
            console.log(position)
            alert('Lat ' + position.coords.latitude)
            alert('long' + position.coords.longitude )
            // this.setState({loc:{latitude:position.coords.latitude,
            //                     longitude:position.coords.longitude}
            //                 })
            
            this.setState({
                ready:true,
                where: {lat: position.coords.latitude,lng:position.coords.longitude }
            })

            // hear update query



        }
        geoFailure = (err) => {
            this.setState({error: err.message});
            alert (err.message)
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