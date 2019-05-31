import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'

import { SwitchNavigator, createStackNavigator ,createAppContainer} from 'react-navigation'
import Loading from './src/components/Auth/Loading'
import SignUp from './src/components/Auth/SignUp'
import Login from './src/components/Auth/Login'
import Main from './src/components/Auth/Main'
import Search from './src/components/Auth/Search'
import Search2 from './src/components/Auth/Search2'
import app5 from './app5'
import App5user from './App5user'


// create our app's navigation stack
const AuthApp = createStackNavigator(
    {
      Loading,
      SignUp,
      Login,
      Main,
      Search,
      Search2,
      app5,
      App5user

    },
    {
      initialRouteName: 'Loading'
    }
  )
  export default createAppContainer(AuthApp)