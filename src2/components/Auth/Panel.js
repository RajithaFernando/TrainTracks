import React, { Component } from 'react';
import {
	LayoutAnimation,
	StyleSheet,
	View,
	Text,
	ScrollView,
	UIManager,
	TouchableOpacity,
	Platform,
	ActivityIndicator
  } from 'react-native';

import Fire from '../../../config2/Fire'
require('firebase/auth');
require('@firebase/database');
require("firebase/firestore");
 
class ExpandableItemComponent extends Component {
	//Custom Component for the Expandable List
	constructor() {
	  super();
	  this.state = {
		layoutHeight: 0,
	  };
	}
	componentWillReceiveProps(nextProps) {
	  if (nextProps.item.isExpanded) {
		this.setState(() => {
		  return {
			layoutHeight: null,
		  };
		});
	  } else {
		this.setState(() => {
		  return {
			layoutHeight: 0,
		  };
		});
	  }
	}
	shouldComponentUpdate(nextProps, nextState) {
	  if (this.state.layoutHeight !== nextState.layoutHeight) {
		return true;
	  }
	  return false;
	}
   
	render() {
	  return (
		<View>
		  {/*Header of the Expandable List Item*/}
		  <TouchableOpacity
			activeOpacity={0.8}
			onPress={this.props.onClickFunction}
			style={styles.header}>
			<Text style={styles.headerText}>{this.props.item.category_name} <Text style={{fontWeight: 'bold', fontSize: 20, color: '#C54024'}}>{this.props.item.data}</Text> <Text> {this.props.item.timeshort}</Text> </Text>
		  </TouchableOpacity>
		  <View
			style={{
			  height: this.state.layoutHeight,
			  overflow: 'hidden',
			}}>
			{/*Content under the header of the Expandable List Item*/}
			{this.props.item.subcategory.map((item, key) => (
			  <TouchableOpacity
				key={key}
				style={styles.content}>
				<Text style={styles.text}>
				   {item.val}

				</Text>
				<Text style={styles.text}>
				   Client Mobile : {this.props.item.mob}
				</Text>
				<Text style={styles.text}>
				   Discription : {this.props.item.msg}
				</Text>
				
				
				<View style={styles.separator} />
			  </TouchableOpacity>
			))}
		  </View>
		</View>
	  );
	}
  }
const CONTENT = [];   
export default class Panel extends Component {
	//Main View defined under this Class
	constructor() {
	  super();
	  if (Platform.OS === 'android') {
		UIManager.setLayoutAnimationEnabledExperimental(true);
	  }
	  this.state = { listDataSource: CONTENT , updated:false };
	}
	componentDidMount(){
		

        // var db = Fire.firestore()
        // var docRef = db.collection("vehicles")
        var user = Fire.auth().currentUser;
        if (user != null){
            this.setState({
                user:user.email
            })
        }
        const db = Fire.firestore()
        var docRef = db.collection('vehicles')
        var query = docRef.where('user', '==', 'admin@gmail.com').get().then(snapshot=>{
            if (snapshot.empty) {
                alert('No matching documents.');
                return;
              }
            snapshot.docs.forEach(doc=>{
                // alert(doc.data().plate)
                var time = Date.now()
                var start = doc.data().start
                var end = doc.data().end

                starttimedif =  Math.round((start-time)/1000)
                endtimedif =  Math.round((end-time)/1000)

                var sh = Math.floor(starttimedif / 3600);
                var sm = Math.floor(starttimedif % 3600 / 60);
                var ss = Math.floor(starttimedif % 3600 % 60);

                var eh = Math.floor(endtimedif / 3600);
                var em = Math.floor(endtimedif % 3600 / 60);
                var es = Math.floor(endtimedif % 3600 % 60);
				let timeremaning =''
				let timeshort=''
				let head =''
				let mob = doc.data().mobile
				let msg = doc.data().discrip
				
                if (sh >0 ||sm >0 || ss >0 || eh>0 ||em >0 || es >0){
                    if (sh <24 ){
						head==<Text style={{fontWeight: 'bold', fontSize: 20, color: '#56A926'}}>Pickup</Text>
                        if (sh <1){
							timeshort = sm + 'M' +ss +' Sec'
                            timeremaning = sm + ' minits  and ' +ss +' Seconds remaning'
                        }
                        else{
							timeremaning = sh + ' hours  and ' +sm +' Minits remaning'
							timeshort = sh + 'H' +sm +' Min'
						}
						
                                
						
					}
					else if (eh <24){
						head=<Text style={{fontWeight: 'bold', fontSize: 20, color: '#C54024'}}>Return</Text>
                        if (eh <1){
							timeshort = em + 'M' +es +' Sec'
                            timeremaning = em + ' minits  and ' +es +' Seconds remaning'
                        }
                        else {
							timeshort = eh + 'H' +em +' Min'
                            timeremaning = eh + ' hours  and ' +em +' Minits remaning'
						}	
						
						
					}
					
					CONTENT.push(
						{
							isExpanded: false,
							category_name: doc.data().plate ,
							subcategory: [{ id: 20, val: timeremaning }],
							data:<Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>{head}</Text>,
							msg:msg,
							mob:mob,
							timechange:timeremaning,
							timeshort:timeshort
						  },
					)
				}
				

            })
            this.setState({
				updated:true
			})
        })
    }
	updateLayout = index => {
	  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
	  const array = [...this.state.listDataSource];
	  array[index]['isExpanded'] = !array[index]['isExpanded'];
	  this.setState(() => {
		return {
		  listDataSource: array,
		};
	  });
	};
   
	render() {
	  return (
		<View style={styles.container}>
		  <Text style={styles.topHeading}>Vehicle Notifications</Text>
		  {
			this.state.updated ?
			<ScrollView>
				{this.state.listDataSource.map((item, key) => (
			  	<ExpandableItemComponent
					key={item.category_name}
					onClickFunction={this.updateLayout.bind(this, key)}
					item={item}
			  	/>
				))}
		  	</ScrollView>

			:<ActivityIndicator size="large" color="#0000ff" />
		  }
		 
		</View>
	  );
	}
  }
   
  const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  paddingTop: 30,
	  backgroundColor: '#F5FCFF',
	},
	topHeading: {
	  paddingLeft: 10,
	  fontSize: 20,
	  fontWeight: 'bold', 
	  color: 'black'
	},
	header: {
	  backgroundColor: '#F5FCFF',
	  padding: 16,
	},
	headerText: {
	  fontSize: 16,
	  fontWeight: '500',
	},
	separator: {
	  height: 0.5,
	  backgroundColor: '#808080',
	  width: '95%',
	  marginLeft: 16,
	  marginRight: 16,
	},
	text: {
	  fontSize: 16,
	  color: '#606070',
	  padding: 10,
	},
	content: {
	  paddingLeft: 10,
	  paddingRight: 10,
	  backgroundColor: '#fff',
	},
  });
   
  //Dummy content to show
  //You can also use dynamic data by calling webservice
  