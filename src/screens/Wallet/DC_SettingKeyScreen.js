import React, {useEffect, useState, useRef} from 'react';
import { ListItem, Avatar } from '@rneui/themed'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  Animated,
  KeyboardAvoidingView
} from 'react-native';
import LoadingComponent from '../../components/utils/LoadingComponent';
import {Colors} from '../../components/utils/Colors';

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const DC_SettingKeyScreen = (props) => {
  const [issueDate , setIssueDate] = useState('');
  const [credentialName , setCredentialName] = useState('');
  const [selectedDefinition , setSelectedDefinition] = useState();
  const [showHalfPage, setShowHalfPage] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  const loadingStatusText = ['正在等待對方選擇憑證', '正在驗證憑證...','憑證驗證完成，正在跳轉頁面'];

  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const SCREEN_WIDTH = Dimensions.get("window").width;

  var growUpHalfPageAnim = useRef(new Animated.Value(0)).current;

  const growUp = (fadeAnim) => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(growUpHalfPageAnim, {
      toValue: SCREEN_HEIGHT * 0.65,
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  const shrivel = (fadeAnim) => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(growUpHalfPageAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  const onSelectDefinition = () => {
    props.navigation.navigate('SelectDefinition');
  }

  const onGenerateQR = () => {
    // setShowHalfPage(true);
    growUp();
  }
  const onCopy = () => {

  }

  const onDownload = () => {
  }

  const onCloseHalfPage = () => {
    shrivel();
    // setShowHalfPage(false);

  }
  
  const onShowLoading = () => {
    onCloseHalfPage();
    setShowLoading(!showLoading);

  }
  
  useEffect(() => {
    console.log(props.route.params);
    if(props.route.params !== undefined)
      setSelectedDefinition(props.route.params)
  });

  return (
    <View style={{flex:1}}>
      <View style={{flex:1}}>
        {
          showLoading === true ? 
          (<LoadingComponent nv={props.navigation} loadingStatusText={loadingStatusText} from='DeployCredential'/>)
          :
          (
          <View style={styles.container}>
            <View style={styles.mainArea}>
              <View style={styles.cardArea}>
                <View style={styles.card}>
                  <View style={styles.dateArea}>
                    <Text style={styles.dateText}>Issued Date{}</Text>
                  </View>
                  <View style={styles.nameArea}>
                    <Text style={styles.credentialName}>CredentialName</Text>
                  </View>                    
                </View>
              </View>
              <View style={styles.editArea}>
                <View style={styles.section}>
                  <Text style={styles.title}>Definition</Text>
                    {
                      selectedDefinition === undefined ? ( 
                        <View style={styles.btnArea}>
                          <TouchableOpacity onPress={onSelectDefinition} style={styles.btn}>
                            <Text style={styles.btnText}>選擇Definition</Text>
                          </TouchableOpacity>
                        </View>
                      )
                        :
                      (
                        <View>
                          <View style={styles.dataArea}>
                            <View style={styles.pair}>
                              <Ionicons style={{flex:1}} name="ios-square" size={60} color='#cddc39'/>
                              <Text style={styles.dataTextR}>ggggg{selectedDefinition.definition_name}</Text>
                            </View>
                          </View>
                          <View style={styles.btnArea}>
                            <TouchableOpacity onPress={onSelectDefinition} style={styles.btn}>
                              <Text style={styles.btnText}>Change Definition</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )
                    }
                </View>
                {
                  selectedDefinition !== undefined ? (
                    <View style={styles.section}>
                      <Text style={styles.title}>設定系統參數</Text>
                      <View style={styles.paramArea}>
                        <View style={styles.headArea}>
                          <Text style={styles.title}>Key</Text>
                          <Text style={styles.title}>Value</Text>
                        </View>
                        <View style={styles.inputArea}>
                          <TextInput editable={false} value='CredentialName' style={[styles.input,{flex:1, backgroundColor:'#e0e0e0', color:'black'}]}></TextInput>
                          <Text style={[styles.title,{width:20, textAlign:'center'}]}>:</Text>
                          <TextInput style={[styles.input,{flex:1}]}></TextInput>
                        </View>
                        <View style={styles.inputArea}>
                          <TextInput editable={false} value='Attribute' style={[styles.input,{flex:1, backgroundColor:'#e0e0e0', color:'black'}]}></TextInput>
                          <Text style={[styles.title,{width:20, textAlign:'center'}]}>:</Text>
                          <TextInput style={[styles.input,{flex:1}]}></TextInput>
                        </View>
                      </View>
                    </View>
                  ) : 
                  (null)
                }
              </View>
              {
                selectedDefinition !== undefined ? (
                  <View style={styles.btnArea}>
                    <TouchableOpacity onPress={onGenerateQR} style={styles.btn}>
                      <Text style={styles.btnText}>Generate QR Code</Text>
                    </TouchableOpacity>
                  </View>
                ) : 
                (null)
              }
            </View>
          </View>
          )
        }
      </View>
      {
        showHalfPage ? (
          <Animated.View style={[styles.halfPage,{height:growUpHalfPageAnim}]}>
            <View style={styles.halfPageWrap}>
              <TouchableOpacity onPress={onCloseHalfPage} style={{alignItems:'flex-end'}}>
                <Ionicons name='md-close-circle' size={30}></Ionicons>
              </TouchableOpacity>
              <View style={styles.QRArea}>
                <TouchableOpacity
                  style={styles.contentBtn}
                  onPress={onShowLoading}>
                  <Image
                      style={styles.logo}
                      source={require('../../assets/images/QR_Code_Logo.png')}
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
          </Animated.View>
        ) 
        : null
      }
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    padding:20,
  },
  mainArea:{
  },
  editArea:{
    marginTop:20
  },
  section:{
    marginBottom:50
  },
  dataArea:{
    margin:20,
    backgroundColor:Colors.contentAreaLightBlue,
    padding: 10,
    borderRadius: 10
  },
  pair:{
    flexDirection:'row'
  },
  title:{
    fontSize:20,
    fontWeight:'bold',
    color:'black'
  },
  dataTextR:{
    fontSize:25,
    flex:4,
    alignItems:'center',
    alignContent:'center',
    flexDirection:'column',
    justifyContent:'center',
  },
  cardArea:{
  },
  card:{
    height:150,
    marginHorizontal:20,
    marginVertical:10,
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
  paramArea:{

  },
  headArea:{
    justifyContent:'space-between',
    flexDirection:'row'
  },
  inputArea:{
    flexDirection:'row',
    marginVertical:10
  },
  input:{
    height: 30,
    borderWidth: 2,
    borderColor:'#e0e0e0',
    borderRadius:5,
    paddingVertical:0,
    paddingLeft:10,
    flex:1
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
  halfPage:{
    height:SCREEN_HEIGHT * 0.65,
    width:SCREEN_WIDTH,
    borderTopWidth:2,
    borderWidth:2,
    borderColor:'black',
    borderRadius:20,
    position:'absolute',
    backgroundColor:'white',
    bottom:-5,
    left:0
  },
  halfPageWrap:{
    flex:1,
    padding:20,
  },
  logo:{
    height:325,
    width:300
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
});

export default DC_SettingKeyScreen;