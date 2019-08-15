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
					  <Text style={styles.sectionDescription}> Go to <Text style={styles.highlight}> Time Tables</Text> menu to search between Train Stations. Enter Starting and End Stations and press Look up. Click on a praticular Train to view more Details.</Text>
					  <Text style={styles.sectionDescription}><Text style={styles.highlight}> Time Tables </Text> මෙනුව ක්ලික් කර, ඔබ කැමති ආරම්භක සහ අවසන් දුම්රිය ස්ථානයන් ඇතුලත් කරන්න. Look Up බොත්තම ඔබා කාලසටහන ලබා ගන්න. කැමති දුම්රියක් මත ක්ලික් කිරීමෙන් වැඩිදුර විස්තර ඔබට බලා ගත හැක.</Text>
					</View>

					<View style={styles.sectionContainer}>
					  <Text style={styles.sectionTitle}>Location</Text>
					  <Text style={styles.sectionDescription}> To see the <Text style={styles.highlight}> Location</Text> of a Train, after selecting a train, click on the Get Location Button to see the train on a map and tyou can see the Stations which are up and down</Text>
					  <Text style={styles.sectionDescription}>ඔබ කැමති දුම්රියක <Text style={styles.highlight}> Location </Text> බලා ගැනීම සඳහා අවශ්‍ය දුම්රිය තෝරා ගැනීමෙන් පසු Get Location බොත්තම ඔබන්න. ඔබට දුම්රිය තිබෙන ස්ථානය සිතියමක සහ, දෙපස දුම්රිය ස්ථානයන් දැක බලා ගත හැක.</Text>
					</View>


					<View style={styles.sectionContainer}>
					  <Text style={styles.sectionTitle}>Notifications</Text>
					  <Text style={styles.sectionDescription}> You can see the <Text style={styles.highlight}> Notifications</Text> posted by TrainTracks Admin on your device notification bar, and under Admin Notifications tab. also, you can post notifications to other peoples via app. these notifications wont be send to others as push notifications, insted they will apear on peoples notification tab. Before you post notifications, Plese Go through<Text style={styles.highlight}> Rules and Regulations </Text>of posting Notifications.</Text>
					  <Text style={styles.sectionDescription}>දුම්රිය ගමන් සම්බන්ද දැනුම්දීම් බලා ගැනීමට, <Text style={styles.highlight}> Notifications </Text> බොත්තම ඔබා පිවිසිය හැක. මෙහිදී ඔබට TrainTracks පරිපාලකයන් විසින් ලබා දුන් දැනුම්දීම් වෙනම බලාගත හැකි අතර, පරිශීලකයන් විසින් ලබා දුන් දැනුම්දීම් වෙනම ලබා ගත හැක. ඔබට යමක් TrainTracks පරිශීලකයන්ට දැනුම් දීමට ඇතිනම්, ඒ හා සඹැදි <Text style={styles.highlight}> නීති හා කොන්දීසි </Text> මත අනුකූලව පල කල හැක. </Text>
					</View>

				

					<View style={styles.sectionContainer}>
					  <Text style={styles.sectionTitle}>Lost and Found</Text>
					  <Text style={styles.sectionDescription}> if you lost any items in a trains or in train stations, you can post them into our public forum. similarly, if you find any item which might have been lost, you can post them under found items. plese, make sure you follow our guidelines and regulations for posting to TrainTracks forum before you submit anything.</Text>
					  <Text style={styles.sectionDescription}> ඔබේ භාන්ඩ දුම්රියක හෝ නැතිවීම් පිලිබඳව මෙන් ම අන් අයගේ භාන්ඩ සම්භවීම් පිලිඹදව අපගේ පෝරමයේ සඳහන් කල හැක. කරුණාකර එවැනි පනුවිඩ පල කිරීමට ප්‍රථමව, නීති හා රෙගුලාසි අනුගමනය කරන්න. </Text>
					</View>

					<View style={styles.sectionContainer}>
					  <Text style={styles.sectionTitle2}>Rules and regulations of Posting Notifications / lost and found</Text>
					  <Text style={styles.sectionDescription2}>     Notifications/ Lost and found mesages posted by users must only contain train related news which is helpful to other passengers. posting any inappropriate content such as threatening messages, harmfull comments, promoting brands or products or any other inappropriate behavior will violate our community standards. actions which violate rules and regulations will result in <Text style={styles.highlight}> removing user account to the application. </Text></Text>
					  <Text style={styles.sectionDescription2}>     පරිශීලකයන් මගින් ලබා දෙන දැනුම්දීම් / නැතිවූ සහ සම්භ වූ භාන්ඩ දැනුම්දීම් වල අන්තර්ගතය දුම්රිය ගමන් සම්බන්ද දැනුම්දීම් / නැතිවූ හෝ සම්භ වූ භාන්ඩය සම්බන්ධයෙන් පමනක් විය යුතු අතර අනෙක් මගීන්ට ප්‍රයෝජනවත් විය යුතුය. අනවශය දෑ පල කිරීම, එනම් තර්ජනාත්මක පනිවිඩ, අසංවර වචන භාවිතය, භාන්ඩ හෝ සේවා ප්‍රචාරනය සම්පූර්නයෙන් තහනම්ය. එවැනි දැනුම්දීම් පලකිරන <Text style={styles.highlight}> ගිණුම් අක්‍රිය කරනු ලැබේ. </Text></Text>
					</View>
					<View style={styles.sectionContainer}>
					  <Text style={styles.sectionTitle}>TrainTracks</Text>
					  <Text style={styles.sectionDescription}>
						TrainTracks© application Developed by Undergraduates of University of Colombo School of Computing.
					  </Text>
					  <Text style={styles.sectionDescription}>
						Contact us via Facebook
					  </Text>
					  <Text style={styles.sectionDescription3}>
						www.facebook.com/TrainTracksSL
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
  sectionTitle2: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
  },
  sectionDescription2: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '300',
    color: '#063A69',
  },
  sectionDescription3: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: '300',
	color: '#1D5689',
	marginBottom:8,
  },
});


