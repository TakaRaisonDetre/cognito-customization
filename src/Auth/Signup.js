import React , {useState}from 'react'
import {View, Text, Button , TextInput, TouchableOpacity,  Alert} from 'react-native'
import {validateEmail, validatePassword} from '../validation'
import {Auth} from 'aws-amplify'
import FormStyle from '../styles/FormStyles'


const SignUp = (props) =>{

const [state, setState] = useState({email:'',password:''});
const [error, setErrors] = useState({email: '', password: ''});



const OnSubmit= async()=>{
    const emailError = validateEmail(state.email)
    const passwordError = validatePassword(state.password)
    if(emailError || passwordError){
        setErrors({email:emailError, password:passwordError})
    } else {
      try{
        const user = await Auth.signUp({
            username: state.email,
            password: state.password
        });
        props.onStateChange('confirmSignUp', user);
      } catch(e) {
          console.error(e.message)
          Alert.alert(e.message)
      }
       
    }
}


if (props.authState === 'signUp')
  return  (
      <View style={FormStyle.container}>
          <Text style={FormStyle.title}>SignUp</Text>
          <Text style={FormStyle.label}>Email</Text>
        <TextInput
        placeholder="Enter Email"
        style={FormStyle.input}
        onChangeText ={(text)=> setState({...state, email:text.toLowerCase()})}
        value={state.email} />
        <Text style={FormStyle.error}>{error.email}</Text>
         <Text style={FormStyle.label} >Password</Text>
        <TextInput
        placeholder="Enter Password"
        style={FormStyle.input}
        onChangeText ={(text)=> setState({...state, password:text.toLowerCase()})}
        value={state.password} 
        secureTextEntry={true}
        />
         <Text style={FormStyle.error}>{error.password}</Text>

    <TouchableOpacity
    style={FormStyle.button}
    onPress={OnSubmit}
    >
        <Text style={FormStyle.buttonText}>Sign Up</Text>
    </TouchableOpacity>

<View style={FormStyle.links}>
     <Button 
          onPress={()=>props.onStateChange('signIn', {} )}
          title = "back to Sign In"
          color="grey"
          accessibilityLabel="back to signIn" />

      <Button 
          onPress={()=>props.onStateChange('confirmSignUp', {} )}
          title = "confirm Code"
          color="grey"
          accessibilityLabel="back to confirm code" />
</View>
          
      </View>
  );
  else return <></>
}

export default SignUp 

