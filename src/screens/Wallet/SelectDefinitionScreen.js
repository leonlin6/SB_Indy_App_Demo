import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { ListItem} from '@rneui/themed'

const SelectDefinitionScreen = (props) => {
    const [text, setText] = useState('');
    const [data, setData] = useState([]);
    const [selectedSchema, setSelectedSchema] = useState([]);


    const onChangeText = () => {
        
    }

    const list = [
      {
        definition_name: 'fk2352sdsER34',
        version: '1.001',
        attribute: 'Vice President',
      },
      {
        definition_name: 'definition Name2002',
        version: '2.0002',
        attribute: 'Vice President',

      }
    ] 

    useEffect(
      () => {
        const expandList = list.map((item, index) => {
          return (
            {
              listNumber:index,
              expanded:false,
            }         
          )
        })
        setData(expandList);
      } ,[])
    
    const handleSelectSchema = (item) => {
      props.navigation.navigate({
        name: 'DC_SettingKey',
        params: item,
        merge: true,
      });

    }


    const SchemaList = list.map((item, index) => {
      try{
        return(
          <TouchableOpacity key={`schema${index}`} style={styles.schemaContainer} onPress={()=>{handleSelectSchema(item)}}>
            <ListItem
              
              containerStyle={{borderRadius:30}}
              >
              <ListItem.Content>
                <View style={{flex:1, flexDirection:'row'}}>
                  <Ionicons style={{flex:1}} name="ios-square" size={60} color='#cddc39'/>
                  <ListItem.Content style={{flex:4}}>
                    <ListItem.Title >{item.definition_name}</ListItem.Title>
                  </ListItem.Content>
                </View>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>

        );
      }
      catch(error){
        // console.log('error', error);
        return(
          <View>
            <Text>no schema</Text>
          </View>
        )
      }
    });

  // render page
  return (
    <View style={styles.container}>
      <View style={styles.searchArea}>
          <View style={styles.inputWrap}>
            <Ionicons name="search" size={30} color='black'></Ionicons>
            <TextInput
                style={styles.searchInput}
                onChangeText={onChangeText}
                placeholder="please enter schema name"
            />
          </View>
      </View>
      <View style={styles.listArea}>
        <ScrollView persistentScrollbar={true}>
          {SchemaList}
        </ScrollView>
      </View>
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
    justifyContent:'center',
    paddingBottom: 10,
    marginHorizontal:10,
    flex:6
  },
  schemaContainer:{
    marginBottom:10,
    shadowColor: '#171717',
    shadowColor: 'black',
    shadowOpacity: 0.56,
    shadowOffset: { width: 2, height: 2},
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius:5,
  }
});

export default SelectDefinitionScreen;