import React, { Component } from 'react'
import { Text, View ,ActivityIndicator, StyleSheet} from 'react-native'
import Fire from '../../../config2/Fire'
require('firebase/auth');
require('@firebase/database');
require("firebase/firestore");

export default class Loading extends Component {
	componentDidMount() {
        Fire.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Main' : 'Login')
        })
    }

    render() {
        return (
        <View style={styles.container}>
            <Text>Loading</Text>
            <ActivityIndicator size="large" />
        </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  })
