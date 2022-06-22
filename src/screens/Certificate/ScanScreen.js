
import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Dimensions} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const ScanScreen = ({route, navigation}) => {
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const SCREEN_WIDTH = Dimensions.get("window").width;

  const [QRCode, setQRCode] = useState('nothing QR now');

  const onSuccessLoad = (e) => {
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
    // console.log('success');
    navigation.reset({
      index: 0,
      routes: [
        { name: 'TabContainer' },
        { name: 'CredentialList', 
          params:{
            from:'VerifyCertificationScan'
          },
        }
      ],
    });
  }


  const onPressShowRoute = () => {
    console.log(route.params);
  }
  const onRead = (e) => {
    setQRCode(e.data);
    console.log('e= ', e);
  }

  // const backButton = () => {
  //   navigation.goBack();
  // }

  return (
    <View style={{flex:1}}>
      <QRCodeScanner
        cameraStyle={{height:SCREEN_HEIGHT,width:SCREEN_WIDTH}}
        onRead={onSuccessLoad}
        flashMode={RNCamera.Constants.FlashMode.torch}
        showMarker={true}
        customMarker={
          <View style={{flex:1, justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
            <MaterialCommunityIcons name='scan-helper' style={styles.aimIcon} size={(SCREEN_HEIGHT * 0.475) }></MaterialCommunityIcons>
          </View>
        }
      />
      {/* <TouchableOpacity  onPress={backButton} style={{position:'absolute', top: 10, left: 10 ,borderRadius:100}}>
        <Ionicons 
          name = 'arrow-back-circle-sharp'
          size={50} 
          style={{color:'white'}}
        ></Ionicons>
      </TouchableOpacity> */}
    </View>

  );
}


const styles = StyleSheet.create({
  body:{
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16,
    backgroundColor: 'yellow'
  },
  screenOpacity:{
    backgroundColor: 'green',
    opacity: 0.6,
    flex:1,
    position: 'absolute'
  },
  rectangleContainer:{
    flex:1,
    backgroundColor: 'red',
    flexDirection:'row',
  },
  aimIcon:{
    color:'white',
    justifyContent:'center',
    alignItems:'center',
    flex:1,
    fontWeight: '100'
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

export default ScanScreen;


