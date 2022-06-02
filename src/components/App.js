import React,{useState, useEffect} from 'react';
import { LogBox, StyleSheet } from "react-native"

// import { AuthContext } from './components/context';
import {connect} from 'react-redux';

import { NavigationContainer, TabActions, useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from './utils/Colors'

// Login Page
import RootStackScreen from './RootStackScreen';
import LogoutScreen from './Login/LogoutScreen';

// Tab Navigation
import WalletScreen from './WalletScreen';
import CertificateScreen from './CertificateScreen';

// Wallet Page
import CredentialListScreen from './Wallet/CredentialListScreen';
import CredentialDetailScreen from './Wallet/CredentialDetailScreen';
import CreateCredentialScreen from './Wallet/CreateCredentialScreen';
import CredentialHistoryScreen from './Wallet/CredentialHistoryScreen';
import CredentialHistoryDetailScreen from './Wallet/CredentialHistoryDetailScreen';
import InternetSettingScreen from './Wallet/InternetSettingScreen';

// Wallet Page - Create Credential
import SchemaListScreen from './Wallet/SchemaListScreen';
import DefinitionListScreen from './Wallet/DefinitionListScreen';
import DC_SettingKeyScreen from './Wallet/DC_SettingKeyScreen';

import DefinitionDetailScreen from './Wallet/DefinitionDetailScreen';
import DefinitionEstablishScreen from './Wallet/DefinitionEstablishScreen';
import DE_SelectSchemaScreen from './Wallet/DE_SelectSchemaScreen';
import SelectDefinitionScreen from './Wallet/SelectDefinitionScreen';
import GetCredentialScreen from './Wallet/GetCredentialScreen';


// Certificate Page
import ScanScreen from './Certificate/ScanScreen';
import CreateQRScreen from './Certificate/CreateQRScreen';
import QRCodeScreen from './Certificate/QRCodeScreen';
import CertificateHistoryScreen from './Certificate/CertificateHistoryScreen';
import CertificateHistoryDetailScreen from './Certificate/CertificateHistoryDetailScreen';

// utils
import SuccessScreen from './utils/SuccessScreen';


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
