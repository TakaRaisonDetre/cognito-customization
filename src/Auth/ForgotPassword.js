import React, {useState} from 'react'
import {View,Text, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import {Auth} from 'aws-amplify';

import {MaterialIcons} from '@expo/vector-icons'
import {FormStyles} from '../styles/FormStyles'

import useForm from '../useForm'
import {validateEmail} from '../validation'



const ForgotPassword = (props) => {
  const initialValues = {email:''}

  const {values, onSubmit, onChange, errors} = useForm(
      forgotPassword,
      initialValues,
      validateSignup
  );

  const [error, setError] = useState()
  
  const forgotPassword= async()=>{
    let username = values.email;
    try {
      await Auth.forgotPassword(username);
      props.onStateChange('changePassword', {});
      setError({});
    } catch(e) {
        setError('User does not exist')
    }
  }

  const validateSignup=()=>{
      const errors = {};
      errors.email = validateEmail(values.email);
    return errors
  }
  
    return (
        <View style={FormStyles.container}>
            <View style={FormStyles.bgcontainer}>
            <Text style={FormStyles.title}>Forgot Password</Text>
            <View style={FormStyles.labelWrapper}>
            <MaterialIcons name="email" size={13} style={FormStyles.labelIcon} />
             <Text style={FormStyles.labelText}> Email </Text>
            </View>

            <TextInput
                style={FormStyles.textbox}
                autoCompleteType="email"
                onChangeText={(text) => onChange({name: 'email', value: text})}
                value={values.email}
                placeholder="Enter Email"
                />

               {errors.email && <Text style={FormStyles.error}>{errors.email}</Text>}  

               <TouchableOpacity style={FormStyles.button} onPress={onSubmit}>
               <Text style={FormStyles.buttonText}>Send</Text>
              </TouchableOpacity>

          <View style={FormStyles.formLinks}>
            <TouchableWithoutFeedback
                onPress={() => props.onStateChange('signIn', {})}>
                <Text style={FormStyles.linkText}>Back to Sign In</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPress={() => props.onStateChange('changePassword', {})}>
                <Text style={FormStyles.linkText}>Change Password</Text>
            </TouchableWithoutFeedback>
            </View>
            {error && <Text style={FormStyles.error}>{error}</Text>}
            </View>
        </View>
    )
}

export default ForgotPassword


