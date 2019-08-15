import React, {Fragment, Component} from 'react';
import {SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,ImageBackground} from 'react-native';

// import {Header,LearnMoreLinks,Colors,DebugInstructions,ReloadInstructions} from '../../../NewAppScreen/index';

export default class help extends Component {
	render(){
		return (
			<ScrollView>
			<Fragment>
			<ImageBackground
				accessibilityRole={'image'}
				source={require('./e3.png')}
				style={styles.background}
				imageStyle={styles.logo}>
				<Text style={styles.text}>Welcome to TrainTracks</Text>
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
				  <View style={styles.body}>
					<View style={styles.sectionContainer}>
					  <Text style={styles.sectionTitle}>Time Tables</Text>
					  <Text style={styles.sectionDescription}> Go to <Text style={styles.highlight}> Time Tables</Text> menu to search between Train Stations. Enter Starting and End Stations and press Look up. Click on a praticular Train to view more Details.

					  </Text>

					  <Text style={styles.sectionDescription}><Text style={styles.highlight}> Time Tables </Text> මෙනුව ක්ලික් කර, ඔබ කැමති ආරම්භක සහ අවසන් දුම්රිය ස්ථානයන් ඇතුලත් කරන්න. Look Up බොත්තම ඔබා කාලසටහන ලබා ගන්න. කැමති දුම් රියක් මත ක්ලික් කිරීමෙන් වැඩිදුර විස්තර ඔබට බලා ගත හැක.
						
					  </Text>
					</View>
					<View style={styles.sectionContainer}>
					  <Text style={styles.sectionTitle}>Location</Text>
					  <Text style={styles.sectionDescription}>
						
					  </Text>
					</View>
					<View style={styles.sectionContainer}>
					  <Text style={styles.sectionTitle}>Debug</Text>
					  <Text style={styles.sectionDescription}>
						
					  </Text>
					</View>
					<View style={styles.sectionContainer}>
					  <Text style={styles.sectionTitle}>Learn More</Text>
					  <Text style={styles.sectionDescription}>
						Read the docs to discover what to do next:
					  </Text>
					</View>
					
				  </View>
				</ScrollView>
			  </SafeAreaView>
			</Fragment>
			</ScrollView>
		  );
	}
  	
}

const styles = StyleSheet.create({
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
    marginLeft: -128,
    marginBottom: -192,
  },
  text: {
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
  },
});


