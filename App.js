import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

// auth 
import Amplify,{Auth} from 'aws-amplify'
import awsconfig from './aws-exports'
import {
  Authenticator,  
// SignIn, 
//  ConfirmSignIn, 
//  ForgotPassword,
} from 'aws-amplify-react-native'

import SignUp from './src/Auth/Signup'
import SignIn from './src/Auth/Signin'
import ConfirmSignUp from './src/Auth/ConfirmSignup'
import ForgotPassword from './src/Auth/ForgotPassword'
import ChangePassword from './src/Auth/ChangePassword'

Amplify.configure(awsconfig);

function Home(props){
return (
  <View>
   <Text>Welcome</Text>
    <Button title="Sign Out" onPress={()=>Auth.signOut()}/>
  </View>
)
}


const AuthScreens = (props)=>{
  console.log("props", props.authState)
  switch(props.authState){
    case 'signIn': 
     return <SignIn {...props}/>
    case 'signUp':
      return <SignUp {...props}/>
    case 'forgotPassword':
      return <ForgotPassword {...props} />  
    case 'confirmSignUp':
      return <ConfirmSignUp {...props}/>  
    case 'changePassword':
      return <ChangePassword {...props}/>
    case 'signedIn':
      return <Home />  
    default :
    return <></>;

  }
   
}




const App=()=> {
  return (
    <View style={styles.container}>
      <Authenticator 
      usernameAttributes="email" 
      hideDefault={true}
      authState='SignUp'
      onStateChange={(authState)=>console.log('authState ...', authState)}>
        <Home/>
       <AuthScreens/>
      <StatusBar style="auto" />
      </Authenticator>
    
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
