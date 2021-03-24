
import {StyleSheet, Dimensions} from 'react-native'

const windowWidth=Dimensions.get('window').width

const FormStyle = StyleSheet.create({
    container:{
        flex:1,
        height:'100%',
        justifyContent:'center',
        width: windowWidth,
        padding:20
    },
    title:{
       textAlign:'center',
       fontSize:20,
       textTransform:'uppercase',
       fontWeight:'500'
    },
    label :{
       marginLeft:5,
       marginBottom:5
    },
      button: {
        backgroundColor:'lightseagreen',
        height:40,
        borderRadius:5,
        justifyContent:'center'
      },
      buttonText :{
          textTransform:'uppercase',
          color:'white',
          textAlign:'center',
        
      },
     input: {
         height:40, 
         borderColor:'lightgrey',
         borderWidth:1 , 
         borderRadius:5,
         marginBottom:5,
         padding:10
      },
      links :{
          flexDirection:'row',
          justifyContent:'space-evenly',
      
          
      },
      error:{
          color:'red',
          paddingBottom:10,
          marginLeft:5
      }
     
  })
  
  export default FormStyle