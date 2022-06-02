import React, {useState} from 'react';

import LoginScreen from "./Login/LoginScreen";
import LogoutScreen from './Login/LogoutScreen';
// import SplashScreen from './Login/SplashScreen';

import { createStackNavigator } from "@react-navigation/stack";


const RootStack = createStackNavigator();


const RootStackScreen = () => {
    return(
        <RootStack.Navigator headerShown={false}>
            {/* <RootStack.Screen name="Splash" component={SplashScreen}></RootStack.Screen> */}
            <RootStack.Screen name="Login" component={LoginScreen}></RootStack.Screen>
        </RootStack.Navigator>
    );
}

export default RootStackScreen;