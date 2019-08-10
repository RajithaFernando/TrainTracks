import React, { Component } from "react";
import { StyleSheet, Text, View ,Dimensions, Button, ActivityIndicator} from 'react-native';
import * as Progress from 'react-native-progress';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

// import RNLocation from 'react-native-location';
import Fire from './config/Fire'
import firebase from '@firebase/app';
require('firebase/auth');
require('@firebase/database');
require("firebase/firestore");


export default class app5newuser extends Component {

    intervalID = 0
    constructor(props){
        super(props);
        this.state = {
            name:[],
            lats:[],
            lngs:[],
            passed:[],
            LeftStation:'',
            RightStation:'',
            TotalDistanceval:'',
            progressbar:'',
            side:'',
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
        var nameeeeee
        var lat = null 
        var lon = null
        var timeUpdate = null
        var timedif = null
        const database = Fire.firestore()
        var trainsref = database.collection('trains').doc('fdwIkN8LK0rg33ncpsJ9')
        var timeNow = Date.now()
        var side =''
        var trainref = database.collection('trains').doc('locations')
        this.intervalID = setInterval( ()=>{ trainsref.get().then(function(doc) {    
            if (doc.exists) {
                lat = doc.data().lat
                lon = doc.data().lng
                timeUpdate = doc.data().time
                side = doc.data().Details.side
                var region = {...this.state.region}
                region.latitude =  lat
                region.longitude = lon
                region.latitudeDelta =  0.005
                region.longitudeDelta = 0.005
                this.setState({region})
                timedif = Math.round((timeNow -  timeUpdate)/60000)
                // if (timedif > 10){
                // }
                this.setState({
                    lat :lat,
                    lon :lon,
                    timedif : timedif,
                    side : side,
                })
                var query = trainref.get().then(function(doc) {
                    if (doc.exists){
                        // lert('this'+doc.data().names)
                        names = doc.data().names
                        lats = doc.data().latitude
                        lngs = doc.data().longitude
                        // alert(lats)
                        var tlat =lat
                        var tlon = lon
                        var leng =names.length
                        distancefrom = []
                        var closest
                        
                        for (i=0;i <leng; i++){
                            var dist = distance(lats[i],lngs[i],tlat,tlon)
                            distancefrom.push(dist)
                        }
                        // lert('came hear')
                        closest = Math.min(...distancefrom)
                        alert('closest is '+ closest)
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
                                if (side == 'up'){
                                    this.setState({
                                        LeftStation:names[indexOfClosest],
                                        RightStation:names[upstation],
                                        progressbar: (1-progress)
                                    })
                                }
                                else {
                                    this.setState({
                                        LeftStation:names[upstation],
                                        CamefromName:names[indexOfClosest],
                                        progressbar:progress
                                    })
                                }
                                // alert('Going to'+names[indexOfClosest])
                            }
                            else {
                                alert('train is between downstation and station')
                                var distancebetween = distance(lats[downstation],lngs[downstation],lats[indexOfClosest],lngs[indexOfClosest])
                                var progress =(closedown / distancebetween)
                                alert('Distance Between' + distancebetween)
                                if (side=='up'){
                                    this.setState({
                                        LeftStation:names[indexOfClosest],
                                        RightStation:names[downstation],
                                        progressbar: progresss
                                    })
                                }
                                else{
                                    this.setState({
                                        LeftStation:names[indexOfClosest],
                                        RightStation:names[downstation],
                                        progressbar: (1-progress)
                                    })
                                }
                                
                            }
                        }
                    }    
                }.bind(this))
                
            }
            else{
                alert('Sorry ! Data Not Available')
            }
        }.bind(this)).catch(err => {
                // lert('Error getting Data. Check your Connection and try Again');
                });
            
        }, 10000)
        alert(this.state.GoingtoName)
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
                <View style={styles.progress}> 
                    <Button title={this.state.LeftStation} style={styles.buttonStyle}> </Button>
                    <Progress.Bar progress={this.state.progressbar } width={200} height={20} style={styles.bar} animationType='timing' borderRadius={10} />
                    <Button title={this.state.RightStation} style={styles.buttonStyle}></Button>
                </View>
                <Text>{this.state.region.longitude} --state of region</Text>
                <Text>{this.nameeeeee}Going to name </Text>
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
    progress:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    bar2:{
        padding:10,
        height:50, 
        width:(Dimensions.get("window").width)*35/100
    },
    bar :{
        padding:10,
        height:50, 
        width:(Dimensions.get("window").width)*50/100
    },
    buttonStyle:{
        width:(Dimensions.get("window").width)*25/100
    },
})