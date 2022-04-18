import React,{useState, useEffect} from 'react';
// import { AuthContext } from './components/context';
import {connect} from 'react-redux';

import { NavigationContainer, TabActions, useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import RootStackScreen from './RootStackScreen';
import LogoutScreen from './LogoutScreen';
import WalletScreen from './WalletScreen';
import HomeScreen from './HomeScreen';

import CredentialListScreen from './CredentialListScreen';

const App = (props) => {
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

    const TabContainer = () => {
      return(
        <Tab.Navigator initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Wallet') {
                iconName = focused ? 'ios-wallet' : 'ios-wallet-outline';
              } else if (route.name === 'Credential') {
                iconName = focused ? 'md-scan-circle' : 'md-scan-circle-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },

          })}>
          <Tab.Screen name='Wallet' component={WalletScreen} options={{drawerIcon: ({focused, size}) => {return <Ionicons name='log-out' size={25}></Ionicons>}}}></Tab.Screen>
          <Tab.Screen name='Home' component={HomeScreen} options={{drawerIcon: ({focused, size}) => {return <Ionicons name='home' size={25}></Ionicons>}}}></Tab.Screen>
          <Tab.Screen name='Credential' component={CredentialListScreen} options={{drawerIcon: ({focused, size}) => {return <Ionicons name='log-out' size={25}></Ionicons>}}}></Tab.Screen>
          <Tab.Screen name='Logout' component={LogoutScreen} options={{drawerIcon: ({focused, size}) => {return <Ionicons name='log-out' size={25}></Ionicons>}}}></Tab.Screen>

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
  export default connect(mapStateToProps)(App);
