import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'

export default class Login extends Component {
    state = { email: '', password: '', errorMessage: null }
    handleLogin = () => {
        const { email, password } = this.state
        if (1==1){
            this.props.navigation.navigate('Main')
        }
        else{
            alert('Wrong User Name or Password')
        }
    }

    render() {
        return (
        <View style={styles.container}>
        
            <Text>Login</Text>
            
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
            <Button title="Login" onPress={this.handleLogin}/>
            
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
    }
  })