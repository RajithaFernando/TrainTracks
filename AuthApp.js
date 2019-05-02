import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'

import { SwitchNavigator, createStackNavigator ,createAppContainer} from 'react-navigation'
import Loading from './src/components/Auth/Loading'
import SignUp from './src/components/Auth/SignUp'
import Login from './src/components/Auth/Login'
import Main from './src/components/Auth/Main'

// create our app's navigation stack
const AuthApp = createStackNavigator(
    {
      Loading,
      SignUp,
      Login,
      Main
    },
    {
      initialRouteName: 'Loading'
    }
  )
  export default createAppContainer(AuthApp)