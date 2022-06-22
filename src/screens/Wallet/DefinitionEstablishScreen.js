import React, {useEffect, useState} from 'react';
import {Colors} from '../../components/utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  Text,
  TouchableOpacity
} from 'react-native';

import {
  Button,
  Dialog,
  CheckBox,
  ListItem,
  Avatar,
  } from '@rneui/themed';

const DefinitionEstablishScreen = (props) => {

  const [selectedSchema, setSeletedSchema] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setSeletedSchema(() => (props.route.params));
  },[props.route.params]);


  const onSelectSchema = () => {
    props.navigation.navigate('DE_SelectSchema');

  }

  const onGenerate = () => {
    setModalVisible(!modalVisible);
    
  }

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const modalClose = () => {
    props.navigation.reset({
      index: 0,
      routes: [
        { name: 'TabContainer' },
        { name: 'CreateCredential'},
        { name: 'DefinitionList'},
        { 
          name: 'DefinitionDetail',
          params:{
            selectedSchema
          }
        }],
    });
    setModalVisible(!modalVisible);
  }

  return (
    <View style={styles.container}>
      <View style={styles.editArea}>
        <View style={styles.section}>
          <Text style={styles.title}>Definition Name</Text>
          <TextInput style={styles.input} placeholder='Please enter definition name'></TextInput>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Schema</Text>
            {
              selectedSchema === undefined ? ( 
                <View style={styles.btnArea}>
                  <TouchableOpacity onPress={onSelectSchema} style={styles.btn}>
                    <Text style={styles.btnText}>Select Schema</Text>
                  </TouchableOpacity>
                </View>
              )
                :
              (
                <View>
                  <View style={styles.dataArea}>
                    <View style={styles.pair}>
                      <Text style={styles.dataTextL}>Name</Text>
                      <Text style={styles.dataTextR}>{selectedSchema.schema_title}</Text>
                    </View>
                    <View style={styles.pair}>
                      <Text style={styles.dataTextL}>Version</Text>
                      <Text style={styles.dataTextR}>{selectedSchema.version}</Text>
                    </View>
                    <View style={styles.pair}>
                      <Text style={styles.dataTextL}>Attribute</Text>
                      <Text style={styles.dataTextR}>{selectedSchema.attribute}</Text>
                    </View>
                  </View>
                  <View style={styles.btnArea}>
                    <TouchableOpacity onPress={onSelectSchema} style={styles.btn}>
                      <Text style={styles.btnText}>Change Schema</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            }
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Tag</Text>
          <TextInput style={styles.input} placeholder='Please enter tag'></TextInput>
        </View>
      </View>
      <View style={styles.btnArea}>
        <TouchableOpacity onPress={onGenerate} style={styles.btn}>
          <Text style={styles.btnText}>Generate Definition</Text>
        </TouchableOpacity>
      </View>

      <Dialog
        isVisible={modalVisible}
        onBackdropPress={toggleModal}>
        <View style={{flexDirection:'row'}}>
          <Ionicons name='checkmark' size={50} color='green'></Ionicons>
          <Dialog.Title title="Definition generated successfully."/>
        </View>
        <Dialog.Actions style={{borderWidth:2, color:'red'}}>
          <Dialog.Button               
            titleStyle={styles.btnText} 
            buttonStyle={styles.modalBtn} 
            title="Close" onPress={modalClose} />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}



const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    justifyContent:'space-between',

  },
  editArea:{
    justifyContent:'space-evenly',
  },
  section:{
    marginBottom:30
  },
  dataArea:{
    margin:20,
    backgroundColor:Colors.contentAreaLightBlue,
    padding: 10,
    borderRadius: 10
  },
  pair:{
    justifyContent:'space-between',
    flexDirection:'row'

  },
  dataTextL:{
    fontSize:18,
    flex:1,
    justifyContent:'flex-end',
    textAlign:'left'
  },
  dataTextR:{
    fontSize:18,
    flex:2,
    justifyContent:'flex-end',
    textAlign:'right'
  },
  btnArea:{
    alignItems:'center'
  },
  btn:{
    width:300,
    height:40,
    backgroundColor:'#2196f3',
    borderRadius:10,
    justifyContent:'center',
    shadowColor: '#171717',
    shadowColor: 'black',
    shadowOpacity: 0.56,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 20,
    elevation: 5,

  },
  btnText:{
    color:'white',
    fontSize:20,
    textAlign:'center'

  },
  title:{
    fontSize:20,
    fontWeight:'bold',
    color:'black'
  },
  input:{
    height: 30,
    margin: 12,
    borderBottomWidth: 1,
    paddingVertical:0,
    paddingLeft:10
  },
  modalBtn:{
    backgroundColor:Colors.buttonBlue,
    color:'white',
    borderRadius:20,
    width:150,
    margin:0,
    padding:0,
    height:30

  }


});

export default DefinitionEstablishScreen;