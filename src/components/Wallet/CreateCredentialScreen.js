import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Button
} from 'react-native';


const CreateCredentialScreen = (props) => {
  const BLOCK_LOGO_SIZE = 50;
  
  const onNavigateScreen = (destination) => {
    props.navigation.push(destination);

  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>{onNavigateScreen('SchemaList')}} style={styles.block}>
        <Text style={styles.blockText}>Schema</Text>
        <Ionicons name='ios-eye-outline' size={BLOCK_LOGO_SIZE} color='black'></Ionicons>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{onNavigateScreen('DefinitionList')}} style={styles.block}>
        <Text style={styles.blockText}>Definition</Text>
        <Ionicons name='ios-key-outline' size={BLOCK_LOGO_SIZE} color='black'></Ionicons>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{onNavigateScreen('DC_SettingKey')}} style={styles.block}>
        <Text style={styles.blockText}>Deploy Credential</Text>
        <Ionicons name='md-ribbon-outline' size={BLOCK_LOGO_SIZE} color='black'></Ionicons>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{onNavigateScreen('GetCredential')}} style={styles.block}>
        <Text style={styles.blockText}>Get Credential</Text>
        <Ionicons name='scan-outline' size={BLOCK_LOGO_SIZE} color='black'></Ionicons>
      </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  container:{
    padding:10,
    flexWrap:'wrap',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  block:{
    borderWidth: 2,
    borderColor:'black',
    width:150,
    height:150,
    borderRadius:20,
    alignItems:'center',
    justifyContent:'space-between',
    margin:15,
    padding:20,
    
  },
  blockText:{
    fontSize:20,
    textAlign:'center'
    
  }


});

export default CreateCredentialScreen;