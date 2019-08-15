import React, { Component,Fragment } from 'react'
import { Text, View ,ActivityIndicator, StyleSheet,ImageBackground,SafeAreaView,ScrollView,StatusBar} from 'react-native'
import Fire from '../../../config2/Fire'
require('firebase/auth');
require('@firebase/database');
require("firebase/firestore");

export default class Loading extends Component {
	componentDidMount() {
        Fire.auth().onAuthStateChanged(user => {
			this.props.navigation.navigate(user ? 'Main' : 'Login')
			// this.props.navigation.navigate(user ? 'Loading' : 'Loading')
        })
    }

    render() {
        return (
        <Fragment>
			<ImageBackground
				accessibilityRole={'image'}
				source={require('./gotrip.jpeg')}
				style={styles.background}
				imageStyle={styles.logo}>
				
			</ImageBackground>
			  <StatusBar barStyle="dark-content" />
			  <SafeAreaView>
				<ScrollView
				  contentInsetAdjustmentBehavior="automatic"
				  style={styles.scrollView}>
				  
				  {global.HermesInternal == null ? null : (
					<View style={styles.engine}>
					  <Text style={styles.footer}>Engine: Hermes</Text>
					</View>
				  )}
				  
				</ScrollView>
				<Text style={styles.text}>Welcome to  GoTrip </Text>
			  </SafeAreaView>
			  <ActivityIndicator size="large" color="#0000ff" />
			</Fragment>
			
			
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
	},
	background: {
		paddingBottom: 40,
		paddingTop: 96,
		paddingHorizontal: 20,
		backgroundColor: '#F3F3F3',
	  },
	  
	  logoview:{
		justifyContent: 'center',
    	alignItems: 'center',
 
	  },
	  scrollView: {
		backgroundColor: '#DAE1E7',
	  },
	  engine: {
		position: 'absolute',
		right: 0,
	  },
	  body: {
		backgroundColor: '#FFF',
	  },
	  sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	  },
	  sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
		color: '#000',
	  },
	  sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
		color: '#444',
	  },
	  highlight: {
		fontWeight: '700',
	  },
	  footer: {
		color: '#444',
		fontSize: 12,
		fontWeight: '600',
		padding: 4,
		paddingRight: 12,
		textAlign: 'right',
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
		marginRight: -50,
		marginBottom: -192,
	  },
	  text: {
		fontSize: 30,
		fontWeight: '400',
		textAlign: 'center',
		color: '#050605',
		
	  },
  })
