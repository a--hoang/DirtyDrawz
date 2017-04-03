import React, { Component } from 'react'
import {
  AppRegistry,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from 'react-native'

import firebaseApp from './src/firebase/client'

import Login from './src/pages/login'
import Signup from './src/pages/signUp'
import Account from './src/pages/account'
import Order from './src/pages/order'
import styles from './src/pages/styles'

class dirtydrawz extends Component {
  constructor(props){
    super(props)
    this.state={
      id: '',
      name: ''
    }
  }
  componentWillMount(){
    const unsubscribe = firebaseApp.auth().onAuthStateChanged((user) => {
      if(user != null){
        this.setState({
          id: 'order',
          name: 'order'
        })
        return
      }
      this.setState({
        id: 'login',
        name: 'login'
      })
      unsubscribe()
    })
  }
  
  render(){
    if(this.state.id){
      return(
        <Navigator
          initialRoute = {{
            id: this.state.id, 
            name: this.state.name}}
          configureScene = {() => {
            return Navigator.SceneConfigs.FloatFromRight
          }}
          renderScene = {(route, navigator) => {
            if(route.id === 'logout'){
              return (
                <Login
                navigator={navigator}
                firebaseApp={firebaseApp} />
              )
            }
            if(route.id === 'login'){
              return (
                <Login
                navigator={navigator}
                firebaseApp={firebaseApp} />
              )
            } else if(route.id === 'signup'){
              return(
                <Signup
                  navigator={navigator}
                  firebaseApp={firebaseApp} />
              )
            } else if(route.id === 'reg'){
              return(
                <Account
                  page_type = 'reg'
                  navigator={navigator}
                  firebaseApp={firebaseApp} />
            )
            } else if(route.id === 'account'){
              return(
                <Account
                  page_type = 'acc'
                  navigator={navigator}
                  firebaseApp={firebaseApp} />
              )
            } else if(route.id === 'order'){
              return(
                <Order
                  navigator={navigator}
                  firebaseApp={firebaseApp} />
              )
            } else if(route.id === 'test'){
              return(
                <Test
                  navigator={navigator}
                  firebaseApp={firebaseApp} />
              )
            }
          }} />
      )}else{
        return (
          <View style = {styles.container}>
            <ActivityIndicator size = "large" />
          </View>
        )
      }
  }
}

AppRegistry.registerComponent('dirtydrawz', () => dirtydrawz)
