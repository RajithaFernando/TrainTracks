import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, Dimensions} from 'react-native'
import * as Progress from 'react-native-progress';

import Fire from './config/Fire'
//const database = Fire.firestore()
import firebase from '@firebase/app';
require('firebase/auth');
require('@firebase/database');
require("firebase/firestore");
export default class distance extends Component {
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
            instation:false,

        }
        
    }
    componentWillMount(){
        var names=[]
        var lats=[]
        var lngs=[]
        const database = Fire.firestore() 
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
            if (doc.exists){
                tlat = doc.data().lat
                tlon = doc.data().lng
                // lert(tlat)
            }
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
                this.setState({
                    GoingtoName:names[indexOfClosest],
                    instation:true
                })
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
        }.bind(this)
        )
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

    render() {
        return (
            <View>
                {this.state.instation ?
                    
                    <View style={styles.progress}>
                    <Text>This</Text>
                        <Progress.Bar progress={1}  height={20} style={styles.bar2} animationType='timing' borderRadius={10} />
                        <Button title={this.state.GoingtoName} style={styles.buttonStyle}> </Button>
                        <Progress.Bar progress={0} height={20} style={styles.bar2} animationType='timing' borderRadius={10} />
                    </View> 
                
                :
                    <View style={styles.progress}> 
                        <Button title={this.state.GoingtoName} style={styles.buttonStyle}> </Button>
                        <Progress.Bar progress={this.state.progressbar} width={200} height={20} style={styles.bar} animationType='timing' borderRadius={10} />
                        <Button title={this.state.CamefromName} style={styles.buttonStyle}></Button>
                    </View>

                }
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    bar :{
        padding:10,
        height:50, 
        width:(Dimensions.get("window").width)*50/100
    },
    buttonStyle:{
        width:(Dimensions.get("window").width)*25/100
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

})
