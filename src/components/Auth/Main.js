import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import Fire from '../../../config/Fire'
import firebase from '@firebase/app';
require('firebase/auth');
require('@firebase/database');
require("firebase/firestore");

export default class Main extends Component {
    state = { currentUser: null }
    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    } 
    signOutUser = async () => {
        try {
            await firebase.auth().signOut();
            navigate('Login');

        } catch (error) {
            console.log(error);
        }
    }

    goSearch = async () => {
        try {   
            navigate('Login');

        } catch (error) {
            alert(error);
        }
    }


    render() {
        const { currentUser } = this.state
        // const curuser = this.state.curuser
        return (
            <View style={styles.container}>
                <Text>
                Hi {currentUser && currentUser.email}!
                </Text>
                    <Button title="Logout" onPress={this.signOutUser} />
                    <Button title="Go to Search Page" 
                    onPress={() => this.props.navigation.navigate('Search2')} 
                    />
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
