import React, {useState, useEffect, useRef} from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  Text,
  ScrollView,
  Animated,
  Image
} from 'react-native';
import { Switch } from '@rneui/themed';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import LoadingComponent from '../utils/LoadingComponent';
import {Colors} from '../utils/Colors';
import RuleCard from './RuleCard';
import * as Animatable from 'react-native-animatable';

const QRCodeScreen = (props) => {
  const [loadingShow, setLoadingShow] = useState(false);
  const loadingStatusText = ['正在等待對方選擇憑證', '正在驗證憑證...'];

  const onCopy = () => {

  }

  const onDownload = () => {

  }

  const onLoadingShow = () => {
    setLoadingShow(!loadingShow);
  }
  
  return (
    <View style={{flex:1}}>
    {
      loadingShow === true ? 
      (<LoadingComponent nv={props.navigation} loadingStatusText={loadingStatusText} from='VerifyCredential'/>)
      : 
      (
        <View style={styles.container}>
          <View style={styles.QRArea}>
            <TouchableOpacity
              style={styles.contentBtn}
              onPress={onLoadingShow}>
              <Image
                  style={styles.logo}
                  source={require('../../images/QR_Code_Logo.png')}
              ></Image>
            </TouchableOpacity>

          </View>
          <Text style={styles.informArea}>掃描此QR Code以查驗執照</Text>
          <View style={styles.footer}>
            <TouchableOpacity
                style={styles.contentBtn}
                onPress={onCopy}>
                <Ionicons name='copy' size={65} color='black'></Ionicons>
                <Text style={styles.buttonText}>複製</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.contentBtn}
                onPress={onDownload}>
                <Ionicons name='download' size={65} color='black'></Ionicons>
                <Text style={styles.buttonText}>下載</Text>
            </TouchableOpacity>
          </View>
        </View>
      )

    }
  </View>
    
  );
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,

  },
  QRArea:{
      flex:5,
      justifyContent:'space-evenly',
      alignItems:'center',
  },
  informArea:{
    textAlign:'center',
    marginBottom:20
  },
  buttonText:{
    textAlign:'center',

  },
  footer:{
      flex:1,
      borderTopWidth:2,
      borderColor:'#bdbdbd',
      justifyContent:'space-evenly',
      alignItems:'center',
      flexDirection:'row',
      padding:20

  },
  logo:{
    height:325,
    width:300
  },

});

export default QRCodeScreen;