import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  ActivityIndicator, 
} from 'react-native';
  
import { ListItem, Dialog,} from '@rneui/themed'
import {Colors} from '../utils/Colors'


const CredentialDetailScreen = (props) => {

  const [fromPage, setFromPage] = useState('VerifyCertificationScan');
  const [showLoading, setShowLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(()=>{
    if(props.route.params.from !== undefined)
      setFromPage(props.route.params.from);

    setTimeout(()=>{
      setShowLoading(false);
    },
    500)
  },[]);


  const list = {
    credential_name: 'Customized Credential Name by Individual',
    issued_date: '2022/04/06',
    ca2: 'Snowbridge',
    issued_date2: '2022/04/06',
    ca3: 'Snowbridge',
    issued_date3: '2022/04/06',
    ca4: 'Snowbridge',
    issued_date6: '2022/04/06',
    ca5: 'Snowbridge',
    issued_date7: '2022/04/06',
    ca6: 'Snowbridge',
    issued_date8: '2022/04/06',
    ca7: 'Snowbridge',
  }

  const onVerify = () => {
    setModalVisible(!modalVisible);
  }

  const onVerifiedHistory = () => {
    // setModalVisible(!modalVisible);
  }

  const onModalConfirm =() => {
    setModalVisible(!modalVisible);
    props.navigation.reset({
      index: 0,
      routes: [
        { name: 'TabContainer' },
        { 
          name: 'CredentialHistoryDetail',
          params:{
            test:1234
          }
        }],
    });
  }

  //Dialog control
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const modalClose = () => {
    // props.navigation.reset({
    //   index: 0,
    //   routes: [
    //     { name: 'TabContainer' },
    //     { name: 'CreateCredential'},
    //     { name: 'DefinitionList'},
    //     { 
    //       name: 'DefinitionDetail',
    //       params:{
    //         selectedSchema
    //       }
    //     }],
    // });
    setModalVisible(!modalVisible);


  }
  
  const VerifyModal = () => {
    return(
      <Dialog
        isVisible={modalVisible}
        onBackdropPress={toggleModal}
        overlayStyle={{height:200,width:300, justifyContent:'space-around' , paddingHorizontal:20,paddingBottom:0}}>
        <View>
          <Dialog.Title title="請確認是否認證此憑證？"/>
        </View>
        <Dialog.Actions>
          <Dialog.Button               
            titleStyle={styles.modalBtnText} 
            buttonStyle={styles.modalCancelBtn} 
            title="取消" onPress={modalClose} />
          <Dialog.Button               
            titleStyle={styles.modalBtnText} 
            buttonStyle={styles.modalYesBtn} 
            title="確認" onPress={onModalConfirm} />
        </Dialog.Actions>
      </Dialog> 
    )
  }

  const DetailList = () => {
    let i = 0;
    const abc = Object.keys(list).map(function(keyName, keyIndex) {
      // use keyName to get current key's name
      // and a[keyName] to get its value

      return(
        <ListItem key={keyIndex} containerStyle={{backgroundColor:'#F4F4F4'}}>
          <ListItem.Content>
            <View style={styles.subtitleView}>
              <Text style={styles.aaa}>{keyName}</Text>
              <Text style={styles.bbb}>{list[keyName]}</Text>
            </View>
          </ListItem.Content>
        </ListItem>
      )
    })
    return abc;
  }
  
  //render page
  return (
    <View style={{flex:1}}>
    {
      showLoading === true ? (
        <View style={[styles.container,{justifyContent:'center'}]}>
          <ActivityIndicator size="large" />
        </View>      
      )
      :
      (
        <View style={styles.container}>
          <View style={styles.cardArea}>
            <View style={styles.card}>
              <View style={styles.dateArea}>
                <Text style={styles.dateText}>Issued 2022/04/06</Text>
              </View>
              <View style={styles.nameArea}>
                <Text style={styles.credentialName}>Customized Credential Name by Individual</Text>
              </View>                    
            </View>
          </View>
          <View style={styles.detailArea}>
            <ScrollView persistentScrollbar={true} >
              <DetailList></DetailList>
            </ScrollView>
          </View>
          <View style={styles.buttonArea}>
            {
              fromPage === 'VerifyCertificationScan' ? (
                <TouchableOpacity onPress={onVerify} style={styles.btn}>
                  <Ionicons name='md-checkmark' size={60} color={Colors.successGreen}></Ionicons>
                  <Text>驗證此憑證</Text>
                </TouchableOpacity>
              )
              :
              (
                <TouchableOpacity onPress={onVerifiedHistory} style={styles.btn}>
                  <Ionicons name='library' size={60} color='black'></Ionicons>
                  <Text>憑證被查驗</Text>
                  <Text>歷程紀錄</Text>
                </TouchableOpacity>
              )
            }
          </View>
        </View>
      )
    }
    <VerifyModal></VerifyModal>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    padding:20,
    flex:1
  },
  cardArea:{
    flex:2,
  },

  card:{
    height:150,
    margin:20,
    marginTop:0,
    backgroundColor:'#215cf3',
    paddingTop: 20,
    borderRadius:20,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3,
  },
  dateArea:{
    backgroundColor:'#2196f3',
  },
  dateText:{
    height:20,
    color:'white',
    textAlign:'right',
    paddingRight:5

  },
  nameArea:{
    flex:1,
    width:200,
    justifyContent:'flex-end',
    paddingLeft:10,
    paddingBottom: 10
  },
  credentialName:{
    color:'white',
  },
  detailArea:{
    flex:4,

  },

  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
    justifyContent:'space-between',
    borderBottomWidth:1,
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  },
  aaa:{
    flex:1,
    textAlign:'left',
  },
  bbb:{
    flex:1,
    textAlign:'right'
  },
  buttonArea:{
    flex:1,
    marginTop: 30,
    paddingTop:20,
    borderTopWidth:1,
    borderTopColor:'gray',

    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  modalContainer:{
    
  },
  modalYesBtn:{
    backgroundColor:'#2196f3',
    color:'white',
    borderRadius:10,
    width:150,
    height:30,
    padding:0,
  },
  modalCancelBtn:{
    backgroundColor:'#616161',
    color:'white',
    borderRadius:10,
    width:75,
    height:30,
    padding:0,
    marginLeft: 30
  },
  modalBtnText:{
    color:'white',
    fontWeight:'bold',
    fontSize:20
  }

});

export default CredentialDetailScreen;