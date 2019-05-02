import React, { Component } from 'react'
import { Text, View ,ActivityIndicator, StyleSheet} from 'react-native'

export default class Loading extends Component {
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
