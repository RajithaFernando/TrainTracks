import React, { Component } from 'react';
import fire from '../config/Fire';
import { StyleSheet, Image, View, TextInput, TouchableOpacity,Text} from 'react-native'
// import LoginForm from './LoginForm';

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }
  selectHandler= ()=>{
    alert(this.state.email +',' + this.state.password)
      }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).catch((error) => {
        console.log(error);
      });
  }

  signup(e){
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).then((u)=>{console.log(u)})
    .catch((error) => {
        console.log(error);
      })
  }
  render() {
    return (
       <View style={styles.container}>
        <View style={styles.loginContainer}>
                 <Image resizeMode="contain" style={styles.logo} source={require('../img/logo.png')} />
         </View>

            <View>
                  <TextInput style = {styles.input} 
                      autoCapitalize="none" 
                      keyboardType='email-address' 
                      returnKeyType="next" 
                      placeholder='Email or Mobile Num' 
                      placeholderTextColor='rgba(225,225,225,0.7)'
                      value = {this.state.email}
                      onChangeText={email =>
                            this.setState({ email })
                        }/>

                  <TextInput style = {styles.input}   
                      returnKeyType="go" 
                      placeholder='Password' 
                      placeholderTextColor='rgba(225,225,225,0.7)' 
                      secureTextEntry
                      onChangeText={password =>
                            this.setState({ password })
                        }/>

                  <TouchableOpacity style={styles.buttonContainer} 
                      onPress={this.selectHandler}
                      ><Text>Log In</Text>
                  </TouchableOpacity> 
                   
            </View>
       </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
      backgroundColor: '#2c3e50',
      
  },
  loginContainer:{
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center'
  },
  logo: {
      
      width: 150,
      height: 300,
  },
   input:{
       height: 40,
       backgroundColor: 'rgba(225,225,225,0.2)',
       marginBottom: 10,
       padding: 10,
       color: '#fff'
   },
   buttonContainer:{
       backgroundColor: '#2980b6',
       paddingVertical: 15
   },
   buttonText:{
       color: '#fff',
       textAlign: 'center',
       fontWeight: '700'
   }
})

export default Login;