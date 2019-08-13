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
			currentUser:user
		})
    }
    
    
    render() {
        
        // const curuser = this.state.curuser
        return (
            <View style={styles.container}>
                <View style={styles.container2}>
                    <Text>Welcome Back UserName</Text>
                </View>
                <Text>
                Hi 
                </Text>
                    
                    <TouchableOpacity title="My Hottels"  style={[styles.but, { backgroundColor: "#056571"}]}
                    onPress={() => this.props.navigation.navigate('Hottels')} 
                    ><Text>My Hottels</Text></TouchableOpacity>
                    <TouchableOpacity title="My Vehicals" style={[styles.but, { backgroundColor: "#056571"}]}
                    onPress={() => this.props.navigation.navigate('Panel')} 
                    ><Text>My Vehicals</Text></TouchableOpacity>
                    <TouchableOpacity title="Logout" style={[styles.but2, { backgroundColor: "#414141"}]} 
                    ><Text>Log Out</Text></TouchableOpacity>
                    <View style={styles.nitify}>

                    </View>
                    
                    <Text>Go-Trip App</Text>
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
        paddingHorizontal: 10
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
