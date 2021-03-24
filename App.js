import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

// auth 
import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
import {
  Authenticator,  
  SignIn, 
  
  ConfirmSignIn, 
  ForgotPassword,
} from 'aws-amplify-react-native'

import SignUp from './src/Auth/Signup'
import ConfirmSignUp from './src/Auth/ConfirmSignup'

Amplify.configure(awsconfig);

const Home =(props)=>{
  console.log('authState', props.authState)
  if(props.authState==='signUp') {
    return <Text>Home</Text>
  } else {
    return <Text>Not SignIn</Text>; 
  }
}


export default function App() {
  return (
    <View style={styles.container}>
      <Authenticator 
      usernameAttributes="email" 
      hideDefault={true}
      authState='SignIn'
      onStateChange={(authState)=>console.log('authState ...', authState)}>
        <Home/>
        <SignUp/>
        <SignIn/>
        <ConfirmSignIn/>
        <ConfirmSignUp/>
        <ForgotPassword/>
      <StatusBar style="auto" />
      </Authenticator>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
