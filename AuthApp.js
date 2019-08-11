import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'

import { SwitchNavigator, createStackNavigator ,createAppContainer} from 'react-navigation'
import Loading from './src2/components/Auth/Loading'
import Login from './src2/components/Auth/Login'
import Main from './src2/components/Auth/Main'
import Search from './src2/components/Auth/Search'
import Search2 from './src2/components/Auth/Search2'

// import App5user from './App5user'


// create our app's navigation stack
const AuthApp = createStackNavigator(
    {
      Login,
      Loading,
      Main,
      Search,
      Search2,
    },
    {
      initialRouteName: 'Login'
    }
  )
  export default createAppContainer(AuthApp)