import React, { Component } from 'react'
import { Text, View, StyleSheet, Button ,TouchableOpacity} from 'react-native'


import Fire from '../../../config2/Fire'
require('firebase/auth');
require('@firebase/database');
require("firebase/firestore");

export default class Main extends Component {
    state = { currentUser: null }
    componentDidMount() {
		var user = Fire.auth().currentUser;
		this.setState({
			currentUser:user.email
		})
    }
    signOutUser = async () => {
        try {
            await Fire.auth().signOut();
            () => this.props.navigation.navigate('Login')

        } catch (error) {
            console.log(error);
        }
    }
    
    render() {
    
        // const curuser = this.state.curuse
        return (
            <View style={styles.container}>
                <View style={styles.container2}>
                    <Text>Welcome Back </Text>
                </View>
                <Text>
                Hi 
                </Text>
                    
                    <TouchableOpacity title="My Hottels"  style={[styles.but, { backgroundColor: "#1F8A56"}]}
                    onPress={() => this.props.navigation.navigate('Hottels')} 
                    ><Text style={{textAlign: 'center' ,fontSize: 20,fontWeight: '400',color: '#000',}}>My Hotels</Text></TouchableOpacity>
                    <TouchableOpacity title="My Vehicals" style={[styles.but, { backgroundColor: "#1F8A56"}]}
                    onPress={() => this.props.navigation.navigate('Panel')} 
                    ><Text style={{textAlign: 'center',fontSize: 20,fontWeight: '400',color: '#000',}}>My Vehicles</Text></TouchableOpacity>
                    
					<View style={styles.nitify}>

                    </View>
					<TouchableOpacity title="Logout" style={[styles.but2, { backgroundColor: "#1BBEB2"}]} 
                    onPress={this.signOutUser}
					><Text>Log Out</Text></TouchableOpacity>
                    
                    
                    <Text>Go Trip App</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nitify:{
        padding:10,
		backgroundColor:'#eee',
		textAlign: 'center'
    },
    container2: {
        width:'100%',
        padding:10,
        backgroundColor:'#eee',
        margin:10,
        marginLeft:10,
        marginRight:10,
    },
    but:{
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 25,
        paddingRight: 25,
        alignSelf: 'center',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 35,
        width:'90%',
        height:50,
        justifyContent: 'center',
		paddingHorizontal: 10,
		textAlign: 'center'
    },
    but2:{
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 25,
        paddingRight: 25,
        alignSelf: 'center',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 35,
        width:'30%',
        height:40,
        justifyContent: 'center',
        paddingHorizontal: 10
    }
})
