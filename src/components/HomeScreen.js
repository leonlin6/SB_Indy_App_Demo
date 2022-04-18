import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions,
  Linking,
  Button
} from 'react-native';



const HomeScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>HOME SCREEN</Text>
    </View>
  );
}



const styles = StyleSheet.create({
  container:{
    flex:1
  },
  content:{
    flex:1,
    fontSize:30
  }
});

export default HomeScreen;