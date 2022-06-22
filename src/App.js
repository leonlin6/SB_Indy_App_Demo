import React,{useState, useEffect} from 'react';
import { LogBox, StyleSheet } from "react-native"

// import { AuthContext } from './components/context';
import {connect} from 'react-redux';

import { NavigationContainer, TabActions, useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from './components/utils/Colors'

// navigators
import RootStackScreen from './navigators/RootStackScreen';
import WalletScreen from './navigators/WalletScreen';
import CertificateScreen from './navigators/CertificateScreen';


// Login Page
import LogoutScreen from './screens/Login/LogoutScreen';


// Wallet Page
import CredentialListScreen from './screens/Wallet/CredentialListScreen';
import CredentialDetailScreen from './screens/Wallet/CredentialDetailScreen';
import CreateCredentialScreen from './screens/Wallet/CreateCredentialScreen';
import CredentialHistoryScreen from './screens/Wallet/CredentialHistoryScreen';
import CredentialHistoryDetailScreen from './screens/Wallet/CredentialHistoryDetailScreen';
import InternetSettingScreen from './screens/Wallet/InternetSettingScreen';

// Wallet Page - Create Credential
import SchemaListScreen from './screens/Wallet/SchemaListScreen';
import DefinitionListScreen from './screens/Wallet/DefinitionListScreen';
import DC_SettingKeyScreen from './screens/Wallet/DC_SettingKeyScreen';

import DefinitionDetailScreen from './screens/Wallet/DefinitionDetailScreen';
import DefinitionEstablishScreen from './screens/Wallet/DefinitionEstablishScreen';
import DE_SelectSchemaScreen from './screens/Wallet/DE_SelectSchemaScreen';
import SelectDefinitionScreen from './screens/Wallet/SelectDefinitionScreen';
import GetCredentialScreen from './screens/Wallet/GetCredentialScreen';


// Certificate Page
import ScanScreen from './screens/Certificate/ScanScreen';
import CreateQRScreen from './screens/Certificate/CreateQRScreen';
import QRCodeScreen from './screens/Certificate/QRCodeScreen';
import CertificateHistoryScreen from './screens/Certificate/CertificateHistoryScreen';
import CertificateHistoryDetailScreen from './screens/Certificate/CertificateHistoryDetailScreen';

// utils
import SuccessScreen from './components/utils/SuccessScreen';

import IndyTest from './screens/IndyTest';



import { 
  TouchableOpacity,
} from 'react-native';

const App = (props) => {

  const ignoreWarns = [
    "ViewPropTypes will be removed",
  ];

  const warn = console.warn;
  console.warn = (...arg) => {
      for (let i = 0; i < ignoreWarns.length; i++) {
          if (arg[0].startsWith(ignoreWarns[i])) return;
      }
      warn(...arg);
  };

  LogBox.ignoreLogs(ignoreWarns);


  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  // const Drawer = createDrawerNavigator();
  // const AuthContext = createContext();

  const [showAuthDraw, setShowAuthDraw] = useState(false);


  useEffect(  
    () => {
      try{
        if(props.loginToken !== null){
          if(props.loginToken.userAuth.level === 'administrator'){
            setShowAuthDraw(true);
          }else{
            setShowAuthDraw(false);
          }
        }
      }catch(error){
        console.log('error', error);
      }
    }, 
    [props.loginToken]
  );

  const onPersonalSetting = () => {
    console.log('teststes');
  }

  const TabContainer = () => {
    return(
      <Tab.Navigator initialRouteName="Certificate"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            
            if (route.name === 'Certificate') {
              iconName = focused ? 'journal-sharp' : 'journal-sharp';
            } else if (route.name === 'Wallet') {
              iconName = focused ? 'ios-wallet' : 'ios-wallet-outline';
            } 

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },

        })}>
        <Tab.Screen name='Certificate' component={CertificateScreen}   
          options={{
            headerLeft: (props) => (
              <TouchableOpacity style={{marginLeft:10}} onPress={onPersonalSetting}>
                <Ionicons name='md-person-circle' size={45} color={Colors.puzzleBlue}></Ionicons>
              </TouchableOpacity>
            ),
            headerTitle:'查驗',
            headerTitleAlign:'center',
            headerStyle:{backgroundColor:'#F2F2F2',height:70},
            headerTitleStyle:{fontSize:25, fontWeight:'bold'}
          }}></Tab.Screen>
        <Tab.Screen name='Wallet'component={WalletScreen}   
          options={{
            headerLeft: (props) => (
              <TouchableOpacity style={{marginLeft:10}} onPress={onPersonalSetting}>
                <Ionicons name='md-person-circle' size={45} color={Colors.puzzleBlue} ></Ionicons>
              </TouchableOpacity>
            ),
          }}></Tab.Screen>

      </Tab.Navigator>
    );
  }

  return (
    // <AuthContext.Provider value={loginState}>        
      <NavigationContainer>  
        <Stack.Navigator>
            {props.loginToken !== null ? 
            (<Stack.Screen name='TabContainer' component={TabContainer} options={{headerShown: false}}></Stack.Screen>) : 
            {/* (<Stack.Screen name='IndyTest' component={IndyTest} options={{headerShown: false}}></Stack.Screen>) :  */}
            (<Stack.Screen name='RootStackScreen' component={RootStackScreen} options={{headerShown: false}}></Stack.Screen>)
          } 



          {/* Wallet */}
          <Stack.Screen name='CredentialList' component={CredentialListScreen} ></Stack.Screen>
          <Stack.Screen name='CredentialDetail' component={CredentialDetailScreen} ></Stack.Screen>
          <Stack.Screen name='CreateCredential' component={CreateCredentialScreen} ></Stack.Screen>
          <Stack.Screen name='CredentialHistory' component={CredentialHistoryScreen} ></Stack.Screen>
          <Stack.Screen name='CredentialHistoryDetail' component={CredentialHistoryDetailScreen} ></Stack.Screen>
          <Stack.Screen name='InternetSetting' component={InternetSettingScreen} ></Stack.Screen>
          
          {/* Wallet - Create Credential */}
          <Stack.Screen name='SchemaList' component={SchemaListScreen} ></Stack.Screen>
          <Stack.Screen name='DefinitionList' component={DefinitionListScreen} ></Stack.Screen>
          <Stack.Screen name='DC_SettingKey' component={DC_SettingKeyScreen} ></Stack.Screen>
          <Stack.Screen name='DefinitionDetail' component={DefinitionDetailScreen} ></Stack.Screen>
          <Stack.Screen name='DefinitionEstablish' component={DefinitionEstablishScreen} ></Stack.Screen>
          <Stack.Screen name='DE_SelectSchema' component={DE_SelectSchemaScreen} ></Stack.Screen>
          <Stack.Screen name='Scan' component={ScanScreen} ></Stack.Screen>
          <Stack.Screen name='SelectDefinition' component={SelectDefinitionScreen} ></Stack.Screen>

          {/* Certificate */}
          <Stack.Screen name='CreateQR' component={CreateQRScreen} ></Stack.Screen>
          <Stack.Screen name='QRCode' component={QRCodeScreen} ></Stack.Screen>
          <Stack.Screen name='GetCredential' component={GetCredentialScreen} ></Stack.Screen>
          <Stack.Screen name='CertificateHistory' component={CertificateHistoryScreen} ></Stack.Screen>
          <Stack.Screen name='CertificateHistoryDetail' component={CertificateHistoryDetailScreen} ></Stack.Screen>
          
          {/* utils */}
          <Stack.Screen name='Success' component={SuccessScreen} ></Stack.Screen>
          </Stack.Navigator>                
      </NavigationContainer>
    // </AuthContext.Provider>
  );
};

const mapStateToProps = (state) => {  
  return {
      loginToken: state.loginToken
  };
}  

 
const styles = StyleSheet.create({
  headerTitle:{
    ontSize:25, 
    fontWeight:'bold'
  }
});

export default connect(mapStateToProps)(App);
