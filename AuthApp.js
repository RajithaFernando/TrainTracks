import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'

import { SwitchNavigator, createStackNavigator ,createAppContainer} from 'react-navigation'
import Loading from './src2/components/Auth/Loading'
import Login from './src2/components/Auth/Login'
import Main from './src2/components/Auth/Main'
import Hottels from './src2/components/Auth/Hottels'
import Panel from './src2/components/Auth/Panel'

// import App5user from './App5user'


// create our app's navigation stack
const AuthApp = createStackNavigator(
    {
      Login,
      Loading,
      Main,
	  Hottels,
	  Panel
    },
    {
      initialRouteName: 'Loading'
    }
  )
  export default createAppContainer(AuthApp)