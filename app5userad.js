import React, { Component } from "react";
import { StyleSheet, Text, View ,Dimensions, Button, ActivityIndicator} from 'react-native';
import * as Progress from 'react-native-progress';
// import { Icon } from 'react-native-elements'

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

// import { AdMobBanner } from 'react-native-admob';

// import RNLocation from 'react-native-location';
import Fire from './config/Fire'
import firebase from '@firebase/app';
require('firebase/auth');
require('@firebase/database');
require("firebase/firestore");


export default class app5userad extends Component {

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
            latitude:'',
            longitude:'',
            latitudeDelta: 0.015*5,
            longitudeDelta:
                Dimensions.get("window").width /
                Dimensions.get("window").height *
                0.0121*5, 
            
            ex:'',
            lastupdatedtime:'',
            late:false,
            instation:false,
        }
        
    }
    componentDidMount(){
        var names=[]
        var lats=[]
        var lngs=[]
        let lat 
        let lon 
        var timeUpdate = null
        var timedif = null
        const database = Fire.firestore()
		var trainsref = database.collection('trains').doc('fdwIkN8LK0rg33ncpsJ9')
		var trainsref22 = database.collection('trains').doc('fdwIkN8LK0rg33ncpsJ9')
        var timeNow = Date.now()
        var side =''
		var trainref = database.collection('trains').doc('locations')
		
		let quert2 = trainsref22.onSnapshot(docSnapshot => {
			
			if (docSnapshot.exists){
				lat = docSnapshot.data().lat
                lon = docSnapshot.data().lng
                timeUpdate = docSnapshot.data().time
                side = docSnapshot.data().Details.side
                // var region = {...this.state.region}
                // region.latitude =  lat
                // region.longitude = lon
                this.setState({
                    latitude:lat,longitude:lon})
                timedif = Math.round((timeNow -  timeUpdate)/1000)
                var h = Math.floor(timedif / 3600);
                var m = Math.floor(timedif % 3600 / 60);
                var s = Math.floor(timedif % 3600 % 60);
                if (h==0 && m ==0){
                    this.setState({lastupdatedtime:'Location Last Updated ' + s + ' Seconds ago'})
                }
                else if (h==0){
                    this.setState({lastupdatedtime:'Location Last Updated ' +m+' Munits and '+ s +' Seconds ago'})
                    if (m>10){
                        this.setState({late:true})
                    }
                }
                else if (h>0){
                    this.setState({lastupdatedtime:'Location Last Updated ' +h+ ' Hours and ' + s + ' Munits ago',late:true})
                    
                }
                this.setState({
                    lat :lat,
                    lon :lon,
                    timedif : timedif,
                    side : side,
                })
                var query = trainref.get().then(function(doc) {
                    if (doc.exists){
                        names = doc.data().names
                        lats = doc.data().latitude
                        lngs = doc.data().longitude
                        var tlat =lat
                        var tlon = lon
                        var leng =names.length
						distancefrom = []
						// lert(tlat +'lert t lat')
                        var closest
                        
                        for (i=0;i <leng; i++){
                            var dist = distance(lats[i],lngs[i],tlat,tlon)
                            distancefrom.push(dist)
                        }
                        // lert('came hear')
                        closest = Math.min(...distancefrom)
                        // lert('closest is '+ closest)
                        var indexOfClosest = distancefrom.indexOf(closest)
                        // lert('index of closest' + indexOfClosest)
                        if (closest<0.4){
                            this.setState({
                                LeftStation:names[indexOfClosest],
                                RightStation:'Train is now waiting at ' + names[indexOfClosest]+' Station',
                                instation:true
                            })
                            
                        }
                        
                        else{
                            var upstation = indexOfClosest - 1
                            var downstation = indexOfClosest +1
                            var closeup = distance(lats[upstation],lngs[upstation],tlat,tlon)
                            var closedown = distance(lats[downstation],lngs[downstation],tlat,tlon)
                            if (closeup < closedown){
                                //  lert('train is between upstation and station')
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
                                        RightStation:names[indexOfClosest],
                                        progressbar:progress
                                    })
                                }
                            }
                            else {
                                // lert('train is between downstation and station')
                                var distancebetween = distance(lats[downstation],lngs[downstation],lats[indexOfClosest],lngs[indexOfClosest])
                                var progress =(closedown / distancebetween)
                                // lert('Distance Between' + distancebetween)
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

			
		  }, err => {
			
		  });
        
        //  lert(this.state.GoingtoName)
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

    render(){
        return(
            <View style={styles.container}> 
                {this.state.lat ? 
                    
                    <MapView
                        region={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: this.state.latitudeDelta,
                            longitudeDelta: this.state.longitudeDelta,
                        }}
                        showsUserLocation
                        style={styles.map}
                        onRegionChange={this.onRegionChange}
                        onRegionChangeComplete={this.onRegionChangeComplete}
                        showsMyLocationButton={false}
                        containerStyle={{backgroundColor: 'white', borderColor: '#BC8B00'}}
						>
                    <Marker coordinate={{
                        latitude:this.state.latitude,
                        longitude: this.state.longitude}}
                        pinColor={'tan'} 
						 >
						 
                    </Marker>
                    </MapView>
                    
                
                : <ActivityIndicator size="large" color="#0000ff" />

                }
                <View style={{margin:10}}></View>
                {this.state.late ? 
                    <Text style={{color: 'red',fontWeight: 'bold'}}>{this.state.lastupdatedtime}</Text>
                :
                <Text style={{color: 'red',fontWeight: 'bold'}}>{this.state.lastupdatedtime}</Text>
                }
                <View style={{margin:10}}></View>

                {/* <View style={styles.progress}> 
                    <Button title={this.state.LeftStation} style={styles.buttonStyle}> </Button>
                    <Progress.Bar progress={this.state.progressbar } width={200} height={20} style={styles.bar} animationType='timing' borderRadius={10} />
                    <Button title={this.state.RightStation} style={styles.buttonStyle}></Button>
                </View> */}
                {this.state.instation ? <Text style={styles.inbetween}>{this.state.RightStation}</Text>
                :<Text></Text>}
                {this.state.instation ?
                    
                    <View style={styles.progress}>
                        <Progress.Bar progress={1}  height={20} style={styles.bar2} animationType='timing' borderRadius={10} />
                        <Button title={this.state.LeftStation} style={styles.buttonStyle}> </Button>
                        <Progress.Bar progress={0} height={20} style={styles.bar2} animationType='timing' borderRadius={10} />
                        
                    </View> 
                    
                            
                    
                
                :
                    <View style={styles.progress}> 
                        <Button title={this.state.LeftStation} style={styles.buttonStyle}> </Button>
                        <Progress.Bar progress={this.state.progressbar} width={200} height={20} style={styles.bar} animationType='timing' borderRadius={10} />
                        <Button title={this.state.RightStation} style={styles.buttonStyle}></Button>
                    </View>

                }
                
                <Button title ="<- Go Back" 
                    onPress={()=>this.props.navigation.navigate('TrainDetails2')}>
                </Button>
				
                <View style={styles.ad}><Text>ADsudo </Text>
                
                </View>
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
    inbetween:{

	},
	ad:{
		flex: -1,
        flexDirection: 'column',
        justifyContent: 'center',
		alignItems: 'flex-end',
		height: 100, 
		width:'100%',
		backgroundColor: 'steelblue'
		
	}
})