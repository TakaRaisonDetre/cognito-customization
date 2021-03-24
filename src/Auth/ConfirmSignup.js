import React , {useState}from 'react'
import {View, Text, Button , TextInput, TouchableOpacity,  Alert} from 'react-native'
import {validateEmail} from '../validation'
import {Auth} from 'aws-amplify'
import FormStyle from '../styles/FormStyles'


const ConfirmSignUp = (props) =>{

const [state, setState] = useState({email:'',confirmationCode:''});
const [error, setErrors] = useState({email: ''});



const OnSubmit= async()=>{
    const {email: username, confirmationCode : code} = state ; 
    const emailError = validateEmail(state.email)
    
    if(emailError){
        setErrors({email:emailError})
    } else {
      try{
        const user = await Auth.confirmSignUp(username, code);
        setState({confirmationCode:''})
        props.onStateChange('signIn')
      } catch(e) {
          console.error(e.message)
          Alert.alert(e.message)
      }
       
    }
}


if (props.authState === 'confirmSignUp')
  return  (
      <View style={FormStyle.container}>
          <Text style={FormStyle.title}>Confirm SignUp</Text>
          <Text style={FormStyle.label}>Email</Text>
        <TextInput
        placeholder="Enter Email"
        style={FormStyle.input}
        onChangeText ={(text)=> setState({...state, email:text.toLowerCase()})}
        value={state.email} />
        <Text style={FormStyle.error}>{error.email}</Text>
         <Text style={FormStyle.label} >Confirmation Code</Text>
        <TextInput
        placeholder="Enter Confirmation Code"
        style={FormStyle.input}
        onChangeText ={(text)=> setState({...state, confirmationCode:text.toLowerCase()})}
        value={state.confirmationCode} />
       

    <TouchableOpacity
    style={FormStyle.button}
    onPress={OnSubmit}
    >
        <Text style={FormStyle.buttonText}>Confirm Sign Up</Text>
    </TouchableOpacity>

<View style={FormStyle.links}>
     <Button 
          onPress={()=>props.onStateChange('signIn', {} )}
          title = "back to Sign In"
          color="grey"
          accessibilityLabel="back to signIn" />

      <Button 
          onPress={()=>props.onStateChange('signUp', {} )}
          title = "back to Sign Up"
          color="grey"
          accessibilityLabel="back to sign up" />
</View>
          
      </View>
  );
  else return <></>
}

export default ConfirmSignUp 

