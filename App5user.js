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
            name:[],
            lats:[],
            lngs:[],
            passed:[],
            GoingtoName:'',
            CamefromName:'',
            TotalDistanceval:'',
            progressbar:'',
            
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
        var names=[]
        var lats=[]
        var lngs=[]

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
                var trainref = database.collection('trains').doc('locations')
                var query = trainref.get().then(function(doc) {
                    if (doc.exists){
                        // lert('this'+doc.data().names)
                        names = doc.data().names
                        lats = doc.data().latitude
                        lngs = doc.data().longitude
                        return
                    }    
                })
                var tlat 
                var tlon
                var leng 
                distancefrom = []
                var closest

                var trainsref2 = database.collection('trains').doc('fdwIkN8LK0rg33ncpsJ9')
                var query2 = trainsref2.get().then(function(doc){
                    // if (doc.exists){
                    //     tlat = doc.data().lat
                    //     tlon = doc.data().lng
                    //     // lert(tlat)
                    // }
                    tlat = lat
                    tlon = lon
                    leng = names.length 
                    for (i=0;i <leng; i++){
                        var dist = distance(lats[i],lngs[i],tlat,tlon)
                        distancefrom.push(dist)

                        // lert (i)
                        // lert(' dura = ' +distancefrom )
                        }
                    closest = Math.min(...distancefrom)
                    // lert('closest is '+ closest)
                    var indexOfClosest = distancefrom.indexOf(closest)
                    // lert('index of closest' + indexOfClosest)
                    
                    if (closest<0.5){
                        alert("Train is In 0  "+names[indexOfClosest] )
                    }
                    else if (indexOfClosest == 0){
                        alert("train left staion -0.25- of closest" )
                    }
                    else{
                        var upstation = indexOfClosest - 1
                        var downstation = indexOfClosest +1
                        var closeup = distance(lats[upstation],lngs[upstation],tlat,tlon)
                        var closedown = distance(lats[downstation],lngs[downstation],tlat,tlon)

                        if (closeup < closedown){
                            alert('train is between upstation and station')
                            var distancebetween = distance(lats[upstation],lngs[upstation],lats[indexOfClosest],lngs[indexOfClosest])
                            var progress = (closeup / distancebetween)
                            this.setState({
                                GoingtoName:names[indexOfClosest],
                                CamefromName:names[upstation],
                                progressbar:progress
                            })
                        }
                        else {
                            alert('train is between downstation and station')
                        }
                    }
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