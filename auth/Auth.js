import React, { Component } from 'react';
import {Text, View} from 'react-native'
import fire from '../config/Fire'
// import Home from './Home';
import Login from './Login';
import App5user from '../App5user'

class Auth extends Component {
  constructor() {
    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });

      } else {
        this.setState({ user: null });
      }
    });
  }
  render() {
    return (
     <View>{this.state.user ? ( <App5user/>) : (<Login/>)}</View>
    )}
}

 export default Auth;