import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Button ,TouchableOpacity,ImageBackground} from 'react-native'

import Fire from '../../../config2/Fire'
require('firebase/auth');

export default class Login extends Component {
    state = { email: '', password: '', errorMessage: null }
    // handleLogin = () => {
    //     const { email, password } = this.state
    //     if (1==1){
    //         this.props.navigation.navigate('Main')
    //     }
    //     else{
    //         alert('Wrong User Name or Password')
    //     }
    // }



    handleLogin = () => {
        const { email, password } = this.state
        Fire
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
            
            () => this.props.navigation.navigate('Main'))
        .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        return (
        <View style={styles.container}>
			<ImageBackground
				accessibilityRole={'image'}
				source={require('./gotrip.jpeg')}
				style={styles.background}
				imageStyle={styles.logo}>
				
			</ImageBackground>
            <Text style={styles.text}>Login To Go Trip</Text>
            
            <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Email"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
            />
            <TextInput
                secureTextEntry
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Password"
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
            />
            <TouchableOpacity style={[styles.but, { backgroundColor: "#1BBEB2"}]}  onPress={this.handleLogin}><Text style={{textAlign: 'center'}}>Login</Text></TouchableOpacity>
            
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
    textInput: {
      height: 40,
      width: '90%',
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 8
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
	background: {
		paddingBottom: 40,
		paddingTop: 96,
		paddingHorizontal: 20,
		// backgroundColor: '#F3F3F3',
	  },
	  logo: {
		opacity: 0.2,
		overflow: 'visible',
		resizeMode: 'cover',
		marginRight: -150,
		marginLeft: -150,
		marginBottom: -150,
	  },
	  text: {
		fontSize: 20,
		fontWeight: '400',
		textAlign: 'center',
		color: '#050605',
		
	  },
  })