import React, { Component } from 'react'
import { Text, View, StyleSheet,TouchableOpacity, ActivityIndicator, Button } from 'react-native'
import Autocomplete from 'react-native-autocomplete-input';

import Fire from '../../../config/Fire' 
import firebase from '@firebase/app';
require('firebase/auth');
require('@firebase/database');
require("firebase/firestore");

import Card from '../Card'
import CardSection from '../CardSection'
import SignButton from '../SignButton'
// import Button from '../Button'

// var trainsref = database.collection('drivers').doc(currentUser.email)

export default class Search extends Component {
    state = { currentUser: null, driver:false, updated:false, stationNames:[] ,code:null,
        query: '',
        query2: '',
        array : ['kamal','sunil','namal'],

    }
    componentWillMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }
    componentDidMount(){
        var trainsref = database.collection('drivers').doc(this.state.currentUser.email)
        var getdata = trainsref.get().then(function(doc) {    
            if (doc.exists) {
                alert('Driver')
                setState({
                    driver:true,
                    updated:true,
                    code : <Button title ="Driver"/>
                })
                }
            else{
                alert('You are a Fucking Passenger')
                setState({
                    updated:true,
                    code : <Button title ="Passenger"/>
                })
                }
            }.bind(this)).catch(err => {
                // alert('Error getting Data. Check your Connection and try Again');
                });
            // getting Train Search
        
            }  

            


    
    // signOutUser = async () => {
    //     try {
    //         await firebase.auth().signOut();
    //         navigate('Login');

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // navigate=()=>{
    //     if(this.state.query != '' && this.state.query2 != ''){
    //     this.props.navigation.navigate('TrainD',{
    //       startStation: this.state.query,
    //       endStation  : this.state.query2,
    //     })
    //   }else{
    //     alert('incomplete')
    //   }
    //   }
    //   findStation(query) {
    //     //method called everytime when we change the value of the input
    //     if (query === '') {
    //       //if the query is null then return blank
    //       return [];
    //     }
        
    //     //making a case insensitive regular expression to get similar value from the film json
    //     const regex = new RegExp(`${query.trim()}`, 'i');
    //     //return the filtered film array according the query from the input
    //     return this.state.stationNames.filter(film => film.search(regex) >= 0);

    //   }

    render() {
        // const { query } = this.state;
        // const { query2 } = this.state;
        // const films = this.findStation(query);
        // const films2 = this.findStation(query2);
        // const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        
        
        const { currentUser } = this.state
        // const curuser = this.state.curuser
        return (
           
            <View style={styles.container}> 
                <Text>This is Search page.. you search and press relevent train. then the magic happens!</Text> 
                {this.state.code}
                {this.state.driver && this.state.updated ?
                <Button title ="Driver"/>
                : !this.state.driver && this.state.updated ?
                <Button title ="User"/>
                :<View>
                <Button title ="Selecting User = Driver danata" 
                    onPress={() => this.props.navigation.navigate('app5')} ></Button>
                <Button title ="Selecting User = User danata" 
                onPress={() => this.props.navigation.navigate('App5user')} ></Button>
                </View>
                }
                
            </View>
                
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
