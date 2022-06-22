import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
} from 'react-native';
import ListComponent from '../../components/utils/ListComponent';
import { ScrollView } from 'react-native-gesture-handler';

const DefinitionListScreen = (props) => {
  const [text, setText] = useState('');
  const [data, setData] = useState({test:1234});

  const onChangeText = () => {
  }

  const onAddDefinition = () => {
    props.navigation.push('DefinitionEstablish');
      
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchArea}>
        <View style={styles.inputWrap}>
          <Ionicons name="search" size={30} color='black'></Ionicons>
          <TextInput
            style={styles.searchInput}
            onChangeText={onChangeText}
            placeholder="please enter credential name"
          />
        </View>
      </View>
      <View style={styles.listArea}>
        <ScrollView>
          <ListComponent data={data} displayType={'reader'} navigation={props.navigation} toPageType={'DefinitionDetail'}> </ListComponent>
        </ScrollView>
      </View>
      <TouchableOpacity onPress={onAddDefinition}>
        <Ionicons style={styles.addDefinitionBtn} name="md-add-circle" size={60} color='#2196f3'></Ionicons>
      </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  searchArea:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  inputWrap:{
    flex:8,
    borderRadius:30,
    flexDirection:'row',
    borderWidth:1,
    marginHorizontal:15,
    paddingLeft:5,
    paddingTop:3,
    height:40
  },
  searchIcon:{
    flex:2
  },
  searchInput:{
    paddingVertical: 0 ,
    height:30,
    fontSize:18

  },
  displayBtn:{
    flex:1
  },
  listArea:{
    flex:8,

  },
  addDefinitionBtn:{
    position:'absolute',
    bottom: 20,
    right:20
  }
  

});

export default DefinitionListScreen;