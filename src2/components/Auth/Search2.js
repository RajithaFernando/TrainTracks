import React, {Component} from "react";
import {StyleSheet,Text,View,TouchableOpacity,ScrollView,Button,ActivityIndicator,LayoutAnimation} from 'react-native';


import Fire from '../../../config2/Fire'
require('firebase/auth');
require('@firebase/database');
require("firebase/firestore");

class Search2 extends Component{
    constructor(props) {
          
        super(props);
            this.state = {
            vehical:'',
            code:'',
            user:'',
            plates:[],
            discription:[],
            mobile:[],
            start:[],
            end:[],
            msg:[],
            update:false,
            notification:[],
            expanded:false
            };
    }
    componentDidMount(){
        // var db = Fire.firestore()
        // var docRef = db.collection("vehicles")
        var user = Fire.auth().currentUser;
        if (user != null){
            this.setState({
                user:user.email
            })
        }
        // // if (user != null){}
        //     var query = docRef.where("vehicale.availability", "==", "true")
        //     query.get().then(snapshot => {
        //         alert('something')
        //         snapshot.docs.forEach(doc => {  
        //             alert('sfsdcsdfsdfsd')

        //         })
        //     })

        const db = Fire.firestore()
        var docRef = db.collection('vehicles')
        var query = docRef.where('user', '==', 'admin@gmail.com').get().then(snapshot=>{
            if (snapshot.empty) {
                alert('No matching documents.');
                return;
              }
            snapshot.docs.forEach(doc=>{
                // alert(doc.data().plate)
                var time = Date.now()
                var start = doc.data().start
                var end = doc.data().end

                starttimedif =  Math.round((start- time)/1000)
                endtimedif =  Math.round((time - end)/1000)

                var sh = Math.floor(starttimedif / 3600);
                var sm = Math.floor(starttimedif % 3600 / 60);
                var ss = Math.floor(starttimedif % 3600 % 60);

                var eh = Math.floor(endtimedif / 3600);
                var em = Math.floor(endtimedif % 3600 / 60);
                var es = Math.floor(endtimedif % 3600 % 60);
                var timeremaning =''
                if (sh >0 ||sm >0 || ss >0 || eh>0 ||em >0 || es >0){
                    if (sh <24 ){
                        
                        if (sh <1){
                            timeremaning = sm + 'minits  and ' +ss +' Seconds remaning'
                        }

                        else{
                            timeremaning = sh + 'hours  and ' +sm +' Minits remaning'
						}
						
						
							
						
                        this.setState(prevState => ({
                            notification: [...prevState.notification,  <View style={styles.list}>
								<TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout(1)} style={styles.Btn}>
									<Text style={{fontWeight: 'bold', fontSize: 20,}}>{doc.data().plate}</Text>
								</TouchableOpacity>
                                <View style={{ height: this.state.expanded ? null : 0, overflow: 'hidden' }}>
									<View><Text style={{fontWeight: 'bold', fontSize: 20, color: '#56A926'}}>Vehical Pickup Reminder</Text></View> 
									<View><Text style={{fontWeight: 'bold', fontSize: 20, color: '#2666A9'}}>{timeremaning}</Text></View> 
									<View>
										<Text style={{fontWeight: 'bold', fontSize: 15,}}>Client Message :<Text style={{fontWeight: 'normal', fontSize: 14,}}>{doc.data().discrip}</Text></Text>
									</View>
									<View>
										<Text style={{fontWeight: 'bold', fontSize: 15,}}>Client Mobile:<Text style={{fontWeight: 'bold',}}> {doc.data().mobile}</Text></Text>
									</View>
								</View>
							</View>   ],                            
                            
                          }))    
                    }
                    if (eh <24){
                        if (eh <1){
                            timeremaning = em + 'minits  and ' +es +' Seconds remaning'
                        }

                        else{
                            timeremaning = eh + 'hours  and ' +em +' Minits remaning'
                        }
                        this.setState(prevState => ({
                            notification: [...prevState.notification,   <View style={styles.list}>
                                <View><Text style={{fontWeight: 'bold', fontSize: 20,}}>{doc.data().plate}</Text></View>
                                <View><Text style={{fontWeight: 'bold', fontSize: 20, color: '#C54024'}}>Vehical Return Reminder</Text></View> 
                                <View><Text style={{fontWeight: 'bold', fontSize: 20, color: '#2666A9'}}>{timeremaning}</Text></View> 
                                <View>
                                    <Text style={{fontWeight: 'bold', fontSize: 15,}}>Client Message :<Text style={{fontWeight: 'normal', fontSize: 14,}}>{doc.data().discrip}</Text></Text>
                                </View>
                                <View>
                                    <Text style={{fontWeight: 'bold', fontSize: 15,}}>Client Mobile:<Text style={{fontWeight: 'bold',}}> {doc.data().mobile}</Text></Text>
								</View></View>  ],
								
                          }))   
                    }
                }

            })
            alert(this.state.notification)
        })
    }
	changeLayout = (key) => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		this.setState({ expanded: !this.state.expanded });
	  }
    
    render(){
        return(
            
            <View style={styles.container}>
            <ScrollView>
                {this.state.notification}
                </ScrollView>
            </View>
        )
    }
}
  
const styles = StyleSheet.create({
    list:{
      width:'100%',
      padding:10,
      backgroundColor:'#eee',
      margin:5,
      marginLeft:10,
      marginRight:10,
    },
    butok:{
        width:'35%',
        backgroundColor:"#841584",
        height:50,
        justifyContent: 'center',
        borderRadius: 5,
        paddingLeft: 25,
    },
    butcan:{
        width:'35%',
        backgroundColor:"red",
        height:50,
        justifyContent: 'center',
        borderRadius: 5,
        paddingLeft: 25,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
	},
	text: {
		fontSize: 17,
		color: 'black',
		padding: 10
	},
	btnText: {
		textAlign: 'center',
		color: 'white',
		fontSize: 20
	},
	btnTextHolder: {
		borderWidth: 1,
		borderColor: 'rgba(0,0,0,0.5)'
	},
	
	Btn: {
		padding: 10,
		backgroundColor: 'rgba(0,0,0,0.5)'
	}
 
})
  
export default Search2;